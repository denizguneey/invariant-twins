"""Backend-only benchmark for exact discrimination-power aggregation."""
from __future__ import annotations

import time

from invariant_twins.discrimination import discrimination_power
from invariant_twins.invariants import INVARIANT_REGISTRY
from invariant_twins import discrimination


CASES = (
    ("degree_sequence", ("degree_sequence",)),
    ("adjacency_charpoly", ("adjacency_charpoly",)),
    ("degree_plus_triangle", ("degree_sequence", "triangle_count")),
    ("structural", ("degree_sequence", "triangle_count", "bridge_count", "clique_number")),
    ("structural_plus_spectral", ("degree_sequence", "triangle_count", "bridge_count", "clique_number", "adjacency_charpoly")),
    ("all_11", tuple(INVARIANT_REGISTRY)),
)


def main() -> None:
    for label, invariants in CASES:
        started = time.perf_counter(); rows = discrimination_power(invariants); cold = time.perf_counter() - started
        started = time.perf_counter(); discrimination_power(invariants); warm = time.perf_counter() - started
        print(f"case={label} cold={cold:.3f}s cached={warm:.6f}s n8_pairs={rows[-1]['indistinguishablePairCount']}")
    names = tuple(INVARIANT_REGISTRY)
    for order in range(4, 9):
        started = time.perf_counter(); (discrimination._n8(names) if order == 8 else discrimination._atlas(order, names)); elapsed = time.perf_counter() - started
        print(f"profile=all_11_cached_process order={order} seconds={elapsed:.3f}")


if __name__ == "__main__":
    main()
