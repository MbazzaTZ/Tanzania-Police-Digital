import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody } from '@components/ui/Card'
import Button from '@components/ui/Button'
import { MOCK_PERSON } from '@utils/mockData'
import { SEARCH_TYPES } from '@utils/constants'
export default function Persons() {
  const navigate = useNavigate()
  const [type, setType]     = useState('NIDA')
  const [query, setQuery]   = useState('')
  const [result, setResult] = useState(null)
  const p = MOCK_PERSON
  const doSearch = () => { if (query.trim()) setResult(p) }
  return (
    <div className="animate-fade-in">
      <div className="breadcrumb"><a href="/">🏠</a><span>›</span>Utafutaji<span>›</span>Tafuta Watu</div>
      <div className="page-header"><div><h1>🔍 Tafuta Watu / Person Search</h1><p>NIDA · TIN · I-NEC · Passport · Leseni · Gari · Simu · Alama ya Kidole · Uso</p></div></div>
      {/* 9 search type buttons */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:20}}>
        {SEARCH_TYPES.map(t => (
          <div key={t.id} onClick={() => setType(t.id)}
            style={{background:'var(--clr-panel)',border:`1px solid ${type===t.id?'var(--clr-accent)':'var(--clr-border)'}`,background:type===t.id?'rgba(255,193,7,.06)':'var(--clr-panel)',borderRadius:'var(--r)',padding:'10px 12px',cursor:'pointer',display:'flex',alignItems:'center',gap:10,transition:'var(--transition)'}}>
            <span style={{fontSize:20}}>{t.icon}</span>
            <div><div style={{fontSize:12,fontWeight:600,color:'var(--clr-white)'}}>{t.label}</div><div style={{fontSize:10,color:'var(--clr-muted)'}}>{t.sub}</div></div>
          </div>
        ))}
      </div>
      <Card style={{marginBottom:20}}>
        <CardBody>
          <div style={{display:'flex',gap:8,marginBottom:8}}>
            <input className="form-input" style={{flex:1,fontSize:14,padding:'12px 16px'}} placeholder={`Weka namba ya ${type}...`} value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&doSearch()} />
            <Button variant="primary" size="lg" onClick={doSearch}>🔍 Tafuta</Button>
            <Button variant="outline" size="lg">📷 Scan QR</Button>
          </div>
        </CardBody>
      </Card>
      {result && (
        <div className="card animate-fade-in" style={{overflow:'hidden'}}>
          <div style={{background:'linear-gradient(135deg,var(--clr-primary),#0A3D0A)',padding:20,display:'flex',gap:16,alignItems:'flex-start'}}>
            <div style={{width:72,height:72,borderRadius:'50%',background:'rgba(0,0,0,.3)',border:'2px solid var(--clr-accent)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,flexShrink:0}}>👤</div>
            <div style={{flex:1}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:4}}>
                <div style={{fontSize:18,fontWeight:800,color:'#fff'}}>{p.fullName}</div>
                <span className="status s-active">Hakuna Tahadhari</span>
              </div>
              <div style={{fontSize:10,fontFamily:'var(--font-mono)',color:'rgba(255,255,255,.7)',marginBottom:8}}>ID: {p.id} · NIDA: {p.nida}</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
                {[['Jinsia',p.gender],['Kuzaliwa',p.dob],['Uraia',p.nationality],['Mkoa',p.region]].map(([l,v]) => (
                  <div key={l}><div style={{color:'rgba(255,255,255,.5)',fontSize:9,textTransform:'uppercase'}}>{l}</div><div style={{color:'#fff',fontWeight:500,fontSize:12,marginTop:2}}>{v}</div></div>
                ))}
              </div>
            </div>
          </div>
          <div style={{padding:16,borderBottom:'1px solid var(--clr-border)'}}>
            <div style={{fontSize:11,fontWeight:700,color:'var(--clr-muted)',textTransform:'uppercase',marginBottom:10}}>Nyaraka za Utambulisho</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:8}}>
              {Object.entries(p.documents).map(([t,d]) => (
                <div key={t} style={{background:'var(--clr-dark)',border:'1px solid var(--clr-border)',borderRadius:'var(--r)',padding:'10px 12px'}}>
                  <div style={{fontSize:9,color:'var(--clr-muted)',textTransform:'uppercase'}}>{t.toUpperCase()}</div>
                  <div style={{fontSize:11,fontFamily:'var(--font-mono)',color:'var(--clr-accent)',margin:'3px 0',fontWeight:600}}>{d.number}</div>
                  <span className="status s-active" style={{fontSize:'9px',padding:'1px 6px'}}>Halali</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',borderBottom:'1px solid var(--clr-border)'}}>
            <div style={{padding:16,borderRight:'1px solid var(--clr-border)'}}>
              <div style={{fontSize:11,fontWeight:700,color:'var(--clr-muted)',textTransform:'uppercase',marginBottom:10}}>Taarifa Binafsi</div>
              {[['Baba',p.father],['Mama',p.mother],['Simu',p.phone],['Barua Pepe',p.email],['Anuani',p.address],['Wilaya',p.district],['Kata',p.ward]].map(([l,v]) => (
                <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'4px 0',fontSize:11,borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                  <span style={{color:'var(--clr-muted)'}}>{l}</span><span>{v}</span>
                </div>
              ))}
            </div>
            <div style={{padding:16}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                <div style={{fontSize:11,fontWeight:700,color:'var(--clr-muted)',textTransform:'uppercase'}}>Taarifa za Polisi</div>
              </div>
              {[['⚠️ Tahadhari',p.policeRecord.watchlist],['⛓️ Kukamatwa',p.policeRecord.arrests],['⚖️ Mashtaka',p.policeRecord.charges],['📁 Kesi Zinazoendelea',p.policeRecord.activeCases],['📋 Citations',p.policeRecord.citations],['🏛️ Amri za Mahakama',p.policeRecord.warrants]].map(([l,v]) => (
                <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',fontSize:12,borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                  <span style={{color:'var(--clr-muted)'}}>{l}</span><span style={{fontFamily:'var(--font-mono)',color:'var(--clr-accent)',fontWeight:600}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{padding:'14px 16px',display:'flex',gap:8,flexWrap:'wrap'}}>
            <Button variant="outline" size="sm" onClick={() => navigate('/enforcement/citations/new')}>📋 Toa Citation</Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/enforcement/arrests/new')}>⛓️ Kamata</Button>
            <Button variant="outline" size="sm">🔒 Shikilia (Detain)</Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/enforcement/incidents')}>📝 Ripoti Tukio</Button>
            <Button variant="outline" size="sm">📄 PF3 Form</Button>
            <Button variant="danger" size="sm">🚨 Escalate</Button>
          </div>
        </div>
      )}
    </div>
  )
}
