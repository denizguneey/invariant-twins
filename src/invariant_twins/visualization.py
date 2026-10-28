"""Compact, deterministic SVG helpers for the Streamlit interface."""

from html import escape

import networkx as nx


SVG_WIDTH = 600
SVG_HEIGHT = 280
SVG_PADDING = 32


def _svg_positions(graph: nx.Graph, seed: int, positions: dict[object, tuple[float, float]] | None = None) -> dict[object, tuple[float, float]]:
    """Scale a seeded NetworkX layout into a compact SVG viewBox."""
    positions = positions or nx.spring_layout(graph, seed=seed)
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


def graph_to_svg(graph: nx.Graph, seed: int = 0, title: str | None = None, *, node_labels: dict[object, str] | None = None, highlighted_edges: set[frozenset[object]] | None = None, positions: dict[object, tuple[float, float]] | None = None, height: int = 280) -> str:
    """Return an accessible inline SVG drawing with no image background or axes."""
    positions = _svg_positions(graph, seed, positions)
    description = title or f"Graph, {graph.number_of_nodes()} vertices, {graph.number_of_edges()} edges"
    title_id = f"graph-title-{seed}"
    highlighted_edges = highlighted_edges or set()
    edges = "".join(
        f'<line class="{"highlight" if frozenset((left, right)) in highlighted_edges else ""}" x1="{positions[left][0]:.1f}" y1="{positions[left][1]:.1f}" '
        f'x2="{positions[right][0]:.1f}" y2="{positions[right][1]:.1f}" />'
        for left, right in graph.edges()
    )
    nodes = "".join(
        f'<g><circle cx="{x:.1f}" cy="{y:.1f}" r="16" />'
        f'<text x="{x:.1f}" y="{y:.1f}" dy=".35em">{escape(node_labels.get(node, str(node)) if node_labels else str(node))}</text></g>'
        for node, (x, y) in positions.items()
    )
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SVG_WIDTH} {SVG_HEIGHT}" '
        f'width="100%" height="{height}" role="img" aria-labelledby="{title_id}">'
        f'<title id="{title_id}">' + escape(description) + '</title>'
        '<style>'
        'line { stroke: #aeb7c4; stroke-width: 1.8; stroke-linecap: round; } '
        'line.highlight { stroke: #f5c542; stroke-width: 5; } '
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
