import { STATUS_CONFIG } from '@utils/helpers'
export default function Badge({ status, size='sm' }) {
  const cfg = STATUS_CONFIG[status] || { label:status, cls:'s-draft' }
  return <span className={`status ${cfg.cls}`} style={size==='xs'?{fontSize:'8.5px',padding:'1px 5px'}:{}}>{cfg.label}</span>
}
