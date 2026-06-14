import { NavLink, useLocation } from 'react-router-dom'
import { useApp } from '@context/AppContext'

const NAV = [
  { section: 'Msingi / Core', items: [
    { to:'/',                         icon:'📊', label:'Dashibodi / Dashboard' },
    { to:'/operations/map',           icon:'🗺️', label:'Ramani ya Operesheni' },
    { to:'/operations/alerts',        icon:'🚨', label:'Taarifa za Haraka', badge:5 },
  ]},
  { section: 'Utekelezaji / Enforcement', items: [
    { to:'/enforcement/citations',    icon:'📋', label:'Citations / Tiketi' },
    { to:'/enforcement/arrests',      icon:'⛓️', label:'Kukamatwa / Arrests' },
    { to:'/enforcement/incidents',    icon:'📝', label:'Matukio / Incidents' },
    { to:'/enforcement/accidents',    icon:'🚗', label:'Ajali / Accidents' },
  ]},
  { section: 'Uchunguzi / Investigation', items: [
    { to:'/investigation/cases',      icon:'📁', label:'Kesi / Cases', badge:12 },
    { to:'/investigation/wanted',     icon:'🎯', label:'Watuhumiwa Wanaotafutwa' },
    { to:'/investigation/missing',    icon:'👤', label:'Watu Waliopotea' },
    { to:'/investigation/evidence',   icon:'🔬', label:'Ushahidi / Evidence' },
  ]},
  { section: 'Usimamizi / Management', items: [
    { to:'/management/persons',       icon:'🔍', label:'Tafuta Watu / Search' },
    { to:'/management/officers',      icon:'👮', label:'Maafisa / Officers' },
    { to:'/management/stations',      icon:'🏢', label:'Vituo / Stations' },
    { to:'/management/prisoners',     icon:'🔒', label:'Wafungwa / Prisoners' },
    { to:'/management/vehicles',      icon:'🚔', label:'Usajili wa Magari' },
    { to:'/management/firearms',      icon:'🔫', label:'Silaha / Firearms' },
  ]},
  { section: 'Ripoti / Reports', items: [
    { to:'/reports',                  icon:'📈', label:'Ripoti / Reports' },
    { to:'/reports/analytics',        icon:'📉', label:'Takwimu / Analytics' },
  ]},
  { section: 'Mfumo / System', items: [
    { to:'/system/intelligence',      icon:'🧠', label:'Ujasusi / Intelligence' },
    { to:'/system/audit',             icon:'🗂️', label:'Rekodi ya Ukaguzi' },
    { to:'/system/settings',          icon:'⚙️', label:'Mipangilio' },
  ]},
]

export default function Sidebar() {
  const { currentOfficer } = useApp()
  const location = useLocation()

  return (
    <aside style={{
      width: 'var(--sidebar-w)', height: '100vh',
      background: 'var(--clr-surface)',
      borderRight: '1px solid var(--clr-border)',
      display: 'flex', flexDirection: 'column',
      position: 'fixed', left: 0, top: 0, zIndex: 100,
      overflowY: 'auto',
    }}>
      {/* Logo */}
      <NavLink to="/" style={{
        padding: '18px 16px 14px',
        borderBottom: '1px solid var(--clr-border)',
        display: 'flex', alignItems: 'center', gap: 10,
        textDecoration: 'none',
      }}>
        <div className="police-badge">🛡️</div>
        <div className="logo-text">
          <strong>JESHI LA POLISI</strong>
          <span>Tanzania · TPDOP</span>
        </div>
      </NavLink>

      {/* Nav */}
      <nav style={{ flex: 1 }}>
        {NAV.map(section => (
          <div key={section.section} className="nav-section">
            <div className="nav-label">{section.section}</div>
            {section.items.map(item => {
              const isActive = item.to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.to)
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  style={{ textDecoration: 'none' }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.label}
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Officer Footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid var(--clr-border)' }}>
        <div className="officer-card">
          <div className="officer-avatar">👮</div>
          <div className="officer-info">
            <strong>{currentOfficer.name}</strong>
            <span>Badge: {currentOfficer.badge} · {currentOfficer.role}</span>
          </div>
          <div className="online-dot" title="Online" />
        </div>
      </div>
    </aside>
  )
}
