import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PoliceBadge from '@components/shared/PoliceBadge'
import Stepper from '@components/ui/Stepper'
import { MOCK_PERSON } from '@utils/mockData'
import { CRIMINAL_CHARGES } from '@utils/constants'

const STEPS = ['Taarifa ya Mtu','Mashtaka (Charges)','Maelezo ya Kukamata','Uthibitisho (Evidence)']

export default function ArrestWizard() {
  const nav = useNavigate()
  const [step, setStep] = useState(1)
  const [charge, setCharge] = useState(null)
  const [rightsRead, setRightsRead] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [saving, setSaving] = useState(false)
  const p = MOCK_PERSON

  const finish = () => {
    setSaving(true)
    setTimeout(() => nav('/enforcement/arrests'), 1800)
  }

  return (
    <div className="afd">
      {/* Banner */}
      <div style={{background:'linear-gradient(135deg,#080C1A,#1E3A6E)',borderRadius:'var(--r16)',padding:'16px 20px',marginBottom:16,display:'flex',gap:14,alignItems:'center'}}>
        <PoliceBadge size={44} />
        <div style={{flex:1}}>
          <div style={{fontSize:9,color:'rgba(255,255,255,.5)',textTransform:'uppercase',letterSpacing:1}}>KUKAMATA (ARREST)</div>
          <div style={{fontSize:16,fontWeight:800,color:'white'}}>Rekodi ya Kukamata Mpya</div>
          <div style={{fontSize:10,color:'rgba(255,255,255,.6)'}}>Jaza hatua zote kwa usahihi</div>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-gh btn-sm">💾 Hifadhi Draft</button>
          <button className="btn btn-gh btn-sm">⋮</button>
        </div>
      </div>

      {/* Stepper */}
      <div style={{background:'var(--g700)',border:'1px solid var(--b)',borderRadius:'var(--r12)',padding:'14px 20px 24px',marginBottom:14}}>
        <Stepper steps={STEPS} current={step} />
      </div>

      <div style={{background:'var(--g700)',border:'1px solid var(--b)',borderRadius:'var(--r12)',overflow:'hidden',marginBottom:14}}>

        {/* STEP 1 – Person Info */}
        {step === 1 && (
          <div>
            <div className="card-h"><div className="card-t">1. TAARIFA YA MTUHUMIWA</div></div>
            <div className="card-bd">
              {/* Person found */}
              <div style={{background:'var(--g750)',border:'1px solid var(--g500)',borderRadius:'var(--r10)',padding:'14px 16px',display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}>
                <div style={{width:60,height:60,borderRadius:'50%',background:'var(--g600)',border:'2px solid var(--gold)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,flexShrink:0}}>👤</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:15,fontWeight:800,color:'var(--tw)',marginBottom:3}}>{p.fullName}</div>
                  <div style={{fontSize:10.5,color:'var(--tm)',marginBottom:6}}>NIDA: {p.nida} · DOB: {p.dob} ({p.age} yrs) · {p.gender}</div>
                  <div className="fg3">
                    {[['Baba',p.father],['Mama',p.mother],['Simu',p.phone],['Anuani',p.address],['Mkoa',p.region],['Uraia',p.nationality]].map(([l,v]) => (
                      <div key={l}><div style={{fontSize:9,color:'var(--td)',textTransform:'uppercase'}}>{l}</div><div style={{fontSize:11,color:'var(--tw)',fontWeight:500,marginTop:1}}>{v}</div></div>
                    ))}
                  </div>
                </div>
                <div style={{textAlign:'center'}}>
                  <div style={{width:60,height:60,background:'white',borderRadius:'var(--r8)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,marginBottom:4}}>⊞</div>
                  <div style={{fontSize:8.5,color:'var(--td)'}}>Scan kwa maelezo zaidi</div>
                  <button className="btn btn-gh btn-sm" style={{marginTop:6,fontSize:10}}>Badilisha</button>
                </div>
              </div>
              <button className="btn btn-o btn-sm" onClick={()=>nav('/management/persons')}>🔍 Tafuta Mtu Mwingine</button>
            </div>
          </div>
        )}

        {/* STEP 2 – Charges */}
        {step === 2 && (
          <div>
            <div className="card-h">
              <div>
                <div className="card-t">2. MASHTAKA (CHARGES)</div>
                <div style={{fontSize:10,color:'var(--tm)',marginTop:2}}>Hakiki taarifa yote kabla ya kuendelea hadi hatua inayofuata</div>
              </div>
              <button className="btn btn-gh btn-sm">✏️ HARIRI</button>
            </div>
            <div className="card-bd">
              {/* Person summary */}
              <div style={{background:'var(--g750)',borderRadius:'var(--r8)',padding:'12px 14px',marginBottom:14,display:'flex',gap:12,alignItems:'center'}}>
                <div style={{width:50,height:50,borderRadius:'50%',background:'var(--g600)',border:'2px solid var(--gold)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>👤</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:700,color:'var(--tw)',marginBottom:2}}>{p.fullName}</div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,fontSize:10.5}}>
                    {[['NIDA / Kitambulisho',p.nida],['Tarehe ya Kuzaliwa',`${p.dob} (${p.age} yrs)`],['Jinsia',p.gender],['Jina la Baba',p.father],['Jina la Mama',p.mother],['Namba ya Simu',p.phone],['Anuani',`${p.address}, Dar es Salaam`]].map(([l,v]) => (
                      <div key={l}><div style={{color:'var(--td)',fontSize:9}}>{l}</div><div style={{color:'var(--tl)',fontWeight:500}}>{v}</div></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Charges table */}
              <div style={{fontSize:10,fontWeight:700,color:'var(--tm)',textTransform:'uppercase',letterSpacing:.5,marginBottom:8}}>📋 MASHTAKA (CHARGES)</div>
              <div style={{overflowX:'auto',marginBottom:14}}>
                <table>
                  <thead><tr><th>#</th><th>Aina ya Shtaka</th><th>Kifungu cha Sheria</th><th>Maelezo ya Shtaka</th><th>Aina</th><th></th></tr></thead>
                  <tbody>
                    {[
                      {n:1,type:'Wizi',code:'Kif. 258(a) CPC',desc:'Wizi wa mali yenye thamani kubwa',kind:'Felony'},
                      {n:2,type:'Kujihusisha na Mali ya Wizi',code:'Kif. 312 CPC',desc:'Kusafirisha laptop ya wizi',kind:'Misdemeanor'},
                    ].map(c => (
                      <tr key={c.n}>
                        <td style={{color:'var(--tm)'}}>{c.n}</td>
                        <td style={{fontWeight:600,color:'var(--tw)'}}>{c.type}</td>
                        <td className="td-id">{c.code}</td>
                        <td style={{fontSize:11}}>{c.desc}</td>
                        <td><span className={`pill ${c.kind==='Felony'?'p-critical':'p-pending'}`}>{c.kind}</span></td>
                        <td><button className="btn btn-gh btn-sm">⚖️</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add charge from list */}
              <div style={{fontSize:10,fontWeight:700,color:'var(--tm)',textTransform:'uppercase',letterSpacing:.5,marginBottom:8}}>+ ONGEZA SHTAKA</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                {CRIMINAL_CHARGES.slice(0,4).map(c => (
                  <div key={c.code} onClick={()=>setCharge(c)}
                    style={{border:`1px solid ${charge?.code===c.code?'var(--gold)':'var(--b)'}`,background:charge?.code===c.code?'rgba(255,193,7,.05)':'transparent',borderRadius:'var(--r8)',padding:'10px 12px',cursor:'pointer',transition:'var(--t)'}}>
                    <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:4}}>
                      <div style={{width:12,height:12,borderRadius:'50%',border:'2px solid',borderColor:charge?.code===c.code?'var(--gold)':'var(--bl)',background:charge?.code===c.code?'var(--gold)':'transparent'}} />
                      <span className="td-id" style={{fontSize:10}}>Kif. {c.code}</span>
                    </div>
                    <div style={{fontSize:11.5,fontWeight:600,color:'var(--tw)',marginBottom:2}}>{c.name}</div>
                    <div style={{fontSize:10,color:'var(--tm)'}}>{c.law}</div>
                    <div style={{marginTop:4}}><span className={`pill ${c.type==='Felony'?'p-critical':'p-pending'}`} style={{fontSize:'8.5px'}}>{c.type}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 – Arrest Details */}
        {step === 3 && (
          <div>
            <div className="card-h"><div className="card-t">3. MAELEZO YA KUKAMATA</div></div>
            <div className="card-bd">
              {/* Section 1 */}
              <div style={{fontSize:10,fontWeight:700,color:'var(--tm)',textTransform:'uppercase',letterSpacing:.5,marginBottom:10}}>1. MAELEZO YA KUKAMATWA</div>
              <div className="fg3">
                <div className="fg"><div className="fl">Tarehe ya Kukamatwa *</div><input className="fi" type="date" defaultValue="2024-05-17" /></div>
                <div className="fg"><div className="fl">Muda *</div><input className="fi" type="time" defaultValue="10:45" /></div>
                <div className="fg"><div className="fl">Mahali pa Kukamatwa *</div><input className="fi" defaultValue="Morogoro Road, Oysterbay" /></div>
                <div className="fg"><div className="fl">Wilaya *</div><select className="fs"><option>Kinondoni</option><option>Ilala</option><option>Temeke</option></select></div>
                <div className="fg"><div className="fl">Region *</div><select className="fs"><option>Dar es Salaam</option></select></div>
                <div className="fg"><div className="fl">Aina ya Operesheni</div><select className="fs"><option>Ufuatiliaji (Surveillance)</option><option>Kawaida</option><option>Maalum</option></select></div>
                <div className="fg"><div className="fl">Jinsi Alivyokamatwa *</div><select className="fs"><option>Kwa mwili</option><option>Gari</option><option>Warrant</option></select></div>
                <div className="fg"><div className="fl">Afisa Kiongozia *</div><input className="fi" defaultValue="Sgt. James Mallya" /></div>
              </div>
              <div className="fg"><div className="fl">Maelezo ya Tukio *</div>
                <textarea className="ft" rows={4} defaultValue="Mtuhumiwa alikamatwa baada ya ufuatiliaji kufuatia taarifa za kiintelensia kuwa alihusika katika wizi wa laptop aina ya Dell katika ofisi ya kampuni ya XYZ. Laptop ilipatikana kwenye begi lake baada ya upekuzi." />
              </div>

              {/* Section 2 – Rights */}
              <div style={{fontSize:10,fontWeight:700,color:'var(--tm)',textTransform:'uppercase',letterSpacing:.5,margin:'16px 0 10px'}}>2. HAKI ZA MTUHUMIWA</div>
              <div style={{background:rightsRead?'rgba(76,175,80,.08)':'rgba(255,193,7,.08)',border:`1px solid ${rightsRead?'rgba(76,175,80,.2)':'rgba(255,193,7,.2)'}`,borderRadius:'var(--r8)',padding:'12px 14px',display:'flex',alignItems:'flex-start',gap:10,marginBottom:12}}>
                <div style={{fontSize:18}}>⚖️</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:11.5,color:'var(--tl)',lineHeight:1.6}}>
                    Nimemsomea mtuhumiwa haki zake kwa mujibu wa Sheria na ameielewa.<br/>
                    Haki ni pamoja na: <strong>Haki ya kunyamaza</strong> · <strong>Haki ya kuwa na wakili</strong> · <strong>Haki ya taarifa kwa familia</strong>
                  </div>
                </div>
                <label style={{display:'flex',alignItems:'center',gap:6,cursor:'pointer',flexShrink:0}}>
                  <input type="checkbox" checked={rightsRead} onChange={e=>setRightsRead(e.target.checked)} style={{width:16,height:16}} />
                  <span style={{fontSize:11,fontWeight:600,color:rightsRead?'#66BB6A':'var(--gold)'}}>Haki Zimesomwa</span>
                </label>
              </div>

              {/* Section 3 – Witnesses */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
                <div style={{fontSize:10,fontWeight:700,color:'var(--tm)',textTransform:'uppercase',letterSpacing:.5}}>3. WASHUHUDA (WITNESSES)</div>
                <button className="btn btn-gh btn-sm">+ Ongeza Shahidi</button>
              </div>
              <div style={{overflowX:'auto',marginBottom:14}}>
                <table>
                  <thead><tr><th>#</th><th>Jina Kamili</th><th>Simu</th><th>Mahali</th><th>Uhusiano</th><th></th></tr></thead>
                  <tbody>
                    {[{n:1,name:'Peter Mwita',phone:'+255 712 345 001',loc:'Morogoro Rd, Oysterbay',rel:'Raia'},{n:2,name:'Asha Salum',phone:'+255 713 678 900',loc:'Morogoro Rd, Oysterbay',rel:'Raia'}].map(w => (
                      <tr key={w.n}><td>{w.n}</td><td className="td-nm">{w.name}</td><td className="td-mo">{w.phone}</td><td style={{fontSize:11}}>{w.loc}</td><td>{w.rel}</td><td><button className="btn btn-gh btn-sm">🗑️</button></td></tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Section 4 – Officers */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
                <div style={{fontSize:10,fontWeight:700,color:'var(--tm)',textTransform:'uppercase',letterSpacing:.5}}>4. AFISA WALIOSHIRIKI</div>
                <button className="btn btn-gh btn-sm">+ Ongeza Afisa</button>
              </div>
              <div style={{overflowX:'auto'}}>
                <table>
                  <thead><tr><th>#</th><th>Jina Kamili</th><th>Cheo</th><th>Namba ya Utambulisho</th><th>Jukumu</th><th></th></tr></thead>
                  <tbody>
                    {[{n:1,name:'Sgt. James Mallya',rank:'Sergeant',id:'TP12345',role:'Kiongozi'},{n:2,name:'Cpl. Hassan Juma',rank:'Corporal',id:'TP54321',role:'Msaidizi'}].map(o => (
                      <tr key={o.n}><td>{o.n}</td><td className="td-nm">{o.name}</td><td>{o.rank}</td><td className="td-id">{o.id}</td><td>{o.role}</td><td><button className="btn btn-gh btn-sm">🗑️</button></td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 – Evidence */}
        {step === 4 && (
          <div>
            <div className="card-h"><div className="card-t">4. UTHIBITISHO (EVIDENCE)</div></div>
            <div className="card-bd">
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
                <div style={{fontSize:11,color:'var(--tm)'}}>Pakia picha, video, sauti au nyaraka zinazounga mkono kesi hii.</div>
                <button className="btn btn-gh btn-sm">+ Ongeza Faili</button>
              </div>
              {/* Evidence grid */}
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:14}}>
                {[{name:'Laptop Dell.jpg',type:'📸 Picha',size:'2.4 MB'},{name:'Begii.jpg',type:'📸 Picha',size:'1.8 MB'},{name:'Pesa Taslimu.jpg',type:'📸 Picha',size:'1.2 MB'},{name:'Taarifa Mashahidi.pdf',type:'📄 PDF',size:'0.9 MB'},{name:'Mahojiano_01.m4a',type:'🎙️ Sauti',size:'3.6 MB'},{name:'CCTV_01.mp4',type:'🎬 Video',size:'12.4 MB'}].map((e,i) => (
                  <div key={i} style={{background:'var(--g750)',border:'1px solid var(--b)',borderRadius:'var(--r8)',overflow:'hidden'}}>
                    <div style={{height:60,background:'rgba(0,0,0,.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,position:'relative'}}>
                      {e.type.split(' ')[0]}
                      <div style={{position:'absolute',top:4,left:4,fontSize:8.5,background:'rgba(0,0,0,.6)',padding:'1px 5px',borderRadius:3,color:'var(--tl)'}}>{e.type}</div>
                    </div>
                    <div style={{padding:'6px 8px'}}>
                      <div style={{fontSize:10,fontWeight:600,color:'var(--tl)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{e.name}</div>
                      <div style={{fontSize:9,color:'var(--td)',marginTop:1}}>{e.size}</div>
                    </div>
                  </div>
                ))}
                <div style={{border:'2px dashed var(--b)',borderRadius:'var(--r8)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:4,cursor:'pointer',padding:'16px 8px',minHeight:100}}>
                  <div style={{fontSize:24}}>📁</div>
                  <div style={{fontSize:9.5,color:'var(--tm)',textAlign:'center',lineHeight:1.3}}>Pakua Faili<br/>Picha, Video, Sauti, PDF</div>
                </div>
              </div>

              {/* Evidence summary */}
              <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:8,marginBottom:14}}>
                {[['📸','Picha','3 Faili'],['📄','Nyaraka (PDF)','1 Faili'],['🎙️','Sauti','1 Faili'],['🎬','Video','1 Faili'],['📎','Jumla','6 Faili']].map(([ic,l,v]) => (
                  <div key={l} style={{background:'rgba(0,0,0,.2)',borderRadius:'var(--r8)',padding:'8px',textAlign:'center'}}>
                    <div style={{fontSize:16}}>{ic}</div>
                    <div style={{fontSize:10,fontFamily:'var(--fm)',fontWeight:700,color:'var(--tw)',marginTop:2}}>{v.split(' ')[0]}</div>
                    <div style={{fontSize:9,color:'var(--tm)'}}>{l}</div>
                  </div>
                ))}
              </div>

              <div className="fg"><div className="fl">Maelezo ya Ziada (Hiari)</div>
                <textarea className="ft" rows={3} defaultValue="Uthibitisho huu ulipatikana wakati wa operesheni ya kukamata mtuhumiwa nyumbani kwake. Picha za vifaa, pesa na nyaraka vilipatikana chumbani kwake. Mahojiano ya awali na mashahidi yameambatishwa." />
              </div>

              <label style={{display:'flex',alignItems:'center',gap:8,marginTop:8,cursor:'pointer'}}>
                <input type="checkbox" checked={confirmed} onChange={e=>setConfirmed(e.target.checked)} style={{width:16,height:16}} />
                <span style={{fontSize:12,color:'var(--tl)'}}>🛡️ Ninathibitisha kuwa taarifa zote nilizotoa ni za kweli na sahihi kadri ya ujuzi na ukweli wangu.</span>
              </label>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{padding:'14px 16px',borderTop:'1px solid var(--b)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          {step > 1
            ? <button className="btn btn-o" onClick={()=>setStep(s=>s-1)}>← NYUMA</button>
            : <button className="btn btn-o" onClick={()=>nav('/enforcement/arrests')}>✕ Ghairi</button>
          }
          {step === 3 && <button className="btn btn-gh" style={{color:'var(--oraL)',borderColor:'var(--oraL)'}}>📊 ESCALATE</button>}
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:1}}>
            <div style={{fontSize:9,color:'var(--td)'}}>Hatua ya {step} ya {STEPS.length}</div>
            <div style={{fontSize:10,color:'var(--tm)',fontWeight:500}}>{STEPS[step-1]}</div>
          </div>
          {step < STEPS.length
            ? <button className="btn btn-g" onClick={()=>setStep(s=>s+1)}>ENDELEA →</button>
            : <button className="btn btn-g" disabled={!confirmed||saving} onClick={finish}>
                {saving?'⏳ Inahifadhi...':'✅ HIFADHI & KAMILISHA'}
              </button>
          }
        </div>
      </div>
    </div>
  )
}
