import { useState } from 'react'

const MOCK_FORENSICS = [
  {id:'FOR-2024-00034',type:'Alama za Vidole',case:'CASE-2024-00128',item:'Laptop Dell – Handle',analyst:'Forensic Sgt. Ali',collected:'17/05/2024',result:'Zimepatikana – zinaoanisha mtuhumiwa',status:'completed'},
  {id:'FOR-2024-00033',type:'DNA',case:'CASE-2024-00126',item:'Nyuzi za nguo – scene',analyst:'Dr. Fatuma Lab',collected:'15/05/2024',result:'Bado inachunguzwa',status:'pending'},
  {id:'FOR-2024-00032',type:'Dijitali – CCTV',case:'CASE-2024-00128',item:'CCTV_01.mp4',analyst:'Cyber Analyst Hassan',collected:'17/05/2024',result:'Uso wa mtuhumiwa umetambuliwa',status:'completed'},
  {id:'FOR-2024-00031',type:'Ballistics',case:'CASE-2024-00125',item:'Risasi – eneo la uhalifu',analyst:'Ballistics Expert Kimaro',collected:'14/05/2024',result:'Bado inachunguzwa',status:'pending'},
]

export default function Forensics() {
  const [tab, setTab] = useState('all')
  const tabs = [{id:'all',label:'Zote'},{id:'fingerprints',label:'Alama za Vidole'},{id:'dna',label:'DNA'},{id:'digital',label:'Dijitali'},{id:'ballistics',label:'Ballistics'}]
  return (
    <div className="afd">
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
        <div><h1 style={{fontSize:19,fontWeight:800,color:'var(--tw)'}}>🧪 Forensics / Uchunguzi wa Kisayansi</h1>
          <p style={{fontSize:11.5,color:'var(--tm)',marginTop:2}}>Alama za vidole · DNA · Ballistics · Dijitali · Nyaraka</p></div>
        <button className="btn btn-g">+ Uchunguzi Mpya</button>
      </div>
      <div className="stats-row s5 mb-sec">
        {[{ic:'👆',cls:'ic-purple',n:18,lbl:'Alama za Vidole'},{ic:'🧬',cls:'ic-blue',n:6,lbl:'DNA Samples'},{ic:'💻',cls:'ic-green',n:12,lbl:'Dijitali'},{ic:'💣',cls:'ic-red',n:4,lbl:'Ballistics'},{ic:'📄',cls:'ic-amber',n:7,lbl:'Nyaraka'}].map(c => (
          <div key={c.lbl} className="scard"><div className="scard-icon" style={{width:34,height:34,borderRadius:'var(--r8)',background:'rgba(0,0,0,.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,marginBottom:8}}>{c.ic}</div><div className="scard-num">{c.n}</div><div className="scard-lbl">{c.lbl}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-h">
          <div className="card-t">🧪 Orodha ya Uchunguzi wa Forensics</div>
          <div className="tabs">{tabs.map(t => <button key={t.id} className={`tab ${tab===t.id?'on':''}`} onClick={()=>setTab(t.id)}>{t.label}</button>)}</div>
        </div>
        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr><th>Namba</th><th>Aina</th><th>Kesi</th><th>Kipande/Item</th><th>Mtaalamu</th><th>Tarehe</th><th>Matokeo</th><th>Hali</th></tr></thead>
            <tbody>
              {MOCK_FORENSICS.map(f => (
                <tr key={f.id}>
                  <td className="td-id">{f.id}</td>
                  <td><span className="pill p-pending" style={{fontSize:'9px'}}>{f.type}</span></td>
                  <td className="td-id" style={{fontSize:10}}>{f.case}</td>
                  <td style={{fontSize:11}}>{f.item}</td>
                  <td style={{fontSize:11}}>{f.analyst}</td>
                  <td className="td-mo" style={{fontSize:10.5}}>{f.collected}</td>
                  <td style={{fontSize:10.5,maxWidth:180,color:f.status==='completed'?'#66BB6A':'var(--tm)'}}>{f.result}</td>
                  <td><span className={`pill ${f.status==='completed'?'p-done':'p-pending'}`}>{f.status==='completed'?'Imekamilika':'Inaendelea'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
