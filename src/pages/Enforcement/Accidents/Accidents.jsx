import Breadcrumb from '@components/ui/Breadcrumb'
import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Button from '@components/ui/Button'
export default function Page() {
  return (
    <div className="animate-fade-in">
      <div className="breadcrumb"><a href="/">🏠</a><span>›</span>Ajali / Accidents</div>
      <div className="page-header">
        <div><h1>🚗 Ajali / Accidents</h1><p>Ripoti za ajali za barabarani</p></div>
        <div className="flex gap-8"><Button variant="outline">⬇ Pakua</Button><Button variant="accent">+ Mpya</Button></div>
      </div>
      <div className="stat-grid stat-grid-4 section-gap">
        <StatCard icon="📊" value={0} label="Jumla" delta="5%" color="green" />
        <StatCard icon="⏳" value={0} label="Hai" delta="3%" color="amber" />
        <StatCard icon="🚨" value={0} label="Muhimu" color="red" />
        <StatCard icon="✅" value={0} label="Imekamilika" delta="8%" />
      </div>
      <Card><CardHeader title="🚗 Ajali / Accidents" /><CardBody>
        <div className="info-box" style={{marginBottom:16}}>ℹ️ Module hii itaunganishwa na Supabase katika Sprint 2. Muundo kamili wa database uko tayari.</div>
        <div style={{textAlign:'center',padding:40,color:'var(--clr-muted)'}}>
          <div style={{fontSize:48,marginBottom:12}}>🚗</div>
          <div style={{fontSize:14,fontWeight:600,color:'var(--clr-white)',marginBottom:6}}>Ajali / Accidents</div>
          <div style={{fontSize:12,maxWidth:400,margin:'0 auto'}}>Ripoti za ajali za barabarani</div>
        </div>
      </CardBody></Card>
    </div>
  )
}
