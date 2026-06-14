export default function Button({ children, variant='primary', size='md', onClick, type='button', disabled, style={}, className='', ...p }) {
  const v = {primary:'btn btn-primary',outline:'btn btn-outline',accent:'btn btn-accent',danger:'btn btn-danger',success:'btn btn-success',ghost:'btn btn-outline'}
  const sz = {sm:'btn-sm',md:'',lg:'btn-lg'}
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={`${v[variant]||'btn btn-primary'} ${sz[size]} ${className}`}
      style={style} {...p}>
      {children}
    </button>
  )
}
