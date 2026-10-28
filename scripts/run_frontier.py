"""Run a reproducible finite Fingerprint Frontier experiment."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from frontier import PRESETS, compute_frontier
from graph_sources import detect_geng, iter_connected_graphs


EXPECTED_CONNECTED_COUNTS = {5: 21, 8: 11117, 9: 261080}


def parse_invariant_names(value: str) -> tuple[str, ...]:
    """Parse comma-separated registry IDs without silently accepting blanks."""
    names = tuple(item.strip() for item in value.split(",") if item.strip())
    if not names:
        raise argparse.ArgumentTypeError("provide at least one invariant ID")
    return names


def markdown_report(label: str, result: dict[str, object]) -> str:
    """Render a concise Markdown companion for a JSON frontier record."""
    lines = ["# Fingerprint Frontier", "", f"- Fingerprint: {label}", f"- Exact invariants: {', '.join(result['invariant_display_names'])}", f"- Orders checked: {', '.join(map(str, result['orders_checked']))}"]
    lines.extend(f"- n={order}: {count} graphs ({'exhaustive' if result['exhaustive_by_order'][order] else 'incomplete'})" for order, count in result["graph_counts"].items())
    if result["first_collision_order"] is None:
        lines.append(f"- Collision-free through: n={result['frontier']}" if result["frontier"] is not None else "- Search incomplete before a frontier was established")
    else:
        lines.extend([f"- First collision order: {result['first_collision_order']}", f"- graph6 A: {result['graph6_a']}", f"- graph6 B: {result['graph6_b']}", f"- Shared fingerprint: {result['shared_fingerprint']}", f"- NetworkX isomorphic: {result['isomorphic']}", f"- Minimality established: {result['minimality_established']}"])
    lines.extend([f"- Elapsed seconds: {result['elapsed_runtime']:.3f}", "", result["disclaimer"]])
    return "\n".join(lines) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description="Exhaustive finite Fingerprint Frontier search")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--preset", choices=sorted(PRESETS))
    group.add_argument("--fingerprint", type=parse_invariant_names, help="comma-separated invariant registry IDs")
    parser.add_argument("--max-order", type=int, required=True)
    parser.add_argument("--start-order", type=int, default=1)
    parser.add_argument("--generator", help="path to geng for orders >= 8")
    parser.add_argument("--artifacts", type=Path, default=ROOT / "artifacts")
    args = parser.parse_args()
    names = PRESETS[args.preset] if args.preset else args.fingerprint
    label = args.preset or "custom"
    generator = args.generator or detect_geng()
    if args.max_order >= 8 and not generator:
        raise SystemExit("geng is required for exhaustive orders >= 8")
    if args.max_order < args.start_order:
        raise SystemExit("--max-order must be at least --start-order")

    def source(order: int):
        return iter_connected_graphs(order, generator)

    print(f"Fingerprint: {label}")
    result = compute_frontier(names, args.start_order, args.max_order, source)
    # Source integrity matters before interpreting absence or minimality.
    for order, count in result.graph_counts.items():
        expected = EXPECTED_CONNECTED_COUNTS.get(order)
        if expected is not None and count != expected:
            raise RuntimeError(f"n={order}: expected {expected} connected graphs, received {count}")
        print(f"n={order}: {count} graphs examined")
    record = result.as_dict()
    record.update({"fingerprint_id": label, "generator": generator or "NetworkX Graph Atlas"})
    if result.first_collision_order is None:
        print(f"COLLISION-FREE THROUGH n={result.frontier}" if result.frontier is not None else "SEARCH INCOMPLETE")
    else:
        print(f"FIRST COLLISION AT n={result.first_collision_order}")
    args.artifacts.mkdir(parents=True, exist_ok=True)
    stem = f"frontier-{label}-n{args.max_order}"
    (args.artifacts / f"{stem}.json").write_text(json.dumps(record, indent=2) + "\n", encoding="utf-8")
    (args.artifacts / f"{stem}.md").write_text(markdown_report(label, record), encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
