"""Focused production-index regression tests (no copied SQLite fixture)."""
from __future__ import annotations

import networkx as nx
import pytest
import sqlite3
from fastapi.testclient import TestClient

from invariant_twins.graph_sources import iter_atlas_connected_graphs
from invariant_twins.invariants import compute_invariant
from invariant_twins.n8_index import N8Index, N8IndexError
from invariant_twins.web import create_app


client = TestClient(create_app())


def n8_payload(graph_id: int = 101, invariants: list[str] | None = None) -> dict[str, object]:
    index = N8Index()
    graph = nx.from_graph6_bytes(index.graph6(graph_id).encode())
    return {"nodes": [chr(65 + node) for node in graph], "edges": [[chr(65 + a), chr(65 + b)] for a, b in graph.edges()], "invariants": invariants or ["degree_sequence"]}


def test_ready_index_accepts_and_matches_direct_exact_values() -> None:
    index = N8Index()
    graph_id = 101
    graph = nx.from_graph6_bytes(index.graph6(graph_id).encode())
    values = index.values([graph_id], ("degree_sequence", "adjacency_charpoly", "laplacian_charpoly"))[graph_id]
    assert values["degree_sequence"] == list(compute_invariant(graph, "degree_sequence"))
    assert values["adjacency_charpoly"] == list(compute_invariant(graph, "adjacency_charpoly"))
    assert values["laplacian_charpoly"] == list(compute_invariant(graph, "laplacian_charpoly"))


def test_missing_or_wrong_source_is_rejected(tmp_path) -> None:
    with pytest.raises(N8IndexError):
        N8Index(tmp_path / "missing.sqlite")
    source = tmp_path / "wrong.g6"; source.write_text("G?\n", encoding="ascii")
    with pytest.raises(N8IndexError):
        N8Index(source=source)


def test_incomplete_index_is_rejected(tmp_path) -> None:
    database = tmp_path / "incomplete.sqlite"
    db = sqlite3.connect(database); db.execute("CREATE TABLE metadata (key TEXT PRIMARY KEY, value TEXT NOT NULL)"); db.execute("INSERT INTO metadata VALUES ('status','building')"); db.commit(); db.close()
    with pytest.raises(N8IndexError):
        N8Index(database)


def test_indexed_identify_reports_exact_domain_and_preview_cap() -> None:
    body = client.post("/api/identify/analyze", json=n8_payload()).json()
    assert body["identification"]["domainSize"] == 11117
    assert body["identification"]["possibleRivals"] == 11116
    assert len(body["candidates"]) <= 18
    assert body["identification"]["rivalCount"] >= len(body["candidates"])
    if body["recommendation"]:
        assert 0 <= body["recommendation"]["remaining"] <= body["identification"]["rivalCount"]


def test_n8_minimum_is_explicitly_unavailable_and_n9_rejected() -> None:
    minimum = client.post("/api/identify/minimum-set", json=n8_payload()).json()
    assert minimum["status"] == "unavailable" and minimum["sets"] == [] and "performans" in minimum["message"]
    assert client.post("/api/identify/analyze", json={"nodes": list("ABCDEFGHI"), "edges": [], "invariants": []}).status_code == 422


def test_n8_explore_returns_matching_nonisomorphic_pair_and_separator() -> None:
    body = client.post("/api/twins/search", json={"max_order": 8, "exact_order": 8, "invariants": ["Edges", "Degree sequence"]}).json()
    first, second = body["graphs"]
    assert body["collisionFound"] and not body["isomorphic"]
    assert first["values"] == second["values"]
    assert not nx.is_isomorphic(nx.from_graph6_bytes(first["graph6"].encode()), nx.from_graph6_bytes(second["graph6"].encode()))
    separator = body["separating"]
    assert separator and separator["g"] != separator["h"]


def test_atlas_domain_counts_are_unchanged() -> None:
    assert [sum(1 for _ in iter_atlas_connected_graphs(order)) for order in (5, 6, 7)] == [21, 112, 853]
