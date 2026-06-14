import { useState } from 'react'
import { AUDIT_ACTIONS } from '@utils/constants'

const MOCK_AUDIT = [
  {id:'AUD-2024-00156',officer:'Insp. J.M. Khamis',badge:'123456',rank:'Inspector',station:'Oysterbay PS',action:'CREATE_CITATION',table:'citations',record:'CIT-2024-00028',gps:'-6.787, 39.283',device:'TPF-MOB-001',ip:'192.168.1.45',time:'17/05/2024 10:45:23'},
  {id:'AUD-2024-00155',officer:'Sgt. A. Suleiman',badge:'234567',rank:'Sergeant',station:'Kariakoo PS',action:'MAKE_ARRESTS',table:'arrests',record:'AR-2024-00004',gps:'-6.814, 39.281',device:'TPF-MOB-002',ip:'192.168.1.67',time:'16/05/2024 23:15:44'},
  {id:'AUD-2024-00154',officer:'ASP F.R. Kimaro',badge:'345678',rank:'ASP',station:'Ilala PS',action:'CREATE_CASE',table:'cases',record:'CASE-2024-00128',gps:'-6.825, 39.271',device:'TPF-MOB-003',ip:'192.168.1.89',time:'17/05/2024 09:00:12'},
  {id:'AUD-2024-00153',officer:'Cpl. H.A. Mwinyi',badge:'456789',rank:'Corporal',station:'Temeke PS',action:'SEARCH_PERSON',table:'persons',record:'PRS-2024-000123',gps:'-6.876, 39.202',device:'TPF-MOB-004',ip:'192.168.1.90',time:'17/05/2024 08:55:31'},
  {id:'AUD-2024-00152',officer:'Insp. J.M. Khamis',badge:'123456',rank:'Inspector',station:'Oysterbay PS',action:'LOGIN',table:'auth',record:'OPS-2024-00125',gps:'-6.787, 39.283',device:'TPF-MOB-001',ip:'192.168.1.45',time:'17/05/2024 06:01:08'},
  {id:'AUD-2024-00151',officer:'IGP Office',badge:'000001',rank:'IGP',station:'Makao Makuu',action:'EXPORT_REPORT',table:'reports',record:'RPT-2024-05-001',gps:'-6.792, 39.208',device:'TPF-WEB-001',ip:'10.0.0.1',time:'16/05/2024 22:30:00'},
]

const ACTION_COLOR = {
  LOGIN:'#66BB6A', LOGOUT:'#9E9E9E', SEARCH_PERSON:'#64B5F6', SEARCH_VEHICLE:'#64B5F6',
  CREATE_CITATION:'#FFC107', UPDATE_CITATION:'#FFD54F', CREATE_ARREST:'#EF5350',
  MAKE_ARRESTS:'#EF5350', CREATE_CASE:'#CE93D8', UPDATE_CASE:'#CE93D8',
  UPLOAD_EVIDENCE:'#FF7043', VIEW_INTELLIGENCE:'#FF7043', EXPORT_REPORT:'#4CAF50',
  CREATE_OFFICER:'#4CAF50', MANAGE_RBAC:'#EF5350',
}

