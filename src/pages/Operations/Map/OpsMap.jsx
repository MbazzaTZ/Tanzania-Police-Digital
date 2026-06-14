import { Card, CardHeader, CardBody } from '@components/ui/Card'
import StatCard from '@components/ui/StatCard'
import { MOCK_OFFICERS, MOCK_PATROLS } from '@utils/mockData'
export default function OpsMap() {
  return (
    <div className="animate-fade-in">
      <div className="breadcrumb"><a href="/">🏠</a><span>›</span>Operesheni<span>›</span>Ramani</div>
      <div className="page-header"><div><h1>🗺️ Ramani ya Operesheni</h1><p>GPS tracking ya maafisa na operesheni zote hai</p></div></div>
      <div className="stat-grid stat-grid-4 section-gap">
        <StatCard icon="👮" value={1247} label="Maafisa Hai"    delta="5%" color="green" />
        <StatCard icon="🚔" value={89}   label="Doria Zinazoendelea" delta="3%" color="amber" />
        <StatCard icon="🚧" value={12}   label="Vizuizi Hai"   color="red" />
        <StatCard icon="⛽" value={34}   label="Checkpoints"   delta="8%" />
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr',gap:16}}>
        <Card>
          <CardHeader title="🗺️ Ramani ya Moja kwa Moja" subtitle="Tanzania – GPS Tracking" />
          <CardBody>
            <div style={{background:'var(--clr-dark)',borderRadius:'var(--r)',height:400,position:'relative',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(46,125,50,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(46,125,50,.1) 1px,transparent 1px)',backgroundSize:'30px 30px'}} />
              {MOCK_OFFICERS.filter(o=>o.online).map((o,i) => (
                <div key={o.id} style={{position:'absolute',width:12,height:12,borderRadius:'50%',background:'var(--clr-accent)',boxShadow:'0 0 0 3px rgba(255,193,7,.3)',top:`${20+i*20}%`,left:`${30+i*15}%`,cursor:'pointer'}} title={o.name} />
              ))}
              <div style={{position:'relative',textAlign:'center',color:'var(--clr-muted)'}}>
                <div style={{fontSize:48,marginBottom:8}}>🇹🇿</div>
                <div style={{fontSize:12}}>Tanzania Police · Live GPS Map</div>
                <div style={{fontSize:10,marginTop:4,color:'var(--clr-accent)'}}>Mapbox/Google Maps itaunganishwa Sprint 2</div>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="👮 Maafisa Wanafanya Doria" subtitle="Wanaoitumia GPS sasa" />
          <CardBody>
            {MOCK_PATROLS.map(p => (
              <div key={p.id} style={{padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                  <div style={{fontSize:12,fontWeight:600,color:'var(--clr-white)'}}>{p.officer}</div>
                  <span className="status s-active" style={{fontSize:9}}>Hai</span>
                </div>
                <div style={{fontSize:10,color:'var(--clr-muted)'}}>{p.route}</div>
                <div style={{fontSize:10,color:'var(--clr-muted)',marginTop:2}}>Kituo: {p.station} · Anza: {p.start}</div>
                <div style={{fontSize:9,fontFamily:'var(--font-mono)',color:'var(--clr-accent)',marginTop:2}}>GPS: {p.gps.lat}, {p.gps.lng}</div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
