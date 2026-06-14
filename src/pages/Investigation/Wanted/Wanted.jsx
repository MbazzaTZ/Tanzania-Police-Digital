import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Button from '@components/ui/Button'
import Badge from '@components/ui/Badge'
import { MOCK_WANTED } from '@utils/mockData'
export default function Wanted() {
  const [search, setSearch] = useState('')
  const filtered = MOCK_WANTED.filter(w => w.name.toLowerCase().includes(search.toLowerCase()) || w.crime.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="afd">
      <div className="bc"><a href="/dashboard">🏠</a><span>›</span>Uchunguzi<span>›</span>Watuhumiwa Wanaotafutwa</div>
      <div className="ph">
        <div><h1>🎯 Watuhumiwa Wanaotafutwa</h1><p>Orodha ya watu wanaotafutwa kitaifa</p></div>
        <Button variant="g">+ Ongeza Mtarajiwa</Button>
      </div>
      <div className="stats-row s4 mb-sec">
        <StatCard icon="🎯" value={MOCK_WANTED.length} label="Wanaotafutwa"    color="red" />
        <StatCard icon="⚠️" value={1}  label="Hatari / Dangerous"  color="red" />
        <StatCard icon="✅" value={0}  label="Waliokamatwa Leo"     color="green" />
        <StatCard icon="💰" value={8}  label="Zawadi (Milioni TZS)" color="amber" />
      </div>
      <Card>
        <CardHeader title="🎯 Orodha ya Watuhumiwa"
          action={<input className="fi" style={{width:200,fontSize:11,padding:'6px 10px'}} placeholder="🔍 Tafuta..." value={search} onChange={e=>setSearch(e.target.value)} />} />
        <CardBody noPadding>
          <div className="tw">
            <table>
              <thead><tr><th>Namba</th><th>Jina</th><th>Alias</th><th>Uhalifu</th><th>Mkoa wa Mwisho</th><th>Tarehe</th><th>Zawadi (TZS)</th><th>Hatari</th><th></th></tr></thead>
              <tbody>
                {filtered.map(w => (
                  <tr key={w.id}>
                    <td className="td-mo">{w.id}</td>
                    <td><div className="td-nm">{w.name}</div><div className="td-sub">NIDA: {w.nida}</div></td>
                    <td style={{color:'var(--gold)',fontStyle:'italic',fontSize:11}}>{w.alias}</td>
                    <td style={{fontSize:11}}>{w.crime}</td>
                    <td style={{fontSize:11}}>{w.region}</td>
                    <td style={{fontFamily:'var(--font-mono)',fontSize:10}}>{w.date}</td>
                    <td className="td-mo">{w.reward.toLocaleString()}</td>
                    <td>{w.dangerous ? <span className="pill p-critical">⚠️ Ndiyo</span> : <span className="pill p-closed">Hapana</span>}</td>
                    <td><Button variant="r" size="sm">Kamata</Button></td>
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
