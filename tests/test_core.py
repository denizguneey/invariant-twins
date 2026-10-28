import networkx as nx

from invariant_twins.invariant_rules import invariant_redundancies
from invariant_twins.invariants import (adjacency_characteristic_polynomial, distance_characteristic_polynomial,
                        evaluate_generalized_characteristic_polynomial,
                        generalized_characteristic_polynomial,
                        laplacian_characteristic_polynomial,
                        signless_laplacian_characteristic_polynomial)
from invariant_twins.search import find_collision_witness, find_minimum_separating_sets, separates_universe
from invariant_twins.visualization import graph_to_svg
from invariant_twins.twin_view import (CHARPOLY, G_DIAMETER_PATH, G_EDGES, H_DIAMETER_PATH,
                       H_EDGES, G_POSITIONS, H_POSITIONS, witnesses)
from scripts import run_fingerprint_search as fingerprint_cli
from scripts import run_frontier as frontier_cli
from scripts import verify_witness
from invariant_twins.collision_search import find_collision_in_stream, fingerprint_degree_spectrum, search_first_fingerprint_collision
from invariant_twins.graph_sources import derive_msys2_root, detect_geng, iter_atlas_connected_graphs, iter_geng_connected_graphs, resolve_geng_backend
from invariant_twins.frontier import (PRESETS, VERIFIED_FRONTIER_RESULTS, compute_frontier,
                      find_collision_for_order, fingerprint as frontier_fingerprint)
from invariant_twins.frontier_view import verified_rows
from invariant_twins.ui_content import HIGHER_ORDER_MESSAGE, LEARN_SECTIONS, preset_label
from invariant_twins.identification import candidate_class, graph_fingerprint, minimum_identifying_sets, rank_next_invariants, supported_graph
from invariant_twins.identify_component import _identify_workspace, analyze_state, empty_state, example_state, graph_from_state, normalize_state
from invariant_twins.invariants import INVARIANT_REGISTRY


def record(identifier, graph, **values):
    return identifier, graph, values


def test_known_nonisomorphic_same_degree_sequence():
    graph = nx.cycle_graph(6)
    other = nx.disjoint_union(nx.cycle_graph(3), nx.cycle_graph(3))
    assert sorted(dict(graph.degree()).values()) == sorted(dict(other.degree()).values())
    assert not nx.is_isomorphic(graph, other)


def test_identification_candidate_class_is_exact_and_relabel_invariant():
    target = nx.cycle_graph(4)
    target.add_edge(2, 4)
    relabelled = nx.relabel_nodes(target, {0: 8, 1: 4, 2: 9, 3: 2, 4: 6})
    domain = list(iter_atlas_connected_graphs(5))
    assert supported_graph(target)
    assert graph_fingerprint(target, ("degree_sequence", "adjacency_charpoly")) == graph_fingerprint(relabelled, ("degree_sequence", "adjacency_charpoly"))
    assert len(candidate_class(target, (), domain)) == 21
    assert candidate_class(target, ("degree_sequence",), domain) == candidate_class(relabelled, ("degree_sequence",), domain)


def test_identification_recommendations_and_minimum_sets_are_deterministic():
    target = nx.cycle_graph(4)
    target.add_edge(2, 4)
    domain = list(iter_atlas_connected_graphs(5))
    candidates = candidate_class(target, ("degree_sequence",), domain)
    ranking = rank_next_invariants(target, candidates, ("degree_sequence",))
    assert ranking == rank_next_invariants(target, candidates, ("degree_sequence",))
    assert ranking[0][1] >= ranking[-1][1]
    names = ("degree_sequence", "triangle_count", "bridge_count", "adjacency_charpoly")
    solutions = minimum_identifying_sets(target, domain, names)
    assert solutions
    assert all(len(candidate_class(target, subset, domain)) == 1 for subset in solutions)
    assert not any(len(candidate_class(target, subset, domain)) == 1 for subset in __import__("itertools").combinations(names, len(solutions[0]) - 1))


def test_identification_rejects_disconnected_or_unsupported_graphs():
    assert not supported_graph(nx.empty_graph(2))
    assert not supported_graph(nx.path_graph(8))
    with __import__("pytest").raises(ValueError):
        candidate_class(nx.empty_graph(2), (), [])


def test_identify_component_rebuilds_graph_from_ids_not_coordinates():
    state = example_state()
    moved = {**state, "nodes": [{**node, "x": node["x"] + 99, "y": node["y"] - 31} for node in state["nodes"]]}
    assert nx.is_isomorphic(graph_from_state(state), graph_from_state(moved))
    graph = graph_from_state(state)
    assert graph.number_of_nodes() == 5 and graph.number_of_edges() == 5


