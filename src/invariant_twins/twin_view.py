"""English Streamlit view for the fixed twin witnesses."""

import networkx as nx
import streamlit as st
import streamlit.components.v1 as components

from .invariants import adjacency_characteristic_polynomial
from .visualization import graph_to_svg

G_GRAPH6 = "G?AFBo"
H_GRAPH6 = "G?B@`w"
G_EDGES = {(0, 5), (0, 6), (1, 6), (1, 7), (2, 6), (2, 7), (3, 7), (4, 7)}
H_EDGES = {(0, 5), (1, 5), (2, 6), (2, 7), (3, 6), (3, 7), (4, 7), (5, 7)}
CHARPOLY = (1, 0, -8, 0, 14, 0, -4, 0, 0)
G_DIAMETER_PATH = (5, 0, 6, 1, 7, 3)
H_DIAMETER_PATH = (0, 5, 7, 2, 6)


def witnesses() -> tuple[nx.Graph, nx.Graph]:
    """Decode and exactly validate the two fixed graph6 witnesses."""
    g = nx.from_graph6_bytes(G_GRAPH6.encode())
    h = nx.from_graph6_bytes(H_GRAPH6.encode())
    assert {tuple(sorted(edge)) for edge in g.edges()} == G_EDGES
    assert {tuple(sorted(edge)) for edge in h.edges()} == H_EDGES
    assert adjacency_characteristic_polynomial(g) == adjacency_characteristic_polynomial(h) == CHARPOLY
    assert nx.is_connected(g) and nx.is_connected(h) and not nx.is_isomorphic(g, h)
    return g, h


def _path_edges(path: tuple[int, ...]) -> set[frozenset[int]]:
    return {frozenset(edge) for edge in zip(path, path[1:])}


def render() -> None:
    """Render the twin-comparison tab."""
    g, h = witnesses()
    st.subheader("twin comparison")
    st.caption("same fingerprint, connected non-isomorphic graphs.")
    show = st.session_state.get("twin_show_difference", False)
    if st.button("hide difference" if show else "show difference", key="twin_difference"):
        st.session_state.twin_show_difference = not show
        st.rerun()

    left, right = st.columns(2)
    graphs = (
        (left, g, "G", G_GRAPH6, 1201, G_DIAMETER_PATH),
        (right, h, "H", H_GRAPH6, 1202, H_DIAMETER_PATH),
    )
    for column, graph, name, graph6, seed, path in graphs:
        with column:
            st.markdown(f"#### {name}")
            labels = {node: str(graph.degree(node)) for node in graph}
            components.html(
                graph_to_svg(
                    graph,
                    seed,
                    f"{name}, degrees shown in nodes",
                    node_labels=labels,
                    highlighted_edges=_path_edges(path) if show else None,
                ),
                height=285,
                scrolling=False,
            )
            st.caption(f"graph6: {graph6}")
            suffix = " · yellow path: a shortest path realizing the diameter" if show else ""
            st.caption("number in each node: degree" + suffix)

    rows = [
        {"status": "✅ match", "invariant": "degree sequence", "G": "(4,3,2,2,2,1,1,1)", "H": "(4,3,2,2,2,1,1,1)"},
        {"status": "✅ match", "invariant": "characteristic polynomial coefficients", "G": str(list(CHARPOLY)), "H": str(list(CHARPOLY))},
        {"status": "✅ match", "invariant": "edge count / triangle count", "G": "8 / 0", "H": "8 / 0"},
    ]
    if show:
        rows.append({"status": "❌ separates", "invariant": "diameter (not in fingerprint)", "G": "5", "H": "4"})
    st.dataframe(rows, width="stretch", hide_index=True)
    st.caption("findings apply only within the enumerated graph bound.")
