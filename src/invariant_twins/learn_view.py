"""Lightweight educational view, kept separate from research calculations."""

import streamlit as st

from .ui_content import LEARN_SECTIONS


def render() -> None:
    """Render short collapsed explanations for first-time visitors."""
    st.subheader("Learn")
    st.caption("A short guide to the ideas behind the experiments.")
    for heading, text in LEARN_SECTIONS:
        with st.expander(heading):
            st.write(text)
    st.markdown("**Fingerprint Frontier** is the largest graph order exhaustively verified collision-free before the first non-isomorphic fingerprint collision.")
    st.markdown("For deeper mathematics, see [the background notes](docs/background.md).")
