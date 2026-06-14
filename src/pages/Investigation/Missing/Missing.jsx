import { useState } from 'react'
import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Button from '@components/ui/Button'
import Badge from '@components/ui/Badge'
import { MOCK_MISSING } from '@utils/mockData'
export default function Missing() {
  const [search, setSearch] = useState('')
  const filtered = MOCK_MISSING.filter(m => m.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="afd">
      <div className="bc"><a href="/">🏠</a><span>›</span>Uchunguzi<span>›</span>Watu Waliopotea</div>
      <div className="ph">
        <div><h1>👤 Watu Waliopotea / Missing Persons</h1><p>Orodha ya watu waliopotea na hali ya uchunguzi</p></div>
        <Button variant="g">+ Ongeza Mpya</Button>
      </div>
      <div className="stats-row s4 mb-sec">
        <StatCard icon="👤" value={MOCK_MISSING.length} label="Wanaotafutwa"  color="red" />
        <StatCard icon="👶" value={1} label="Watoto"    color="red" />
        <StatCard icon="✅" value={0} label="Walioopatikana Leo" color="green" />
        <StatCard icon="📅" value={2} label="Zaidi ya Siku 7"  color="amber" />
      </div>
      <Card>
        <CardHeader title="👤 Orodha ya Watu Waliopotea"
          action={<input className="fi" style={{width:200,fontSize:11,padding:'6px 10px'}} placeholder="🔍 Tafuta..." value={search} onChange={e=>setSearch(e.target.value)} />} />
        <CardBody noPadding>
          <div className="tw">
            <table>
              <thead><tr><th>Namba</th><th>Jina</th><th>Umri</th><th>Jinsia</th><th>Alipotea</th><th>Tarehe</th><th>Mripotiwa</th><th>Simu</th><th>Hali</th><th></th></tr></thead>
              <tbody>
                {filtered.map(m => (
                  <tr key={m.id}>
                    <td className="td-mo">{m.id}</td>
                    <td className="td-nm">{m.name}</td>
                    <td>{m.age}</td>
                    <td>{m.gender}</td>
                    <td style={{fontSize:11}}>{m.lastSeen}</td>
                    <td style={{fontFamily:'var(--font-mono)',fontSize:10}}>{m.date}</td>
                    <td style={{fontSize:11}}>{m.reporter}</td>
                    <td style={{fontFamily:'var(--font-mono)',fontSize:10}}>{m.phone}</td>
                    <td><Badge status={m.status} /></td>
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
