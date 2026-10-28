"""Streamlit interface for finite Graph Atlas invariant experiments."""

import networkx as nx
import streamlit as st
import streamlit.components.v1 as components

from invariant_rules import invariant_redundancies
from invariants import ALL_INVARIANTS, invariant_values, research_invariant_values
from search import find_collision_witness, find_minimum_separating_sets, fingerprint, invariant_diagnostics
from visualization import display_value, graph_to_svg
from graph_sources import detect_geng, iter_connected_graphs
from collision_search import graph6, search_first_fingerprint_collision
from reporting import research_report
from frontier import INVARIANT_REGISTRY, PRESETS, compute_frontier


st.set_page_config(page_title="Invariant Twins", page_icon="🧬", layout="wide")
st.title("🧬 Invariant Twins")
st.caption("How many graph invariants does it take to identify a graph?")


@st.cache_data(show_spinner=False)
def atlas_connected(max_nodes: int) -> list[tuple[int, nx.Graph]]:
    """Load connected simple Graph Atlas graphs through the requested order."""
    return [
        (atlas_id, nx.Graph(graph))
        for atlas_id, graph in enumerate(nx.graph_atlas_g())
        if 1 <= graph.number_of_nodes() <= max_nodes and nx.is_connected(graph)
    ]


@st.cache_data(show_spinner=False)
def precompute(max_nodes: int) -> list[tuple[int, nx.Graph, dict[str, object], dict[str, object]]]:
    """Cache UI and exact research invariant values once per atlas graph."""
    return [
        (atlas_id, graph, invariant_values(graph), research_invariant_values(graph))
        for atlas_id, graph in atlas_connected(max_nodes)
    ]


def find_smallest_twins(rows, selected: list[str], exact_n: int | None = None):
    """Find the first non-isomorphic UI collision by order, edge count, then ID."""
    buckets: dict[tuple[object, ...], list[tuple[int, nx.Graph, dict[str, object]]]] = {}
    for atlas_id, graph, values, _ in sorted(rows, key=lambda row: (row[1].number_of_nodes(), row[1].number_of_edges(), row[0])):
        if exact_n is not None and graph.number_of_nodes() != exact_n:
            continue
        key = (graph.number_of_nodes(),) + fingerprint(values, selected)
        for other in buckets.get(key, []):
            if not nx.is_isomorphic(other[1], graph):
                return other, (atlas_id, graph, values)
        buckets.setdefault(key, []).append((atlas_id, graph, values))
    return None


def scoped_research_records(rows, exact_n: int | None):
    """Return research records in the active search scope."""
    return [(atlas_id, graph, exact_values) for atlas_id, graph, _, exact_values in rows if exact_n is None or graph.number_of_nodes() == exact_n]


def graph_data(graph: nx.Graph, key: str) -> None:
    """Display a compact graph6 witness field."""
    with st.expander("Graph data"):
        st.text_input("graph6:", nx.to_graph6_bytes(graph, header=False).decode().strip(), key=key, disabled=True)


def render_graph_svg(graph: nx.Graph, seed: int, title: str) -> None:
    """Embed the SVG in a fixed-height component so it remains visible in Streamlit."""
    components.html(graph_to_svg(graph, seed=seed, title=title), height=280, scrolling=False)


with st.sidebar:
    st.header("Search settings")
    mode = st.radio("Search", ["Smallest twin up to n", "Exact vertex count"], index=0)
    max_n = st.slider("Maximum vertices", 3, 7, 7)
    exact_n = st.slider("Exact vertices", 3, max_n, max_n) if mode == "Exact vertex count" else None
    selected = st.multiselect("Invariants that must match", ALL_INVARIANTS, default=["Edges", "Degree sequence"])
    for notice in invariant_redundancies(selected):
        st.warning(notice, icon="⚠️")
    st.caption("Vertex count is always matched, so results are not trivial cross-size pairs.")
    find_clicked = st.button("Find invariant twins", type="primary", width="stretch")

st.markdown("Choose a set of invariants. The app searches the Graph Atlas for the smallest pair of **non-isomorphic connected graphs** that share all selected values.")
if not selected:
    st.info("Select at least one invariant to make the experiment meaningful.")
