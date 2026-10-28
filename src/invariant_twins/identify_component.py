"""Components v2 adapter for the interactive Identify My Graph workspace.

The browser owns only labels and drawing coordinates.  This module converts that
state into a simple NetworkX graph and delegates every finite-domain result to
the existing exact identification functions.
"""

from __future__ import annotations

import json
from functools import lru_cache
from pathlib import Path
from typing import Any, Iterable

import networkx as nx
import streamlit as st
from streamlit.components.v2 import component

from .graph_sources import iter_atlas_connected_graphs
from .identification import candidate_class, graph_fingerprint, minimum_identifying_sets, rank_next_invariants, supported_graph
from .invariants import INVARIANT_REGISTRY, compute_invariant, degree_sequence

MAX_VERTICES = 7
DEFAULT_INVARIANTS = ["degree_sequence", "diameter", "triangle_count"]
_ASSET_DIR = Path(__file__).with_name("identify_frontend")


def example_state() -> dict[str, Any]:
    """Return the fixed five-vertex example used by the editor."""
    return {
        "nodes": [
            {"id": "A", "x": 180, "y": 100}, {"id": "B", "x": 390, "y": 100},
            {"id": "C", "x": 390, "y": 245}, {"id": "D", "x": 180, "y": 245},
            {"id": "E", "x": 505, "y": 180},
        ],
        "edges": [
            {"source": "A", "target": "B"}, {"source": "B", "target": "C"},
            {"source": "C", "target": "D"}, {"source": "D", "target": "A"},
            {"source": "C", "target": "E"},
        ],
        "selectedInvariants": list(DEFAULT_INVARIANTS),
    }


def empty_state() -> dict[str, Any]:
    return {"nodes": [], "edges": [], "selectedInvariants": list(DEFAULT_INVARIANTS)}


def normalize_state(value: Any) -> dict[str, Any]:
    """Validate component state without treating presentation coordinates as identity."""
    raw = value if isinstance(value, dict) else {}
    nodes: list[dict[str, Any]] = []
    seen: set[str] = set()
    for item in raw.get("nodes", []):
        if not isinstance(item, dict) or not isinstance(item.get("id"), str):
            continue
        identifier = item["id"]
        if identifier in seen or len(nodes) >= MAX_VERTICES:
            continue
        seen.add(identifier)
        try:
            x, y = float(item.get("x", 300)), float(item.get("y", 180))
        except (TypeError, ValueError):
            x, y = 300.0, 180.0
        nodes.append({"id": identifier, "x": x, "y": y})
    edges: list[dict[str, str]] = []
    pairs: set[tuple[str, str]] = set()
    for item in raw.get("edges", []):
        if not isinstance(item, dict):
            continue
        source, target = item.get("source"), item.get("target")
        if not isinstance(source, str) or not isinstance(target, str) or source == target or source not in seen or target not in seen:
            continue
        pair = tuple(sorted((source, target)))
        if pair not in pairs:
            pairs.add(pair)
            edges.append({"source": source, "target": target})
    selected = [name for name in raw.get("selectedInvariants", []) if name in INVARIANT_REGISTRY]
    return {"nodes": nodes, "edges": edges, "selectedInvariants": selected}


def graph_from_state(value: Any) -> nx.Graph:
    """Reconstruct the mathematical graph from IDs and edges alone."""
    state = normalize_state(value)
    graph = nx.Graph()
    graph.add_nodes_from(node["id"] for node in state["nodes"])
    graph.add_edges_from((edge["source"], edge["target"]) for edge in state["edges"])
    return graph


def _graph6(graph: nx.Graph) -> str:
    mapping = {node: index for index, node in enumerate(sorted(graph.nodes()))}
    return nx.to_graph6_bytes(nx.relabel_nodes(graph, mapping), header=False).decode().strip()


def _positioned_graph(graph: nx.Graph) -> dict[str, Any]:
    ordered = sorted(graph.nodes())
    positions = nx.spring_layout(graph, seed=17) if len(ordered) > 1 else ({ordered[0]: (0.5, 0.5)} if ordered else {})
    def point(node: Any) -> dict[str, Any]:
        x, y = positions[node]
        return {"id": str(node), "x": 25 + 170 * (float(x) + 1) / 2, "y": 16 + 88 * (1 - (float(y) + 1) / 2)}
    return {"nodes": [point(node) for node in ordered], "edges": [{"source": str(a), "target": str(b)} for a, b in graph.edges()]}


@st.cache_data(show_spinner=False)
def _domain(order: int) -> list[nx.Graph]:
    return list(iter_atlas_connected_graphs(order))


def _display(value: object) -> str:
    return json.dumps(value) if isinstance(value, (tuple, list)) else str(value)


