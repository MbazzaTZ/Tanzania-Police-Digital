import { STATUS_CONFIG } from '@utils/helpers'

export default function Badge({ status, size = 'sm' }) {
  const cfg = STATUS_CONFIG[status] || { label: status, cls: 's-closed' }
  return (
    <span className={`status ${cfg.cls}`} style={size === 'xs' ? { fontSize: '9px', padding: '1px 6px' } : {}}>
      {cfg.label}
    </span>
  )
}
