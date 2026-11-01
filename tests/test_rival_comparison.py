import networkx as nx
from fastapi.testclient import TestClient

from invariant_twins.graph_sources import iter_atlas_connected_graphs
from invariant_twins.identification import candidate_class
from invariant_twins.invariants import INVARIANT_REGISTRY
from invariant_twins.n8_index import N8Index
from invariant_twins.web import comparison_response, create_app, graph6


def payload(graph: nx.Graph, invariants: list[str]) -> dict[str, object]:
    labels = {node: chr(65 + index) for index, node in enumerate(sorted(graph))}
    return {"nodes": list(labels.values()), "edges": [[labels[first], labels[second]] for first, second in graph.edges()], "invariants": invariants}


def atlas_rival() -> tuple[nx.Graph, nx.Graph]:
    records = list(iter_atlas_connected_graphs(5))
    for graph in records:
        for rival in candidate_class(graph, ("degree_sequence",), records):
            if not nx.is_isomorphic(graph, rival):
                return graph, rival
    raise AssertionError("expected a Graph Atlas degree-sequence collision")


def test_compare_rival_reports_exact_selected_equality_and_difference() -> None:
    graph, rival = atlas_rival()
    response = TestClient(create_app()).post("/api/identify/compare-rival", json=payload(graph, ["degree_sequence"]) | {"rival_graph6": graph6(rival)})
    assert response.status_code == 200
    body = response.json()
    assert not body["isomorphic"]
    assert body["selectedFingerprint"] == [{"id": "degree_sequence", "userValue": body["selectedFingerprint"][0]["userValue"], "rivalValue": body["selectedFingerprint"][0]["userValue"], "equal": True}]
    assert len(body["invariants"]) == len(INVARIANT_REGISTRY)
    assert any(not row["equal"] for row in body["invariants"])
    assert body["headlineInvariantId"] in body["distinguishingInvariantIds"]


def test_compare_rival_rejects_own_or_mismatched_graph6() -> None:
    graph, _ = atlas_rival()
    response = TestClient(create_app()).post("/api/identify/compare-rival", json=payload(graph, ["degree_sequence"]) | {"rival_graph6": graph6(graph)})
    assert response.status_code == 422


def test_no_distinguishing_invariant_state_is_explicit() -> None:
    values = {name: 0 for name in INVARIANT_REGISTRY}
    body = comparison_response(values, values, ["degree_sequence"], 5)
    assert body["noDistinguishingInvariant"]
    assert body["headlineInvariantId"] is None


def test_n8_comparison_uses_verified_index_for_one_rival(monkeypatch) -> None:
    import invariant_twins.web as subject
    index = N8Index()
    own_id, rival_id = next((item, matches[1]) for item in range(1, index.domain_size + 1) if len(matches := index.ids_matching({"degree_sequence": index.values([item], ["degree_sequence"])[item]["degree_sequence"]})) > 1)
    graph = nx.from_graph6_bytes(index.graph6(own_id).encode())
    opened: list[bool] = []
    original = subject.N8Index

    class ObservedIndex(original):
        def __init__(self):
            opened.append(True)
            super().__init__()

    monkeypatch.setattr(subject, "N8Index", ObservedIndex)
    response = TestClient(create_app()).post("/api/identify/compare-rival", json=payload(graph, ["degree_sequence"]) | {"rival_graph6": index.graph6(rival_id)})
    assert response.status_code == 200
    assert opened and response.json()["selectedFingerprint"][0]["equal"]
