export function Card({ children, className='', style={} }) {
  return <div className={`card ${className}`} style={style}>{children}</div>
}
export function CardHeader({ title, subtitle, action }) {
  return (
    <div className="card-header">
      <div>
        {title && <div className="card-title">{title}</div>}
        {subtitle && <div className="card-sub">{subtitle}</div>}
      </div>
      {action && <div style={{flexShrink:0}}>{action}</div>}
    </div>
  )
}
export function CardBody({ children, noPadding=false }) {
  return <div className="card-body" style={noPadding?{padding:0}:{}}>{children}</div>
}
