"""Exact, bounded canonical graph identity for the integrated graph orders.

The local environment may not provide nauty/Traces.  This module therefore
uses deterministic equitable partition refinement only to reduce the exact
search, then exhaustively enumerates every permutation remaining inside each
cell.  It is a canonical-labelling algorithm for simple undirected graphs of
order at most eight; it is not a graph hash or a heuristic.
"""
from __future__ import annotations

from itertools import permutations, product

import networkx as nx


MAX_ORDER = 8


def _validate(graph: nx.Graph) -> None:
    if not isinstance(graph, nx.Graph) or graph.is_directed() or graph.is_multigraph():
        raise TypeError("canonical_graph6 supports only simple undirected networkx.Graph instances")
    if nx.number_of_selfloops(graph):
        raise ValueError("canonical_graph6 does not support looped graphs")
    if graph.number_of_nodes() > MAX_ORDER:
        raise ValueError(f"canonical_graph6 supports graphs through n={MAX_ORDER}")


def _equitable_cells(graph: nx.Graph) -> tuple[tuple[object, ...], ...]:
    """Return isomorphism-invariant cells, ordered without vertex labels."""
    nodes = tuple(graph.nodes)
    colors = {node: graph.degree(node) for node in nodes}
    while True:
        color_values = tuple(sorted(set(colors.values())))
        signatures = {
            node: (colors[node], tuple(sum(colors[neighbor] == color for neighbor in graph[node]) for color in color_values))
            for node in nodes
        }
        signature_values = tuple(sorted(set(signatures.values())))
        next_colors = {node: signature_values.index(signatures[node]) for node in nodes}
        if all(next_colors[node] == colors[node] for node in nodes):
            break
        colors = next_colors
    return tuple(tuple(node for node in nodes if colors[node] == color) for color in sorted(set(colors.values())))


def _graph6_for_order(graph: nx.Graph, ordered: tuple[object, ...]) -> str:
    """Encode a specified vertex order as graph6 without using input labels."""
    bits = [int(graph.has_edge(ordered[first], ordered[second])) for first in range(len(ordered)) for second in range(first + 1, len(ordered))]
    encoded = [chr(len(ordered) + 63)]
    for start in range(0, len(bits), 6):
        block = bits[start:start + 6]
        encoded.append(chr(63 + sum(bit << (5 - index) for index, bit in enumerate(block))))
    return "".join(encoded)


def canonical_graph6(graph: nx.Graph) -> str:
    """Return an exact label-independent graph6 identity for a simple graph.

    Two inputs return the same result exactly when they are isomorphic.  The
    ordinary graph6 functions elsewhere in the application remain unchanged.
    """
    _validate(graph)
    cells = _equitable_cells(graph)
    best: str | None = None
    for within_cells in product(*(permutations(cell) for cell in cells)):
        candidate = _graph6_for_order(graph, tuple(node for cell in within_cells for node in cell))
        if best is None or candidate < best:
            best = candidate
    return best or "?"
