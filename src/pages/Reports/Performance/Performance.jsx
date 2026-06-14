import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Button from '@components/ui/Button'
export default function Performance() {
  const stations=[
    {name:'Oysterbay PS',region:'DSM',arrests:47,citations:284,incidents:89,cases_closed:23,score:94},
    {name:'Kariakoo PS',region:'DSM',arrests:56,citations:312,incidents:102,cases_closed:31,score:91},
    {name:'Temeke PS',region:'DSM',arrests:34,citations:198,incidents:67,cases_closed:18,score:87},
    {name:'Kinondoni PS',region:'DSM',arrests:28,citations:234,incidents:78,cases_closed:15,score:82},
  ]
  return (
    <div className="afd">
      <div className="bc"><a href="/">🏠</a><span>›</span>Ripoti<span>›</span>Utendaji</div>
      <div className="ph">
        <div><h1>📈 Utendaji / Performance</h1><p>Tathmini ya utendaji wa maafisa, vituo na mikoa</p></div>
        <div className="flex g8"><select className="fs" style={{width:'auto',fontSize:11,padding:'5px 10px'}}><option>Mei 2024</option></select><Button variant="o">⬇ Ripoti PDF</Button></div>
      </div>
      <div className="stats-row s4 mb-sec">
        <StatCard icon="⭐" value={94}  label="Wastani wa Utendaji (%)"   color="green" />
        <StatCard icon="🏆" value={12}  label="Vituo Bora"                 color="amber" />
        <StatCard icon="👮" value={234} label="Maafisa wa Mwaka"            color="blue" />
        <StatCard icon="📈" value={8}   label="Ongezeko la Utendaji (%)"    color="green" />
      </div>
      <Card>
        <CardHeader title="🏆 Utendaji wa Vituo – Mei 2024" />
        <CardBody noPadding>
          <div className="tw">
            <table>
              <thead><tr><th>Nafasi</th><th>Kituo</th><th>Mkoa</th><th>Kukamatwa</th><th>Citations</th><th>Matukio</th><th>Kesi Zilizofungwa</th><th>Alama (%)</th></tr></thead>
              <tbody>
                {stations.map((s,i)=>(
                  <tr key={s.name}>
                    <td style={{textAlign:'center',fontSize:16}}>{['🥇','🥈','🥉','4️⃣'][i]}</td>
                    <td className="td-nm">{s.name}</td>
                    <td style={{fontSize:11}}>{s.region}</td>
                    <td style={{textAlign:'center',fontFamily:'var(--font-mono)'}}>{s.arrests}</td>
                    <td style={{textAlign:'center',fontFamily:'var(--font-mono)'}}>{s.citations}</td>
                    <td style={{textAlign:'center',fontFamily:'var(--font-mono)'}}>{s.incidents}</td>
                    <td style={{textAlign:'center',fontFamily:'var(--font-mono)'}}>{s.cases_closed}</td>
                    <td>
                      <div style={{display:'flex',alignItems:'center',gap:8}}>
                        <div style={{flex:1,background:'var(--green-900)',borderRadius:4,height:6}}>
                          <div style={{height:'100%',background:'var(--green-600)',borderRadius:4,width:`${s.score}%`}} />
                        </div>
                        <span style={{fontFamily:'var(--font-mono)',color:'var(--gold)',fontSize:11,minWidth:28}}>{s.score}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
