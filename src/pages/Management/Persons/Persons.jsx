import { useState } from 'react'
import Breadcrumb from '@components/ui/Breadcrumb'
import Button from '@components/ui/Button'
import { MOCK_PERSON, MOCK_CITATIONS } from '@utils/mockData'
import { SEARCH_TYPES } from '@utils/constants'

export default function Persons() {
  const [searchType, setSearchType] = useState('NIDA')
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const p = MOCK_PERSON

  const handleSearch = () => { if (query.trim()) setResult(p) }

  return (
    <div className="animate-fade-in">
      <Breadcrumb items={[{label:'🏠',href:'/'},{label:'Usimamizi'},{label:'Tafuta Watu'}]} />
      <div className="page-header">
        <div><h1>🔍 Tafuta Watu / Person Search</h1><p>NIDA · Passport · Leseni · TIN · I-NEC · Biometric</p></div>
      </div>
      {/* Search type grid */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:20}}>
        {SEARCH_TYPES.map(t => (
          <div key={t.id} onClick={() => setSearchType(t.id)}
            style={{background:'var(--clr-panel)',border:`1px solid ${searchType===t.id?'var(--clr-accent)':'var(--clr-border)'}`,borderRadius:'var(--r)',padding:'10px 8px',textAlign:'center',cursor:'pointer',transition:'all .15s',background:searchType===t.id?'rgba(255,193,7,.06)':'var(--clr-panel)'}}>
            <div style={{fontSize:20,marginBottom:4}}>{t.icon}</div>
            <div style={{fontSize:11,fontWeight:600,color:'var(--clr-white)'}}>{t.label}</div>
            <div style={{fontSize:9,color:'var(--clr-muted)'}}>{t.sub}</div>
          </div>
        ))}
      </div>
      {/* Search bar */}
      <div className="card section-gap">
        <div className="card-body">
          <div style={{display:'flex',gap:8,marginBottom:8}}>
            <input className="form-input" style={{flex:1,fontSize:14,padding:'12px 16px'}} placeholder={`Weka namba ya ${searchType}...`} value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSearch()} />
            <Button variant="primary" size="lg" onClick={handleSearch}>🔍 Tafuta</Button>
            <Button variant="outline" size="lg">📷 Scan</Button>
          </div>
        </div>
      </div>
      {/* Result */}
      {result && (
        <div className="card section-gap animate-fade-in" style={{overflow:'hidden'}}>
          <div style={{background:'linear-gradient(135deg,var(--clr-primary),#0A3D0A)',padding:20,display:'flex',gap:16,alignItems:'flex-start'}}>
            <div style={{width:72,height:72,borderRadius:'50%',background:'rgba(0,0,0,.3)',border:'2px solid var(--clr-accent)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,flexShrink:0}}>👤</div>
            <div style={{flex:1}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:4}}>
                <div style={{fontSize:18,fontWeight:800,color:'#fff'}}>{p.fullName}</div>
                <span className="status s-active">Hakuna Tahadhari</span>
              </div>
              <div style={{fontSize:10,fontFamily:'var(--font-mono)',color:'rgba(255,255,255,.7)',marginBottom:6}}>ID: {p.id} · NIDA: {p.nida}</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,fontSize:11}}>
                {[['Jinsia',p.gender],['DOB',`${p.dob} (${p.age} yrs)`],['Uraia',p.nationality],['Mkoa',p.region]].map(([l,v]) => (
                  <div key={l}><div style={{color:'rgba(255,255,255,.5)',fontSize:9,textTransform:'uppercase'}}>{l}</div><div style={{color:'#fff',fontWeight:500,marginTop:2}}>{v}</div></div>
                ))}
              </div>
            </div>
          </div>
          {/* ID Documents */}
          <div style={{padding:16,borderBottom:'1px solid var(--clr-border)'}}>
            <div style={{fontSize:11,fontWeight:700,color:'var(--clr-muted)',textTransform:'uppercase',marginBottom:10}}>Nyaraka za Utambulisho</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:8}}>
              {Object.entries(p.documents).map(([type,doc]) => (
                <div key={type} style={{background:'var(--clr-dark)',border:'1px solid var(--clr-border)',borderRadius:'var(--r)',padding:'10px 12px'}}>
                  <div style={{fontSize:9,color:'var(--clr-muted)',textTransform:'uppercase'}}>{type.toUpperCase()}</div>
                  <div style={{fontSize:11,fontFamily:'var(--font-mono)',color:'var(--clr-accent)',margin:'3px 0',fontWeight:600}}>{doc.number}</div>
                  <span className="status s-active" style={{fontSize:'9px',padding:'1px 6px'}}>Ndiyo</span>
                </div>
              ))}
            </div>
          </div>
          {/* Actions */}
          <div style={{padding:'14px 16px',display:'flex',gap:8,flexWrap:'wrap'}}>
            <Button variant="outline" size="sm">📋 Toa Citation</Button>
            <Button variant="outline" size="sm">⛓️ Kamata</Button>
            <Button variant="outline" size="sm">🔒 Detain</Button>
            <Button variant="outline" size="sm">📝 Ripoti ya Tukio</Button>
            <Button variant="danger" size="sm">🚨 Escalate</Button>
          </div>
        </div>
      )}
    </div>
  )
}
