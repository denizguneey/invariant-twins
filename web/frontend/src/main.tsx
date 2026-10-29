import React,{useEffect,useRef,useState}from"react";import{createRoot}from"react-dom/client";import{BrowserRouter,NavLink,Route,Routes}from"react-router-dom";import{tr as t}from"./i18n/tr";import"./styles.css";
type N={id:string;x:number;y:number};type E={source:string;target:string};type G={nodes:N[];edges:E[];invariants:string[]};const labels="ABCDEFG";
const demo:G={nodes:[{id:"A",x:160,y:95},{id:"B",x:390,y:95},{id:"C",x:390,y:240},{id:"D",x:160,y:240},{id:"E",x:510,y:168}],edges:[["A","B"],["B","C"],["C","D"],["D","A"],["C","E"]].map(([source,target])=>({source,target})),invariants:["degree_sequence"]};
const copy=<T,>(x:T):T=>JSON.parse(JSON.stringify(x));const math=(g:G)=>JSON.stringify({n:g.nodes.map(x=>x.id).sort(),e:g.edges.map(x=>[x.source,x.target].sort()).sort(),i:[...g.invariants].sort()});
const api=async(path:string,body?:unknown)=>{const r=await fetch(path,{method:body?"POST":"GET",headers:body?{"Content-Type":"application/json"}:undefined,body:body?JSON.stringify(body):undefined});if(!r.ok)throw Error();return r.json()};
function Theme(){const[v,setV]=useState(localStorage.getItem("tema")||"system");useEffect(()=>{document.documentElement.dataset.theme=v;localStorage.setItem("tema",v)},[v]);return <label className="theme">{t.theme.label}<select value={v} aria-label={t.theme.label} onChange={e=>setV(e.target.value)}><option value="system">{t.theme.system}</option><option value="light">{t.theme.light}</option><option value="dark">{t.theme.dark}</option></select></label>}
function Header(){const routes:[string,string][]=[["/",t.nav.explore],["/tanimla",t.nav.identify],["/sinir",t.nav.frontier],["/arastirma",t.nav.research]];return <header><NavLink className="brand" to="/">Invariant <b>Twins</b></NavLink><nav>{routes.map(([to,l])=><NavLink key={to} to={to} end={to==="/"}>{l}</NavLink>)}</nav><div className="header-actions"><a href="https://github.com/denizguneey/invariant-twins">GitHub</a><a href="docs/">{t.nav.docs}</a><Theme/></div></header>}
function Mini({g,label}:{g:{nodes:N[];edges:E[]};label:string}){
  const nodeKey=(id:string|number)=>String(id);
  const fallback=(i:number)=>({x:35+(i%4)*50,y:42+Math.floor(i/4)*52});
  const raw=g.nodes.map((n,i)=>({
    id:nodeKey(n.id),
    x:Number.isFinite(n.x)?n.x:fallback(i).x,
    y:Number.isFinite(n.y)?n.y:fallback(i).y,
  }));
  const xs=raw.map(n=>n.x),ys=raw.map(n=>n.y);
  const minX=Math.min(...xs,0),maxX=Math.max(...xs,1),minY=Math.min(...ys,0),maxY=Math.max(...ys,1);
  const spanX=Math.max(1,maxX-minX),spanY=Math.max(1,maxY-minY);
  const pad=24,w=220,h=140;
  const p=new Map(raw.map(n=>[n.id,{
    x:pad+((n.x-minX)/spanX)*(w-2*pad),
    y:pad+((n.y-minY)/spanY)*(h-2*pad),
  }]));
  const displayId=(id:string)=>/^\d+$/.test(id)?String(Number(id)+1):id;
  return <svg className="mini" viewBox="0 0 220 140" aria-label={label}>
    {g.edges.map((e,i)=>{
      const a=p.get(nodeKey(e.source)),b=p.get(nodeKey(e.target));
      return a&&b?<line className="mini-edge" data-edge="true" key={`${nodeKey(e.source)}-${nodeKey(e.target)}-${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y}/>:null;
    })}
    {raw.map(n=>{
      const q=p.get(n.id)!;
      return <g key={n.id}><circle cx={q.x} cy={q.y} r="8"/><text x={q.x} y={q.y+4}>{displayId(n.id)}</text></g>;
    })}
  </svg>
}
function Editor({g,setG}:{g:G;setG:(x:G)=>void}){const[tool,setTool]=useState("select"),[first,setFirst]=useState<string|null>(null),[history,setHistory]=useState<G[]>([]);const ref=useRef(g),drag=useRef<string|null>(null);useEffect(()=>{ref.current=g},[g]);const change=(x:G)=>{setHistory(h=>[...h,copy(ref.current)].slice(-20));ref.current=x;setG(x)};const select=()=>{setTool("select");setFirst(null)};const point=(e:React.PointerEvent<SVGSVGElement>)=>{const r=e.currentTarget.getBoundingClientRect();return{x:Math.max(24,Math.min(576,(e.clientX-r.left)*600/r.width)),y:Math.max(24,Math.min(336,(e.clientY-r.top)*360/r.height))}};const clickNode=(id:string)=>{if(tool==="edge"){if(!first)setFirst(id);else{const duplicate=ref.current.edges.some(e=>(e.source===first&&e.target===id)||(e.source===id&&e.target===first));if(first!==id&&!duplicate)change({...ref.current,edges:[...ref.current.edges,{source:first,target:id}]});select()}}else if(tool==="delete"){change({...ref.current,nodes:ref.current.nodes.filter(n=>n.id!==id),edges:ref.current.edges.filter(e=>e.source!==id&&e.target!==id)});select()}};return <section className="card"><h2>{t.editor.title}</h2><div className="toolbar"><button className={tool==="select"?"active":""} onClick={select}>{t.editor.select}</button><button className={tool==="vertex"?"active":""} disabled={g.nodes.length===7} title={t.editor.limit} onClick={()=>setTool("vertex")}>{t.editor.addVertex}</button><button className={tool==="edge"?"active":""} onClick={()=>setTool("edge")}>{t.editor.addEdge}</button><button className={tool==="delete"?"active":""} onClick={()=>setTool("delete")}>{t.editor.delete}</button><span/><button onClick={()=>setG({...g,nodes:g.nodes.map((n,i)=>({...n,x:120+i%4*120,y:90+Math.floor(i/4)*150}))})}>{t.editor.layout}</button></div>{first&&<div className="hint">{t.editor.start}: {first}</div>}<svg className="canvas" viewBox="0 0 600 360" onClick={e=>{if(e.target!==e.currentTarget)return;if(tool==="vertex"){const id=labels.split("").find(x=>!ref.current.nodes.some(n=>n.id===x));if(id){change({...ref.current,nodes:[...ref.current.nodes,{id,...point(e as unknown as React.PointerEvent<SVGSVGElement>)}]});select()}}else setFirst(null)}} onPointerMove={e=>{if(!drag.current)return;const p=point(e),x={...ref.current,nodes:ref.current.nodes.map(n=>n.id===drag.current?{...n,...p}:n)};ref.current=x;setG(x)}} onPointerUp={e=>{drag.current=null;e.currentTarget.releasePointerCapture(e.pointerId)}}>{g.nodes.length===0&&<text className="empty" x="300" y="180">{t.editor.help}</text>}{g.edges.map((e,i)=>{const a=g.nodes.find(n=>n.id===e.source),b=g.nodes.find(n=>n.id===e.target);return a&&b?<g key={i}><line className="hit" x1={a.x} y1={a.y} x2={b.x} y2={b.y} onClick={ev=>{ev.stopPropagation();if(tool==="delete"){change({...ref.current,edges:ref.current.edges.filter((_,j)=>j!==i)});select()}}}/><line className="edge" x1={a.x} y1={a.y} x2={b.x} y2={b.y}/></g>:null})}{g.nodes.map(n=><g className="node" key={n.id} onPointerDown={e=>{if(tool==="select"){drag.current=n.id;e.currentTarget.ownerSVGElement?.setPointerCapture(e.pointerId)}}} onClick={e=>{e.stopPropagation();clickNode(n.id)}}><circle className={first===n.id?"selected":""} cx={n.x} cy={n.y} r="17"/><text x={n.x} y={n.y+5}>{n.id}</text></g>)}</svg><div className="actions"><button disabled={!history.length} onClick={()=>{const x=history.at(-1);if(x){setHistory(h=>h.slice(0,-1));setG(x)}}}>{t.editor.undo}</button><button onClick={()=>change({nodes:[],edges:[],invariants:g.invariants})}>{t.editor.clear}</button><button onClick={()=>change(copy(demo))}>{t.editor.example}</button></div></section>}
const inv=Object.keys(t.invariant).filter(x=>!["title","all"].includes(x));
function Identify(){
  const[g,setG]=useState<G>(copy(demo)),
    [saved,setSaved]=useState<G|null>(null),
    [result,setResult]=useState<any>(),
    [loading,setLoading]=useState(false),
    [error,setError]=useState(""),
    [minimum,setMinimum]=useState<string[][]>(),
    [copied,setCopied]=useState<string|null>(null);

  const dirty=!saved||math(g)!==math(saved);
  useEffect(()=>{run(demo)},[]);

  async function run(target=g){
    setLoading(true);
    setError("");
    try{
      const r=await api("/api/identify/analyze",{
        nodes:target.nodes.map(n=>n.id),
        edges:target.edges.map(e=>[e.source,e.target]),
        invariants:target.invariants
      });
      setResult(r);
      setSaved(copy(target));
      setMinimum(undefined);
    }catch{
      setError(t.analysis.error);
    }finally{
      setLoading(false);
    }
  }

  const toggle=(id:string)=>setG({
    ...g,
    invariants:g.invariants.includes(id)?g.invariants.filter(x=>x!==id):[...g.invariants,id]
  });

  const copyText=async(value:string,key:string)=>{
    await navigator.clipboard.writeText(value);
    setCopied(key);
    window.setTimeout(()=>setCopied(x=>x===key?null:x),1200);
  };

  const current=!dirty&&result?.identification;
  const analyzedInvariantIds=saved?.invariants??[];
  const possibleRivals=current?(result.identification.possibleRivals??Math.max(0,result.identification.domainSize-1)):0;
  const eliminatedRivals=current?(result.identification.eliminatedRivals??Math.max(0,possibleRivals-result.identification.rivalCount)):0;

  return <>
    <div className="hero">
      <h1>{t.nav.identify}</h1>
      <p>Grafı düzenleyin, invariant seçin ve analizi istediğiniz anda güncelleyin.</p>
    </div>
    {error&&<div className="error">{error}</div>}

    <main className="identify-grid">
      <Editor g={g} setG={setG}/>

      <section className="card">
        <div className="heading">
          <h2>{t.invariant.title}</h2>
          <button onClick={()=>setG({...g,invariants:inv})}>{t.invariant.all}</button>
        </div>
        <div className="invariants">
          {inv.map(id=><label key={id}>
            <input type="checkbox" checked={g.invariants.includes(id)} onChange={()=>toggle(id)}/>
            <b>{t.invariant[id as keyof typeof t.invariant]}</b>
            <span>{!dirty&&analyzedInvariantIds.includes(id)?result?.invariants?.[id]??"—":"—"}</span>
          </label>)}
        </div>
        <p className="spectral-note">Spektral karşılaştırmalarda yaklaşık özdeğerler yerine karakteristik polinom katsayıları tam olarak karşılaştırılır.</p>
      </section>

      <section className="card identification">
        <h2>{t.analysis.title}</h2>
        {dirty?<>
          <div className="dirty"><b>{t.analysis.changed}</b><p>{t.analysis.changedDetail}</p></div>
          <button className="primary" disabled={loading} onClick={()=>run()}>{loading?t.analysis.loading:t.analysis.update}</button>
          <div className="pending">{t.analysis.pending}</div>
        </>:current?<>
          <div className="success">{t.analysis.current}</div>
          <div className="domain-block">
            <small>Karşılaştırma alanı</small>
            <b>n={result.graph.order} bağlı basit graflar · {result.identification.domainSize} izomorfizm sınıfı</b>
            <span>Bu sonuç yalnızca belirtilen sonlu karşılaştırma alanı için geçerlidir.</span>
          </div>
          <div className="metric">
            <strong>{result.identification.rivalCount}</strong>
            <span>{t.analysis.rivals}</span>
          </div>
          <div className="elimination-copy">{possibleRivals} olası rakibin {eliminatedRivals}'u elendi.</div>
          <div className="progress"><i style={{width:`${result.identification.eliminatedPercent}%`}}/></div>
          {result.identification.unique?<div className="success">{t.analysis.unique}</div>:<div className="danger">{t.analysis.notUnique}</div>}
          {result.recommendation&&<div className="recommend">
            <small>{t.analysis.recommendation}</small>
            <h3>{t.invariant[result.recommendation.id as keyof typeof t.invariant]}</h3>
            <p>Bu invariant kalan adayları {result.identification.rivalCount} → {result.recommendation.remaining} seviyesine indirir.</p>
            <button onClick={()=>toggle(result.recommendation.id)}>+ Parmak izine ekle</button>
          </div>}
          <div className="minimum">
            <b>{t.analysis.minimum}</b>
            <p>Bu grafı belirtilen sonlu alanda benzersiz tanımlayan en küçük desteklenen invariant altkümesini bulur.</p>
            {minimum
              ?<div>{minimum[0]?.map(x=><mark key={x}>{t.invariant[x as keyof typeof t.invariant]}</mark>)}</div>
              :<button onClick={async()=>{
                const r=await api("/api/identify/minimum-set",{
                  nodes:g.nodes.map(n=>n.id),
                  edges:g.edges.map(e=>[e.source,e.target]),
                  invariants:g.invariants
                });
                setMinimum(r.sets);
              }}>{t.analysis.compute}</button>}
            <small>Sonlu karşılaştırma alanı için hesaplanır.</small>
          </div>
        </>:<>
          <div className="neutral">{result?.message||t.common.loading}</div>
          <button className="primary" onClick={()=>run()}>{t.analysis.update}</button>
        </>}
      </section>
    </main>

    <section className="bottom-grid">
      <article className="card fingerprint">
        <h2>{t.fingerprint.title}</h2>
        {current?<>
          <div className="fingerprint-section">
            <h3>Graf Özeti</h3>
            <dl>
              <dt>{t.fingerprint.order}</dt><dd>{result.graph.order}</dd>
              <dt>{t.fingerprint.size}</dt><dd>{result.graph.size}</dd>
            </dl>
            <div className="graph6-row">
              <span>graph6</span>
              <button onClick={()=>copyText(result.graph.graph6,"user")}>{copied==="user"?"Kopyalandı":"Kopyala"}</button>
            </div>
            <code>{result.graph.graph6}</code>
          </div>
          <div className="fingerprint-section">
            <h3>Seçili Parmak İzi</h3>
            <dl>
              {analyzedInvariantIds.map(id=><React.Fragment key={id}>
                <dt>{t.invariant[id as keyof typeof t.invariant]}</dt>
                <dd>{result.invariants?.[id]??"—"}</dd>
              </React.Fragment>)}
            </dl>
          </div>
        </>:<p>{dirty?t.fingerprint.dirty:result?.message}</p>}
      </article>

      <article className="card">
        <h2>{t.candidates.title}</h2>
        {current?<div className="cards">
          <div className="candidate">
            <b>{t.candidates.yours}</b>
            <Mini g={g} label={t.candidates.yours}/>
            <small>n = {result.graph.order} · m = {result.graph.size}</small>
            <div className="candidate-reason">Seçili parmak izinin referans grafı.</div>
            <div className="graph6-row">
              <span>graph6</span>
              <button onClick={()=>copyText(result.graph.graph6,"user-card")}>{copied==="user-card"?"Kopyalandı":"Kopyala"}</button>
            </div>
            <code>{result.graph.graph6}</code>
          </div>
          {result.candidates.map((x:any,i:number)=><div className="candidate" key={x.graph6}>
            <b>Aday #{i+1}</b>
            <Mini g={x} label={`Aday ${i+1}`}/>
            <small>n = {x.order} · m = {x.size}</small>
            <div className="candidate-reason">Seçili parmak izi referans grafla eşleşiyor.</div>
            <div className="graph6-row">
              <span>graph6</span>
              <button onClick={()=>copyText(x.graph6,`candidate-${i}`)}>{copied===`candidate-${i}`?"Kopyalandı":"Kopyala"}</button>
            </div>
            <code>{x.graph6}</code>
          </div>)}
          {!result.candidates.length&&<p>{t.candidates.none}</p>}
        </div>:<p>{dirty?t.candidates.dirty:result?.message}</p>}
      </article>
    </section>
  </>
}

function Page({title,intro,children}:{title:string;intro:string;children:React.ReactNode}){return <main><div className="hero"><h1>{title}</h1><p>{intro}</p></div>{children}</main>}
function Explore(){const[d,setD]=useState<any>(),[max,setMax]=useState(7),[chosen,setChosen]=useState(["Edges","Degree sequence"]),[separating,setSeparating]=useState(false);const search=()=>api("/api/twins/search",{max_order:max,invariants:chosen}).then(setD);useEffect(search,[]);return <Page title={t.pages.exploreTitle} intro={t.pages.exploreIntro}><div className="explore-layout"><section className="card controls"><h2>Parmak izi seçimi</h2><label>En büyük mertebe: n = {max}<input type="range" min="3" max="7" value={max} onChange={e=>setMax(Number(e.target.value))}/></label><p>Uyumlu invariantlar</p>{["Edges","Degree sequence","Triangle count","Clique number","Bridge count","Adjacency spectrum"].map(name=><label key={name}><input type="checkbox" checked={chosen.includes(name)} onChange={()=>setChosen(x=>x.includes(name)?x.filter(y=>y!==name):[...x,name])}/>{name==="Edges"?"Kenar sayısı":name==="Degree sequence"?"Derece dizisi":name==="Triangle count"?"Üçgen sayısı":name==="Clique number"?"Klik sayısı":name==="Bridge count"?"Köprü sayısı":"Komşuluk spektrumu"}</label>)}<button className="primary" disabled={!chosen.length} onClick={search}>Parmak izini incele</button></section><section>{d?.collisionFound?<><div className="notice">Bu parmak izi izomorfik olmayan grafları her zaman ayıramıyor. Sonuç, n ≤ {max} bağlı basit graflardan oluşan sonlu alanda doğrulandı.</div><div className="twin-grid">{d.graphs.map((x:any)=><article className="card" key={x.name}><h2>Graf {x.name} · n={x.order}, m={x.size}</h2><Mini g={x} label={`Graf ${x.name}`}/><dl>{Object.entries(x.values).map(([k,v])=><React.Fragment key={k}><dt>{k}</dt><dd>{String(v)}</dd></React.Fragment>)}</dl><code>{x.graph6}</code><button onClick={()=>navigator.clipboard.writeText(x.graph6)}>graph6'yı kopyala</button></article>)}</div><div className="card"><b>İzomorfizm doğrulaması</b><p>NetworkX sonucu: izomorfik değil.</p>{d.separating&&<><button onClick={()=>setSeparating(!separating)}>Ayıran bir özellik göster</button>{separating&&<p>Seçili parmak izi bu iki grafı ayıramıyor; ancak <b>{d.separating.id}</b> farklı: G = {d.separating.g}, H = {d.separating.h}.</p>}</>}</div></>:<div className="card">Belirtilen sonlu arama alanında çakışma bulunmadı. Bu evrensel bir teorem değildir.</div>}</section></div></Page>}
function Frontier(){const[d,setD]=useState<any>(),[selected,setSelected]=useState<any>();useEffect(()=>{api("/api/frontier").then(setD)},[]);const symbol=(s:string)=>s==="verified"?"✓":s==="collision"?"×":"—";return <Page title={t.pages.frontierTitle} intro="Parmak izi sınırı, sıralanmış sonlu graf alanında ilk izomorfik olmayan çakışmadan önce çakışmasız doğrulanan en büyük mertebedir."><div className="card table-wrap">{d&&<><div className="legend">✓ Çakışma yok · × İlk çakışma · — Raporlanmadı</div><table className="matrix"><thead><tr><th>Preset</th>{d.rows[0].cells.map((x:any)=><th key={x.order}>n = {x.order}</th>)}<th>Sınır</th></tr></thead><tbody>{d.rows.map((row:any)=><tr key={row.preset}><td>{row.preset}</td>{row.cells.map((cell:any)=><td key={cell.order}><button title={cell.status==="verified"?"Çakışmasız olarak doğrulandı":cell.status==="collision"?"İlk çakışma":"Raporlanmadı"} onClick={()=>setSelected({row,cell})}>{symbol(cell.status)}</button></td>)}<td>{row.firstCollisionOrder?row.frontier:`≥${row.frontier}`}</td></tr>)}</tbody></table>{selected&&<div className="notice"><b>{selected.row.preset}, n = {selected.cell.order}</b><p>{selected.cell.status==="verified"?`${selected.cell.graphCount} bağlı graf çakışmasız olarak doğrulandı.`:selected.cell.status==="collision"?"Bu mertebede ilk doğrulanmış çakışma kaydedildi.":"Bu mertebe için sonuç raporlanmadı."}</p><small>{d.disclaimer}</small></div>}</>}</div></Page>}
function Research(){const sections=[["Yöntem ve sonlu alan kapsamı","Bu proje bağlı basit grafları karşılaştırır. Graph Atlas, 7 düğüme kadar bağlı etiketsiz graf alanını sağlar. Sonuçlar bu sonlu alanın hesaplamalı bulgularıdır; tüm graflar için teorem değildir."],["Kesin hesaplama","Spektral invariantlar yaklaşık özdeğerlerle değil, tam sayı karakteristik polinom katsayılarıyla karşılaştırılır."],["Graph Atlas","Graf Atlas aynı mertebedeki bağlı graf adaylarını tam olarak taramak için kullanılır."],["nauty / geng","Repository, daha büyük mertebelerde bağlı etiketsiz graf üretimi için nauty/geng desteği içerir; yürütülebilir dosya otomatik indirilmez."],["İzomorfizm doğrulaması","Her raporlanan çakışma NetworkX izomorfizm kontrolüyle doğrulanır."],["graph6 ve yeniden üretilebilirlik","graph6 kodları tanık grafların tekrar oluşturulmasını sağlar. Araştırma dizinindeki sonuç kayıtları ve doğrulama betikleri bu süreci destekler."],["Matematiksel sözleşme","Kesin invariant tanımları ve sonlu arama alanı docs/mathematical-contract.md belgesinde yer alır."],["Sınırlamalar","Çakışma bulunmaması seçilen sonlu alan dışında ayırt edicilik garantisi vermez."]];return <Page title={t.pages.researchTitle} intro={t.pages.researchIntro}><div className="research-grid">{sections.map(([h,p])=><article className="card" key={h}><h2>{h}</h2><p>{p}</p></article>)}</div><div className="card resource-links"><h2>Araştırma arşivi</h2><a href="/docs/background.md">Matematiksel arka plan</a><a href="/docs/mathematical-contract.md">Matematiksel sözleşme</a><a href="/docs/reproducing-results.md">Sonuçları yeniden üretme notları</a></div></Page>}
function App(){return <><Header/><Routes><Route path="/" element={<Explore/>}/><Route path="/tanimla" element={<Identify/>}/><Route path="/sinir" element={<Frontier/>}/><Route path="/arastirma" element={<Research/>}/></Routes></>}
createRoot(document.getElementById("root")!).render(<BrowserRouter><App/></BrowserRouter>);
