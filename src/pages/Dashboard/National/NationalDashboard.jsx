import { useNavigate } from 'react-router-dom'
import { useApp } from '@context/AppContext'
import StatCard from '@components/ui/StatCard'
import Badge from '@components/ui/Badge'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Button from '@components/ui/Button'
import { MOCK_DASHBOARD_STATS, MOCK_ALERTS, MOCK_CITATIONS, MOCK_ARRESTS, MOCK_OFFICERS, MOCK_REGIONS_STATS } from '@utils/mockData'
import { ALERT_CONFIG, formatTZS } from '@utils/helpers'

const QUICK = [
  {icon:'🔍',label:'Tafuta Mtu',to:'/management/persons'},
  {icon:'🚗',label:'Tafuta Gari',to:'/management/vehicles'},
  {icon:'📋',label:'Toa Citation',to:'/enforcement/citations/new'},
  {icon:'⛓️',label:'Kamata',to:'/enforcement/arrests/new'},
  {icon:'📝',label:'Ripoti Tukio',to:'/enforcement/incidents'},
  {icon:'🚗',label:'Ripoti Ajali',to:'/enforcement/accidents'},
  {icon:'🎯',label:'Watuhumiwa',to:'/investigation/wanted'},
  {icon:'👤',label:'Watu Waliopotea',to:'/investigation/missing'},
  {icon:'📁',label:'Kesi Mpya',to:'/investigation/cases'},
  {icon:'🔒',label:'PF3 Form',to:'/enforcement/pf3'},
  {icon:'📡',label:'Ramani Hai',to:'/operations/map'},
  {icon:'📊',label:'Takwimu',to:'/reports/analytics'},
]

