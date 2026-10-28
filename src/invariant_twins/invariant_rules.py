"""Mathematical relationships among the selectable graph invariants."""


def invariant_redundancies(selected: list[str]) -> list[str]:
    """Return explanatory notices for selected, mathematically dependent invariants."""
    if {"Degree sequence", "Edges"} <= set(selected):
        return [
            "**Edges** is redundant when **Degree sequence** is selected: by the "
            "Handshaking Lemma, $\\sum_v \\deg(v) = 2|E|$, so the degree sequence "
            "determines the edge count."
        ]
    return []
