export default function Toast({ toast }) {
  if (!toast) return null
  return (
    <div className={`toast ${toast.type==='success'?'toast-success':toast.type==='error'?'toast-error':'toast-warning'}`}>
      <span>{toast.type==='success'?'✓':'⚠️'}</span>
      <span>{toast.msg}</span>
    </div>
  )
}
