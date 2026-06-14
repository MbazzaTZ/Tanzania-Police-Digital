import { useNavigate } from 'react-router-dom'
import PoliceBadge from '@components/shared/PoliceBadge'
import { MOCK_REGIONS_STATS, MOCK_ALERTS, MOCK_OFFICERS } from '@utils/mockData'

const ALERT_CFG = {
  critical:{dot:'#EF5350',cls:'a-critical',lbl:'Muhimu'},
  urgent:  {dot:'#FF7043',cls:'a-urgent',  lbl:'Haraka'},
  info:    {dot:'#64B5F6',cls:'a-info',    lbl:'Taarifa'},
}

const DSM_DISTRICTS = [
  {name:'Kinondoni',  officers:312, citations:127, arrests:18, color:'#EF5350'},
  {name:'Ilala',      officers:287, citations:98,  arrests:14, color:'#FF7043'},
  {name:'Temeke',     officers:264, citations:76,  arrests:11, color:'#FFC107'},
  {name:'Ubungo',     officers:198, citations:54,  arrests:8,  color:'#2E7D32'},
  {name:'Kigamboni',  officers:143, citations:31,  arrests:4,  color:'#1565C0'},
]

export default function RegionalDashboard() {
  const nav = useNavigate()
  return (
    <div className="afd">
      {/* Header */}
      <div style={{background:'linear-gradient(135deg,#071209,#1B5E20)',borderRadius:'var(--r16)',padding:'18px 22px',marginBottom:16,display:'flex',gap:16,alignItems:'center'}}>
        <PoliceBadge size={50} />
        <div style={{flex:1}}>
          <div style={{fontSize:9,color:'rgba(255,255,255,.5)',textTransform:'uppercase',letterSpacing:1,marginBottom:2}}>DASHIBODI YA MKOA</div>
          <div style={{fontSize:18,fontWeight:800,color:'white',marginBottom:2}}>Mkoa wa Dar es Salaam</div>
          <div style={{fontSize:11,color:'rgba(255,255,255,.6)'}}>Wilaya 5 · Vituo 52 · Maafisa 1,204 wanafanya kazi</div>
        </div>
        <div style={{display:'flex',gap:16,flexShrink:0}}>
          {[['1,204','Maafisa'],['52','Vituo'],['5','Wilaya'],['386','Shughuli Leo']].map(([v,l]) => (
            <div key={l} style={{textAlign:'center'}}>
              <div style={{fontSize:22,fontWeight:800,color:'var(--gold)',fontFamily:'var(--fm)',lineHeight:1}}>{v}</div>
              <div style={{fontSize:9,color:'rgba(255,255,255,.5)',textTransform:'uppercase',letterSpacing:.4,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 5 Stat cards */}
      <div className="stats-row s5 mb-sec">
        {[
          {ic:'📋',cls:'ic-green', n:386,  lbl:'Shughuli Zote Leo',     delta:'↑ 12%', dcls:'up'},
          {ic:'⛓️',cls:'ic-amber', n:47,   lbl:'Kukamatwa Leo',         delta:'↑ 8%',  dcls:'up'},
          {ic:'🚨',cls:'ic-red',   n:5,    lbl:'Matukio Muhimu',        delta:'↓ 2',   dcls:'down'},
          {ic:'📁',cls:'ic-blue',  n:128,  lbl:'Kesi Zinazoendelea',    delta:'→ 0%',  dcls:'flat'},
          {ic:'👮',cls:'ic-purple',n:1204, lbl:'Maafisa Wanafanya Kazi',delta:'↑ 5%',  dcls:'up'},
        ].map(c => (
          <div key={c.lbl} className="scard">
            <div className="scard-top">
              <div className={`scard-icon ${c.cls}`}>{c.ic}</div>
              <div className={`scard-delta ${c.dcls}`}>{c.delta}</div>
            </div>
            <div className="scard-num">{c.n.toLocaleString()}</div>
            <div className="scard-lbl">{c.lbl}</div>
          </div>
        ))}
      </div>

      {/* Districts + Alerts */}
      <div className="row4 mb-sec">
        {/* Districts breakdown */}
        <div className="card">
          <div className="card-h">
            <div><div className="card-t">🏛️ Takwimu kwa Wilaya</div><div className="card-st">Dar es Salaam – Wilaya 5</div></div>
            <span className="view-all" onClick={()=>nav('/dashboard/district')}>Wilaya →</span>
          </div>
          <div style={{overflowX:'auto'}}>
            <table>
              <thead><tr>
                <th>Wilaya</th><th>Maafisa</th><th>Citations</th><th>Kukamatwa</th><th>Hali</th>
              </tr></thead>
              <tbody>
                {DSM_DISTRICTS.map(d => (
                  <tr key={d.name}>
                    <td>
                      <div style={{display:'flex',alignItems:'center',gap:8}}>
                        <div style={{width:8,height:8,borderRadius:'50%',background:d.color,flexShrink:0}} />
                        <span style={{fontWeight:600,color:'var(--tw)'}}>{d.name}</span>
                      </div>
                    </td>
                    <td className="td-mo">{d.officers}</td>
                    <td className="td-mo" style={{color:'var(--gold)'}}>{d.citations}</td>
                    <td className="td-mo" style={{color:'var(--redL)'}}>{d.arrests}</td>
                    <td><span className="pill p-active">Hai</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Bar chart */}
          <div style={{padding:'12px 14px',borderTop:'1px solid var(--b)'}}>
            <div style={{fontSize:10,fontWeight:700,color:'var(--tm)',textTransform:'uppercase',letterSpacing:.5,marginBottom:10}}>Citations kwa Wilaya</div>
            {DSM_DISTRICTS.map(d => (
              <div key={d.name} className="heat-row">
                <div className="heat-lbl" style={{minWidth:80}}>{d.name}</div>
                <div className="heat-bar">
                  <div className="heat-fill" style={{width:`${Math.round(d.citations/1.27)}%`,background:d.color}} />
                </div>
                <div className="heat-cnt">{d.citations}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="card">
          <div className="card-h">
            <div className="card-t">🚨 Taarifa za Mkoa</div>
            <span className="view-all" onClick={()=>nav('/operations/alerts')}>Zote →</span>
          </div>
          <div style={{padding:'10px 12px'}}>
            {MOCK_ALERTS.slice(0,4).map(a => {
              const cfg = ALERT_CFG[a.type]
              return (
                <div key={a.id} className={`alert-item ${cfg.cls}`}>
                  <div className="a-dot" style={{background:cfg.dot}} />
                  <div style={{flex:1}}>
                    <div className="a-title">{a.title}</div>
                    <div className="a-time">🕐 {a.time}</div>
                  </div>
                  <span className="a-badge" style={{background:`${cfg.dot}20`,color:cfg.dot}}>{cfg.lbl}</span>
                </div>
              )
            })}
          </div>
          {/* Officers */}
          <div style={{padding:'0 14px 14px'}}>
            <div style={{fontSize:10,fontWeight:700,color:'var(--tm)',textTransform:'uppercase',letterSpacing:.5,margin:'10px 0 8px'}}>👮 Maafisa Wakuu wa Mkoa</div>
            {[
              {name:'RPC Dar es Salaam', rank:'Regional Police Commander', station:'RPC Office'},
              {name:'SSP Kinondoni OCD', rank:'Senior Superintendent',     station:'Kinondoni HQ'},
              {name:'SSP Ilala OCD',     rank:'Senior Superintendent',     station:'Ilala HQ'},
            ].map(o => (
              <div key={o.name} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 0',borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                <div className="sb-av" style={{width:28,height:28,fontSize:12}}>👮</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:11,fontWeight:600,color:'var(--tw)'}}>{o.name}</div>
                  <div style={{fontSize:9.5,color:'var(--tm)'}}>{o.rank} · {o.station}</div>
                </div>
                <div className="online-dot" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Crime trend + Region map */}
      <div className="row5 mb-sec">
        <div className="card">
          <div className="card-h">
            <div className="card-t">📈 Mwenendo wa Uhalifu – Mwezi Huu</div>
            <select className="fs" style={{width:'auto',fontSize:11,padding:'4px 8px'}}>
              <option>Mwezi Huu</option><option>Robo Mwaka</option><option>Mwaka Huu</option>
            </select>
          </div>
          <div style={{padding:'14px'}}>
            {/* Simple bar chart */}
            <div style={{display:'flex',alignItems:'flex-end',gap:4,height:100,marginBottom:8}}>
              {[28,35,22,41,38,45,32,27,48,38,42,51,44,38,46,28].map((v,i) => (
                <div key={i} style={{flex:1,height:`${(v/51)*100}%`,background:`rgba(27,94,32,${0.4+v/100})`,borderRadius:'2px 2px 0 0',minWidth:4}} />
              ))}
            </div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:9,color:'var(--td)'}}>
              <span>1 Mei</span><span>7 Mei</span><span>14 Mei</span><span>21 Mei</span><span>31 Mei</span>
            </div>
            <div style={{display:'flex',gap:16,marginTop:12}}>
              {[['Total Leo','386','↑ 12%','var(--gold)'],['Kamata','47','↑ 8%','var(--redL)'],['Citations','284','↑ 15%','var(--g300)']].map(([l,v,d,c]) => (
                <div key={l} style={{flex:1,background:'rgba(0,0,0,.2)',borderRadius:'var(--r8)',padding:'8px 10px',textAlign:'center'}}>
                  <div style={{fontSize:18,fontWeight:800,color:c,fontFamily:'var(--fm)',lineHeight:1}}>{v}</div>
                  <div style={{fontSize:9,color:'var(--tm)',marginTop:2}}>{l}</div>
                  <div style={{fontSize:9,color:'var(--g300)',marginTop:1}}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-h"><div className="card-t">🗺️ Ramani ya Mkoa</div><span className="view-all" onClick={()=>nav('/operations/map')}>Live →</span></div>
          <div style={{padding:'14px'}}>
            <div style={{background:'rgba(0,0,0,.3)',borderRadius:'var(--r8)',height:120,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:12,position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(27,94,32,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(27,94,32,.08) 1px,transparent 1px)',backgroundSize:'15px 15px'}} />
              <div style={{position:'relative',textAlign:'center'}}>
                <div style={{fontSize:28}}>🗺️</div>
                <div style={{fontSize:9.5,color:'var(--tm)'}}>Dar es Salaam – Live GPS</div>
              </div>
            </div>
            {DSM_DISTRICTS.slice(0,4).map(d => (
              <div key={d.name} className="heat-row">
                <div className="heat-lbl" style={{minWidth:80,fontSize:10}}>{d.name}</div>
                <div className="heat-bar">
                  <div className="heat-fill" style={{width:`${Math.round(d.officers/312*100)}%`,background:d.color}} />
                </div>
                <div className="heat-cnt">{d.officers}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
