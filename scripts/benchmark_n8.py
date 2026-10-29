"""Production-equivalent deterministic n=8 indexed-request benchmark."""
from __future__ import annotations

import time
import networkx as nx
from invariant_twins.n8_index import N8Index
from invariant_twins.web import GraphPayload, analyze


def payload(graph, invariants):
    return GraphPayload(nodes=[chr(65+n) for n in graph], edges=[(chr(65+a), chr(65+b)) for a, b in graph.edges()], invariants=list(invariants))


def main() -> None:
    index = N8Index()
    cases = [("degree", ("degree_sequence",)), ("degree+triangle", ("degree_sequence", "triangle_count")), ("structural", ("degree_sequence", "triangle_count", "bridge_count", "clique_number")), ("adjacency", ("adjacency_charpoly",)), ("laplacian", ("laplacian_charpoly",)), ("structural+spectral", ("degree_sequence", "triangle_count", "bridge_count", "clique_number", "adjacency_charpoly"))]
    for graph_id in (101, 4001, 9001):
        graph = nx.from_graph6_bytes(index.graph6(graph_id).encode())
        for name, invariants in cases:
            started = time.perf_counter(); result = analyze(payload(graph, invariants)); elapsed = time.perf_counter() - started
            recommendation = result["recommendation"] or {}
            print(f"id={graph_id} case={name} total={elapsed:.3f}s rivals={result['identification']['rivalCount']} next={recommendation.get('id')} after={recommendation.get('remaining')}")


if __name__ == "__main__":
    main()
