import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@context/AppContext'

export default function Topbar() {
  const { lang, toggleLang, currentOfficer } = useApp()
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim())
      navigate(`/management/persons?q=${encodeURIComponent(search)}`)
  }

  return (
    <header style={{ height:'var(--topbar-h)', background:'var(--clr-surface)', borderBottom:'1px solid var(--clr-border)', display:'flex', alignItems:'center', gap:12, padding:'0 20px', flexShrink:0 }}>
      <div>
        <div className="topbar-title">Tanzania Police Force</div>
        <div className="topbar-sub">TPDOP · {currentOfficer.station} · {currentOfficer.region}</div>
      </div>

      <div className="search-wrap" style={{ flex:1, maxWidth:380 }}>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={handleSearch}
          placeholder={lang==='sw' ? 'Tafuta mtu, gari, kesi, citation, NIDA...' : 'Search person, vehicle, case, citation...'} />
      </div>

      <div className="topbar-actions">
        <div className="lang-toggle">
          <button className={`lang-btn ${lang==='sw'?'active':''}`} onClick={toggleLang}>SW</button>
          <button className={`lang-btn ${lang==='en'?'active':''}`} onClick={toggleLang}>EN</button>
        </div>
        <div className="icon-btn" onClick={() => navigate('/operations/alerts')} title="Taarifa za Haraka">🔔<span className="notif-count">5</span></div>
        <div className="icon-btn" onClick={() => navigate('/communications')} title="Mawasiliano">💬</div>
        <div className="icon-btn" title="GPS Tracking">📡</div>
        <div className="icon-btn" onClick={() => navigate('/system/settings')} title="Mipangilio">👤</div>
      </div>
    </header>
  )
}
