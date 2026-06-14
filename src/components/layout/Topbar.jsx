import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@context/AppContext'
import PoliceBadge from '@components/shared/PoliceBadge'

export default function Topbar() {
  const { lang, toggleLang, currentOfficer } = useApp()
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = e => {
    if (e.key === 'Enter' && search.trim())
      navigate(`/management/persons?q=${encodeURIComponent(search)}`)
  }

  return (
    <header className="topbar">
      <div style={{display:'flex', alignItems:'center', gap:10, flexShrink:0}}>
        <PoliceBadge size={30} />
        <div>
          <div className="topbar-title">TPDOP</div>
          <div className="topbar-sub">{currentOfficer.station}</div>
        </div>
      </div>

      <div className="topbar-search">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={handleSearch}
          placeholder={lang==='sw' ? 'Tafuta mtu, gari, kesi, citation, NIDA...' : 'Search person, vehicle, case...'}
        />
      </div>

      <div className="topbar-actions">
        <div className="lang-toggle">
          <button className={`lang-btn ${lang==='sw'?'active':''}`} onClick={toggleLang}>SW</button>
          <button className={`lang-btn ${lang==='en'?'active':''}`} onClick={toggleLang}>EN</button>
        </div>
        <div className="topbar-icon" onClick={() => navigate('/operations/alerts')} title="Taarifa za Haraka">
          🔔<span className="badge">5</span>
        </div>
        <div className="topbar-icon" onClick={() => navigate('/communications')} title="Ujumbe">💬</div>
        <div className="topbar-icon" title="GPS Tracking">📡</div>
        <div className="topbar-icon" onClick={() => navigate('/system/settings')} title="Profaili">👤</div>
      </div>
    </header>
  )
}
