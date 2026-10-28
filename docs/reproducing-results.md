# Reproducing results

Run lightweight tests with `pytest -q`. Use `python scripts/run_frontier.py
--preset F6 --max-order 7` for the Graph Atlas stage. The manual GitHub Actions
workflows install nauty and validate connected graph counts before exhaustive
order-8 or order-9 experiments. Verify a collision record with
`python scripts/verify_witness.py <result.json>`.
