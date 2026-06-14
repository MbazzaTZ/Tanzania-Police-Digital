import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MOCK_ROADBLOCKS = [
  {id:'RB-001',name:'Zuio la Morogoro Rd',loc:'Morogoro Rd, KM 3',officer:'Insp. J.M. Khamis',start:'17/05/2024 06:00',end:'17/05/2024 18:00',checks:142,arrests:3,status:'active'},
  {id:'RB-002',name:'Zuio la Bagamoyo Rd',loc:'Bagamoyo Rd, KM 7',officer:'Sgt. A. Suleiman',start:'17/05/2024 08:00',end:'17/05/2024 16:00',checks:98,arrests:1,status:'active'},
  {id:'RB-003',name:'Zuio la Uhindini',loc:'Uhindini, Kariakoo',officer:'ASP F.R. Kimaro',start:'16/05/2024 20:00',end:'17/05/2024 08:00',checks:234,arrests:7,status:'completed'},
]

export default function Roadblocks() {
  const nav = useNavigate()
  const [showForm, setShowForm] = useState(false)
  return (
    <div className="afd">
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
        <div><h1 style={{fontSize:19,fontWeight:800,color:'var(--tw)'}}>🚧 Vizuizi / Roadblocks</h1>
          <p style={{fontSize:11.5,color:'var(--tm)',marginTop:2}}>Simamia vizuizi vya barabarani</p></div>
        <button className="btn btn-g" onClick={()=>setShowForm(!showForm)}>+ Zuio Jipya</button>
      </div>
      <div className="stats-row s4 mb-sec">
        {[{ic:'🚧',cls:'ic-amber',n:12,lbl:'Vizuizi Hai',delta:'↑ 2',dcls:'up'},{ic:'🚗',cls:'ic-blue',n:474,lbl:'Magari Yakaguliwa Leo',delta:'↑ 15%',dcls:'up'},{ic:'⛓️',cls:'ic-red',n:11,lbl:'Kukamatwa Leo',delta:'↑ 3',dcls:'up'},{ic:'✅',cls:'ic-green',n:8,lbl:'Vizuizi Vilivyokamilika',delta:'',dcls:'flat'}].map(c => (
          <div key={c.lbl} className="scard"><div className="scard-top"><div className={`scard-icon ${c.cls}`}>{c.ic}</div>{c.delta&&<div className={`scard-delta ${c.dcls}`}>{c.delta}</div>}</div><div className="scard-num">{c.n}</div><div className="scard-lbl">{c.lbl}</div></div>
        ))}
      </div>
      {showForm && (
        <div className="card mb-sec" style={{border:'1px solid var(--gold)'}}>
          <div className="card-h"><div className="card-t" style={{color:'var(--gold)'}}>+ Weka Zuio Jipya</div><button className="btn btn-gh btn-sm" onClick={()=>setShowForm(false)}>✕</button></div>
          <div className="card-bd">
            <div className="fg2">
              <div className="fg"><div className="fl">Jina la Zuio *</div><input className="fi" placeholder="Mfano: Zuio la Morogoro Rd" /></div>
              <div className="fg"><div className="fl">Mahali *</div><input className="fi" placeholder="Anuani kamili" /></div>
              <div className="fg"><div className="fl">Wakati wa Kuanza *</div><input className="fi" type="datetime-local" defaultValue="2024-05-17T06:00" /></div>
              <div className="fg"><div className="fl">Wakati wa Kumaliza *</div><input className="fi" type="datetime-local" defaultValue="2024-05-17T18:00" /></div>
            </div>
            <button className="btn btn-g" onClick={()=>setShowForm(false)}>✅ Weka Zuio</button>
          </div>
        </div>
      )}
      <div className="card">
        <div className="card-h"><div className="card-t">🚧 Orodha ya Vizuizi</div></div>
        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr><th>Namba</th><th>Jina</th><th>Mahali</th><th>Afisa</th><th>Ilianza</th><th>Magari</th><th>Kukamatwa</th><th>Hali</th></tr></thead>
            <tbody>
              {MOCK_ROADBLOCKS.map(r => (
                <tr key={r.id}>
                  <td className="td-id">{r.id}</td>
                  <td><div className="td-nm">{r.name}</div></td>
                  <td style={{fontSize:11}}>📍 {r.loc}</td>
                  <td style={{fontSize:11}}>{r.officer}</td>
                  <td className="td-mo" style={{fontSize:10.5}}>{r.start}</td>
                  <td className="td-mo" style={{color:'var(--gold)'}}>{r.checks}</td>
                  <td className="td-mo" style={{color:'var(--redL)'}}>{r.arrests}</td>
                  <td><span className={`pill ${r.status==='active'?'p-active':'p-done'}`}>{r.status==='active'?'Hai':'Imekamilika'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
