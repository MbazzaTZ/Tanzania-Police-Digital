import { useState } from 'react'
import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
import { MOCK_DETENTIONS } from '@utils/mockData'
export default function Detentions() {
  const [data] = useState(MOCK_DETENTIONS)
  return (
    <div className="afd">
      <div className="bc"><a href="/dashboard">🏠</a><span>›</span>Utekelezaji<span>›</span>Kizuizini</div>
      <div className="ph">
        <div><h1>🔒 Kizuizini / Detentions</h1><p>Watu walioko kizuizini sasa · Upeo: Masaa 48</p></div>
        <Button variant="g">+ Weka Kizuizini</Button>
      </div>
      <div className="stats-row s4 mb-sec">
        <StatCard icon="🔒" value={data.length} label="Wako Kizuizini" color="red" />
        <StatCard icon="⏰" value={0}            label="Wanaokaribia Muda (12h)" color="amber" />
        <StatCard icon="✅" value={0}            label="Walioachiwa Leo" color="green" />
        <StatCard icon="🏢" value={2}            label="Vituo vya Kizuizini" color="blue" />
      </div>
      <div className="ibox mb-sec">⚠️ Mtu hawezi kushikiliwa zaidi ya masaa 48 bila amri ya mahakama. Mfumo unaonyesha onyo moja kwa moja.</div>
      <Card>
        <CardHeader title="🔒 Watu Walioko Kizuizini" />
        <CardBody noPadding>
          <div className="tw">
            <table>
              <thead><tr><th>Namba</th><th>Jina</th><th>Sababu</th><th>Seli</th><th>Kituo</th><th>Afisa</th><th>Kuingia</th><th>Upeo (Masaa)</th><th>Muda Uliobaki</th><th>Hali</th><th></th></tr></thead>
              <tbody>
                {data.map(d => (
                  <tr key={d.id}>
                    <td className="td-mo">{d.id}</td>
                    <td><div className="td-nm">{d.person}</div><div className="td-sub">NIDA: {d.nida}</div></td>
                    <td style={{fontSize:11}}>{d.reason}</td>
                    <td className="td-mo">{d.cell}</td>
                    <td style={{fontSize:11}}>{d.station}</td>
                    <td style={{fontSize:11}}>{d.officer}</td>
                    <td style={{fontFamily:'var(--font-mono)',fontSize:10}}>{d.checkin}</td>
                    <td style={{textAlign:'center',fontFamily:'var(--font-mono)'}}>{d.max_hours}h</td>
                    <td><span style={{color:'#66BB6A',fontFamily:'var(--font-mono)',fontSize:11}}>~36h</span></td>
                    <td><Badge status={d.status} /></td>
                    <td className="flex g8"><Button variant="success" size="sm">Achia</Button><Button variant="o" size="sm">Angalia</Button></td>
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