elif find_clicked or "result" not in st.session_state:
    with st.spinner("Searching the graph atlas…"):
        rows = precompute(max_n)
        st.session_state.result = find_smallest_twins(rows, selected, exact_n=exact_n)
        st.session_state.selected = list(selected)

result = st.session_state.get("result")
selected_for_result = st.session_state.get("selected", selected)
if selected_for_result and result is None:
    st.success("No twin pair was found in the selected search range.")
    st.caption("That does not prove the invariant set identifies all graphs—only that no collision appeared in this finite atlas search.")
elif result:
    (id_a, graph_a, values_a), (id_b, graph_b, values_b) = result
    st.success(f"Twin pair found on {graph_a.number_of_nodes()} vertices: Atlas G{id_a} and G{id_b}")
    column_a, column_b = st.columns(2)
    with column_a:
        st.subheader(f"Graph A · G{id_a}")
        render_graph_svg(graph_a, id_a + 17, f"Graph A, {graph_a.number_of_nodes()} vertices, {graph_a.number_of_edges()} edges")
        graph_data(graph_a, f"graph6_a_{id_a}")
    with column_b:
        st.subheader(f"Graph B · G{id_b}")
        render_graph_svg(graph_b, id_b + 17, f"Graph B, {graph_b.number_of_nodes()} vertices, {graph_b.number_of_edges()} edges")
        graph_data(graph_b, f"graph6_b_{id_b}")
    unselected = [name for name in ALL_INVARIANTS if name not in selected_for_result]
    distinguishing = [name for name in unselected if values_a[name] != values_b[name]]
    st.info(f"These graphs agree on {len(selected_for_result)} selected invariants but are non-isomorphic.\n\n{len(distinguishing)} of the remaining implemented invariants can distinguish them.")
    st.markdown("### Why they are twins")
    st.dataframe([{"Invariant": name, "Graph A": display_value(values_a[name]), "Graph B": display_value(values_b[name]), "Match": values_a[name] == values_b[name]} for name in selected_for_result], width="stretch", hide_index=True)
    st.markdown("### But they are not the same graph")
    st.code(f"nx.is_isomorphic(G, H)  ->  {nx.is_isomorphic(graph_a, graph_b)}", language="python")
    with st.expander("Show invariants that can distinguish this pair"):
        if unselected:
            st.dataframe([{"Invariant": name, "Result": "✅ Separates this pair" if values_a[name] != values_b[name] else "❌ Still matches", "Graph A": display_value(values_a[name]), "Graph B": display_value(values_b[name])} for name in unselected], width="stretch", hide_index=True)
        else:
            st.write("All implemented invariants are already selected.")
    st.caption("Finite search note: this result is a concrete witness inside the Graph Atlas (connected graphs, up to 7 vertices). It is not a proof about graphs of arbitrary size.")

