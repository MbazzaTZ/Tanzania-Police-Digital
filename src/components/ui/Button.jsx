export default function Button({ children, variant = 'primary', size = 'md', onClick, type = 'button', disabled, className = '', ...props }) {
  const variants = {
    primary: 'btn btn-primary',
    outline: 'btn btn-outline',
    accent:  'btn btn-accent',
    danger:  'btn btn-danger',
    ghost:   'btn',
  }
  const sizes = { sm: 'btn-sm', md: '', lg: 'btn-lg' }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${sizes[size]} ${className}`}
      style={disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
      {...props}
    >
      {children}
    </button>
  )
}
