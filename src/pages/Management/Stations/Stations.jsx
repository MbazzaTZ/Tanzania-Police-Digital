import Breadcrumb from '@components/ui/Breadcrumb'
import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
export default function Page() {
  return (
    <div className="animate-fade-in">
      <Breadcrumb items={[{label:'🏠',href:'/'},{label:'Usimamizi'},{label:'Vituo'}]} />
      <div className="page-header">
        <div><h1>🏢 Vituo / Stations</h1><p>Module hii itaunganishwa na Supabase backend katika Sprint 2</p></div>
        <div className="flex gap-8">
          <button className="btn btn-outline">⬇ Pakua</button>
          <button className="btn btn-accent">+ Mpya</button>
        </div>
      </div>
      <div className="stat-grid stat-grid-4 section-gap">
        <StatCard icon="📊" value={128} label="Jumla" delta="5%" color="green" />
        <StatCard icon="⏳" value={47}  label="Hai / Active" delta="3%" color="amber" />
        <StatCard icon="🚨" value={5}   label="Muhimu" delta="1" deltaUp={false} color="red" />
        <StatCard icon="✅" value={76}  label="Imekamilika" delta="8%" />
      </div>
      <Card>
        <CardHeader title="🏢 Vituo / Stations" />
        <CardBody>
          <div className="info-box" style={{marginBottom:16}}>ℹ️ Module hii itaunganishwa na Supabase backend katika Sprint 2.</div>
          <div style={{textAlign:'center',padding:'40px',color:'var(--clr-muted)'}}>
            <div style={{fontSize:48,marginBottom:12}}>🔧</div>
            <div style={{fontSize:14,fontWeight:600,color:'var(--clr-white)',marginBottom:6}}>Vituo / Stations</div>
            <div style={{fontSize:12}}>Sprint 2 – Supabase Integration</div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
