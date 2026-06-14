import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Button from '@components/ui/Button'
import Badge from '@components/ui/Badge'
import { MOCK_CASES } from '@utils/mockData'
export default function Cases() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const filtered = MOCK_CASES.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.type.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="afd">
      <div className="bc"><a href="/">🏠</a><span>›</span>Uchunguzi<span>›</span>Kesi</div>
      <div className="ph">
        <div><h1>📁 Kesi / Cases</h1><p>Usimamizi wa kesi za uhalifu – CID</p></div>
        <div className="flex gap-8"><Button variant="outline">⬇ Pakua</Button><Button variant="accent">+ Kesi Mpya</Button></div>
      </div>
      <div className="stats-row stat-grid-4 section-gap">
        <StatCard icon="📁" value={MOCK_CASES.length} label="Kesi Zote"       color="blue" />
        <StatCard icon="⚡" value={3} label="Muhimu Sana"  color="red" />
        <StatCard icon="⏳" value={4} label="Zinachunguzwa" color="amber" />
        <StatCard icon="✅" value={0} label="Zilizofungwa"  color="green" />
      </div>
      <Card>
        <CardHeader title="📁 Orodha ya Kesi"
          action={<input className="fi" style={{width:220,fontSize:11,padding:'6px 10px'}} placeholder="🔍 Tafuta kesi..." value={search} onChange={e=>setSearch(e.target.value)} />} />
        <CardBody noPadding>
          <div className="tw">
            <table>
              <thead><tr><th>Namba</th><th>Kichwa cha Habari</th><th>Aina</th><th>Afisa</th><th>Tarehe</th><th>Watuhumiwa</th><th>Ushahidi</th><th>Kipaumbele</th><th>Hali</th><th></th></tr></thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id}>
                    <td className="td-mo">{c.id}</td>
                    <td><div className="td-nm">{c.title}</div></td>
                    <td style={{fontSize:11}}>{c.type}</td>
                    <td style={{fontSize:11}}>{c.officer}</td>
                    <td style={{fontFamily:'var(--font-mono)',fontSize:10}}>{c.date}</td>
                    <td style={{textAlign:'center'}}>{c.suspects}</td>
                    <td style={{textAlign:'center'}}>{c.evidence}</td>
                    <td><Badge status={c.priority==='critical'?'critical':c.priority==='high'?'critical':'pending'} /></td>
                    <td><Badge status={c.status} /></td>
                    <td><Button variant="outline" size="sm" onClick={() => navigate(`/investigation/cases/${c.id}`)}>Angalia</Button></td>
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
