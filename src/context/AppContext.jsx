import { createContext, useContext, useState } from 'react'
import { CURRENT_OFFICER } from '@utils/mockData'
import { getDashboardScope } from '@utils/rbac'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [lang, setLang]       = useState('sw')
  const [sidebarOpen, setSidebar] = useState(true)
  const [currentOfficer]      = useState(CURRENT_OFFICER)

  // Derive scope from role
  const scope = getDashboardScope(currentOfficer.role)

  const toggleLang = () => setLang(l => l === 'sw' ? 'en' : 'sw')

  return (
    <AppContext.Provider value={{
      lang, toggleLang, setLang,
      sidebarOpen, setSidebar,
      currentOfficer,
      scope,
      // helpers
      isSW: lang === 'sw',
      isEN: lang === 'en',
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be inside AppProvider')
  return ctx
}
