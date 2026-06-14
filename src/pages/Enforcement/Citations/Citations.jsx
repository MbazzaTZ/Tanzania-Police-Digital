import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
import PoliceBadge from '@components/shared/PoliceBadge'
import { MOCK_CITATIONS } from '@utils/mockData'
import { useApp } from '@context/AppContext'

const TABS = [
  {id:'all',label:'Zote',count:28},{id:'draft',label:'Draft',count:5},
  {id:'issued',label:'Issued',count:20},{id:'paid',label:'Paid',count:3},{id:'cancelled',label:'Cancelled',count:0},
]

export default function Citations() {
  const navigate = useNavigate()
  const { currentOfficer } = useApp()
  const [tab, setTab] = useState('all')
  const [search, setSearch] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [page, setPage] = useState(1)
  const PER_PAGE = 8

  const filtered = useMemo(() => {
    let items = MOCK_CITATIONS
    if (tab !== 'all') items = items.filter(c => c.status === tab)
    if (search) {
      const q = search.toLowerCase()
      items = items.filter(c =>
        c.suspect.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) ||
        c.vehicle.toLowerCase().includes(q) || c.offence.toLowerCase().includes(q) || c.nida.includes(q)
      )
    }
    return items
  }, [tab, search])

  const totals = {
    total: MOCK_CITATIONS.length,
    paid:  MOCK_CITATIONS.filter(c => c.status==='paid').length,
    unpaid:MOCK_CITATIONS.filter(c => c.status==='unpaid').length,
    cancelled:MOCK_CITATIONS.filter(c => c.status==='cancelled').length,
  }

  return (
    <div className="animate-fade-in">
      {/* Mobile-style header */}
      <div style={{background:'linear-gradient(135deg,#0D2E0F,#1B5E20)',borderRadius:'var(--r-xl)',padding:'18px 20px',marginBottom:20,display:'flex',gap:16,alignItems:'center'}}>
        <PoliceBadge size={48} />
        <div>
          <div style={{fontSize:10,color:'rgba(255,255,255,.5)',textTransform:'uppercase',letterSpacing:.8,marginBottom:2}}>TOA CITATION (LESENI)</div>
          <div style={{fontSize:16,fontWeight:800,color:'white'}}>Citations Zilizotolewa</div>
          <div style={{fontSize:11,color:'rgba(255,255,255,.6)',marginTop:1}}>{currentOfficer.station}</div>
        </div>
        <div style={{marginLeft:'auto',display:'flex',flexDirection:'column',gap:2,alignItems:'flex-end'}}>
          <div style={{fontSize:10,color:'rgba(255,255,255,.5)'}}>📅 17 Mei 2024</div>
          <div style={{fontSize:10,color:'rgba(255,255,255,.5)'}}>🕐 10:45 AM</div>
        </div>
      </div>

      {/* Stats pills */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:18}}>
        {[
          {icon:'📋',val:totals.total,label:'Zote',sub:'Jumla ya Citation Zilizotolewa'},
          {icon:'✅',val:totals.paid,label:'Imelipwa',sub:`${Math.round(totals.paid/totals.total*100)}%`},
          {icon:'⏳',val:totals.unpaid,label:'Haijalipwa',sub:'30%'},
          {icon:'❌',val:totals.cancelled,label:'Imeghairiwa',sub:'12%'},
        ].map(p => (
          <div key={p.label} style={{background:'var(--green-700)',border:'1px solid var(--border)',borderRadius:'var(--r-md)',padding:'12px 14px',textAlign:'center'}}>
            <div style={{fontSize:9,color:'var(--text-muted)',marginBottom:4,textTransform:'uppercase',letterSpacing:.5}}>{p.label}</div>
            <div style={{fontSize:26,fontWeight:800,color:'var(--text-white)',fontFamily:"'JetBrains Mono',monospace",lineHeight:1}}>{p.val}</div>
            <div style={{fontSize:9,color:'var(--text-muted)',marginTop:3}}>{p.sub}</div>
          </div>
        ))}
      </div>

      {/* Action bar */}
      <div style={{display:'flex',gap:10,marginBottom:14,flexWrap:'wrap',alignItems:'center'}}>
        {/* Tabs */}
        <div className="tabs" style={{flex:1,minWidth:300}}>
          {TABS.map(t => (
            <button key={t.id} className={`tab ${tab===t.id?'active':''}`} onClick={() => setTab(t.id)}>
              {t.label}
              {t.count>0 && <span style={{marginLeft:4,fontSize:9,opacity:.7}}>({t.count})</span>}
            </button>
          ))}
        </div>
        {/* Search */}
        <div style={{position:'relative',minWidth:220}}>
          <input className="form-input" style={{padding:'7px 10px 7px 30px',borderRadius:20,fontSize:11}}
            placeholder="🔍 Tafuta kwa namba ya citation, jina au kosa..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="form-select" style={{width:'auto',fontSize:11,padding:'7px 10px',borderRadius:20}}>
          <option>01 Mei – 17 Mei 2024</option>
          <option>Leo</option><option>Wiki Hii</option><option>Mwezi Huu</option>
        </select>
        <button className="btn btn-ghost btn-sm">⚙️ Filter</button>
        <Button variant="gold" size="sm" onClick={() => navigate('/enforcement/citations/new')}>+ Toa Citation Mpya</Button>
      </div>

      {/* Table header label */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
        <div style={{fontSize:12,fontWeight:700,color:'var(--text-muted)'}}>ORODHA YA CITATIONS ({filtered.length})</div>
        <div style={{fontSize:11,color:'var(--text-muted)'}}>Panga kwa: Tarehe (Mpya) ⇅</div>
      </div>

      {/* Citation list – mobile card style from screenshots */}
      <div className="card" style={{marginBottom:16}}>
        {filtered.map((c, idx) => (
          <div key={c.id} className="citation-item" onClick={() => navigate(`/enforcement/citations/${c.id}`)}>
            {/* Number */}
            <div style={{fontSize:11,color:'var(--text-muted)',minWidth:16,textAlign:'center'}}>{idx+1}</div>
            {/* Icon */}
            <div className="citation-icon">📋</div>
            {/* Meta */}
            <div className="citation-meta">
              <div style={{display:'flex',alignItems:'center',gap:6}}>
                <span className="citation-id">{c.id}</span>
              </div>
              <div style={{fontSize:11,color:'var(--text-muted)',marginTop:1}}>{c.suspect}</div>
              <div style={{fontSize:10,color:'rgba(255,255,255,.35)'}}>{c.offence}</div>
              {/* Vehicle plate */}
              <div style={{display:'inline-block',marginTop:3,fontSize:10,fontFamily:"'JetBrains Mono',monospace",background:'rgba(255,255,255,.07)',border:'1px solid var(--border)',borderRadius:4,padding:'1px 6px',color:'var(--text-muted)'}}>{c.vehicle}</div>
            </div>
            {/* Date + Location */}
            <div style={{textAlign:'center',minWidth:120}}>
              <div style={{fontSize:10,color:'var(--text-light)',fontFamily:"'JetBrains Mono',monospace"}}>📅 {c.date} • {c.time}</div>
              <div style={{fontSize:10,color:'var(--text-muted)',marginTop:2}}>📍 {c.location}</div>
            </div>
            {/* Status + Amount */}
            <div className="citation-right">
              <Badge status={c.status} />
              <div style={{fontSize:13,fontWeight:800,color:'var(--text-white)',marginTop:4,fontFamily:"'JetBrains Mono',monospace"}}>TZS {c.fine.toLocaleString()}</div>
            </div>
            {/* Actions */}
            <div style={{fontSize:18,color:'var(--text-muted)',cursor:'pointer'}}>⋮</div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{textAlign:'center',padding:40,color:'var(--text-muted)'}}>Hakuna matokeo yanayolingana na utafutaji</div>
        )}

        {/* Pagination */}
        <div className="pagination">
          <div className="page-info">Inaonyesha 1 hadi 8 ya {filtered.length} matokeo</div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <select className="form-select" style={{width:'auto',fontSize:11,padding:'4px 8px'}}>
              <option>8 kwa ukurasa</option><option>16</option><option>32</option>
            </select>
            <div className="page-btns">
              <button className="page-btn" disabled>‹</button>
              {[1,2,3,'…',16].map((p,i) => (
                <button key={i} className={`page-btn ${p===1?'active':''}`} onClick={() => typeof p==='number'&&setPage(p)}>{p}</button>
              ))}
              <button className="page-btn">›</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div style={{display:'flex',gap:10}}>
        <Button variant="outline" size="sm">⬇ Pakua Ripoti</Button>
        <Button variant="outline" size="sm">📧 Tuma kwa Barua Pepe</Button>
        <Button variant="outline" size="sm">📄 Hifadhi kama PDF</Button>
      </div>
    </div>
  )
}
