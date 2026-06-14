import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Button from '@components/ui/Button'
export default function Page() {
  const icon='🚔'
  return (
    <div className="animate-fade-in">
      <div className="breadcrumb"><a href="/">🏠</a><span>›</span>🚔 Doria / Patrol</div>
      <div className="page-header">
        <div><h1>🚔 Doria / Patrol</h1><p>GPS tracking ya maafisa wanaofanya doria</p></div>
        <div className="flex gap-8"><Button variant="outline">⬇ Pakua</Button><Button variant="accent">+ Mpya</Button></div>
      </div>
      <div className="stat-grid stat-grid-4 section-gap">
        <StatCard icon="📊" value={0} label="Jumla" color="blue" />
        <StatCard icon="✅" value={0} label="Amilifu" color="green" />
        <StatCard icon="⏳" value={0} label="Inasubiri" color="amber" />
        <StatCard icon="🚨" value={0} label="Muhimu" color="red" />
      </div>
      <Card>
        <CardHeader title="🚔 Doria / Patrol" />
        <CardBody>
          <div className="info-box" style={{marginBottom:20}}>ℹ️ Module hii itaunganishwa na Supabase katika Sprint 2. Schema ya database iko tayari (supabaseSchema.sql).</div>
          <div style={{textAlign:'center',padding:40,color:'var(--text-muted)'}}>
            <div style={{fontSize:48,marginBottom:12}}>🚔</div>
            <div style={{fontSize:14,fontWeight:600,color:'var(--text-white)',marginBottom:6}}>🚔 Doria / Patrol</div>
            <div style={{fontSize:12,maxWidth:360,margin:'0 auto'}}>GPS tracking ya maafisa wanaofanya doria</div>
            <div style={{fontSize:10,marginTop:8,color:'var(--gold)'}}>Sprint 2 – Supabase Live Integration</div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
