# Invariant Twins

Invariant Twins is a compact Streamlit laboratory for studying how finite collections of graph invariants distinguish connected, non-isomorphic graphs.

## Mathematical idea

For an invariant family \(S\), define the fingerprint

\[
F_S(G)=(f(G):f\in S).
\]

Graphs \(G\) and \(H\) are *invariant twins* relative to \(S\) when \(F_S(G)=F_S(H)\) but \(G\not\cong H\). The application searches for these collisions, verifies non-isomorphism with NetworkX, and supplies graph6 witnesses.

## Finite Graph Atlas experiment

The interactive search uses connected simple graphs from the NetworkX Graph Atlas through order 7. In that finite domain, the exact exhaustive minimum-separating-set computation finds one unique minimum set:

```text
Degree sequence + exact adjacency spectrum
```

“Exact adjacency spectrum” means equality of the integer coefficients of \(\det(\lambda I-A(G))\), not rounded floating-point eigenvalues. This is a finite computational result, not a theorem for arbitrary graphs.

## Break the Fingerprint

Research mode asks where degree sequence plus exact adjacency characteristic polynomial first fails. The reproducible manual Ubuntu workflow exhaustively processed all 11,117 connected unlabeled graphs at order 8 and found a collision: graph6 witnesses `G?AFBo` and <code>G?B@&#96;w</code> have common degree sequence \((4,3,2,2,2,1,1,1)\), common exact characteristic-polynomial coefficients \((1,0,-8,0,14,0,-4,0,0)\), and NetworkX reports they are non-isomorphic. Since orders 1–7 were exhaustively covered by the Graph Atlas, this is the smallest collision in that finite experiment.

## Fingerprint Frontier

The Fingerprint Frontier asks how far a chosen finite family of exact invariants remains collision-free. For a fingerprint \(F_S\), its reported frontier \(r(S)\) is the largest order through which every connected simple graph in the exhaustively enumerated domain has a unique fingerprint up to isomorphism. The first later pair with equal fingerprints but `NetworkX.is_isomorphic(G, H) == False` is a collision witness.

The bundled exact spectral invariants are integer coefficient tuples for characteristic polynomials of the adjacency matrix \(A\), Laplacian \(L=D-A\), signless Laplacian \(Q=D+A\), and, for connected graphs, distance matrix. Research decisions never use rounded numerical eigenvalues. Distance spectrum is exact but comparatively expensive, so it is used only when selected (preset F10).

The generalized characteristic polynomial is represented as exact bivariate integer terms for
\(\Phi_G(\lambda,t)=\det(\lambda I-A+tD)\). Its specializations are checked exactly: `t=0` gives the adjacency characteristic polynomial, `t=-1` gives the signless-Laplacian characteristic polynomial, and `t=1` is \((-1)^n\) times the Laplacian polynomial evaluated at \(-\lambda\). The existing strong F9 order-9 witness is separated by this generalized invariant.

The Graph Atlas stage has established the following finite results through order 7:

| Preset | Exact fingerprint | finite frontier / first collision |
| --- | --- | --- |
| F1 | Degree sequence | collision at n=5 (frontier 4) |
| F2 | A spectrum | collision at n=6 (frontier 5) |
| F3 | Degree + A | collision-free through n=7; known collision at n=8 |
| F4–F9 | curated A/L/Q combinations | first collision at n=9 (frontier 8) |
| F10 | Degree + A + L + Q + Distance | collision-free through n=7 |

Run a reproducible computation locally (orders 1–7 use the Graph Atlas; order 8 or higher requires nauty/Traces `geng`):

```bash
python scripts/run_frontier.py --preset F6 --max-order 8
# or
python scripts/run_frontier.py --fingerprint degree_sequence,adjacency_charpoly,laplacian_charpoly --max-order 8
```

The command writes JSON and Markdown records to `artifacts/`. On GitHub, use the manually dispatched **Fingerprint Frontier Research** workflow, select a preset and maximum order, and download its artifact. It runs on Ubuntu, installs nauty, checks that `geng -cq 5` emits 21 records, and validates the known order-8 total of 11,117 when that order is selected. Ordinary CI never runs this expensive sweep.

Compact metadata for verified experiments is in [`research/`](research/README.md). Recompute a collision witness independently with:

```bash
python scripts/verify_witness.py <result.json>
```

Absence of a collision through order \(n\) is a finite computational result, not a proof for arbitrary graph order.

The six F4–F9 n=9 nauty experiments each exhausted all 261,080 connected unlabeled graphs. Every preset produced a NetworkX-verified non-isomorphic collision at order 9, so its finite frontier is 8. The manual workflow artifacts retain each graph6 witness and full shared exact fingerprint.

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

## Reproducible workflows

On GitHub, **Exhaustive fingerprint research** reproduces the original degree-plus-A order-8 result. **Fingerprint Frontier Research** runs a selected frontier preset. Both are manual Ubuntu workflows and upload JSON/Markdown artifacts.

## Limitations and reproducibility

All claims are explicitly limited to their displayed finite search domain. The repository includes graph6 witnesses, exact polynomial coefficients, tests, and manual research workflows to reproduce them. It does not claim novelty or a theorem about graphs of arbitrary order.

## Structure

- `app.py` — Streamlit interface
- `invariants.py`, `search.py`, `collision_search.py`, `frontier.py` — exact graph calculations and finite searches
- `graph_sources.py` — Graph Atlas and optional local `geng` sources
- `visualization.py` — deterministic inline SVG drawings
- `scripts/run_fingerprint_search.py` — original standalone exhaustive CLI
- `scripts/run_frontier.py` — configurable Fingerprint Frontier CLI

Licensed under the MIT License.
