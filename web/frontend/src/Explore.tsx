import { useEffect, useState } from "react";
import { tr as t } from "./i18n/tr";

type Node = { id: string | number; x?: number; y?: number };
type Edge = { source: string | number; target: string | number };
type Graph = { name: "G" | "H"; graph6: string; order: number; size: number; nodes: Node[]; edges: Edge[]; values: Record<string, string> };
type SearchResult = { collisionFound: boolean; finiteDomain: { maxOrder: number }; graphs: Graph[]; separating: null | { id: string; g: string; h: string } };
type MinimumResult = { sets: string[][]; status?: "ready" | "unavailable"; message?: string };

const options = ["Edges", "Degree sequence", "Triangle count", "Clique number", "Bridge count", "Independence number", "Adjacency spectrum"] as const;
const api = async (path: string, body: unknown) => {
  const response = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!response.ok) throw new Error("request");
  return response.json();
};
const nameOf = (id: string) => t.twins.invariantNames[id as keyof typeof t.twins.invariantNames] ?? t.invariant[id as keyof typeof t.invariant] ?? id;

function TwinMini({ graph, label }: { graph: Graph; label: string }) {
  const raw = graph.nodes.map((node, index) => ({ id: String(node.id), x: Number.isFinite(node.x) ? Number(node.x) : 40 + (index % 4) * 52, y: Number.isFinite(node.y) ? Number(node.y) : 42 + Math.floor(index / 4) * 52 }));
  const minX = Math.min(...raw.map(node => node.x), 0), maxX = Math.max(...raw.map(node => node.x), 1);
  const minY = Math.min(...raw.map(node => node.y), 0), maxY = Math.max(...raw.map(node => node.y), 1);
  const positions = new Map(raw.map(node => [node.id, { x: 28 + ((node.x - minX) / Math.max(1, maxX - minX)) * 224, y: 28 + ((node.y - minY) / Math.max(1, maxY - minY)) * 164 }]));
  return <svg className="twin-mini" viewBox="0 0 280 220" aria-label={label}>
    {graph.edges.map((edge, index) => { const a = positions.get(String(edge.source)), b = positions.get(String(edge.target)); return a && b ? <line className="mini-edge" key={`${edge.source}-${edge.target}-${index}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} /> : null; })}
    {raw.map((node, index) => { const point = positions.get(node.id)!; return <g key={node.id}><circle cx={point.x} cy={point.y} r="12" /><text x={point.x} y={point.y + 5}>{index + 1}</text></g>; })}
  </svg>;
}

function GraphCard({ graph, copied, onCopy }: { graph: Graph; copied: boolean; onCopy: (value: string) => void }) {
  return <article className="card twin-graph-card">
    <h2>{t.twins.graph} {graph.name}</h2>
    <TwinMini graph={graph} label={`${t.twins.graph} ${graph.name}`} />
    <div className="twin-meta"><span>n = {graph.order}</span><span>m = {graph.size}</span></div>
    <div className="graph6-row"><span>{t.twins.graph6}</span><button onClick={() => onCopy(graph.graph6)}>{copied ? t.twins.copied : t.twins.copy}</button></div>
    <code>{graph.graph6}</code>
  </article>;
}

export function Explore() {
  const [maxOrder, setMaxOrder] = useState(8);
  const [selected, setSelected] = useState<string[]>(["Edges", "Degree sequence"]);
  const [result, setResult] = useState<SearchResult>();
  const [loading, setLoading] = useState(false);
  const [minimum, setMinimum] = useState<string[][]>();
  const [minimumMessage, setMinimumMessage] = useState<string>();
  const [minimumLoading, setMinimumLoading] = useState(false);
  const [copied, setCopied] = useState<string>();
  const [error, setError] = useState(false);
  const query = () => ({ max_order: maxOrder, invariants: selected });
  const search = async () => {
    setLoading(true); setError(false); setMinimum(undefined); setMinimumMessage(undefined);
    try { setResult(await api("/api/twins/search", query()) as SearchResult); } catch { setError(true); } finally { setLoading(false); }
  };
  useEffect(() => { void search(); }, []);
  const toggle = (id: string) => setSelected(current => current.includes(id) ? current.filter(value => value !== id) : [...current, id]);
  const copy = async (value: string, key: string) => { try { await navigator.clipboard.writeText(value); setCopied(key); window.setTimeout(() => setCopied(current => current === key ? undefined : current), 1400); } catch { /* Clipboard availability is browser-controlled. */ } };
  const calculateMinimum = async () => { if (maxOrder === 8) { setMinimumMessage("Minimum ayırıcı invariant kümesi n=8 için henüz etkinleştirilmedi."); return; } setMinimumLoading(true); try { setMinimum((await api("/api/twins/minimum-separating", query()) as MinimumResult).sets); } finally { setMinimumLoading(false); } };
  const graphs = result?.graphs ?? [], g = graphs[0], h = graphs[1];

  return <main className="twins-page">
    <div className="hero"><h1>{t.nav.explore}</h1><p>Aynı parmak izini paylaşan izomorfik olmayan graf çiftlerini sonlu bir arama alanında inceleyin.</p></div>
    <section className="card twin-selection">
      <div className="heading"><h2>{t.twins.selection}</h2><strong>n ≤ {maxOrder}</strong></div>
      <label className="order-control"><span>{t.twins.maximumOrder}</span><input aria-label={t.twins.maximumOrder} type="range" min="3" max="8" value={maxOrder} onChange={event => setMaxOrder(Number(event.target.value))} /><small>{t.twins.domainHint.replace("{n}", String(maxOrder))}</small></label>
      <h3>{t.twins.invariants}</h3>
      <div className="twin-options">{options.map(id => <label className="twin-option" key={id}><input type="checkbox" checked={selected.includes(id)} onChange={() => toggle(id)} /><span>{nameOf(id)}</span></label>)}</div>
      <button className="primary" disabled={!selected.length || loading} onClick={() => void search()}>{loading ? t.twins.searching : t.twins.search}</button>
    </section>
    {error && <div className="error">Arama sırasında bir hata oluştu.</div>}
    {result && <section className="twin-results">
      <article className={`twin-summary ${result.collisionFound ? "" : "twin-summary-empty"}`}><h2>{result.collisionFound ? t.twins.found : t.twins.none}</h2><p>{result.collisionFound ? t.twins.foundText : t.twins.notUniversal}</p><p><b>{t.twins.searchDomain}:</b> n ≤ {result.finiteDomain.maxOrder} bağlı basit graflar</p><small>{t.twins.finite}</small></article>
      {result.collisionFound && g && h && <>
        <div className="twin-graphs"><GraphCard graph={g} copied={copied === "G"} onCopy={value => void copy(value, "G")} /><GraphCard graph={h} copied={copied === "H"} onCopy={value => void copy(value, "H")} /></div>
        <article className="card twin-comparison"><h2>{t.twins.comparison}</h2><div className="twin-table-wrap"><table><thead><tr><th>{t.twins.property}</th><th>Graf G</th><th>Graf H</th><th>{t.twins.status}</th></tr></thead><tbody>{selected.map(id => <tr key={id}><td>{nameOf(id)}</td><td>{g.values[id] ?? "—"}</td><td>{h.values[id] ?? "—"}</td><td><span className="match-status">{t.twins.matches}</span></td></tr>)}</tbody></table></div></article>
        {result.separating && <article className="card twin-separator"><small>{t.twins.separating}</small><h2>{nameOf(result.separating.id)}</h2><div><b>Graf G: {result.separating.g}</b><b>Graf H: {result.separating.h}</b></div><p>{t.twins.separatorExplanation}</p><p>{t.twins.separatorConsequence}</p></article>}
        <article className="card twin-verification"><h2>{t.twins.verification}</h2><b>{t.twins.notIsomorphic}</b><p>{t.twins.verified}</p></article>
        <article className="card twin-minimum"><h2>{t.twins.minimum}</h2><p>{t.twins.minimumHelp}</p>{maxOrder === 8 ? <p className="neutral">Minimum ayırıcı invariant kümesi n=8 için performans nedeniyle henüz etkinleştirilmedi.</p> : minimumMessage ? <p className="neutral">{minimumMessage}</p> : minimum ? <><b>{t.twins.oneMinimum}</b><div className="twin-chips">{minimum[0]?.map(id => <mark key={id}>{nameOf(id)}</mark>)}</div>{minimum.length > 1 && <details><summary>{t.twins.otherMinimums}</summary>{minimum.slice(1).map((set, index) => <div className="twin-chips" key={index}>{set.map(id => <mark key={id}>{nameOf(id)}</mark>)}</div>)}</details>}</> : <button onClick={() => void calculateMinimum()} disabled={minimumLoading}>{minimumLoading ? t.twins.computing : t.twins.compute}</button>}<small>{t.twins.finite}</small></article>
        {result.separating && <details className="card twin-diagnostics"><summary>{t.twins.diagnostics}</summary><p>{t.twins.diagnosticsHint}</p><dl><dt>{nameOf(result.separating.id)}</dt><dd>G: {result.separating.g} · H: {result.separating.h}</dd></dl></details>}
      </>}
    </section>}
  </main>;
}
