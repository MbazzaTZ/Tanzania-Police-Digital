import { Outlet } from 'react-router-dom'
import Sidebar from '@components/layout/Sidebar'
import Topbar  from '@components/layout/Topbar'

export default function MainLayout() {
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
        minWidth: 0,
      }}>
        <Topbar />
        <main style={{ flex:1, overflowY:'auto', padding:'18px 20px', background:'var(--green-900)' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
