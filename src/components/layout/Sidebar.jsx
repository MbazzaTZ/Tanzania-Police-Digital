import { NavLink, useLocation } from 'react-router-dom'
import { useApp } from '@context/AppContext'
import { getNavItems } from '@utils/rbac'

export default function Sidebar() {
  const { currentOfficer } = useApp()
  const location = useLocation()
  const navItems = getNavItems(currentOfficer.role)

  // Group by section
  const sections = navItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = []
    acc[item.section].push(item)
    return acc
  }, {})

  return (
    <aside style={{ width:'var(--sidebar-w)', height:'100vh', background:'var(--clr-surface)', borderRight:'1px solid var(--clr-border)', display:'flex', flexDirection:'column', position:'fixed', left:0, top:0, zIndex:100, overflowY:'auto' }}>
      {/* Logo */}
      <NavLink to="/" style={{ padding:'18px 16px 14px', borderBottom:'1px solid var(--clr-border)', display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
        <div className="police-badge">🛡️</div>
        <div className="logo-text">
          <strong>JESHI LA POLISI</strong>
          <span>Tanzania · TPDOP</span>
        </div>
      </NavLink>

      {/* Nav by section */}
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
                  <span style={{ flex:1 }}>{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Officer footer */}
      <div style={{ padding:'12px 16px', borderTop:'1px solid var(--clr-border)' }}>
        {/* Role badge */}
        <div style={{ fontSize:9, fontWeight:700, color:'var(--clr-accent)', textTransform:'uppercase', letterSpacing:1, marginBottom:8, textAlign:'center', background:'rgba(255,193,7,.1)', padding:'3px 8px', borderRadius:10 }}>
          {currentOfficer.role.replace('_',' ').toUpperCase()} · {currentOfficer.scope || 'STATION'}
        </div>
        <div className="officer-card">
          <div className="officer-avatar">👮</div>
          <div className="officer-info" style={{ flex:1, minWidth:0 }}>
            <strong style={{ fontSize:10 }}>{currentOfficer.name}</strong>
            <span>Badge: {currentOfficer.badge}</span>
          </div>
          <div className="online-dot" title="Online" />
        </div>
      </div>
    </aside>
  )
}
