import { useNavigate } from 'react-router-dom'
import { useApp } from '@context/AppContext'
import PoliceBadge from '@components/shared/PoliceBadge'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
import { MOCK_DASHBOARD_STATS, MOCK_ALERTS, MOCK_CITATIONS, MOCK_ARRESTS, MOCK_OFFICERS, MOCK_REGIONS_STATS } from '@utils/mockData'
import { ALERT_CONFIG } from '@utils/helpers'

const QUICK = [
  {icon:'🔍',label:'Tafuta Mtu',to:'/management/persons'},
  {icon:'🚗',label:'Tafuta Gari',to:'/management/vehicles'},
  {icon:'📋',label:'Toa Citation',to:'/enforcement/citations/new'},
  {icon:'⛓️',label:'Kukamata',to:'/enforcement/arrests/new'},
  {icon:'📝',label:'Ripoti Tukio',to:'/enforcement/incidents'},
  {icon:'🚗',label:'Ripoti Ajali',to:'/enforcement/accidents'},
  {icon:'🎯',label:'Watuhumiwa',to:'/investigation/wanted'},
  {icon:'👤',label:'Watu Waliopotea',to:'/investigation/missing'},
  {icon:'📁',label:'Kesi Mpya',to:'/investigation/cases'},
  {icon:'📄',label:'PF3 Form',to:'/enforcement/pf3'},
  {icon:'🗺️',label:'Ramani Hai',to:'/operations/map'},
  {icon:'📊',label:'Takwimu',to:'/reports/analytics'},
]

function StatBox({ icon, value, label, delta, up = true, color }) {
  const colors = { green:'var(--green-300)', amber:'var(--gold)', red:'var(--red-light)', blue:'var(--blue-light)' }
  return (
    <div className="stat-card" style={{cursor:'pointer'}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:8}}>
        <div style={{fontSize:24}}>{icon}</div>
        {delta && (
          <span className={`stat-delta ${up?'delta-up':'delta-down'}`}>{up?'↑':'↓'} {delta}</span>
        )}
      </div>
      <div className="stat-num">{typeof value==='number'?value.toLocaleString():value}</div>
      <div className="stat-label" style={{color:color?colors[color]:'var(--text-muted)'}}>{label}</div>
    </div>
  )
}

