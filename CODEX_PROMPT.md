# Codex prompt — Invariant Twins v0.2

You are improving an existing Python/Streamlit graph-theory project named **Invariant Twins**.

## Core mathematical contract

For a selected invariant set S, define a fingerprint F_S(G). Find the smallest pair of graphs G,H such that:

1. G and H have the same number of vertices,
2. every selected invariant has the same value on G and H,
3. G and H are non-isomorphic,
4. among the finite Graph Atlas search range, return the smallest witness by vertex count, then edge count.

Never present finite-search failure as a proof for arbitrary graphs.

## Current scope

- NetworkX Graph Atlas, up to 7 vertices
- connected simple graphs
- Streamlit UI
- graph6 witness strings

## Improve the project without changing the mathematical meaning

1. Refactor `app.py` into:
   - `invariants.py`
   - `search.py`
   - `visualization.py`
   - `app.py`
2. Add pytest coverage for every invariant.
3. Add a cached precomputation layer so changing selections feels instant.
4. Add a “Find a distinguishing invariant” button that recommends the simplest currently-unselected invariant separating the displayed pair.
5. Add a “hard mode” that searches for a pair that remains twins under as many implemented invariants as possible.
6. Add export to JSON with atlas IDs, graph6 strings, selected invariants, and values.
7. Keep the UI minimal, mathematical, and readable.
8. Add type hints and docstrings.
9. Do not add an LLM or external API.
10. Preserve reproducibility.

Before editing, inspect the repository. After editing, run tests and fix any failures.
