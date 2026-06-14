import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Button from '@components/ui/Button'
export default function Analytics() {
  return (
    <div className="animate-fade-in">
      <div className="breadcrumb"><a href="/">🏠</a><span>›</span>Ripoti<span>›</span>Uchambuzi</div>
      <div className="page-header">
        <div><h1>📉 Uchambuzi / Analytics</h1><p>Uchambuzi wa kina wa data ya uhalifu kwa kutumia AI na takwimu</p></div>
        <div className="flex gap-8"><Button variant="outline">⬇ Pakua</Button><Button variant="accent">🤖 AI Ripoti</Button></div>
      </div>
      <div className="stat-grid stat-grid-4 section-gap">
        <StatCard icon="📊" value={2847291} label="Rekodi Zilizochambuliwa"  delta="8%" color="blue" />
        <StatCard icon="🔮" value={94}      label="Usahihi wa Utabiri (%)"   delta="3%" color="green" />
        <StatCard icon="🗺️" value={26}      label="Mikoa Inayochunguzwa"                color="amber" />
        <StatCard icon="⚡" value={12}      label:"Maeneo Hatari Yaliyogunduliwa" color="red" />
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <Card>
          <CardHeader title="🔮 Maeneo Hatari Yanayotarajiwa" subtitle="Takwimu za AI – Wiki Inayokuja" />
          <CardBody>
            {[['Kariakoo, Dar es Salaam','Wizi wa Mkoba',92,'#EF5350'],['Temeke, Dar es Salaam','Mapigano',87,'#FF7043'],['Mwanza CBD','Ulaghai',78,'#FF7043'],['Arusha Town','Wizi wa Gari',71,'var(--clr-accent)'],['Dodoma City','Madawa',65,'var(--clr-accent)']].map(([loc,type,pct,color])=>(
              <div key={loc} style={{padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                  <div><div style={{fontSize:12,fontWeight:600,color:'var(--clr-white)'}}>{loc}</div><div style={{fontSize:10,color:'var(--clr-muted)'}}>{type}</div></div>
                  <div style={{fontSize:14,fontWeight:800,fontFamily:'var(--font-mono)',color}}>{pct}%</div>
                </div>
                <div style={{background:'var(--clr-dark)',borderRadius:4,height:5}}><div style={{height:'100%',background:color,borderRadius:4,width:`${pct}%`}} /></div>
              </div>
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="⏰ Muda wa Uhalifu" subtitle="Uhalifu zaidi hutokea wakati gani?" />
          <CardBody>
            <div className="chart-placeholder" style={{height:180,marginBottom:12}}>
              <div style={{fontSize:32}}>⏰</div>
              <div style={{fontSize:11}}>Mchoro wa Heatmap – Saa 24</div>
              <div style={{fontSize:10,color:'var(--clr-muted)'}}>Recharts itaunganishwa Sprint 2</div>
            </div>
            {[['00:00–06:00','Usiku wa manane','25%','#7E57C2'],['06:00–12:00','Asubuhi','18%','#42A5F5'],['12:00–18:00','Mchana','22%','var(--clr-accent)'],['18:00–24:00','Jioni','35%','#EF5350']].map(([time,label,pct,color])=>(
              <div key={time} style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
                <div style={{width:8,height:8,borderRadius:'50%',background:color,flexShrink:0}} />
                <div style={{fontSize:11,flex:1}}>{time} · {label}</div>
                <div style={{fontSize:11,fontFamily:'var(--font-mono)',color}}>{pct}</div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
