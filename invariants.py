"""Exact and display-oriented graph invariants for finite graph experiments."""

import networkx as nx
import numpy as np
from dataclasses import dataclass
from fractions import Fraction
from functools import lru_cache
from typing import Callable


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


@dataclass(frozen=True)
class InvariantDefinition:
    """Metadata and exact computation for one reusable graph invariant."""

    id: str
    display_name: str
    exact: bool
    cost_class: str
    requires_connected: bool
    compute: Callable[[nx.Graph], object]


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


def _matrix_key(graph: nx.Graph, kind: str) -> tuple[tuple[int, ...], ...]:
    """Return a canonical integer matrix for an exact spectral invariant."""
    nodes = sorted(graph.nodes())
    order = len(nodes)
    adjacency = [[int(graph.has_edge(nodes[row], nodes[column])) for column in range(order)] for row in range(order)]
    if kind == "adjacency":
        return tuple(tuple(row) for row in adjacency)
    degrees = [sum(row) for row in adjacency]
    if kind == "laplacian":
        return tuple(tuple((degrees[row] if row == column else 0) - adjacency[row][column] for column in range(order)) for row in range(order))
    if kind == "signless_laplacian":
        return tuple(tuple((degrees[row] if row == column else 0) + adjacency[row][column] for column in range(order)) for row in range(order))
    if kind == "distance":
        if order and not nx.is_connected(graph):
            raise nx.NetworkXError("distance characteristic polynomial requires a connected graph")
        distances = dict(nx.all_pairs_shortest_path_length(graph))
        return tuple(tuple(int(distances[nodes[row]][nodes[column]]) for column in range(order)) for row in range(order))
    raise ValueError(f"unknown matrix kind: {kind}")


@lru_cache(maxsize=200_000)
def _characteristic_polynomial(matrix_key: tuple[tuple[int, ...], ...]) -> tuple[int, ...]:
    """Return det(lambda I - M) with exact Faddeev--LeVerrier arithmetic."""
    order = len(matrix_key)
    matrix = [list(row) for row in matrix_key]
    identity = [[int(row == column) for column in range(order)] for row in range(order)]
    previous = identity
    coefficients = [1]
    for degree in range(1, order + 1):
        product = [[sum(matrix[row][index] * previous[index][column] for index in range(order)) for column in range(order)] for row in range(order)]
        coefficient = -sum(product[index][index] for index in range(order)) // degree
        coefficients.append(coefficient)
        previous = [[product[row][column] + coefficient * identity[row][column] for column in range(order)] for row in range(order)]
    return tuple(coefficients)


def adjacency_characteristic_polynomial(graph: nx.Graph) -> tuple[int, ...]:
    """Return exact coefficients of det(lambda I - A), highest degree first."""
    return _characteristic_polynomial(_matrix_key(graph, "adjacency"))


def laplacian_characteristic_polynomial(graph: nx.Graph) -> tuple[int, ...]:
    """Return exact coefficients of det(lambda I - (D - A))."""
    return _characteristic_polynomial(_matrix_key(graph, "laplacian"))


def signless_laplacian_characteristic_polynomial(graph: nx.Graph) -> tuple[int, ...]:
    """Return exact coefficients of det(lambda I - (D + A))."""
    return _characteristic_polynomial(_matrix_key(graph, "signless_laplacian"))


def distance_characteristic_polynomial(graph: nx.Graph) -> tuple[int, ...]:
    """Return exact coefficients of the connected graph distance matrix."""
    return _characteristic_polynomial(_matrix_key(graph, "distance"))


def _interpolate_integer_polynomial(values: tuple[int, ...]) -> tuple[int, ...]:
    """Interpolate values at 0, 1, ... exactly, returning low-degree first."""
    result = [Fraction(0) for _ in values]
    for point, value in enumerate(values):
        basis = [Fraction(1)]
        denominator = 1
        for other in range(len(values)):
            if other == point:
                continue
            basis = [Fraction(0)] + basis
            for index in range(len(basis) - 1):
                basis[index] -= other * basis[index + 1]
            denominator *= point - other
        for index, coefficient in enumerate(basis):
            result[index] += Fraction(value, denominator) * coefficient
    if any(coefficient.denominator != 1 for coefficient in result):
        raise ArithmeticError("generalized characteristic polynomial interpolation was not integral")
    return tuple(int(coefficient) for coefficient in result)


