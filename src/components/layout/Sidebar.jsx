import { NavLink, useLocation } from 'react-router-dom'
import { useApp } from '@context/AppContext'
import { getNavItems } from '@utils/rbac'

export default function Sidebar() {
  const { currentOfficer, lang } = useApp()
  const location = useLocation()
  const navItems  = getNavItems(currentOfficer.role)

  // group items by section
  const sections = navItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = []
    acc[item.section].push(item)
    return acc
  }, {})

  return (
    <aside style={{
      width:'var(--sidebar-w)', height:'100vh',
      background:'var(--clr-surface)',
      borderRight:'1px solid var(--clr-border)',
      display:'flex', flexDirection:'column',
      position:'fixed', left:0, top:0, zIndex:100,
      overflowY:'auto',
    }}>
      {/* Logo */}
      <NavLink to="/" style={{ padding:'15px 14px 12px', borderBottom:'1px solid var(--clr-border)', display:'flex', alignItems:'center', gap:10, textDecoration:'none', flexShrink:0 }}>
        <div className="police-badge">🛡️</div>
        <div className="logo-text">
          <strong>JESHI LA POLISI</strong>
          <span>Tanzania · TPDOP</span>
        </div>
      </NavLink>

      {/* Role chip */}
      <div style={{ padding:'6px 12px', borderBottom:'1px solid var(--clr-border)' }}>
        <div className="role-chip">{currentOfficer.role.replace(/_/g,' ').toUpperCase()} · {currentOfficer.station.replace(' Police Station','')}</div>
      </div>

      {/* Dynamic RBAC nav */}
      <nav style={{ flex:1 }}>
        {Object.entries(sections).map(([section, items]) => (
          <div key={section} className="nav-section">
            <div className="nav-label">{section}</div>
            {items.map(item => {
              const isActive = item.to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.to)
              return (
                <NavLink key={item.to} to={item.to}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  style={{ textDecoration:'none' }}>
                  <span className="nav-icon">{item.icon}</span>
                  <span style={{ flex:1, fontSize:11.5 }}>{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Officer footer */}
      <div style={{ padding:'10px 12px', borderTop:'1px solid var(--clr-border)', flexShrink:0 }}>
        <div className="officer-card">
          <div className="officer-avatar">👮</div>
          <div className="officer-info" style={{ flex:1, minWidth:0 }}>
            <strong>{currentOfficer.name}</strong>
            <span>Badge: {currentOfficer.badge}</span>
          </div>
          <div className="online-dot" />
        </div>
      </div>
    </aside>
  )
}
