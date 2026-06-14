export default function Toast({ toast }) {
  if (!toast) return null
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      background: toast.type === 'success' ? 'var(--clr-primary)' : 'var(--clr-red)',
      color: '#fff', padding: '12px 20px', borderRadius: 8,
      fontSize: 13, fontWeight: 600,
      boxShadow: '0 4px 20px rgba(0,0,0,.4)',
      animation: 'fadeIn .3s ease',
    }}>
      {toast.type === 'success' ? '✓' : '⚠️'} {toast.msg}
    </div>
  )
}
