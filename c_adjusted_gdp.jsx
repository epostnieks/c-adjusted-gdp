import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const RAW = {
  AE:{n:"United Arab Emirates",g:552.3,ag:0.8,ind:44.3,mfg:9.4,svc:54.9,oil:15.67,gas:1.96,coal:0,min:0,fr:0.0,mil:0,hlt:4.97},
  AO:{n:"Angola",g:101.0,ag:22.1,ind:34.6,mfg:7.6,svc:41.1,oil:28.27,gas:1.01,coal:0,min:0,fr:0.68,mil:1.0,hlt:2.55},
  AR:{n:"Argentina",g:638.4,ag:5.8,ind:24.0,mfg:15.2,svc:53.7,oil:1.54,gas:0.39,coal:0.0,min:0.58,fr:0.14,mil:0.62,hlt:10.27},
  AT:{n:"Austria",g:534.8,ag:1.2,ind:24.6,mfg:15.1,svc:64.0,oil:0.04,gas:0.02,coal:0,min:0,fr:0.06,mil:1.0,hlt:11.83},
  AU:{n:"Australia",g:1757.0,ag:2.0,ind:25.5,mfg:5.4,svc:66.1,oil:0.26,gas:1.72,coal:0.79,min:10.47,fr:0.12,mil:1.88,hlt:10.4},
  AZ:{n:"Azerbaijan",g:74.3,ag:5.7,ind:42.6,mfg:5.2,svc:42.3,oil:20.98,gas:8.59,coal:0,min:0.35,fr:0.02,mil:4.99,hlt:4.27},
  BD:{n:"Bangladesh",g:450.1,ag:11.2,ind:34.1,mfg:21.9,svc:51.4,oil:0.03,gas:0.49,coal:0.01,min:0,fr:0.08,mil:0.94,hlt:2.17},
  BE:{n:"Belgium",g:671.4,ag:0.8,ind:18.7,mfg:11.4,svc:71.0,oil:0.03,gas:0.0,coal:0,min:0,fr:0.01,mil:1.28,hlt:10.8},
  BR:{n:"Brazil",g:2185.8,ag:5.8,ind:20.9,mfg:12.1,svc:59.2,oil:2.6,gas:0.07,coal:0.01,min:4.49,fr:0.76,mil:0.97,hlt:9.73},
  CA:{n:"Canada",g:2243.6,ag:1.4,ind:22.8,mfg:8.3,svc:59.8,oil:2.83,gas:0.79,coal:0.07,min:1.18,fr:0.07,mil:1.31,hlt:11.31},
  CH:{n:"Switzerland",g:936.6,ag:0.6,ind:24.7,mfg:17.7,svc:72.0,oil:0.0,gas:0,coal:0,min:0,fr:0.01,mil:0.72,hlt:11.69},
  CL:{n:"Chile",g:330.3,ag:3.9,ind:30.1,mfg:9.0,svc:56.1,oil:0.01,gas:0.02,coal:0.0,min:16.23,fr:0.64,mil:1.58,hlt:10.53},
  CN:{n:"China",g:18743.8,ag:6.8,ind:36.5,mfg:24.9,svc:56.7,oil:0.31,gas:0.21,coal:0.61,min:0.51,fr:0.07,mil:1.71,hlt:5.94},
  CO:{n:"Colombia",g:418.8,ag:9.3,ind:23.1,mfg:10.1,svc:58.1,oil:3.42,gas:0.18,coal:0.73,min:0.91,fr:0.09,mil:3.36,hlt:8.14},
  DE:{n:"Germany",g:4685.6,ag:0.9,ind:25.6,mfg:18.0,svc:64.0,oil:0.01,gas:0.02,coal:0.01,min:0,fr:0.03,mil:1.89,hlt:12.27},
  DK:{n:"Denmark",g:424.5,ag:0.9,ind:24.1,mfg:17.9,svc:63.5,oil:0.27,gas:0.06,coal:0,min:0,fr:0.01,mil:2.42,hlt:9.39},
  DZ:{n:"Algeria",g:269.3,ag:14.0,ind:36.2,mfg:9.5,svc:46.8,oil:14.46,gas:8.0,coal:0,min:0.0,fr:0.13,mil:7.97,hlt:4.35},
  EG:{n:"Egypt",g:389.1,ag:13.7,ind:32.6,mfg:13.9,svc:48.9,oil:2.99,gas:2.05,coal:0,min:0,fr:0.11,mil:0.67,hlt:4.88},
  ES:{n:"Spain",g:1725.7,ag:2.8,ind:19.5,mfg:10.8,svc:68.9,oil:0.0,gas:0.0,coal:0,min:0.1,fr:0.02,mil:1.43,hlt:9.22},
  FI:{n:"Finland",g:298.7,ag:2.5,ind:22.8,mfg:14.2,svc:62.2,oil:0.05,gas:0,coal:0,min:0.11,fr:0.29,mil:2.3,hlt:10.47},
  FR:{n:"France",g:3160.4,ag:1.3,ind:17.2,mfg:9.6,svc:70.9,oil:0.01,gas:0.0,coal:0,min:0,fr:0.03,mil:2.05,hlt:11.54},
  GB:{n:"United Kingdom",g:3686.0,ag:0.6,ind:17.1,mfg:8.0,svc:72.4,oil:0.42,gas:0.17,coal:0.0,min:0.0,fr:0,mil:2.28,hlt:11.13},
  ID:{n:"Indonesia",g:1396.3,ag:12.6,ind:39.3,mfg:19.0,svc:43.8,oil:0.77,gas:0.84,coal:1.22,min:1.91,fr:0.42,mil:0.78,hlt:2.7},
  IE:{n:"Ireland",g:609.2,ag:1.0,ind:33.6,mfg:29.6,svc:60.6,oil:0.0,gas:0.05,coal:0,min:0.04,fr:0.01,mil:0.24,hlt:6.85},
  IL:{n:"Israel",g:540.4,ag:1.3,ind:17.3,mfg:11.1,svc:72.5,oil:0.01,gas:0.43,coal:0,min:0,fr:0.0,mil:8.78,hlt:7.1},
  IN:{n:"India",g:3909.9,ag:16.3,ind:24.6,mfg:12.6,svc:49.9,oil:0.33,gas:0.08,coal:1.28,min:1.32,fr:0.16,mil:2.27,hlt:3.34},
  IQ:{n:"Iraq",g:279.6,ag:3.4,ind:51.6,mfg:4.1,svc:45.8,oil:42.79,gas:0.66,coal:0,min:0,fr:0.0,mil:2.36,hlt:5.53},
  IR:{n:"Iran",g:475.3,ag:10.8,ind:36.1,mfg:20.6,svc:49.8,oil:18.27,gas:8.81,coal:0.01,min:3.36,fr:0.01,mil:2.01,hlt:6.03},
  IT:{n:"Italy",g:2380.8,ag:2.0,ind:22.3,mfg:14.8,svc:65.0,oil:0.08,gas:0.03,coal:0,min:0,fr:0.01,mil:1.61,hlt:8.44},
  JP:{n:"Japan",g:4027.6,ag:1.0,ind:29.9,mfg:21.5,svc:73.0,oil:0.0,gas:0.01,coal:0.0,min:0.01,fr:0.03,mil:1.37,hlt:10.74},
  KR:{n:"Korea",g:1875.4,ag:1.5,ind:33.9,mfg:26.6,svc:57.5,oil:0.03,gas:0.01,coal:0.0,min:0.0,fr:0.01,mil:2.56,hlt:8.68},
  KW:{n:"Kuwait",g:160.2,ag:0.5,ind:57.1,mfg:8.0,svc:55.9,oil:27.58,gas:1.7,coal:0,min:0,fr:0.0,mil:4.84,hlt:4.96},
  KZ:{n:"Kazakhstan",g:291.5,ag:3.9,ind:32.1,mfg:12.4,svc:57.9,oil:14.84,gas:2.04,coal:0.85,min:9.1,fr:0.01,mil:0.43,hlt:3.77},
  LY:{n:"Libya",g:48.5,ag:2.4,ind:73.5,mfg:0.0,svc:28.3,oil:56.38,gas:4.58,coal:0,min:0,fr:0.08,mil:5.29,hlt:7.81},
  MX:{n:"Mexico",g:1856.4,ag:3.7,ind:31.8,mfg:19.8,svc:58.1,oil:2.07,gas:0.09,coal:0.02,min:1.36,fr:0.11,mil:0.89,hlt:5.5},
  MY:{n:"Malaysia",g:422.2,ag:8.1,ind:37.0,mfg:22.5,svc:53.7,oil:1.85,gas:3.35,coal:0.03,min:0,fr:1.7,mil:0.99,hlt:3.96},
  NG:{n:"Nigeria",g:252.3,ag:25.9,ind:18.2,mfg:8.7,svc:53.7,oil:6.25,gas:1.16,coal:0.0,min:0.01,fr:1.13,mil:0.56,hlt:4.19},
  NL:{n:"Netherlands",g:1214.9,ag:1.7,ind:17.5,mfg:10.1,svc:70.5,oil:0.02,gas:0.31,coal:0,min:0,fr:0.0,mil:1.92,hlt:10.01},
  NO:{n:"Norway",g:483.6,ag:2.1,ind:37.0,mfg:6.2,svc:51.8,oil:6.06,gas:3.94,coal:0.0,min:0,fr:0.04,mil:2.09,hlt:9.43},
  PH:{n:"Philippines",g:461.6,ag:9.1,ind:27.7,mfg:15.7,svc:63.2,oil:0.03,gas:0.16,coal:0.09,min:1.52,fr:0.16,mil:1.32,hlt:5.1},
  PK:{n:"Pakistan",g:371.6,ag:23.7,ind:20.2,mfg:13.2,svc:50.7,oil:0.38,gas:0.74,coal:0.12,min:0.07,fr:0.13,mil:2.67,hlt:2.52},
  PL:{n:"Poland",g:917.8,ag:2.5,ind:27.2,mfg:16.1,svc:59.1,oil:0.04,gas:0.1,coal:0.25,min:0.48,fr:0.16,mil:4.15,hlt:8.06},
  QA:{n:"Qatar",g:219.2,ag:0.3,ind:58.2,mfg:8.1,svc:46.1,oil:15.28,gas:12.01,coal:0,min:0,fr:0.0,mil:6.5,hlt:2.52},
  RU:{n:"Russia",g:2173.8,ag:2.7,ind:30.7,mfg:13.3,svc:57.5,oil:9.67,gas:5.86,coal:0.61,min:2.05,fr:0.31,mil:7.05,hlt:7.04},
  SA:{n:"Saudi Arabia",g:1239.8,ag:2.5,ind:44.9,mfg:15.7,svc:47.1,oil:23.69,gas:1.72,coal:0,min:0.16,fr:0.0,mil:7.3,hlt:5.69},
  SE:{n:"Sweden",g:603.7,ag:1.4,ind:21.7,mfg:13.0,svc:66.4,oil:0.03,gas:0,coal:0,min:1.0,fr:0.18,mil:2.0,hlt:11.22},
  SG:{n:"Singapore",g:547.4,ag:0.0,ind:21.4,mfg:16.3,svc:73.0,oil:0,gas:0,coal:0,min:0,fr:0.0,mil:2.84,hlt:4.49},
  TH:{n:"Thailand",g:526.5,ag:8.7,ind:32.1,mfg:24.3,svc:59.2,oil:0.48,gas:0.94,coal:0.03,min:0,fr:0.36,mil:1.08,hlt:4.54},
  TR:{n:"Turkiye",g:1359.1,ag:5.8,ind:25.5,mfg:16.8,svc:57.5,oil:0.14,gas:0.01,coal:0.05,min:0.63,fr:0,mil:1.92,hlt:4.28},
  US:{n:"United States",g:28751.0,ag:0.8,ind:14.5,mfg:8.7,svc:62.9,oil:0.61,gas:0.36,coal:0.17,min:0.1,fr:0.04,mil:3.42,hlt:16.69},
  VN:{n:"Viet Nam",g:476.4,ag:11.9,ind:37.6,mfg:24.4,svc:42.4,oil:0.67,gas:0.33,coal:0.38,min:0.1,fr:1.07,mil:0,hlt:4.56},
  ZA:{n:"South Africa",g:401.1,ag:2.8,ind:24.3,mfg:12.8,svc:63.0,oil:0.4,gas:0.03,coal:2.44,min:3.83,fr:0.63,mil:0.7,hlt:8.91},
};

