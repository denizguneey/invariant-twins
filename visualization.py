"""Compact, deterministic SVG helpers for the Streamlit interface."""

from html import escape

import networkx as nx


SVG_WIDTH = 600
SVG_HEIGHT = 280
SVG_PADDING = 32


def _svg_positions(graph: nx.Graph, seed: int) -> dict[object, tuple[float, float]]:
    """Scale a seeded NetworkX layout into a compact SVG viewBox."""
    positions = nx.spring_layout(graph, seed=seed)
    if len(positions) == 1:
        node = next(iter(positions))
        return {node: (SVG_WIDTH / 2, SVG_HEIGHT / 2)}

    x_values = [position[0] for position in positions.values()]
    y_values = [position[1] for position in positions.values()]
    x_range = max(x_values) - min(x_values) or 1.0
    y_range = max(y_values) - min(y_values) or 1.0
    scale = min((SVG_WIDTH - 2 * SVG_PADDING) / x_range, (SVG_HEIGHT - 2 * SVG_PADDING) / y_range)
    x_offset = (SVG_WIDTH - scale * x_range) / 2 - scale * min(x_values)
    y_offset = (SVG_HEIGHT - scale * y_range) / 2 + scale * max(y_values)
    return {node: (x_offset + scale * x, y_offset - scale * y) for node, (x, y) in positions.items()}


def graph_to_svg(graph: nx.Graph, seed: int = 0, title: str | None = None) -> str:
    """Return an accessible inline SVG drawing with no image background or axes."""
    positions = _svg_positions(graph, seed)
    description = title or f"Graph, {graph.number_of_nodes()} vertices, {graph.number_of_edges()} edges"
    title_id = f"graph-title-{seed}"
    edges = "".join(
        f'<line x1="{positions[left][0]:.1f}" y1="{positions[left][1]:.1f}" '
        f'x2="{positions[right][0]:.1f}" y2="{positions[right][1]:.1f}" />'
        for left, right in graph.edges()
    )
    nodes = "".join(
        f'<g><circle cx="{x:.1f}" cy="{y:.1f}" r="16" />'
        f'<text x="{x:.1f}" y="{y:.1f}" dy=".35em">{escape(str(node))}</text></g>'
        for node, (x, y) in positions.items()
    )
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SVG_WIDTH} {SVG_HEIGHT}" '
        f'width="100%" height="280" role="img" aria-labelledby="{title_id}">'
        f'<title id="{title_id}">' + escape(description) + '</title>'
        '<style>'
        'line { stroke: #8b95a5; stroke-width: 1.4; stroke-linecap: round; } '
        'circle { fill: #4776a8; stroke: #b9d4ef; stroke-width: 1.2; } '
        'text { fill: #ffffff; font: 600 13px system-ui, sans-serif; text-anchor: middle; pointer-events: none; }'
        '</style>'
        f'{edges}{nodes}</svg>'
    )


def display_value(value: object) -> str:
    """Format long tuple values without making comparison tables unwieldy."""
    if isinstance(value, tuple) and len(value) > 7:
        return "(" + ", ".join(map(str, value[:7])) + ", …)"
    return str(value)
