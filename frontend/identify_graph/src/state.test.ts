import { describe, expect, it } from "vitest";
import { addEdge, acceptsAnalysis, deleteVertex, nextLabel, validState } from "./state";

const graph = {nodes:[{id:"A",x:1,y:1},{id:"B",x:2,y:2}],edges:[],selectedInvariants:[],revision:10};
describe("editor state", () => {
  it("allocates labels and enforces seven vertices", () => { expect(nextLabel(graph.nodes)).toBe("C"); expect(nextLabel([{id:"A",x:0,y:0},{id:"C",x:0,y:0}])).toBe("B"); expect(nextLabel(Array.from({length:7},(_,i)=>({id:"ABCDEFG"[i],x:i,y:i})))).toBeNull(); });
  it("rejects self-loops and duplicate undirected edges", () => { const once=addEdge(graph,"A","B"); expect(addEdge(once,"A","A")).toBe(once); expect(addEdge(once,"B","A")).toBe(once); });
  it("removes incident edges", () => { const withEdge=addEdge(graph,"A","B"); expect(deleteVertex(withEdge,"A").edges).toEqual([]); });
  it("accepts only current analysis revision", () => { expect(acceptsAnalysis(graph,{revision:10})).toBe(true); expect(acceptsAnalysis({...graph,revision:11},{revision:10})).toBe(false); });
  it("fuzzes 100 deterministic valid editor sequences", () => { for(let seed=0;seed<100;seed++){ let state={...graph,nodes:[],edges:[],revision:0}; let value=seed+1; for(let step=0;step<30;step++){ value=(value*1664525+1013904223)>>>0; if(value%3===0&&state.nodes.length<7){const id=nextLabel(state.nodes)!;state={...state,nodes:[...state.nodes,{id,x:value%600,y:(value>>>8)%360}],revision:state.revision+1};} else if(value%3===1&&state.nodes.length>1){state=addEdge(state,state.nodes[0].id,state.nodes[state.nodes.length-1].id)} else if(state.nodes.length>0){state=deleteVertex(state,state.nodes[value%state.nodes.length].id)} expect(validState(state),`seed ${seed} step ${step}`).toBe(true); } } });
});
