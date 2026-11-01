import sqlite3

import pytest

from invariant_twins.atlas_index import AtlasIndex, AtlasIndexError, COUNTS
from invariant_twins.discrimination import _atlas


def test_ready_atlas_index_has_verified_counts() -> None:
    index = AtlasIndex()
    assert [index.db.execute("SELECT count(*) FROM graphs WHERE ord=?", (order,)).fetchone()[0] for order in COUNTS] == [6, 21, 112, 853]


def test_incomplete_atlas_index_is_rejected(tmp_path) -> None:
    path = tmp_path / "atlas.sqlite"; db = sqlite3.connect(path)
    db.execute("CREATE TABLE metadata (key TEXT PRIMARY KEY, value TEXT NOT NULL)"); db.execute("INSERT INTO metadata VALUES ('status','building')"); db.commit(); db.close()
    with pytest.raises(AtlasIndexError): AtlasIndex(path)


def test_cached_atlas_result_matches_direct_cross_check() -> None:
    from collections import Counter
    from invariant_twins.graph_sources import iter_atlas_connected_graphs
    from invariant_twins.invariants import compute_invariant
    names = ("degree_sequence", "triangle_count")
    direct = Counter(tuple(compute_invariant(graph, name) for name in names) for graph in iter_atlas_connected_graphs(7))
    from invariant_twins.discrimination import summarize_class_sizes
    assert _atlas(7, names) == summarize_class_sizes(direct.values())


def test_all_invariants_cache_matches_direct_atlas() -> None:
    from collections import Counter
    from invariant_twins.graph_sources import iter_atlas_connected_graphs
    from invariant_twins.invariants import INVARIANT_REGISTRY, compute_invariant
    from invariant_twins.discrimination import summarize_class_sizes
    names = tuple(INVARIANT_REGISTRY)
    for order in (4, 5, 6, 7):
        direct = Counter(tuple(compute_invariant(graph, name) for name in names) for graph in iter_atlas_connected_graphs(order))
        assert _atlas(order, names) == summarize_class_sizes(direct.values())
