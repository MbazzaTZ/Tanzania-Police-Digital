import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Badge from '@components/ui/Badge'
import { MOCK_CASES } from '@utils/mockData'

const TABS = [
  {id:'all',      label:'Zote',          count:128},
  {id:'active',   label:'Zinazoendelea', count:89},
  {id:'pending',  label:'Zinasubiri',    count:24},
  {id:'closed',   label:'Zilizofungwa',  count:15},
]

const PRIORITY_CFG = {
  critical: {cls:'p-critical', lbl:'Muhimu Sana', dot:'#EF5350'},
  high:     {cls:'p-high',     lbl:'Juu',         dot:'#FF7043'},
  medium:   {cls:'p-pending',  lbl:'Wastani',     dot:'#FFC107'},
  low:      {cls:'p-closed',   lbl:'Chini',       dot:'#9E9E9E'},
}

export default function Cases() {
  const nav = useNavigate()
  const [tab, setTab]     = useState('all')
  const [search, setSearch] = useState('')

  const filtered = MOCK_CASES.filter(c => {
    const matchTab = tab === 'all' || c.status === tab
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.type.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  return (
    <div className="afd">
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
        <div>
          <h1 style={{fontSize:19,fontWeight:800,color:'var(--tw)'}}>📁 Kesi / Cases</h1>
          <p style={{fontSize:11.5,color:'var(--tm)',marginTop:2}}>Usimamizi wa kesi za uhalifu – CID · Kesi 128 zinazoendelea</p>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-gh btn-sm">⬇ Pakua</button>
          <button className="btn btn-g">+ Kesi Mpya</button>
        </div>
      </div>

      <div className="stats-row s4 mb-sec">
        {[
          {ic:'📁', cls:'ic-blue',   n:128, lbl:'Kesi Zote',        delta:'↑ 5%', dcls:'up'},
          {ic:'⚡', cls:'ic-red',    n:3,   lbl:'Muhimu Sana',      delta:'↑ 1',  dcls:'up'},
          {ic:'⏳', cls:'ic-amber',  n:89,  lbl:'Zinazoendelea',    delta:'↑ 8%', dcls:'up'},
          {ic:'✅', cls:'ic-green',  n:15,  lbl:'Zilizofungwa Leo', delta:'↑ 3',  dcls:'up'},
        ].map(c => (
          <div key={c.lbl} className="scard">
            <div className="scard-top">
              <div className={`scard-icon ${c.cls}`}>{c.ic}</div>
              <div className={`scard-delta ${c.dcls}`}>{c.delta}</div>
            </div>
            <div className="scard-num">{c.n.toLocaleString()}</div>
            <div className="scard-lbl">{c.lbl}</div>
          </div>
        ))}
      </div>

      <div className="card">
        {/* Toolbar */}
        <div style={{padding:'10px 14px',borderBottom:'1px solid var(--b)',display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
          <div className="tabs">
            {TABS.map(t => (
              <button key={t.id} className={`tab ${tab===t.id?'on':''}`} onClick={()=>setTab(t.id)}>
                {t.label}<span style={{marginLeft:3,fontSize:9,opacity:.6}}>({t.count})</span>
              </button>
            ))}
          </div>
          <div style={{marginLeft:'auto',display:'flex',gap:8}}>
            <input className="fi" style={{width:220,fontSize:11,padding:'6px 10px',borderRadius:20}}
              placeholder="🔍 Tafuta kesi..." value={search} onChange={e=>setSearch(e.target.value)} />
            <select className="fs" style={{width:'auto',fontSize:11,padding:'6px 10px'}}>
              <option>Aina: Zote</option><option>Criminal</option><option>Fraud</option><option>Narcotics</option><option>Murder</option>
            </select>
            <select className="fs" style={{width:'auto',fontSize:11,padding:'6px 10px'}}>
              <option>Kipaumbele: Zote</option><option>Muhimu Sana</option><option>Juu</option><option>Wastani</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr>
              <th>Namba</th><th>Kichwa cha Habari</th><th>Aina</th>
              <th>Afisa</th><th>Tarehe</th><th>Watuhumiwa</th><th>Ushahidi</th><th>Masasisho</th>
              <th>Kipaumbele</th><th>Hali</th><th></th>
            </tr></thead>
            <tbody>
              {filtered.map(c => {
                const pri = PRIORITY_CFG[c.priority] || PRIORITY_CFG.medium
                return (
                  <tr key={c.id} onClick={()=>nav(`/investigation/cases/${c.id}`)}>
                    <td className="td-id" style={{fontSize:10.5}}>{c.id}</td>
                    <td>
                      <div style={{display:'flex',alignItems:'center',gap:6}}>
                        <div style={{width:6,height:6,borderRadius:'50%',background:pri.dot,flexShrink:0}} />
                        <div className="td-nm" style={{fontSize:12}}>{c.title}</div>
                      </div>
                    </td>
                    <td>
                      <span style={{fontSize:10,background:'rgba(255,255,255,.06)',border:'1px solid var(--b)',padding:'2px 7px',borderRadius:6,color:'var(--tm)',whiteSpace:'nowrap'}}>
                        {c.type}
                      </span>
                    </td>
                    <td style={{fontSize:11}}>{c.officer}</td>
                    <td className="td-mo" style={{fontSize:10.5}}>{c.date}</td>
                    <td style={{textAlign:'center',fontFamily:'var(--fm)',fontWeight:700,color:c.suspects>0?'var(--redL)':'var(--tm)'}}>{c.suspects}</td>
                    <td style={{textAlign:'center',fontFamily:'var(--fm)',color:'var(--gold)'}}>{c.evidence}</td>
                    <td style={{textAlign:'center',fontFamily:'var(--fm)',color:'var(--tm)'}}>{c.updates}</td>
                    <td>
                      <span className={`pill ${pri.cls}`} style={{fontSize:'8.5px'}}>{pri.lbl}</span>
                    </td>
                    <td><Badge status={c.status} /></td>
                    <td>
                      <button className="btn btn-gh btn-sm" onClick={e=>{e.stopPropagation();nav(`/investigation/cases/${c.id}`)}}>
                        Angalia
                      </button>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={11} style={{textAlign:'center',padding:32,color:'var(--tm)'}}>Hakuna kesi zinazolingana</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pag">
          <div className="pag-info">Inaonyesha {filtered.length} ya {MOCK_CASES.length} kesi</div>
          <div className="pag-btns">
            {['‹',1,2,3,'…',32,'›'].map((p,i) => (
              <button key={i} className={`pag-btn ${p===1?'on':''}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
