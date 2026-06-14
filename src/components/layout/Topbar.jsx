import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '@context/AppContext'
import { SCOPE_LABELS } from '@utils/constants'

const PAGE_TITLES = {
  '/': '📊 Dashibodi ya Taifa',
  '/dashboard/regional': '🗺️ Dashibodi ya Mkoa',
  '/dashboard/district': '🏛️ Dashibodi ya Wilaya',
  '/dashboard/station':  '🏢 Dashibodi ya Kituo',
  '/enforcement/citations': '📋 Citations',
  '/enforcement/arrests': '⛓️ Kukamatwa',
  '/enforcement/detentions': '🔒 Kizuizini',
  '/enforcement/incidents': '📝 Matukio',
  '/enforcement/accidents': '🚗 Ajali',
  '/enforcement/pf3': '📄 PF3 Forms',
  '/investigation/cases': '📁 Kesi / Cases',
  '/investigation/warrants': '⚖️ Amri / Warrants',
  '/investigation/wanted': '🎯 Watuhumiwa',
  '/investigation/missing': '👤 Watu Waliopotea',
  '/investigation/evidence': '🔬 Ushahidi',
  '/investigation/forensics': '🧪 Forensics',
  '/intelligence': '🧠 Ujasusi',
  '/operations/map': '🗺️ Ramani ya Operesheni',
  '/operations/alerts': '🚨 Taarifa za Haraka',
  '/operations/patrol': '🚔 Doria',
  '/operations/roadblocks': '🚧 Vizuizi',
  '/operations/checkpoints': '⛽ Checkpoints',
  '/management/persons': '🔍 Tafuta Watu',
  '/management/vehicles': '🚗 Usajili wa Magari',
  '/management/officers': '👮 Maafisa',
  '/management/stations': '🏢 Vituo',
  '/management/prisoners': '🔒 Wafungwa',
  '/management/cells': '🔐 Seli',
  '/management/firearms': '🔫 Silaha',
  '/management/assets': '🏗️ Mali',
  '/management/courts': '🏛️ Mahakama',
  '/communications': '💬 Mawasiliano',
  '/hr': '👥 Rasilimali Watu',
  '/reports/crime': '📊 Takwimu za Uhalifu',
  '/reports/analytics': '📉 Uchambuzi',
  '/reports/performance': '📈 Utendaji',
  '/system/audit': '🗂️ Rekodi ya Ukaguzi',
  '/system/rbac': '🛡️ Udhibiti wa Ufikiaji',
  '/system/settings': '⚙️ Mipangilio',
}

export default function Topbar() {
  const { lang, toggleLang, currentOfficer } = useApp()
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const pageTitle = Object.entries(PAGE_TITLES).find(([path]) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
  )?.[1] || 'TPDOP'

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/management/persons?q=${encodeURIComponent(search.trim())}`)
      setSearch('')
    }
  }

  return (
    <header style={{
      height:'var(--topbar-h)',
      background:'var(--clr-surface)',
      borderBottom:'1px solid var(--clr-border)',
      display:'flex', alignItems:'center', gap:12,
      padding:'0 20px', flexShrink:0,
    }}>
      {/* Page title */}
      <div style={{ minWidth:180 }}>
        <div className="topbar-title">{pageTitle}</div>
        <div className="topbar-sub">{currentOfficer.region} · {new Date().toLocaleDateString('sw-TZ',{weekday:'short',day:'numeric',month:'short',year:'numeric'})}</div>
      </div>

      {/* Global search */}
      <div className="search-wrap" style={{ flex:1, maxWidth:420 }}>
        <input
          type="text" value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={handleSearch}
          placeholder={lang==='sw' ? 'Tafuta mtu, gari, kesi, citation, NIDA... (Enter)' : 'Search person, vehicle, case, NIDA... (Enter)'}
        />
      </div>

      <div className="topbar-actions">
        {/* Lang toggle */}
        <div className="lang-toggle">
          <button className={`lang-btn ${lang==='sw'?'active':''}`} onClick={toggleLang}>SW</button>
          <button className={`lang-btn ${lang==='en'?'active':''}`} onClick={toggleLang}>EN</button>
        </div>

        {/* Quick actions */}
        <div className="icon-btn" onClick={() => navigate('/operations/alerts')} title="Taarifa za Haraka">
          🔔<span className="notif-count">5</span>
        </div>
        <div className="icon-btn" onClick={() => navigate('/communications')} title="Mawasiliano / Messages">💬</div>
        <div className="icon-btn" title="GPS Tracking Hai">📡</div>
        <div className="icon-btn" onClick={() => navigate('/system/settings')} title="Profaili / Settings">👤</div>
      </div>
    </header>
  )
}
