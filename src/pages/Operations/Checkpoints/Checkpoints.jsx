import { useState } from 'react'

const MOCK_CP = [
  {id:'CP-001',name:'Checkpoint ya Morogoro Rd',loc:'KM 3, Morogoro Rd',officer:'Insp. J.M. Khamis',checks:89,citations:12,status:'active'},
  {id:'CP-002',name:'Checkpoint ya Bagamoyo',loc:'Mwanga Junction',officer:'Sgt. A. Suleiman',checks:67,citations:8,status:'active'},
  {id:'CP-003',name:'Checkpoint ya Ali Hassan',loc:'Ali Hassan Mwinyi Rd',officer:'Cpl. H. Mwinyi',checks:134,citations:18,status:'completed'},
]

export default function Checkpoints() {
  return (
    <div className="afd">
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
        <div><h1 style={{fontSize:19,fontWeight:800,color:'var(--tw)'}}>⛽ Vituo vya Ukaguzi / Checkpoints</h1>
          <p style={{fontSize:11.5,color:'var(--tm)',marginTop:2}}>Simamia vituo vya ukaguzi vya barabarani</p></div>
        <button className="btn btn-g">+ Kituo Kipya</button>
      </div>
      <div className="stats-row s4 mb-sec">
        {[{ic:'⛽',cls:'ic-blue',n:8,lbl:'Vituo Hai',delta:'↑ 2',dcls:'up'},{ic:'🚗',cls:'ic-green',n:290,lbl:'Magari Yakaguliwa',delta:'↑ 8%',dcls:'up'},{ic:'📋',cls:'ic-amber',n:38,lbl:'Citations Zilitolewa',delta:'↑ 5%',dcls:'up'},{ic:'⛓️',cls:'ic-red',n:4,lbl:'Kukamatwa',delta:'↑ 1',dcls:'up'}].map(c => (
          <div key={c.lbl} className="scard"><div className="scard-top"><div className={`scard-icon ${c.cls}`}>{c.ic}</div><div className={`scard-delta ${c.dcls}`}>{c.delta}</div></div><div className="scard-num">{c.n}</div><div className="scard-lbl">{c.lbl}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-h"><div className="card-t">⛽ Vituo vya Ukaguzi</div></div>
        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr><th>Namba</th><th>Jina</th><th>Mahali</th><th>Afisa</th><th>Ukaguzi</th><th>Citations</th><th>Hali</th></tr></thead>
            <tbody>
              {MOCK_CP.map(c => (
                <tr key={c.id}>
                  <td className="td-id">{c.id}</td>
                  <td><div className="td-nm">{c.name}</div></td>
                  <td style={{fontSize:11}}>📍 {c.loc}</td>
                  <td style={{fontSize:11}}>{c.officer}</td>
                  <td className="td-mo" style={{color:'var(--gold)'}}>{c.checks}</td>
                  <td className="td-mo" style={{color:'var(--redL)'}}>{c.citations}</td>
                  <td><span className={`pill ${c.status==='active'?'p-active':'p-done'}`}>{c.status==='active'?'Hai':'Imekamilika'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
