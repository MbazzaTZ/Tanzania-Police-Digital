import { useNavigate } from 'react-router-dom'
export default function Performance() {
  const OFFICERS = [{name:'Insp. J.M. Khamis',badge:'123456',station:'Oysterbay PS',citations:47,arrests:12,patrols:18,score:94},{name:'Sgt. A. Suleiman',badge:'234567',station:'Kariakoo PS',citations:38,arrests:9,patrols:22,score:87},{name:'Cpl. H. Mwinyi',badge:'456789',station:'Temeke PS',citations:28,arrests:6,patrols:15,score:76},{name:'ASP F.R. Kimaro',badge:'345678',station:'Ilala PS',citations:22,arrests:14,patrols:10,score:88}]
  return (
    <div className="afd">
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
        <div><h1 style={{fontSize:19,fontWeight:800,color:'var(--tw)'}}>📈 Utendaji / Performance</h1>
          <p style={{fontSize:11.5,color:'var(--tm)',marginTop:2}}>Tathmini ya utendaji wa maafisa na vituo</p></div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-gh btn-sm">⬇ Pakua</button>
          <select className="fs" style={{width:'auto',fontSize:11,padding:'6px 10px'}}><option>Mwezi Huu</option><option>Robo Mwaka</option></select>
        </div>
      </div>
      <div className="stats-row s4 mb-sec">
        {[{ic:'⭐',cls:'ic-gold',n:'87%',lbl:'Wastani wa Alama'},{ic:'🏆',cls:'ic-green',n:12,lbl:'Maafisa Bora'},{ic:'📈',cls:'ic-blue',n:'94%',lbl:'Alama ya Juu Zaidi'},{ic:'📉',cls:'ic-red',n:3,lbl:'Wanahitaji Mafunzo'}].map(c => (
          <div key={c.lbl} className="scard"><div className={`scard-icon ${c.cls||'ic-green'}`}>{c.ic}</div><div className="scard-num">{c.n}</div><div className="scard-lbl">{c.lbl}</div></div>
        ))}
      </div>
      <div className="card mb-sec">
        <div className="card-h"><div className="card-t">📈 Utendaji wa Maafisa – Mwezi Huu</div></div>
        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr><th>#</th><th>Afisa</th><th>Kituo</th><th>Citations</th><th>Kukamatwa</th><th>Doria</th><th>Alama</th><th>Daraja</th></tr></thead>
            <tbody>
              {OFFICERS.map((o,i) => (
                <tr key={o.badge}>
                  <td style={{color:'var(--gold)',fontWeight:700}}>{i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}</td>
                  <td><div className="td-nm">{o.name}</div><div className="td-sub">Badge: {o.badge}</div></td>
                  <td style={{fontSize:11}}>{o.station}</td>
                  <td className="td-mo" style={{color:'var(--gold)'}}>{o.citations}</td>
                  <td className="td-mo" style={{color:'var(--redL)'}}>{o.arrests}</td>
                  <td className="td-mo">{o.patrols}</td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:6}}>
                      <div style={{flex:1,background:'rgba(0,0,0,.3)',borderRadius:3,height:5,maxWidth:50}}>
                        <div style={{height:'100%',background:o.score>=90?'#4CAF50':o.score>=75?'#FFC107':'#EF5350',borderRadius:3,width:`${o.score}%`}} />
                      </div>
                      <span className="td-mo">{o.score}%</span>
                    </div>
                  </td>
                  <td><span className={`pill ${o.score>=90?'p-active':o.score>=75?'p-pending':'p-critical'}`}>{o.score>=90?'Bora':o.score>=75?'Nzuri':'Inayohitaji Maboresho'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
