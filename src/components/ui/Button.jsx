export default function Button({ children, variant='primary', size='md', onClick, type='button', disabled, className='', style={}, ...props }) {
  const v = { primary:'btn-primary', outline:'btn-outline', gold:'btn-gold', danger:'btn-danger', ghost:'btn-ghost' }
  const s = { sm:'btn-sm', md:'', lg:'btn-lg', xl:'btn-xl' }
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={`btn ${v[variant]||v.primary} ${s[size]||''} ${className}`}
      style={style} {...props}>
      {children}
    </button>
  )
}
