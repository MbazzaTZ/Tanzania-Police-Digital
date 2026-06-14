export function Card({ children, className='', style={} }) {
  return <div className={`card ${className}`} style={style}>{children}</div>
}

export function CardHeader({ title, subtitle, action }) {
  return (
    <div className="card-h">
      <div>
        {title && <div className="card-t">{title}</div>}
        {subtitle && <div className="card-st">{subtitle}</div>}
      </div>
      {action && <div style={{flexShrink:0}}>{action}</div>}
    </div>
  )
}

export function CardBody({ children, noPadding=false }) {
  return <div className="card-bd" style={noPadding?{padding:0}:{}}>{children}</div>
}
