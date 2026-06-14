import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@context/AppContext'

export default function Topbar() {
  const { lang, toggleLang } = useApp()
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/management/persons?q=${encodeURIComponent(search)}`)
    }
  }

  return (
    <header style={{
      height: 'var(--topbar-h)',
      background: 'var(--clr-surface)',
      borderBottom: '1px solid var(--clr-border)',
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '0 20px', flexShrink: 0,
    }}>
      <div>
        <div className="topbar-title">Tanzania Police Force</div>
        <div className="topbar-sub">Digital Operations Platform · Web Command Center</div>
      </div>

      {/* Global Search */}
      <div className="search-wrap" style={{ flex: 1, maxWidth: 380 }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={handleSearch}
          placeholder={lang === 'sw' ? 'Tafuta mtu, gari, kesi, citation...' : 'Search person, vehicle, case...'}
        />
      </div>

      <div className="topbar-actions">
        {/* Language Toggle */}
        <div className="lang-toggle">
          <button className={`lang-btn ${lang === 'sw' ? 'active' : ''}`} onClick={toggleLang}>SW</button>
          <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={toggleLang}>EN</button>
        </div>

        {/* Alerts */}
        <div className="icon-btn" onClick={() => navigate('/operations/alerts')} title="Taarifa za Haraka">
          🔔<span className="notif-count">5</span>
        </div>

        {/* Live status */}
        <div className="icon-btn" title="Mfumo Hai">📡</div>

        {/* Profile */}
        <div className="icon-btn" onClick={() => navigate('/system/settings')} title="Mipangilio">👤</div>
      </div>
    </header>
  )
}
