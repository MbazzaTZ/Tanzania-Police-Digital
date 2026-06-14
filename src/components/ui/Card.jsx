export function Card({ children, className = '', ...props }) {
  return <div className={`card ${className}`} {...props}>{children}</div>
}

export function CardHeader({ title, subtitle, action }) {
  return (
    <div className="card-header">
      <div>
        <div className="card-title">{title}</div>
        {subtitle && <div className="card-sub">{subtitle}</div>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

export function CardBody({ children, noPadding = false }) {
  return <div className="card-body" style={noPadding ? { padding: 0 } : {}}>{children}</div>
}
