import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [lang, setLang]           = useState('sw')   // 'sw' | 'en'
  const [sidebarOpen, setSidebar] = useState(true)
  const [currentOfficer]          = useState({
    id:       'OPS-2024-00125',
    name:     'Insp. Juma M. Khamis',
    badge:    '123456',
    rank:     'Inspector',
    station:  'Oysterbay Police Station',
    role:     'IGP',         // controls RBAC
    online:   true,
  })

  const toggleLang = () => setLang(l => l === 'sw' ? 'en' : 'sw')

  return (
    <AppContext.Provider value={{
      lang, toggleLang,
      sidebarOpen, setSidebar,
      currentOfficer,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
