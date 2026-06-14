import { Outlet } from 'react-router-dom'
import Sidebar from '@components/layout/Sidebar'
import Topbar  from '@components/layout/Topbar'
import Toast   from '@components/ui/Toast'
import { useToast } from '@hooks/useToast'

export default function MainLayout() {
  const { toast } = useToast()

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <div style={{
        marginLeft: 'var(--sidebar-w)',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}>
        <Topbar />
        <main style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
          <Outlet />
        </main>
      </div>
      <Toast toast={toast} />
    </div>
  )
}
