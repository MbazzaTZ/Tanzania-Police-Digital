import { NavLink, useLocation } from 'react-router-dom'
import { useApp } from '@context/AppContext'
import { getNavItems } from '@utils/rbac'
import PoliceBadge from '@components/shared/PoliceBadge'

export default function Sidebar() {
  const { currentOfficer } = useApp()
  const location = useLocation()
  const navItems = getNavItems(currentOfficer.role)

  // Group nav items by section
  const sections = navItems.reduce((acc, item) => {
    const s = item.section
    if (!acc[s]) acc[s] = []
    acc[s].push(item)
    return acc
  }, {})

  return (
    <aside className="sidebar">
      {/* Logo */}
      <NavLink to="/" className="sidebar-logo">
        <PoliceBadge size={40} />
        <div className="sidebar-brand">
          <strong>JESHI LA POLISI</strong>
          <span>Tanzania · TPDOP</span>
        </div>
      </NavLink>

      {/* Nav */}
      <nav style={{flex:1, paddingBottom:8}}>
        {Object.entries(sections).map(([section, items]) => (
          <div key={section} className="nav-section">
            <div className="nav-section-label">{section}</div>
            {items.map(item => {
              const isActive = item.to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.to)
              return (
                <NavLink key={item.to} to={item.to}
                  className={`nav-link ${isActive ? 'active' : ''}`}>
                  <span className="nav-icon">{item.icon}</span>
                  <span style={{flex:1, fontSize:'11.5px'}}>{item.label}</span>
                  {item.badge && <span className="nav-badge-count">{item.badge}</span>}
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Officer Footer */}
      <div className="sidebar-footer">
        <div className="role-pill">
          {currentOfficer.role.replace(/_/g,' ').toUpperCase()}
        </div>
        <div className="officer-row">
          <div className="officer-avatar">👮</div>
          <div className="officer-meta">
            <strong>{currentOfficer.name}</strong>
            <span>Badge: {currentOfficer.badge}</span>
          </div>
          <div className="online-dot" title="Online" />
        </div>
      </div>
    </aside>
  )
}
