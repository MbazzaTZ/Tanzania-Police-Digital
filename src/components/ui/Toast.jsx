export default function Toast({ toast }) {
  if (!toast) return null
  const cls = toast.type === 'success' ? 't-ok' : toast.type === 'error' ? 't-err' : 't-wrn'
  return (
    <div className={`toast ${cls}`}>
      <span>{toast.type === 'success' ? '✓' : '⚠️'}</span>
      <span>{toast.msg}</span>
    </div>
  )
}
