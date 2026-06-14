import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
import { MOCK_FIREARMS } from '@utils/mockData'
export default function Firearms() {
  return (
    <div className="afd">
      <div className="bc"><a href="/">🏠</a><span>›</span>Usimamizi<span>›</span>Silaha</div>
      <div className="ph">
        <div><h1>🔫 Silaha / Firearms Registry</h1><p>Registry ya silaha zote za polisi Tanzania</p></div>
        <div className="flex g8"><Button variant="o">⬇ Pakua</Button><Button variant="g">+ Sajili Silaha</Button></div>
      </div>
      <div className="stats-row s4 mb-sec">
        <StatCard icon="🔫" value={47823} label="Silaha Jumla"     color="blue" />
        <StatCard icon="👮" value={38547} label="Zilizotolewa"      delta="2%"  color="green" />
        <StatCard icon="🏪" value={9276}  label="Ghala (Armory)"              color="amber" />
        <StatCard icon="⚠️" value={3}     label="Zilizopotea"                 color="red" />
      </div>
      <div className="ibox mb-sec">🔫 Silaha zote zimesajiliwa kwa namba ya mfululizo (Serial Number). Kila kutolewa na kurudisha kunarekodi katika mfumo.</div>
      <Card>
        <CardHeader title="🔫 Orodha ya Silaha" action={<input className="fi" style={{width:200,fontSize:11,padding:'5px 10px'}} placeholder="🔍 Tafuta serial, aina..." />} />
        <CardBody noPadding>
          <div className="tw">
            <table>
              <thead><tr><th>Namba ya Rejista</th><th>Namba ya Mfululizo</th><th>Aina</th><th>Caliber</th><th>Kituo</th><th>Imetolewa Kwa</th><th>Tarehe ya Kutolewa</th><th>Hali</th><th>Hali ya Uendeshaji</th><th></th></tr></thead>
              <tbody>
                {MOCK_FIREARMS.map(f=>(
                  <tr key={f.id}>
                    <td className="td-mo">{f.id}</td>
                    <td className="td-mo">{f.serial}</td>
                    <td style={{fontSize:11}}>{f.type}</td>
                    <td style={{fontSize:11}}>9mm</td>
                    <td style={{fontSize:11}}>{f.station}</td>
                    <td style={{fontSize:11}}>{f.issued_to||'–'}</td>
                    <td style={{fontFamily:'var(--font-mono)',fontSize:10}}>{f.date_issued||'–'}</td>
                    <td><span className={`status ${f.status==='issued'?'p-issued':'p-pending'}`}>{f.status==='issued'?'Imetolewa':'Ghala'}</span></td>
                    <td><span className="pill p-active">{f.condition}</span></td>
                    <td><Button variant="o" size="sm">Angalia</Button></td>
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
