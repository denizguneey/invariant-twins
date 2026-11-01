"""Build or validate the separate exact canonical identity map for n=8."""
from __future__ import annotations

import argparse
import hashlib
import sqlite3
import time
from pathlib import Path

import networkx as nx

from invariant_twins.canonical_identity import canonical_graph6
from invariant_twins.n8_canonical_map import CANONICALIZATION_VERSION, DATABASE, EXPECTED_COUNT, EXPECTED_SHA, SCHEMA_VERSION
from invariant_twins.n8_index import SOURCE


SCHEMA = """
CREATE TABLE IF NOT EXISTS metadata (key TEXT PRIMARY KEY, value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS canonical_map (
  canonical_graph6 TEXT PRIMARY KEY,
  graph_id INTEGER NOT NULL UNIQUE,
  graph6 TEXT NOT NULL UNIQUE
);
"""


def connect(path: Path) -> sqlite3.Connection:
    database = sqlite3.connect(path)
    database.executescript(SCHEMA)
    return database


def status(path: Path) -> None:
    if not path.is_file():
        print("state: missing")
        return
    database = sqlite3.connect(f"file:{path.resolve().as_posix()}?mode=ro", uri=True)
    state = database.execute("SELECT value FROM metadata WHERE key='status'").fetchone()
    count = database.execute("SELECT count(*) FROM canonical_map").fetchone()[0]
    print(f"state: {state[0] if state else 'missing'}")
    print(f"canonical rows: {count} / {EXPECTED_COUNT}")


def validate(path: Path, source: Path) -> bool:
    if not path.is_file() or hashlib.sha256(source.read_bytes()).hexdigest() != EXPECTED_SHA:
        return False
    database = sqlite3.connect(f"file:{path.resolve().as_posix()}?mode=ro", uri=True)
    metadata = dict(database.execute("SELECT key,value FROM metadata"))
    counts = database.execute("SELECT count(*),count(DISTINCT canonical_graph6),count(DISTINCT graph_id) FROM canonical_map").fetchone()
    return metadata == {"status": "ready", "source_sha256": EXPECTED_SHA, "schema_version": SCHEMA_VERSION, "canonicalization": CANONICALIZATION_VERSION} and counts == (EXPECTED_COUNT, EXPECTED_COUNT, EXPECTED_COUNT)


def build(path: Path, source: Path) -> float:
    started = time.perf_counter()
    if hashlib.sha256(source.read_bytes()).hexdigest() != EXPECTED_SHA:
        raise RuntimeError("n=8 source checksum does not match the verified catalogue")
    database = connect(path)
    database.execute("INSERT OR REPLACE INTO metadata VALUES ('status','building')")
    database.execute("INSERT OR REPLACE INTO metadata VALUES ('source_sha256',?)", (EXPECTED_SHA,))
    database.execute("INSERT OR REPLACE INTO metadata VALUES ('schema_version',?)", (SCHEMA_VERSION,))
    database.execute("INSERT OR REPLACE INTO metadata VALUES ('canonicalization',?)", (CANONICALIZATION_VERSION,))
    with source.open(encoding="ascii") as catalogue:
        for graph_id, line in enumerate(catalogue, start=1):
            graph6 = line.strip()
            if not graph6:
                continue
            existing = database.execute("SELECT canonical_graph6,graph6 FROM canonical_map WHERE graph_id=?", (graph_id,)).fetchone()
            if existing is not None:
                if existing[1] != graph6:
                    raise RuntimeError(f"existing graph6 does not match catalogue at graph {graph_id}")
                continue
            canonical = canonical_graph6(nx.from_graph6_bytes(graph6.encode()))
            database.execute("INSERT INTO canonical_map(canonical_graph6,graph_id,graph6) VALUES(?,?,?)", (canonical, graph_id, graph6))
            if graph_id % 250 == 0:
                database.commit()
    database.commit()
    database.execute("INSERT OR REPLACE INTO metadata VALUES ('status','ready')")
    database.commit()
    if not validate(path, source):
        raise RuntimeError("built canonical map did not validate")
    return time.perf_counter() - started


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--db", type=Path, default=DATABASE)
    parser.add_argument("--source", type=Path, default=SOURCE)
    parser.add_argument("--status", action="store_true")
    parser.add_argument("--validate", action="store_true")
    args = parser.parse_args()
    if args.status:
        status(args.db); return
    if args.validate:
        print("ready" if validate(args.db, args.source) else "invalid"); return
    elapsed = build(args.db, args.source)
    print(f"ready: {elapsed:.2f}s")


if __name__ == "__main__":
    main()
