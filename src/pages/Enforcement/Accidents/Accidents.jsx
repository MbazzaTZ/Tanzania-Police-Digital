import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MOCK_ACCIDENTS = [
  {id:'ACC-2024-00089',type:'Mgongano wa Magari Mawili',location:'Morogoro Rd, KM 5, Oysterbay',date:'17/05/2024',time:'09:20',vehicles:2,casualties:1,damage:'TZS 4,500,000',officer:'Insp. J.M. Khamis',status:'investigating'},
  {id:'ACC-2024-00088',type:'Gari Kupinduka',location:'Bagamoyo Rd, KM 12',date:'16/05/2024',time:'23:45',vehicles:1,casualties:0,damage:'TZS 2,000,000',officer:'Sgt. A. Suleiman',status:'completed'},
  {id:'ACC-2024-00087',type:'Gari Kupiga Mtu',location:'Ali Hassan Mwinyi Rd',date:'16/05/2024',time:'18:30',vehicles:1,casualties:1,damage:'TZS 1,200,000',officer:'Cpl. H. Mwinyi',status:'court'},
  {id:'ACC-2024-00086',type:'Mgongano wa Magari Matatu',location:'Nyerere Rd, Kariakoo',date:'15/05/2024',time:'14:10',vehicles:3,casualties:3,damage:'TZS 8,000,000',officer:'ASP F.R. Kimaro',status:'completed'},
]

export default function Accidents() {
  const nav = useNavigate()
  const [showForm, setShowForm] = useState(false)
  return (
    <div className="afd">
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
        <div><h1 style={{fontSize:19,fontWeight:800,color:'var(--tw)'}}>🚗 Ajali / Accidents</h1>
          <p style={{fontSize:11.5,color:'var(--tm)',marginTop:2}}>Ripoti za ajali za barabarani · Leo: 2 · Mwezi huu: 47</p></div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-gh btn-sm">⬇ Pakua</button>
          <button className="btn btn-g" onClick={()=>setShowForm(!showForm)}>+ Ripoti ya Ajali</button>
        </div>
      </div>
      <div className="stats-row s4 mb-sec">
        {[{ic:'🚗',cls:'ic-red',n:47,lbl:'Ajali Mwezi Huu',delta:'↓ 8%',dcls:'down'},{ic:'🤕',cls:'ic-amber',n:12,lbl:'Majeruhi',delta:'↓ 5%',dcls:'down'},{ic:'💀',cls:'ic-red',n:1,lbl:'Vifo',delta:'↓ 2',dcls:'down'},{ic:'💰',cls:'ic-blue',n:'47M',lbl:'Uharibifu (TZS)',delta:'↓ 12%',dcls:'down'}].map(c => (
          <div key={c.lbl} className="scard"><div className="scard-top"><div className={`scard-icon ${c.cls}`}>{c.ic}</div><div className={`scard-delta ${c.dcls}`}>{c.delta}</div></div><div className="scard-num">{c.n}</div><div className="scard-lbl">{c.lbl}</div></div>
        ))}
      </div>
      {showForm && (
        <div className="card mb-sec" style={{border:'1px solid var(--gold)'}}>
          <div className="card-h"><div className="card-t" style={{color:'var(--gold)'}}>📋 Ripoti ya Ajali Mpya</div><button className="btn btn-gh btn-sm" onClick={()=>setShowForm(false)}>✕</button></div>
          <div className="card-bd">
            <div className="fg2">
              <div className="fg"><div className="fl">Aina ya Ajali *</div><select className="fs"><option>Mgongano wa Magari Mawili</option><option>Gari Kupinduka</option><option>Gari Kupiga Mtu</option><option>Nyingine</option></select></div>
              <div className="fg"><div className="fl">Mahali *</div><input className="fi" placeholder="Anuani kamili" /></div>
              <div className="fg"><div className="fl">Tarehe *</div><input className="fi" type="date" defaultValue="2024-05-17" /></div>
              <div className="fg"><div className="fl">Saa *</div><input className="fi" type="time" defaultValue="10:45" /></div>
              <div className="fg"><div className="fl">Idadi ya Magari</div><input className="fi" type="number" defaultValue="2" /></div>
              <div className="fg"><div className="fl">Idadi ya Majeruhi</div><input className="fi" type="number" defaultValue="0" /></div>
              <div className="fg"><div className="fl">Thamani ya Uharibifu (TZS)</div><input className="fi" placeholder="0" /></div>
              <div className="fg"><div className="fl">Afisa Anayechunguza</div><input className="fi" defaultValue="Insp. J.M. Khamis" /></div>
            </div>
            <div className="fg"><div className="fl">Maelezo ya Ajali *</div><textarea className="ft" rows={3} placeholder="Eleza kwa kina kilichotokea..." /></div>
            <div style={{display:'flex',gap:8,marginTop:4}}>
              <button className="btn btn-gh" onClick={()=>setShowForm(false)}>✕ Ghairi</button>
              <button className="btn btn-g" onClick={()=>setShowForm(false)}>✅ Hifadhi Ripoti</button>
            </div>
          </div>
        </div>
      )}
      <div className="card">
        <div className="card-h"><div className="card-t">🚗 Orodha ya Ajali</div></div>
        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr><th>Namba</th><th>Aina</th><th>Mahali</th><th>Afisa</th><th>Tarehe</th><th>Magari</th><th>Majeruhi</th><th>Uharibifu</th><th>Hali</th></tr></thead>
            <tbody>
              {MOCK_ACCIDENTS.map(a => (
                <tr key={a.id}>
                  <td className="td-id">{a.id}</td>
                  <td><div style={{fontSize:11.5,fontWeight:600,color:'var(--tw)'}}>{a.type}</div></td>
                  <td style={{fontSize:10.5}}>📍 {a.location}</td>
                  <td style={{fontSize:11}}>{a.officer}</td>
                  <td className="td-mo" style={{fontSize:10.5}}>{a.date}<br/><span style={{color:'var(--td)'}}>{a.time}</span></td>
                  <td style={{textAlign:'center',fontFamily:'var(--fm)'}}>{a.vehicles}</td>
                  <td style={{textAlign:'center',color:a.casualties>0?'var(--redL)':'var(--tm)',fontFamily:'var(--fm)',fontWeight:a.casualties>0?700:400}}>{a.casualties}</td>
                  <td style={{fontSize:10.5,fontFamily:'var(--fm)',color:'var(--gold)'}}>{a.damage}</td>
                  <td><span className={`pill ${a.status==='completed'?'p-done':a.status==='court'?'p-court':'p-pending'}`}>{a.status==='completed'?'Imekamilika':a.status==='court'?'Mahakamani':'Inachunguzwa'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
