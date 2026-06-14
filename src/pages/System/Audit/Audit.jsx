import { Card, CardHeader, CardBody } from '@components/ui/Card'
import StatCard from '@components/ui/StatCard'
import { AUDIT_ACTIONS } from '@utils/constants'
const MOCK_AUDIT = [
  {id:'AUD-001',officer:'Insp. J.M. Khamis',badge:'123456',rank:'inspector',station:'Oysterbay PS',action:'CREATE_CITATION',record:'CIT-2024-00028',gps:'-6.787, 39.283',device:'TPF-001',time:'17/05/2024 10:45'},
  {id:'AUD-002',officer:'Sgt. A. Suleiman',badge:'234567',rank:'sergeant',station:'Kariakoo PS',action:'MAKE_ARRESTS',record:'AR-2024-00004',gps:'-6.814, 39.281',device:'TPF-002',time:'16/05/2024 23:15'},
  {id:'AUD-003',officer:'ASP F.R. Kimaro',badge:'345678',rank:'asp',station:'Ilala PS',action:'CREATE_CASE',record:'CASE-2024-00128',gps:'-6.825, 39.271',device:'TPF-003',time:'17/05/2024 09:00'},
]
export default function Audit() {
  return (
    <div className="animate-fade-in">
      <div className="breadcrumb"><a href="/">🏠</a><span>›</span>Mfumo<span>›</span>Rekodi ya Ukaguzi</div>
      <div className="page-header"><div><h1>🗂️ Rekodi ya Ukaguzi / Audit Trail</h1><p>Kila hatua iliyofanywa na afisa imehifadhiwa hapa</p></div></div>
      <div className="stat-grid stat-grid-4 section-gap">
        <StatCard icon="🗂️" value={15420} label="Vitendo Jumla"   delta="5%" color="blue" />
        <StatCard icon="👮" value={1247} label="Maafisa Wanaofanya Kazi" color="green" />
        <StatCard icon="⚠️" value={3}   label="Vitendo vya Tashwishi"  color="red" />
        <StatCard icon="📅" value={284} label="Vitendo Leo"  delta="12%" />
      </div>
      <div className="info-box" style={{marginBottom:16}}>
        🔒 Kila kitendo kinahifadhi: Namba ya Afisa · Cheo · Kituo · GPS · Tarehe · Muda · Kitambulisho cha Kifaa
      </div>
      <Card>
        <CardHeader title="🗂️ Vitendo vya Hivi Karibuni"
          action={<select className="form-select" style={{width:'auto',fontSize:11,padding:'6px 10px'}}><option>Vitendo Vyote</option>{AUDIT_ACTIONS.map(a => <option key={a}>{a}</option>)}</select>} />
        <CardBody noPadding>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Namba</th><th>Afisa</th><th>Cheo</th><th>Kituo</th><th>Kitendo</th><th>Rekodi</th><th>GPS</th><th>Kifaa</th><th>Wakati</th></tr></thead>
              <tbody>
                {MOCK_AUDIT.map(a => (
                  <tr key={a.id}>
                    <td className="td-mono">{a.id}</td>
                    <td><div className="td-name">{a.officer}</div><div className="td-sub">Badge: {a.badge}</div></td>
                    <td style={{fontSize:10,textTransform:'uppercase'}}>{a.rank}</td>
                    <td style={{fontSize:11}}>{a.station}</td>
                    <td><span style={{fontSize:10,fontFamily:'var(--font-mono)',color:'var(--clr-accent)'}}>{a.action}</span></td>
                    <td className="td-mono">{a.record}</td>
                    <td style={{fontSize:10,fontFamily:'var(--font-mono)',color:'var(--clr-muted)'}}>{a.gps}</td>
                    <td style={{fontSize:10,fontFamily:'var(--font-mono)'}}>{a.device}</td>
                    <td style={{fontSize:10,fontFamily:'var(--font-mono)'}}>{a.time}</td>
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
