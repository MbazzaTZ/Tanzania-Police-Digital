import { Outlet } from 'react-router-dom'
import Sidebar from '@components/layout/Sidebar'
import Topbar  from '@components/layout/Topbar'

export default function MainLayout() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-col">
        <Topbar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
