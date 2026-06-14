import { useState } from 'react'
import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
export default function PF3Forms() {
  const forms = [
    {id:'PF3-2024-00089',person:'Juma Ally Khamis',type:'Kukamatwa / Arrest',officer:'Insp. J.M. Khamis',station:'Oysterbay PS',date:'17/05/2024',status:'completed'},
    {id:'PF3-2024-00088',person:'Omar Said Bakari',type:'Kizuizini / Detention',officer:'Sgt. A. Suleiman',station:'Kariakoo PS',date:'16/05/2024',status:'draft'},
    {id:'PF3-2024-00087',person:'Neema Kazimoto',type:'Ulaghai / Fraud',officer:'ASP F.R. Kimaro',station:'Ilala PS',date:'15/05/2024',status:'completed'},
  ]
  return (
    <div className="afd">
      <div className="bc"><a href="/">🏠</a><span>›</span>Utekelezaji<span>›</span>PF3 Forms</div>
      <div className="ph">
        <div><h1>📄 PF3 Forms</h1><p>Fomu rasmi za polisi – PF3 ya kukamata, kizuizini na tuhuma</p></div>
        <div className="flex gap-8"><Button variant="outline">⬇ Pakua Fomu</Button><Button variant="accent">+ PF3 Mpya</Button></div>
      </div>
      <div className="stats-row stat-grid-4 section-gap">
        <StatCard icon="📄" value={89}  label="PF3 Zote Leo"      delta="5%"  color="blue" />
        <StatCard icon="✅" value={67}  label="Zilizokamilika"                color="green" />
        <StatCard icon="📝" value={22}  label="Rasimu (Draft)"               color="amber" />
        <StatCard icon="🖨️" value={45}  label="Zilizochapishwa"   delta="8%"  />
      </div>
      <div className="info-box section-gap">📋 PF3 ni fomu ya lazima kwa kila kukamata, kizuizini au tuhuma nchini Tanzania. Fomu inabidi ijazwe ndani ya masaa 24 baada ya kukamata.</div>
      <Card>
        <CardHeader title="📄 Orodha ya PF3 Forms" action={<Button variant="accent">+ PF3 Mpya</Button>} />
        <CardBody noPadding>
          <div className="tw">
            <table>
              <thead><tr><th>Namba ya PF3</th><th>Mhusika</th><th>Aina</th><th>Afisa</th><th>Kituo</th><th>Tarehe</th><th>Hali</th><th></th></tr></thead>
              <tbody>
                {forms.map(f=>(
                  <tr key={f.id}>
                    <td className="td-mo">{f.id}</td>
                    <td className="td-nm">{f.person}</td>
                    <td style={{fontSize:11}}>{f.type}</td>
                    <td style={{fontSize:11}}>{f.officer}</td>
                    <td style={{fontSize:11}}>{f.station}</td>
                    <td style={{fontFamily:'var(--font-mono)',fontSize:10}}>{f.date}</td>
                    <td><Badge status={f.status} /></td>
                    <td className="flex gap-8"><Button variant="outline" size="sm">Angalia</Button><Button variant="outline" size="sm">🖨️ Chapisha</Button></td>
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
