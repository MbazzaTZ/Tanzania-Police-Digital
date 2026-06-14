import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MOCK_WARRANTS = [
  {id:'WRT-2024-00089',person:'Khalid Omar Rashidi',nida:'7788990011223',type:'Kukamata',court:'Mahakama ya Kinondoni',judge:'Hon. M. Mwamba',case:'CASE-2024-00126',issued:'10/05/2024',expires:'10/06/2024',status:'active',urgent:true},
  {id:'WRT-2024-00088',person:'Amina Said Ally',nida:'3322110099887',type:'Upekuzi',court:'Mahakama ya Ilala',judge:'Hon. S. Hassan',case:'CASE-2024-00125',issued:'08/05/2024',expires:'08/06/2024',status:'active',urgent:false},
  {id:'WRT-2024-00087',person:'Rajabu Mshai',nida:'9911223344556',type:'Kukamata',court:'Mahakama ya Temeke',judge:'Hon. P. Kimaro',case:'CASE-2024-00124',issued:'05/05/2024',expires:'05/06/2024',status:'executed',urgent:false},
  {id:'WRT-2024-00086',person:'Fatuma Bakari',nida:'5544332211009',type:'Upekuzi',court:'Mahakama ya Kinondoni',judge:'Hon. M. Mwamba',case:'CASE-2024-00123',issued:'01/05/2024',expires:'01/06/2024',status:'expired',urgent:false},
]

export default function Warrants() {
  const [search, setSearch] = useState('')
  const filtered = MOCK_WARRANTS.filter(w => w.person.toLowerCase().includes(search.toLowerCase()) || w.id.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="afd">
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
        <div><h1 style={{fontSize:19,fontWeight:800,color:'var(--tw)'}}>⚖️ Amri za Mahakama / Warrants</h1>
          <p style={{fontSize:11.5,color:'var(--tm)',marginTop:2}}>Amri zilizotolewa na mahakama – CID na IGP peke yao</p></div>
        <button className="btn btn-g">+ Omba Amri</button>
      </div>
      <div className="stats-row s4 mb-sec">
        {[{ic:'⚖️',cls:'ic-blue',n:12,lbl:'Amri Hai',delta:'↑ 2',dcls:'up'},{ic:'⚡',cls:'ic-red',n:3,lbl:'Za Dharura',delta:'↑ 1',dcls:'up'},{ic:'✅',cls:'ic-green',n:8,lbl:'Zilizotekelezwa',delta:'↑ 3',dcls:'up'},{ic:'❌',cls:'ic-amber',n:4,lbl:'Zilizoisha Muda',delta:'→ 0',dcls:'flat'}].map(c => (
          <div key={c.lbl} className="scard"><div className="scard-top"><div className={`scard-icon ${c.cls}`}>{c.ic}</div><div className={`scard-delta ${c.dcls}`}>{c.delta}</div></div><div className="scard-num">{c.n}</div><div className="scard-lbl">{c.lbl}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-h">
          <div className="card-t">⚖️ Orodha ya Amri za Mahakama</div>
          <input className="fi" style={{width:200,fontSize:11,padding:'6px 10px'}} placeholder="🔍 Tafuta..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr><th>Namba</th><th>Mtu</th><th>Aina</th><th>Mahakama</th><th>Kesi</th><th>Tarehe</th><th>Inaisha</th><th>Hali</th><th></th></tr></thead>
            <tbody>
              {filtered.map(w => (
                <tr key={w.id}>
                  <td className="td-id">{w.id}</td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:6}}>
                      {w.urgent && <span style={{fontSize:10,color:'var(--redL)'}}>🚨</span>}
                      <div><div className="td-nm">{w.person}</div><div className="td-sub">NIDA: {w.nida}</div></div>
                    </div>
                  </td>
                  <td><span className={`pill ${w.type==='Kukamata'?'p-critical':'p-pending'}`}>{w.type}</span></td>
                  <td style={{fontSize:11}}>{w.court}<div style={{fontSize:9.5,color:'var(--tm)'}}>{w.judge}</div></td>
                  <td className="td-id" style={{fontSize:10}}>{w.case}</td>
                  <td className="td-mo" style={{fontSize:10.5}}>{w.issued}</td>
                  <td className="td-mo" style={{fontSize:10.5,color:w.status==='expired'?'var(--redL)':'var(--tl)'}}>{w.expires}</td>
                  <td><span className={`pill ${w.status==='active'?'p-active':w.status==='executed'?'p-done':'p-closed'}`}>{w.status==='active'?'Hai':w.status==='executed'?'Imetekelezwa':'Imeisha'}</span></td>
                  <td><button className="btn btn-gh btn-sm">Angalia</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
