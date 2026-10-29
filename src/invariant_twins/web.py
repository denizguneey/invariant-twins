"""FastAPI adapter and single-process production server for the React app."""
from __future__ import annotations

import json
from functools import lru_cache
from pathlib import Path
from typing import Any

import networkx as nx
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field, model_validator

from .graph_sources import connected_graph_domain
from .n8_index import N8Index, N8IndexError
from .identification import candidate_class, graph_fingerprint, minimum_identifying_sets, rank_next_invariants, supported_graph
from .invariants import INVARIANT_REGISTRY, compute_invariant, degree_sequence
from .twin_view import G_GRAPH6, H_GRAPH6, witnesses
from .invariants import ALL_INVARIANTS, invariant_values
from .search import fingerprint as ui_fingerprint
from .search import find_minimum_separating_sets
from .frontier import PRESETS

ROOT = Path(__file__).resolve().parents[2]
DIST = ROOT / "web" / "frontend" / "dist"


class GraphPayload(BaseModel):
    nodes: list[str] = Field(max_length=8)
    edges: list[tuple[str, str]] = []
    invariants: list[str] = []

    @model_validator(mode="after")
    def validate_graph(self) -> "GraphPayload":
        if len(set(self.nodes)) != len(self.nodes):
            raise ValueError("Düğüm kimlikleri benzersiz olmalıdır.")
        unknown = set(self.invariants) - set(INVARIANT_REGISTRY)
        if unknown:
            raise ValueError(f"Bilinmeyen invariant: {', '.join(sorted(unknown))}")
        pairs: set[tuple[str, str]] = set()
        for source, target in self.edges:
            if source == target or source not in self.nodes or target not in self.nodes:
                raise ValueError("Kenarlar farklı ve geçerli düğümler arasında olmalıdır.")
            pair = tuple(sorted((source, target)))
            if pair in pairs:
                raise ValueError("Bir kenar yalnızca bir kez eklenebilir.")
            pairs.add(pair)
        return self


class TwinsPayload(BaseModel):
    max_order: int = Field(default=7, ge=3, le=8)
    exact_order: int | None = Field(default=None, ge=3, le=8)
    invariants: list[str] = ["Edges", "Degree sequence"]

    @model_validator(mode="after")
    def validate_selection(self) -> "TwinsPayload":
        if self.exact_order is not None and self.exact_order > self.max_order:
            raise ValueError("Kesin mertebe üst sınırı aşamaz.")
        unknown = set(self.invariants) - set(ALL_INVARIANTS)
        if unknown:
            raise ValueError(f"Bilinmeyen invariant: {', '.join(sorted(unknown))}")
        return self


def graph_from_payload(payload: GraphPayload) -> nx.Graph:
    graph = nx.Graph()
    graph.add_nodes_from(payload.nodes)
    graph.add_edges_from(payload.edges)
    return graph


def graph6(graph: nx.Graph) -> str:
    mapping = {node: index for index, node in enumerate(sorted(graph.nodes()))}
    return nx.to_graph6_bytes(nx.relabel_nodes(graph, mapping), header=False).decode().strip()


def display(value: object) -> str:
    return json.dumps(value, ensure_ascii=False) if isinstance(value, (tuple, list)) else str(value)


def positioned(graph: nx.Graph) -> dict[str, Any]:
    nodes = sorted(graph.nodes())
    positions = nx.spring_layout(graph, seed=17) if len(nodes) > 1 else ({nodes[0]: (0.0, 0.0)} if nodes else {})
    return {
        "nodes": [{"id": str(node), "x": 110 + 80 * float(positions[node][0]), "y": 70 - 50 * float(positions[node][1])} for node in nodes],
        "edges": [{"source": str(a), "target": str(b)} for a, b in graph.edges()],
    }


@lru_cache(maxsize=8)
def domain(order: int) -> list[nx.Graph]:
    return list(connected_graph_domain(order))


