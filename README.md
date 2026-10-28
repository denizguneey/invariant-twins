# Invariant Twins

[![CI](https://github.com/denizguneey/invariant-twins/actions/workflows/tests.yml/badge.svg)](https://github.com/denizguneey/invariant-twins/actions/workflows/tests.yml) [![Python](https://img.shields.io/badge/python-%3E%3D3.10-blue)](pyproject.toml) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An interactive, exact-arithmetic laboratory for exploring finite graph-invariant fingerprints and reproducible non-isomorphic witnesses.

> Screenshot placeholder: save a Streamlit capture as `docs/images/twin-comparison.png`, then replace this note with `![Twin comparison](docs/images/twin-comparison.png)`. Run `streamlit run app.py`, open the Twin comparison tab, and use your operating system screenshot tool.

## Quick start

```bash
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
python -m pip install -e .
streamlit run app.py
```

## What it does

- Selects invariant families and searches finite connected-graph domains for collisions.
- Uses exact integer characteristic-polynomial coefficients, never rounded eigenvalues, for research decisions.
- Checks candidate witnesses with NetworkX isomorphism.
- Displays graph6 witnesses and deterministic inline SVG graphs.
- Computes finite Fingerprint Frontiers with explicit exhaustive-count checks.

## Example: two graphs the fingerprint cannot tell apart

`G?AFBo` and <code>G?B@&#96;w</code> are connected eight-vertex, eight-edge, triangle-free graphs. They share degree sequence `(4,3,2,2,2,1,1,1)` and adjacency characteristic-polynomial coefficients `[1, 0, -8, 0, 14, 0, -4, 0, 0]`, but `nx.is_isomorphic(G, H)` is false. Their diameters differ (5 and 4), illustrating information not included in that fingerprint.

## Results (finite domain)

| Preset | First collision | Frontier |
| --- | ---: | ---: |
| F1 degree sequence | 5 | 4 |
| F2 adjacency spectrum | 6 | 5 |
| F3 degree + adjacency spectrum | 8 | 7 |
| F4–F9 A/L/Q combinations | 9 | 8 |
| F10 degree + A + L + Q + distance | not reported beyond 7 | ≥7 |

Connected unlabeled graph counts for orders 1–9 are `1, 1, 2, 6, 21, 112, 853, 11117, 261080`. These are exhaustive finite computational results only, not universal graph-theoretic theorems.

## Related work

This tool reproduces known spectral-graph questions with exact arithmetic and interactive, verifiable witnesses; it does not claim a new theorem. Relevant work includes:

- Godsil and McKay, *Some computational results on the spectra of graphs* (1976).
- Haemers and Spence, *Enumeration of cospectral graphs* (2004); Brouwer and Spence, *Cospectral graphs on 12 vertices* (2009).
- Abiad and Alfaro, *Enumeration of cospectral and coinvariant graphs* (2021).
- Aouchiche and Hansen, *Cospectrality of graphs with respect to distance matrices* (2018).
- Electronic Journal of Combinatorics 19(3) (2012), #P23; Chen & Chen, *Applied Mathematics and Computation* 348 (2019), 456–464.
- Rattan and Seppelt, *Weisfeiler–Leman and graph spectra* (SODA 2023); OEIS A001349.

## Reproducing results

Run `python scripts/run_frontier.py --preset F6 --max-order 7` for the Graph Atlas stage. Manual GitHub Actions workflows install nauty and validate graph counts before exhaustive higher-order runs. Independently verify a collision record with `python scripts/verify_witness.py <result.json>`. See [docs/reproducing-results.md](docs/reproducing-results.md) and [research/README.md](research/README.md).

## Limitations

All results are restricted to their stated enumerated finite domains. No absence of a collision is presented as a result for arbitrary graph order.

## Project structure

- `src/invariant_twins/` — reusable exact invariants, searches, sources, SVG, and views.
- `scripts/` — Frontier, original fingerprint, and witness-verification CLIs.
- `research/` — compact verified experiment metadata.
- `docs/` — background, contract, and reproduction notes.

## Tests, citation, license

Run `python -m pytest -q`. Cite the project using [CITATION.cff](CITATION.cff). Licensed under the [MIT License](LICENSE).
