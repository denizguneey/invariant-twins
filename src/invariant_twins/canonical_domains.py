"""Exact canonical identity lookup for the complete Graph Atlas domains."""
from __future__ import annotations

from functools import lru_cache

import networkx as nx

from .canonical_identity import canonical_graph6
from .graph_sources import iter_atlas_connected_graphs


@lru_cache(maxsize=7)
def atlas_by_canonical_graph6(order: int) -> dict[str, nx.Graph]:
    """Map each connected Atlas isomorphism class to its exact canonical ID."""
    if not 1 <= order <= 7:
        raise ValueError("Graph Atlas canonical lookup supports orders 1 through 7")
    result: dict[str, nx.Graph] = {}
    for graph in iter_atlas_connected_graphs(order):
        key = canonical_graph6(graph)
        if key in result:
            raise RuntimeError(f"duplicate canonical Graph Atlas identity at n={order}")
        result[key] = graph
    return result


def atlas_graph_for_canonical_graph6(order: int, identifier: str) -> nx.Graph | None:
    """Return the Graph Atlas representative for an exact canonical identity."""
    return atlas_by_canonical_graph6(order).get(identifier)
