import { useNavigate } from 'react-router-dom'
export default function CrimeReports() {
  const nav = useNavigate()
  const REPORTS = [{id:'RPT-2024-05-001',title:'Ripoti ya Uhalifu – Mei 2024',type:'Kila Mwezi',region:'Dar es Salaam',date:'17/05/2024',officer:'RPC DSM',pages:48,status:'draft'},{id:'RPT-2024-Q1-001',title:'Ripoti ya Robo Mwaka – Q1 2024',type:'Robo Mwaka',region:'Taifa',date:'01/04/2024',officer:'IGP Office',pages:127,status:'published'},{id:'RPT-2024-W19',title:'Ripoti ya Wiki – Wiki 19',type:'Kila Wiki',region:'Dar es Salaam',date:'12/05/2024',officer:'RPC DSM',pages:22,status:'published'}]
  return (
    <div className="afd">
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
        <div><h1 style={{fontSize:19,fontWeight:800,color:'var(--tw)'}}>📊 Takwimu za Uhalifu / Crime Reports</h1>
          <p style={{fontSize:11.5,color:'var(--tm)',marginTop:2}}>Ripoti za kila wiki, mwezi na robo mwaka</p></div>
        <button className="btn btn-g">+ Tengeneza Ripoti</button>
      </div>
      <div className="stats-row s5 mb-sec">
        {[{ic:'📊',cls:'ic-blue',n:47,lbl:'Ripoti Zote'},{ic:'📅',cls:'ic-green',n:12,lbl:'Kila Mwezi'},{ic:'📈',cls:'ic-amber',n:8,lbl:'Kila Robo Mwaka'},{ic:'📋',cls:'ic-purple',n:27,lbl:'Kila Wiki'},{ic:'✅',cls:'ic-green',n:43,lbl:'Zilizochapishwa'}].map(c => (
          <div key={c.lbl} className="scard"><div className={`scard-icon ${c.cls}`}>{c.ic}</div><div className="scard-num">{c.n}</div><div className="scard-lbl">{c.lbl}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-h"><div className="card-t">📊 Orodha ya Ripoti</div></div>
        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr><th>Namba</th><th>Kichwa</th><th>Aina</th><th>Mkoa</th><th>Afisa</th><th>Tarehe</th><th>Kurasa</th><th>Hali</th><th></th></tr></thead>
            <tbody>
              {REPORTS.map(r => (
                <tr key={r.id}>
                  <td className="td-id">{r.id}</td>
                  <td><div style={{fontWeight:600,color:'var(--tw)'}}>{r.title}</div></td>
                  <td><span className="pill p-pending">{r.type}</span></td>
                  <td style={{fontSize:11}}>📍 {r.region}</td>
                  <td style={{fontSize:11}}>{r.officer}</td>
                  <td className="td-mo" style={{fontSize:10.5}}>{r.date}</td>
                  <td className="td-mo">{r.pages}</td>
                  <td><span className={`pill ${r.status==='published'?'p-done':'p-rasimu'}`}>{r.status==='published'?'Imechapishwa':'Rasimu'}</span></td>
                  <td><div style={{display:'flex',gap:4}}><button className="btn btn-gh btn-sm">👁️</button><button className="btn btn-gh btn-sm">⬇</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
