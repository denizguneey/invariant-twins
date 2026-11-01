"""Verified read-only exact-invariant store for Graph Atlas orders 4--7."""
from __future__ import annotations

import json
import sqlite3
from pathlib import Path
from typing import Iterable

from .invariants import INVARIANT_REGISTRY

ROOT = Path(__file__).resolve().parents[2]
DATABASE = ROOT / "data" / "connected" / "atlas_invariants.sqlite"
ORDERS = (4, 5, 6, 7); COUNTS = {4: 6, 5: 21, 6: 112, 7: 853}
SCHEMA_VERSION = "1"; SERIALIZATION_VERSION = "json-v1"

def canonical(value: object) -> str: return json.dumps(value, ensure_ascii=False, separators=(",", ":"))

class AtlasIndexError(RuntimeError): pass

class AtlasIndex:
    def __init__(self, path: Path = DATABASE) -> None:
        if not path.is_file(): raise AtlasIndexError("Doğrulanmış Atlas invariant indeksi bulunamadı.")
        self.db = sqlite3.connect(f"file:{path.resolve().as_posix()}?mode=ro", uri=True); self._validate()
    def _meta(self, key: str) -> str | None:
        row=self.db.execute("SELECT value FROM metadata WHERE key=?",(key,)).fetchone(); return None if row is None else row[0]
    def _validate(self) -> None:
        if self._meta("status") != "ready" or self._meta("schema_version") != SCHEMA_VERSION or self._meta("serialization") != SERIALIZATION_VERSION: raise AtlasIndexError("Atlas invariant indeksi hazır veya uyumlu değil.")
        for order,count in COUNTS.items():
            if self.db.execute("SELECT count(*) FROM graphs WHERE ord=?",(order,)).fetchone()[0] != count: raise AtlasIndexError("Atlas indeks grafik sayısı doğrulanamadı.")
        for name in INVARIANT_REGISTRY:
            if self.db.execute("SELECT count(*) FROM invariant_values WHERE invariant_id=? AND value IS NOT NULL",(name,)).fetchone()[0] != sum(COUNTS.values()): raise AtlasIndexError("Atlas invariant indeksi eksik.")
    def fingerprint_class_sizes(self, order: int, names: Iterable[str]) -> list[int]:
        names=list(names)
        if not names: return [COUNTS[order]]
        cases=", ".join(f"MAX(CASE WHEN invariant_id=? THEN value END) AS v{i}" for i,_ in enumerate(names)); cols=", ".join(f"v{i}" for i in range(len(names)))
        sql=f"WITH f AS (SELECT g.id, {cases} FROM graphs g JOIN invariant_values v ON v.graph_id=g.id WHERE g.ord=? AND v.invariant_id IN ({','.join('?' for _ in names)}) GROUP BY g.id) SELECT count(*) FROM f GROUP BY {cols}"
        return [row[0] for row in self.db.execute(sql,[*names,order,*names])]
