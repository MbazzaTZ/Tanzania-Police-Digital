import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
import { MOCK_CASES, MOCK_EVIDENCE } from '@utils/mockData'
export default function CaseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const c = MOCK_CASES.find(x => x.id === id) || MOCK_CASES[0]
  const evidence = MOCK_EVIDENCE.filter(e => e.case === c.id)
  return (
    <div className="animate-fade-in">
      <div className="breadcrumb"><a href="/">🏠</a><span>›</span><a href="/investigation/cases">Kesi</a><span>›</span>{c.id}</div>
      <div className="page-header">
        <div><h1>📁 {c.id}</h1><p>{c.title} · {c.type} · {c.officer}</p></div>
        <div className="flex gap-8"><Badge status={c.status} /><Button variant="outline" onClick={() => navigate('/investigation/cases')}>← Nyuma</Button></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <Card><CardHeader title="📋 Maelezo ya Kesi" />
          <CardBody>
            {[['Namba ya Kesi',c.id],['Aina',c.type],['Afisa',c.officer],['Tarehe',c.date],['Kipaumbele',c.priority],['Watuhumiwa',c.suspects],['Ushahidi',c.evidence + ' faili'],['Masasisho',c.updates]].map(([l,v]) => (
              <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',fontSize:12,borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                <span style={{color:'var(--clr-muted)'}}>{l}</span><span style={{fontWeight:600}}>{v}</span>
              </div>
            ))}
          </CardBody>
        </Card>
        <Card><CardHeader title="🔬 Ushahidi" />
          <CardBody>
            {evidence.length > 0 ? evidence.map(e => (
              <div key={e.id} style={{padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                <div style={{fontSize:12,fontWeight:600,color:'var(--clr-white)'}}>{e.description}</div>
                <div style={{fontSize:10,color:'var(--clr-muted)',marginTop:2}}>{e.type} · {e.file} · {e.size}</div>
                <div style={{fontSize:10,color:'var(--clr-muted)'}}>Ilikusanywa: {e.officer}</div>
              </div>
            )) : (
              <div style={{textAlign:'center',padding:20,color:'var(--clr-muted)',fontSize:12}}>Hakuna ushahidi bado</div>
            )}
            <Button variant="primary" style={{marginTop:12,width:'100%'}}>+ Ongeza Ushahidi</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
