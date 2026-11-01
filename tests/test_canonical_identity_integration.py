import networkx as nx
from fastapi.testclient import TestClient

from invariant_twins.canonical_domains import atlas_graph_for_canonical_graph6
from invariant_twins.canonical_identity import canonical_graph6
from invariant_twins.graph_sources import iter_atlas_connected_graphs
from invariant_twins.identification import candidate_class
from invariant_twins.n8_canonical_map import N8CanonicalMap
from invariant_twins.n8_index import N8Index
from invariant_twins.web import create_app, graph6


def payload(graph: nx.Graph, invariants: list[str] | None = None) -> dict[str, object]:
    return {"nodes": [str(node) for node in graph.nodes], "edges": [[str(first), str(second)] for first, second in graph.edges()], "invariants": invariants or ["degree_sequence"]}


def atlas_collision() -> tuple[nx.Graph, nx.Graph]:
    records = list(iter_atlas_connected_graphs(5))
    for graph in records:
        for rival in candidate_class(graph, ("degree_sequence",), records):
            if canonical_graph6(graph) != canonical_graph6(rival):
                return graph, rival
    raise AssertionError("expected an Atlas collision")


def test_identify_adds_stable_canonical_identity_without_redefining_graph6() -> None:
    original, _ = atlas_collision()
    relabelled = nx.relabel_nodes(original, {node: f"v{index}" for index, node in enumerate(original.nodes)})
    client = TestClient(create_app())
    first = client.post("/api/identify/analyze", json=payload(original)).json()
    second = client.post("/api/identify/analyze", json=payload(relabelled)).json()
    assert first["graph"]["canonicalGraph6"] == second["graph"]["canonicalGraph6"] == canonical_graph6(original)
    assert "graph6" in first["graph"] and "graph6" in second["graph"]


def test_atlas_canonical_lookup_and_self_exclusion_preserve_rivals() -> None:
    graph, rival = atlas_collision()
    identifier = canonical_graph6(graph)
    representative = atlas_graph_for_canonical_graph6(graph.number_of_nodes(), identifier)
    assert representative is not None and canonical_graph6(representative) == identifier
    body = TestClient(create_app()).post("/api/identify/analyze", json=payload(graph)).json()
    assert body["identification"]["rivalCount"] > 0
    assert graph6(rival) in {item["graph6"] for item in body["candidates"]}
    assert all(canonical_graph6(nx.from_graph6_bytes(item["graph6"].encode())) != identifier for item in body["candidates"])


def test_n8_canonical_map_resolves_a_sample_and_identify_returns_it() -> None:
    index, canonical_map = N8Index(), N8CanonicalMap()
    graph_id = 101
    graph = nx.from_graph6_bytes(index.graph6(graph_id).encode())
    identifier = canonical_graph6(graph)
    assert canonical_map.lookup(identifier) == (graph_id, index.graph6(graph_id))
    body = TestClient(create_app()).post("/api/identify/analyze", json=payload(graph)).json()
    assert body["graph"]["canonicalGraph6"] == identifier


def test_unsupported_identify_input_remains_controlled() -> None:
    response = TestClient(create_app()).post("/api/identify/analyze", json={"nodes": list("ABCDEFGHI"), "edges": [], "invariants": []})
    assert response.status_code == 422
