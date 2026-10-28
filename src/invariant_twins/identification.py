"""Exact, finite-domain functions for identifying one user-supplied graph."""

from __future__ import annotations

from itertools import combinations
from typing import Iterable

import networkx as nx

from .invariants import INVARIANT_REGISTRY, compute_invariant


def supported_graph(target: nx.Graph) -> bool:
    """Whether a graph is in the interactive Graph Atlas comparison domain."""
    return 1 <= target.number_of_nodes() <= 7 and nx.is_connected(target) and not target.is_directed()


def graph_fingerprint(graph: nx.Graph, invariant_ids: Iterable[str]) -> tuple[object, ...]:
    """Return exact invariant values in the requested deterministic order."""
    names = tuple(invariant_ids)
    unknown = set(names) - set(INVARIANT_REGISTRY)
    if unknown:
        raise KeyError(f"unknown invariants: {', '.join(sorted(unknown))}")
    return tuple(compute_invariant(graph, name) for name in names)


def candidate_class(target: nx.Graph, invariant_ids: Iterable[str], domain: Iterable[nx.Graph]) -> list[nx.Graph]:
    """Return every same-order atlas graph matching the target's exact fingerprint."""
    if not supported_graph(target):
        raise ValueError("Identify My Graph supports connected simple graphs with 1 to 7 vertices.")
    target_value = graph_fingerprint(target, invariant_ids)
    return [
        graph for graph in domain
        if graph.number_of_nodes() == target.number_of_nodes()
        and graph_fingerprint(graph, invariant_ids) == target_value
    ]


def candidate_count_for_target(target: nx.Graph, invariant_ids: Iterable[str], candidates: Iterable[nx.Graph]) -> int:
    """Count candidates retaining the target value for an additional fingerprint."""
    target_value = graph_fingerprint(target, invariant_ids)
    return sum(graph_fingerprint(graph, invariant_ids) == target_value for graph in candidates)


def rank_next_invariants(target: nx.Graph, candidates: Iterable[nx.Graph], selected: Iterable[str]) -> list[tuple[str, int, int]]:
    """Rank unselected invariants by deterministic reduction of the target class."""
    records = list(candidates)
    selected_set = set(selected)
    current = len(records)
    ranking = []
    for invariant_id in sorted(set(INVARIANT_REGISTRY) - selected_set):
        remaining = candidate_count_for_target(target, (invariant_id,), records)
        ranking.append((invariant_id, current - remaining, remaining))
    return sorted(ranking, key=lambda row: (-row[1], row[2], row[0]))


def minimum_identifying_sets(target: nx.Graph, domain: Iterable[nx.Graph], invariant_ids: Iterable[str] | None = None) -> list[tuple[str, ...]]:
    """Return all cardinality-minimum exact fingerprints unique for this target."""
    names = tuple(sorted(invariant_ids or INVARIANT_REGISTRY))
    records = [graph for graph in domain if graph.number_of_nodes() == target.number_of_nodes()]
    if not supported_graph(target):
        raise ValueError("Identify My Graph supports connected simple graphs with 1 to 7 vertices.")
    for size in range(len(names) + 1):
        solutions = [subset for subset in combinations(names, size) if len(candidate_class(target, subset, records)) == 1]
        if solutions:
            return solutions
    return []
