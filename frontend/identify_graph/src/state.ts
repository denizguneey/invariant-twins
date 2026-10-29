import type { Edge, GraphState, Node } from "./types";

export const MAX_VERTICES = 7;
export const labels = "ABCDEFG";
export const nextLabel = (nodes: Node[]) => labels.split("").find(label => !nodes.some(node => node.id === label)) ?? null;
export const edgeKey = (edge: Edge) => [edge.source, edge.target].sort().join("-");
export function canAddEdge(state: GraphState, source: string, target: string): boolean {
  return source !== target && state.nodes.some(n => n.id === source) && state.nodes.some(n => n.id === target) && !state.edges.some(edge => edgeKey(edge) === edgeKey({source, target}));
}
export function addEdge(state: GraphState, source: string, target: string): GraphState {
  return canAddEdge(state, source, target) ? {...state, edges: [...state.edges, {source, target}]} : state;
}
export function deleteVertex(state: GraphState, id: string): GraphState {
  return {...state, nodes: state.nodes.filter(node => node.id !== id), edges: state.edges.filter(edge => edge.source !== id && edge.target !== id)};
}
export function validState(state: GraphState): boolean {
  const ids = new Set(state.nodes.map(node => node.id));
  return state.nodes.length <= MAX_VERTICES && ids.size === state.nodes.length && state.nodes.every(n => Number.isFinite(n.x) && Number.isFinite(n.y)) && state.edges.every(edge => edge.source !== edge.target && ids.has(edge.source) && ids.has(edge.target)) && new Set(state.edges.map(edgeKey)).size === state.edges.length;
}
export const acceptsAnalysis = (state: GraphState, analysis: {revision?: number}) => (state.revision ?? 0) === analysis.revision;
