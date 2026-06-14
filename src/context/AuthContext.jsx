import { createContext, useContext, useState } from 'react'
import { CURRENT_OFFICER } from '@utils/mockData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]         = useState(CURRENT_OFFICER) // swap with Supabase auth
  const [loading, setLoading]   = useState(false)

  const login = async (badge, password) => {
    setLoading(true)
    // TODO: Supabase auth.signInWithPassword
    setLoading(false)
    return { success: true }
  }

  const logout = async () => {
    setUser(null)
    // TODO: Supabase auth.signOut
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
