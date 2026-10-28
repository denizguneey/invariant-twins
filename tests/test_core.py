import networkx as nx

from invariant_rules import invariant_redundancies
from invariants import adjacency_characteristic_polynomial
from search import find_collision_witness, find_minimum_separating_sets, separates_universe
from visualization import graph_to_svg
from scripts import run_fingerprint_search as fingerprint_cli
from collision_search import find_collision_in_stream, fingerprint_degree_spectrum, search_first_fingerprint_collision
from graph_sources import derive_msys2_root, detect_geng, iter_atlas_connected_graphs, iter_geng_connected_graphs, resolve_geng_backend


def record(identifier, graph, **values):
    return identifier, graph, values


def test_known_nonisomorphic_same_degree_sequence():
    graph = nx.cycle_graph(6)
    other = nx.disjoint_union(nx.cycle_graph(3), nx.cycle_graph(3))
    assert sorted(dict(graph.degree()).values()) == sorted(dict(other.degree()).values())
    assert not nx.is_isomorphic(graph, other)


def test_edges_is_reported_redundant_with_degree_sequence():
    notices = invariant_redundancies(["Degree sequence", "Edges"])
    assert len(notices) == 1
    assert "Handshaking Lemma" in notices[0]
    assert "2|E|" in notices[0]


def test_edges_is_not_reported_redundant_without_degree_sequence():
    assert invariant_redundancies(["Edges", "Triangle count"]) == []


def test_empty_and_trivial_domains_need_no_invariants():
    assert find_minimum_separating_sets([], ["A"]) == [()]
    assert find_minimum_separating_sets([record("one", nx.path_graph(3), A=0)], ["A"]) == [()]


def test_known_subset_that_does_not_separate():
    records = [record("path", nx.path_graph(4), A=0, B=0), record("star", nx.star_graph(3), A=1, B=0)]
    assert not separates_universe(records, ["B"])


def test_known_subset_that_separates_and_is_minimal():
    records = [record("path", nx.path_graph(4), A=0, B=0), record("star", nx.star_graph(3), A=1, B=0)]
    assert separates_universe(records, ["A"])
    assert find_minimum_separating_sets(records, ["A", "B"]) == [("A",)]
    assert not separates_universe(records, [])


def test_all_multiple_minimum_sets_are_returned():
    records = [record("path", nx.path_graph(4), A=0, B=0), record("star", nx.star_graph(3), A=1, B=1)]
    assert find_minimum_separating_sets(records, ["A", "B"]) == [("A",), ("B",)]


def test_vertex_count_is_a_free_partition_key():
    records = [record("three", nx.path_graph(3), A=0), record("four", nx.path_graph(4), A=0)]
    assert separates_universe(records, [])
    assert find_minimum_separating_sets(records, ["A"]) == [()]


def test_exact_adjacency_characteristic_polynomial_equality():
    path = nx.path_graph(3)
    relabelled_path = nx.relabel_nodes(path, {0: 7, 1: 4, 2: 9})
    assert adjacency_characteristic_polynomial(path) == (1, 0, -2, 0)
    assert adjacency_characteristic_polynomial(path) == adjacency_characteristic_polynomial(relabelled_path)
    assert adjacency_characteristic_polynomial(path) != adjacency_characteristic_polynomial(nx.cycle_graph(3))


def test_full_family_failure_returns_nonisomorphic_collision_witness():
    records = [record("path", nx.path_graph(4), A=0, B=0), record("star", nx.star_graph(3), A=0, B=0)]
    witness = find_collision_witness(records, ["A", "B"])
    assert witness is not None
    assert not nx.is_isomorphic(witness[0][1], witness[1][1])
    assert find_minimum_separating_sets(records, ["A", "B"]) == []


def test_svg_renderer_is_accessible_and_not_a_raster_image():
    svg = graph_to_svg(nx.path_graph(3), seed=17, title="Graph A, 3 vertices, 2 edges")
    default_svg = graph_to_svg(nx.path_graph(4))
    assert svg.startswith("<svg")
    assert "</svg>" in svg
    assert "<circle" in svg
    assert "<line" in svg or "<path" in svg
    assert default_svg.startswith("<svg")
    assert '<title id="graph-title-17">Graph A, 3 vertices, 2 edges</title>' in svg
    assert svg.count("<circle") == 3
    assert svg.count("<line") == 2
    assert "matplotlib" not in svg


def test_svg_is_deterministic_for_a_fixed_seed():
    graph = nx.path_graph(4)
    assert graph_to_svg(graph, seed=41) == graph_to_svg(graph, seed=41)