def analyze(payload: GraphPayload) -> dict[str, Any]:
    graph = graph_from_payload(payload)
    base = {
        "graph": {"order": graph.number_of_nodes(), "size": graph.number_of_edges(), "connected": bool(graph and nx.is_connected(graph)), "graph6": None},
        "invariants": {},
        "identification": None,
        "recommendation": None,
        "candidates": [],
        "fingerprint": None,
        "message": None,
    }
    if not graph:
        return base | {"message": "Başlamak için en az bir düğüm ekleyin."}
    if not nx.is_connected(graph):
        return base | {"message": "Tanımlamaya başlamak için tüm düğümleri bağlayın."}
    if not supported_graph(graph):
        return base | {"message": "Bu sonlu karşılaştırma alanında en fazla 8 düğümlü bağlı basit graflar desteklenir."}
    if graph.number_of_nodes() == 8:
        return analyze_n8(graph, payload, base)
    invariant_values = {name: display(compute_invariant(graph, name)) for name in INVARIANT_REGISTRY}
    records = domain(graph.number_of_nodes())
    matching = candidate_class(graph, payload.invariants, records)
    rivals = [candidate for candidate in matching if not nx.is_isomorphic(candidate, graph)]
    ranking = rank_next_invariants(graph, matching, payload.invariants)
    # Equal reductions are pedagogical choices, not different mathematics.
    # Prefer transparent structural invariants before exact spectral encodings.
    simplicity = {
        "triangle_count": 0, "bridge_count": 1, "clique_number": 2,
        "independence_number": 3, "chromatic_number": 4,
        "degree_sequence": 5, "adjacency_charpoly": 6,
        "laplacian_charpoly": 7, "signless_laplacian_charpoly": 8,
        "distance_charpoly": 9, "generalized_charpoly": 10,
    }
    ranking.sort(key=lambda item: (-item[1], item[2], simplicity.get(item[0], 99), item[0]))
    possible = max(0, len(records) - 1)
    recommendation = None
    if rivals and ranking:
        best = ranking[0]
        recommendation = {"id": best[0], "remaining": max(0, best[2] - 1)}
    candidates = []
    for candidate in rivals[:18]:
        record = positioned(candidate)
        record.update({"order": candidate.number_of_nodes(), "size": candidate.number_of_edges(), "graph6": graph6(candidate)})
        candidates.append(record)
    return base | {"graph": base["graph"] | {"connected": True, "graph6": graph6(graph), "degreeSequence": display(degree_sequence(graph)), "triangleCount": compute_invariant(graph, "triangle_count")}, "invariants": invariant_values, "identification": {"rivalCount": len(rivals), "domainSize": len(records), "possibleRivals": possible, "eliminatedRivals": max(0, possible - len(rivals)), "eliminatedPercent": round(100 * (1 - len(rivals) / possible)) if possible else 100, "unique": not rivals}, "recommendation": recommendation, "candidates": candidates, "fingerprint": display(graph_fingerprint(graph, payload.invariants))}


def analyze_n8(graph: nx.Graph, payload: GraphPayload, base: dict[str, Any]) -> dict[str, Any]:
    """Production n=8 request: compute the user graph, never load the catalogue."""
    try:
        index = N8Index()
    except N8IndexError as error:
        return base | {"message": str(error)}
    # Generalized polynomial is an exact complete n=8 key in the verified index;
    # it identifies the user's catalogue class with one targeted materialization.
    user_values = {name: compute_invariant(graph, name) for name in INVARIANT_REGISTRY}
    own = index.ids_matching({"generalized_charpoly": user_values["generalized_charpoly"]})
    if len(own) != 1:
        return base | {"message": "n=8 kullanıcı grafı doğrulanmış katalog sınıfıyla eşleştirilemedi."}
    own_id = own[0]
    own_graph = nx.from_graph6_bytes(index.graph6(own_id).encode())
    if not nx.is_isomorphic(own_graph, graph):
        return base | {"message": "n=8 katalog eşleştirmesi doğrulanamadı."}
    selected = {name: user_values[name] for name in payload.invariants}
    matching = index.ids_matching(selected)
    rivals = [item for item in matching if item != own_id]
    candidate_values = index.values(matching, INVARIANT_REGISTRY)
    ranking = []
    for name in INVARIANT_REGISTRY:
        if name not in selected:
            remaining = sum(candidate_values[item][name] == user_values[name] for item in matching)
            ranking.append((name, len(matching) - remaining, remaining))
    simplicity = {"triangle_count": 0, "bridge_count": 1, "clique_number": 2, "independence_number": 3, "chromatic_number": 4, "degree_sequence": 5, "adjacency_charpoly": 6, "laplacian_charpoly": 7, "signless_laplacian_charpoly": 8, "distance_charpoly": 9, "generalized_charpoly": 10}
    ranking.sort(key=lambda item: (-item[1], item[2], simplicity.get(item[0], 99), item[0]))
    candidates = []
    for item, encoded in index.graph6_many(rivals[:18]):
        candidate = nx.from_graph6_bytes(encoded.encode())
        record = positioned(candidate); record.update({"order": 8, "size": candidate.number_of_edges(), "graph6": encoded}); candidates.append(record)
    recommendation = None if not rivals or not ranking else {"id": ranking[0][0], "remaining": max(0, ranking[0][2] - 1)}
    return base | {"graph": base["graph"] | {"connected": True, "graph6": graph6(graph), "degreeSequence": display(degree_sequence(graph)), "triangleCount": user_values["triangle_count"]}, "invariants": {name: display(value) for name, value in user_values.items()}, "identification": {"rivalCount": len(rivals), "domainSize": index.domain_size, "possibleRivals": index.domain_size - 1, "eliminatedRivals": index.domain_size - 1 - len(rivals), "eliminatedPercent": round(100 * (1 - len(rivals) / (index.domain_size - 1))), "unique": not rivals}, "recommendation": recommendation, "candidates": candidates, "fingerprint": display(graph_fingerprint(graph, payload.invariants))}


