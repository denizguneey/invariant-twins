import { useEffect, useState } from "react";
import { tr as t } from "./i18n/tr";
import "./RivalComparison.css";

type GraphInput = { nodes: { id: string }[]; edges: { source: string; target: string }[]; invariants: string[] };
type Item = { id: string; userValue: string; rivalValue: string; equal: boolean };
type Comparison = { isomorphic: false; selectedFingerprint: Item[]; invariants: Item[]; distinguishingInvariantIds: string[]; headlineInvariantId: string | null; noDistinguishingInvariant: boolean };

const nameOf = (id: string) => t.invariant[id as keyof typeof t.invariant] ?? id;

export function RivalComparison({ graph, rival }: { graph: GraphInput; rival: { graph6: string } }) {
  const [data, setData] = useState<Comparison>();
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setData(undefined); setError("");
    fetch("/api/identify/compare-rival", {
      method: "POST", headers: { "Content-Type": "application/json" }, signal: controller.signal,
      body: JSON.stringify({ nodes: graph.nodes.map(node => node.id), edges: graph.edges.map(edge => [edge.source, edge.target]), invariants: graph.invariants, rival_graph6: rival.graph6 }),
    }).then(async response => {
      if (!response.ok) throw new Error((await response.json().catch(() => null))?.detail ?? "Rakip karşılaştırması kullanılamıyor.");
      return response.json() as Promise<Comparison>;
    }).then(setData).catch(reason => { if (reason.name !== "AbortError") setError(reason.message || "Rakip karşılaştırması kullanılamıyor."); });
    return () => controller.abort();
  }, [graph, rival.graph6]);

  if (error) return <article className="card rival-comparison"><h2>Bu rakip neden farklı?</h2><p className="danger">{error}</p></article>;
  if (!data) return <article className="card rival-comparison"><h2>Bu rakip neden farklı?</h2><p className="neutral">Karşılaştırma hazırlanıyor…</p></article>;
  const differing = data.invariants.filter(item => !item.equal);
  const structuralIds = ["triangle_count", "bridge_count", "clique_number", "independence_number", "chromatic_number", "degree_sequence"];
  const technicalIds = ["adjacency_charpoly", "laplacian_charpoly", "signless_laplacian_charpoly", "distance_charpoly", "generalized_charpoly"];
  const structuralDifferences = differing.filter(item => structuralIds.includes(item.id));
  const technicalDifferences = differing.filter(item => technicalIds.includes(item.id));
  const headline = data.headlineInvariantId ? data.invariants.find(item => item.id === data.headlineInvariantId) : undefined;
  return <article className="card rival-comparison" aria-live="polite">
    <h2>Bu rakip neden farklı?</h2>
    <p>Rakip, seçili parmak izi altında aynı değerlere sahiptir ve grafınızla izomorfik değildir.</p>
    <section><h3>Seçili Parmak İzi — Aynı</h3><table><thead><tr><th>İnvariant</th><th>Paylaşılan değer</th></tr></thead><tbody>{data.selectedFingerprint.map(item => <tr key={item.id}><th scope="row">{nameOf(item.id)}</th><td>{item.userValue}</td></tr>)}</tbody></table></section>
    {data.noDistinguishingInvariant ? <section className="rival-no-separator"><h3>İki grafı ayıran invariantlar</h3><p>Mevcut 11 invariant bu iki grafı ayırt edemiyor.</p><p>Graflar izomorfik değildir; mevcut invariant ailesi bu çifti ayırmak için yeterli değildir.</p></section> : <>
      {headline && <p className="rival-explanation">İki graf seçili parmak izi altında aynı görünse de {nameOf(headline.id)} farklıdır: sizin grafınızda {headline.userValue}, rakip grafta {headline.rivalValue}.</p>}
      {structuralDifferences.length > 0 && <section><h3>İki grafı ayıran invariantlar</h3><table><thead><tr><th>İnvariant</th><th>Sizin grafınız</th><th>Rakip graf</th></tr></thead><tbody>{structuralDifferences.map(item => <tr key={item.id}><th scope="row">{nameOf(item.id)}</th><td>{item.userValue}</td><td>{item.rivalValue}</td></tr>)}</tbody></table></section>}
      {technicalDifferences.length > 0 && <details className="rival-technical"><summary>Teknik / spektral farklar</summary><table><thead><tr><th>İnvariant</th><th>Sizin grafınız</th><th>Rakip graf</th></tr></thead><tbody>{technicalDifferences.map(item => <tr key={item.id}><th scope="row">{nameOf(item.id)}</th><td>{item.userValue}</td><td>{item.rivalValue}</td></tr>)}</tbody></table></details>}
    </>}
    <details><summary>Tüm 11 invariantın tam karşılaştırması</summary><table><thead><tr><th>İnvariant</th><th>Sizin grafınız</th><th>Rakip graf</th><th>Durum</th></tr></thead><tbody>{data.invariants.map(item => <tr key={item.id}><th scope="row">{nameOf(item.id)}</th><td>{item.userValue}</td><td>{item.rivalValue}</td><td>{item.equal ? "Aynı" : "Farklı"}</td></tr>)}</tbody></table></details>
  </article>;
}
