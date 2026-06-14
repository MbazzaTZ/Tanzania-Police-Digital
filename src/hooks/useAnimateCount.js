import { useState, useEffect } from 'react'
export function useAnimateCount(target, duration = 800) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const steps = 40
    const increment = target / steps
    const interval = duration / steps
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + increment, target)
      setCount(Math.floor(current))
      if (current >= target) clearInterval(timer)
    }, interval)
    return () => clearInterval(timer)
  }, [target, duration])
  return count
}
