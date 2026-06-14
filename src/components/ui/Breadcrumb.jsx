import { Link } from 'react-router-dom'
export default function Breadcrumb({ items }) {
  return (
    <div className="breadcrumb">
      {items.map((item, i) => (
        <span key={i} style={{display:'flex',alignItems:'center',gap:6}}>
          {item.href
            ? <Link to={item.href} style={{color:'var(--text-muted)',textDecoration:'none'}}>{item.label}</Link>
            : <span style={{color: i===items.length-1 ? 'var(--text-white)' : 'var(--text-muted)'}}>{item.label}</span>
          }
          {i < items.length-1 && <span className="sep">›</span>}
        </span>
      ))}
    </div>
  )
}
