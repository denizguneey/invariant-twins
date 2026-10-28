"""Exact and display-oriented graph invariants for the Graph Atlas domain."""

import networkx as nx
import numpy as np


ALL_INVARIANTS = [
    "Edges",
    "Degree sequence",
    "Diameter",
    "Radius",
    "Triangle count",
    "Clique number",
    "Independence number",
    "Chromatic number",
    "Bridge count",
    "Adjacency spectrum",
]


def clique_number(graph: nx.Graph) -> int:
    """Return the exact clique number."""
    return max((len(clique) for clique in nx.find_cliques(graph)), default=0)


def independence_number(graph: nx.Graph) -> int:
    """Return the exact independence number."""
    return clique_number(nx.complement(graph))


def chromatic_number_exact(graph: nx.Graph) -> int:
    """Return the exact chromatic number using backtracking for tiny graphs."""
    if graph.number_of_nodes() == 0:
        return 0
    nodes = sorted(graph.nodes(), key=lambda node: graph.degree(node), reverse=True)

    def can_color_with(colors_available: int) -> bool:
        colors: dict[object, int] = {}

        def backtrack(index: int) -> bool:
            if index == len(nodes):
                return True
            node = nodes[index]
            forbidden = {colors[neighbor] for neighbor in graph.neighbors(node) if neighbor in colors}
            for color in range(colors_available):
                if color not in forbidden:
                    colors[node] = color
                    if backtrack(index + 1):
                        return True
                    del colors[node]
            return False

        return backtrack(0)

    for colors_available in range(max(1, clique_number(graph)), graph.number_of_nodes() + 1):
        if can_color_with(colors_available):
            return colors_available
    return graph.number_of_nodes()


def adjacency_spectrum(graph: nx.Graph) -> tuple[float, ...]:
    """Return rounded numerical eigenvalues for display only."""
    if graph.number_of_nodes() == 0:
        return ()
    matrix = nx.to_numpy_array(graph, nodelist=sorted(graph.nodes()))
    return tuple(float(value) for value in np.round(np.linalg.eigvalsh(matrix), 8))


def adjacency_characteristic_polynomial(graph: nx.Graph) -> tuple[int, ...]:
    """Return exact coefficients of det(lambda I - A), highest degree first.

    Faddeev-LeVerrier computes the coefficients using integer matrix arithmetic,
    avoiding both floating point values and factorial permutation enumeration.
    """
    nodes = sorted(graph.nodes())
    order = len(nodes)
    matrix = [[int(graph.has_edge(nodes[row], nodes[column])) for column in range(order)] for row in range(order)]
    identity = [[int(row == column) for column in range(order)] for row in range(order)]
    previous = identity
    coefficients = [1]
    for degree in range(1, order + 1):
        product = [[sum(matrix[row][index] * previous[index][column] for index in range(order)) for column in range(order)] for row in range(order)]
        coefficient = -sum(product[index][index] for index in range(order)) // degree
        coefficients.append(coefficient)
        previous = [[product[row][column] + coefficient * identity[row][column] for column in range(order)] for row in range(order)]
    return tuple(coefficients)


def invariant_values(graph: nx.Graph) -> dict[str, object]:
    """Return values used in the standard twin-analysis UI."""
    degrees = tuple(sorted((degree for _, degree in graph.degree()), reverse=True))
    return {
        "Edges": graph.number_of_edges(),
        "Degree sequence": degrees,
        "Diameter": nx.diameter(graph),
        "Radius": nx.radius(graph),
        "Triangle count": sum(nx.triangles(graph).values()) // 3,
        "Clique number": clique_number(graph),
        "Independence number": independence_number(graph),
        "Chromatic number": chromatic_number_exact(graph),
        "Bridge count": len(list(nx.bridges(graph))),
        "Adjacency spectrum": adjacency_spectrum(graph),
    }


def research_invariant_values(graph: nx.Graph) -> dict[str, object]:
    """Return invariant values with exact spectrum equality for research search."""
    values = invariant_values(graph)
    values["Adjacency spectrum"] = adjacency_characteristic_polynomial(graph)
    return values
