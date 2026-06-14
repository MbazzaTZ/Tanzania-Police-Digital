import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MOCK_PATROLS, MOCK_ALERTS, MOCK_OFFICERS } from '@utils/mockData'

const ALERT_CFG = {
  critical:{dot:'#EF5350',cls:'a-critical',lbl:'Muhimu'},
  urgent:  {dot:'#FF7043',cls:'a-urgent',  lbl:'Haraka'},
  info:    {dot:'#64B5F6',cls:'a-info',    lbl:'Taarifa'},
}

// Mock GPS officer positions
const OFFICER_PINS = [
  {id:1,name:'Insp. J.M. Khamis', rank:'Inspector',  top:'35%',left:'45%', online:true,  type:'patrol'},
  {id:2,name:'Sgt. A. Suleiman',  rank:'Sergeant',   top:'48%',left:'38%', online:true,  type:'citation'},
  {id:3,name:'ASP F.R. Kimaro',   rank:'ASP',        top:'28%',left:'55%', online:true,  type:'arrest'},
  {id:4,name:'Cpl. H. Mwinyi',    rank:'Corporal',   top:'60%',left:'42%', online:false, type:'patrol'},
  {id:5,name:'Insp. M. Hassan',   rank:'Inspector',  top:'42%',left:'62%', online:true,  type:'checkpoint'},
]

const PIN_COLORS = {patrol:'#1B5E20', citation:'#FFC107', arrest:'#C62828', checkpoint:'#1565C0'}

