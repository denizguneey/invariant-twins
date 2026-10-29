import importlib.util
from pathlib import Path


SPEC = importlib.util.spec_from_file_location("n8_builder", Path(__file__).parents[1] / "scripts" / "build_n8_index.py")
builder = importlib.util.module_from_spec(SPEC); assert SPEC.loader; SPEC.loader.exec_module(builder)


def seeded(tmp_path, complete=True):
    builder.EXPECTED_COUNT = 1; builder.ORDER = ("degree_sequence",); builder.EXPECTED_SHA = "test-sha"
    db = builder.connect(tmp_path / "index.sqlite")
    db.execute("INSERT INTO graphs VALUES(1,'G?A',8,1)")
    for key, value in {"source_sha256":"test-sha","schema_version":builder.SCHEMA_VERSION,"serialization":builder.SERIALIZATION_VERSION,"required_invariants":builder.canonical(builder.ORDER),"status":"building"}.items(): db.execute("INSERT INTO metadata VALUES(?,?)", (key,value))
    db.execute("INSERT INTO progress VALUES('degree_sequence',1,0,0)")
    if complete: db.execute("INSERT INTO invariant_values VALUES(1,'degree_sequence','[1]',NULL)")
    db.commit(); return db


def test_complete_validation_persists_ready_and_reopening_preserves_it(tmp_path):
    db = seeded(tmp_path); assert builder.validate(db)
    assert db.execute("SELECT value FROM metadata WHERE key='status'").fetchone() == ("ready",)
    db.close(); reopened = builder.connect(tmp_path / "index.sqlite")
    assert reopened.execute("SELECT value FROM metadata WHERE key='status'").fetchone() == ("ready",)


def test_incomplete_database_remains_building(tmp_path):
    db = seeded(tmp_path, complete=False); assert not builder.validate(db)
    assert db.execute("SELECT value FROM metadata WHERE key='status'").fetchone() == ("building",)
