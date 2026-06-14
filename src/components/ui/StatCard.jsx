import { useAnimateCount } from '@hooks/useAnimateCount'
export default function StatCard({ icon, value, label, delta, deltaUp=true, color='' }) {
  const animated = useAnimateCount(typeof value==='number' ? value : 0)
  const display  = typeof value==='number' ? animated.toLocaleString() : value
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-num">{display}</div>
      <div className="stat-label">{label}</div>
      {delta && (
        <div className={`stat-delta ${deltaUp?'delta-up':'delta-down'}`}>
          {deltaUp?'↑':'↓'} {delta}
        </div>
      )}
    </div>
  )
}