function compute(c, mu) {
  const g = c.g;
  const channels = [
    { name: "Oil & Gas", pct: c.oil, beta: 4.0 },
    { name: "Natural Gas", pct: c.gas, beta: 3.5 },
    { name: "Coal", pct: c.coal, beta: 6.0 },
    { name: "Mining", pct: c.min, beta: 3.0 },
    { name: "Forestry", pct: c.fr, beta: 4.0 },
    { name: "Military/Defense", pct: c.mil, beta: 2.5 },
    { name: "Healthcare PST", pct: Math.min(c.hlt, 8) * 0.3, beta: 3.5 },
    { name: "Agriculture PST", pct: c.ag * 0.5, beta: 8.6 },
    { name: "Manufacturing PST", pct: c.mfg * 0.15, beta: 6.8 },
    { name: "Tech/AI PST", pct: Math.min(c.svc * 0.05, 5), beta: 7.4 },
    { name: "Finance PST", pct: Math.min(c.svc * 0.04, 4), beta: 5.0 },
  ];
  let loss = 0;
  const bd = [];
  for (const ch of channels) {
    if (ch.pct <= 0) continue;
    const sg = g * ch.pct / 100;
    const l = mu * ch.beta * sg * 0.01;
    loss += l;
    if (l > 0.05) bd.push({ ...ch, gdp: sg, loss: l });
  }
  return { conv: g, adj: g - loss, loss, pct: loss / g * 100, bd: bd.sort((a, b) => b.loss - a.loss) };
}

