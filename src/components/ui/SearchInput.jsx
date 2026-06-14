export default function SearchInput({ value, onChange, placeholder = 'Tafuta...', width = '220px' }) {
  return (
    <div className="search-wrap" style={{ maxWidth: width, flex: 'none' }}>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}
