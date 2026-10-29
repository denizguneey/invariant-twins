# Invariant Twins

Invariant Twins is an interactive research application for studying how selected exact graph invariants distinguish finite, simple, connected graphs. It combines a React + FastAPI application with reproducible finite-domain data, exact arithmetic, and verifiable non-isomorphic witnesses.

## What the project does

### Identify My Graph

Draw a graph, select invariants, and compare its fingerprint against a finite same-order universe. The application reports non-isomorphic rivals with the same fingerprint, the exact rival count, candidate previews, a useful next-invariant recommendation, and (where supported) a minimum identifying invariant set.

### Explore Twins

Find two non-isomorphic graphs sharing a selected fingerprint, inspect their graph6 encodings, and view an invariant that separates them.

### Fingerprint Frontier

Browse archived finite-order collision/frontier results for selected invariant families. These research records are distinct from live application support.

### Research

Read the methodology, finite-domain assumptions, data provenance, and reproducibility notes.

## Mathematical model

For a graph `G` and an invariant set `S`, the fingerprint is

`F_S(G) = (I(G)) for I in S`.

A collision occurs when `F_S(G) = F_S(H)` for non-isomorphic graphs `G` and `H`. Every result is interpreted only within its stated finite universe.

For one target graph, each invariant distinguishes a set of its non-isomorphic rivals. Finding the smallest invariant subset that distinguishes all rivals is a target-specific **Set Cover** problem. With the current 11 invariant families, exhaustive subset search considers at most `2^11 = 2048` subsets and is exact where enabled.

This differs from the global pair-separation problem: finding a smallest family that separates every non-isomorphic pair in an entire universe is a Test Cover-style research problem. It is not the same feature and is not currently implemented as a live mode.

## Supported invariant family

The application uses 11 exact invariant families:

- Degree sequence
- Triangle count
- Bridge count
- Clique number
- Independence number
- Chromatic number
- Adjacency characteristic polynomial
- Laplacian characteristic polynomial
- Signless Laplacian characteristic polynomial
- Distance characteristic polynomial
- Generalized characteristic polynomial

Spectral comparisons use exact characteristic-polynomial coefficients, not rounded floating-point eigenvalues.

## Finite graph domains

### n <= 7

The application uses the NetworkX Graph Atlas for the complete connected simple, non-isomorphic domain at supported orders.

### n = 8

The application uses Brendan McKay's connected simple graph catalogue: 11,117 connected simple non-isomorphic graphs. McKay supplies graph structures; Invariant Twins computes and stores its own invariant values in a verified local SQLite index.

Queries are local and offline. Runtime requests do not reconstruct or recompute the complete 11,117-graph catalogue. Live n=9 support does not exist.

## n=8 indexed architecture

`graph catalogue -> invariant precomputation -> verified SQLite index -> indexed fingerprint query`

Before n=8 queries are served, the index validates ready state, source checksum, graph count, invariant completeness, and schema/serialization compatibility.

## Performance

Local indexed n=8 benchmarks measured common Identify fingerprints at approximately 0.08-0.15 seconds. These are local measurements, not universal guarantees.

## Installation and running

Windows-oriented setup:

```powershell
git clone https://github.com/denizguneey/invariant-twins.git
cd invariant-twins
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -e ".[test]"
cd web\frontend
npm install
npm run build
cd ..\..
python -m invariant_twins.web
```

Open `http://127.0.0.1:8000`:

- `/` Explore Twins
- `/tanimla` Identify My Graph
- `/sinir` Fingerprint Frontier
- `/arastirma` Research

The Streamlit application remains in the repository as a legacy interface.

## Tests

```powershell
.\.venv\Scripts\python.exe -m pytest -q
cd web\frontend
npm run test
npm run build
```

## Data and reproducibility

- `data/connected/n8.g6` is the n=8 graph6 catalogue.
- `data/connected/n8_invariants.sqlite` is the verified local invariant index.
- `scripts/build_n8_index.py --status` reports index completeness and ready status.
- `scripts/build_n8_index.py --validate` validates the index.
- graph6 stores compact graph structures used for reproducible witnesses.

The catalogue attribution and checksum are documented in `data/connected/README.md`. Reproduction and mathematical notes are in `docs/`, and citation metadata is provided in `CITATION.cff`.

## Limitations

- Results apply only to their stated finite domains.
- The n=8 minimum identifying set is explicitly unavailable in the UI.
- There is no live n=9 support.
- The invariant family is finite.
- A fingerprint collision means the selected invariants do not distinguish two graphs; it does not mean the graphs are isomorphic.
- Archived frontier records and live application support are separate concepts.

## Roadmap

Possible future research directions include canonical graph identity/graph6 integration, discrimination-power curves, richer rival explanations, weighted identifying invariant sets, selectable subuniverses, n=9 indexed architecture, and a global Test Cover-style separating-family mode.

## License

This project is released under the [MIT License](LICENSE).
