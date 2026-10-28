"""Small reproducibility reports for finite research-mode computations."""

from .collision_search import FingerprintCollision


def research_report(domain: str, graph_count: int, minimum_sets: list[tuple[str, ...]], collision: FingerprintCollision | None) -> str:
    """Build a compact Markdown report without exporting the graph universe."""
    lines = [
        "# Invariant Twins research report",
        f"- Finite domain: {domain}",
        f"- Graphs examined: {graph_count}",
        "- Exact spectrum representation: adjacency characteristic polynomial det(lambda I - A)",
    ]
    if minimum_sets:
        lines.append(f"- Minimum separating sets: {len(minimum_sets)}")
        lines.extend(f"  - {', '.join(item)}" for item in minimum_sets)
    if collision:
        from .collision_search import graph6
        lines.extend([
            f"- Fingerprint collision order: {collision.order}",
            f"- Degree sequence: {collision.degree_sequence}",
            f"- Characteristic polynomial coefficients: {collision.characteristic_polynomial}",
            f"- graph6 A: {graph6(collision.graph_a)}",
            f"- graph6 B: {graph6(collision.graph_b)}",
            f"- NetworkX isomorphic: False",
            f"- Minimality established: {'YES' if collision.minimality_established else 'NO'}",
        ])
    lines.append("\nFinite computational result only; not a theorem for arbitrary graph order.")
    return "\n".join(lines)
