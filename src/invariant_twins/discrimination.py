"""Exact fingerprint-partition metrics for finite connected graph domains."""
from __future__ import annotations

from collections import Counter
from functools import lru_cache
from math import comb
from typing import Iterable

from .graph_sources import iter_atlas_connected_graphs
from .invariants import INVARIANT_REGISTRY, compute_invariant
from .n8_index import N8Index
from .atlas_index import AtlasIndex


def summarize_class_sizes(sizes: Iterable[int]) -> dict[str, int | float]:
    values = list(sizes); domain = sum(values); singleton = sum(size == 1 for size in values)
    indistinguishable = sum(comb(size, 2) for size in values); total_pairs = comb(domain, 2)
    return {"domainSize": domain, "fingerprintClassCount": len(values), "singletonClassCount": singleton,
            "uniqueGraphCount": singleton, "collisionClassCount": sum(size > 1 for size in values),
            "largestCollisionClassSize": max(values, default=0), "indistinguishablePairCount": indistinguishable,
            "totalPairCount": total_pairs, "uniqueIdentificationRate": singleton / domain if domain else 0.0,
            "pairSeparationRate": 1 - indistinguishable / total_pairs if total_pairs else 1.0}


def _atlas(order: int, names: tuple[str, ...]) -> dict[str, int | float]:
    return summarize_class_sizes(AtlasIndex().fingerprint_class_sizes(order, names))


def _n8(names: tuple[str, ...]) -> dict[str, int | float]:
    return summarize_class_sizes(N8Index().fingerprint_class_sizes(names))


@lru_cache(maxsize=32)
def _discrimination_power(selected: tuple[str, ...]) -> tuple[dict[str, int | float], ...]:
    return tuple({"order": order, **(_n8(selected) if order == 8 else _atlas(order, selected))} for order in range(4, 9))


def discrimination_power(names: Iterable[str]) -> list[dict[str, int | float]]:
    requested = set(names); unknown = requested - set(INVARIANT_REGISTRY)
    if unknown: raise KeyError(", ".join(sorted(unknown)))
    selected = tuple(name for name in INVARIANT_REGISTRY if name in requested)
    return list(_discrimination_power(selected))
