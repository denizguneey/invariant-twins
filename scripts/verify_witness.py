"""Independently verify a compact finite-frontier collision record."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys

import networkx as nx

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from invariant_twins.frontier import fingerprint


def _tupleify(value):
    """Convert JSON lists back to the canonical nested tuple representation."""
    if isinstance(value, list):
        return tuple(_tupleify(item) for item in value)
    return value


def verify_result(path: Path) -> dict[str, object]:
    """Recompute every claimed witness property without trusting cached fields."""
    record = json.loads(path.read_text(encoding="utf-8"))
    required = ("graph6_a", "graph6_b", "invariant_names", "shared_fingerprint", "first_collision_order")
    missing = [key for key in required if key not in record]
    if missing:
        raise ValueError(f"missing witness fields: {', '.join(missing)}")
    if not record["graph6_a"] or not record["graph6_b"]:
        raise ValueError("result does not contain a collision witness")
    try:
        graph_a = nx.from_graph6_bytes(record["graph6_a"].encode())
        graph_b = nx.from_graph6_bytes(record["graph6_b"].encode())
    except nx.NetworkXError as error:
        raise ValueError("invalid graph6 witness") from error
    order = record["first_collision_order"]
    if graph_a.number_of_nodes() != order or graph_b.number_of_nodes() != order:
        raise ValueError("witness order does not match claimed collision order")
    if not nx.is_connected(graph_a) or not nx.is_connected(graph_b):
        raise ValueError("witness graphs must be connected")
    names = tuple(record["invariant_names"])
    value_a, value_b = fingerprint(graph_a, names), fingerprint(graph_b, names)
    claimed = _tupleify(record["shared_fingerprint"])
    if value_a != value_b or value_a != claimed:
        raise ValueError("claimed exact fingerprint does not match recomputation")
    if nx.is_isomorphic(graph_a, graph_b):
        raise ValueError("witness graphs are isomorphic")
    return {"verified": True, "order": order, "degree_sequence": tuple(sorted((degree for _, degree in graph_a.degree()), reverse=True)), "invariant_names": names}


def main() -> int:
    parser = argparse.ArgumentParser(description="Independently verify a Frontier collision result JSON")
    parser.add_argument("result", type=Path)
    args = parser.parse_args()
    print(json.dumps(verify_result(args.result), default=list, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