export default function Audit() {
  const [search, setSearch] = useState('')
  const [filterAction, setFilterAction] = useState('all')

  const filtered = MOCK_AUDIT.filter(a => {
    const matchSearch = a.officer.toLowerCase().includes(search.toLowerCase()) ||
      a.action.toLowerCase().includes(search.toLowerCase()) ||
      a.record.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filterAction === 'all' || a.action === filterAction
    return matchSearch && matchFilter
  })

  return (
    <div className="afd">
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
        <div>
          <h1 style={{fontSize:19,fontWeight:800,color:'var(--tw)'}}>🗂️ Rekodi ya Ukaguzi / Audit Trail</h1>
          <p style={{fontSize:11.5,color:'var(--tm)',marginTop:2}}>Kila hatua iliyofanywa na afisa yoyote imehifadhiwa hapa · IGP na DIGP peke yao</p>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-gh btn-sm">⬇ Pakua Ripoti</button>
          <button className="btn btn-gh btn-sm">📧 Tuma kwa Barua Pepe</button>
        </div>
      </div>

      <div className="stats-row s4 mb-sec">
        {[
          {ic:'🗂️', cls:'ic-blue',   n:'15,420', lbl:'Vitendo Jumla',           delta:'↑ 5%', dcls:'up'},
          {ic:'👮', cls:'ic-green',  n:'1,247',  lbl:'Maafisa Wanaofanya Kazi',  delta:'↑ 3%', dcls:'up'},
          {ic:'⚠️', cls:'ic-red',    n:3,         lbl:'Vitendo vya Tashwishi',   delta:'↑ 1',  dcls:'up'},
          {ic:'📅', cls:'ic-amber',  n:284,       lbl:'Vitendo Leo',             delta:'↑ 12%',dcls:'up'},
        ].map(c => (
          <div key={c.lbl} className="scard">
            <div className="scard-top">
              <div className={`scard-icon ${c.cls}`}>{c.ic}</div>
              <div className={`scard-delta ${c.dcls}`}>{c.delta}</div>
            </div>
            <div className="scard-num">{c.n.toLocaleString ? c.n.toLocaleString() : c.n}</div>
            <div className="scard-lbl">{c.lbl}</div>
          </div>
        ))}
      </div>

      <div className="ibox mb-sec">
        🔒 Kila kitendo kinahifadhi: <strong>Namba ya Afisa · Cheo · Kituo · GPS · Tarehe · Muda · Kitambulisho cha Kifaa · IP Address</strong>. Rekodi hizi haziwezi kubadilishwa au kufutwa.
      </div>

      <div className="card">
        {/* Filters */}
        <div style={{padding:'10px 14px',borderBottom:'1px solid var(--b)',display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
          <input className="fi" style={{width:220,fontSize:11,padding:'6px 10px',borderRadius:20}}
            placeholder="🔍 Tafuta afisa, kitendo, rekodi..."
            value={search} onChange={e=>setSearch(e.target.value)} />
          <select className="fs" style={{width:'auto',fontSize:11,padding:'6px 10px'}}
            value={filterAction} onChange={e=>setFilterAction(e.target.value)}>
            <option value="all">Vitendo Vyote</option>
            {AUDIT_ACTIONS.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <select className="fs" style={{width:'auto',fontSize:11,padding:'6px 10px'}}>
            <option>Tarehe: Leo</option><option>Wiki Hii</option><option>Mwezi Huu</option>
          </select>
          <select className="fs" style={{width:'auto',fontSize:11,padding:'6px 10px'}}>
            <option>Vituo Vyote</option><option>Oysterbay PS</option><option>Kariakoo PS</option>
          </select>
          <button className="btn btn-gh btn-sm" onClick={()=>{setSearch('');setFilterAction('all')}}>↺ Weka Upya</button>
        </div>

        {/* Table */}
        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr>
              <th>Namba</th><th>Afisa</th><th>Cheo</th><th>Kituo</th>
              <th>Kitendo</th><th>Jedwali</th><th>Rekodi</th>
              <th>GPS</th><th>Kifaa</th><th>IP</th><th>Wakati</th>
            </tr></thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id}>
                  <td className="td-id" style={{fontSize:9.5}}>{a.id}</td>
                  <td>
                    <div className="td-nm" style={{fontSize:11}}>{a.officer}</div>
                    <div className="td-sub">Badge: {a.badge}</div>
                  </td>
                  <td style={{fontSize:10.5,textTransform:'uppercase',color:'var(--tm)'}}>{a.rank}</td>
                  <td style={{fontSize:10.5}}>{a.station}</td>
                  <td>
                    <span style={{fontSize:9.5,fontFamily:'var(--fm)',fontWeight:600,padding:'2px 7px',borderRadius:4,background:`${ACTION_COLOR[a.action]||'#9E9E9E'}18`,color:ACTION_COLOR[a.action]||'#9E9E9E',border:`1px solid ${ACTION_COLOR[a.action]||'#9E9E9E'}30`}}>
                      {a.action}
                    </span>
                  </td>
                  <td><span style={{fontSize:9.5,color:'var(--td)',fontFamily:'var(--fm)'}}>{a.table}</span></td>
                  <td className="td-id" style={{fontSize:9.5}}>{a.record}</td>
                  <td style={{fontSize:9.5,fontFamily:'var(--fm)',color:'var(--td)'}}>{a.gps}</td>
                  <td style={{fontSize:9.5,fontFamily:'var(--fm)',color:'var(--tm)'}}>{a.device}</td>
                  <td style={{fontSize:9.5,fontFamily:'var(--fm)',color:'var(--td)'}}>{a.ip}</td>
                  <td style={{fontSize:9.5,fontFamily:'var(--fm)',whiteSpace:'nowrap'}}>{a.time}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={11} style={{textAlign:'center',padding:32,color:'var(--tm)'}}>Hakuna matokeo yanayolingana</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="pag">
          <div className="pag-info">Inaonyesha {filtered.length} ya {MOCK_AUDIT.length} vitendo</div>
          <div className="pag-btns">
            {['‹',1,2,3,'…',156,'›'].map((p,i) => (
              <button key={i} className={`pag-btn ${p===1?'on':''}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
