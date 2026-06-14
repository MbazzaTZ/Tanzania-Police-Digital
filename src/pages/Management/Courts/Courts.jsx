import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
const MOCK_COURT_CASES=[
  {id:'CC-2024-001',case:'CASE-2024-00128',title:'Wizi wa Benki ya CRDB',court:'Mahakama ya Wilaya – Kinondoni',judge:'Mhe. J. Msigwa',prosecutor:'DPP Mwangi',next_hearing:'25/05/2024',status:'pending'},
  {id:'CC-2024-002',case:'CASE-2024-00125',title:'Mauaji ya Temeke',court:'Mahakama ya Mkoa – DSM',judge:'Mhe. A. Kazimoto',prosecutor:'DPP Hassan',next_hearing:'20/05/2024',status:'active'},
]
export default function Courts() {
  return (
    <div className="animate-fade-in">
      <div className="breadcrumb"><a href="/">🏠</a><span>›</span>Usimamizi<span>›</span>Mahakama</div>
      <div className="page-header">
        <div><h1>🏛️ Mahakama / Court Management</h1><p>Kesi zinazoendelea mahakamani na ratiba ya vikao</p></div>
        <Button variant="accent">+ Ongeza Kesi ya Mahakama</Button>
      </div>
      <div className="stat-grid stat-grid-4 section-gap">
        <StatCard icon="🏛️" value={234}  label="Kesi Mahakamani"   color="blue" />
        <StatCard icon="📅" value={12}   label="Vikao Wiki Hii"     color="amber" />
        <StatCard icon="✅" value={56}   label="Zilizofungwa Mwezi" delta="8%"  color="green" />
        <StatCard icon="⏳" value={178}  label="Zinasubiri Hukumu"             color="red" />
      </div>
      <Card>
        <CardHeader title="🏛️ Kesi za Mahakama" />
        <CardBody noPadding>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Namba</th><th>Kesi</th><th>Mahakama</th><th>Jaji</th><th>Mwendesha Mashtaka</th><th>Kikao Kinachofuata</th><th>Hali</th><th></th></tr></thead>
              <tbody>
                {MOCK_COURT_CASES.map(c=>(
                  <tr key={c.id}>
                    <td className="td-mono">{c.id}</td>
                    <td><div className="td-name">{c.title}</div><div className="td-sub">{c.case}</div></td>
                    <td style={{fontSize:11}}>{c.court}</td>
                    <td style={{fontSize:11}}>{c.judge}</td>
                    <td style={{fontSize:11}}>{c.prosecutor}</td>
                    <td style={{fontFamily:'var(--font-mono)',fontSize:10,color:'var(--clr-accent)'}}>{c.next_hearing}</td>
                    <td><Badge status={c.status} /></td>
                    <td><Button variant="outline" size="sm">Angalia</Button></td>
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
