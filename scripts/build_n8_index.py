"""Resumable, exact offline index builder for the vendored n=8 catalogue."""
from __future__ import annotations

import argparse
import hashlib
import json
import sqlite3
import sys
import time
from pathlib import Path

import networkx as nx

from invariant_twins.invariants import INVARIANT_REGISTRY, compute_invariant

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data" / "connected" / "n8.g6"
DATABASE = ROOT / "data" / "connected" / "n8_invariants.sqlite"
EXPECTED_SHA = "0002354f1ab3344a2706626a037ad15367bf23a2163aa68f552c3a169ca9a036"
EXPECTED_COUNT = 11117
SCHEMA_VERSION = "1"
SERIALIZATION_VERSION = "json-v1"
# Cheap first; registry IDs deliberately remain the canonical mathematical IDs.
ORDER = ("degree_sequence", "triangle_count", "bridge_count", "clique_number", "independence_number", "chromatic_number", "adjacency_charpoly", "laplacian_charpoly", "signless_laplacian_charpoly", "distance_charpoly", "generalized_charpoly")


def canonical(value: object) -> str:
    return json.dumps(value, ensure_ascii=False, separators=(",", ":"))


def source_sha(path: Path = SOURCE) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def connect(path: Path = DATABASE) -> sqlite3.Connection:
    db = sqlite3.connect(path)
    db.execute("PRAGMA journal_mode=WAL")
    db.executescript("""
    CREATE TABLE IF NOT EXISTS metadata (key TEXT PRIMARY KEY, value TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS graphs (id INTEGER PRIMARY KEY, graph6 TEXT NOT NULL UNIQUE, ord INTEGER NOT NULL, edge_count INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS invariant_values (graph_id INTEGER NOT NULL REFERENCES graphs(id), invariant_id TEXT NOT NULL, value TEXT, error TEXT, PRIMARY KEY(graph_id,invariant_id));
    CREATE INDEX IF NOT EXISTS invariant_lookup ON invariant_values(invariant_id,value);
    CREATE TABLE IF NOT EXISTS progress (invariant_id TEXT PRIMARY KEY, completed INTEGER NOT NULL DEFAULT 0, elapsed REAL NOT NULL DEFAULT 0, failures INTEGER NOT NULL DEFAULT 0);
    """)
    return db


def initialise(db: sqlite3.Connection, source: Path = SOURCE) -> None:
    digest = source_sha(source)
    if digest != EXPECTED_SHA and source == SOURCE:
        raise RuntimeError("n8.g6 SHA-256 does not match the verified McKay catalogue")
    old = db.execute("SELECT value FROM metadata WHERE key='source_sha256'").fetchone()
    if old and old[0] != digest:
        raise RuntimeError("database source SHA differs; create a new index")
    lines = [line.strip() for line in source.read_text(encoding="ascii").splitlines() if line.strip()]
    if len(lines) != EXPECTED_COUNT or len(lines) != len(set(lines)):
        raise RuntimeError("catalogue record count/uniqueness validation failed")
    db.executemany("INSERT OR IGNORE INTO graphs(id,graph6,ord,edge_count) VALUES(?,?,8,?)", ((i, text, nx.from_graph6_bytes(text.encode()).number_of_edges()) for i, text in enumerate(lines, 1)))
    for key, value in {"source_sha256": digest, "schema_version": SCHEMA_VERSION, "serialization": SERIALIZATION_VERSION, "required_invariants": canonical(ORDER)}.items():
        db.execute("INSERT OR REPLACE INTO metadata VALUES(?,?)", (key, value))
    db.execute("INSERT OR IGNORE INTO metadata VALUES('status','building')")
    for invariant in ORDER:
        db.execute("INSERT OR IGNORE INTO progress(invariant_id) VALUES(?)", (invariant,))
    db.commit()


