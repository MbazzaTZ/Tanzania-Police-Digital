import { useParams, useNavigate } from 'react-router-dom'
import Badge from '@components/ui/Badge'
import PoliceBadge from '@components/shared/PoliceBadge'
import { MOCK_CITATIONS } from '@utils/mockData'

export default function CitationDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const c = MOCK_CITATIONS.find(x => x.id === id) || MOCK_CITATIONS[0]

  const STEPS_DONE = ['Kukamata mtuhumiwa','Kuandaa maelezo ya kukamata','Kukusanya uthibitisho','Kesi imewasilishwa mahakamani']
  const STEPS_PENDING = ['Kushubutu tarehe ya kesi']

  return (
    <div className="afd">
      {/* Header */}
      <div style={{background:'linear-gradient(135deg,#080C1A,#1a237e)',borderRadius:'var(--r16)',padding:'14px 20px',marginBottom:14,display:'flex',gap:14,alignItems:'center'}}>
        <PoliceBadge size={42} />
        <div style={{flex:1}}>
          <div style={{fontSize:9,color:'rgba(255,255,255,.45)',textTransform:'uppercase',letterSpacing:1}}>TOA CITATION (LESENI)</div>
          <div style={{fontSize:16,fontWeight:800,color:'white'}}>{c.id}</div>
          <div style={{fontSize:10,color:'rgba(255,255,255,.55)'}}>{c.offence}</div>
        </div>
        <div style={{display:'flex',gap:6,flexShrink:0}}>
          <span className="pill p-done" style={{alignSelf:'center'}}>Imekamilika</span>
          <button className="btn btn-gh btn-sm">📄 HIFADHI PDF</button>
          <button className="btn btn-gh btn-sm">⋮</button>
        </div>
      </div>

      {/* 5-step progress bar */}
      <div style={{background:'var(--g700)',border:'1px solid var(--b)',borderRadius:'var(--r12)',padding:'14px 20px 22px',marginBottom:12}}>
        <div style={{display:'flex',alignItems:'center'}}>
          {['Taarifa ya Mtuhumiwa','Mashtaka (Charges)','Maelezo ya Kukamata','Uthibitisho (Evidence)','Muhtasari'].map((s,i) => {
            const done = i < 4, active = i === 4
            return (
              <div key={s} style={{display:'flex',alignItems:'center',flex:1}}>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                  <div style={{width:28,height:28,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,background:done?'var(--g600)':active?'var(--gold)':'var(--g700)',border:`2px solid ${done?'var(--g500)':active?'var(--gold)':'var(--bl)'}`,color:done?'#fff':active?'#111':'rgba(255,255,255,.3)'}}>
                    {done ? '✓' : i+1}
                  </div>
                  <div style={{fontSize:8.5,color:done?'var(--g300)':active?'var(--gold)':'rgba(255,255,255,.3)',textAlign:'center',whiteSpace:'nowrap'}}>{s}</div>
                </div>
                {i < 4 && <div style={{flex:1,height:2,background:'var(--g500)',margin:'0 4px',marginBottom:16}} />}
              </div>
            )
          })}
        </div>
      </div>

      {/* Main content */}
      <div className="row4 mb-sec">
        {/* Left col */}
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {/* Case info */}
          <div className="card">
            <div className="card-h">
              <div>
                <div className="card-t">MAELEZO YA KESI</div>
              </div>
              <span className="pill p-done">Imekamilika</span>
            </div>
            <div className="card-bd">
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12}}>
                <div>
                  <div style={{fontSize:9,color:'var(--td)',textTransform:'uppercase',marginBottom:2}}>Namba ya Kesi</div>
                  <div style={{fontSize:16,fontWeight:800,color:'var(--tw)',fontFamily:'var(--fm)'}}>{c.id}</div>
                </div>
                <div>
                  <div style={{fontSize:9,color:'var(--td)',textTransform:'uppercase',marginBottom:2}}>Hali</div>
                  <span className="pill p-done">Imekamilika</span>
                </div>
                <div>
                  <div style={{fontSize:9,color:'var(--td)',textTransform:'uppercase',marginBottom:2}}>Tarehe ya Kutolewa</div>
                  <div style={{fontSize:12,fontWeight:600,color:'var(--tl)'}}>{c.date}</div>
                </div>
                <div>
                  <div style={{fontSize:9,color:'var(--td)',textTransform:'uppercase',marginBottom:2}}>Muda</div>
                  <div style={{fontSize:12,fontWeight:600,color:'var(--tl)'}}>{c.time}</div>
                </div>
              </div>
              <div style={{padding:'10px 12px',background:'rgba(0,0,0,.2)',borderRadius:'var(--r8)'}}>
                <div style={{fontSize:9,color:'var(--td)',textTransform:'uppercase',marginBottom:4}}>Mahali pa Kutolewa</div>
                <div style={{fontSize:12,color:'var(--tl)'}}>📍 {c.location}</div>
              </div>
            </div>
          </div>

          {/* Charges */}
          <div className="card">
            <div className="card-h"><div className="card-t">MASHTAKA (CHARGES)</div></div>
            <div style={{overflowX:'auto'}}>
              <table>
                <thead><tr><th>#</th><th>Aina ya Shtaka</th><th>Kifungu</th><th>Aina</th><th>Hali</th></tr></thead>
                <tbody>
                  {[{n:1,type:'Wizi',code:'Kif. 258(a) CPC',kind:'Felony'},{n:2,type:'Kujihusisha na Mali ya Wizi',code:'Kif. 312 CPC',kind:'Misdemeanor'}].map(ch => (
                    <tr key={ch.n}>
                      <td style={{color:'var(--tm)'}}>{ch.n}</td>
                      <td style={{fontWeight:600,fontSize:11.5}}>{ch.type}</td>
                      <td className="td-id" style={{fontSize:10}}>{ch.code}</td>
                      <td><span className={`pill ${ch.kind==='Felony'?'p-critical':'p-pending'}`} style={{fontSize:'8.5px'}}>{ch.kind}</span></td>
                      <td><span className="pill p-done" style={{fontSize:'8.5px'}}>Imekamilika</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Evidence */}
          <div className="card">
            <div className="card-h">
              <div className="card-t">UTHIBITISHO (EVIDENCE)</div>
              <span className="view-all">Tazama Uthibitisho Wote →</span>
            </div>
            <div style={{padding:'12px 14px',display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
              {[{ic:'💻',name:'Laptop Dell.jpg',type:'Picha'},{ic:'👜',name:'Begii.jpg',type:'Picha'},{ic:'💰',name:'Pesa Taslimu.jpg',type:'Picha'},{ic:'📄',name:'Taarifa Mashahidi.pdf',type:'PDF',red:true},{ic:'🎙️',name:'Mahojiano_01.m4a',type:'Sauti',purple:true},{ic:'🎬',name:'CCTV_01.mp4',type:'Video',blue:true}].map((e,i) => (
                <div key={i} style={{background:'rgba(0,0,0,.25)',border:'1px solid var(--b)',borderRadius:'var(--r8)',overflow:'hidden'}}>
                  <div style={{height:52,background:'rgba(0,0,0,.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,position:'relative'}}>
                    {e.ic}
                    <div style={{position:'absolute',bottom:3,left:4,fontSize:7.5,fontWeight:700,padding:'1px 4px',borderRadius:2,background:e.red?'rgba(198,40,40,.8)':e.purple?'rgba(106,27,154,.8)':e.blue?'rgba(21,101,192,.8)':'rgba(0,0,0,.6)',color:'#fff'}}>{e.type}</div>
                  </div>
                  <div style={{padding:'5px 7px'}}><div style={{fontSize:9.5,color:'var(--tl)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{e.name}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right col */}
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {/* Suspect */}
          <div className="card">
            <div className="card-h"><div className="card-t">MTUHUMIWA</div></div>
            <div className="card-bd">
              <div style={{display:'flex',gap:10,marginBottom:12}}>
                <div style={{width:56,height:56,borderRadius:'50%',background:'var(--g600)',border:'2px solid var(--gold)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,flexShrink:0}}>👤</div>
                <div>
                  <div style={{fontSize:14,fontWeight:700,color:'var(--tw)',marginBottom:2}}>{c.suspect}</div>
                  <div style={{fontSize:10.5,color:'var(--tm)'}}>NIDA: {c.nida}</div>
                  <button className="btn btn-gh btn-sm" style={{marginTop:5,fontSize:10}}>Tazama Profaili Kamili →</button>
                </div>
              </div>
              {[['Jinsia','Mwanaume'],['NIDA / Kitambulisho',c.nida]].map(([l,v]) => (
                <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',fontSize:11.5,borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                  <span style={{color:'var(--tm)'}}>{l}</span><span style={{fontWeight:500}}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="card">
            <div className="card-bd">
              <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8}}>
                {[['👥','Mashahidi','2 Watu'],['🛡️','Afisa Walioshiriki','2 Watu'],['📎','Nyaraka Zingine','6 Faili'],['🎬','Vyombo vya Habari','1 Video']].map(([ic,l,v]) => (
                  <div key={l} style={{background:'rgba(0,0,0,.2)',borderRadius:'var(--r8)',padding:'10px 12px',display:'flex',alignItems:'center',gap:8}}>
                    <div style={{fontSize:18}}>{ic}</div>
                    <div>
                      <div style={{fontSize:10.5,fontWeight:700,color:'var(--tw)',fontFamily:'var(--fm)'}}>{v}</div>
                      <div style={{fontSize:9,color:'var(--tm)'}}>{l}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Taarifa ya Kukamatwa */}
          <div className="card">
            <div className="card-h"><div className="card-t">TAARIFA YA KUKAMATWA</div></div>
            <div className="card-bd">
              <div className="sbox" style={{marginBottom:12,fontSize:11}}>✅ Imekamilika</div>
              {[['Imefungwa tarehe','17/05/2024, 11:30 AM'],['Imefungwa na','Sgt. James Mallya']].map(([l,v]) => (
                <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',fontSize:11.5,borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                  <span style={{color:'var(--tm)'}}>{l}</span><span style={{fontWeight:500}}>{v}</span>
                </div>
              ))}
              <button className="btn btn-gh btn-sm" style={{marginTop:10,width:'100%',fontSize:10.5}}>Tazama Maelezo ya Kukamata →</button>
            </div>
          </div>

          {/* Next steps */}
          <div className="card">
            <div className="card-h"><div className="card-t">HATUA INAYOFUATA</div></div>
            <div className="card-bd">
              {STEPS_DONE.map(s => (
                <div key={s} className="check-row"><span className="check">✅</span><span>{s}</span></div>
              ))}
              {STEPS_PENDING.map(s => (
                <div key={s} className="check-row"><span style={{color:'var(--gold)',fontSize:14}}>⏳</span><span style={{color:'var(--tm)'}}>{s}</span></div>
              ))}
              <button className="btn btn-gh btn-sm" style={{marginTop:10,width:'100%',fontSize:10.5}}>Tazama Workflow Kamili →</button>
            </div>
          </div>

          {/* History */}
          <div className="card">
            <div className="card-h"><div className="card-t">HISTORIA YA MAREKEBISHO</div></div>
            <div className="card-bd">
              {[{ic:'✅',text:'Kesi imekamilika',by:'Juma Ally Khamis (DSM)',time:'20/05/2024 08:35 AM'},{ic:'✏️',text:'Taarifa zimehaririwa',by:'Asha Salum (DSM)',time:'19/05/2024 04:20 PM'},{ic:'➕',text:'Kesi imeundwa',by:'Juma Ally Khamis (DSM)',time:'17/05/2024 11:02 AM'}].map((h,i) => (
                <div key={i} style={{display:'flex',gap:8,padding:'7px 0',borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                  <div style={{fontSize:14,flexShrink:0}}>{h.ic}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:11,fontWeight:600,color:'var(--tl)'}}>{h.text}</div>
                    <div style={{fontSize:9.5,color:'var(--tm)',marginTop:1}}>Na: {h.by} · {h.time}</div>
                  </div>
                </div>
              ))}
              <button className="btn btn-gh btn-sm" style={{marginTop:8,width:'100%',fontSize:10.5}}>Tazama Historia Yote →</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
        <button className="btn btn-o" onClick={()=>nav('/enforcement/citations')}>← NYUMA</button>
        <button className="btn btn-gh">🖨️ CHAPISHA TAARIFA</button>
        <button className="btn btn-g" onClick={()=>nav('/enforcement/citations/new')}>🔄 FUNGUA KESI TENA</button>
      </div>
    </div>
  )
}
