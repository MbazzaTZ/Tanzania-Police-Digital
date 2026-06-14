import { useState } from 'react'
import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
import Tabs from '@components/ui/Tabs'
import { MOCK_OFFICERS } from '@utils/mockData'
import { RANKS } from '@utils/constants'
const TABS=[{id:'all',label:'Wote'},{id:'active',label:'Wanafanya Kazi'},{id:'leave',label:'Likizoni'},{id:'suspended',label:'Wamesimamishwa'}]
export default function Officers() {
  const [tab,setTab]=useState('all')
  const [search,setSearch]=useState('')
  const filtered=MOCK_OFFICERS.filter(o=>o.name.toLowerCase().includes(search.toLowerCase())||o.badge.includes(search)||o.station.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="animate-fade-in">
      <div className="breadcrumb"><a href="/">🏠</a><span>›</span>Usimamizi<span>›</span>Maafisa</div>
      <div className="page-header">
        <div><h1>👮 Maafisa / Officers</h1><p>Orodha ya maafisa wote · Tanzania Police Force</p></div>
        <div className="flex gap-8"><Button variant="outline">⬇ Pakua</Button><Button variant="accent">+ Afisa Mpya</Button></div>
      </div>
      <div className="stat-grid stat-grid-5 section-gap">
        <StatCard icon="👮" value={38547} label="Maafisa Jumla"    delta="2%"  color="blue" />
        <StatCard icon="✅" value={1247}  label="Wanafanya Kazi"   delta="5%"  color="green" />
        <StatCard icon="🏖️" value={234}   label="Likizoni"                     color="amber" />
        <StatCard icon="🏥" value={89}    label="Wagonjwa"                     color="red" />
        <StatCard icon="🎓" value={156}   label="Mafunzo"                      color="blue" />
      </div>
      <Card>
        <CardHeader action={<div className="flex gap-8" style={{flexWrap:'wrap'}}><Tabs tabs={TABS} active={tab} onChange={setTab} /><input className="form-input" style={{width:200,fontSize:11,padding:'5px 10px'}} placeholder="🔍 Tafuta afisa..." value={search} onChange={e=>setSearch(e.target.value)} /><select className="form-select" style={{width:'auto',fontSize:11,padding:'5px 10px'}}><option>Mikoa yote</option></select><select className="form-select" style={{width:'auto',fontSize:11,padding:'5px 10px'}}><option>Vyeo vyote</option>{RANKS.map(r=><option key={r.id}>{r.label}</option>)}</select></div>} />
        <CardBody noPadding>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Namba ya Kitambulisho</th><th>Jina Kamili</th><th>Cheo</th><th>Jukumu</th><th>Kituo</th><th>Wilaya</th><th>Mkoa</th><th>Simu</th><th>Hali</th><th></th></tr></thead>
              <tbody>
                {filtered.map(o=>(
                  <tr key={o.id}>
                    <td className="td-mono">{o.badge}</td>
                    <td className="td-name">{o.name}</td>
                    <td style={{fontSize:11,textTransform:'capitalize'}}>{o.rank}</td>
                    <td><span style={{fontSize:9,background:'rgba(255,255,255,.07)',padding:'2px 6px',borderRadius:8,color:'var(--text-muted)'}}>{o.role.replace(/_/g,' ')}</span></td>
                    <td style={{fontSize:11}}>{o.station}</td>
                    <td style={{fontSize:11}}>{o.district}</td>
                    <td style={{fontSize:11}}>{o.region}</td>
                    <td style={{fontFamily:'var(--font-mono)',fontSize:10}}>{o.phone}</td>
                    <td><div className="flex gap-8" style={{alignItems:'center'}}><div style={{width:6,height:6,borderRadius:'50%',background:o.online?'#66BB6A':'#9E9E9E'}} /><span style={{fontSize:10,color:o.online?'#66BB6A':'#9E9E9E'}}>{o.online?'Hai':'Nje'}</span></div></td>
                    <td><Button variant="outline" size="sm">Angalia</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{padding:'10px 14px',borderTop:'1px solid var(--border)',display:'flex',justifyContent:'space-between'}}>
            <span style={{fontSize:11,color:'var(--text-muted)'}}>Inaonyesha {filtered.length} ya 38,547</span>
            <div className="flex gap-8"><button className="btn btn-outline btn-sm">‹</button><button className="btn btn-primary btn-sm">1</button><button className="btn btn-outline btn-sm">2</button><button className="btn btn-outline btn-sm">›</button></div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
