"""Accessible English Frontier heatmap backed by verified research metadata."""
from __future__ import annotations

import json
from pathlib import Path

import streamlit as st

from .ui_content import preset_label

COUNTS = [1, 1, 2, 6, 21, 112, 853, 11117, 261080]
_ROOT = Path(__file__).resolve().parents[2]


def verified_rows() -> list[dict[str, object]]:
    """Load the single canonical verified-result source for the heatmap."""
    records = json.loads((_ROOT / "research" / "index.json").read_text(encoding="utf-8"))["experiments"]
    by_preset = {record["preset"]: record for record in records}
    return [
        {**by_preset["F1"], "label": preset_label("F1")},
        {**by_preset["F2"], "label": preset_label("F2")},
        {**by_preset["F3"], "label": preset_label("F3")},
        {"preset": "F4–F9", "label": "A/L/Q combinations (F4–F9, six presets)", "frontier": by_preset["F4"]["frontier"], "first_collision_order": by_preset["F4"]["first_collision_order"]},
        {**by_preset["F10"], "label": preset_label("F10")},
        {**by_preset["FG"], "label": preset_label("FG")},
    ]


def _message(record: dict[str, object], order: int) -> str:
    count = f"{COUNTS[order - 1]:,}"
    frontier, collision = int(record["frontier"]), record["first_collision_order"]
    if order <= frontier:
        return f"✅ collision-free: all {count} connected graphs have unique fingerprints."
    if order == collision:
        if record["preset"] == "F3":
            return "❌ first collision: non-isomorphic witnesses G?AFBo and G?B@`w share the fingerprint."
        if record["preset"] == "F4–F9":
            return "❌ first collision: all 261,080 graphs were examined; every preset has a verified non-isomorphic collision."
        return "❌ first collision: non-isomorphic graphs share the fingerprint."
    return "➖ not reported: after the first collision or outside the reported finite domain."


def render() -> None:
    """Render selectable status cells without relying on color alone."""
    st.subheader("frontier heatmap")
    st.caption("Fingerprint frontier: the largest graph order exhaustively verified collision-free before the first non-isomorphic fingerprint collision.")
    with st.expander("How to read this map"):
        st.markdown("- Each row is a graph fingerprint.\n- Each column is graph order n.\n- ✅ means all graphs at that order were distinguished.\n- ❌ marks the first fingerprint collision.\n- ➖ means not reported in this study.")
    st.caption("Select a cell to see the finite-search explanation.")
    header = st.columns([3] + [1] * 9 + [1])
    header[0].markdown("**preset**")
    for index, count in enumerate(COUNTS, 1):
        header[index].markdown(f"**n={index}**  \n{count:,}")
    header[-1].markdown("**frontier**")
    for row_index, record in enumerate(verified_rows()):
        cells = st.columns([3] + [1] * 9 + [1])
        cells[0].write(record["label"])
        for order in range(1, 10):
            icon = "✅" if order <= record["frontier"] else ("❌" if order == record["first_collision_order"] else "➖")
            if cells[order].button(icon, key=f"frontier_{row_index}_{order}", help=_message(record, order)):
                st.session_state.frontier_cell = (record, order)
        cells[-1].write(str(record["frontier"]) if record["first_collision_order"] else f"≥{record['frontier']}")
    if selected := st.session_state.get("frontier_cell"):
        st.info(_message(*selected))
    st.caption("legend: ✅ collision-free · ❌ first collision · ➖ not reported. findings apply only within the enumerated graph bound.")
