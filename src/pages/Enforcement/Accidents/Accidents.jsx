import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Button from '@components/ui/Button'
export default function Page() {
  const icon='🚗'
  return (
    <div className="afd">
      <div className="bc"><a href="/">🏠</a><span>›</span>🚗 Ajali / Accidents</div>
      <div className="ph">
        <div><h1>🚗 Ajali / Accidents</h1><p>Ripoti za ajali za barabarani</p></div>
        <div className="flex g8"><Button variant="o">⬇ Pakua</Button><Button variant="g">+ Mpya</Button></div>
      </div>
      <div className="stats-row s4 mb-sec">
        <StatCard icon="📊" value={0} label="Jumla" color="blue" />
        <StatCard icon="✅" value={0} label="Amilifu" color="green" />
        <StatCard icon="⏳" value={0} label="Inasubiri" color="amber" />
        <StatCard icon="🚨" value={0} label="Muhimu" color="red" />
      </div>
      <Card>
        <CardHeader title="🚗 Ajali / Accidents" />
        <CardBody>
          <div className="ibox" style={{marginBottom:20}}>ℹ️ Module hii itaunganishwa na Supabase katika Sprint 2. Schema ya database iko tayari (supabaseSchema.sql).</div>
          <div style={{textAlign:'center',padding:40,color:'var(--text-muted)'}}>
            <div style={{fontSize:48,marginBottom:12}}>🚗</div>
            <div style={{fontSize:14,fontWeight:600,color:'var(--text-white)',marginBottom:6}}>🚗 Ajali / Accidents</div>
            <div style={{fontSize:12,maxWidth:360,margin:'0 auto'}}>Ripoti za ajali za barabarani</div>
            <div style={{fontSize:10,marginTop:8,color:'var(--gold)'}}>Sprint 2 – Supabase Live Integration</div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
