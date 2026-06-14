import { useState } from 'react'

const MOCK_INTEL = [
  {id:'INT-2024-00045',title:'Mtandao wa Dawa za Kulevya – Kariakoo',classification:'TOP SECRET',region:'Dar es Salaam',source:'Mjumbe wa Siri',date:'16/05/2024',threat:'HIGH',status:'active'},
  {id:'INT-2024-00044',title:'Shughuli za Kigaidi – Kanda ya Pwani',classification:'SECRET',region:'Pwani',source:'Ujumbe wa Kikosi',date:'14/05/2024',threat:'CRITICAL',status:'active'},
  {id:'INT-2024-00043',title:'Wezi wa Benki – DSM Network',classification:'CONFIDENTIAL',region:'Dar es Salaam',source:'CID Intelligence',date:'12/05/2024',threat:'MEDIUM',status:'investigating'},
  {id:'INT-2024-00042',title:'Usafirishaji Haramu wa Silaha',classification:'SECRET',region:'Tanga',source:'Interpol Desk',date:'10/05/2024',threat:'HIGH',status:'active'},
]

const THREAT_COLORS = {CRITICAL:'var(--redL)',HIGH:'var(--oraL)',MEDIUM:'var(--gold)',LOW:'var(--g300)'}
const CLASF_COLORS = {'TOP SECRET':'var(--redL)',SECRET:'var(--oraL)',CONFIDENTIAL:'var(--gold)',RESTRICTED:'var(--bluL)'}

export default function Intelligence() {
  const [search, setSearch] = useState('')
  return (
    <div className="afd">
      <div style={{background:'linear-gradient(135deg,#07080A,#1A1020)',border:'1px solid rgba(198,40,40,.3)',borderRadius:'var(--r16)',padding:'18px 22px',marginBottom:16,display:'flex',gap:14,alignItems:'center'}}>
        <div style={{fontSize:36}}>🧠</div>
        <div style={{flex:1}}>
          <div style={{fontSize:9,color:'rgba(255,100,100,.6)',textTransform:'uppercase',letterSpacing:1.5,marginBottom:2}}>🔴 CLASSIFIED – SIRI KUU</div>
          <div style={{fontSize:18,fontWeight:800,color:'white',marginBottom:2}}>Ujasusi / Intelligence Center</div>
          <div style={{fontSize:11,color:'rgba(255,255,255,.5)'}}>Ufikiaji unahusika na RPC · DIGP · IGP peke yao · Kila angalizo linaandikwa</div>
        </div>
        <div style={{display:'flex',gap:12,flexShrink:0}}>
          {[['47','Faili Hai'],['4','Muhimu Sana'],['12','Zinachunguzwa'],['3','Mkoa']].map(([v,l]) => (
            <div key={l} style={{textAlign:'center'}}>
              <div style={{fontSize:20,fontWeight:800,color:'var(--redL)',fontFamily:'var(--fm)',lineHeight:1}}>{v}</div>
              <div style={{fontSize:8.5,color:'rgba(255,100,100,.5)',textTransform:'uppercase',letterSpacing:.4,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="ibox mb-sec">⚠️ Taarifa zote katika sehemu hii ni siri kuu. Kila hatua ya ufikiaji inarekodi katika Audit Trail. Kutoa taarifa hizi nje ni kosa la jinai.</div>

      <div className="stats-row s4 mb-sec">
        {[{ic:'📁',cls:'ic-red',n:47,lbl:'Faili za Ujasusi Hai'},{ic:'🚨',cls:'ic-red',n:4,lbl:'Vitisho Muhimu',delta:'↑ 1',dcls:'up'},{ic:'🔍',cls:'ic-amber',n:12,lbl:'Zinachunguzwa'},{ic:'✅',cls:'ic-green',n:89,lbl:'Zilizofungwa'}].map(c => (
          <div key={c.lbl} className="scard" style={{borderColor:'rgba(198,40,40,.15)'}}>
            <div className="scard-top"><div className={`scard-icon ${c.cls}`}>{c.ic}</div>{c.delta&&<div className={`scard-delta ${c.dcls}`}>{c.delta}</div>}</div>
            <div className="scard-num">{c.n}</div><div className="scard-lbl">{c.lbl}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{borderColor:'rgba(198,40,40,.15)'}}>
        <div className="card-h">
          <div className="card-t" style={{color:'var(--redL)'}}>🔴 Faili za Ujasusi – Classified</div>
          <div style={{display:'flex',gap:8}}>
            <input className="fi" style={{width:180,fontSize:11,padding:'6px 10px'}} placeholder="🔍 Tafuta..." value={search} onChange={e=>setSearch(e.target.value)} />
            <button className="btn btn-g btn-sm">+ Faili Mpya</button>
          </div>
        </div>
        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr><th>Namba</th><th>Kichwa cha Taarifa</th><th>Usiri</th><th>Mkoa</th><th>Chanzo</th><th>Tarehe</th><th>Tishio</th><th>Hali</th><th></th></tr></thead>
            <tbody>
              {MOCK_INTEL.filter(i=>i.title.toLowerCase().includes(search.toLowerCase())).map(f => (
                <tr key={f.id}>
                  <td className="td-id">{f.id}</td>
                  <td><div style={{fontWeight:600,color:'var(--tw)',fontSize:12}}>{f.title}</div></td>
                  <td><span style={{fontSize:9,fontWeight:700,padding:'2px 7px',borderRadius:4,background:`${CLASF_COLORS[f.classification]}20`,color:CLASF_COLORS[f.classification],border:`1px solid ${CLASF_COLORS[f.classification]}40`}}>{f.classification}</span></td>
                  <td style={{fontSize:11}}>📍 {f.region}</td>
                  <td style={{fontSize:11,color:'var(--tm)'}}>{f.source}</td>
                  <td className="td-mo" style={{fontSize:10.5}}>{f.date}</td>
                  <td><span style={{fontSize:9.5,fontWeight:700,padding:'2px 7px',borderRadius:4,background:`${THREAT_COLORS[f.threat]}15`,color:THREAT_COLORS[f.threat]}}>{f.threat}</span></td>
                  <td><span className={`pill ${f.status==='active'?'p-active':'p-pending'}`}>{f.status==='active'?'Hai':'Inachunguzwa'}</span></td>
                  <td><button className="btn btn-gh btn-sm">🔓 Fungua</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
