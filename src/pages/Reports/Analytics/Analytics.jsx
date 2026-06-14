import { useNavigate } from 'react-router-dom'
import { MOCK_REGIONS_STATS } from '@utils/mockData'

const MONTHLY = [12,18,15,22,28,35,30,38,45,41,48,52,44,38,43,51,47,42,55,49,53,48,44,50,46,42,47,51,48,44,46]
const maxM = Math.max(...MONTHLY)

export default function Analytics() {
  const nav = useNavigate()
  return (
    <div className="afd">
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
        <div><h1 style={{fontSize:19,fontWeight:800,color:'var(--tw)'}}>📉 Uchambuzi / Analytics</h1>
          <p style={{fontSize:11.5,color:'var(--tm)',marginTop:2}}>Takwimu za kina za uhalifu – RPC, DIGP, IGP</p></div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-gh btn-sm">⬇ Pakua Ripoti</button>
          <select className="fs" style={{width:'auto',fontSize:11,padding:'6px 10px'}}><option>Mwezi Huu</option><option>Robo Mwaka</option><option>Mwaka Huu</option></select>
        </div>
      </div>

      <div className="stats-row s5 mb-sec">
        {[{ic:'📊',cls:'ic-blue',n:'4,291',lbl:'Shughuli Jumla (Mwezi)',delta:'↑ 12%',dcls:'up'},{ic:'📋',cls:'ic-green',n:'2,847',lbl:'Citations Mwezi Huu',delta:'↑ 15%',dcls:'up'},{ic:'⛓️',cls:'ic-amber',n:'312',lbl:'Kukamatwa Mwezi',delta:'↑ 8%',dcls:'up'},{ic:'🚗',cls:'ic-purple',n:'12,450',lbl:'Magari Yakaguliwa',delta:'↑ 18%',dcls:'up'},{ic:'💰',cls:'ic-red',n:'284M',lbl:'Faini (TZS)',delta:'↑ 22%',dcls:'up'}].map(c => (
          <div key={c.lbl} className="scard"><div className="scard-top"><div className={`scard-icon ${c.cls}`}>{c.ic}</div><div className={`scard-delta ${c.dcls}`}>{c.delta}</div></div><div className="scard-num">{c.n}</div><div className="scard-lbl">{c.lbl}</div></div>
        ))}
      </div>

      <div className="row4 mb-sec">
        {/* Trend chart */}
        <div className="card">
          <div className="card-h">
            <div className="card-t">📈 Mwenendo wa Uhalifu – Mei 2024</div>
            <div style={{display:'flex',gap:12,fontSize:10}}>
              {[['#1B5E20','Citations'],['#EF5350','Kukamatwa'],['#FFC107','Matukio']].map(([c,l]) => (
                <span key={l} style={{display:'flex',alignItems:'center',gap:3,color:'var(--tm)'}}>
                  <span style={{width:10,height:3,background:c,display:'inline-block',borderRadius:2}} />{l}
                </span>
              ))}
            </div>
          </div>
          <div style={{padding:'14px'}}>
            <div style={{display:'flex',alignItems:'flex-end',gap:2,height:120,marginBottom:8}}>
              {MONTHLY.map((v,i) => (
                <div key={i} style={{flex:1,display:'flex',flexDirection:'column',gap:2,height:'100%',alignItems:'center',justifyContent:'flex-end'}}>
                  <div style={{width:'100%',background:`rgba(27,94,32,${0.4+v/maxM*0.6})`,borderRadius:'2px 2px 0 0',height:`${(v/maxM)*100}%`}} />
                </div>
              ))}
            </div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:9,color:'var(--td)'}}>
              {['1','','','','','','7','','','','','','14','','','','','','21','','','','','','28','','','','','','31'].map((l,i) => (
                <span key={i}>{l}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Donut + Region */}
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <div className="card">
            <div className="card-h"><div className="card-t">🍩 Aina za Makosa</div></div>
            <div style={{padding:'14px',display:'flex',alignItems:'center',gap:16}}>
              <div style={{position:'relative',flexShrink:0}}>
                <svg width="100" height="100" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="3.2"/>
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1B5E20" strokeWidth="3.2" strokeDasharray="35 65" strokeDashoffset="25"/>
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#FFC107" strokeWidth="3.2" strokeDasharray="25 75" strokeDashoffset="-10"/>
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#C62828" strokeWidth="3.2" strokeDasharray="20 80" strokeDashoffset="-35"/>
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1565C0" strokeWidth="3.2" strokeDasharray="12 88" strokeDashoffset="-55"/>
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#6A1B9A" strokeWidth="3.2" strokeDasharray="8 92" strokeDashoffset="-67"/>
                </svg>
                <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                  <div style={{fontSize:16,fontWeight:800,color:'var(--tw)',fontFamily:'var(--fm)',lineHeight:1}}>2.8K</div>
                  <div style={{fontSize:8,color:'var(--tm)'}}>Jumla</div>
                </div>
              </div>
              <div className="legend">
                {[['#1B5E20','Barabara','35%'],['#FFC107','Wizi','25%'],['#C62828','Mapigano','20%'],['#1565C0','Madawa','12%'],['#6A1B9A','Nyingine','8%']].map(([c,l,v]) => (
                  <div key={l} className="leg-item"><div className="leg-dot" style={{background:c}} /><span style={{fontSize:10.5}}>{l}</span><span className="leg-val">{v}</span></div>
                ))}
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-h"><div className="card-t">🗺️ Kwa Mkoa</div></div>
            <div style={{padding:'10px 14px'}}>
              {MOCK_REGIONS_STATS.map(r => (
                <div key={r.name} className="heat-row">
                  <div className="heat-lbl" style={{fontSize:10}}>{r.name}</div>
                  <div className="heat-bar"><div className="heat-fill" style={{width:`${r.pct}%`,background:r.color}} /></div>
                  <div className="heat-cnt">{r.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top offences table */}
      <div className="card mb-sec">
        <div className="card-h"><div className="card-t">📊 Makosa Yanayoongoza</div></div>
        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr><th>#</th><th>Aina ya Kosa</th><th>Sheria</th><th>Idadi</th><th>% ya Jumla</th><th>Mwenendo</th></tr></thead>
            <tbody>
              {[['1','Kuendesha bila Leseni','Kif. 129(1)','847','29.8%','↑ 12%'],['2','Mwendo Kasi','Kif. 131(1)','623','21.9%','↑ 8%'],['3','Kutumia Simu','Kif. 134(1)','412','14.5%','↑ 22%'],['4','Bila Mkanda','Kif. 133(1)','298','10.5%','↓ 5%'],['5','Kuvuka Taa Nyekundu','Kif. 132(1)','234','8.2%','↑ 3%']].map(([n,t,c,cnt,pct,tr]) => (
                <tr key={n}>
                  <td style={{color:'var(--tm)',fontWeight:600}}>{n}</td>
                  <td><div style={{fontWeight:600,color:'var(--tw)'}}>{t}</div></td>
                  <td className="td-id" style={{fontSize:10}}>{c}</td>
                  <td className="td-mo" style={{color:'var(--gold)'}}>{cnt}</td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:6}}>
                      <div style={{flex:1,background:'rgba(0,0,0,.3)',borderRadius:3,height:4,maxWidth:60}}>
                        <div style={{height:'100%',background:'var(--g400)',borderRadius:3,width:pct}} />
                      </div>
                      <span style={{fontSize:10.5,fontFamily:'var(--fm)',color:'var(--tm)'}}>{pct}</span>
                    </div>
                  </td>
                  <td><span style={{fontSize:11,fontWeight:600,color:tr.startsWith('↑')?'#66BB6A':'#EF5350'}}>{tr}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