export default function NationalDashboard() {
  const navigate = useNavigate()
  const { currentOfficer } = useApp()
  const s = MOCK_DASHBOARD_STATS

  return (
    <div className="animate-fade-in">
      {/* Command Banner */}
      <div className="dash-banner">
        <PoliceBadge size={52} />
        <div style={{flex:1}}>
          <div style={{fontSize:11,color:'rgba(255,255,255,.5)',textTransform:'uppercase',letterSpacing:1,marginBottom:2}}>Kituo cha Udhibiti wa Taifa</div>
          <div style={{fontSize:18,fontWeight:800,color:'white',marginBottom:2}}>Jumatatu, 17 Mei 2024 · 10:45 AM</div>
          <div style={{fontSize:11,color:'rgba(255,255,255,.6)'}}>
            Mfumo hai · {s.officersOnline.toLocaleString()} maafisa wanafanya kazi · {s.totalStations} vituo vimeunganishwa · Mikoa {s.regions}
          </div>
        </div>
        <div style={{display:'flex',gap:20,flexShrink:0}}>
          {[[s.officersOnline.toLocaleString(),'Maafisa Hai'],[s.totalStations.toString(),'Vituo'],[s.regions.toString(),'Mikoa'],['99.8%','Upatikanaji']].map(([v,l]) => (
            <div key={l} style={{textAlign:'center'}}>
              <div style={{fontSize:22,fontWeight:800,color:'var(--gold)',fontFamily:"'JetBrains Mono',monospace"}}>{v}</div>
              <div style={{fontSize:9,color:'rgba(255,255,255,.5)',textTransform:'uppercase',letterSpacing:.5,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions – 6 columns × 2 rows = 12 */}
      <div className="quick-grid section-gap" style={{gridTemplateColumns:'repeat(6,1fr)'}}>
        {QUICK.map(q => (
          <div key={q.to} className="quick-action" onClick={() => navigate(q.to)}>
            <div className="quick-icon">{q.icon}</div>
            <div className="quick-label">{q.label}</div>
          </div>
        ))}
      </div>

      {/* Stat Cards */}
      <div className="stat-grid stat-grid-5 section-gap">
        <StatBox icon="📋" value={s.citationsToday}  label="Citations Leo"      delta={s.citationsDelta} color="green" />
        <StatBox icon="⛓️" value={s.arrestsToday}    label="Kukamatwa Leo"      delta={s.arrestsDelta}   color="amber" />
        <StatBox icon="🚨" value={s.criticalAlerts}  label="Matukio Muhimu"     delta={s.alertsDelta}    up={false}    color="red" />
        <StatBox icon="📁" value={s.activeCases}     label="Kesi Zinazoendelea" delta={s.casesDelta}     up={false}    color="blue" />
        <StatBox icon="🚗" value={s.vehiclesChecked} label="Magari Yakaguliwa"  delta={s.vehiclesDelta} />
      </div>

      {/* 2-col: Alerts + Right panel */}
      <div className="row-4 section-gap">
        {/* Alerts */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">🚨 Taarifa za Haraka</div>
              <div className="card-subtitle">Zinaohitaji umakini sasa hivi</div>
            </div>
            <span className="view-all" onClick={() => navigate('/operations/alerts')}>Ona Zote →</span>
          </div>
          <div className="card-body">
            {MOCK_ALERTS.map(a => {
              const cfg = ALERT_CONFIG[a.type]
              return (
                <div key={a.id} className={`alert-row ${a.type}`}>
                  <div className="alert-dot" style={{background:cfg.dot}} />
                  <div style={{flex:1}}>
                    <div className="alert-title">{a.title}</div>
                    <div className="alert-desc">{a.desc}</div>
                    <div className="alert-time">🕐 {a.time}</div>
                  </div>
                  <span className="alert-type-badge" style={{background:`${cfg.dot}20`,color:cfg.dot}}>{cfg.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right column */}
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          {/* Region heatmap */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">🗺️ Uhalifu kwa Mkoa</div>
              <span className="view-all" onClick={() => navigate('/operations/map')}>Ramani →</span>
            </div>
            <div className="card-body">
              <div style={{background:'rgba(0,0,0,.3)',borderRadius:'var(--r)',height:100,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:12,position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(46,125,50,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(46,125,50,.1) 1px,transparent 1px)',backgroundSize:'20px 20px'}} />
                <div style={{position:'relative',textAlign:'center'}}>
                  <div style={{fontSize:24}}>🇹🇿</div>
                  <div style={{fontSize:10,color:'var(--text-muted)'}}>Tanzania · Live Map</div>
                </div>
              </div>
              {MOCK_REGIONS_STATS.map(r => (
                <div key={r.name} style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
                  <div style={{fontSize:10,minWidth:90,color:'var(--text-light)'}}>{r.name}</div>
                  <div style={{flex:1,background:'rgba(0,0,0,.3)',borderRadius:3,height:5}}>
                    <div style={{height:'100%',background:r.color,borderRadius:3,width:`${r.pct}%`,transition:'width .5s'}} />
                  </div>
                  <div style={{fontSize:10,fontFamily:"'JetBrains Mono',monospace",color:'var(--gold)',minWidth:26,textAlign:'right'}}>{r.count}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Officers online */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">👮 Maafisa Wanafanya Kazi</div>
              <span className="view-all" onClick={() => navigate('/management/officers')}>Wote →</span>
            </div>
            <div className="card-body" style={{padding:'8px 14px'}}>
              {MOCK_OFFICERS.map(o => (
                <div key={o.id} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 0',borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                  <div className="officer-avatar" style={{width:26,height:26,fontSize:11}}>👮</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:11,fontWeight:600,color:'var(--text-white)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{o.name}</div>
                    <div style={{fontSize:9,color:'var(--text-muted)'}}>{o.rank} · {o.station}</div>
                  </div>
                  <div style={{width:7,height:7,borderRadius:'50%',background:o.online?'#4CAF50':'#555',flexShrink:0}} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Citations Table */}
      <div className="card section-gap">
        <div className="card-header">
          <div>
            <div className="card-title">📋 Citations za Hivi Karibuni</div>
            <div className="card-subtitle">Leo: {s.citationsToday} citations · TZS {(MOCK_CITATIONS.reduce((a,c)=>a+c.fine,0)/1000000).toFixed(1)}M jumla</div>
          </div>
          <div className="flex gap-8">
            <Button variant="ghost" size="sm">⬇ Pakua</Button>
            <Button variant="gold" size="sm" onClick={() => navigate('/enforcement/citations/new')}>+ Toa Citation</Button>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr>
              <th>#</th><th>Namba ya Citation</th><th>Mtuhumiwa</th>
              <th>Gari</th><th>Makosa</th><th>Afisa</th>
              <th>Tarehe</th><th>Faini (TZS)</th><th>Hali</th><th></th>
            </tr></thead>
            <tbody>
              {MOCK_CITATIONS.map(c => (
                <tr key={c.id} onClick={() => navigate(`/enforcement/citations/${c.id}`)}>
                  <td className="td-mono">{c.num}</td>
                  <td className="td-id">{c.id}</td>
                  <td><div className="td-name">{c.suspect}</div><div className="td-sub">NIDA: {c.nida}</div></td>
                  <td className="td-mono">{c.vehicle}</td>
                  <td style={{fontSize:11}}>{c.offence}</td>
                  <td style={{fontSize:11}}>{c.officer}</td>
                  <td style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10}}>{c.date} {c.time}</td>
                  <td className="td-mono">{c.fine.toLocaleString()}</td>
                  <td><Badge status={c.status} /></td>
                  <td><Button variant="ghost" size="sm">Angalia</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <div className="page-info">Inaonyesha 1–6 ya 4,291</div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/enforcement/citations')}>Ona Zote →</Button>
        </div>
      </div>

      {/* Arrests Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">⛓️ Kukamatwa kwa Hivi Karibuni</div>
            <div className="card-subtitle">Leo: {s.arrestsToday} waliokamatwa</div>
          </div>
          <Button variant="gold" size="sm" onClick={() => navigate('/enforcement/arrests/new')}>+ Kukamata Mpya</Button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr>
              <th>Namba</th><th>Mtuhumiwa</th><th>Makosa</th><th>Aina</th>
              <th>Afisa</th><th>Kituo</th><th>Tarehe</th><th>Hali</th><th></th>
            </tr></thead>
            <tbody>
              {MOCK_ARRESTS.map(a => (
                <tr key={a.id}>
                  <td className="td-id">{a.id}</td>
                  <td><div className="td-name">{a.suspect}</div><div className="td-sub">NIDA: {a.nida}</div></td>
                  <td style={{fontSize:11}}>{a.charges}</td>
                  <td><span style={{fontSize:10,background:'rgba(255,255,255,.06)',padding:'2px 7px',borderRadius:6}}>{a.category}</span></td>
                  <td style={{fontSize:11}}>{a.officer}</td>
                  <td style={{fontSize:11}}>{a.station}</td>
                  <td style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10}}>{a.date}</td>
                  <td><Badge status={a.status} /></td>
                  <td><Button variant="ghost" size="sm">Angalia</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <div className="page-info">Inaonyesha 1–5 ya 47</div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/enforcement/arrests')}>Ona Zote →</Button>
        </div>
      </div>
    </div>
  )
}
