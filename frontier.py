"""Reusable exhaustive finite frontier searches over exact graph fingerprints."""

from __future__ import annotations

from collections import defaultdict
from collections.abc import Callable, Iterable
from dataclasses import asdict, dataclass
import platform
import sys
import time

import networkx as nx

from collision_search import graph6
from invariants import INVARIANT_REGISTRY, compute_invariant


PRESETS: dict[str, tuple[str, ...]] = {
    "F1": ("degree_sequence",),
    "F2": ("adjacency_charpoly",),
    "F3": ("degree_sequence", "adjacency_charpoly"),
    "F4": ("adjacency_charpoly", "laplacian_charpoly"),
    "F5": ("adjacency_charpoly", "signless_laplacian_charpoly"),
    "F6": ("degree_sequence", "adjacency_charpoly", "laplacian_charpoly"),
    "F7": ("degree_sequence", "adjacency_charpoly", "signless_laplacian_charpoly"),
    "F8": ("adjacency_charpoly", "laplacian_charpoly", "signless_laplacian_charpoly"),
    "F9": ("degree_sequence", "adjacency_charpoly", "laplacian_charpoly", "signless_laplacian_charpoly"),
    "F10": ("degree_sequence", "adjacency_charpoly", "laplacian_charpoly", "signless_laplacian_charpoly", "distance_charpoly"),
}

# These are reproducible, completed finite computations.  They are display
# metadata only; new research decisions always run ``compute_frontier``.
VERIFIED_FRONTIER_RESULTS: dict[str, dict[str, object]] = {
    "F1": {"frontier": 4, "first_collision_order": 5, "minimality_established": True},
    "F2": {"frontier": 5, "first_collision_order": 6, "minimality_established": True},
    "F3": {"frontier": 7, "first_collision_order": 8, "minimality_established": True},
    "F4": {"frontier": 8, "first_collision_order": None, "minimality_established": False},
    "F5": {"frontier": 8, "first_collision_order": None, "minimality_established": False},
    "F6": {"frontier": 8, "first_collision_order": None, "minimality_established": False},
    "F7": {"frontier": 8, "first_collision_order": None, "minimality_established": False},
    "F8": {"frontier": 8, "first_collision_order": None, "minimality_established": False},
    "F9": {"frontier": 8, "first_collision_order": None, "minimality_established": False},
    "F10": {"frontier": 7, "first_collision_order": None, "minimality_established": False},
}


@dataclass
class FrontierResult:
    invariant_names: tuple[str, ...]
    orders_checked: tuple[int, ...]
    graph_counts: dict[int, int]
    exhaustive_by_order: dict[int, bool]
    first_collision_order: int | None
    graph_a: nx.Graph | None
    graph_b: nx.Graph | None
    graph6_a: str | None
    graph6_b: str | None
    shared_fingerprint: tuple[object, ...] | None
    isomorphic: bool | None
    frontier: int | None
    minimality_established: bool
    elapsed_runtime: float

    def as_dict(self) -> dict[str, object]:
        """Return a JSON-ready finite-computation record."""
        data = asdict(self)
        data.pop("graph_a")
        data.pop("graph_b")
        data["invariant_display_names"] = [INVARIANT_REGISTRY[name].display_name for name in self.invariant_names]
        data["graph_counts"] = {str(order): count for order, count in self.graph_counts.items()}
        data["exhaustive_by_order"] = {str(order): value for order, value in self.exhaustive_by_order.items()}
        data["shared_fingerprint"] = list(self.shared_fingerprint) if self.shared_fingerprint is not None else None
        data["software"] = {"python": sys.version.split()[0], "networkx": nx.__version__, "platform": platform.platform()}
        data["disclaimer"] = "Absence of a collision through an order is a finite computational result, not a proof for arbitrary graph order."
        return data


def fingerprint(graph: nx.Graph, invariant_names: Iterable[str]) -> tuple[object, ...]:
    """Compute an exact fingerprint in the caller's requested invariant order."""
    names = tuple(invariant_names)
    unknown = set(names) - INVARIANT_REGISTRY.keys()
    if unknown:
        raise KeyError(f"unknown invariant IDs: {', '.join(sorted(unknown))}")
    return tuple(compute_invariant(graph, name) for name in names)


def find_collision_for_order(
    order: int,
    invariant_names: Iterable[str],
    graph_source: Callable[[int], Iterable[nx.Graph]],
    *,
    exhaustive: bool = True,
) -> tuple[nx.Graph | None, nx.Graph | None, tuple[object, ...] | None, int, bool]:
    """Exhaust one order, returning the first non-isomorphic exact collision."""
    buckets: dict[tuple[object, ...], list[nx.Graph]] = defaultdict(list)
    collision: tuple[nx.Graph, nx.Graph, tuple[object, ...]] | None = None
    count = 0
    for graph in graph_source(order):
        if graph.number_of_nodes() != order:
            raise ValueError(f"graph source emitted order {graph.number_of_nodes()} while checking {order}")
        count += 1
        key = fingerprint(graph, invariant_names)
        if collision is None:
            for other in buckets[key]:
                if not nx.is_isomorphic(other, graph):
                    collision = other, graph, key
                    break
        buckets[key].append(graph)
    if collision is None:
        return None, None, None, count, exhaustive
    return collision[0], collision[1], collision[2], count, exhaustive


def compute_frontier(
    invariant_names: Iterable[str],
    start_order: int,
    max_order: int,
    graph_source: Callable[[int], Iterable[nx.Graph]],
    *,
    exhaustive_by_order: Callable[[int], bool] | None = None,
) -> FrontierResult:
    """Search increasing orders and stop only after a fully enumerated collision order."""
    names = tuple(invariant_names)
    started = time.perf_counter()
    counts: dict[int, int] = {}
    coverage: dict[int, bool] = {}
    checked: list[int] = []
    for order in range(start_order, max_order + 1):
        exhaustive = exhaustive_by_order(order) if exhaustive_by_order else True
        graph_a, graph_b, shared, count, completed = find_collision_for_order(order, names, graph_source, exhaustive=exhaustive)
        counts[order], coverage[order] = count, completed
        checked.append(order)
        if graph_a is not None:
            all_prior = all(coverage.get(previous, False) for previous in range(start_order, order + 1))
            return FrontierResult(names, tuple(checked), counts, coverage, order, graph_a, graph_b, graph6(graph_a), graph6(graph_b), shared, nx.is_isomorphic(graph_a, graph_b), order - 1 if all_prior else None, all_prior, time.perf_counter() - started)
        if not completed:
            break
    all_complete = all(coverage.values())
    return FrontierResult(names, tuple(checked), counts, coverage, None, None, None, None, None, None, None, max(checked) if all_complete and checked else None, False, time.perf_counter() - started)


def invariant_diagnostics(graphs: Iterable[nx.Graph], invariant_name: str) -> dict[str, int | float]:
    """Return descriptive, order-sensitive collision-bucket statistics."""
    buckets: dict[tuple[int, object], int] = defaultdict(int)
    total = 0
    for graph in graphs:
        total += 1
        buckets[(graph.number_of_nodes(), compute_invariant(graph, invariant_name))] += 1
    sizes = list(buckets.values())
    return {"number_of_graphs": total, "number_of_distinct_values": len(buckets), "number_of_collision_buckets": sum(size > 1 for size in sizes), "largest_collision_bucket": max(sizes, default=0), "singleton_percentage": round(100 * sum(size == 1 for size in sizes) / len(sizes), 2) if sizes else 0.0}
