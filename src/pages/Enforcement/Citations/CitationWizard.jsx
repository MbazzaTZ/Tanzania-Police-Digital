import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PoliceBadge from '@components/shared/PoliceBadge'
import Stepper from '@components/ui/Stepper'
import { MOCK_PERSON } from '@utils/mockData'
import { TRAFFIC_OFFENCES } from '@utils/constants'

const STEPS = ['Taarifa za Mtu / Gari', 'Makosa', 'Maelezo ya Citation', 'Kagua na Thibitisha']

export default function CitationWizard() {
  const nav = useNavigate()
  const [step, setStep]       = useState(1)
  const [offence, setOffence] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [saving, setSaving]   = useState(false)
  const p = MOCK_PERSON

  const finish = () => {
    if (!confirmed) return
    setSaving(true)
    setTimeout(() => nav('/enforcement/citations'), 1600)
  }

  return (
    <div className="afd">
      {/* Banner */}
      <div style={{background:'linear-gradient(135deg,#071209,#1B5E20)',borderRadius:'var(--r16)',padding:'14px 20px',marginBottom:14,display:'flex',gap:14,alignItems:'center'}}>
        <PoliceBadge size={42} />
        <div style={{flex:1}}>
          <div style={{fontSize:9,color:'rgba(255,255,255,.45)',textTransform:'uppercase',letterSpacing:1}}>TOA CITATION (LESENI)</div>
          <div style={{fontSize:15,fontWeight:800,color:'white'}}>Citation Mpya</div>
          <div style={{fontSize:10,color:'rgba(255,255,255,.55)'}}>Hatua ya {step} ya {STEPS.length}: {STEPS[step-1]}</div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:3,alignItems:'flex-end',flexShrink:0}}>
          <div style={{fontSize:10,color:'rgba(255,255,255,.5)'}}>📅 17 Mei 2024</div>
          <div style={{fontSize:10,color:'rgba(255,255,255,.5)'}}>🕐 10:45 AM</div>
        </div>
        <div style={{display:'flex',gap:6}}>
          <button className="btn btn-gh btn-sm">💾 Hifadhi Draft</button>
          <button className="btn btn-gh btn-sm" onClick={()=>nav('/enforcement/citations')}>✕</button>
        </div>
      </div>

      {/* Stepper */}
      <div style={{background:'var(--g700)',border:'1px solid var(--b)',borderRadius:'var(--r12)',padding:'12px 20px 22px',marginBottom:12}}>
        <Stepper steps={STEPS} current={step} />
      </div>

      {/* Form card */}
      <div style={{background:'var(--g700)',border:'1px solid var(--b)',borderRadius:'var(--r12)',overflow:'hidden',marginBottom:12}}>

        {/* ── STEP 1: Person / Vehicle ── */}
        {step === 1 && (
          <div>
            <div className="card-h"><div className="card-t">1. MAELEZO YA MTU / CHOMBO</div></div>
            <div className="card-bd">
              {/* Person found card */}
              <div style={{background:'var(--g750)',border:'1px solid var(--g500)',borderRadius:'var(--r10)',padding:'12px 14px',marginBottom:14}}>
                <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:10}}>
                  <div style={{width:52,height:52,borderRadius:'50%',background:'var(--g600)',border:'2px solid var(--gold)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>👤</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14,fontWeight:700,color:'var(--tw)',marginBottom:2}}>{p.fullName}</div>
                    <div style={{fontSize:10.5,color:'var(--tm)',marginBottom:2}}>NIDA: {p.nida} · {p.dob} ({p.age} yrs) · {p.gender}</div>
                    <div style={{fontSize:10.5,color:'var(--tm)'}}>{p.phone} · {p.address}, {p.district}</div>
                  </div>
                  <span className="pill p-active">Hakuna Tahadhari</span>
                  <button className="btn btn-gh btn-sm" onClick={()=>nav('/management/persons')}>👤 View Profile</button>
                </div>
                {/* Toggle */}
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                  <button className="btn btn-p btn-sm" style={{justifyContent:'flex-start',gap:8}}>👤 Mtu binafsi</button>
                  <button className="btn btn-gh btn-sm" style={{justifyContent:'flex-start',gap:8}}>🚗 Gari / Chombo</button>
                </div>
              </div>

              {/* Offence details */}
              <div style={{fontSize:10,fontWeight:700,color:'var(--tm)',textTransform:'uppercase',letterSpacing:.5,marginBottom:10}}>2. MAELEZO YA UKIUKAJI</div>
              <div className="fg2">
                <div className="fg"><div className="fl">Aina ya Ukiukaji *</div>
                  <select className="fs"><option>Kasi Kupita Kiasi</option><option>Leseni</option><option>Bima</option><option>Taa</option></select></div>
                <div className="fg"><div className="fl">Kifungu cha Sheria *</div>
                  <select className="fs"><option>Kif. 107 (1) (a) – Road Traffic Act</option>{TRAFFIC_OFFENCES.map(o=><option key={o.code}>Kif. {o.code} – {o.name}</option>)}</select></div>
                <div className="fg"><div className="fl">Mahali *</div>
                  <input className="fi" defaultValue="Morogoro Road, Oysterbay" /></div>
                <div className="fg"><div className="fl">Tarehe / Saa *</div>
                  <input className="fi" type="datetime-local" defaultValue="2024-05-17T10:45" /></div>
              </div>
              <div className="fg"><div className="fl">Maelezo ya Ukiukaji *</div>
                <textarea className="ft" rows={3} defaultValue="Dereva alikiuka kikomo cha mwendo kilichowekwa na kuendesha kwa kasi ya zaidi ya 80 km/h katika eneo la 50 km/h." />
                <div style={{textAlign:'right',fontSize:9.5,color:'var(--td)',marginTop:3}}>113/250</div>
              </div>

              {/* Evidence */}
              <div style={{fontSize:10,fontWeight:700,color:'var(--tm)',textTransform:'uppercase',letterSpacing:.5,margin:'12px 0 8px'}}>3. USHAHIDI (HIARI)</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
                {[{src:'🚦',lbl:'Alama ya 50'},{src:'🚗',lbl:'Gari T123 DFG'},{src:'🛣️',lbl:'Barabara'}].map((e,i) => (
                  <div key={i} style={{background:'rgba(0,0,0,.3)',borderRadius:'var(--r8)',aspectRatio:'4/3',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:4,position:'relative'}}>
                    <div style={{fontSize:28}}>{e.src}</div>
                    <div style={{fontSize:9,color:'var(--td)'}}>{e.lbl}</div>
                    <div style={{position:'absolute',top:4,right:4,width:18,height:18,borderRadius:'50%',background:'rgba(198,40,40,.8)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,cursor:'pointer'}}>✕</div>
                  </div>
                ))}
                <div style={{border:'2px dashed var(--b)',borderRadius:'var(--r8)',aspectRatio:'4/3',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:4,cursor:'pointer'}}>
                  <div style={{fontSize:22}}>📷</div>
                  <div style={{fontSize:9,color:'var(--td)',textAlign:'center',lineHeight:1.3}}>Piga Picha<br/>Au Chagua</div>
                </div>
              </div>

              {/* Extra notes */}
              <div className="fg" style={{marginTop:12}}>
                <div className="fl">4. MAELEZO YA ZIADA (HIARI)</div>
                <textarea className="ft" rows={2} placeholder="Andika maelezo yoyote ya ziada..." />
                <div style={{textAlign:'right',fontSize:9.5,color:'var(--td)',marginTop:2}}>0/250</div>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: Offence Selection ── */}
        {step === 2 && (
          <div>
            <div className="card-h"><div className="card-t">2. CHAGUA MAKOSA</div></div>
            <div className="card-bd">
              <div style={{display:'flex',gap:8,marginBottom:12}}>
                <input className="fi" style={{flex:1}} placeholder="🔍 Tafuta makosa kwa namba au jina..." />
                <button className="btn btn-gh btn-sm">⚙️ Filter</button>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:14}}>
                {TRAFFIC_OFFENCES.map(o => {
                  const sel = offence?.code === o.code
                  return (
                    <div key={o.code} onClick={()=>setOffence(o)} style={{border:`1px solid ${sel?'var(--gold)':'var(--b)'}`,background:sel?'rgba(255,193,7,.06)':'transparent',borderRadius:'var(--r8)',padding:'10px 12px',cursor:'pointer',transition:'var(--t)'}}>
                      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:5}}>
                        <div style={{width:14,height:14,borderRadius:'50%',border:`2px solid ${sel?'var(--gold)':'var(--bl)'}`,background:sel?'var(--gold)':'transparent',transition:'var(--t)',flexShrink:0}} />
                        <span className="td-id" style={{fontSize:10}}>Kif. {o.code}</span>
                      </div>
                      <div style={{fontSize:12,fontWeight:600,color:'var(--tw)',marginBottom:2}}>{o.name}</div>
                      <div style={{fontSize:10,color:'var(--tm)'}}>{o.law}</div>
                      <div style={{fontSize:11,color:'#66BB6A',fontWeight:600,marginTop:3}}>Faini: TZS {o.fine.toLocaleString()}</div>
                    </div>
                  )
                })}
              </div>

              {/* Offence details */}
              <div style={{fontSize:10,fontWeight:700,color:'var(--tm)',textTransform:'uppercase',letterSpacing:.5,marginBottom:10}}>2. MAELEZO YA MAKOSA</div>
              <div className="fg2">
                <div className="fg"><div className="fl">Mahali lilipotendeka *</div><input className="fi" defaultValue="Morogoro Road, Oysterbay" /></div>
                <div className="fg2">
                  <div className="fg"><div className="fl">Tarehe *</div><input className="fi" type="date" defaultValue="2024-05-17" /></div>
                  <div className="fg"><div className="fl">Saa *</div><input className="fi" type="time" defaultValue="10:45" /></div>
                </div>
              </div>
              <div className="fg"><div className="fl">Maelezo ya ziada (hiari)</div>
                <textarea className="ft" rows={2} defaultValue="Dereva alikamatwa baada ya ukaguzi wa kawaida. Hakuwa na leseni ya udereva." />
                <div style={{textAlign:'right',fontSize:9.5,color:'var(--td)',marginTop:2}}>89/250</div>
              </div>

              {/* Law & Penalty box */}
              {offence && (
                <div style={{background:'rgba(27,94,32,.1)',border:'1px solid rgba(27,94,32,.25)',borderRadius:'var(--r8)',padding:'12px 14px',marginTop:4}}>
                  <div style={{display:'grid',gridTemplateColumns:'1fr auto auto',gap:12,alignItems:'center'}}>
                    <div><div style={{fontSize:9.5,color:'var(--tm)'}}>Sheria</div><div style={{fontSize:11.5,fontWeight:600,color:'var(--tw)',marginTop:1}}>{offence.law}</div></div>
                    <div style={{textAlign:'center'}}><div style={{fontSize:9.5,color:'var(--tm)'}}>Kifungu</div><div className="td-id" style={{marginTop:1}}>{offence.code}</div></div>
                    <div style={{textAlign:'center'}}><div style={{fontSize:9.5,color:'var(--tm)'}}>Adhabu</div><div style={{fontSize:12,fontWeight:700,color:'#66BB6A',marginTop:1}}>Faini: TZS {offence.fine.toLocaleString()}</div></div>
                  </div>
                  <div style={{fontSize:10,color:'var(--tm)',marginTop:8,borderTop:'1px solid rgba(255,255,255,.06)',paddingTop:8}}>{offence.name}.</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── STEP 3: Citation Details ── */}
        {step === 3 && (
          <div>
            <div className="card-h">
              <div>
                <div className="card-t">3. MAELEZO YA CITATION</div>
                <div style={{fontSize:10,color:'var(--tm)',marginTop:1}}>Taarifa za mtu / gari</div>
              </div>
              <button className="btn btn-gh btn-sm">✏️ Badilisha</button>
            </div>
            <div className="card-bd">
              {/* Person summary */}
              <div style={{background:'var(--g750)',border:'1px solid var(--b)',borderRadius:'var(--r10)',padding:'12px 14px',marginBottom:14}}>
                <div style={{fontSize:10,fontWeight:700,color:'var(--tm)',textTransform:'uppercase',letterSpacing:.5,marginBottom:8}}>👤 TAARIFA ZA MTU (SUSPECT)</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,fontSize:11}}>
                  {[['Jina Kamili',p.fullName],['Tarehe ya Kuzaliwa',`${p.dob} (${p.age} yrs)`],['NIDA',p.nida],['Uraia',p.nationality],['Simu',p.phone],['Anwani',p.address]].map(([l,v]) => (
                    <div key={l}><div style={{fontSize:9,color:'var(--td)',textTransform:'uppercase',marginBottom:1}}>{l}</div><div style={{color:'var(--tl)',fontWeight:500}}>{v}</div></div>
                  ))}
                </div>
              </div>

              {/* Vehicle info */}
              <div style={{fontSize:10,fontWeight:700,color:'var(--tm)',textTransform:'uppercase',letterSpacing:.5,marginBottom:10}}>🚗 TAARIFA ZA GARI</div>
              <div className="fg2">
                <div className="fg"><div className="fl">Namba ya Gari *</div>
                  <div style={{position:'relative'}}>
                    <span style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)',fontSize:13}}>🇹🇿</span>
                    <input className="fi" style={{paddingLeft:30}} defaultValue="T123 DFG" />
                    <span style={{position:'absolute',right:10,top:'50%',transform:'translateY(-50%)',fontSize:13,cursor:'pointer',color:'var(--tm)'}}>✕</span>
                  </div>
                </div>
                <div className="fg"><div className="fl">Aina ya Gari *</div><select className="fs"><option>Toyota Noah</option><option>Toyota Corolla</option><option>Toyota Land Cruiser</option></select></div>
                <div className="fg"><div className="fl">Rangi *</div><select className="fs"><option>Silver</option><option>Nyeupe</option><option>Nyekundu</option></select></div>
                <div className="fg"><div className="fl">Namba ya Chasi (VIN)</div>
                  <div style={{position:'relative'}}><input className="fi" defaultValue="ZRR80-0123456" /><span style={{position:'absolute',right:10,top:'50%',transform:'translateY(-50%)',cursor:'pointer',color:'var(--tm)'}}>✕</span></div>
                </div>
              </div>
              <div className="ibox" style={{marginBottom:12,fontSize:10.5}}>ℹ️ Gari limepatikana kupitia usajili wa namba ya gari (TAZARA). <span style={{color:'var(--gold)',cursor:'pointer'}}>View Details ›</span></div>

              {/* License */}
              <div style={{fontSize:10,fontWeight:700,color:'var(--tm)',textTransform:'uppercase',letterSpacing:.5,marginBottom:10}}>📋 LESENI YA UDEREVA</div>
              <div className="fg3">
                <div className="fg"><div className="fl">Namba ya Leseni *</div>
                  <div style={{position:'relative'}}><input className="fi" defaultValue="DL123456789TZ" /><span style={{position:'absolute',right:10,top:'50%',transform:'translateY(-50%)',cursor:'pointer',color:'var(--tm)'}}>✕</span></div>
                </div>
                <div className="fg"><div className="fl">Daraja la Leseni *</div><select className="fs"><option>D</option><option>B</option><option>C</option></select></div>
                <div className="fg"><div className="fl">Tarehe ya Kumalizika *</div><input className="fi" type="date" defaultValue="2026-08-20" /></div>
              </div>
              <div style={{display:'inline-flex',alignItems:'center',gap:5}}><div style={{fontSize:9,color:'var(--tm)'}}>Hali ya Leseni</div><span className="pill p-active" style={{fontSize:'8.5px'}}>Halali ✓</span></div>
            </div>
          </div>
        )}

        {/* ── STEP 4: Review & Confirm ── */}
        {step === 4 && (
          <div>
            <div className="card-h"><div className="card-t">4. KAGUA NA THIBITISHA</div></div>
            <div className="card-bd">
              {/* Summary boxes */}
              {[
                {title:'1. TAARIFA ZA MTU / GARI', rows:[['Jina Kamili',p.fullName],['NIDA',p.nida],['Gari','T123 DFG – Toyota Noah (Silver)'],['Leseni','DL123456789TZ – Daraja D']]},
                {title:'2. MAKOSA', rows:[['Sheria / Kifungu',offence?`${offence.law} – Kif. ${offence.code}`:'Traffic Offences Act – Kif. 107(1)(a)'],['Makosa',offence?.name||'Kasi Kupita Kiasi'],['Faini',`TZS ${(offence?.fine||50000).toLocaleString()}`],['Mahali','Morogoro Road, Oysterbay']]},
                {title:'3. MAELEZO YA CITATION', rows:[['Namba','CIT-2024-00029'],['Tarehe na Saa','17/05/2024, 10:45 AM'],['Afisa','Insp. Juma M. Khamis – Badge: 123456'],['Kituo','Oysterbay Police Station']]},
              ].map(sec => (
                <div key={sec.title} style={{background:'rgba(0,0,0,.2)',borderRadius:'var(--r8)',padding:'12px 14px',marginBottom:10}}>
                  <div style={{fontSize:10,fontWeight:700,color:'var(--gold)',textTransform:'uppercase',letterSpacing:.5,marginBottom:8}}>{sec.title}</div>
                  {sec.rows.map(([l,v]) => (
                    <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'4px 0',fontSize:11.5,borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                      <span style={{color:'var(--tm)'}}>{l}</span>
                      <span style={{fontWeight:500}}>{v}</span>
                    </div>
                  ))}
                </div>
              ))}

              {/* Warning */}
              <div className="wbox" style={{marginBottom:12,fontSize:11}}>
                ⚠️ Kwa kuthibitisha, unathibitisha taarifa zote ni sahihi. Rekodi hii itahifadhiwa na haiwezi kubadilishwa.
              </div>

              {/* Confirm checkbox */}
              <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer'}}>
                <input type="checkbox" checked={confirmed} onChange={e=>setConfirmed(e.target.checked)} style={{width:16,height:16}} />
                <span style={{fontSize:12,color:'var(--tl)'}}>🛡️ Ninathibitisha kwamba taarifa zote zilizo hapo juu ni sahihi na za kweli.</span>
              </label>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{padding:'12px 16px',borderTop:'1px solid var(--b)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          {step > 1
            ? <button className="btn btn-o" onClick={()=>setStep(s=>s-1)}>← NYUMA</button>
            : <button className="btn btn-o" onClick={()=>nav('/enforcement/citations')}>✕ GHAIRI</button>
          }
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:9,color:'var(--td)'}}>Hatua ya {step} ya {STEPS.length}</div>
            <div style={{fontSize:10,color:'var(--tm)',fontWeight:500}}>{STEPS[step-1]}</div>
          </div>
          {step < STEPS.length
            ? <button className="btn btn-g" onClick={()=>setStep(s=>s+1)}>INAYOFUATA →</button>
            : <button className="btn btn-g" disabled={!confirmed||saving} onClick={finish}>
                {saving ? '⏳ Inahifadhi...' : '✅ THIBITISHA NA HIFADHI'}
              </button>
          }
        </div>
      </div>
    </div>
  )
}
