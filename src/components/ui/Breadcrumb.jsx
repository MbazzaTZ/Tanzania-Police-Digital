import { Link } from 'react-router-dom'

export default function Breadcrumb({ items }) {
  return (
    <div className="breadcrumb">
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {item.href
            ? <Link to={item.href} style={{ color: 'var(--clr-muted)', textDecoration: 'none' }}>{item.label}</Link>
            : <span>{item.label}</span>
          }
          {i < items.length - 1 && <span style={{ opacity: 0.5 }}>›</span>}
        </span>
      ))}
    </div>
  )
}
