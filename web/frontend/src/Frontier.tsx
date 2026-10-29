import { useEffect, useState } from "react";
import { tr as t } from "./i18n/tr";

type Status = "verified" | "collision" | "unreported";
type Cell = { order: number; graphCount?: number; status: Status };
type Row = { preset: string; invariants: string[]; frontier: number; firstCollisionOrder: number | null; cells: Cell[] };
type Data = { rows: Row[] };
const invariantName = (id: string) => t.invariant[id as keyof typeof t.invariant] ?? id;
const statusText = (status: Status) => status === "verified" ? "Çakışma yok" : status === "collision" ? "İlk çakışma" : "Raporlanmadı";
const symbol = (status: Status) => status === "verified" ? "✓" : status === "collision" ? "×" : "—";
const cellLabel = (cell: Cell) => cell.status === "verified" ? `n=${cell.order} · ${cell.graphCount} bağlı graf · çakışma yok` : cell.status === "collision" ? `n=${cell.order} · ilk doğrulanmış çakışma` : `n=${cell.order} · doğrulanmış kayıt yok`;

export function Frontier() {
  const [data, setData] = useState<Data>();
  const [selected, setSelected] = useState<{ row: Row; cell: Cell }>();
  useEffect(() => { fetch("/api/frontier").then(response => response.json()).then((next: Data) => { setData(next); setSelected({ row: next.rows[0], cell: next.rows[0].cells[0] }); }); }, []);
  if (!data) return <main className="frontier-page"><div className="hero"><h1>{t.nav.frontier}</h1><p>{t.common.loading}</p></div></main>;
  const maximum = Math.max(...data.rows.map(row => row.frontier));
  const earliest = Math.min(...data.rows.flatMap(row => row.firstCollisionOrder === null ? [] : [row.firstCollisionOrder]));
  const orders = data.rows[0]?.cells.map(cell => cell.order) ?? [];
  const detailComment = selected?.cell.status === "verified" ? t.frontier.verifiedComment : selected?.cell.status === "collision" ? t.frontier.collisionComment : t.frontier.unreportedComment;
  return <main className="frontier-page">
    <div className="hero"><h1>{t.nav.frontier}</h1><p>{t.frontier.concept}</p><p>{t.frontier.firstCollision}</p></div>
    <section className="frontier-content">
      <div className="frontier-how"><h2>{t.frontier.how}</h2><div><span className="status-symbol verified">✓</span><p>{t.frontier.verified}</p><span className="status-symbol collision">×</span><p>{t.frontier.collision}</p><span className="status-symbol unreported">—</span><p>{t.frontier.unreported}</p></div><p><b>{t.frontier.frontier}:</b> {t.frontier.frontierHelp}</p></div>
      <div className="frontier-metrics"><article className="card"><small>{t.frontier.presetCount}</small><b>{data.rows.length}</b></article><article className="card"><small>{t.frontier.highest}</small><b>n ≤ {maximum}</b></article><article className="card"><small>{t.frontier.earliest}</small><b>n = {earliest}</b></article></div>
      <article className="card frontier-matrix-card"><div className="frontier-scroll"><table className="frontier-matrix"><thead><tr><th>{t.frontier.fingerprint}</th>{orders.map(order => <th key={order}>n = {order}</th>)}<th>{t.frontier.frontier}</th><th>{t.frontier.first}</th></tr></thead><tbody>{data.rows.map(row => <tr key={row.preset}><th scope="row"><b>{row.invariants.map(invariantName).join(" + ")}</b><small>{row.invariants.map(invariantName).join(" · ")}</small></th>{row.cells.map(cell => <td key={cell.order}><button className={`matrix-cell ${cell.status} ${selected?.row.preset === row.preset && selected.cell.order === cell.order ? "selected" : ""}`} title={cellLabel(cell)} aria-label={cellLabel(cell)} onClick={() => setSelected({ row, cell })}>{symbol(cell.status)}</button></td>)}<td><b>n ≤ {row.frontier}</b></td><td>{row.firstCollisionOrder ? <>n = {row.firstCollisionOrder}</> : "—"}</td></tr>)}</tbody></table></div></article>
      {selected && <article className="card frontier-detail"><h2>{selected.row.invariants.map(invariantName).join(" + ")} · n = {selected.cell.order}</h2><div className={`detail-status ${selected.cell.status}`}><b>{symbol(selected.cell.status)} {statusText(selected.cell.status)}</b></div>{selected.cell.graphCount !== undefined && <section><h3>{t.frontier.graphCount}</h3><p>{selected.cell.graphCount} bağlı basit graf</p></section>}<section><h3>{t.frontier.invariants}</h3><div className="frontier-chips">{selected.row.invariants.map(id => <mark key={id}>{invariantName(id)}</mark>)}</div></section><section><h3>{t.frontier.comment}</h3><p>{detailComment}</p></section>{selected.cell.status === "collision" && <section className="missing-witness"><h3>{t.frontier.witnesses}</h3><p>{t.frontier.missingWitness}</p></section>}</article>}
      <p className="frontier-warning">{t.frontier.finite}</p>
    </section>
  </main>;
}
