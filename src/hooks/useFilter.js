import { useState, useMemo } from 'react'
export function useFilter(items, filterKey) {
  const [filter, setFilter] = useState('all')
  const filtered = useMemo(() =>
    filter === 'all' ? items : items.filter(i => i[filterKey] === filter)
  , [items, filter, filterKey])
  return { filter, setFilter, filtered }
}
