"""Read-only access to the offline exact canonical n=8 catalogue map."""
from __future__ import annotations

import hashlib
import sqlite3
from pathlib import Path

from .n8_index import EXPECTED_COUNT, EXPECTED_SHA, SOURCE

ROOT = Path(__file__).resolve().parents[2]
DATABASE = ROOT / "data" / "connected" / "n8_canonical_map.sqlite"
SCHEMA_VERSION = "1"
CANONICALIZATION_VERSION = "exact-cell-permutations-v1"


class N8CanonicalMapError(RuntimeError):
    """The offline n=8 canonical map is unavailable or unsafe to use."""


class N8CanonicalMap:
    def __init__(self, path: Path = DATABASE, source: Path = SOURCE) -> None:
        if not path.is_file() or not source.is_file():
            raise N8CanonicalMapError("Doğrulanmış n=8 kanonik eşleme indeksi bulunamadı.")
        if hashlib.sha256(source.read_bytes()).hexdigest() != EXPECTED_SHA:
            raise N8CanonicalMapError("n=8 kaynak kataloğunun SHA-256 doğrulaması başarısız.")
        self.db = sqlite3.connect(f"file:{path.resolve().as_posix()}?mode=ro", uri=True)
        self._validate()

    def _meta(self, key: str) -> str | None:
        row = self.db.execute("SELECT value FROM metadata WHERE key=?", (key,)).fetchone()
        return None if row is None else str(row[0])

    def _validate(self) -> None:
        expected = {"status": "ready", "source_sha256": EXPECTED_SHA, "schema_version": SCHEMA_VERSION, "canonicalization": CANONICALIZATION_VERSION}
        if any(self._meta(key) != value for key, value in expected.items()):
            raise N8CanonicalMapError("n=8 kanonik eşleme indeksi hazır veya uyumlu değil.")
        row_count, canonical_count, id_count = self.db.execute("SELECT count(*), count(DISTINCT canonical_graph6), count(DISTINCT graph_id) FROM canonical_map").fetchone()
        if (row_count, canonical_count, id_count) != (EXPECTED_COUNT, EXPECTED_COUNT, EXPECTED_COUNT):
            raise N8CanonicalMapError("n=8 kanonik eşleme indeksi eksik.")

    def lookup(self, canonical_graph6: str) -> tuple[int, str] | None:
        row = self.db.execute("SELECT graph_id,graph6 FROM canonical_map WHERE canonical_graph6=?", (canonical_graph6,)).fetchone()
        return None if row is None else (int(row[0]), str(row[1]))
