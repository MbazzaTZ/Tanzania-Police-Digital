export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="tabs">
      {tabs.map(tab => (
        <button key={tab.id} className={`tab ${active===tab.id?'active':''}`} onClick={() => onChange(tab.id)}>
          {tab.label}{tab.count!==undefined && <span style={{marginLeft:3,opacity:.6,fontSize:9}}>({tab.count})</span>}
        </button>
      ))}
    </div>
  )
}
