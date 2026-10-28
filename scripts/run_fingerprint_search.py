"""Run a reproducible exhaustive degree-sequence/spectrum search with nauty."""

from __future__ import annotations

import argparse
from collections import defaultdict
import json
from datetime import datetime, timezone
from pathlib import Path
import shutil
import subprocess
import sys
import time

import networkx as nx

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from invariant_twins.collision_search import FingerprintCollision, fingerprint_degree_spectrum, graph6


EXPECTED_CONNECTED_COUNTS = {5: 21, 8: 11117}


def detect_generator() -> str | None:
    """Find the Ubuntu nauty executable, accepting both common names."""
    return shutil.which("geng") or shutil.which("nauty-geng")


def generator_version(executable: str) -> str | None:
    """Best-effort version capture without making it a correctness dependency."""
    result = subprocess.run([executable, "-help"], capture_output=True, text=True)
    text = (result.stdout + result.stderr).strip().splitlines()
    return text[0] if text else None


def iter_graph6_graphs(executable: str, order: int):
    """Stream connected graph6 records from ``geng -cq order``."""
    process = subprocess.Popen([executable, "-cq", str(order)], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    assert process.stdout is not None
    for line in process.stdout:
        encoded = line.strip()
        if not encoded:
            continue
        try:
            yield nx.from_graph6_bytes(encoded.encode())
        except nx.NetworkXError as error:
            process.kill()
            raise ValueError(f"malformed graph6 record: {encoded!r}") from error
    return_code = process.wait()
    stderr = process.stderr.read() if process.stderr else ""
    if return_code:
        raise RuntimeError(stderr.strip() or f"generator exited with status {return_code}")


def markdown_report(result: dict) -> str:
    """Create a concise human-readable companion to the JSON research record."""
    lines = ["# Exhaustive fingerprint search", ""]
    for label, key in (("Order", "order"), ("Generator", "generator"), ("Expected graphs", "expected_graph_count"),
                       ("Actual graphs", "actual_graph_count"), ("Exhaustive", "exhaustive"),
                       ("Collision found", "collision_found"), ("Minimality established", "minimality_established")):
        lines.append(f"- {label}: {result[key]}")
    if result["collision_found"]:
        for key in ("graph6_a", "graph6_b", "degree_sequence", "characteristic_polynomial", "networkx_isomorphic"):
            lines.append(f"- {key}: {result[key]}")
    lines.extend(["", result["disclaimer"]])
    return "\n".join(lines) + "\n"


def run_search(order: int, executable: str) -> dict:
    """Run one verified exhaustive order and return a machine-readable result."""
    expected = EXPECTED_CONNECTED_COUNTS.get(order)
    if expected is None:
        raise ValueError(f"no integrity count is configured for order {order}")
    started = time.perf_counter()
    actual = 0

    buckets = defaultdict(list)
    collision = None
    for graph in iter_graph6_graphs(executable, order):
        actual += 1
        if graph.number_of_nodes() != order or not nx.is_connected(graph):
            raise RuntimeError("generator output was not connected graphs of the requested order")
        key = fingerprint_degree_spectrum(graph)
        if collision is None:
            for other in buckets[key]:
                if not nx.is_isomorphic(other, graph):
                    collision = FingerprintCollision(order, other, graph, key[0], key[1], actual, True, True)
                    break
        buckets[key].append(graph)
    if actual != expected:
        raise RuntimeError(f"expected {expected} connected graphs at order {order}, received {actual}")
    result = {
        "timestamp_utc": datetime.now(timezone.utc).isoformat(),
        "order": order,
        "generator": executable,
        "generator_version": generator_version(executable),
        "expected_graph_count": expected,
        "actual_graph_count": actual,
        "exhaustive": True,
        "fingerprint_definition": "(degree sequence, exact adjacency characteristic polynomial det(lambda I - A))",
        "collision_found": collision is not None,
        "minimality_established": collision is not None and order == 8,
        "elapsed_seconds": round(time.perf_counter() - started, 6),
        "disclaimer": "Finite computational result only; it is not a theorem for graphs of arbitrary order.",
    }
    if collision:
        result.update({"graph6_a": graph6(collision.graph_a), "graph6_b": graph6(collision.graph_b),
                       "degree_sequence": list(collision.degree_sequence),
                       "characteristic_polynomial": list(collision.characteristic_polynomial),
                       "networkx_isomorphic": nx.is_isomorphic(collision.graph_a, collision.graph_b)})
    return result


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--order", type=int, default=8)
    parser.add_argument("--generator")
    parser.add_argument("--artifacts", type=Path, default=ROOT / "artifacts")
    args = parser.parse_args()
    executable = args.generator or detect_generator()
    if not executable:
        raise SystemExit("geng or nauty-geng was not found")
    result = run_search(args.order, executable)
    args.artifacts.mkdir(parents=True, exist_ok=True)
    stem = f"fingerprint-search-n{args.order}"
    (args.artifacts / f"{stem}.json").write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    (args.artifacts / f"{stem}.md").write_text(markdown_report(result), encoding="utf-8")
    print(json.dumps(result, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
