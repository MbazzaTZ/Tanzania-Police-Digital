import { useNavigate } from 'react-router-dom'
import PoliceBadge from '@components/shared/PoliceBadge'
import { MOCK_OFFICERS, MOCK_INCIDENTS } from '@utils/mockData'

const STATIONS = [
  {name:'Oysterbay PS',  officers:68, active:52, citations:47, arrests:8,  status:'active'},
  {name:'Kariakoo PS',   officers:54, active:41, citations:32, arrests:6,  status:'active'},
  {name:'Kinondoni PS',  officers:61, active:48, citations:28, arrests:5,  status:'active'},
  {name:'Mwananyamala PS',officers:43,active:35, citations:12, arrests:3,  status:'active'},
  {name:'Msasani PS',    officers:38, active:29, citations:8,  arrests:1,  status:'active'},
  {name:'Mikocheni PS',  officers:48, active:37, citations:22, arrests:4,  status:'active'},
]

export default function DistrictDashboard() {
  const nav = useNavigate()
  return (
    <div className="afd">
      <div style={{background:'linear-gradient(135deg,#080C1A,#1a237e)',borderRadius:'var(--r16)',padding:'18px 22px',marginBottom:16,display:'flex',gap:16,alignItems:'center'}}>
        <PoliceBadge size={50} />
        <div style={{flex:1}}>
          <div style={{fontSize:9,color:'rgba(255,255,255,.5)',textTransform:'uppercase',letterSpacing:1,marginBottom:2}}>DASHIBODI YA WILAYA</div>
          <div style={{fontSize:18,fontWeight:800,color:'white',marginBottom:2}}>Wilaya ya Kinondoni</div>
          <div style={{fontSize:11,color:'rgba(255,255,255,.6)'}}>Vituo 6 · Maafisa 312 · Kinondoni, Dar es Salaam</div>
        </div>
        <div style={{display:'flex',gap:16,flexShrink:0}}>
          {[['312','Maafisa'],['6','Vituo'],['149','Citations Leo'],['22','Kukamatwa']].map(([v,l]) => (
            <div key={l} style={{textAlign:'center'}}>
              <div style={{fontSize:22,fontWeight:800,color:'var(--gold)',fontFamily:'var(--fm)',lineHeight:1}}>{v}</div>
              <div style={{fontSize:9,color:'rgba(255,255,255,.5)',textTransform:'uppercase',letterSpacing:.4,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-row s4 mb-sec">
        {[
          {ic:'🏢',cls:'ic-green', n:6,   lbl:'Vituo Vilivyo Hai',    delta:'↑ 0',   dcls:'flat'},
          {ic:'📋',cls:'ic-blue',  n:149,  lbl:'Citations Leo',        delta:'↑ 11%', dcls:'up'},
          {ic:'⛓️',cls:'ic-amber', n:22,   lbl:'Kukamatwa Leo',        delta:'↑ 5%',  dcls:'up'},
          {ic:'🚨',cls:'ic-red',   n:3,    lbl:'Matukio Yanayosubiri', delta:'↓ 2',   dcls:'down'},
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

      {/* Stations table */}
      <div className="card mb-sec">
        <div className="card-h">
          <div><div className="card-t">🏢 Vituo vya Wilaya ya Kinondoni</div><div className="card-st">Hali ya vituo vyote kwa wakati halisi</div></div>
          <button className="btn btn-g btn-sm" onClick={()=>nav('/management/stations')}>Simamia Vituo →</button>
        </div>
        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr>
              <th>Kituo</th><th>Maafisa Jumla</th><th>Wanaofanya Kazi</th><th>Citations Leo</th><th>Kukamatwa</th><th>Hali</th><th></th>
            </tr></thead>
            <tbody>
              {STATIONS.map(s => (
                <tr key={s.name}>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <div style={{fontSize:14}}>🏢</div>
                      <div>
                        <div style={{fontWeight:600,color:'var(--tw)',fontSize:12}}>{s.name}</div>
                        <div style={{fontSize:9.5,color:'var(--tm)'}}>Kinondoni · Dar es Salaam</div>
                      </div>
                    </div>
                  </td>
                  <td className="td-mo">{s.officers}</td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:6}}>
                      <div style={{flex:1,background:'rgba(0,0,0,.3)',borderRadius:3,height:4,maxWidth:60}}>
                        <div style={{height:'100%',background:'var(--g400)',borderRadius:3,width:`${Math.round(s.active/s.officers*100)}%`}} />
                      </div>
                      <span className="td-mo">{s.active}</span>
                    </div>
                  </td>
                  <td className="td-mo" style={{color:'var(--gold)'}}>{s.citations}</td>
                  <td className="td-mo" style={{color:'var(--redL)'}}>{s.arrests}</td>
                  <td><span className="pill p-active">Hai</span></td>
                  <td>
                    <button className="btn btn-gh btn-sm" onClick={()=>nav('/dashboard/station')}>Angalia</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pag">
          <div className="pag-info">Vituo 6 vya 6 vinaonyeshwa · Kinondoni District</div>
          <button className="btn btn-gh btn-sm" onClick={()=>nav('/management/stations')}>Vituo Vyote →</button>
        </div>
      </div>

      {/* Performance */}
      <div className="row4 mb-sec">
        <div className="card">
          <div className="card-h"><div className="card-t">📊 Utendaji wa Wilaya</div></div>
          <div style={{padding:'14px'}}>
            {[
              {lbl:'Oysterbay PS', pct:87, c:'#1B5E20'},
              {lbl:'Kariakoo PS',  pct:76, c:'#2E7D32'},
              {lbl:'Kinondoni PS', pct:79, c:'#388E3C'},
              {lbl:'Mwananyamala', pct:65, c:'#FFC107'},
              {lbl:'Msasani PS',   pct:58, c:'#FF7043'},
              {lbl:'Mikocheni PS', pct:72, c:'#2E7D32'},
            ].map(b => (
              <div key={b.lbl} className="heat-row">
                <div className="heat-lbl" style={{fontSize:10,minWidth:100}}>{b.lbl}</div>
                <div className="heat-bar">
                  <div className="heat-fill" style={{width:`${b.pct}%`,background:b.c}} />
                </div>
                <div style={{fontSize:10,fontFamily:'var(--fm)',color:b.c,minWidth:34,textAlign:'right'}}>{b.pct}%</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-h"><div className="card-t">👮 OCD na Maafisa Wakuu</div></div>
          <div style={{padding:'10px 14px'}}>
            {[
              {name:'SSP John M. Msigwa', rank:'OCD Kinondoni', id:'TP001234', online:true},
              {name:'SP Amina K. Said',   rank:'Deputy OCD',    id:'TP002345', online:true},
              {name:'ASP Peter Mwangi',   rank:'CID Incharge',  id:'TP003456', online:false},
              {name:'Insp. Saidi Hassan', rank:'Traffic Insp.', id:'TP004567', online:true},
            ].map(o => (
              <div key={o.id} style={{display:'flex',alignItems:'center',gap:8,padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                <div className="sb-av" style={{width:30,height:30,fontSize:13}}>👮</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:11,fontWeight:600,color:'var(--tw)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{o.name}</div>
                  <div style={{fontSize:9.5,color:'var(--tm)'}}>{o.rank} · {o.id}</div>
                </div>
                <div style={{width:7,height:7,borderRadius:'50%',background:o.online?'#4CAF50':'#555',flexShrink:0}} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
