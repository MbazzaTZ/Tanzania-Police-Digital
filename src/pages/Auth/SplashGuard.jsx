import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Shown once per session, then goes to login
export default function SplashGuard() {
  const nav = useNavigate()
  useEffect(() => {
    const shown = sessionStorage.getItem('splash_shown')
    if (shown) {
      nav('/login', { replace: true })
    } else {
      sessionStorage.setItem('splash_shown', '1')
      nav('/splash', { replace: true })
    }
  }, [nav])
  return null
}
