import { useState, useMemo } from 'react'

// ── Generic table search hook ──
export function useSearch(items, keys) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return items
    const q = query.toLowerCase()
    return items.filter(item =>
      keys.some(key => String(item[key] ?? '').toLowerCase().includes(q))
    )
  }, [items, query, keys])

  return { query, setQuery, results }
}
