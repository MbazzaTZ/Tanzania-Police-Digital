import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
import { MOCK_PRISONERS } from '@utils/mockData'
export default function Prisoners() {
  return (
    <div className="animate-fade-in">
      <div className="breadcrumb"><a href="/">🏠</a><span>›</span>Usimamizi<span>›</span>Wafungwa</div>
      <div className="page-header">
        <div><h1>🔒 Wafungwa / Prisoners</h1><p>Wafungwa walioko vituo vya polisi sasa hivi</p></div>
        <div className="flex gap-8"><Button variant="outline">⬇ Pakua</Button><Button variant="accent">+ Ingiza Mfungwa</Button></div>
      </div>
      <div className="stat-grid stat-grid-4 section-gap">
        <StatCard icon="🔒" value={MOCK_PRISONERS.length} label="Wafungwa Jumla"     color="red" />
        <StatCard icon="⚠️" value={0}                     label="Seli Zimejaa"        color="amber" />
        <StatCard icon="🔄" value={0}                     label="Uhamisho wa Leo"      color="blue" />
        <StatCard icon="✅" value={0}                     label="Walioachiwa Leo"      color="green" />
      </div>
      <div className="info-box section-gap">⚠️ Wafungwa wanaostahili kuachiwa leo: 0. Mfumo unaangalia muda wa kizuizini moja kwa moja.</div>
      <Card>
        <CardHeader title="🔒 Orodha ya Wafungwa" action={<Button variant="outline" size="sm">🔄 Uhamisho</Button>} />
        <CardBody noPadding>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Namba</th><th>Jina</th><th>NIDA</th><th>Seli</th><th>Kituo</th><th>Sababu</th><th>Afisa</th><th>Kuingia</th><th>Muda Upeo</th><th>Hali</th><th></th></tr></thead>
              <tbody>
                {MOCK_PRISONERS.map(p=>(
                  <tr key={p.id}>
                    <td className="td-mono">{p.id}</td>
                    <td className="td-name">{p.name}</td>
                    <td className="td-mono">{p.nida}</td>
                    <td className="td-mono">{p.cell}</td>
                    <td style={{fontSize:11}}>{p.station}</td>
                    <td style={{fontSize:11}}>{p.reason}</td>
                    <td style={{fontSize:11}}>{p.officer}</td>
                    <td style={{fontFamily:'var(--font-mono)',fontSize:10}}>{p.checkin}</td>
                    <td style={{textAlign:'center'}}><span style={{fontFamily:'var(--font-mono)',color:'var(--clr-accent)'}}>{p.maxHours}h</span></td>
                    <td><Badge status={p.status} /></td>
                    <td className="flex gap-8"><Button variant="success" size="sm">Achia</Button><Button variant="outline" size="sm">🔄 Hamisha</Button></td>
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