export default function NationalDashboard() {
  const navigate = useNavigate()
  const { currentOfficer } = useApp()
  const s = MOCK_DASHBOARD_STATS

  return (
    <div className="animate-fade-in">
      {/* Banner */}
      <div className="dash-banner" style={{marginBottom:20}}>
        <div style={{background:'rgba(0,0,0,.3)',borderRadius:'var(--r)',padding:'10px 14px',display:'flex',alignItems:'center',gap:10,flexShrink:0}}>
          <div style={{fontSize:28}}>🛡️</div>
          <div>
            <div style={{fontSize:12,fontWeight:700,color:'#fff'}}>KITUO CHA UDHIBITI WA TAIFA</div>
            <div style={{fontSize:10,color:'rgba(255,255,255,.6)'}}>National Command Center · {currentOfficer.role.toUpperCase()}</div>
          </div>
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:18,fontWeight:800,color:'#fff'}}>Jumatatu, 17 Mei 2024</div>
          <div style={{fontSize:11,color:'rgba(255,255,255,.7)',marginTop:2}}>
            Mfumo unafanya kazi vizuri · Maafisa {s.officersOnline.toLocaleString()} wanafanya kazi · Vituo {s.totalStations} vimeunganishwa · Mikoa {s.regions}
          </div>
        </div>
        <div style={{display:'flex',gap:20,flexShrink:0}}>
          {[[s.officersOnline.toLocaleString(),'Maafisa Hai'],[s.totalStations.toString(),'Vituo'],[s.regions.toString(),'Mikoa'],['99.8%','Upatikanaji']].map(([v,l]) => (
            <div key={l} style={{textAlign:'center'}}>
              <div style={{fontSize:22,fontWeight:800,color:'var(--clr-accent)',fontFamily:'var(--font-mono)'}}>{v}</div>
              <div style={{fontSize:9,color:'rgba(255,255,255,.6)',textTransform:'uppercase',letterSpacing:.5}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions - 12 buttons */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:8,marginBottom:20}}>
        {QUICK.map(q => (
          <div key={q.to} onClick={() => navigate(q.to)}
            style={{background:'var(--clr-panel)',border:'1px solid var(--clr-border)',borderRadius:'var(--r)',padding:'10px 8px',textAlign:'center',cursor:'pointer',transition:'var(--transition)'}}
            onMouseEnter={e=>{e.currentTarget.style.background='var(--clr-primary)';e.currentTarget.style.borderColor='var(--clr-secondary)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='var(--clr-panel)';e.currentTarget.style.borderColor='var(--clr-border)'}}>
            <div style={{fontSize:18,marginBottom:4}}>{q.icon}</div>
            <div style={{fontSize:10,fontWeight:500}}>{q.label}</div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="stat-grid stat-grid-5 section-gap">
        <StatCard icon="📋" value={s.citationsToday}  label="Citations Leo"       delta={s.citationsDelta} color="green" />
        <StatCard icon="⛓️" value={s.arrestsToday}    label="Kukamatwa Leo"       delta={s.arrestsDelta}   color="amber" />
        <StatCard icon="🚨" value={s.criticalAlerts}  label="Matukio Muhimu"      delta={s.alertsDelta}    deltaUp={false} color="red" />
        <StatCard icon="📁" value={s.activeCases}     label="Kesi Zinazoendelea"  delta={s.casesDelta}     deltaUp={false} color="blue" />
        <StatCard icon="🚗" value={s.vehiclesChecked} label="Magari Yakaguliwa"   delta={s.vehiclesDelta} />
      </div>

      {/* 3-column layout */}
      <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr',gap:16,marginBottom:20}}>
        {/* Alerts */}
        <Card>
          <CardHeader title="🚨 Taarifa za Haraka" subtitle="Zinaohitaji umakini sasa hivi"
            action={<span className="view-all" onClick={() => navigate('/operations/alerts')}>Ona Zote →</span>} />
          <CardBody>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {MOCK_ALERTS.map(a => {
                const cfg = ALERT_CONFIG[a.type]
                return (
                  <div key={a.id} style={{display:'flex',alignItems:'flex-start',gap:10,padding:'10px 12px',borderRadius:'var(--r)',borderLeft:`3px solid ${cfg.dot}`,background:cfg.bg,cursor:'pointer'}}>
                    <div style={{width:8,height:8,borderRadius:'50%',background:cfg.dot,flexShrink:0,marginTop:4}} />
                    <div style={{flex:1}}>
                      <div style={{fontSize:'11.5px',fontWeight:600,color:'var(--clr-white)'}}>{a.title}</div>
                      <div style={{fontSize:'10.5px',color:'var(--clr-muted)',marginTop:2}}>{a.desc}</div>
                      <div style={{fontSize:'9px',color:'var(--clr-muted)',marginTop:2}}>🕐 {a.time}</div>
                    </div>
                    <span style={{fontSize:9,fontWeight:700,padding:'2px 6px',borderRadius:10,background:`${cfg.dot}22`,color:cfg.dot,flexShrink:0}}>{cfg.label}</span>
                  </div>
                )
              })}
            </div>
          </CardBody>
        </Card>

        {/* Region Heatmap */}
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <Card>
            <CardHeader title="🗺️ Uhalifu kwa Mkoa" action={<span className="view-all" onClick={() => navigate('/operations/map')}>Ramani →</span>} />
            <CardBody>
              <div style={{background:'var(--clr-dark)',borderRadius:'var(--r)',height:100,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:12,position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(46,125,50,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(46,125,50,.1) 1px,transparent 1px)',backgroundSize:'20px 20px'}} />
                <div style={{position:'relative',fontSize:11,color:'var(--clr-muted)'}}>🇹🇿 Tanzania</div>
              </div>
              {MOCK_REGIONS_STATS.map(r => (
                <div key={r.name} style={{display:'flex',alignItems:'center',gap:8,marginBottom:5}}>
                  <div style={{fontSize:10,minWidth:100,color:'var(--clr-text)'}}>{r.name}</div>
                  <div style={{flex:1,background:'var(--clr-dark)',borderRadius:3,height:5}}>
                    <div style={{height:'100%',background:r.color,borderRadius:3,width:`${r.pct}%`}} />
                  </div>
                  <div style={{fontSize:10,fontFamily:'var(--font-mono)',color:'var(--clr-accent)',minWidth:28,textAlign:'right'}}>{r.count}</div>
                </div>
              ))}
            </CardBody>
          </Card>

          {/* Officers Online */}
          <Card>
            <CardHeader title="👮 Maafisa Wanafanya Kazi" action={<span className="view-all" onClick={() => navigate('/management/officers')}>Wote →</span>} />
            <CardBody>
              {MOCK_OFFICERS.map(o => (
                <div key={o.id} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 0',borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                  <div style={{width:26,height:26,borderRadius:'50%',background:'var(--clr-primary)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11}}>👮</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:11,fontWeight:600,color:'var(--clr-white)'}}>{o.name}</div>
                    <div style={{fontSize:9,color:'var(--clr-muted)'}}>{o.rank} · {o.station}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:9,color:o.online?'#66BB6A':'#9E9E9E'}}>● {o.online?'Hai':'Nje'}</div>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Citations Table */}
      <Card style={{marginBottom:20}}>
        <CardHeader title="📋 Citations za Hivi Karibuni" subtitle={`Leo: ${s.citationsToday} citations`}
          action={<div className="flex gap-8"><Button variant="outline" size="sm">⬇ Pakua</Button><Button variant="accent" size="sm" onClick={() => navigate('/enforcement/citations/new')}>+ Toa Citation</Button></div>} />
        <CardBody noPadding>
          <div className="table-wrap">
            <table>
              <thead><tr><th>#</th><th>Namba ya Citation</th><th>Mtuhumiwa</th><th>Gari</th><th>Makosa</th><th>Tarehe</th><th>Faini (TZS)</th><th>Hali</th><th></th></tr></thead>
              <tbody>
                {MOCK_CITATIONS.map(c => (
                  <tr key={c.id}>
                    <td className="td-mono">{c.num}</td>
                    <td className="td-mono">{c.id}</td>
                    <td><div className="td-name">{c.suspect}</div><div className="td-sub">NIDA: {c.nida}</div></td>
                    <td className="td-mono">{c.vehicle}</td>
                    <td style={{fontSize:11}}>{c.offence}</td>
                    <td style={{fontFamily:'var(--font-mono)',fontSize:10}}>{c.date}</td>
                    <td className="td-mono">{c.fine.toLocaleString()}</td>
                    <td><Badge status={c.status} /></td>
                    <td><Button variant="outline" size="sm" onClick={() => navigate(`/enforcement/citations/${c.id}`)}>Angalia</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{padding:'12px 16px',display:'flex',justifyContent:'space-between',borderTop:'1px solid var(--clr-border)'}}>
            <div style={{fontSize:11,color:'var(--clr-muted)'}}>Inaonyesha 1–6 ya 4,291</div>
            <Button variant="outline" size="sm" onClick={() => navigate('/enforcement/citations')}>Ona Zote →</Button>
          </div>
        </CardBody>
      </Card>

      {/* Arrests Table */}
      <Card>
        <CardHeader title="⛓️ Kukamatwa kwa Hivi Karibuni" subtitle={`Leo: ${s.arrestsToday} waliokamatwa`}
          action={<Button variant="accent" size="sm" onClick={() => navigate('/enforcement/arrests/new')}>+ Rekodi ya Kukamata</Button>} />
        <CardBody noPadding>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Namba</th><th>Mtuhumiwa</th><th>Makosa</th><th>Afisa</th><th>Kituo</th><th>Tarehe</th><th>Hali</th><th></th></tr></thead>
              <tbody>
                {MOCK_ARRESTS.map(a => (
                  <tr key={a.id}>
                    <td className="td-mono">{a.id}</td>
                    <td><div className="td-name">{a.suspect}</div><div className="td-sub">NIDA: {a.nida}</div></td>
                    <td style={{fontSize:11}}>{a.charges} · <span style={{color:'var(--clr-muted)',fontSize:10}}>{a.category}</span></td>
                    <td style={{fontSize:11}}>{a.officer}</td>
                    <td style={{fontSize:11}}>{a.station}</td>
                    <td style={{fontFamily:'var(--font-mono)',fontSize:10}}>{a.date}</td>
                    <td><Badge status={a.status} /></td>
                    <td><Button variant="outline" size="sm">Angalia</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{padding:'12px 16px',display:'flex',justifyContent:'flex-end',borderTop:'1px solid var(--clr-border)'}}>
            <Button variant="outline" size="sm" onClick={() => navigate('/enforcement/arrests')}>Ona Zote →</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
