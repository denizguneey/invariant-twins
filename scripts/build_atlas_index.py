"""Build/validate the exact Graph Atlas invariant store for n=4..7."""
from __future__ import annotations
import argparse, json, sqlite3
from pathlib import Path
from invariant_twins.atlas_index import COUNTS, DATABASE, ORDERS, SCHEMA_VERSION, SERIALIZATION_VERSION, canonical
from invariant_twins.graph_sources import iter_atlas_connected_graphs
from invariant_twins.invariants import INVARIANT_REGISTRY, compute_invariant

def connect(path: Path):
 db=sqlite3.connect(path); db.executescript("CREATE TABLE IF NOT EXISTS metadata(key TEXT PRIMARY KEY,value TEXT NOT NULL); CREATE TABLE IF NOT EXISTS graphs(id INTEGER PRIMARY KEY,ord INTEGER NOT NULL,graph6 TEXT NOT NULL UNIQUE); CREATE TABLE IF NOT EXISTS invariant_values(graph_id INTEGER,invariant_id TEXT,value TEXT NOT NULL,PRIMARY KEY(graph_id,invariant_id)); CREATE INDEX IF NOT EXISTS atlas_lookup ON invariant_values(invariant_id,graph_id);"); return db
def build(db):
 db.execute("INSERT OR REPLACE INTO metadata VALUES('status','building')"); graph_id=1
 for order in ORDERS:
  for graph in iter_atlas_connected_graphs(order):
   text=__import__('networkx').to_graph6_bytes(graph,header=False).decode().strip(); db.execute("INSERT OR REPLACE INTO graphs VALUES(?,?,?)",(graph_id,order,text))
   db.executemany("INSERT OR REPLACE INTO invariant_values VALUES(?,?,?)",[(graph_id,name,canonical(compute_invariant(graph,name))) for name in INVARIANT_REGISTRY]); graph_id+=1
 db.executemany("INSERT OR REPLACE INTO metadata VALUES(?,?)",[("schema_version",SCHEMA_VERSION),("serialization",SERIALIZATION_VERSION),("orders",canonical(ORDERS))]); db.commit(); validate(db)
def validate(db):
 ok=all(db.execute("SELECT count(*) FROM graphs WHERE ord=?",(o,)).fetchone()[0]==c for o,c in COUNTS.items()) and all(db.execute("SELECT count(*) FROM invariant_values WHERE invariant_id=?",(n,)).fetchone()[0]==sum(COUNTS.values()) for n in INVARIANT_REGISTRY); db.execute("INSERT OR REPLACE INTO metadata VALUES('status',?)",('ready' if ok else 'building',)); db.commit(); return ok
def main():
 p=argparse.ArgumentParser(); p.add_argument('--db',type=Path,default=DATABASE); p.add_argument('--status',action='store_true'); p.add_argument('--validate',action='store_true'); a=p.parse_args(); db=connect(a.db)
 if a.status: print('state:',db.execute("SELECT value FROM metadata WHERE key='status'").fetchone()[0] if db.execute("SELECT name FROM sqlite_master WHERE name='metadata'").fetchone() else 'missing'); return
 if a.validate: print('ready' if validate(db) else 'building'); return
 build(db); print('ready')
if __name__=='__main__': main()