def test_basic_invariant_values_are_exact_on_a_triangle_with_tail():
    graph = nx.Graph([(0, 1), (1, 2), (2, 0), (2, 3)])
    from invariants import invariant_values
    values = invariant_values(graph)
    assert values["Edges"] == 4
    assert values["Degree sequence"] == (3, 2, 2, 1)
    assert values["Triangle count"] == 1
    assert values["Bridge count"] == 1


def test_cospectral_fingerprint_uses_exact_characteristic_polynomial():
    graph = nx.path_graph(4)
    relabelled = nx.relabel_nodes(graph, {0: 9, 1: 7, 2: 5, 3: 3})
    assert fingerprint_degree_spectrum(graph) == fingerprint_degree_spectrum(relabelled)


def test_collision_stream_only_accepts_nonisomorphic_graphs(monkeypatch):
    import collision_search
    path = nx.path_graph(4)
    assert find_collision_in_stream([path, nx.relabel_nodes(path, {0: 3, 1: 2, 2: 1, 3: 0})], 4) is None
    monkeypatch.setattr(collision_search, "fingerprint_degree_spectrum", lambda graph: ((0,), (1,)))
    collision = find_collision_in_stream([nx.path_graph(4), nx.star_graph(3)], 4)
    assert collision is not None


def test_collision_search_marks_minimality_after_exhaustive_prefix(monkeypatch):
    import collision_search
    monkeypatch.setattr(collision_search, "fingerprint_degree_spectrum", lambda graph: ((0,), (1,)))
    source = lambda order: [nx.path_graph(4), nx.star_graph(3)] if order == 4 else []
    result = search_first_fingerprint_collision(3, 4, source, prefix_exhaustive=True)
    assert result.collision is not None
    assert result.collision.minimality_established


def test_atlas_source_and_missing_geng_detection_are_graceful(monkeypatch):
    import graph_sources
    assert len(list(iter_atlas_connected_graphs(3))) == 2
    monkeypatch.setattr(graph_sources, "KNOWN_GENG_PATHS", ())
    monkeypatch.setattr(graph_sources.shutil, "which", lambda name: None)
    assert detect_geng("definitely-not-a-real-geng-path") in (None,)


def test_geng_detection_priority(monkeypatch, tmp_path):
    import graph_sources
    explicit = tmp_path / "explicit.exe"
    environment = tmp_path / "environment.exe"
    explicit.touch()
    environment.touch()
    monkeypatch.setenv("INVARIANT_TWINS_GENG", str(environment))
    monkeypatch.setattr(graph_sources.shutil, "which", lambda name: None)
    assert detect_geng(str(explicit)) == str(explicit)
    assert detect_geng() == str(environment)
    monkeypatch.delenv("INVARIANT_TWINS_GENG")
    monkeypatch.setattr(graph_sources.shutil, "which", lambda name: "on-path.exe" if name == "geng" else None)
    assert detect_geng() == "on-path.exe"


def test_geng_graph6_stream_parsing_and_malformed_line_handling(monkeypatch):
    import io
    import graph_sources

    valid = nx.to_graph6_bytes(nx.path_graph(2), header=False).decode().strip()
    class Process:
        stdout = io.StringIO(valid + "\nmalformed\n")
        stderr = io.StringIO("")
        def wait(self): return 0

    monkeypatch.setattr(graph_sources, "detect_geng", lambda path=None: "mock-geng")
    monkeypatch.setattr(graph_sources.subprocess, "Popen", lambda *args, **kwargs: Process())
    graphs = list(iter_geng_connected_graphs(2, "mock-geng"))
    assert len(graphs) == 1
    assert graphs[0].number_of_nodes() == 2


def test_msys2_root_derivation_and_backend_resolution(tmp_path):
    root = tmp_path / "msys"
    executable = root / "ucrt64" / "bin" / "geng.exe"
    bash = root / "usr" / "bin" / "bash.exe"
    executable.parent.mkdir(parents=True)
    bash.parent.mkdir(parents=True)
    executable.touch()
    bash.touch()
    assert derive_msys2_root(str(executable)) == str(root)
    backend = resolve_geng_backend(str(executable))
    assert backend is not None and backend.bash == str(bash)


def test_research_cli_detects_generator_and_writes_markdown(monkeypatch):
    monkeypatch.setattr(fingerprint_cli.shutil, "which", lambda name: "/usr/bin/nauty-geng" if name == "nauty-geng" else None)
    assert fingerprint_cli.detect_generator() == "/usr/bin/nauty-geng"
    report = fingerprint_cli.markdown_report({
        "order": 8, "generator": "nauty-geng", "expected_graph_count": 11117,
        "actual_graph_count": 11117, "exhaustive": True, "collision_found": False,
        "minimality_established": False, "disclaimer": "finite",
    })
    assert "Actual graphs: 11117" in report
    assert "finite" in report
