import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
import Tabs from '@components/ui/Tabs'
import { MOCK_INCIDENTS } from '@utils/mockData'
const TABS=[{id:'all',label:'Zote'},{id:'investigating',label:'Inachunguzwa'},{id:'pending',label:'Inasubiri'},{id:'closed',label:'Imefungwa'}]
export default function Incidents() {
  const navigate=useNavigate()
  const [tab,setTab]=useState('all')
  const filtered=tab==='all'?MOCK_INCIDENTS:MOCK_INCIDENTS.filter(i=>i.status===tab)
  return (
    <div className="afd">
      <div className="bc"><a href="/">🏠</a><span>›</span>Utekelezaji<span>›</span>Matukio</div>
      <div className="ph">
        <div><h1>📝 Matukio / Incidents</h1><p>Ripoti za matukio yaliyoripotiwa leo na wiki hii</p></div>
        <div className="flex gap-8"><Button variant="outline">⬇ Pakua</Button><Button variant="accent">+ Ripoti ya Tukio</Button></div>
      </div>
      <div className="stats-row stat-grid-4 section-gap">
        <StatCard icon="📝" value={312}  label="Matukio Leo"       delta="8%"   color="amber" />
        <StatCard icon="🚨" value={47}   label="Muhimu / Critical"              color="red" />
        <StatCard icon="🔍" value={189}  label="Yanachunguzwa"     delta="5%"   color="blue" />
        <StatCard icon="✅" value={76}   label="Yaliyofungwa Leo"               color="green" />
      </div>
      <Card>
        <CardHeader action={<div className="flex gap-8"><Tabs tabs={TABS} active={tab} onChange={setTab} /><input className="fi" style={{width:180,fontSize:11,padding:'5px 10px'}} placeholder="🔍 Tafuta..." /></div>} />
        <CardBody noPadding>
          <div className="tw">
            <table>
              <thead><tr><th>Namba</th><th>Aina ya Tukio</th><th>Maelezo</th><th>Afisa</th><th>Mahali</th><th>Tarehe</th><th>Kipaumbele</th><th>Hali</th><th></th></tr></thead>
              <tbody>
                {filtered.map(i=>(
                  <tr key={i.id}>
                    <td className="td-mo">{i.id}</td>
                    <td style={{fontWeight:600,fontSize:12}}>{i.type}</td>
                    <td style={{fontSize:11}}>{i.description}</td>
                    <td style={{fontSize:11}}>{i.officer}</td>
                    <td style={{fontSize:11}}>{i.location}</td>
                    <td style={{fontFamily:'var(--font-mono)',fontSize:10}}>{i.date} {i.time}</td>
                    <td><Badge status={i.priority} /></td>
                    <td><Badge status={i.status} /></td>
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
