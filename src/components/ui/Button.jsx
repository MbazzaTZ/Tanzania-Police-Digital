export default function Button({ children, variant='p', size='', onClick, type='button', disabled, className='', style={} }) {
  const vmap = {primary:'btn-p',p:'btn-p',outline:'btn-o',o:'btn-o',gold:'btn-g',g:'btn-g',danger:'btn-r',r:'btn-r',ghost:'btn-gh',gh:'btn-gh'}
  const smap = {sm:'btn-sm','sm':'btn-sm',lg:'btn-lg',xl:'btn-xl'}
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={style}
      className={`btn ${vmap[variant]||'btn-p'} ${smap[size]||''} ${className}`}>
      {children}
    </button>
  )
}
