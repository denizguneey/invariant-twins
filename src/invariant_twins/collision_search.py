"""Exact degree-sequence plus spectrum collision searches."""

from collections import defaultdict
from collections.abc import Callable, Iterable, Iterator
from dataclasses import dataclass

import networkx as nx

from .invariants import adjacency_characteristic_polynomial


def fingerprint_degree_spectrum(graph: nx.Graph) -> tuple[tuple[int, ...], tuple[int, ...]]:
    """Return the exact fingerprint used by the Break the Fingerprint experiment."""
    degrees = tuple(sorted((degree for _, degree in graph.degree()), reverse=True))
    return degrees, adjacency_characteristic_polynomial(graph)


def graph6(graph: nx.Graph) -> str:
    """Return a header-free reproducible graph6 witness."""
    return nx.to_graph6_bytes(graph, header=False).decode().strip()


@dataclass(frozen=True)
class FingerprintCollision:
    order: int
    graph_a: nx.Graph
    graph_b: nx.Graph
    degree_sequence: tuple[int, ...]
    characteristic_polynomial: tuple[int, ...]
    graphs_examined: int
    order_exhaustively_completed: bool
    minimality_established: bool = False


@dataclass(frozen=True)
class FingerprintSearchResult:
    collision: FingerprintCollision | None
    graphs_examined: int
    orders_completed: tuple[int, ...]
    minimality_established: bool


def _find_collision_and_count(
    graphs: Iterable[nx.Graph], order: int, exhaustive: bool = True
) -> tuple[FingerprintCollision | None, int]:
    """Find a non-isomorphic collision while streaming one graph order."""
    buckets: dict[tuple[tuple[int, ...], tuple[int, ...]], list[nx.Graph]] = defaultdict(list)
    examined = 0
    for graph in graphs:
        examined += 1
        key = fingerprint_degree_spectrum(graph)
        for other in buckets[key]:
            if not nx.is_isomorphic(other, graph):
                return FingerprintCollision(order, other, graph, key[0], key[1], examined, False), examined
        buckets[key].append(graph)
    return None, examined


def find_collision_in_stream(graphs: Iterable[nx.Graph], order: int, exhaustive: bool = True) -> FingerprintCollision | None:
    """Find a non-isomorphic collision while streaming one graph order."""
    return _find_collision_and_count(graphs, order, exhaustive)[0]


def search_first_fingerprint_collision(
    start_order: int,
    end_order: int,
    graph_source: Callable[[int], Iterable[nx.Graph]],
    *,
    prefix_exhaustive: bool = False,
) -> FingerprintSearchResult:
    """Search orders in order, claiming minimality only after exhaustive coverage."""
    examined = 0
    completed: list[int] = []
    for order in range(start_order, end_order + 1):
        collision, order_examined = _find_collision_and_count(graph_source(order), order)
        if collision is not None:
            collision = FingerprintCollision(
                **{**collision.__dict__, "graphs_examined": examined + collision.graphs_examined,
                   "minimality_established": prefix_exhaustive and len(completed) == order - start_order}
            )
            return FingerprintSearchResult(collision, collision.graphs_examined, tuple(completed), collision.minimality_established)
        # An exhausted iterable is the only condition under which this order is certified.
        completed.append(order)
        examined += order_examined
    return FingerprintSearchResult(None, examined, tuple(completed), False)