def analyze_state(value: Any, minimum: list[tuple[str, ...]] | None = None) -> dict[str, Any]:
    """Return serializable presentation data; exact calculations remain in Python."""
    state = normalize_state(value)
    graph = graph_from_state(state)
    invariant_rows = []
    if graph.number_of_nodes() and nx.is_connected(graph):
        invariant_rows = [{"id": key, "name": definition.display_name, "value": _display(compute_invariant(graph, key))} for key, definition in INVARIANT_REGISTRY.items()]
    base: dict[str, Any] = {
        "order": graph.number_of_nodes(), "size": graph.number_of_edges(), "invariants": invariant_rows,
        "ready": False, "count": 0, "rivalCount": 0, "matchingClassSize": 0,
        "domainSize": 0, "candidates": [], "minimum": minimum or [], "minimumComputed": minimum is not None,
    }
    if graph.number_of_nodes() == 0:
        return base | {"message": "Add at least one vertex to begin identification."}
    if not nx.is_connected(graph):
        return base | {"message": "Connect all vertices to begin identification."}
    if not supported_graph(graph):
        return base | {"message": "Use a connected simple graph with at most 7 vertices for this finite comparison domain."}
    selected = state["selectedInvariants"]
    domain = _domain(graph.number_of_nodes())
    matching_class = candidate_class(graph, selected, domain)
    # candidate_class intentionally retains the target's isomorphism class for
    # mathematical search semantics. The UI separately presents only rivals.
    rivals = [candidate for candidate in matching_class if not nx.is_isomorphic(candidate, graph)]
    ranking = rank_next_invariants(graph, matching_class, selected)
    candidate_records = []
    for candidate in rivals[:18]:
        record = _positioned_graph(candidate)
        record.update({"order": candidate.number_of_nodes(), "size": candidate.number_of_edges(), "graph6": _graph6(candidate)})
        candidate_records.append(record)
    best = ({"id": ranking[0][0], "remaining": max(0, ranking[0][2] - 1)} if rivals and ranking else None)
    rival_count = len(rivals)
    possible_rivals = max(0, len(domain) - 1)
    return base | {
        "ready": True, "count": rival_count, "rivalCount": rival_count,
        "matchingClassSize": len(matching_class), "domainSize": len(domain),
        "eliminated": round(100 * (1 - rival_count / possible_rivals)) if possible_rivals else 100,
        "unique": rival_count == 0, "best": best, "candidates": candidate_records,
        "graph6": _graph6(graph), "degreeSequence": _display(degree_sequence(graph)),
        "triangleCount": compute_invariant(graph, "triangle_count"),
        "fingerprint": _display(graph_fingerprint(graph, selected)),
    }


def _apply_event(state: dict[str, Any], event: Any) -> tuple[dict[str, Any], bool]:
    payload = event if isinstance(event, dict) else {}
    kind = payload.get("type")
    if kind == "load_example":
        return example_state(), False
    if kind == "clear_graph":
        return empty_state(), False
    if kind == "apply_recommended_invariant":
        analysis = analyze_state(state)
        best = analysis.get("best")
        if isinstance(best, dict) and best["id"] not in state["selectedInvariants"]:
            state = {**state, "selectedInvariants": [*state["selectedInvariants"], best["id"]]}
        return state, False
    return state, kind == "compute_minimum_identifying_set"


@lru_cache(maxsize=1)
def _identify_workspace():
    """Register the built Vite bundle through the supported Components v2 API."""
    js_path = _ASSET_DIR / "identify-graph.js"
    css_paths = sorted(_ASSET_DIR.glob("*.css"))
    if not js_path.exists() or not css_paths:
        raise RuntimeError("Identify My Graph frontend is missing. Run npm.cmd run build in frontend/identify_graph.")
    return component("identify_my_graph_workspace", html='<div id="root"></div>', css=css_paths[0].read_text(encoding="utf-8"), js=js_path.read_text(encoding="utf-8"))


def render() -> None:
    """Mount the single Components v2 Identify My Graph workspace."""
    if "identify_component_state" not in st.session_state:
        st.session_state.identify_component_state = example_state()
        st.session_state.identify_component_minimum = None
    state = normalize_state(st.session_state.identify_component_state)
    workspace = _identify_workspace()
    result = workspace(
        key="identify_my_graph_workspace",
        data={"state": state, "analysis": analyze_state(state, st.session_state.identify_component_minimum)},
        # Components v2 requires a declared callback for every state key that
        # receives a default. The rerun is supplied by the widget protocol.
        default={"state": state}, on_state_change=lambda: None, height="content",
    )
    received = result.get("state")
    if isinstance(received, dict):
        state = normalize_state(received)
    event = result.get("event")
    state, compute_minimum = _apply_event(state, event)
    if compute_minimum:
        graph = graph_from_state(state)
        st.session_state.identify_component_minimum = minimum_identifying_sets(graph, _domain(graph.number_of_nodes())) if supported_graph(graph) else []
    elif isinstance(event, dict) and event.get("type") in {"graph_changed", "clear_graph", "load_example"}:
        st.session_state.identify_component_minimum = None
    st.session_state.identify_component_state = state
