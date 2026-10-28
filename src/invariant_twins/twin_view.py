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
G_POSITIONS = {5: (-1.0, 0.8), 0: (-0.65, 0.5), 6: (-0.2, 0.35), 1: (0.2, 0.7), 2: (0.2, 0.0), 7: (0.65, 0.35), 3: (1.05, 0.7), 4: (1.05, 0.0)}
H_POSITIONS = {0: (-1.0, 0.7), 1: (-1.0, 0.0), 5: (-0.55, 0.35), 7: (0.0, 0.35), 4: (0.4, 0.75), 2: (0.4, 0.0), 6: (0.8, 0.5), 3: (0.8, -0.15)}


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
    st.info("**Verified collision example.** These two graphs are different, but the selected fingerprint cannot tell them apart. They have the same degree sequence and the same exact adjacency characteristic polynomial; NetworkX confirms they are not isomorphic.")
    show = st.session_state.get("twin_show_difference", False)
    if st.button("Hide the separating property" if show else "Show a separating property", key="twin_difference"):
        st.session_state.twin_show_difference = not show
        st.rerun()

    left, right = st.columns(2)
    graphs = (
        (left, g, "G", G_GRAPH6, 1201, G_DIAMETER_PATH, G_POSITIONS),
        (right, h, "H", H_GRAPH6, 1202, H_DIAMETER_PATH, H_POSITIONS),
    )
    for column, graph, name, graph6, seed, path, positions in graphs:
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
                    positions=positions,
                ),
                height=320,
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
    if show:
        st.error("❌ Separates this pair — diameter: G = 5, H = 4.")
    with st.expander("What does diameter mean?"):
        st.write("Diameter is the largest shortest-path distance between two vertices.")
    st.caption("findings apply only within the enumerated graph bound.")
