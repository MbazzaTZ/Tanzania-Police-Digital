import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '@components/ui/Breadcrumb'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
import StatCard from '@components/ui/StatCard'
import { Card, CardBody, CardHeader } from '@components/ui/Card'
import { useSearch } from '@hooks/useSearch'
import { MOCK_ARRESTS } from '@utils/mockData'
export default function Arrests() {
  const navigate = useNavigate()
  const { query, setQuery, results } = useSearch(MOCK_ARRESTS, ['suspect','charges','officer','station'])
  return (
    <div className="animate-fade-in">
      <Breadcrumb items={[{label:'🏠',href:'/'},{label:'Utekelezaji'},{label:'Kukamatwa'}]} />
      <div className="page-header">
        <div><h1>⛓️ Kukamatwa / Arrests</h1><p>Rekodi 47 leo · Jumla mwezi huu: 1,284</p></div>
        <Button variant="accent">+ Rekodi ya Kukamata</Button>
      </div>
      <div className="stat-grid stat-grid-4 section-gap">
        <StatCard icon="⛓️" value={47}  label="Kukamata Leo"    delta="8%" color="amber" />
        <StatCard icon="🔒" value={23}  label="Kizuizini Sasa"  delta="3 mpya" deltaUp={false} color="red" />
        <StatCard icon="⚖️" value={18}  label="Mahakamani"      delta="2%" />
        <StatCard icon="✅" value={6}   label="Walioachiwa Leo" delta="1%" color="green" />
      </div>
      <Card>
        <CardHeader title="⛓️ Orodha ya Kukamatwa" action={
          <input className="form-input" style={{width:200,fontSize:11,padding:'6px 10px'}} placeholder="🔍 Tafuta..." value={query} onChange={e=>setQuery(e.target.value)} />
        } />
        <CardBody noPadding>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Namba</th><th>Mtuhumiwa</th><th>Makosa</th><th>Afisa</th><th>Kituo</th><th>Tarehe</th><th>Hali</th><th></th></tr></thead>
              <tbody>
                {results.map(a => (
                  <tr key={a.id}>
                    <td className="td-mono">{a.id}</td>
                    <td><div className="td-name">{a.suspect}</div><div className="td-sub">NIDA: {a.nida}</div></td>
                    <td style={{fontSize:11}}>{a.charges} · <span style={{color:'var(--clr-muted)',fontSize:10}}>{a.category}</span></td>
                    <td style={{fontSize:11}}>{a.officer}</td>
                    <td style={{fontSize:11}}>{a.station}</td>
                    <td style={{fontFamily:'var(--font-mono)',fontSize:10}}>{a.date}</td>
                    <td><Badge status={a.status} /></td>
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