def twins_search_n8(payload: TwinsPayload) -> dict[str, Any]:
    """Find an n=8 collision from index values, decoding only the returned pair."""
    try:
        index = N8Index()
    except N8IndexError as error:
        raise HTTPException(status_code=503, detail=str(error))
    names = {"Degree sequence": "degree_sequence", "Triangle count": "triangle_count", "Clique number": "clique_number", "Bridge count": "bridge_count", "Independence number": "independence_number", "Chromatic number": "chromatic_number", "Adjacency spectrum": "adjacency_charpoly"}
    selected = [names[item] for item in payload.invariants if item in names]
    rows = index.values(range(1, index.domain_size + 1), selected)
    buckets: dict[tuple[object, ...], int] = {}
    for graph_id, values in rows.items():
        edge = index.db.execute("SELECT edge_count FROM graphs WHERE id=?", (graph_id,)).fetchone()[0]
        key = tuple(edge if item == "Edges" else display(values[names[item]]) for item in payload.invariants)
        if key in buckets:
            first, second = buckets[key], graph_id
            first_graph, second_graph = (nx.from_graph6_bytes(index.graph6(item).encode()) for item in (first, second))
            values2 = index.values((first, second), INVARIANT_REGISTRY)
            differing = next((name for name in INVARIANT_REGISTRY if name not in selected and values2[first][name] != values2[second][name]), None)
            def record(name: str, graph_id: int, graph: nx.Graph) -> dict[str, Any]:
                return {"name": name, "graph6": index.graph6(graph_id), "order": 8, "size": graph.number_of_edges(), "values": {item: display(edge if item == "Edges" else values2[graph_id][names[item]]) for item in payload.invariants}, **positioned(graph)}
            return {"requested": payload.model_dump(), "finiteDomain": {"maxOrder": payload.max_order, "exactOrder": 8, "connectedSimple": True}, "collisionFound": True, "isomorphic": False, "graphs": [record("G", first, first_graph), record("H", second, second_graph)], "separating": None if differing is None else {"id": differing, "g": display(values2[first][differing]), "h": display(values2[second][differing])}}
        buckets[key] = graph_id
    return {"requested": payload.model_dump(), "finiteDomain": {"maxOrder": payload.max_order, "exactOrder": 8, "connectedSimple": True}, "collisionFound": False, "isomorphic": None, "graphs": [], "separating": None}


