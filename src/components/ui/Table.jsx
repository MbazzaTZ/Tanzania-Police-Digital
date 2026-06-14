export default function Table({ columns, data, onRowClick, emptyMsg = 'Hakuna matokeo' }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} style={col.style}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: 32, color: 'var(--clr-muted)' }}>
                {emptyMsg}
              </td>
            </tr>
          ) : data.map((row, i) => (
            <tr key={row.id || i} onClick={onRowClick ? () => onRowClick(row) : undefined}
              style={onRowClick ? { cursor: 'pointer' } : {}}>
              {columns.map(col => (
                <td key={col.key} style={col.tdStyle}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Pagination({ page, total, perPage, onChange }) {
  const pages = Math.ceil(total / perPage)
  return (
    <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--clr-border)' }}>
      <div style={{ fontSize: 11, color: 'var(--clr-muted)' }}>
        Inaonyesha {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} ya {total.toLocaleString()}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <button className="btn btn-outline btn-sm" onClick={() => onChange(page - 1)} disabled={page === 1}>‹</button>
        {[...Array(Math.min(pages, 5))].map((_, i) => (
          <button key={i + 1} className={`btn btn-sm ${page === i + 1 ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => onChange(i + 1)}>{i + 1}</button>
        ))}
        <button className="btn btn-outline btn-sm" onClick={() => onChange(page + 1)} disabled={page === pages}>›</button>
      </div>
    </div>
  )
}
