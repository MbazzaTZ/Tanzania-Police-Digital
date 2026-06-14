export default function SearchInput({ value, onChange, placeholder = 'Tafuta...', width = '100%' }) {
  return (
    <div className="search-wrap" style={{ maxWidth: width }}>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}
