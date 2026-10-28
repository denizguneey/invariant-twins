"""Reusable exact finite-domain searches over graph invariant fingerprints."""

from collections import defaultdict
from itertools import combinations
from typing import Any, Iterable, Mapping

import networkx as nx


GraphRecord = tuple[Any, nx.Graph, Mapping[str, object]]


def fingerprint(values: Mapping[str, object], invariant_names: Iterable[str]) -> tuple[object, ...]:
    """Return a fingerprint without graph order; order is a free partition key."""
    return tuple(values[name] for name in invariant_names)


def find_collision_witness(
    graphs: Iterable[GraphRecord], invariant_names: Iterable[str]
) -> tuple[GraphRecord, GraphRecord] | None:
    """Return a non-isomorphic same-order collision, if one exists."""
    buckets: dict[tuple[int, tuple[object, ...]], list[GraphRecord]] = defaultdict(list)
    names = tuple(invariant_names)
    for record in graphs:
        _, graph, values = record
        key = (graph.number_of_nodes(), fingerprint(values, names))
        for other in buckets[key]:
            if not nx.is_isomorphic(other[1], graph):
                return other, record
        buckets[key].append(record)
    return None


def separates_universe(graphs: Iterable[GraphRecord], invariant_names: Iterable[str]) -> bool:
    """Whether invariants separate every non-isomorphic pair within each order."""
    return find_collision_witness(graphs, invariant_names) is None


def find_minimum_separating_sets(
    graphs: Iterable[GraphRecord], invariant_names: Iterable[str]
) -> list[tuple[str, ...]]:
    """Exhaustively return every cardinality-minimum separating invariant set."""
    records = list(graphs)
    names = tuple(invariant_names)
    for size in range(len(names) + 1):
        separating_sets = [
            subset
            for subset in combinations(names, size)
            if separates_universe(records, subset)
        ]
        if separating_sets:
            return separating_sets
    return []


def invariant_diagnostics(graphs: Iterable[GraphRecord], invariant_names: Iterable[str]) -> list[dict[str, int | str]]:
    """Describe individual-invariant collision structure within free order partitions."""
    records = list(graphs)
    rows: list[dict[str, int | str]] = []
    for name in invariant_names:
        buckets: dict[tuple[int, object], int] = defaultdict(int)
        for _, graph, values in records:
            buckets[(graph.number_of_nodes(), values[name])] += 1
        collisions = [size for size in buckets.values() if size > 1]
        rows.append({
            "Invariant": name,
            "Distinct fingerprints": len(buckets),
            "Collision buckets": len(collisions),
            "Largest collision bucket": max(collisions, default=1),
        })
    return rows
