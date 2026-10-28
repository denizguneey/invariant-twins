# Invariant Twins

Invariant Twins is a small Streamlit laboratory for studying how finite collections of graph invariants distinguish connected, non-isomorphic graphs.

## Mathematical idea

For an invariant family \(S\), define the fingerprint

\[
F_S(G)=(f(G):f\in S).
\]

Graphs \(G\) and \(H\) are *invariant twins* relative to \(S\) when \(F_S(G)=F_S(H)\) but \(G\not\cong H\). The application searches for these collisions, confirms non-isomorphism with NetworkX, and provides graph6 witnesses.

## Finite Graph Atlas experiment

The interactive search uses connected simple graphs from the NetworkX Graph Atlas through order 7. For this finite domain, the exact exhaustive minimum-separating-set computation finds one unique minimum set:

```text
Degree sequence + exact adjacency spectrum
```

“Exact adjacency spectrum” means equality of the integer coefficients of \(\det(\lambda I-A(G))\), not rounded floating-point eigenvalues. This is an experimentally verified result for the stated finite domain, not a theorem for arbitrary graphs.

## Break the Fingerprint

Research mode asks where the combined degree-sequence and exact-spectrum fingerprint first fails: find connected non-isomorphic graphs with the same degree sequence and adjacency characteristic polynomial. Orders through 7 are covered by the Graph Atlas.

The order-8 experiment has **not yet been executed** in GitHub Actions. It is configured as a manually triggered, reproducible Ubuntu workflow using nauty `geng`. Its integrity checks require 21 connected unlabeled graphs at order 5 and 11,117 at order 8.

### Computational result

The manual Ubuntu workflow exhaustively processed all 11,117 connected unlabeled graphs of order 8 and found a first fingerprint collision. Its graph6 witnesses are `G?AFBo` and <code>G?B@&#96;w</code>; they have common degree sequence \((4,3,2,2,2,1,1,1)\), common exact characteristic-polynomial coefficients \((1,0,-8,0,14,0,-4,0,0)\), and NetworkX reports that they are non-isomorphic. Since orders 1–7 were already exhaustively covered by the Graph Atlas, this establishes the smallest collision at order 8 for this finite experiment. It remains a finite computational result, not a theorem about arbitrary graph order.

## Install and launch

```bash
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
streamlit run app.py
```

The app remains usable when `geng` is unavailable.

## Tests

```bash
pytest -q
python -c "import networkx as nx; from visualization import graph_to_svg; assert '<svg' in graph_to_svg(nx.path_graph(4))"
```

## Reproducible exhaustive workflow

On GitHub, open **Actions**, select **Exhaustive fingerprint research**, choose **Run workflow**, and download the resulting `fingerprint-search-n8` artifact. The workflow installs Ubuntu’s `nauty` package, validates order 5, runs:

```bash
python scripts/run_fingerprint_search.py --order 8
```

It writes a JSON and Markdown record of the finite computation.

## Limitations and reproducibility

All claims are explicitly limited to their displayed finite search domain. Failure to find a collision never proves that a fingerprint distinguishes graphs of arbitrary order. The repository includes graph6 witnesses, exact polynomial coefficients, tests, and a manual research workflow to make finite experiments reproducible.

## Structure

- `app.py` — Streamlit interface
- `invariants.py`, `search.py`, `collision_search.py` — exact graph calculations and searches
- `graph_sources.py` — Graph Atlas and optional local `geng` sources
- `visualization.py` — deterministic inline SVG drawings
- `scripts/run_fingerprint_search.py` — standalone exhaustive research CLI

Licensed under the MIT License.
