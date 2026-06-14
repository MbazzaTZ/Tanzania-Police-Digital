import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import PoliceBadge from '@components/shared/PoliceBadge'
import Button from '@components/ui/Button'
import Badge from '@components/ui/Badge'
import { MOCK_CITATIONS } from '@utils/mockData'
import { useApp } from '@context/AppContext'

export default function Citations() {
  const nav = useNavigate()
  const { currentOfficer } = useApp()
  const [tab, setTab] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    let items = MOCK_CITATIONS
    if (tab !== 'all') items = items.filter(c => c.status === tab)
    if (search) {
      const q = search.toLowerCase()
      items = items.filter(c => c.suspect.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.vehicle.toLowerCase().includes(q) || c.offence.toLowerCase().includes(q) || c.nida.includes(q))
    }
    return items
  }, [tab, search])

  const totals = {
    all: MOCK_CITATIONS.length,
    draft: MOCK_CITATIONS.filter(c=>c.status==='draft').length,
    issued: MOCK_CITATIONS.filter(c=>c.status==='issued').length,
    paid: MOCK_CITATIONS.filter(c=>c.status==='paid').length,
    cancelled: MOCK_CITATIONS.filter(c=>c.status==='cancelled').length,
  }

  return (
    <div className="afd">
      {/* Header banner */}
      <div style={{background:'linear-gradient(135deg,#080C1A,#1a237e)',borderRadius:'var(--r16)',padding:'16px 20px',marginBottom:16,display:'flex',gap:14,alignItems:'center'}}>
        <PoliceBadge size={44} />
        <div style={{flex:1}}>
          <div style={{fontSize:9,color:'rgba(255,255,255,.5)',textTransform:'uppercase',letterSpacing:1,marginBottom:1}}>TOA CITATION (LESENI)</div>
          <div style={{fontSize:16,fontWeight:800,color:'white',marginBottom:1}}>Citations Zilizotolewa</div>
          <div style={{fontSize:10,color:'rgba(255,255,255,.6)'}}>Tengeneza, angalia na simamia citations zote · {currentOfficer.station}</div>
        </div>
        <div style={{textAlign:'right',flexShrink:0}}>
          <div style={{fontSize:9.5,color:'rgba(255,255,255,.5)'}}>📅 17 Mei 2024</div>
          <div style={{fontSize:9.5,color:'rgba(255,255,255,.5)',marginTop:2}}>🕐 10:45 AM</div>
        </div>
        <button className="btn btn-g" onClick={()=>nav('/enforcement/citations/new')}>+ Toa Citation Mpya</button>
      </div>

      {/* Stat pills */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:8,marginBottom:14}}>
        {[
          {lb:'Zote',       val:totals.all,      sub:'Jumla', ic:'📋'},
          {lb:'Draft',      val:totals.draft,    sub:'5',     ic:'✏️'},
          {lb:'Issued',     val:totals.issued,   sub:'20',    ic:'✅'},
          {lb:'Paid',       val:totals.paid,     sub:'03',    ic:'💳'},
          {lb:'Cancelled',  val:totals.cancelled,sub:'00',    ic:'❌'},
        ].map(p => (
          <div key={p.lb} onClick={()=>setTab(p.lb.toLowerCase()==='zote'?'all':p.lb.toLowerCase())}
            style={{background:'var(--g700)',border:`1px solid ${tab===(p.lb.toLowerCase()==='zote'?'all':p.lb.toLowerCase())?'var(--gold)':'var(--b)'}`,borderRadius:'var(--r10)',padding:'11px 12px',textAlign:'center',cursor:'pointer',transition:'var(--t)'}}>
            <div style={{fontSize:9,color:'var(--tm)',textTransform:'uppercase',letterSpacing:.4,marginBottom:3}}>{p.lb}</div>
            <div style={{fontSize:24,fontWeight:800,color:'var(--tw)',fontFamily:'var(--fm)',lineHeight:1}}>{p.val}</div>
            <div style={{fontSize:9,color:'var(--td)',marginTop:3}}>{p.sub}</div>
          </div>
        ))}
      </div>

      {/* Search + Tabs + Filter */}
      <div style={{display:'flex',gap:8,marginBottom:12,flexWrap:'wrap',alignItems:'center'}}>
        <div className="tabs">
          {['Zote','Draft','Issued','Paid','Cancelled'].map(t => {
            const key = t.toLowerCase()==='zote' ? 'all' : t.toLowerCase()
            return <button key={t} className={`tab ${tab===key?'on':''}`} onClick={()=>setTab(key)}>{t}</button>
          })}
        </div>
        <div style={{position:'relative',flex:1,minWidth:220}}>
          <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',fontSize:13,opacity:.4}}>🔍</span>
          <input className="fi" style={{paddingLeft:34,borderRadius:20,fontSize:11}}
            placeholder="Tafuta kwa namba ya citation, jina au kosa..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        <select className="fs" style={{width:'auto',borderRadius:20,fontSize:11,padding:'7px 10px'}}>
          <option>01 Mei – 17 Mei 2024</option><option>Leo</option><option>Wiki Hii</option>
        </select>
        <button className="btn btn-gh btn-sm">⚙️ Filter</button>
      </div>

      {/* Count + sort */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
        <div style={{fontSize:12,fontWeight:700,color:'var(--tw)'}}>ORODHA YA CITATIONS ({filtered.length})</div>
        <div style={{fontSize:10.5,color:'var(--tm)'}}>Panga kwa: Tarehe (Mpya) ⇅</div>
      </div>

      {/* Citation list */}
      <div className="card mb-sec">
        {filtered.map((c, idx) => (
          <div key={c.id} className="cit-item" onClick={()=>nav(`/enforcement/citations/${c.id}`)}>
            <div style={{fontSize:10.5,color:'var(--tm)',minWidth:16}}>{idx+1}</div>
            <div className="cit-icon">📋</div>
            <div className="cit-meta">
              <div className="cit-id">{c.id}</div>
              <div className="cit-nm">{c.suspect}</div>
              <div className="cit-of">{c.offence}</div>
              <div className="cit-plate">{c.vehicle}</div>
            </div>
            <div className="cit-dt">
              <div className="cit-dt-d">📅 {c.date} • {c.time}</div>
              <div className="cit-dt-l">📍 {c.location}</div>
            </div>
            <div className="cit-right">
              <Badge status={c.status} />
              <div className="cit-amt">TZS {c.fine.toLocaleString()}</div>
            </div>
            <div style={{fontSize:16,color:'var(--tm)'}}>⋮</div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{textAlign:'center',padding:40,color:'var(--tm)'}}>Hakuna matokeo</div>
        )}

        <div className="pag">
          <div className="pag-info">Inaonyesha 1 hadi 8 ya {MOCK_CITATIONS.length} matokeo</div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <select className="fs" style={{width:'auto',fontSize:10.5,padding:'3px 8px'}}>
              <option>8 kwa ukurasa</option><option>16</option>
            </select>
            <div className="pag-btns">
              {['‹',1,2,3,'…',16,'›'].map((p,i) => (
                <button key={i} className={`pag-btn ${p===1?'on':''}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex g8">
        <button className="btn btn-o btn-sm">⬇ Pakua Ripoti</button>
        <button className="btn btn-o btn-sm">📧 Tuma kwa Barua Pepe</button>
        <button className="btn btn-o btn-sm">📄 Hifadhi kama PDF</button>
      </div>
    </div>
  )
}