st.markdown("---")
st.markdown("## Research mode\n### Minimum separating invariant set")
st.caption("Exact exhaustive subset search over the implemented invariant family; graph order is a free partitioning key.")
st.caption("Minimum separating set within the implemented invariant family and the finite Graph Atlas search domain.")
compute_minimum = st.button("Compute minimum separating set")
if compute_minimum:
    with st.spinner("Exhaustively checking invariant subsets…"):
        research_rows = precompute(max_n)
        research_exact_n = exact_n if mode == "Exact vertex count" else None
        records = scoped_research_records(research_rows, research_exact_n)
        minimum_sets = find_minimum_separating_sets(records, ALL_INVARIANTS)
        full_witness = find_collision_witness(records, ALL_INVARIANTS)
    domain = f"orders 1–{max_n}" if research_exact_n is None else f"order {research_exact_n}"
    domain_metric, graphs_metric, invariants_metric = st.columns(3)
    domain_metric.metric("Search domain", f"Connected Graph Atlas graphs, {domain}")
    graphs_metric.metric("Graphs examined", len(records))
    invariants_metric.metric("Candidate invariants", len(ALL_INVARIANTS))
    if full_witness is None:
        st.markdown(f"**Minimum number of invariants required:** {len(minimum_sets[0])}")
        st.markdown(f"**Number of minimum separating sets found:** {len(minimum_sets)}")
        for index, minimum_set in enumerate(minimum_sets, start=1):
            st.markdown(f"**Minimum set #{index}**")
            st.markdown("\n".join(f"- {name}" for name in minimum_set) or "- No invariants required")
        st.success("Verified against every pair of non-isomorphic graphs of equal order in this finite search domain.")
    else:
        (witness_a, witness_b) = full_witness
        id_a, graph_a, _ = witness_a
        id_b, graph_b, _ = witness_b
        st.error("The implemented invariant family is insufficient to distinguish all graphs in this finite domain.")
        st.write(f"A surviving non-isomorphic twin pair is Atlas G{id_a} and G{id_b}.")
        failure_a, failure_b = st.columns(2)
        with failure_a:
            st.subheader(f"Witness A · G{id_a}")
            render_graph_svg(graph_a, id_a + 17, f"Witness A, {graph_a.number_of_nodes()} vertices, {graph_a.number_of_edges()} edges")
            graph_data(graph_a, f"failure_graph6_a_{id_a}")
        with failure_b:
            st.subheader(f"Witness B · G{id_b}")
            render_graph_svg(graph_b, id_b + 17, f"Witness B, {graph_b.number_of_nodes()} vertices, {graph_b.number_of_edges()} edges")
            graph_data(graph_b, f"failure_graph6_b_{id_b}")
    st.warning("Finite computational result. This does not prove that the same invariant set distinguishes graphs of arbitrary order.")

    with st.expander("Invariant diagnostics"):
        st.dataframe(invariant_diagnostics(records, ALL_INVARIANTS), width="stretch", hide_index=True)
    st.download_button(
        "Download reproducibility report",
        research_report(f"Connected Graph Atlas graphs, {domain}", len(records), minimum_sets, None),
        file_name="invariant-twins-research.md",
        mime="text/markdown",
    )

st.markdown("### Break the fingerprint")
st.caption("For reproducible exhaustive searches, this repository also includes a Linux GitHub Actions research workflow.")
st.markdown("**Fingerprint under test:** Degree sequence + exact adjacency spectrum (adjacency characteristic polynomial).")
st.write("Degree sequence and adjacency spectrum each lose information. Together they separate all connected Graph Atlas graphs through order 7 in this finite experiment; this search asks where that combined fingerprint first fails.")
st.info("Exhaustively verified collision-free through n = 7 within the NetworkX Graph Atlas.")
geng_configured_path = st.text_input("geng executable path (optional)", value=detect_geng() or "")
geng_path = detect_geng(geng_configured_path or None)
if geng_path is None:
    st.caption("Exhaustive search beyond 7 vertices requires nauty/Traces geng.")
    with st.expander("How to enable exhaustive search beyond n = 7"):
        st.markdown("Install nauty/Traces and make `geng` (or `geng.exe`) available on your PATH, then restart Streamlit. The app never downloads executables automatically.")
else:
    maximum_collision_order = st.slider("Maximum order for exhaustive fingerprint search", 8, 10, 8)
    if st.button("Search for first collision"):
        try:
            with st.spinner("Exhaustively streaming connected graphs by order…"):
                source = lambda order: iter_connected_graphs(order, geng_path)
                collision_result = search_first_fingerprint_collision(8, maximum_collision_order, source, prefix_exhaustive=True)
        except (FileNotFoundError, RuntimeError) as error:
            st.error(f"geng could not complete an exhaustive search: {error}")
            collision_result = None
        if collision_result is None:
            pass
        elif collision_result.collision is None:
            st.success(f"No fingerprint collision found through n = {maximum_collision_order} in the completed exhaustive search.")
        else:
            collision = collision_result.collision
            label = "FIRST FINGERPRINT COLLISION" if collision.minimality_established else "FINGERPRINT COLLISION FOUND"
            st.error(label)
            left, right = st.columns(2)
            with left:
                render_graph_svg(collision.graph_a, 801, f"Collision graph A, {collision.order} vertices")
                graph_data(collision.graph_a, "collision_graph6_a")
            with right:
                render_graph_svg(collision.graph_b, 802, f"Collision graph B, {collision.order} vertices")
                graph_data(collision.graph_b, "collision_graph6_b")
            st.markdown(f"**Order:** {collision.order}  \n**Same degree sequence:** `{collision.degree_sequence}`  \n**Same exact adjacency characteristic polynomial:** `{collision.characteristic_polynomial}`  \n**NetworkX isomorphic:** False  \n**Minimality established:** {'YES' if collision.minimality_established else 'NO'}")
            st.download_button("Download collision report", research_report(f"Connected graphs through {maximum_collision_order}", collision_result.graphs_examined, [], collision), file_name="fingerprint-collision.md", mime="text/markdown")

