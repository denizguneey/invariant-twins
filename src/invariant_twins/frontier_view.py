"""Doğrulanmış frontier özetini Türkçe, erişilebilir ısı haritası olarak sunar."""
import streamlit as st

COUNTS = [1, 1, 2, 6, 21, 112, 853, 11117, 261080]
ROWS = [
    ("F1 · derece dizisi", 4, 5), ("F2 · A spektrumu", 5, 6),
    ("F3 · derece + A", 7, 8), ("F4–F9 · ortak frontier sonucu (6 ayrı preset)", 8, 9),
    ("F10 · derece + A + L + Q + mesafe", 7, None),
]
def _message(label: str, order: int, frontier: int, collision: int | None) -> str:
    count = f"{COUNTS[order-1]:,}"
    if order <= frontier: return f"✅ collision-free: all {count} connected graphs have unique fingerprints."
    if order == collision:
        extra = " witnesses are G?AFBo and G?B@`w." if label.startswith("F3") else (" all 261,080 graphs were examined." if label.startswith("F4") else "")
        return "❌ first collision: two non-isomorphic graphs share the same fingerprint." + extra
    return "➖ not reported: after the first collision; not separately reported in this study."
def render() -> None:
    st.subheader("frontier heatmap")
    st.caption("select a cell to view its explanation.")
    header = st.columns([3] + [1]*9 + [1])
    header[0].markdown("**preset**")
    for index, count in enumerate(COUNTS, 1): header[index].markdown(f"**n={index}**  \n{count:,}")
    header[-1].markdown("**frontier**")
    for row_index, (label, frontier, collision) in enumerate(ROWS):
        cells = st.columns([3] + [1]*9 + [1])
        cells[0].write(label)
        for order in range(1, 10):
            icon = "✅" if order <= frontier else ("❌" if order == collision else "➖")
            if cells[order].button(icon, key=f"frontier_{row_index}_{order}", help=_message(label, order, frontier, collision)):
                st.session_state.frontier_cell = (label, order, frontier, collision)
        cells[-1].write(f"{frontier}" if collision else f"≥{frontier}")
    if selected := st.session_state.get("frontier_cell"):
        st.info(_message(*selected))
    st.caption("legend: ✅ collision-free · ❌ first collision · ➖ not reported. findings apply only within the enumerated graph bound.")
