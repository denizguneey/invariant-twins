"""Small, presentation-only copy helpers for the Streamlit interface."""

PRESET_LABELS = {
    "F1": "Degree sequence",
    "F2": "Adjacency spectrum",
    "F3": "Degree + adjacency spectrum",
    "F4": "Adjacency + Laplacian spectrum",
    "F5": "Adjacency + signless Laplacian spectrum",
    "F6": "Degree + adjacency + Laplacian spectrum",
    "F7": "Degree + adjacency + signless Laplacian spectrum",
    "F8": "Adjacency + Laplacian + signless Laplacian",
    "F9": "Degree + A + L + Q",
    "F10": "Degree + A + L + Q + distance",
    "FG": "Generalized characteristic polynomial",
}

HIGHER_ORDER_MESSAGE = "Higher-order exhaustive searches require nauty/geng. Verified higher-order results are still available in the Frontier view and research archive."

LEARN_SECTIONS = (
    ("What is an invariant?", "A graph invariant is a property that stays the same when vertex names change. Examples include a degree sequence and an exact characteristic polynomial."),
    ("What is a fingerprint?", "A fingerprint is a chosen list of invariants. It is useful when it separates graphs, but it is not automatically a complete description of a graph."),
    ("What is a collision?", "A collision occurs when non-isomorphic graphs share every invariant in a chosen fingerprint. The graphs are different even though that fingerprint cannot tell them apart."),
    ("Degree sequence", "The degree sequence lists how many edges touch each vertex, sorted from largest to smallest. It is a compact structural summary, not a complete graph description."),
    ("Adjacency spectrum", "The adjacency spectrum is represented here by exact adjacency characteristic-polynomial coefficients. It summarizes the adjacency matrix without rounding eigenvalues."),
    ("Laplacian spectrum", "The Laplacian spectrum records connectivity and degree information through the Laplacian matrix. This app compares its exact characteristic polynomial."),
    ("Signless Laplacian spectrum", "The signless Laplacian spectrum uses degree plus adjacency information. It is another exact matrix-based invariant, with its own collisions."),
    ("Distance spectrum", "The distance spectrum comes from shortest-path distances between every pair of vertices. It can add information that adjacency-based invariants miss."),
    ("Generalized characteristic polynomial", "This exact polynomial combines adjacency and degree information in one bivariate invariant. Its coefficients are compared exactly, not numerically."),
    ("Graph isomorphism", "Two graphs are isomorphic when one can be relabeled to become the other. NetworkX checks this exactly for every reported collision witness."),
    ("What does exhaustive finite verification mean?", "Every connected unlabeled graph in a stated finite range was checked. This is strong reproducible evidence for that range, not a theorem about graphs of every size."),
)


def preset_label(preset: str) -> str:
    """Return a reader-facing name while retaining the reproducibility ID."""
    return PRESET_LABELS.get(preset, preset)
