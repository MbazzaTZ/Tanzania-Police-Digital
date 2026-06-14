import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
import Tabs from '@components/ui/Tabs'
import { useSearch } from '@hooks/useSearch'
import { MOCK_ARRESTS } from '@utils/mockData'

const TABS = [{id:'all',label:'Zote'},{id:'pending',label:'Zinasubiri'},{id:'detained',label:'Kizuizini'},{id:'court',label:'Mahakamani'},{id:'completed',label:'Zilizokamilika'}]

export default function Arrests() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('all')
  const { query, setQuery, results } = useSearch(MOCK_ARRESTS, ['suspect','charges','officer','station','id'])
  const filtered = tab==='all' ? results : results.filter(a => a.status===tab)
  return (
    <div className="afd">
      <div className="bc"><a href="/">🏠</a><span>›</span>Utekelezaji<span>›</span>Kukamatwa</div>
      <div className="ph">
        <div><h1>⛓️ Kukamatwa / Arrests</h1><p>Rekodi za kukamatwa zote · Leo: 47 · Mwezi huu: 1,284</p></div>
        <div className="flex gap-8">
          <Button variant="outline">⬇ Pakua PDF</Button>
          <Button variant="accent" onClick={() => navigate('/enforcement/arrests/new')}>+ Rekodi ya Kukamata</Button>
        </div>
      </div>
      <div className="stats-row stat-grid-4 section-gap">
        <StatCard icon="⛓️" value={47}   label="Kukamata Leo"     delta="8%" color="amber" />
        <StatCard icon="🔒" value={23}   label="Kizuizini Sasa"   color="red" />
        <StatCard icon="⚖️" value={18}   label="Mahakamani"       color="blue" />
        <StatCard icon="✅" value={1284} label="Jumla Mwezi Huu"  delta="12%" color="green" />
      </div>
      <Card>
        <CardHeader
          action={
            <div className="flex gap-8" style={{flexWrap:'wrap'}}>
              <Tabs tabs={TABS} active={tab} onChange={setTab} />
              <input className="fi" style={{width:200,fontSize:11,padding:'5px 10px'}} placeholder="🔍 Tafuta..." value={query} onChange={e=>setQuery(e.target.value)} />
            </div>
          }
        />
        <CardBody noPadding>
          <div className="tw">
            <table>
              <thead><tr><th>Namba</th><th>Mtuhumiwa</th><th>Makosa</th><th>Aina</th><th>Afisa</th><th>Kituo</th><th>Tarehe</th><th>Haki Zilisomwa</th><th>Hali</th><th></th></tr></thead>
              <tbody>
                {filtered.map(a => (
                  <tr key={a.id}>
                    <td className="td-mo">{a.id}</td>
                    <td><div className="td-nm">{a.suspect}</div><div className="td-sub">NIDA: {a.nida}</div></td>
                    <td style={{fontSize:11}}>{a.charges}</td>
                    <td><span style={{fontSize:9,background:'rgba(255,255,255,.08)',padding:'2px 6px',borderRadius:8,color:'var(--text-muted)'}}>{a.category}</span></td>
                    <td style={{fontSize:11}}>{a.officer}</td>
                    <td style={{fontSize:11}}>{a.station}</td>
                    <td style={{fontFamily:'var(--font-mono)',fontSize:10}}>{a.date} {a.time}</td>
                    <td style={{textAlign:'center'}}>{a.rights_read ? <span style={{color:'#66BB6A',fontSize:12}}>✓</span> : <span style={{color:'#EF5350'}}>✗</span>}</td>
                    <td><Badge status={a.status} /></td>
                    <td><Button variant="outline" size="sm">Angalia</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{padding:'10px 14px',display:'flex',justifyContent:'space-between',borderTop:'1px solid var(--border)'}}>
            <span style={{fontSize:11,color:'var(--text-muted)'}}>Inaonyesha {filtered.length} ya {MOCK_ARRESTS.length}</span>
            <span style={{fontSize:11,color:'var(--text-muted)'}}>Ukurasa 1 ya 1</span>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