const fmt = n => n >= 1000 ? `$${(n/1000).toFixed(1)}T` : n >= 1 ? `$${n.toFixed(0)}B` : `$${(n*1000).toFixed(0)}M`;
const pc = n => `${n.toFixed(1)}%`;
const M = "'JetBrains Mono',monospace";
const S = "'Newsreader',serif";

function Stat({l,v,s,color="#F59E0B"}) {
  return <div style={{flex:1,minWidth:170,padding:"14px 18px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:4}}>
    <div style={{fontFamily:M,fontSize:10,letterSpacing:"0.1em",color:"rgba(255,255,255,0.35)",textTransform:"uppercase",marginBottom:6}}>{l}</div>
    <div style={{fontFamily:M,fontSize:21,fontWeight:600,color,letterSpacing:"-0.02em"}}>{v}</div>
    {s&&<div style={{fontFamily:M,fontSize:11,color:"rgba(255,255,255,0.3)",marginTop:3}}>{s}</div>}
  </div>;
}

export default function App() {
  const [tab,setTab]=useState("ranking");
  const [sel,setSel]=useState("US");
  const [mu,setMu]=useState(1.0);
  const [sort,setSort]=useState("adj");

  const all=useMemo(()=>Object.entries(RAW).map(([code,c])=>({code,name:c.n,...compute(c,mu)})).sort((a,b)=>sort==="pct"?b.pct-a.pct:b.adj-a.adj),[mu,sort]);
  const us=useMemo(()=>compute(RAW.US,mu),[mu]);
  const ez=useMemo(()=>{
    const codes=["DE","FR","IT","ES","NL","BE","AT","FI","IE","PT"];
    return codes.reduce((a,c)=>{if(!RAW[c])return a;const r=compute(RAW[c],mu);return{conv:a.conv+r.conv,adj:a.adj+r.adj}},{conv:0,adj:0});
  },[mu]);

  const tabs=[{id:"ranking",l:"Ranking"},{id:"chart",l:"Chart"},{id:"drill",l:"Drill Down"},{id:"methods",l:"Methods"}];
  const selC=RAW[sel];
  const selR=useMemo(()=>selC?compute(selC,mu):null,[selC,mu]);

  return <div style={{fontFamily:S,background:"#0D0D0D",color:"#F5F0E8",minHeight:"100vh",maxWidth:1000,margin:"0 auto",padding:"0 24px 60px"}}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@300;400;500;600&display=swap');`}</style>

    <header style={{padding:"40px 0 24px",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
      <div style={{fontFamily:M,fontSize:10,letterSpacing:"0.12em",color:"#F59E0B",marginBottom:12,textTransform:"uppercase"}}>C-Adjusted GDP Explorer · {Object.keys(RAW).length} Countries · World Bank Data</div>
      <h1 style={{fontSize:28,fontWeight:400,margin:0,lineHeight:1.25,letterSpacing:"-0.02em"}}>What Is the World Actually Earning?</h1>
      <p style={{fontSize:15,color:"rgba(255,255,255,0.4)",margin:"8px 0 0",fontStyle:"italic"}}>C-Adjusted GDP Using the System Asset Pricing Model</p>
      <div style={{fontFamily:M,fontSize:11,color:"rgba(255,255,255,0.25)",marginTop:12}}>Erik Postnieks · Postnieks (2026a) · github.com/epostnieks/c-adjusted-gdp</div>
    </header>

    <div style={{display:"flex",gap:12,margin:"24px 0",flexWrap:"wrap"}}>
      <Stat l="US Conventional" v={fmt(us.conv)} color="rgba(255,255,255,0.5)"/>
      <Stat l="US C-Adjusted" v={fmt(us.adj)} s={`HW: ${pc(us.pct)}`}/>
      <Stat l="Eurozone Conv." v={fmt(ez.conv)} color="rgba(255,255,255,0.5)"/>
      <Stat l="Eurozone C-Adj" v={fmt(ez.adj)} color={ez.adj>us.adj?"#22C55E":"#F59E0B"} s={ez.adj>us.adj?"EXCEEDS US":""}/>
    </div>

    <div style={{margin:"24px 0",padding:"14px 18px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:4}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
        <span style={{fontFamily:M,fontSize:10,letterSpacing:"0.1em",color:"rgba(255,255,255,0.4)",textTransform:"uppercase"}}>Shadow Price (μ)</span>
        <span style={{fontFamily:M,fontSize:18,fontWeight:600,color:"#F59E0B"}}>{mu.toFixed(2)}</span>
      </div>
      <input type="range" min={0} max={2} step={0.01} value={mu} onChange={e=>setMu(parseFloat(e.target.value))} style={{width:"100%",accentColor:"#F59E0B"}}/>
      <div style={{display:"flex",justifyContent:"space-between",fontFamily:M,fontSize:10,color:"rgba(255,255,255,0.2)",marginTop:4}}>
        <span>μ=0</span><span>μ=1.0 (full social cost)</span><span>μ=2.0</span>
      </div>
    </div>

    <nav style={{display:"flex",gap:0,borderBottom:"1px solid rgba(255,255,255,0.06)",marginBottom:24,position:"sticky",top:0,background:"#0D0D0D",zIndex:10,paddingTop:8}}>
      {tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{fontFamily:M,fontSize:11,letterSpacing:"0.04em",color:tab===t.id?"#F59E0B":"rgba(255,255,255,0.35)",background:"none",border:"none",cursor:"pointer",padding:"12px 16px",borderBottom:tab===t.id?"2px solid #F59E0B":"2px solid transparent"}}>{t.l}</button>)}
      {tab==="ranking"&&<div style={{marginLeft:"auto",display:"flex",gap:8,alignItems:"center"}}>
        <button onClick={()=>setSort("adj")} style={{fontFamily:M,fontSize:10,color:sort==="adj"?"#F59E0B":"rgba(255,255,255,0.3)",background:"none",border:"none",cursor:"pointer"}}>by GDP</button>
        <button onClick={()=>setSort("pct")} style={{fontFamily:M,fontSize:10,color:sort==="pct"?"#F59E0B":"rgba(255,255,255,0.3)",background:"none",border:"none",cursor:"pointer"}}>by HW%</button>
      </div>}
    </nav>

    {tab==="ranking"&&<div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontFamily:M,fontSize:11}}>
      <thead><tr style={{borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
        {["#","Country","Conv. GDP","C-Adj GDP","Hollow Win","HW %"].map(h=><th key={h} style={{textAlign:h==="Country"?"left":"right",padding:"8px 10px",color:"rgba(255,255,255,0.4)",fontWeight:400,fontSize:10,letterSpacing:"0.06em",textTransform:"uppercase"}}>{h}</th>)}
      </tr></thead>
      <tbody>{all.map((d,i)=><tr key={d.code} style={{borderBottom:"1px solid rgba(255,255,255,0.03)",background:d.code==="US"?"rgba(245,158,11,0.04)":"transparent"}}>
        <td style={{padding:"5px 10px",textAlign:"right",color:"rgba(255,255,255,0.3)"}}>{i+1}</td>
        <td style={{padding:"5px 10px",color:"#F5F0E8",cursor:"pointer",textDecoration:"underline",textDecorationColor:"rgba(255,255,255,0.1)"}} onClick={()=>{setSel(d.code);setTab("drill")}}>{d.name}</td>
        <td style={{padding:"5px 10px",textAlign:"right",color:"rgba(255,255,255,0.5)"}}>{fmt(d.conv)}</td>
        <td style={{padding:"5px 10px",textAlign:"right",color:"#F59E0B",fontWeight:600}}>{fmt(d.adj)}</td>
        <td style={{padding:"5px 10px",textAlign:"right",color:"#EF4444"}}>{fmt(d.loss)}</td>
        <td style={{padding:"5px 10px",textAlign:"right",fontWeight:600,color:d.pct>25?"#EF4444":d.pct>15?"#F59E0B":"#22C55E"}}>{pc(d.pct)}</td>
      </tr>)}</tbody>
    </table></div>}

    {tab==="chart"&&<ResponsiveContainer width="100%" height={Math.max(500,all.length*22)}>
      <BarChart data={all.slice(0,25)} layout="vertical" margin={{left:130,right:20,top:10,bottom:10}}>
        <XAxis type="number" tickFormatter={fmt} tick={{fill:"rgba(255,255,255,0.3)",fontFamily:M,fontSize:10}} axisLine={{stroke:"rgba(255,255,255,0.06)"}}/>
        <YAxis type="category" dataKey="name" tick={{fill:"#F5F0E8",fontFamily:M,fontSize:10}} axisLine={false} tickLine={false} width={125}/>
        <Tooltip contentStyle={{background:"#1A1A1A",border:"1px solid rgba(255,255,255,0.1)",borderRadius:4,fontFamily:M,fontSize:11}} formatter={(v,n)=>[fmt(v),n==="adj"?"C-Adjusted":"Conventional"]}/>
        <Bar dataKey="conv" fill="rgba(255,255,255,0.06)" radius={[0,2,2,0]} name="Conventional"/>
        <Bar dataKey="adj" radius={[0,2,2,0]} name="C-Adjusted">{all.slice(0,25).map((d,i)=><Cell key={i} fill={d.pct>25?"#EF4444":d.pct>15?"#F59E0B":"#22C55E"} fillOpacity={0.65}/>)}</Bar>
      </BarChart>
    </ResponsiveContainer>}

    {tab==="drill"&&selR&&<div>
      <select value={sel} onChange={e=>setSel(e.target.value)} style={{fontFamily:M,fontSize:13,padding:"8px 12px",background:"#1A1A1A",color:"#F5F0E8",border:"1px solid rgba(255,255,255,0.1)",borderRadius:4,marginBottom:20,cursor:"pointer"}}>
        {Object.entries(RAW).sort((a,b)=>b[1].g-a[1].g).map(([c,d])=><option key={c} value={c}>{d.n} ({fmt(d.g)})</option>)}
      </select>
      <div style={{display:"flex",gap:12,marginBottom:24,flexWrap:"wrap"}}>
        <Stat l="Conventional" v={fmt(selR.conv)} color="rgba(255,255,255,0.6)"/>
        <Stat l="C-Adjusted" v={fmt(selR.adj)}/>
        <Stat l="Hollow Win" v={fmt(selR.loss)} color="#EF4444" s={pc(selR.pct)+" of GDP"}/>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",fontFamily:M,fontSize:11}}>
        <thead><tr style={{borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
          {["PST Channel","% GDP","Sector GDP","β_W","Loss"].map(h=><th key={h} style={{textAlign:h==="PST Channel"?"left":"right",padding:"8px 10px",color:"rgba(255,255,255,0.4)",fontWeight:400,fontSize:10,letterSpacing:"0.06em",textTransform:"uppercase"}}>{h}</th>)}
        </tr></thead>
        <tbody>{selR.bd.map(ch=><tr key={ch.name} style={{borderBottom:"1px solid rgba(255,255,255,0.03)"}}>
          <td style={{padding:"5px 10px",color:"#F5F0E8"}}>{ch.name}</td>
          <td style={{padding:"5px 10px",textAlign:"right",color:"rgba(255,255,255,0.5)"}}>{pc(ch.pct)}</td>
          <td style={{padding:"5px 10px",textAlign:"right",color:"rgba(255,255,255,0.5)"}}>{fmt(ch.gdp)}</td>
          <td style={{padding:"5px 10px",textAlign:"right",color:"#F59E0B"}}>{ch.beta.toFixed(1)}</td>
          <td style={{padding:"5px 10px",textAlign:"right",color:"#EF4444",fontWeight:600}}>{fmt(ch.loss)}</td>
        </tr>)}</tbody>
      </table>
    </div>}

    {tab==="methods"&&<div style={{fontSize:15,lineHeight:1.8,color:"rgba(255,255,255,0.6)"}}>
      <h2 style={{fontSize:20,fontWeight:400,color:"#F5F0E8",marginBottom:16}}>Methodology</h2>
      <p><strong style={{color:"#F5F0E8"}}>Data:</strong> World Bank WDI. GDP, sector value-added, resource rents, military and health expenditure as % of GDP. {Object.keys(RAW).length} countries.</p>
      <p><strong style={{color:"#F5F0E8"}}>PST mapping:</strong> World Bank sectors mapped to PST domains via resource rent indicators, military expenditure, and health expenditure. Decomposition ratios are preliminary — each SAPM paper refines the mapping.</p>
      <p><strong style={{color:"#F5F0E8"}}>β_W:</strong> Calibrated from SAPM papers where available. Placeholder estimates for domains in progress. Updates automatically as papers publish.</p>
      <p><strong style={{color:"#F5F0E8"}}>C-adjustment:</strong> loss = μ × β_W × sector_GDP × 0.01. Shadow price μ adjustable via slider.</p>
      <p><strong style={{color:"#F5F0E8"}}>Limitations:</strong> Sector decomposition ratios are estimated, not calibrated. β_W values for uncalibrated domains are placeholders. Fork the repo and contest any parameter.</p>
      <div style={{marginTop:32,padding:20,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:4}}>
        <div style={{fontFamily:M,fontSize:10,letterSpacing:"0.1em",color:"#F59E0B",textTransform:"uppercase",marginBottom:8}}>Citation</div>
        <p style={{fontFamily:M,fontSize:12,color:"rgba(255,255,255,0.5)",margin:0}}>Postnieks, E. (2026). "What Is the World Actually Earning? C-Adjusted GDP Across 190 Countries." Working Paper. github.com/epostnieks/c-adjusted-gdp</p>
      </div>
    </div>}

    <footer style={{padding:"32px 0",marginTop:48,borderTop:"1px solid rgba(255,255,255,0.06)"}}>
      <div style={{fontFamily:M,fontSize:10,color:"rgba(255,255,255,0.15)",lineHeight:1.8}}>
        <div>C-Adjusted GDP Explorer · Erik Postnieks · github.com/epostnieks/c-adjusted-gdp</div>
        <div>Private Pareto Theorem (Postnieks, 2026a) · SAPM · World Bank WDI</div>
        <div>Every parameter contestable. Fork the repo. Change a β_W. The instrument is the argument.</div>
      </div>
    </footer>
  </div>;
}
