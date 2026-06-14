import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@context/AppContext'
import PoliceBadge from '@components/shared/PoliceBadge'

export default function Topbar() {
  const { lang, toggleLang, currentOfficer } = useApp()
  const [q, setQ] = useState('')
  const nav = useNavigate()

  const go = e => { if (e.key==='Enter' && q.trim()) nav(`/management/persons?q=${encodeURIComponent(q)}`) }

  return (
    <header className="topbar">
      <div className="flex aic g10 " style={{flexShrink:0}}>
        <PoliceBadge size={28} />
        <div className="tb-brand">
          <strong>TPDOP</strong>
          <span>{currentOfficer.station}</span>
        </div>
      </div>

      <div className="tb-search">
        <span className="si">🔍</span>
        <input type="text" value={q} onChange={e=>setQ(e.target.value)} onKeyDown={go}
          placeholder={lang==='sw'?'Tafuta mtu, gari, kesi, citation, NIDA...':'Search person, vehicle, case, citation...'} />
      </div>

      <div className="tb-actions">
        <div className="lang-tog">
          <button className={`lang-b ${lang==='sw'?'on':''}`} onClick={toggleLang}>SW</button>
          <button className={`lang-b ${lang==='en'?'on':''}`} onClick={toggleLang}>EN</button>
        </div>
        <div className="tb-ic" onClick={()=>nav('/operations/alerts')} title="Taarifa">
          🔔<span className="bdg">5</span>
        </div>
        <div className="tb-ic" onClick={()=>nav('/communications')} title="Ujumbe">💬</div>
        <div className="tb-ic" title="GPS">📡</div>
        <div className="tb-ic" onClick={()=>nav('/system/settings')} title="Profaili">👤</div>
      </div>
    </header>
  )
}
