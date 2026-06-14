import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Button from '@components/ui/Button'
import { MOCK_REGIONS_STATS } from '@utils/mockData'
export default function CrimeReports() {
  const monthly=[{m:'Jan',v:312},{m:'Feb',v:287},{m:'Mar',v:334},{m:'Apr',v:298},{m:'May',v:401},{m:'Jun',v:356},{m:'Jul',v:289},{m:'Aug',v:312},{m:'Sep',v:378},{m:'Oct',v:421},{m:'Nov',v:394},{m:'Dec',v:0}]
  const max=Math.max(...monthly.map(m=>m.v))
  return (
    <div className="animate-fade-in">
      <div className="breadcrumb"><a href="/">🏠</a><span>›</span>Ripoti<span>›</span>Takwimu za Uhalifu</div>
      <div className="page-header">
        <div><h1>📊 Takwimu za Uhalifu / Crime Reports</h1><p>Takwimu za uhalifu kwa mkoa, wilaya na aina</p></div>
        <div className="flex gap-8"><select className="form-select" style={{width:'auto',fontSize:11,padding:'5px 10px'}}><option>Mwaka 2024</option><option>Mwaka 2023</option></select><Button variant="outline">⬇ Pakua PDF</Button><Button variant="accent">📧 Tuma Ripoti</Button></div>
      </div>
      <div className="stat-grid stat-grid-5 section-gap">
        <StatCard icon="🚨" value={4291}  label="Matukio Mwaka Huu"  delta="8%"   color="red" />
        <StatCard icon="⛓️" value={1847}  label="Wakamatwa"           delta="12%"  color="amber" />
        <StatCard icon="⚖️" value={892}   label="Waliofungwa"         delta="5%"   color="blue" />
        <StatCard icon="📁" value={3421}  label="Kesi Zilizofunguliwa" delta="15%" color="blue" />
        <StatCard icon="✅" value={2187}  label="Kesi Zilizofungwa"    delta="10%" color="green" />
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr',gap:16,marginBottom:16}}>
        <Card>
          <CardHeader title="📈 Mwenendo wa Uhalifu – 2024" subtitle="Idadi ya matukio kwa mwezi" />
          <CardBody>
            <div style={{height:180,display:'flex',alignItems:'flex-end',gap:6}}>
              {monthly.map(m=>(
                <div key={m.m} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
                  <div style={{fontSize:8,color:'var(--gold)',fontFamily:'var(--font-mono)'}}>{m.v||''}</div>
                  <div style={{width:'100%',background:m.v?'var(--green-600)':'var(--border)',height:`${m.v?(m.v/max)*140:4}px`,borderRadius:'3px 3px 0 0',transition:'height .3s'}} />
                  <div style={{fontSize:9,color:'var(--text-muted)'}}>{m.m}</div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="🗺️ Uhalifu kwa Mkoa" subtitle="Mikoa 6 ya juu" />
          <CardBody>
            {MOCK_REGIONS_STATS.map(r=>(
              <div key={r.name} style={{marginBottom:10}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
                  <span style={{fontSize:11,color:'var(--text-light)'}}>{r.name}</span>
                  <span style={{fontSize:10,fontFamily:'var(--font-mono)',color:'var(--gold)'}}>{r.count}</span>
                </div>
                <div style={{background:'var(--green-900)',borderRadius:4,height:6}}>
                  <div style={{height:'100%',background:r.color,borderRadius:4,width:`${r.pct}%`}} />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="🔍 Uhalifu kwa Aina" />
        <CardBody>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
            {[['Wizi','1,234','#EF5350'],['Mapigano','567','#FF7043'],['Madawa','445','#7E57C2'],['Udanganyifu','334','#42A5F5'],['Mauaji','89','#EF5350'],['Ubakaji','112','#EF5350'],['Ugaidi','12','#B71C1C'],['Uhalifu wa Mtandaoni','145','#7E57C2']].map(([type,count,color])=>(
              <div key={type} style={{background:'var(--green-900)',borderRadius:'var(--r)',padding:'12px 14px',borderLeft:`3px solid ${color}`}}>
                <div style={{fontSize:11,color:'var(--text-muted)',marginBottom:4}}>{type}</div>
                <div style={{fontSize:20,fontWeight:800,fontFamily:'var(--font-mono)',color:'var(--text-white)'}}>{count}</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