def create_app() -> FastAPI:
    app = FastAPI(title="Invariant Twins", docs_url="/api/docs", redoc_url=None)

    @app.get("/api/health")
    def health() -> dict[str, str]:
        return {"status": "ok"}

    @app.get("/api/invariants")
    def invariants() -> list[dict[str, str]]:
        return [{"id": item.id, "name": item.display_name} for item in INVARIANT_REGISTRY.values()]

    @app.post("/api/identify/analyze")
    def identify_analyze(payload: GraphPayload) -> dict[str, Any]:
        return analyze(payload)

    @app.post("/api/identify/minimum-set")
    def identify_minimum(payload: GraphPayload) -> dict[str, Any]:
        graph = graph_from_payload(payload)
        if graph.number_of_nodes() == 8:
            try:
                N8Index()
            except N8IndexError as error:
                return {"status": "unavailable", "sets": [], "message": str(error)}
            # Exhaustive subset search is deliberately not exposed until its
            # interactive bound is benchmarked; [] must never mean disabled.
            return {"status": "unavailable", "sets": [], "message": "Minimum tanımlayıcı küme n=8 için performans nedeniyle henüz etkinleştirilmedi."}
        if not graph or not nx.is_connected(graph) or not supported_graph(graph):
            return {"sets": [], "message": "Minimum küme yalnızca bağlı ve desteklenen graflar için hesaplanabilir."}
        return {"status": "ready", "sets": [list(item) for item in minimum_identifying_sets(graph, domain(graph.number_of_nodes()))], "message": None}

    @app.get("/api/twins")
    def twins() -> dict[str, Any]:
        g, h = witnesses()
        return {"graphs": [{"name": "G", "graph6": G_GRAPH6, "order": g.number_of_nodes(), "size": g.number_of_edges(), **positioned(g)}, {"name": "H", "graph6": H_GRAPH6, "order": h.number_of_nodes(), "size": h.number_of_edges(), **positioned(h)}], "separating": {"name": "diameter", "g": nx.diameter(g), "h": nx.diameter(h)}}

    @app.post("/api/twins/search")
    def twins_search(payload: TwinsPayload) -> dict[str, Any]:
        if payload.exact_order == 8 or (payload.exact_order is None and payload.max_order == 8):
            return twins_search_n8(payload)
        buckets: dict[tuple[object, ...], list[tuple[nx.Graph, dict[str, object]]]] = {}
        for order in range(1, payload.max_order + 1):
            if payload.exact_order is not None and order != payload.exact_order:
                continue
            for graph in domain(order):
                values = invariant_values(graph)
                key = (order,) + ui_fingerprint(values, payload.invariants)
                for other, other_values in buckets.get(key, []):
                    if not nx.is_isomorphic(other, graph):
                        differing = next((name for name in ALL_INVARIANTS if name not in payload.invariants and other_values[name] != values[name]), None)
                        return {
                            "requested": payload.model_dump(),
                            "finiteDomain": {"maxOrder": payload.max_order, "exactOrder": payload.exact_order, "connectedSimple": True},
                            "collisionFound": True, "isomorphic": False,
                            "graphs": [
                                {"name": "G", "graph6": graph6(other), "order": other.number_of_nodes(), "size": other.number_of_edges(), "values": {name: display(other_values[name]) for name in payload.invariants}, **positioned(other)},
                                {"name": "H", "graph6": graph6(graph), "order": graph.number_of_nodes(), "size": graph.number_of_edges(), "values": {name: display(values[name]) for name in payload.invariants}, **positioned(graph)},
                            ],
                            "separating": None if differing is None else {"id": differing, "g": display(other_values[differing]), "h": display(values[differing])},
                        }
                buckets.setdefault(key, []).append((graph, values))
        return {"requested": payload.model_dump(), "finiteDomain": {"maxOrder": payload.max_order, "exactOrder": payload.exact_order, "connectedSimple": True}, "collisionFound": False, "isomorphic": None, "graphs": [], "separating": None}

    @app.post("/api/twins/minimum-separating")
    def twins_minimum_separating(payload: TwinsPayload) -> dict[str, Any]:
        records = []
        for order in range(1, payload.max_order + 1):
            if payload.exact_order is not None and order != payload.exact_order:
                continue
            for index, graph in enumerate(domain(order)):
                records.append((index, graph, invariant_values(graph)))
        return {"sets": [list(item) for item in find_minimum_separating_sets(records, ALL_INVARIANTS)], "graphCount": len(records), "maxOrder": payload.max_order}

    @app.get("/api/frontier")
    def frontier() -> dict[str, Any]:
        raw = json.loads((ROOT / "research" / "index.json").read_text(encoding="utf-8"))
        counts = [1, 1, 2, 6, 21, 112, 853, 11117, 261080]
        rows = []
        for record in raw["experiments"]:
            collision = record["first_collision_order"]
            cells = [{"order": order, "graphCount": counts[order - 1], "status": "verified" if order <= record["frontier"] else ("collision" if order == collision else "unreported")} for order in range(1, len(counts) + 1)]
            rows.append({"preset": record["preset"], "invariants": list(PRESETS.get(record["preset"], ())), "frontier": record["frontier"], "firstCollisionOrder": collision, "verificationStatus": record["verification_status"], "cells": cells})
        return {"rows": rows, "disclaimer": raw["disclaimer"]}

    @app.get("/api/research")
    def research() -> dict[str, Any]:
        return {"archive": json.loads((ROOT / "research" / "index.json").read_text(encoding="utf-8")), "documents": ["docs/background.md", "docs/mathematical-contract.md", "docs/reproducing-results.md"]}

    @app.get("/research-docs/{document_name}", include_in_schema=False)
    def research_document(document_name: str) -> FileResponse:
        allowed = {
            "background.md": ROOT / "docs" / "background.md",
            "mathematical-contract.md": ROOT / "docs" / "mathematical-contract.md",
            "reproducing-results.md": ROOT / "docs" / "reproducing-results.md",
        }
        document = allowed.get(document_name)
        if document is None:
            raise HTTPException(status_code=404, detail="Belge bulunamadı.")
        return FileResponse(document, media_type="text/markdown; charset=utf-8")

    if DIST.exists():
        app.mount("/assets", StaticFiles(directory=DIST / "assets"), name="assets")

        @app.get("/{path:path}", include_in_schema=False)
        def spa(path: str):
            candidate = DIST / path
            if path and candidate.is_file():
                return FileResponse(candidate)
            return FileResponse(DIST / "index.html")
    return app


app = create_app()


if __name__ == "__main__":
    import uvicorn
    print("Invariant Twins web uygulaması: http://127.0.0.1:8000")
    uvicorn.run("invariant_twins.web:app", host="127.0.0.1", port=8000, reload=False)
