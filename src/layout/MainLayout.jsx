import { Outlet } from 'react-router-dom'
import Sidebar  from '@components/layout/Sidebar'
import Topbar   from '@components/layout/Topbar'
import { useApp } from '@context/AppContext'

export default function MainLayout() {
  const { sidebarOpen } = useApp()
  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden' }}>
      <Sidebar />
      <div style={{
        marginLeft: 'var(--sidebar-w)',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--clr-dark)',
      }}>
        <Topbar />
        <main style={{ flex:1, overflowY:'auto', padding:'18px 20px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