st.markdown("### Fingerprint Frontier")
st.caption("How far does your graph fingerprint remain unique? All displayed results are finite exhaustive computations, not statements about arbitrary graph order.")
frontier_ids = list(INVARIANT_REGISTRY)
frontier_default = list(PRESETS["F6"])
selected_frontier = st.multiselect(
    "Exact invariants in the frontier fingerprint",
    frontier_ids,
    default=frontier_default,
    format_func=lambda name: INVARIANT_REGISTRY[name].display_name,
    key="frontier_invariants",
)
frontier_max = st.slider("Frontier maximum order", 1, 8 if geng_path else 7, 7, key="frontier_max")
if any(INVARIANT_REGISTRY[name].cost_class == "expensive" for name in selected_frontier):
    st.caption("Distance spectrum is exact but comparatively expensive; it is included only when selected.")
if st.button("Compute Fingerprint Frontier"):
    if not selected_frontier:
        st.warning("Select at least one exact invariant.")
    elif frontier_max >= 8 and geng_path is None:
        st.warning("Order 8 requires nauty/Traces geng.")
    else:
        try:
            with st.spinner("Exhaustively checking orders in increasing order…"):
                frontier_result = compute_frontier(
                    selected_frontier,
                    1,
                    frontier_max,
                    lambda order: iter_connected_graphs(order, geng_path),
                )
            st.session_state.frontier_result = frontier_result
            st.session_state.frontier_label = next((name for name, members in PRESETS.items() if members == tuple(selected_frontier)), "Custom")
        except (FileNotFoundError, RuntimeError, ValueError, nx.NetworkXError) as error:
            st.error(f"The finite frontier search could not complete: {error}")

frontier_result = st.session_state.get("frontier_result")
if frontier_result:
    label = st.session_state.get("frontier_label", "Custom")
    summary = {
        "Fingerprint": label,
        "Number of invariants": len(frontier_result.invariant_names),
        "Exhaustive through": f"n = {frontier_result.frontier}" if frontier_result.frontier is not None else "Not established",
        "First collision": f"n = {frontier_result.first_collision_order}" if frontier_result.first_collision_order else "Not yet found",
        "Minimality established": "Yes" if frontier_result.minimality_established else "No",
        "Status": "Collision found" if frontier_result.first_collision_order else "Collision-free in searched domain",
    }
    st.dataframe([summary], width="stretch", hide_index=True)
    if frontier_result.first_collision_order:
        st.error(f"First verified collision at n = {frontier_result.first_collision_order}")
        left, right = st.columns(2)
        with left:
            render_graph_svg(frontier_result.graph_a, 901, f"Frontier graph A, {frontier_result.first_collision_order} vertices")
            graph_data(frontier_result.graph_a, "frontier_graph6_a")
        with right:
            render_graph_svg(frontier_result.graph_b, 902, f"Frontier graph B, {frontier_result.first_collision_order} vertices")
            graph_data(frontier_result.graph_b, "frontier_graph6_b")
        st.write(f"Shared exact fingerprint: `{frontier_result.shared_fingerprint}`  \\n+NetworkX isomorphic: `{frontier_result.isomorphic}`  \\n+Minimality established: `{'Yes' if frontier_result.minimality_established else 'No'}`")
    else:
        st.info(f"Collision-free through n = {frontier_result.frontier} in this finite exhaustive search.")

with st.expander("What is the math behind this?"):
    st.latex(r"F_S(G) = (f_1(G), f_2(G), \dots, f_k(G))")
    st.markdown("For your selected invariant set **S**, the app groups graphs by the same fingerprint. A twin pair is a collision where `F_S(G) = F_S(H)` but `G` and `H` are not isomorphic.")
