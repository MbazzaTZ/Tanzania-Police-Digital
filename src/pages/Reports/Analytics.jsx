import Breadcrumb from '@components/ui/Breadcrumb'
import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
export default function Page() {
  return (
    <div className="afd">
      <Breadcrumb items={[{label:'🏠',href:'/'},{label:'Ripoti'},{label:'Analytics'}]} />
      <div className="ph">
        <div><h1>📉 Takwimu / Analytics</h1><p>Module hii itaunganishwa na Supabase backend katika Sprint 2</p></div>
        <div className="flex g8">
          <button className="btn btn-o">⬇ Pakua</button>
          <button className="btn btn-g">+ Mpya</button>
        </div>
      </div>
      <div className="stats-row s4 mb-sec">
        <StatCard icon="📊" value={128} label="Jumla" delta="5%" color="green" />
        <StatCard icon="⏳" value={47}  label="Hai / Active" delta="3%" color="amber" />
        <StatCard icon="🚨" value={5}   label="Muhimu" delta="1" deltaUp={false} color="red" />
        <StatCard icon="✅" value={76}  label="Imekamilika" delta="8%" />
      </div>
      <Card>
        <CardHeader title="📉 Takwimu / Analytics" />
        <CardBody>
          <div className="ibox" style={{marginBottom:16}}>ℹ️ Module hii itaunganishwa na Supabase backend katika Sprint 2.</div>
          <div style={{textAlign:'center',padding:'40px',color:'var(--text-muted)'}}>
            <div style={{fontSize:48,marginBottom:12}}>🔧</div>
            <div style={{fontSize:14,fontWeight:600,color:'var(--text-white)',marginBottom:6}}>Takwimu / Analytics</div>
            <div style={{fontSize:12}}>Sprint 2 – Supabase Integration</div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
