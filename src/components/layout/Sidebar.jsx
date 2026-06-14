import { NavLink, useLocation } from 'react-router-dom'
import { useApp } from '@context/AppContext'
import { getNavItems } from '@utils/rbac'
import PoliceBadge from '@components/shared/PoliceBadge'

export default function Sidebar() {
  const { currentOfficer } = useApp()
  const location = useLocation()
  const navItems = getNavItems(currentOfficer.role)

  const sections = navItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = []
    acc[item.section].push(item)
    return acc
  }, {})

  return (
    <aside className="sidebar">
      <NavLink to="/" className="sb-logo">
        <PoliceBadge size={36} />
        <div className="sb-brand">
          <strong>JESHI LA POLISI</strong>
          <span>Tanzania · TPDOP</span>
        </div>
      </NavLink>

      <nav style={{flex:1, paddingBottom:6}}>
        {Object.entries(sections).map(([sec, items]) => (
          <div key={sec} className="nav-sec">
            <div className="nav-sec-lbl">{sec}</div>
            {items.map(item => {
              const active = item.to==='/' ? location.pathname==='/' : location.pathname.startsWith(item.to)
              return (
                <NavLink key={item.to} to={item.to} className={`nav-a ${active?'active':''}`}>
                  <span className="nav-ic">{item.icon}</span>
                  <span style={{flex:1}}>{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="sb-foot">
        <div className="sb-role">{currentOfficer.role.replace(/_/g,' ').toUpperCase()}</div>
        <div className="sb-officer">
          <div className="sb-av">👮</div>
          <div className="sb-info">
            <strong>{currentOfficer.name}</strong>
            <span>Badge: {currentOfficer.badge}</span>
          </div>
          <div className="online-dot" title="Online" />
        </div>
      </div>
    </aside>
  )
}
