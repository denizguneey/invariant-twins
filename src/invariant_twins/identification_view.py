"""Streamlit view for finite-domain identification of a user graph."""

from __future__ import annotations

from copy import deepcopy

import networkx as nx
import streamlit as st
import streamlit.components.v1 as components

from .graph_sources import iter_atlas_connected_graphs
from .identification import candidate_class, minimum_identifying_sets, rank_next_invariants, supported_graph
from .invariants import INVARIANT_REGISTRY, compute_invariant, degree_sequence
from .visualization import display_value, graph_to_svg


def _example_graph() -> nx.Graph:
    graph = nx.cycle_graph(4)
    graph.add_edge(2, 4)
    return graph


def _labels(graph: nx.Graph) -> dict[int, str]:
    return {node: chr(65 + int(node)) for node in graph.nodes()}


def _graph6(graph: nx.Graph) -> str:
    return nx.to_graph6_bytes(graph, header=False).decode().strip()


@st.cache_data(show_spinner=False)
def _domain(order: int) -> list[nx.Graph]:
    return list(iter_atlas_connected_graphs(order))


def _push_undo() -> None:
    st.session_state.identify_undo.append(_graph6(st.session_state.identify_graph))


def _restore_graph(graph6: str) -> None:
    st.session_state.identify_graph = nx.from_graph6_bytes(graph6.encode())


def _ensure_state() -> None:
    if "identify_graph" not in st.session_state:
        st.session_state.identify_graph = _example_graph()
        st.session_state.identify_selected = ["degree_sequence"]
        st.session_state.identify_undo = []


def _editor(graph: nx.Graph) -> None:
    st.markdown("#### Graph Editor")
    st.caption("Simple undirected graph · connected · up to 7 vertices")
    components.html(graph_to_svg(graph, seed=702, title=f"Your graph, {graph.number_of_nodes()} vertices, {graph.number_of_edges()} edges", node_labels=_labels(graph)), height=330, scrolling=False)
    st.caption("Canvas preview · deterministic layout · labels A, B, C…")
    with st.expander("Advanced editing"):
        a, b, c, d = st.columns(4)
        if a.button("Add vertex", disabled=graph.number_of_nodes() >= 7, key="id_add_vertex"):
            _push_undo(); st.session_state.identify_graph.add_node(max(graph.nodes(), default=-1) + 1); st.rerun()
        if b.button("Load example", key="id_example"):
            _push_undo(); st.session_state.identify_graph = _example_graph(); st.rerun()
        if c.button("Clear", key="id_clear"):
            _push_undo(); st.session_state.identify_graph = nx.Graph(); st.rerun()
        if d.button("Undo", disabled=not st.session_state.identify_undo, key="id_undo"):
            _restore_graph(st.session_state.identify_undo.pop()); st.rerun()
        names = _labels(graph)
        if graph.nodes:
            remove = st.selectbox("Delete vertex", list(graph.nodes()), format_func=lambda node: names[node], key="id_remove_vertex")
            if st.button("Delete selected vertex", key="id_delete_vertex"):
                _push_undo(); st.session_state.identify_graph.remove_node(remove); st.rerun()
        if graph.number_of_nodes() >= 2:
            left, right = st.columns(2)
            edge_a = left.selectbox("Edge endpoint A", list(graph.nodes()), format_func=lambda node: names[node], key="id_edge_a")
            edge_b = right.selectbox("Edge endpoint B", list(graph.nodes()), format_func=lambda node: names[node], key="id_edge_b")
            if st.button("Add edge", disabled=edge_a == edge_b or graph.has_edge(edge_a, edge_b), key="id_add_edge"):
                _push_undo(); st.session_state.identify_graph.add_edge(edge_a, edge_b); st.rerun()
        if graph.edges:
            edge = st.selectbox("Delete edge", list(graph.edges()), format_func=lambda item: f"{names[item[0]]} — {names[item[1]]}", key="id_delete_edge_select")
            if st.button("Delete selected edge", key="id_delete_edge"):
                _push_undo(); st.session_state.identify_graph.remove_edge(*edge); st.rerun()


