import { useState } from 'react'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import StatCard from '@components/ui/StatCard'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
const MOCK_VEHICLES=[
  {id:'VEH-001',plate:'T123 DFG',make:'Toyota',model:'Noah',year:2018,color:'Silver',owner:'Juma Ally Khamis',insurance_exp:'30/11/2024',insurance_co:'Jubilee Insurance',stolen:false,violations:3},
  {id:'VEH-002',plate:'T987 ABC',make:'Toyota',model:'Corolla',year:2015,color:'Black',owner:'David John Mallya',insurance_exp:'15/07/2024',insurance_co:'Alliance Insurance',stolen:false,violations:1},
  {id:'VEH-003',plate:'T456 EFG',make:'Honda',model:'Fit',year:2019,color:'White',owner:'Salma Said Mwinyi',insurance_exp:'20/03/2025',insurance_co:'AAR Insurance',stolen:false,violations:0},
  {id:'VEH-004',plate:'T000 XYZ',make:'Nissan',model:'X-Trail',year:2017,color:'Red',owner:'Unknown',insurance_exp:'01/01/2024',insurance_co:'Expired',stolen:true,violations:0},
]
export default function Vehicles() {
  const [query,setQuery]=useState('')
  const [result,setResult]=useState(null)
  const filtered=MOCK_VEHICLES.filter(v=>v.plate.toLowerCase().includes(query.toLowerCase())||v.owner.toLowerCase().includes(query.toLowerCase()))
  return (
    <div className="animate-fade-in">
      <div className="breadcrumb"><a href="/">🏠</a><span>›</span>Utafutaji<span>›</span>Magari</div>
      <div className="page-header"><div><h1>🚗 Usajili wa Magari / Vehicles</h1><p>Tafuta gari kwa namba ya usajili, mmiliki, au VIN</p></div><Button variant="accent">+ Sajili Gari</Button></div>
      <div className="stat-grid stat-grid-4 section-gap">
        <StatCard icon="🚗" value={4291680} label="Magari Yaliyosajiliwa" delta="3%" color="blue" />
        <StatCard icon="🔴" value={1842}   label="Yaliyokaguliwa Leo"     delta="15%" color="green" />
        <StatCard icon="⚠️" value={234}    label="Bima Imekwisha"          color="amber" />
        <StatCard icon="🚨" value={47}     label="Yaliyoibiwa"             color="red" />
      </div>
      <Card style={{marginBottom:16}}>
        <CardBody>
          <div className="flex gap-8">
            <input className="form-input" style={{flex:1,fontSize:14,padding:'10px 14px'}} placeholder="🔍 Weka namba ya gari (T123 DFG), namba ya VIN, au jina la mmiliki..." value={query} onChange={e=>setQuery(e.target.value)} />
            <Button variant="primary" size="lg">🔍 Tafuta</Button>
            <Button variant="outline" size="lg">📷 Scan Plate</Button>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="🚗 Matokeo ya Utafutaji" />
        <CardBody noPadding>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Namba ya Gari</th><th>Aina</th><th>Rangi</th><th>Mwaka</th><th>Mmiliki</th><th>Bima</th><th>Makampuni ya Bima</th><th>Makosa</th><th>Imeibwa</th><th></th></tr></thead>
              <tbody>
                {filtered.map(v=>(
                  <tr key={v.id}>
                    <td className="td-mono">{v.plate}</td>
                    <td><div className="td-name">{v.make} {v.model}</div></td>
                    <td style={{fontSize:11}}>{v.color}</td>
                    <td style={{fontFamily:'var(--font-mono)',fontSize:11}}>{v.year}</td>
                    <td style={{fontSize:11}}>{v.owner}</td>
                    <td style={{fontSize:10,fontFamily:'var(--font-mono)',color:new Date(v.insurance_exp.split('/').reverse().join('-'))<new Date()?'#EF5350':'#66BB6A'}}>{v.insurance_exp}</td>
                    <td style={{fontSize:11}}>{v.insurance_co}</td>
                    <td style={{textAlign:'center',fontFamily:'var(--font-mono)'}}>{v.violations}</td>
                    <td>{v.stolen?<span className="status s-critical">🚨 Ndiyo</span>:<span className="status s-active">Hapana</span>}</td>
                    <td className="flex gap-8"><Button variant="outline" size="sm">Angalia</Button>{v.stolen&&<Button variant="danger" size="sm">Alert</Button>}</td>
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