def build(db: sqlite3.Connection, invariant: str, batch_size: int) -> None:
    if invariant not in INVARIANT_REGISTRY:
        raise ValueError(f"unknown invariant: {invariant}")
    rows = db.execute("SELECT g.id,g.graph6 FROM graphs g LEFT JOIN invariant_values v ON v.graph_id=g.id AND v.invariant_id=? WHERE v.graph_id IS NULL ORDER BY g.id", (invariant,)).fetchall()
    total = db.execute("SELECT count(*) FROM graphs").fetchone()[0]
    started = time.perf_counter(); done = total - len(rows)
    for offset in range(0, len(rows), batch_size):
        batch = []
        for graph_id, text in rows[offset:offset + batch_size]:
            try:
                batch.append((graph_id, invariant, canonical(compute_invariant(nx.from_graph6_bytes(text.encode()), invariant)), None))
            except Exception as error:  # persisted error prevents accidental ready status
                batch.append((graph_id, invariant, None, repr(error)))
        db.executemany("INSERT OR REPLACE INTO invariant_values(graph_id,invariant_id,value,error) VALUES(?,?,?,?)", batch)
        done += len(batch); elapsed = time.perf_counter() - started
        failures = sum(value is None for _, _, value, _ in batch)
        db.execute("UPDATE progress SET completed=?,elapsed=elapsed+?,failures=failures+? WHERE invariant_id=?", (done, elapsed, failures, invariant))
        db.commit(); started = time.perf_counter()
        print(f"{invariant}: {done} / {total} ({100*done/total:.1f}%)", flush=True)


def validate(db: sqlite3.Connection) -> bool:
    total = db.execute("SELECT count(*) FROM graphs").fetchone()[0]
    unique = db.execute("SELECT count(DISTINCT graph6) FROM graphs").fetchone()[0]
    complete = all(db.execute("SELECT count(*) FROM invariant_values WHERE invariant_id=? AND value IS NOT NULL AND error IS NULL", (name,)).fetchone()[0] == EXPECTED_COUNT for name in ORDER)
    failures = all(db.execute("SELECT failures FROM progress WHERE invariant_id=?", (name,)).fetchone() == (0,) for name in ORDER)
    required_metadata = {"source_sha256": EXPECTED_SHA, "schema_version": SCHEMA_VERSION, "serialization": SERIALIZATION_VERSION, "required_invariants": canonical(ORDER)}
    compatible = all(db.execute("SELECT value FROM metadata WHERE key=?", (key,)).fetchone() == (value,) for key, value in required_metadata.items())
    ok = total == unique == EXPECTED_COUNT and complete and failures and compatible and db.execute("SELECT count(*) FROM graphs WHERE ord!=8").fetchone()[0] == 0
    db.execute("INSERT OR REPLACE INTO metadata VALUES('status',?)", ("ready" if ok else "building",)); db.commit()
    return ok


def status(db: sqlite3.Connection) -> None:
    print("state:", db.execute("SELECT value FROM metadata WHERE key='status'").fetchone()[0])
    for row in db.execute("SELECT invariant_id,completed,failures,elapsed FROM progress ORDER BY rowid"):
        print(f"{row[0]}: {row[1]} / {EXPECTED_COUNT}; failures={row[2]}; elapsed={row[3]:.1f}s")


def main() -> None:
    parser = argparse.ArgumentParser(); parser.add_argument("--db", type=Path, default=DATABASE); parser.add_argument("--status", action="store_true"); parser.add_argument("--all", action="store_true"); parser.add_argument("--invariant", choices=ORDER); parser.add_argument("--validate", action="store_true"); parser.add_argument("--batch-size", type=int, default=100)
    args = parser.parse_args(); db = connect(args.db); initialise(db)
    if args.status: status(db); return
    targets = ORDER if args.all else ((args.invariant,) if args.invariant else ())
    for name in targets: build(db, name, args.batch_size)
    if args.validate: print("ready" if validate(db) else "building")


if __name__ == "__main__":
    main()