def test_identify_component_empty_and_disconnected_states_pause_analysis():
    empty = analyze_state(empty_state())
    assert not empty["ready"] and "Add at least one vertex" in empty["message"]
    disconnected = analyze_state({"nodes": [{"id": "A", "x": 1, "y": 1}, {"id": "B", "x": 2, "y": 2}], "edges": [], "selectedInvariants": []})
    assert not disconnected["ready"] and "Connect all vertices" in disconnected["message"]


def test_identify_component_normalizes_invalid_loops_and_duplicate_edges():
    state = normalize_state({"nodes": [{"id": "A"}, {"id": "B"}], "edges": [{"source": "A", "target": "A"}, {"source": "A", "target": "B"}, {"source": "B", "target": "A"}], "selectedInvariants": ["degree_sequence", "not-real"]})
    assert state["edges"] == [{"source": "A", "target": "B"}]
    assert state["selectedInvariants"] == ["degree_sequence"]


def test_identify_component_frontend_bundle_registers():
    assert callable(_identify_workspace())


def test_twin_view_graph6_witnesses_and_diameter_paths():
    graph, other = witnesses()
    assert {tuple(sorted(edge)) for edge in graph.edges()} == G_EDGES
    assert {tuple(sorted(edge)) for edge in other.edges()} == H_EDGES
    assert nx.is_connected(graph) and nx.is_connected(other)
    assert graph.number_of_nodes() == other.number_of_nodes() == 8
    assert graph.number_of_edges() == other.number_of_edges() == 8
    assert tuple(sorted(dict(graph.degree()).values(), reverse=True)) == tuple(sorted(dict(other.degree()).values(), reverse=True))
    assert sum(nx.triangles(graph).values()) // 3 == sum(nx.triangles(other).values()) // 3 == 0
    assert adjacency_characteristic_polynomial(graph) == adjacency_characteristic_polynomial(other) == CHARPOLY
    assert nx.diameter(graph) == 5 and nx.diameter(other) == 4
    assert all(graph.has_edge(*edge) for edge in zip(G_DIAMETER_PATH, G_DIAMETER_PATH[1:]))
    assert all(other.has_edge(*edge) for edge in zip(H_DIAMETER_PATH, H_DIAMETER_PATH[1:]))
    assert len(G_DIAMETER_PATH) - 1 == nx.diameter(graph) and len(H_DIAMETER_PATH) - 1 == nx.diameter(other)
    assert not nx.is_isomorphic(graph, other)
    assert set(G_POSITIONS) == set(graph) and set(H_POSITIONS) == set(other)


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


def test_exact_laplacian_signless_and_distance_characteristic_polynomials():
    path = nx.path_graph(3)
    assert laplacian_characteristic_polynomial(path) == (1, -4, 3, 0)
    assert signless_laplacian_characteristic_polynomial(path) == (1, -4, 3, 0)
    assert distance_characteristic_polynomial(path) == (1, 0, -6, -4)
    for polynomial in (adjacency_characteristic_polynomial(path), laplacian_characteristic_polynomial(path), signless_laplacian_characteristic_polynomial(path), distance_characteristic_polynomial(path)):
        assert isinstance(polynomial, tuple) and all(isinstance(value, int) for value in polynomial)


def test_exact_spectral_polynomials_are_isomorphism_invariant_and_not_floats():
    graph = nx.path_graph(4)
    relabelled = nx.relabel_nodes(graph, {0: 9, 1: 7, 2: 5, 3: 3})
    for function in (adjacency_characteristic_polynomial, laplacian_characteristic_polynomial, signless_laplacian_characteristic_polynomial, distance_characteristic_polynomial):
        assert function(graph) == function(relabelled)
        assert not any(isinstance(value, float) for value in function(graph))


def test_generalized_characteristic_polynomial_specializations_are_exact():
    graph = nx.path_graph(3)
    polynomial = generalized_characteristic_polynomial(graph)
    assert all(isinstance(term, tuple) and len(term) == 3 and all(isinstance(value, int) for value in term) for term in polynomial)
    assert evaluate_generalized_characteristic_polynomial(polynomial, 0) == adjacency_characteristic_polynomial(graph)
    assert evaluate_generalized_characteristic_polynomial(polynomial, -1) == signless_laplacian_characteristic_polynomial(graph)
    expected_laplacian_at_negative_lambda = tuple((-1) ** index * value for index, value in enumerate(laplacian_characteristic_polynomial(graph)))
    assert evaluate_generalized_characteristic_polynomial(polynomial, 1) == expected_laplacian_at_negative_lambda
    relabelled = nx.relabel_nodes(graph, {0: 8, 1: 3, 2: 5})
    assert polynomial == generalized_characteristic_polynomial(relabelled)


