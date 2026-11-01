from itertools import islice

import networkx as nx
import pytest

from invariant_twins.canonical_identity import canonical_graph6
from invariant_twins.graph_sources import N8_CATALOG, iter_atlas_connected_graphs


def asymmetric_graph() -> nx.Graph:
    for graph in iter_atlas_connected_graphs(7):
        matcher = nx.isomorphism.GraphMatcher(graph, graph)
        if sum(1 for _ in matcher.isomorphisms_iter()) == 1:
            return graph
    raise AssertionError("Graph Atlas should contain an asymmetric connected graph at n=7")


def relabelings(graph: nx.Graph) -> list[nx.Graph]:
    nodes = list(graph)
    variants = []
    for labels in (list(reversed(range(100, 100 + len(nodes)))), [f"v{index * 7}" for index in range(len(nodes))], list(range(len(nodes) - 1, -1, -1))):
        variants.append(nx.relabel_nodes(graph, dict(zip(nodes, labels))))
    return variants


@pytest.mark.parametrize("graph", [nx.path_graph(7), nx.cycle_graph(7), nx.star_graph(6), nx.complete_graph(7), asymmetric_graph(), nx.complete_bipartite_graph(3, 4)])
def test_canonical_graph6_is_stable_for_isomorphic_relabelings(graph: nx.Graph) -> None:
    expected = canonical_graph6(graph)
    assert all(canonical_graph6(variant) == expected for variant in relabelings(graph))


def test_canonical_graph6_separates_nonisomorphic_same_degree_graphs() -> None:
    first, second = nx.complete_bipartite_graph(3, 3), nx.circular_ladder_graph(3)
    assert sorted(dict(first.degree()).values()) == sorted(dict(second.degree()).values())
    assert not nx.is_isomorphic(first, second)
    assert canonical_graph6(first) != canonical_graph6(second)


def test_ordinary_graph6_may_differ_while_canonical_graph6_is_stable() -> None:
    first = nx.Graph(); first.add_nodes_from(range(5)); first.add_edges_from([(0, 1), (1, 2), (2, 3), (2, 4)])
    second = nx.Graph(); second.add_nodes_from([2, 0, 4, 1, 3]); second.add_edges_from([(0, 1), (1, 2), (2, 3), (2, 4)])
    assert nx.to_graph6_bytes(first, header=False) != nx.to_graph6_bytes(second, header=False)
    assert canonical_graph6(first) == canonical_graph6(second)


@pytest.mark.parametrize(("order", "count"), [(5, 21), (6, 112), (7, 853)])
def test_canonical_graph6_is_unique_for_connected_graph_atlas_domains(order: int, count: int) -> None:
    identifiers = {canonical_graph6(graph) for graph in iter_atlas_connected_graphs(order)}
    assert len(identifiers) == count


def test_canonical_graph6_is_stable_and_distinct_for_n8_samples() -> None:
    wanted = {0, 37, 503, 1006}
    samples = [nx.from_graph6_bytes(line.strip().encode()) for index, line in enumerate(N8_CATALOG.open(encoding="ascii")) if index in wanted]
    identifiers = [canonical_graph6(graph) for graph in samples]
    assert len(set(identifiers)) == len(samples)
    for graph, identifier in zip(samples, identifiers):
        assert all(canonical_graph6(variant) == identifier for variant in relabelings(graph))


def test_canonical_graph6_rejects_unsupported_graphs() -> None:
    with pytest.raises(TypeError): canonical_graph6(nx.DiGraph([(0, 1)]))
    with pytest.raises(TypeError): canonical_graph6(nx.MultiGraph([(0, 1)]))
    with pytest.raises(ValueError): canonical_graph6(nx.path_graph(9))
    looped = nx.Graph(); looped.add_edge(0, 0)
    with pytest.raises(ValueError): canonical_graph6(looped)
