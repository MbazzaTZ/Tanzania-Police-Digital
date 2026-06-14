import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Badge from '@components/ui/Badge'
import { useSearch } from '@hooks/useSearch'
import { MOCK_ARRESTS } from '@utils/mockData'

const TABS = [
  {id:'all',      label:'Zote',         count:47},
  {id:'pending',  label:'Zinasubiri',   count:18},
  {id:'detained', label:'Kizuizini',    count:23},
  {id:'court',    label:'Mahakamani',   count:4},
  {id:'completed',label:'Zilizokamilika',count:2},
]

export default function Arrests() {
  const nav = useNavigate()
  const [tab, setTab] = useState('all')
  const { query, setQuery, results } = useSearch(MOCK_ARRESTS, ['suspect','charges','officer','station','id'])
  const filtered = tab === 'all' ? results : results.filter(a => a.status === tab)

  return (
    <div className="afd">
      {/* Stats */}
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
        <div>
          <h1 style={{fontSize:19,fontWeight:800,color:'var(--tw)'}}>⛓️ Kukamatwa / Arrests</h1>
          <p style={{fontSize:11.5,color:'var(--tm)',marginTop:2}}>Rekodi za kukamatwa zote · Leo: 47 · Mwezi huu: 1,284</p>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-gh btn-sm">⬇ Pakua PDF</button>
          <button className="btn btn-g" onClick={()=>nav('/enforcement/arrests/new')}>+ Rekodi ya Kukamata</button>
        </div>
      </div>

      <div className="stats-row s4 mb-sec">
        {[
          {ic:'⛓️', cls:'ic-amber',  n:47,   lbl:'Kukamata Leo',    delta:'↑ 8%', dcls:'up'},
          {ic:'🔒', cls:'ic-red',    n:23,   lbl:'Kizuizini Sasa',  delta:'↓ 2',  dcls:'down'},
          {ic:'⚖️', cls:'ic-blue',   n:18,   lbl:'Mahakamani',      delta:'↑ 3',  dcls:'up'},
          {ic:'✅', cls:'ic-green',  n:1284, lbl:'Jumla Mwezi Huu', delta:'↑ 12%',dcls:'up'},
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
                {t.label}
                <span style={{marginLeft:3,fontSize:9,opacity:.6}}>({t.count})</span>
              </button>
            ))}
          </div>
          <div style={{marginLeft:'auto',display:'flex',gap:8}}>
            <input className="fi" style={{width:200,fontSize:11,padding:'6px 10px',borderRadius:20}}
              placeholder="🔍 Tafuta..." value={query} onChange={e=>setQuery(e.target.value)} />
            <select className="fs" style={{width:'auto',fontSize:11,padding:'6px 10px'}}>
              <option>Aina: Zote</option><option>Criminal</option><option>Traffic</option><option>Narcotics</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr>
              <th>Namba</th><th>Mtuhumiwa</th><th>Makosa</th><th>Aina</th>
              <th>Afisa</th><th>Kituo</th><th>Tarehe</th><th>Haki</th><th>Hali</th><th></th>
            </tr></thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id}>
                  <td className="td-id">{a.id}</td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <div style={{width:28,height:28,borderRadius:'50%',background:'var(--g600)',border:'1.5px solid var(--bl)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,flexShrink:0}}>👤</div>
                      <div>
                        <div className="td-nm">{a.suspect}</div>
                        <div className="td-sub">NIDA: {a.nida}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{fontSize:11}}>{a.charges}</td>
                  <td>
                    <span style={{fontSize:9.5,background:'rgba(255,255,255,.06)',border:'1px solid var(--b)',padding:'2px 7px',borderRadius:6,color:'var(--tm)'}}>
                      {a.category}
                    </span>
                  </td>
                  <td style={{fontSize:11}}>{a.officer}</td>
                  <td style={{fontSize:11}}>{a.station}</td>
                  <td>
                    <div className="td-mo" style={{fontSize:10.5}}>{a.date}</div>
                    <div style={{fontSize:9.5,color:'var(--td)'}}>{a.time}</div>
                  </td>
                  <td>
                    <span style={{fontSize:11}}>{a.rights_read ? '✅' : '⏳'}</span>
                  </td>
                  <td><Badge status={a.status} /></td>
                  <td>
                    <button className="btn btn-gh btn-sm">Angalia</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={10} style={{textAlign:'center',padding:32,color:'var(--tm)'}}>Hakuna matokeo</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pag">
          <div className="pag-info">Inaonyesha {filtered.length} ya {MOCK_ARRESTS.length} matokeo</div>
          <div style={{display:'flex',gap:6}}>
            <div className="pag-btns">
              {['‹',1,2,'›'].map((p,i) => (
                <button key={i} className={`pag-btn ${p===1?'on':''}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