export default function OpsMap() {
  const nav = useNavigate()
  const [selectedPin, setSelectedPin] = useState(null)
  const [layer, setLayer] = useState('officers')

  return (
    <div className="afd">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
        <div>
          <h1 style={{fontSize:19,fontWeight:800,color:'var(--tw)'}}>🗺️ Ramani ya Operesheni</h1>
          <p style={{fontSize:11.5,color:'var(--tm)',marginTop:2}}>GPS Tracking ya Maafisa na Operesheni Zote Hai</p>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-gh btn-sm">📥 Pakua</button>
          <button className="btn btn-g btn-sm" onClick={()=>nav('/operations/patrol')}>+ Anza Doria</button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-row s4 mb-sec">
        {[
          {ic:'👮',cls:'ic-green', n:89,  lbl:'Maafisa Wanaofanya Doria', delta:'↑ 5%', dcls:'up'},
          {ic:'🚔',cls:'ic-blue',  n:34,  lbl:'Magari ya Doria Hai',      delta:'↑ 3%', dcls:'up'},
          {ic:'🚧',cls:'ic-amber', n:12,  lbl:'Vizuizi Vya Kusimama',     delta:'→ 0',  dcls:'flat'},
          {ic:'⛽',cls:'ic-purple',n:8,   lbl:'Vituo vya Ukaguzi',        delta:'↑ 2',  dcls:'up'},
        ].map(c => (
          <div key={c.lbl} className="scard">
            <div className="scard-top">
              <div className={`scard-icon ${c.cls}`}>{c.ic}</div>
              <div className={`scard-delta ${c.dcls}`}>{c.delta}</div>
            </div>
            <div className="scard-num">{c.n}</div>
            <div className="scard-lbl">{c.lbl}</div>
          </div>
        ))}
      </div>

      <div className="row4 mb-sec">
        {/* MAP */}
        <div className="card" style={{overflow:'hidden'}}>
          {/* Map toolbar */}
          <div style={{padding:'10px 14px',borderBottom:'1px solid var(--b)',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
            <div className="tabs">
              {['officers','alerts','patrols','checkpoints'].map(l => (
                <button key={l} className={`tab ${layer===l?'on':''}`} onClick={()=>setLayer(l)}>
                  {{officers:'👮 Maafisa',alerts:'🚨 Taarifa',patrols:'🚔 Doria',checkpoints:'⛽ Ukaguzi'}[l]}
                </button>
              ))}
            </div>
            <div style={{display:'flex',gap:6}}>
              {[['var(--g300)','Doria'],['var(--gold)','Citation'],['var(--redL)','Kukamata'],['var(--bluL)','Checkpoint']].map(([c,l]) => (
                <span key={l} style={{display:'flex',alignItems:'center',gap:3,fontSize:9.5,color:'var(--tm)'}}>
                  <span style={{width:8,height:8,borderRadius:'50%',background:c,display:'inline-block'}} />{l}
                </span>
              ))}
            </div>
          </div>

          {/* Map canvas */}
          <div style={{position:'relative',height:380,background:'#0A1A0C',overflow:'hidden'}}>
            {/* Grid */}
            <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(26,35,126,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(26,35,126,.06) 1px,transparent 1px)',backgroundSize:'30px 30px'}} />
            {/* Roads simulation */}
            <div style={{position:'absolute',top:'50%',left:0,right:0,height:2,background:'rgba(255,255,255,.06)'}} />
            <div style={{position:'absolute',top:0,bottom:0,left:'50%',width:2,background:'rgba(255,255,255,.06)'}} />
            <div style={{position:'absolute',top:'30%',left:0,right:0,height:1,background:'rgba(255,255,255,.04)',transform:'rotate(-5deg)'}} />
            <div style={{position:'absolute',top:'70%',left:0,right:0,height:1,background:'rgba(255,255,255,.04)',transform:'rotate(3deg)'}} />
            {/* Location label */}
            <div style={{position:'absolute',top:12,left:14,background:'rgba(0,0,0,.6)',borderRadius:'var(--r6)',padding:'4px 10px',fontSize:10,color:'var(--tm)',display:'flex',alignItems:'center',gap:5}}>
              📍 Dar es Salaam, Tanzania
            </div>
            {/* Scale */}
            <div style={{position:'absolute',bottom:12,left:14,fontSize:9,color:'var(--td)'}}>
              <span style={{borderBottom:'1px solid var(--td)',paddingBottom:1,display:'inline-block',width:40,marginRight:3}} />2 km
            </div>
            {/* Officer pins */}
            {OFFICER_PINS.map(p => (
              <div key={p.id} onClick={()=>setSelectedPin(selectedPin?.id===p.id?null:p)}
                style={{position:'absolute',top:p.top,left:p.left,cursor:'pointer',zIndex:10,transform:'translate(-50%,-50%)',transition:'transform .15s'}}
                onMouseEnter={e=>e.currentTarget.style.transform='translate(-50%,-50%) scale(1.2)'}
                onMouseLeave={e=>e.currentTarget.style.transform='translate(-50%,-50%) scale(1)'}>
                <div style={{width:28,height:28,borderRadius:'50%',background:PIN_COLORS[p.type],border:`2px solid ${p.online?'#4CAF50':'#555'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,boxShadow:'0 2px 8px rgba(0,0,0,.5)'}}>
                  {p.online?'👮':'👤'}
                </div>
                {p.online && <div style={{position:'absolute',top:-2,right:-2,width:8,height:8,borderRadius:'50%',background:'#4CAF50',border:'1px solid #0A1A0C'}} />}
              </div>
            ))}
            {/* Selected pin popup */}
            {selectedPin && (
              <div style={{position:'absolute',top:`calc(${selectedPin.top} - 80px)`,left:selectedPin.left,transform:'translateX(-50%)',background:'var(--g750)',border:'1px solid var(--bl)',borderRadius:'var(--r8)',padding:'8px 10px',zIndex:20,minWidth:160,boxShadow:'0 4px 16px rgba(0,0,0,.5)'}}>
                <div style={{fontSize:11,fontWeight:700,color:'var(--tw)',marginBottom:2}}>{selectedPin.name}</div>
                <div style={{fontSize:9.5,color:'var(--tm)'}}>{selectedPin.rank}</div>
                <div style={{fontSize:9.5,marginTop:4,display:'flex',alignItems:'center',gap:4}}>
                  <div style={{width:6,height:6,borderRadius:'50%',background:selectedPin.online?'#4CAF50':'#555'}} />
                  <span style={{color:selectedPin.online?'#66BB6A':'#9E9E9E'}}>{selectedPin.online?'Online':'Offline'}</span>
                  <span style={{marginLeft:4,color:'var(--td)'}}>· {selectedPin.type}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right panel */}
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {/* Active patrols */}
          <div className="card">
            <div className="card-h">
              <div className="card-t">🚔 Doria Zinazoendelea</div>
              <span className="view-all" onClick={()=>nav('/operations/patrol')}>Zote →</span>
            </div>
            {MOCK_PATROLS.map(p => (
              <div key={p.id} style={{padding:'10px 14px',borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
                  <div style={{fontSize:11.5,fontWeight:600,color:'var(--tw)'}}>{p.officer}</div>
                  <span className="pill p-active" style={{fontSize:'8.5px'}}>Hai</span>
                </div>
                <div style={{fontSize:10,color:'var(--tm)',marginBottom:3}}>🛣️ {p.route}</div>
                <div style={{fontSize:10,color:'var(--tm)'}}>🕐 Anza: {p.start}</div>
                <div style={{fontSize:9,fontFamily:'var(--fm)',color:'var(--gold)',marginTop:2}}>📍 {p.gps.lat.toFixed(3)}, {p.gps.lng.toFixed(3)}</div>
              </div>
            ))}
          </div>

          {/* Active alerts */}
          <div className="card">
            <div className="card-h">
              <div className="card-t">🚨 Taarifa Hai</div>
              <span className="view-all" onClick={()=>nav('/operations/alerts')}>Zote →</span>
            </div>
            <div style={{padding:'8px 12px'}}>
              {MOCK_ALERTS.slice(0,3).map(a => {
                const cfg = ALERT_CFG[a.type]
                return (
                  <div key={a.id} className={`alert-item ${cfg.cls}`} style={{marginBottom:4,padding:'7px 10px'}}>
                    <div className="a-dot" style={{background:cfg.dot}} />
                    <div style={{flex:1}}>
                      <div style={{fontSize:11,fontWeight:600,color:'var(--tw)'}}>{a.title}</div>
                      <div style={{fontSize:9.5,color:'var(--td)'}}>{a.time}</div>
                    </div>
                    <span className="a-badge" style={{background:`${cfg.dot}20`,color:cfg.dot}}>{cfg.lbl}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