@lru_cache(maxsize=20_000)
def _generalized_characteristic_polynomial(adjacency_key: tuple[tuple[int, ...], ...]) -> tuple[tuple[int, int, int], ...]:
    """Compute det(lambda I - A + tD) as exact (lambda power, t power, coefficient) terms."""
    order = len(adjacency_key)
    degrees = tuple(sum(row) for row in adjacency_key)
    # A coefficient of lambda^(n-k) has t-degree at most k.  Interpolating at
    # 0..n is deliberately simple and exact; caching prevents repeat work.
    samples = [
        _characteristic_polynomial(tuple(tuple(adjacency_key[row][column] - (sample * degrees[row] if row == column else 0) for column in range(order)) for row in range(order)))
        for sample in range(order + 1)
    ]
    terms: list[tuple[int, int, int]] = []
    for coefficient_index in range(order + 1):
        coefficients = _interpolate_integer_polynomial(tuple(sample[coefficient_index] for sample in samples))
        lambda_power = order - coefficient_index
        for t_power, coefficient in enumerate(coefficients):
            if coefficient:
                terms.append((lambda_power, t_power, coefficient))
    return tuple(sorted(terms, reverse=True))


def generalized_characteristic_polynomial(graph: nx.Graph) -> tuple[tuple[int, int, int], ...]:
    """Return exact terms of Phi_G(lambda,t)=det(lambda I-A+tD)."""
    return _generalized_characteristic_polynomial(_matrix_key(graph, "adjacency"))


def evaluate_generalized_characteristic_polynomial(
    polynomial: tuple[tuple[int, int, int], ...], t_value: int
) -> tuple[int, ...]:
    """Specialize Phi(lambda,t) at an integer t, highest lambda degree first."""
    order = max((lambda_power for lambda_power, _, _ in polynomial), default=0)
    coefficients = [0] * (order + 1)
    for lambda_power, t_power, coefficient in polynomial:
        coefficients[order - lambda_power] += coefficient * t_value**t_power
    return tuple(coefficients)


def degree_sequence(graph: nx.Graph) -> tuple[int, ...]:
    """Return degrees in a canonical descending tuple."""
    return tuple(sorted((degree for _, degree in graph.degree()), reverse=True))


INVARIANT_REGISTRY: dict[str, InvariantDefinition] = {
    "degree_sequence": InvariantDefinition("degree_sequence", "Degree sequence", True, "low", False, degree_sequence),
    "adjacency_charpoly": InvariantDefinition("adjacency_charpoly", "Exact adjacency spectrum", True, "moderate", False, adjacency_characteristic_polynomial),
    "laplacian_charpoly": InvariantDefinition("laplacian_charpoly", "Exact Laplacian spectrum", True, "moderate", False, laplacian_characteristic_polynomial),
    "signless_laplacian_charpoly": InvariantDefinition("signless_laplacian_charpoly", "Exact signless Laplacian spectrum", True, "moderate", False, signless_laplacian_characteristic_polynomial),
    "distance_charpoly": InvariantDefinition("distance_charpoly", "Exact distance spectrum", True, "expensive", True, distance_characteristic_polynomial),
    "generalized_charpoly": InvariantDefinition("generalized_charpoly", "Generalized characteristic polynomial", True, "expensive", False, generalized_characteristic_polynomial),
    "triangle_count": InvariantDefinition("triangle_count", "Triangle count", True, "low", False, lambda graph: sum(nx.triangles(graph).values()) // 3),
    "clique_number": InvariantDefinition("clique_number", "Clique number", True, "moderate", False, clique_number),
    "independence_number": InvariantDefinition("independence_number", "Independence number", True, "moderate", False, independence_number),
    "chromatic_number": InvariantDefinition("chromatic_number", "Chromatic number", True, "expensive", False, chromatic_number_exact),
    "bridge_count": InvariantDefinition("bridge_count", "Bridge count", True, "low", False, lambda graph: len(list(nx.bridges(graph)))),
}


def compute_invariant(graph: nx.Graph, invariant_id: str) -> object:
    """Compute a registered invariant, enforcing its graph-domain requirement."""
    definition = INVARIANT_REGISTRY[invariant_id]
    if definition.requires_connected and graph.number_of_nodes() and not nx.is_connected(graph):
        raise nx.NetworkXError(f"{definition.display_name} requires a connected graph")
    return definition.compute(graph)


def invariant_values(graph: nx.Graph) -> dict[str, object]:
    """Return values used in the standard twin-analysis UI."""
    degrees = degree_sequence(graph)
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