def test_known_atlas_nonisomorphic_graphs_can_share_an_individual_exact_spectrum():
    graph_a, graph_b, shared, count, exhaustive = find_collision_for_order(
        6, ("adjacency_charpoly",), iter_atlas_connected_graphs
    )
    assert count == 112 and exhaustive
    assert graph_a is not None and graph_b is not None and shared is not None
    assert not nx.is_isomorphic(graph_a, graph_b)
    assert adjacency_characteristic_polynomial(graph_a) == adjacency_characteristic_polynomial(graph_b)


def test_frontier_engine_stops_at_first_collision_and_ignores_isomorphic_duplicates():
    path = nx.path_graph(3)
    source = lambda order: {1: [nx.empty_graph(1)], 2: [nx.path_graph(2)], 3: [path, nx.relabel_nodes(path, {0: 2, 1: 1, 2: 0})], 4: [nx.path_graph(4)], 5: [nx.cycle_graph(5)], 6: [nx.complete_bipartite_graph(3, 3), nx.circular_ladder_graph(3)]}.get(order, [])
    result = compute_frontier(("degree_sequence",), 1, 6, source)
    assert result.first_collision_order == 6
    assert result.minimality_established
    assert result.graph_counts[3] == 2
    assert not result.isomorphic


def test_frontier_incomplete_enumeration_never_claims_minimality():
    source = lambda order: [nx.empty_graph(1)] if order == 1 else [nx.path_graph(2), nx.path_graph(2)]
    result = compute_frontier(("degree_sequence",), 1, 2, source, exhaustive_by_order=lambda order: order == 1)
    assert result.first_collision_order is None
    assert result.frontier is None
    assert not result.minimality_established


def test_frontier_multiple_invariants_presets_and_json_serialization():
    assert PRESETS["F6"] == ("degree_sequence", "adjacency_charpoly", "laplacian_charpoly")
    graph = nx.path_graph(3)
    assert len(frontier_fingerprint(graph, PRESETS["F6"])) == 3
    result = compute_frontier(PRESETS["F3"], 1, 1, lambda order: [nx.empty_graph(1)])
    data = result.as_dict()
    assert data["frontier"] == 1
    assert "finite computational result" in data["disclaimer"]
    assert VERIFIED_FRONTIER_RESULTS["F4"] == {"frontier": 8, "first_collision_order": 9, "minimality_established": True}
    assert VERIFIED_FRONTIER_RESULTS["FG"]["first_collision_order"] == 9


def test_frontier_cli_parsing_and_markdown_report():
    assert frontier_cli.EXPECTED_CONNECTED_COUNTS[9] == 261080
    assert frontier_cli.parse_invariant_names("degree_sequence, adjacency_charpoly") == ("degree_sequence", "adjacency_charpoly")
    report = frontier_cli.markdown_report("F6", {
        "invariant_display_names": ["Degree sequence"], "orders_checked": [1],
        "graph_counts": {"1": 1}, "exhaustive_by_order": {"1": True},
        "first_collision_order": None, "frontier": 1, "elapsed_runtime": 0.01,
        "disclaimer": "finite computational result",
    })
    assert "Fingerprint: F6" in report
    assert "Collision-free through: n=1" in report


def test_witness_verifier_recomputes_and_rejects_tampering(tmp_path):
    graph_a, graph_b, shared, _, _ = find_collision_for_order(6, ("adjacency_charpoly",), iter_atlas_connected_graphs)
    assert graph_a is not None and graph_b is not None
    path = tmp_path / "result.json"
    path.write_text(__import__("json").dumps({"first_collision_order": 6, "graph6_a": nx.to_graph6_bytes(graph_a, header=False).decode().strip(), "graph6_b": nx.to_graph6_bytes(graph_b, header=False).decode().strip(), "invariant_names": ["adjacency_charpoly"], "shared_fingerprint": [list(shared[0])]}), encoding="utf-8")
    assert verify_witness.verify_result(path)["verified"]
    path.write_text(path.read_text(encoding="utf-8").replace('"first_collision_order": 6', '"first_collision_order": 5'), encoding="utf-8")
    import pytest
    with pytest.raises(ValueError, match="order"):
        verify_witness.verify_result(path)


