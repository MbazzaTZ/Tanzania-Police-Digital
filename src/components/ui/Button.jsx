// Variant map: accepts both short and long names
const V = {
  primary:'btn-p', p:'btn-p',
  outline:'btn-o', o:'btn-o',
  gold:'btn-g',    g:'btn-g',
  accent:'btn-g',             // alias → gold
  danger:'btn-r',  r:'btn-r',
  ghost:'btn-gh',  gh:'btn-gh',
}

// Size map: no duplicates
const S = {
  sm:'btn-sm',
  lg:'btn-lg',
  xl:'btn-xl',
}

export default function Button({
  children,
  variant = 'p',
  size = '',
  onClick,
  type = 'button',
  disabled,
  className = '',
  style = {},
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`btn ${V[variant] || 'btn-p'} ${S[size] || ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
