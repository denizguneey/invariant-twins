# Deploying

Deploy the public demo with Streamlit Community Cloud using repository
`denizguneey/invariant-twins`, branch `main`, and entrypoint `app.py`.
Choose Python 3.10 or later, consistent with `pyproject.toml` and the normal CI
environment. Community Cloud installs `requirements.txt`; its `-e .` entry
installs the local `src/invariant_twins` package so the root-level app can import
it without a path workaround.

The interactive demo remains usable without nauty/Traces `geng`: Graph Atlas
experiments are available locally in the app, while exhaustive searches beyond
order 7 are reproducible GitHub Actions research jobs. No deployment secrets or
local executable paths are required.
