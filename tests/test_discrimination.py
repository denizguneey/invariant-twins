from collections import Counter

from invariant_twins.discrimination import discrimination_power, summarize_class_sizes
from invariant_twins.graph_sources import iter_atlas_connected_graphs
from invariant_twins.invariants import compute_invariant


def test_partition_formula_example() -> None:
    result = summarize_class_sizes([1, 1, 2, 3])
    assert result["domainSize"] == 7 and result["uniqueGraphCount"] == 2
    assert result["indistinguishablePairCount"] == 4 and result["totalPairCount"] == 21
    assert result["pairSeparationRate"] == 17 / 21 and result["uniqueIdentificationRate"] == 2 / 7


def test_domains_and_monotonicity() -> None:
    degree = discrimination_power(["degree_sequence"])
    refined = discrimination_power(["degree_sequence", "triangle_count"])
    assert [row["domainSize"] for row in degree] == [6, 21, 112, 853, 11117]
    for before, after in zip(degree, refined):
        assert after["uniqueIdentificationRate"] >= before["uniqueIdentificationRate"]
        assert after["pairSeparationRate"] >= before["pairSeparationRate"]


def test_atlas_cross_check_for_two_fingerprints() -> None:
    for names in (("degree_sequence",), ("degree_sequence", "triangle_count")):
        direct = Counter(tuple(compute_invariant(graph, name) for name in names) for graph in iter_atlas_connected_graphs(6))
        result = next(row for row in discrimination_power(names) if row["order"] == 6)
        assert result == {"order": 6, **summarize_class_sizes(direct.values())}


def test_n8_uses_index_layer(monkeypatch) -> None:
    import invariant_twins.discrimination as subject
    subject._discrimination_power.cache_clear()
    opened = []
    original = subject.N8Index
    class ObservedIndex(original):
        def __init__(self):
            opened.append(True); super().__init__()
    monkeypatch.setattr(subject, "N8Index", ObservedIndex)
    assert next(row for row in subject.discrimination_power(["degree_sequence"]) if row["order"] == 8)["domainSize"] == 11117
    assert opened


def test_n8_bulk_class_sizes_match_stored_exact_values() -> None:
    from invariant_twins.n8_index import N8Index
    index = N8Index(); names = ("degree_sequence", "adjacency_charpoly")
    values = index.values(range(1, index.domain_size + 1), names)
    expected = sorted(Counter(tuple(repr(row[name]) for name in names) for row in values.values()).values())
    assert sorted(index.fingerprint_class_sizes(names)) == expected
