import { useEffect, useState } from "react";
import "./DiscriminationPower.css";
import "./DiscriminationPowerPolish.css";
import { tr as t } from "./i18n/tr";

export type PowerRow = {
  order: number; domainSize: number; fingerprintClassCount: number;
  singletonClassCount: number; uniqueGraphCount: number; collisionClassCount: number;
  largestCollisionClassSize: number; indistinguishablePairCount: number; totalPairCount: number;
  uniqueIdentificationRate: number; pairSeparationRate: number;
};
type PowerResponse = { selectedInvariants: string[]; orders: PowerRow[] };

export const invariantIds = [
  "degree_sequence", "triangle_count", "bridge_count", "clique_number",
  "independence_number", "chromatic_number", "adjacency_charpoly",
  "laplacian_charpoly", "signless_laplacian_charpoly", "distance_charpoly",
  "generalized_charpoly",
] as const;

const number = new Intl.NumberFormat("tr-TR");
export const percent = (value: number) => new Intl.NumberFormat("tr-TR", {
  minimumFractionDigits: 2, maximumFractionDigits: 2,
}).format(value * 100) + "%";
const nameOf = (id: string) => t.invariant[id as keyof typeof t.invariant] ?? id;

function Chart({ rows, metric, title }: { rows: PowerRow[]; metric: "uniqueIdentificationRate" | "pairSeparationRate"; title: string }) {
  const points = rows.map((row, index) => `${34 + index * 62},${112 - row[metric] * 88}`).join(" ");
  return <figure className="power-chart">
    <figcaption>{title}</figcaption>
    <svg viewBox="0 0 300 138" role="img" aria-label={title}>
      <line x1="34" y1="112" x2="282" y2="112" className="power-axis" />
      <line x1="34" y1="24" x2="34" y2="112" className="power-axis" />
      <text x="4" y="29">100%</text><text x="10" y="116">0%</text>
      <polyline points={points} className="power-line" />
      {rows.map((row, index) => <g key={row.order}>
        <title>{`n=${row.order}: ${percent(row[metric])}`}</title>
        <circle cx={34 + index * 62} cy={112 - row[metric] * 88} r="4" className="power-point" />
        <text className="power-value" x={34 + index * 62} y={Math.max(17, 105 - row[metric] * 88)} textAnchor="middle">{percent(row[metric])}</text>
        <text x={34 + index * 62} y="130" textAnchor="middle">n={row.order}</text>
      </g>)}
    </svg>
  </figure>;
}

export function DiscriminationPower() {
  const [selected, setSelected] = useState<string[]>(["degree_sequence"]);
  const [response, setResponse] = useState<PowerResponse>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError(undefined);
    fetch("/api/discrimination-power", {
      method: "POST", headers: { "Content-Type": "application/json" }, signal: controller.signal,
      body: JSON.stringify({ invariants: selected }),
    }).then(async result => {
      if (!result.ok) throw new Error((await result.json().catch(() => null))?.detail ?? "Hesaplama kullanılamıyor.");
      return result.json() as Promise<PowerResponse>;
    }).then(setResponse).catch(reason => {
      if (reason.name !== "AbortError") setError(reason.message || "Hesaplama kullanılamıyor.");
    }).finally(() => setLoading(false));
    return () => controller.abort();
  }, [selected]);

  const toggle = (id: string) => setSelected(current =>
    current.includes(id) ? (current.length === 1 ? current : current.filter(value => value !== id)) : [...current, id]);
  const rows = response?.orders ?? [];
  const n8 = rows.find(row => row.order === 8);

  return <article className="card power" aria-labelledby="power-title">
    <div className="power-heading"><div><h2 id="power-title">Ayırt Etme Gücü</h2><p>Seçilen parmak izinin, bağlı ve izomorfik olmayan grafları ne ölçüde ayırdığını tam sonlu evrenlerde ölçer.</p></div><button type="button" onClick={() => setSelected([...invariantIds])}>Tümünü seç</button></div>
    <div className="twin-options power-options" aria-label="İnvariant seçimi">
      {invariantIds.map(id => <label className="twin-option" key={id}><input type="checkbox" checked={selected.includes(id)} onChange={() => toggle(id)} /><span>{nameOf(id)}</span></label>)}
    </div>
    <p className="power-selection"><b>Seçili:</b> {selected.map(nameOf).join(" + ")}</p>
    {loading && <p className="power-state" role="status">Hesaplanıyor…</p>}
    {error && <p className="power-state error" role="alert">{error} N=8 indeksi kullanılabilir olduğunda yeniden deneyin.</p>}
    {!loading && !error && n8 && <>
      <div className="power-summary"><b>n=8 özeti</b><p>{number.format(n8.uniqueGraphCount)} / {number.format(n8.domainSize)} graf benzersiz tanımlanır; {number.format(n8.indistinguishablePairCount)} ayırt edilemeyen graf çifti kalır.</p></div>
      <div className="power-charts"><Chart rows={rows} metric="uniqueIdentificationRate" title="Benzersiz tanımlama oranı" /><Chart rows={rows} metric="pairSeparationRate" title="Graf çifti ayırma oranı" /></div>
      <div className="power-table-wrap"><table className="power-table"><caption>Seçili parmak izi için tam ayrım ölçümleri</caption><thead><tr><th>n</th><th>Evren</th><th>Parmak izi sınıfı</th><th>Benzersiz graf</th><th>Çakışma sınıfı</th><th>En büyük çakışma</th><th>Ayırt edilemeyen çift</th><th>Tüm çiftler</th><th>Benzersiz tanımlama</th><th>Çift ayırma</th></tr></thead><tbody>{rows.map(row => <tr key={row.order}><th scope="row">{row.order}</th><td>{number.format(row.domainSize)}</td><td>{number.format(row.fingerprintClassCount)}</td><td>{number.format(row.uniqueGraphCount)}</td><td>{number.format(row.collisionClassCount)}</td><td>{number.format(row.largestCollisionClassSize)}</td><td>{number.format(row.indistinguishablePairCount)}</td><td>{number.format(row.totalPairCount)}</td><td>{percent(row.uniqueIdentificationRate)}</td><td>{percent(row.pairSeparationRate)}</td></tr>)}</tbody></table></div>
    </>}
  </article>;
}
