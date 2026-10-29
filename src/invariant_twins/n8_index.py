"""Read-only runtime access to the verified n=8 invariant index."""
from __future__ import annotations

import hashlib
import json
import sqlite3
from pathlib import Path
from typing import Iterable

from .invariants import INVARIANT_REGISTRY

ROOT = Path(__file__).resolve().parents[2]
DATABASE = ROOT / "data" / "connected" / "n8_invariants.sqlite"
SOURCE = ROOT / "data" / "connected" / "n8.g6"
EXPECTED_SHA = "0002354f1ab3344a2706626a037ad15367bf23a2163aa68f552c3a169ca9a036"
EXPECTED_COUNT = 11117
SCHEMA_VERSION = "1"
SERIALIZATION_VERSION = "json-v1"
REQUIRED = ("degree_sequence", "triangle_count", "bridge_count", "clique_number", "independence_number", "chromatic_number", "adjacency_charpoly", "laplacian_charpoly", "signless_laplacian_charpoly", "distance_charpoly", "generalized_charpoly")


def canonical(value: object) -> str:
    return json.dumps(value, ensure_ascii=False, separators=(",", ":"))


class N8IndexError(RuntimeError):
    """The local n=8 index is unavailable or not safe for production use."""


class N8Index:
    def __init__(self, path: Path = DATABASE, source: Path = SOURCE) -> None:
        if not path.is_file() or not source.is_file():
            raise N8IndexError("Doğrulanmış n=8 indeksi bulunamadı.")
        if hashlib.sha256(source.read_bytes()).hexdigest() != EXPECTED_SHA:
            raise N8IndexError("n=8 kaynak kataloğunun SHA-256 doğrulaması başarısız.")
        self.db = sqlite3.connect(f"file:{path.resolve().as_posix()}?mode=ro", uri=True)
        self.db.row_factory = sqlite3.Row
        self._validate()

    def _meta(self, key: str) -> str | None:
        row = self.db.execute("SELECT value FROM metadata WHERE key=?", (key,)).fetchone()
        return None if row is None else str(row[0])

    def _validate(self) -> None:
        expected = {"status": "ready", "source_sha256": EXPECTED_SHA, "schema_version": SCHEMA_VERSION,
                    "serialization": SERIALIZATION_VERSION, "required_invariants": canonical(REQUIRED)}
        if any(self._meta(key) != value for key, value in expected.items()):
            raise N8IndexError("n=8 indeksi hazır veya uyumlu değil.")
        if self.db.execute("SELECT count(*) FROM graphs WHERE ord=8").fetchone()[0] != EXPECTED_COUNT:
            raise N8IndexError("n=8 indeks grafik sayısı doğrulanamadı.")
        for name in REQUIRED:
            count = self.db.execute("SELECT count(*) FROM invariant_values WHERE invariant_id=? AND value IS NOT NULL AND error IS NULL", (name,)).fetchone()[0]
            if count != EXPECTED_COUNT:
                raise N8IndexError("n=8 invariant indeksi eksik.")

    @property
    def domain_size(self) -> int: return EXPECTED_COUNT

    def ids_matching(self, values: dict[str, object]) -> list[int]:
        if not values:
            return [row[0] for row in self.db.execute("SELECT id FROM graphs ORDER BY id")]
        clauses, params = [], []
        for name, value in values.items():
            if name not in INVARIANT_REGISTRY: raise KeyError(name)
            clauses.append("EXISTS (SELECT 1 FROM invariant_values v WHERE v.graph_id=g.id AND v.invariant_id=? AND v.value=? AND v.error IS NULL)")
            params.extend((name, canonical(value)))
        return [row[0] for row in self.db.execute("SELECT g.id FROM graphs g WHERE " + " AND ".join(clauses) + " ORDER BY g.id", params)]

    def graph6(self, graph_id: int) -> str:
        row = self.db.execute("SELECT graph6 FROM graphs WHERE id=?", (graph_id,)).fetchone()
        if row is None: raise KeyError(graph_id)
        return str(row[0])

    def graph6_many(self, ids: Iterable[int]) -> list[tuple[int, str]]:
        ids = list(ids)
        if not ids: return []
        marks = ",".join("?" for _ in ids)
        rows = self.db.execute(f"SELECT id,graph6 FROM graphs WHERE id IN ({marks}) ORDER BY id", ids).fetchall()
        return [(int(row[0]), str(row[1])) for row in rows]

    def values(self, graph_ids: Iterable[int], names: Iterable[str]) -> dict[int, dict[str, object]]:
        ids, names = list(graph_ids), list(names)
        if not ids or not names: return {item: {} for item in ids}
        mi, mn = ",".join("?" for _ in ids), ",".join("?" for _ in names)
        result = {item: {} for item in ids}
        for row in self.db.execute(f"SELECT graph_id,invariant_id,value FROM invariant_values WHERE graph_id IN ({mi}) AND invariant_id IN ({mn})", [*ids, *names]):
            result[int(row[0])][str(row[1])] = json.loads(row[2])
        return result
