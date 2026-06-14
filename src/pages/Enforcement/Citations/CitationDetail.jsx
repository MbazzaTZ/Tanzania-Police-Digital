import { useParams, useNavigate } from 'react-router-dom'
import Breadcrumb from '@components/ui/Breadcrumb'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
import { MOCK_CITATIONS } from '@utils/mockData'
export default function CitationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const c = MOCK_CITATIONS.find(x => x.id === id) || MOCK_CITATIONS[0]
  return (
    <div className="animate-fade-in">
      <Breadcrumb items={[{label:'🏠',href:'/'},{label:'Citations',href:'/enforcement/citations'},{label:c.id}]} />
      <div className="page-header">
        <div><h1>📋 {c.id}</h1><p>{c.offence} · {c.date} {c.time}</p></div>
        <div className="flex gap-8">
          <Badge status={c.status} />
          <Button variant="outline" onClick={() => navigate('/enforcement/citations')}>← Nyuma</Button>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <div className="card"><div className="card-header"><div className="card-title">Mtuhumiwa</div></div>
          <div className="card-body">
            <div style={{display:'flex',flexDirection:'column',gap:6,fontSize:12}}>
              {[['Jina',c.suspect],['NIDA',c.nida],['Gari',c.vehicle],['Aina',c.vehicleType]].map(([l,v]) => (
                <div key={l} style={{display:'flex',justifyContent:'space-between'}}><span style={{color:'var(--text-muted)'}}>{l}</span><span>{v}</span></div>
              ))}
            </div>
          </div>
        </div>
        <div className="card"><div className="card-header"><div className="card-title">Citation</div></div>
          <div className="card-body">
            <div style={{display:'flex',flexDirection:'column',gap:6,fontSize:12}}>
              {[['Namba',c.id],['Makosa',c.offence],['Sheria',c.law],['Faini',`TZS ${c.fine.toLocaleString()}`],['Mahali',c.location],['Afisa',c.officer]].map(([l,v]) => (
                <div key={l} style={{display:'flex',justifyContent:'space-between'}}><span style={{color:'var(--text-muted)'}}>{l}</span><span>{v}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
