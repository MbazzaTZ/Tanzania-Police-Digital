import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import StatCard   from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Badge      from '@components/ui/Badge'
import { MOCK_DASHBOARD_STATS, MOCK_ALERTS, MOCK_CITATIONS, MOCK_REGIONS_STATS } from '@utils/mockData'
import { formatTZS, ALERT_CONFIG } from '@utils/helpers'

const QUICK_ACTIONS = [
  { icon:'🔍', label:'Tafuta Mtu',      to:'/management/persons' },
  { icon:'🚗', label:'Tafuta Gari',     to:'/management/vehicles' },
  { icon:'📋', label:'Toa Citation',    to:'/enforcement/citations/new' },
  { icon:'⛓️', label:'Kamata',          to:'/enforcement/arrests' },
  { icon:'📝', label:'Ripoti Tukio',    to:'/enforcement/incidents' },
  { icon:'🎯', label:'Watuhumiwa',      to:'/investigation/wanted' },
  { icon:'📡', label:'Operesheni Hai',  to:'/operations/map' },
  { icon:'📊', label:'Takwimu',         to:'/reports/analytics' },
]

export default function Dashboard() {
  const navigate   = useNavigate()
  const s          = MOCK_DASHBOARD_STATS
  const alerts     = MOCK_ALERTS.slice(0, 5)
  const citations  = MOCK_CITATIONS.slice(0, 6)

  return (
    <div className="afd">
      {/* Banner */}
      <div className="dash-banner" style={{ marginBottom: 20 }}>
        <div style={{ background:'rgba(0,0,0,.3)', borderRadius:'var(--r)', padding:'10px 14px', display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
          <div style={{ fontSize:28 }}>🛡️</div>
          <div>
            <div style={{ fontSize:12, fontWeight:700, color:'#fff' }}>KITUO CHA UDHIBITI</div>
            <div style={{ fontSize:10, color:'rgba(255,255,255,.6)' }}>National Command Center</div>
          </div>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:18, fontWeight:800, color:'#fff' }}>Jumatatu, 17 Mei 2024</div>
          <div style={{ fontSize:11, color:'rgba(255,255,255,.7)', marginTop:2 }}>
            Mfumo unafanya kazi vizuri · Maafisa 1,247 wanafanya kazi · Vituo 312 vimeunganishwa
          </div>
        </div>
        <div style={{ display:'flex', gap:24 }}>
          {[['1,247','Maafisa Hai'],['312','Vituo'],['26','Mikoa'],['99.8%','Upatikanaji']].map(([v,l]) => (
            <div key={l} style={{ textAlign:'center' }}>
              <div style={{ fontSize:22, fontWeight:800, color:'var(--gold)', fontFamily:'var(--font-mono)' }}>{v}</div>
              <div style={{ fontSize:9, color:'rgba(255,255,255,.6)', textTransform:'uppercase', letterSpacing:.5 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(8,1fr)', gap:8, marginBottom:20 }}>
        {QUICK_ACTIONS.map(qa => (
          <div key={qa.to} onClick={() => navigate(qa.to)}
            style={{ background:'var(--green-700)', border:'1px solid var(--border)', borderRadius:'var(--r)', padding:'10px 8px', textAlign:'center', cursor:'pointer', transition:'var(--t)' }}
            onMouseEnter={e => { e.currentTarget.style.background='var(--green-600)'; e.currentTarget.style.borderColor='var(--green-500)' }}
            onMouseLeave={e => { e.currentTarget.style.background='var(--green-700)'; e.currentTarget.style.borderColor='var(--border)' }}>
            <div style={{ fontSize:20, marginBottom:4 }}>{qa.icon}</div>
            <div style={{ fontSize:10, fontWeight:500 }}>{qa.label}</div>
          </div>
        ))}
      </div>

      {/* Stat Cards */}
      <div className="stats-row s5 mb-sec">
        <StatCard icon="📋" value={s.citationsToday} label="Citations Leo" delta={s.citationsDelta} color="green" />
        <StatCard icon="⛓️" value={s.arrestsToday}   label="Kukamatwa Leo" delta={s.arrestsDelta} color="amber" />
        <StatCard icon="🚨" value={s.criticalAlerts}  label="Matukio Muhimu" delta={s.alertsDelta} deltaUp={false} color="red" />
        <StatCard icon="📁" value={s.activeCases}     label="Kesi Hai" delta={s.casesDelta} deltaUp={false} color="blue" />
        <StatCard icon="🚗" value={s.vehiclesChecked} label="Magari Yakaguliwa" delta={s.vehiclesDelta} />
      </div>

      {/* Main Row */}
      <div className="row row-4" style={{ marginBottom:20 }}>
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {/* Alerts */}
          <Card>
            <CardHeader title="🚨 Taarifa za Haraka / Active Alerts" subtitle="Zinaohitaji umakini sasa hivi"
              action={<span className="view-all" onClick={() => navigate('/operations/alerts')}>Ona Zote →</span>} />
            <CardBody>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {alerts.map(alert => {
                  const cfg = ALERT_CONFIG[alert.type]
                  return (
                    <div key={alert.id} className={`alert-item ${alert.type}`} style={{ background:cfg.bg }}>
                      <div style={{ width:8, height:8, borderRadius:'50%', background:cfg.dot, flexShrink:0, marginTop:4 }} />
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:'11.5px', fontWeight:600, color:'var(--text-white)' }}>{alert.title}</div>
                        <div style={{ fontSize:'10.5px', color:'var(--text-muted)', marginTop:2 }}>{alert.desc}</div>
                        <div style={{ fontSize:'9px', color:'var(--text-muted)', marginTop:2, opacity:.7 }}>🕐 {alert.time}</div>
                      </div>
                      <span style={{ fontSize:9, fontWeight:700, padding:'2px 6px', borderRadius:10, textTransform:'uppercase', background:`${cfg.dot}22`, color:cfg.dot, flexShrink:0 }}>{cfg.label}</span>
                    </div>
                  )
                })}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right: Region heatmap + Officers */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <Card>
            <CardHeader title="🗺️ Ramani ya Uhalifu" subtitle="Makao ya uhalifu kwa mkoa"
              action={<span className="view-all" onClick={() => navigate('/operations/map')}>Ramani →</span>} />
            <CardBody>
              <div style={{ background:'var(--green-900)', borderRadius:'var(--r)', height:120, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:12, position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(46,125,50,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(46,125,50,.1) 1px,transparent 1px)', backgroundSize:'30px 30px' }} />
                <span style={{ fontSize:11, color:'var(--text-muted)', position:'relative' }}>Tanzania · Ramani ya Shughuli</span>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                {MOCK_REGIONS_STATS.map(r => (
                  <div key={r.name} style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ fontSize:11, fontWeight:500, minWidth:90 }}>{r.name}</div>
                    <div style={{ flex:1, background:'var(--green-900)', borderRadius:3, height:6, overflow:'hidden' }}>
                      <div style={{ height:'100%', background:r.color, borderRadius:3, width:`${r.pct}%` }} />
                    </div>
                    <div style={{ fontSize:10, fontFamily:'var(--font-mono)', color:'var(--gold)', minWidth:28, textAlign:'right' }}>{r.count}</div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Citations Table */}
      <Card style={{ marginBottom:20 }}>
        <CardHeader title="📋 Citations za Hivi Karibuni" subtitle={`Leo: ${s.citationsToday} citations`}
          action={
            <div style={{ display:'flex', gap:8 }}>
              <button className="btn btn-o btn-sm">⬇ Pakua</button>
              <button className="btn btn-g btn-sm" onClick={() => navigate('/enforcement/citations/new')}>+ Toa Citation Mpya</button>
            </div>
          } />
        <CardBody noPadding>
          <div className="tw">
            <table>
              <thead><tr>
                <th>#</th><th>Namba ya Citation</th><th>Mtuhumiwa</th>
                <th>Gari</th><th>Makosa</th><th>Tarehe</th><th>Faini (TZS)</th><th>Hali</th><th></th>
              </tr></thead>
              <tbody>
                {citations.map(c => (
                  <tr key={c.id}>
                    <td className="td-mo">{c.num}</td>
                    <td className="td-mo" style={{ color:'var(--gold)' }}>{c.id}</td>
                    <td><div className="td-nm">{c.suspect}</div><div className="td-sub">NIDA: {c.nida}</div></td>
                    <td className="td-mo">{c.vehicle}</td>
                    <td style={{ fontSize:11 }}>{c.offence}</td>
                    <td style={{ fontFamily:'var(--font-mono)', fontSize:10 }}>{c.date} {c.time}</td>
                    <td className="td-mo">{c.fine.toLocaleString()}</td>
                    <td><Badge status={c.status} /></td>
                    <td><button className="btn btn-o btn-sm" onClick={() => navigate(`/enforcement/citations/${c.id}`)}>Angalia</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid var(--border)' }}>
            <div style={{ fontSize:11, color:'var(--text-muted)' }}>Inaonyesha 1–6 ya matokeo 4,291</div>
            <button className="btn btn-o btn-sm" onClick={() => navigate('/enforcement/citations')}>Ona Zote →</button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
