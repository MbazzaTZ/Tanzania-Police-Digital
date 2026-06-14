import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MOCK_PATROLS, MOCK_OFFICERS } from '@utils/mockData'

export default function Patrol() {
  const nav = useNavigate()
  const [starting, setStarting] = useState(false)
  return (
    <div className="afd">
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
        <div><h1 style={{fontSize:19,fontWeight:800,color:'var(--tw)'}}>🚔 Doria / Patrol</h1>
          <p style={{fontSize:11.5,color:'var(--tm)',marginTop:2}}>Angalia na simamia doria zote zinazoendelea</p></div>
        <button className="btn btn-g" onClick={()=>setStarting(true)}>+ Anza Doria Mpya</button>
      </div>
      <div className="stats-row s4 mb-sec">
        {[{ic:'🚔',cls:'ic-green',n:89,lbl:'Doria Zinazoendelea',delta:'↑ 5%',dcls:'up'},{ic:'✅',cls:'ic-blue',n:34,lbl:'Zilizokamilika Leo',delta:'↑ 12%',dcls:'up'},{ic:'👮',cls:'ic-amber',n:1247,lbl:'Maafisa Wanafanya Kazi',delta:'↑ 3%',dcls:'up'},{ic:'⏱️',cls:'ic-purple',n:6,lbl:'Wastani wa Masaa',delta:'→ 0%',dcls:'flat'}].map(c => (
          <div key={c.lbl} className="scard"><div className="scard-top"><div className={`scard-icon ${c.cls}`}>{c.ic}</div><div className={`scard-delta ${c.dcls}`}>{c.delta}</div></div><div className="scard-num">{c.n.toLocaleString()}</div><div className="scard-lbl">{c.lbl}</div></div>
        ))}
      </div>
      {starting && (
        <div className="card mb-sec" style={{border:'1px solid var(--gold)'}}>
          <div className="card-h"><div className="card-t" style={{color:'var(--gold)'}}>+ Anza Doria Mpya</div>
            <button className="btn btn-gh btn-sm" onClick={()=>setStarting(false)}>✕</button></div>
          <div className="card-bd">
            <div className="fg2">
              <div className="fg"><div className="fl">Njia ya Doria *</div><input className="fi" defaultValue="Morogoro Rd – Oysterbay – Msasani" /></div>
              <div className="fg"><div className="fl">Kituo *</div><select className="fs"><option>Oysterbay Police Station</option></select></div>
              <div className="fg"><div className="fl">Aina ya Doria</div><select className="fs"><option>Kawaida</option><option>Maalum</option><option>Barabara</option></select></div>
              <div className="fg"><div className="fl">Muda wa Kutarajiwa</div><input className="fi" defaultValue="8 Masaa" /></div>
            </div>
            <button className="btn btn-g" style={{marginTop:8}} onClick={()=>setStarting(false)}>📡 Anza Doria na GPS</button>
          </div>
        </div>
      )}
      <div className="card mb-sec">
        <div className="card-h"><div className="card-t">🚔 Doria Zinazoendelea</div></div>
        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr><th>Namba</th><th>Afisa</th><th>Njia</th><th>Kituo</th><th>Ilianza</th><th>GPS</th><th>Hali</th><th></th></tr></thead>
            <tbody>
              {MOCK_PATROLS.map(p => (
                <tr key={p.id}>
                  <td className="td-id">{p.id}</td>
                  <td><div className="td-nm">{p.officer}</div><div className="td-sub">Badge: {p.badge}</div></td>
                  <td style={{fontSize:11}}>{p.route}</td>
                  <td style={{fontSize:11}}>{p.station}</td>
                  <td className="td-mo" style={{fontSize:10.5}}>{p.start}</td>
                  <td><span style={{fontSize:9.5,fontFamily:'var(--fm)',color:'var(--gold)'}}>{p.gps.lat.toFixed(3)}, {p.gps.lng.toFixed(3)}</span></td>
                  <td><span className={`pill ${p.status==='active'?'p-active':'p-done'}`}>{p.status==='active'?'Hai':'Imekamilika'}</span></td>
                  <td><button className="btn btn-gh btn-sm">📍 Fuatilia</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