def render() -> None:
    """Render the first-class local finite-domain identification workflow."""
    _ensure_state()
    graph = st.session_state.identify_graph
    st.title("Identify My Graph")
    st.caption("How little information is enough to uniquely identify your graph?")
    st.info("Draw or edit a graph, select invariants, and see how many non-isomorphic connected Graph Atlas graphs of the same order still match. Results are finite-domain results, not universal theorems.")
    editor_col, invariants_col, result_col = st.columns((1.2, .95, 1.05), gap="medium")
    with editor_col:
        with st.container(border=True):
            _editor(graph)
    if not supported_graph(graph):
        with invariants_col:
            st.markdown("#### Invariants")
            st.info("Add edges until the graph is connected and keep its order between 1 and 7 to use the finite comparison domain.")
        with result_col:
            st.markdown("#### Identification")
            st.warning("No supported search domain for this graph yet.")
        return
    values = {key: compute_invariant(graph, key) for key in INVARIANT_REGISTRY}
    with invariants_col:
        with st.container(border=True):
            st.markdown("#### Invariants")
            if st.button("Select all", key="id_select_all"):
                st.session_state.identify_selected = list(INVARIANT_REGISTRY)
            selected = []
            for key, definition in INVARIANT_REGISTRY.items():
                checked = st.checkbox(definition.display_name, value=key in st.session_state.identify_selected, key=f"id_invariant_{key}", help=str(values[key]))
                if checked:
                    selected.append(key)
                st.caption(display_value(values[key]))
        st.session_state.identify_selected = selected
        st.caption("Exact characteristic-polynomial coefficients are used for spectral comparisons.")
    domain = _domain(graph.number_of_nodes())
    candidates = candidate_class(graph, selected, domain)
    with result_col:
        with st.container(border=True):
            st.markdown(f"#### Identification · n = {graph.number_of_nodes()}")
            st.metric("Candidates remain", len(candidates), f"out of {len(domain)} non-isomorphic graphs")
            eliminated = round(100 * (1 - len(candidates) / len(domain)))
            st.progress(eliminated, text=f"{eliminated}% eliminated")
            if len(candidates) == 1:
                st.success("✅ Graph identified within the stated finite domain.")
            else:
                st.error("❌ Your current fingerprint does not uniquely identify the graph.")
                ranking = rank_next_invariants(graph, candidates, selected)
                if ranking:
                    best, score, remaining = ranking[0]
                    st.info(f"**Best next invariant**\n\n{INVARIANT_REGISTRY[best].display_name}\n\n{len(candidates)} → {remaining} candidates")
                    if st.button(f"+ Add {INVARIANT_REGISTRY[best].display_name}", key="id_add_best"):
                        st.session_state.identify_selected = selected + [best]; st.rerun()
            st.success("**Minimum identifying set for this graph**")
            if st.button("Compute minimum identifying set", key="id_minimum"):
                st.session_state.identify_minimum = minimum_identifying_sets(graph, domain)
            if minimum := st.session_state.get("identify_minimum"):
                st.write("This graph can be uniquely identified using only:")
                st.write(" · ".join(INVARIANT_REGISTRY[key].display_name for key in minimum[0]))
    lower_left, lower_right = st.columns((0.32, 1))
    with lower_left:
        with st.container(border=True):
            st.markdown("#### Current Fingerprint")
            st.markdown(f"Order (n) **{graph.number_of_nodes()}**  \nSize (m) **{graph.number_of_edges()}**  \nDegree sequence **{degree_sequence(graph)}**  \nTriangle count **{values['triangle_count']}**")
            st.caption("Graph6 encoding")
            st.code(_graph6(graph), language=None)
    with lower_right:
        st.markdown(f"#### Candidate Graphs · {len(candidates)} non-isomorphic graphs")
        st.caption("Your graph is compared against the full connected Graph Atlas domain for this order; the gallery shows the first 8 matches.")
        cards = st.columns(min(4, max(1, len(candidates))))
        for index, candidate in enumerate(candidates[:8]):
            with cards[index % len(cards)]:
                title = "Your Graph (G)" if nx.is_isomorphic(candidate, graph) else f"Candidate #{index + 1}"
                st.markdown(f"**{title}**")
                with st.container(border=True):
                    components.html(graph_to_svg(candidate, seed=800 + index, title=title, height=130), height=142, scrolling=False)
                    st.caption(f"{title}\nn = {candidate.number_of_nodes()} · m = {candidate.number_of_edges()}\ndeg = {degree_sequence(candidate)}\ngraph6: {_graph6(candidate)}")