def test_research_manifest_contains_verified_finite_records():
    import json
    from pathlib import Path
    manifest = json.loads((Path(__file__).parents[1] / "research" / "index.json").read_text(encoding="utf-8"))
    assert any(record["preset"] == "FG" for record in manifest["experiments"])
    assert all(record["verification_status"] == "verified" for record in manifest["experiments"])


def test_frontier_view_matches_verified_research_metadata():
    rows = {row["preset"]: row for row in verified_rows()}
    assert rows["F1"]["frontier"] == 4 and rows["F1"]["first_collision_order"] == 5
    assert rows["F2"]["frontier"] == 5 and rows["F2"]["first_collision_order"] == 6
    assert rows["FG"]["frontier"] == 8 and rows["FG"]["first_collision_order"] == 9
    assert rows["F4–F9"]["frontier"] == 8 and rows["F4–F9"]["first_collision_order"] == 9
    assert rows["F10"]["frontier"] == 7 and rows["F10"]["first_collision_order"] is None
    assert rows["F4–F9"]["label"] == "A/L/Q combinations (F4–F9, six presets)"


def test_reader_facing_preset_labels_and_learn_content_are_available():
    assert preset_label("F3") == "Degree + adjacency spectrum"
    assert preset_label("FG") == "Generalized characteristic polynomial"
    assert preset_label("unknown") == "unknown"
    assert len(LEARN_SECTIONS) >= 10
    assert any("collision" in text.lower() for _, text in LEARN_SECTIONS)
    assert "nauty/geng" in HIGHER_ORDER_MESSAGE


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


def test_svg_renderer_handles_empty_and_single_vertex_graphs():
    empty = graph_to_svg(nx.Graph(), seed=1, title="Empty editor graph")
    singleton = graph_to_svg(nx.empty_graph(1), seed=2, title="One vertex")
    edgeless = graph_to_svg(nx.empty_graph(3), seed=3, title="Three isolated vertices")
    assert "Add a vertex to begin" in empty and empty.count("<circle") == 0
    assert singleton.count("<circle") == 1
    assert edgeless.count("<circle") == 3 and edgeless.count("<line") == 0


def test_svg_is_deterministic_for_a_fixed_seed():
    graph = nx.path_graph(4)
    assert graph_to_svg(graph, seed=41) == graph_to_svg(graph, seed=41)


def test_basic_invariant_values_are_exact_on_a_triangle_with_tail():
    graph = nx.Graph([(0, 1), (1, 2), (2, 0), (2, 3)])
    from invariant_twins.invariants import invariant_values
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
    import invariant_twins.collision_search as collision_search
    path = nx.path_graph(4)
    assert find_collision_in_stream([path, nx.relabel_nodes(path, {0: 3, 1: 2, 2: 1, 3: 0})], 4) is None
    monkeypatch.setattr(collision_search, "fingerprint_degree_spectrum", lambda graph: ((0,), (1,)))
    collision = find_collision_in_stream([nx.path_graph(4), nx.star_graph(3)], 4)
    assert collision is not None


def test_collision_search_marks_minimality_after_exhaustive_prefix(monkeypatch):
    import invariant_twins.collision_search as collision_search
    monkeypatch.setattr(collision_search, "fingerprint_degree_spectrum", lambda graph: ((0,), (1,)))
    source = lambda order: [nx.path_graph(4), nx.star_graph(3)] if order == 4 else []
    result = search_first_fingerprint_collision(3, 4, source, prefix_exhaustive=True)
    assert result.collision is not None
    assert result.collision.minimality_established


def test_atlas_source_and_missing_geng_detection_are_graceful(monkeypatch):
    import invariant_twins.graph_sources as graph_sources
    assert len(list(iter_atlas_connected_graphs(3))) == 2
    monkeypatch.setattr(graph_sources, "KNOWN_GENG_PATHS", ())
    monkeypatch.setattr(graph_sources.shutil, "which", lambda name: None)
    assert detect_geng("definitely-not-a-real-geng-path") in (None,)


def test_geng_detection_priority(monkeypatch, tmp_path):
    import invariant_twins.graph_sources as graph_sources
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
    monkeypatch.setattr(graph_sources.shutil, "which", lambda name: "/usr/bin/nauty-geng" if name == "nauty-geng" else None)
    assert detect_geng() == "/usr/bin/nauty-geng"


def test_geng_graph6_stream_parsing_and_malformed_line_handling(monkeypatch):
    import io
    import invariant_twins.graph_sources as graph_sources

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
