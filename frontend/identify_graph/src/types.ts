export type Node = { id: string; x: number; y: number };
export type Edge = { source: string; target: string };
export type GraphState = { nodes: Node[]; edges: Edge[]; selectedInvariants: string[]; revision?: number };
export type Bridge = { data: { state: GraphState; analysis: Analysis }; setStateValue: (name: string, value: unknown) => void; setTriggerValue: (name: string, value: unknown) => void; parentElement: HTMLElement };
export type Analysis = Record<string, any>;
