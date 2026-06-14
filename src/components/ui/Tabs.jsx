export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab ${active === tab.id ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span style={{ marginLeft: 4, opacity: 0.7, fontSize: '10px' }}>({tab.count})</span>
          )}
        </button>
      ))}
    </div>
  )
}
