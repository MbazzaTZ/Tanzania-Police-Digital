import { Link } from 'react-router-dom'

export default function Breadcrumb({ items }) {
  return (
    <div className="bc">
      {items.map((item, i) => (
        <span key={i} style={{display:'flex', alignItems:'center', gap:6}}>
          {item.href
            ? <Link to={item.href} style={{color:'var(--tm)', textDecoration:'none'}}>{item.label}</Link>
            : <span style={{color: i === items.length - 1 ? 'var(--tw)' : 'var(--tm)'}}>{item.label}</span>
          }
          {i < items.length - 1 && <span className="sep" style={{opacity:.4}}>›</span>}
        </span>
      ))}
    </div>
  )
}
