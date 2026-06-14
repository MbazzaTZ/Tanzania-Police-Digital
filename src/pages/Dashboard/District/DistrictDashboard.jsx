import Breadcrumb from '@components/ui/Breadcrumb'
import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Button from '@components/ui/Button'
export default function Page() {
  return (
    <div className="afd">
      <div className="bc"><a href="/">🏠</a><span>›</span>Dashibodi ya Wilaya</div>
      <div className="ph">
        <div><h1>🏛️ Dashibodi ya Wilaya</h1><p>Muhtasari wa wilaya – vituo na shughuli zake</p></div>
        <div className="flex g8"><Button variant="o">⬇ Pakua</Button><Button variant="g">+ Mpya</Button></div>
      </div>
      <div className="stats-row s4 mb-sec">
        <StatCard icon="📊" value={0} label="Jumla" delta="5%" color="green" />
        <StatCard icon="⏳" value={0} label="Hai" delta="3%" color="amber" />
        <StatCard icon="🚨" value={0} label="Muhimu" color="red" />
        <StatCard icon="✅" value={0} label="Imekamilika" delta="8%" />
      </div>
      <Card><CardHeader title="🏛️ Dashibodi ya Wilaya" /><CardBody>
        <div className="ibox" style={{marginBottom:16}}>ℹ️ Module hii itaunganishwa na Supabase katika Sprint 2. Muundo kamili wa database uko tayari.</div>
        <div style={{textAlign:'center',padding:40,color:'var(--text-muted)'}}>
          <div style={{fontSize:48,marginBottom:12}}>🏛️</div>
          <div style={{fontSize:14,fontWeight:600,color:'var(--text-white)',marginBottom:6}}>Dashibodi ya Wilaya</div>
          <div style={{fontSize:12,maxWidth:400,margin:'0 auto'}}>Muhtasari wa wilaya – vituo na shughuli zake</div>
        </div>
      </CardBody></Card>
    </div>
  )
}
