import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Badge from '@components/ui/Badge'
import { MOCK_INCIDENTS } from '@utils/mockData'

const TABS = [
  {id:'all',          label:'Zote',          count:312},
  {id:'investigating',label:'Inachunguzwa',   count:189},
  {id:'pending',      label:'Inasubiri',      count:47},
  {id:'closed',       label:'Imefungwa',      count:76},
]

const INCIDENT_TYPES = [
  {ic:'🏃',lbl:'Wizi / Uhalifu wa Mali',val:'wizi'},
  {ic:'👊',lbl:'Mashambulizi',val:'mashambulizi'},
  {ic:'🔞',lbl:'Ukatili wa Kijinsia',val:'ukatili'},
  {ic:'💥',lbl:'Fujo / Ghasia',val:'fujo'},
  {ic:'🎭',lbl:'Ulaghai / Fraud',val:'ulaghai'},
  {ic:'⋯',lbl:'Nyingine',val:'nyingine'},
]

export default function Incidents() {
  const nav = useNavigate()
  const [tab, setTab]         = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [formStep, setFormStep] = useState(1)
  const [selType, setSelType]   = useState('wizi')
  const filtered = tab === 'all' ? MOCK_INCIDENTS : MOCK_INCIDENTS.filter(i => i.status === tab)

  return (
    <div className="afd">
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
        <div>
          <h1 style={{fontSize:19,fontWeight:800,color:'var(--tw)'}}>📝 Matukio / Incidents</h1>
          <p style={{fontSize:11.5,color:'var(--tm)',marginTop:2}}>Ripoti za matukio yaliyotokea · Leo: 5 · Mwezi huu: 312</p>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-gh btn-sm">💾 HIFADHI DRAFT</button>
          <button className="btn btn-g" onClick={()=>setShowForm(!showForm)}>+ Ripoti ya Tukio</button>
        </div>
      </div>

      <div className="stats-row s4 mb-sec">
        {[
          {ic:'📝', cls:'ic-amber',  n:312,  lbl:'Matukio Leo',       delta:'↑ 8%',  dcls:'up'},
          {ic:'🚨', cls:'ic-red',    n:47,   lbl:'Muhimu / Critical',  delta:'↑ 3',  dcls:'up'},
          {ic:'🔍', cls:'ic-blue',   n:189,  lbl:'Yanachunguzwa',      delta:'↑ 5%', dcls:'up'},
          {ic:'✅', cls:'ic-green',  n:76,   lbl:'Yaliyofungwa Leo',   delta:'↑ 8%', dcls:'up'},
        ].map(c => (
          <div key={c.lbl} className="scard">
            <div className="scard-top">
              <div className={`scard-icon ${c.cls}`}>{c.ic}</div>
              <div className={`scard-delta ${c.dcls}`}>{c.delta}</div>
            </div>
            <div className="scard-num">{c.n.toLocaleString()}</div>
            <div className="scard-lbl">{c.lbl}</div>
          </div>
        ))}
      </div>

      {/* Incident Report Form – matches screenshot 15 */}
      {showForm && (
        <div style={{background:'var(--g700)',border:'1px solid var(--b)',borderRadius:'var(--r12)',overflow:'hidden',marginBottom:14}}>
          {/* Form header */}
          <div style={{display:'flex',gap:12,alignItems:'center',padding:'12px 16px',borderBottom:'1px solid var(--b)',background:'rgba(0,0,0,.1)'}}>
            <div style={{flex:1}}>
              <div style={{fontSize:12,fontWeight:700,color:'var(--tw)'}}>Tengeneza Ripoti ya Tukio</div>
              <div style={{fontSize:10,color:'var(--tm)'}}>Jaza maelezo ya tukio lililotokea</div>
            </div>
            <button className="btn btn-gh btn-sm">💾 HIFADHI DRAFT</button>
            <button className="btn btn-gh btn-sm" onClick={()=>setShowForm(false)}>✕</button>
          </div>

          {/* 4-step progress */}
          <div style={{padding:'10px 16px 6px',borderBottom:'1px solid var(--b)',display:'flex',alignItems:'center',gap:0}}>
            {['Aina ya Tukio','Maelezo ya Tukio','Wahusika','Mapitio & Kuthibitisha'].map((s,i) => {
              const done = i < formStep-1, cur = i === formStep-1
              return (
                <div key={s} style={{display:'flex',alignItems:'center',flex:1}}>
                  <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
                    <div style={{width:24,height:24,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,background:done?'var(--g600)':cur?'var(--gold)':'var(--g750)',border:`2px solid ${done?'var(--g500)':cur?'var(--gold)':'var(--bl)'}`,color:done?'#fff':cur?'#111':'rgba(255,255,255,.3)'}}>
                      {done?'✓':i+1}
                    </div>
                    <div style={{fontSize:8.5,color:done?'var(--g300)':cur?'var(--gold)':'rgba(255,255,255,.3)',textAlign:'center',whiteSpace:'nowrap'}}>{s}</div>
                  </div>
                  {i < 3 && <div style={{flex:1,height:2,background:done?'var(--g500)':'var(--bl)',margin:'0 4px',marginBottom:16}} />}
                </div>
              )
            })}
          </div>

          <div className="card-bd">
            {formStep === 1 && (
              <div>
                <div style={{fontSize:10,fontWeight:700,color:'var(--tm)',textTransform:'uppercase',letterSpacing:.5,marginBottom:10}}>1. AINA YA TUKIO</div>
                <div style={{fontSize:10.5,color:'var(--tm)',marginBottom:10}}>Chagua aina ya tukio *</div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:16}}>
                  {INCIDENT_TYPES.map(t => (
                    <div key={t.val} onClick={()=>setSelType(t.val)}
                      style={{border:`2px solid ${selType===t.val?'var(--gold)':'var(--b)'}`,background:selType===t.val?'rgba(255,193,7,.06)':'transparent',borderRadius:'var(--r10)',padding:'12px 8px',textAlign:'center',cursor:'pointer',transition:'var(--t)',position:'relative'}}>
                      {selType===t.val && <div style={{position:'absolute',top:6,right:6,width:16,height:16,borderRadius:'50%',background:'var(--gold)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9}}>✓</div>}
                      <div style={{fontSize:24,marginBottom:6}}>{t.ic}</div>
                      <div style={{fontSize:10.5,fontWeight:600,color:'var(--tl)',lineHeight:1.2}}>{t.lbl}</div>
                    </div>
                  ))}
                </div>

                <div style={{fontSize:10,fontWeight:700,color:'var(--tm)',textTransform:'uppercase',letterSpacing:.5,marginBottom:10}}>2. MAHALI NA MUDA</div>
                <div className="fg3">
                  <div className="fg"><div className="fl">Tarehe ya Tukio *</div><input className="fi" type="date" defaultValue="2024-05-17" /></div>
                  <div className="fg"><div className="fl">Muda *</div><input className="fi" type="time" defaultValue="10:45" /></div>
                  <div className="fg"><div className="fl">Eneo / Mahali *</div>
                    <div style={{position:'relative'}}>
                      <input className="fi" defaultValue="Morogoro Road, Oysterbay" />
                      <span style={{position:'absolute',right:10,top:'50%',transform:'translateY(-50%)',fontSize:13,cursor:'pointer'}}>📍</span>
                    </div>
                  </div>
                  <div className="fg"><div className="fl">Kata / Wilaya</div><select className="fs"><option>Kinondoni</option><option>Ilala</option><option>Temeke</option></select></div>
                  <div className="fg"><div className="fl">Mkoa</div><select className="fs"><option>Dar es Salaam</option></select></div>
                </div>

                <div style={{fontSize:10,fontWeight:700,color:'var(--tm)',textTransform:'uppercase',letterSpacing:.5,margin:'14px 0 10px'}}>3. MAELEZO YA TUKIO</div>
                <div className="fg"><div className="fl">Maelezo mafupi ya tukio *</div>
                  <textarea className="ft" rows={3} defaultValue="Mnamo tarehe 17/05/2024 saa 10:45 alfajiri, tulipokea taarifa kuwa nyumba iliopo Morogoro Road, Oysterbay imevunjwa na mali mbalimbali kuibiwa." />
                  <div style={{textAlign:'right',fontSize:9.5,color:'var(--td)',marginTop:2}}>123/500</div>
                </div>
                <div className="fg"><div className="fl">Nini kilichobiwa / kuharibiwa?</div>
                  <input className="fi" defaultValue="Laptop (Dell), Simu ya mkononi (iPhone 13), Pesa taslimu TZS 500,000" />
                  <div style={{textAlign:'right',fontSize:9.5,color:'var(--td)',marginTop:2}}>73/300</div>
                </div>

                <div style={{fontSize:10,fontWeight:700,color:'var(--tm)',textTransform:'uppercase',letterSpacing:.5,margin:'14px 0 8px'}}>4. VIAMBATISHO</div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
                  {[{ic:'🪟',lbl:'Dirisha lililiovunjwa'},{ic:'🚪',lbl:'Mlango wa mbele'},{ic:'🏚️',lbl:'Ndani ya nyumba'}].map((e,i) => (
                    <div key={i} style={{background:'rgba(0,0,0,.3)',borderRadius:'var(--r8)',aspectRatio:'1',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:4,position:'relative'}}>
                      <div style={{fontSize:24}}>{e.ic}</div>
                      <div style={{position:'absolute',top:4,right:4,width:18,height:18,borderRadius:'50%',background:'rgba(198,40,40,.8)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,cursor:'pointer'}}>✕</div>
                    </div>
                  ))}
                  <div style={{border:'2px dashed var(--b)',borderRadius:'var(--r8)',aspectRatio:'1',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:4,cursor:'pointer'}}>
                    <div style={{fontSize:22}}>📁</div>
                    <div style={{fontSize:9,color:'var(--td)',textAlign:'center',lineHeight:1.3}}>Pakia Faili<br/>JPG, PNG, MP4, PDF<br/>Max 20MB</div>
                  </div>
                </div>
              </div>
            )}

            {formStep > 1 && (
              <div style={{textAlign:'center',padding:'30px 0',color:'var(--tm)'}}>
                <div style={{fontSize:40,marginBottom:10}}>📝</div>
                <div style={{fontSize:12}}>Hatua ya {formStep} – {['','Aina ya Tukio','Maelezo ya Tukio','Wahusika','Mapitio & Kuthibitisha'][formStep]}</div>
              </div>
            )}

            {/* Form nav */}
            <div style={{display:'flex',justifyContent:'space-between',marginTop:14,paddingTop:14,borderTop:'1px solid var(--b)'}}>
              {formStep > 1
                ? <button className="btn btn-o" onClick={()=>setFormStep(s=>s-1)}>← NYUMA</button>
                : <div />
              }
              {formStep < 4
                ? <button className="btn btn-g" onClick={()=>setFormStep(s=>s+1)}>ENDELEA →</button>
                : <button className="btn btn-g" onClick={()=>setShowForm(false)}>✅ WASILISHA RIPOTI</button>
              }
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <div className="card">
        <div style={{padding:'10px 14px',borderBottom:'1px solid var(--b)',display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
          <div className="tabs">
            {TABS.map(t => (
              <button key={t.id} className={`tab ${tab===t.id?'on':''}`} onClick={()=>setTab(t.id)}>
                {t.label}<span style={{marginLeft:3,fontSize:9,opacity:.6}}>({t.count})</span>
              </button>
            ))}
          </div>
          <input className="fi" style={{marginLeft:'auto',width:180,fontSize:11,padding:'6px 10px',borderRadius:20}} placeholder="🔍 Tafuta..." />
        </div>

        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr>
              <th>Namba</th><th>Aina</th><th>Maelezo</th><th>Afisa</th>
              <th>Mahali</th><th>Tarehe</th><th>Kipaumbele</th><th>Hali</th><th></th>
            </tr></thead>
            <tbody>
              {filtered.map(inc => (
                <tr key={inc.id}>
                  <td className="td-id">{inc.id}</td>
                  <td>
                    <span style={{fontSize:10,background:'rgba(255,255,255,.06)',border:'1px solid var(--b)',padding:'2px 7px',borderRadius:6,color:'var(--tm)'}}>
                      {inc.type}
                    </span>
                  </td>
                  <td style={{fontSize:11,maxWidth:200}}>
                    <div style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{inc.description}</div>
                  </td>
                  <td style={{fontSize:11}}>{inc.officer}</td>
                  <td style={{fontSize:10.5}}>📍 {inc.location}</td>
                  <td>
                    <div className="td-mo" style={{fontSize:10.5}}>{inc.date}</div>
                    <div style={{fontSize:9.5,color:'var(--td)'}}>{inc.time}</div>
                  </td>
                  <td>
                    <span className={`pill ${inc.priority==='critical'?'p-critical':inc.priority==='high'?'p-high':'p-pending'}`}>
                      {inc.priority==='critical'?'Muhimu Sana':inc.priority==='high'?'Juu':'Wastani'}
                    </span>
                  </td>
                  <td><Badge status={inc.status} /></td>
                  <td><button className="btn btn-gh btn-sm">Angalia</button></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={9} style={{textAlign:'center',padding:32,color:'var(--tm)'}}>Hakuna matokeo</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="pag">
          <div className="pag-info">Inaonyesha {filtered.length} ya {MOCK_INCIDENTS.length}</div>
          <div className="pag-btns">
            {['‹',1,2,'›'].map((p,i) => <button key={i} className={`pag-btn ${p===1?'on':''}`}>{p}</button>)}
          </div>
        </div>
      </div>
    </div>
  )
}
