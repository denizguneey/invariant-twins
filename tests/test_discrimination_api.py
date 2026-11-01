from fastapi.testclient import TestClient

from invariant_twins.web import create_app


def test_discrimination_api_normalizes_selection_and_returns_complete_orders() -> None:
    response = TestClient(create_app()).post("/api/discrimination-power", json={"invariants": ["triangle_count", "degree_sequence", "triangle_count"]})
    assert response.status_code == 200
    body = response.json()
    assert body["selectedInvariants"] == ["degree_sequence", "triangle_count"]
    assert [row["domainSize"] for row in body["orders"]] == [6, 21, 112, 853, 11117]
    assert all({"fingerprintClassCount", "singletonClassCount", "uniqueGraphCount", "collisionClassCount", "largestCollisionClassSize", "indistinguishablePairCount", "totalPairCount", "uniqueIdentificationRate", "pairSeparationRate"} <= row.keys() for row in body["orders"])


def test_discrimination_api_rejects_unknown_invariant() -> None:
    response = TestClient(create_app()).post("/api/discrimination-power", json={"invariants": ["not_an_invariant"]})
    assert response.status_code == 422
