export default function Table({ columns, data, onRowClick, emptyMsg='Hakuna matokeo' }) {
  return (
    <div className="table-wrap">
      <table>
        <thead><tr>{columns.map(c => <th key={c.key} style={c.style}>{c.label}</th>)}</tr></thead>
        <tbody>
          {!data.length
            ? <tr><td colSpan={columns.length} style={{textAlign:'center',padding:32,color:'var(--clr-muted)'}}>{emptyMsg}</td></tr>
            : data.map((row,i) => (
              <tr key={row.id||i} onClick={onRowClick?()=>onRowClick(row):undefined} style={onRowClick?{cursor:'pointer'}:{}}>
                {columns.map(c => <td key={c.key} style={c.tdStyle}>{c.render?c.render(row[c.key],row):row[c.key]}</td>)}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
