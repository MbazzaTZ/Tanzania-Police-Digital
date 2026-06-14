import { useAnimateCount } from '@hooks/useAnimateCount'
export default function StatCard({ icon, value, label, delta, up=true, color='' }) {
  const n = useAnimateCount(typeof value==='number'?value:0)
  const icMap = {green:'ic-green',amber:'ic-amber',red:'ic-red',blue:'ic-blue',purple:'ic-purple'}
  return (
    <div className="scard">
      <div className="scard-top">
        <div className={`scard-icon ${icMap[color]||'ic-green'}`}>{icon}</div>
        {delta && <div className={`scard-delta ${up?'up':'down'}`}>{up?'↑':'↓'} {delta}</div>}
      </div>
      <div className="scard-num">{typeof value==='number'?n.toLocaleString():value}</div>
      <div className="scard-lbl">{label}</div>
    </div>
  )
}
