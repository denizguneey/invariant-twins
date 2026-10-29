from fastapi.testclient import TestClient

from invariant_twins.web import create_app


client = TestClient(create_app())


def test_analyze_connected_graph_uses_existing_math() -> None:
    response = client.post("/api/identify/analyze", json={"nodes": ["A", "B", "C"], "edges": [["A", "B"], ["B", "C"]], "invariants": ["degree_sequence"]})
    assert response.status_code == 200
    body = response.json()
    assert body["graph"]["connected"] is True
    assert body["graph"]["order"] == 3
    assert "degree_sequence" in body["invariants"]


def test_analyze_empty_and_disconnected_graphs_are_typed_responses() -> None:
    assert client.post("/api/identify/analyze", json={"nodes": [], "edges": [], "invariants": []}).json()["message"]
    response = client.post("/api/identify/analyze", json={"nodes": ["A", "B"], "edges": [], "invariants": []})
    assert response.status_code == 200
    assert "bağlayın" in response.json()["message"]


def test_invalid_graph_is_rejected() -> None:
    response = client.post("/api/identify/analyze", json={"nodes": ["A"], "edges": [["A", "A"]], "invariants": []})
    assert response.status_code == 422


def test_minimum_set_endpoint() -> None:
    response = client.post("/api/identify/minimum-set", json={"nodes": ["A", "B"], "edges": [["A", "B"]], "invariants": ["degree_sequence"]})
    assert response.status_code == 200
    assert "sets" in response.json()


def test_supporting_web_api_resources_are_structured() -> None:
    assert client.get("/api/health").json() == {"status": "ok"}
    assert client.get("/api/invariants").status_code == 200
    twins = client.post("/api/twins/search", json={"max_order": 5, "invariants": ["Edges", "Degree sequence"]})
    assert twins.status_code == 200
    assert twins.json()["collisionFound"] is True
    minimum = client.post("/api/twins/minimum-separating", json={"max_order": 4, "invariants": ["Edges"]})
    assert minimum.status_code == 200
    assert "sets" in minimum.json()
    frontier = client.get("/api/frontier").json()
    assert frontier["rows"] and frontier["rows"][0]["cells"][0]["status"] == "verified"
    assert client.get("/api/research").status_code == 200


def test_identify_prefers_simple_separating_recommendation_on_a_tie() -> None:
    response = client.post("/api/identify/analyze", json={
        "nodes": ["A", "B", "C", "D", "E"],
        "edges": [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["C", "E"]],
        "invariants": ["degree_sequence"],
    })
    result = response.json()
    assert result["identification"]["rivalCount"] == 1
    assert result["recommendation"] == {"id": "triangle_count", "remaining": 0}
