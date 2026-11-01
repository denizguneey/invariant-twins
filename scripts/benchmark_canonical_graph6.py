"""Measure exact bounded canonical graph identity on deterministic samples."""
from __future__ import annotations

from statistics import median
from time import perf_counter

import networkx as nx

from invariant_twins.canonical_identity import canonical_graph6
from invariant_twins.graph_sources import N8_CATALOG, iter_atlas_connected_graphs


def sample(order: int) -> nx.Graph:
    if order <= 7:
        return next(iter_atlas_connected_graphs(order))
    with N8_CATALOG.open(encoding="ascii") as source:
        return nx.from_graph6_bytes(next(source).strip().encode())


def main() -> None:
    for order in range(5, 9):
        graph = sample(order)
        timings = []
        for _ in range(7):
            started = perf_counter(); canonical_graph6(graph); timings.append((perf_counter() - started) * 1000)
        print(f"n={order} median_ms={median(timings):.3f} max_ms={max(timings):.3f}")


if __name__ == "__main__":
    main()
