import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '@components/ui/Breadcrumb'
import Stepper    from '@components/ui/Stepper'
import Button     from '@components/ui/Button'
import { MOCK_PERSON } from '@utils/mockData'
import { TRAFFIC_OFFENCES } from '@utils/constants'

const STEPS = ['Taarifa za Mtu / Gari','Makosa','Maelezo ya Citation','Kagua na Thibitisha']

export default function CitationWizard() {
  const navigate = useNavigate()
  const [step, setStep]       = useState(1)
  const [offence, setOffence] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [saving, setSaving]   = useState(false)
  const p = MOCK_PERSON

  const handleFinish = () => {
    if (!confirmed) return alert('Tafadhali thibisha kwamba taarifa zote ni sahihi')
    setSaving(true)
    setTimeout(() => navigate('/enforcement/citations'), 1800)
  }

  return (
    <div className="animate-fade-in">
      <Breadcrumb items={[{label:'🏠',href:'/'},{label:'Citations',href:'/enforcement/citations'},{label:'Toa Citation Mpya'}]} />
      <div className="page-header">
        <div><h1>📋 Toa Citation Mpya</h1><p>Jaza hatua zote kwa usahihi kabla ya kuthibitisha</p></div>
        <Button variant="outline" onClick={() => navigate('/enforcement/citations')}>✕ Ghairi</Button>
      </div>

      <div style={{ maxWidth:860, margin:'0 auto 24px' }}>
        <Stepper steps={STEPS} current={step} />
      </div>

      <div style={{ maxWidth:860, margin:'0 auto', background:'var(--green-700)', border:'1px solid var(--border)', borderRadius:'var(--r-lg)' }}>

        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <div className="card-header"><div className="card-title">1. Taarifa za Mtu / Gari</div></div>
            <div className="card-body">
              <div style={{ fontSize:11, fontWeight:700, color:'var(--gold)', textTransform:'uppercase', letterSpacing:1, marginBottom:12, paddingBottom:8, borderBottom:'1px solid var(--border)' }}>🔍 Tafuta Mtuhumiwa</div>
              <div style={{ display:'flex', gap:8, marginBottom:12 }}>
                <select className="form-select" style={{ width:140 }}><option>NIDA</option><option>Jina</option><option>Simu</option></select>
                <input className="form-input" defaultValue="1234567890123" style={{ flex:1 }} placeholder="Weka namba ya utambulisho..." />
                <Button variant="primary">🔍 Tafuta</Button>
              </div>
              {/* Person found */}
              <div style={{ background:'var(--green-900)', border:'1px solid var(--green-500)', borderRadius:'var(--r)', padding:'12px 14px', display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
                <div style={{ width:48, height:48, borderRadius:'50%', background:'var(--green-600)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>👤</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:700, color:'#fff' }}>{p.fullName}</div>
                  <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:2 }}>NIDA: {p.nida} · DOB: {p.dob} ({p.age} yrs) · {p.gender}</div>
                  <div style={{ fontSize:11, color:'var(--text-muted)' }}>{p.phone} · {p.address}, {p.district}</div>
                </div>
                <span className="status s-active">Hakuna Tahadhari</span>
              </div>
              <div className="form-grid-2" style={{ marginBottom:16 }}>
                <div className="form-group"><label className="form-label">Leseni ya Udereva *</label><input className="form-input" defaultValue="DL12345678TZ" /></div>
                <div className="form-group"><label className="form-label">Daraja la Leseni *</label><select className="form-select"><option>B, C</option><option>A</option><option>D</option></select></div>
                <div className="form-group"><label className="form-label">Tarehe ya Kumalizika *</label><input className="form-input" type="date" defaultValue="2026-08-20" /></div>
                <div className="form-group"><label className="form-label">Hali ya Leseni</label><input className="form-input" readOnly value="Halali ✓" style={{ color:'#66BB6A' }} /></div>
              </div>
              <div style={{ fontSize:11, fontWeight:700, color:'var(--gold)', textTransform:'uppercase', letterSpacing:1, marginBottom:12, paddingBottom:8, borderBottom:'1px solid var(--border)' }}>🚗 Taarifa za Gari</div>
              <div className="form-grid-2">
                <div className="form-group"><label className="form-label">Namba ya Gari *</label><input className="form-input" defaultValue="T123 DFG" /></div>
                <div className="form-group"><label className="form-label">Aina ya Gari</label><input className="form-input" readOnly value="Toyota Noah – Silver" /></div>
                <div className="form-group"><label className="form-label">Namba ya Chasi (VIN)</label><input className="form-input" readOnly value="ZRR80-0123456" /></div>
                <div className="form-group"><label className="form-label">Hali ya Bima</label><input className="form-input" readOnly value="Halali hadi 30/11/2024 ✓" style={{ color:'#66BB6A' }} /></div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <div className="card-header"><div className="card-title">2. Chagua Makosa / Select Offence</div></div>
            <div className="card-body">
              <div style={{ marginBottom:12 }}>
                <input className="form-input" placeholder="🔍 Tafuta makosa kwa namba au jina..." />
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:16 }}>
                {TRAFFIC_OFFENCES.map(o => (
                  <div key={o.code} onClick={() => setOffence(o)}
                    style={{ border:`1px solid ${offence?.code === o.code ? 'var(--gold)' : 'var(--border)'}`, background: offence?.code === o.code ? 'rgba(255,193,7,.06)' : 'transparent', borderRadius:'var(--r)', padding:'10px 12px', cursor:'pointer', transition:'all .15s' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                      <div style={{ width:14, height:14, borderRadius:'50%', border:'2px solid', borderColor: offence?.code === o.code ? 'var(--gold)' : 'var(--border)', background: offence?.code === o.code ? 'var(--gold)' : 'transparent', flexShrink:0, transition:'all .15s' }} />
                      <div style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--gold)' }}>Kif. {o.code}</div>
                    </div>
                    <div style={{ fontSize:12, fontWeight:600, color:'var(--text-white)', marginBottom:2 }}>{o.name}</div>
                    <div style={{ fontSize:10, color:'var(--text-muted)' }}>{o.law}</div>
                    <div style={{ fontSize:10, color:'#66BB6A', fontWeight:600, marginTop:2 }}>Faini: TZS {o.fine.toLocaleString()}</div>
                  </div>
                ))}
              </div>
              <div className="form-grid-2">
                <div className="form-group"><label className="form-label">Mahali lilipotokea *</label><input className="form-input" defaultValue="Morogoro Road, Oysterbay, Dar es Salaam" /></div>
                <div className="form-group"><label className="form-label">Tarehe *</label><input className="form-input" type="date" defaultValue="2024-05-17" /></div>
              </div>
              <div className="form-group"><label className="form-label">Maelezo ya Ziada (Hiari)</label>
                <textarea className="form-textarea" defaultValue="Dereva alikamatwa baada ya ukaguzi wa kawaida. Hakuna leseni ya udereva." /></div>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div>
            <div className="card-header"><div className="card-title">3. Maelezo ya Citation na Nyaraka</div></div>
            <div className="card-body">
              <div className="form-grid-2" style={{ marginBottom:16 }}>
                <div className="form-group"><label className="form-label">Namba ya Citation</label><input className="form-input" readOnly value="CIT-2024-00029" style={{ color:'var(--gold)', fontFamily:'var(--font-mono)' }} /></div>
                <div className="form-group"><label className="form-label">Faini (TZS)</label><input className="form-input" readOnly value={offence ? offence.fine.toLocaleString() : '50,000'} style={{ color:'#66BB6A', fontFamily:'var(--font-mono)', fontWeight:700 }} /></div>
                <div className="form-group"><label className="form-label">Mahali pa Kutolewa *</label><input className="form-input" defaultValue="Morogoro Road, Oysterbay" /></div>
                <div className="form-group"><label className="form-label">Tarehe na Saa</label><input className="form-input" readOnly value="17/05/2024, 10:45 AM" /></div>
              </div>
              <div style={{ fontSize:11, fontWeight:700, color:'var(--gold)', textTransform:'uppercase', marginBottom:8 }}>📷 Picha na Ushahidi</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:16 }}>
                {['🚗','📋'].map((e,i) => (
                  <div key={i} style={{ background:'var(--green-900)', borderRadius:'var(--r)', aspectRatio:1, display:'flex', alignItems:'center', justifyContent:'center', fontSize:28 }}>{e}</div>
                ))}
                {['📷','🎥'].map((e,i) => (
                  <div key={i} style={{ border:'2px dashed var(--border)', borderRadius:'var(--r)', aspectRatio:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4, cursor:'pointer' }}>
                    <div style={{ fontSize:24 }}>{e}</div>
                    <div style={{ fontSize:10, color:'var(--text-muted)' }}>Ongeza</div>
                  </div>
                ))}
              </div>
              <div className="form-group"><label className="form-label">Saini ya Afisa *</label>
                <div style={{ background:'var(--green-900)', border:'1px solid var(--border)', borderRadius:'var(--r)', height:80, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-muted)', fontSize:12, cursor:'pointer' }}>
                  ✍️ Bonyeza hapa kuandika saini yako ya kidijitali
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div>
            <div className="card-header"><div className="card-title">4. Kagua na Thibitisha</div></div>
            <div className="card-body">
              {[
                { title:'1. TAARIFA ZA MTU / GARI', rows:[['Jina Kamili',p.fullName],['NIDA',p.nida],['Leseni','DL12345678TZ – Daraja B,C'],['Gari','T123 DFG – Toyota Noah (Silver)']] },
                { title:'2. MAKOSA', rows:[['Sheria / Kifungu',offence ? `${offence.law} – Kif. ${offence.code}` : 'Traffic Offences Act, Cap. 168 – Kif. 129(1)'],['Makosa',offence?.name || 'Kuendesha bila leseni'],['Faini',`TZS ${(offence?.fine || 50000).toLocaleString()}`],['Mahali','Morogoro Road, Oysterbay']] },
                { title:'3. MAELEZO YA CITATION', rows:[['Namba','CIT-2024-00029'],['Tarehe na Saa','17/05/2024, 10:45 AM'],['Afisa','Insp. Juma M. Khamis – Badge: 123456'],['Kituo','Oysterbay Police Station']] },
              ].map(section => (
                <div key={section.title} style={{ background:'var(--green-900)', borderRadius:'var(--r)', padding:'12px 14px', marginBottom:12 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:'var(--gold)', marginBottom:8 }}>{section.title}</div>
                  {section.rows.map(([label, val]) => (
                    <div key={label} style={{ display:'flex', justifyContent:'space-between', padding:'4px 0', fontSize:12, borderBottom:'1px solid rgba(255,255,255,.04)' }}>
                      <span style={{ color:'var(--text-muted)' }}>{label}</span>
                      <span style={{ color:'var(--text-white)', fontWeight:500 }}>{val}</span>
                    </div>
                  ))}
                </div>
              ))}
              <div style={{ background:'rgba(198,40,40,.1)', border:'1px solid rgba(198,40,40,.3)', borderRadius:'var(--r)', padding:'10px 14px', fontSize:'11.5px', color:'#EF9A9A', marginBottom:16 }}>
                ⚠️ Kwa kuthibitisha, unathibitisha taarifa zote ni sahihi. Rekodi hii itahifadhiwa kwenye mfumo na haiwezi kubadilishwa baada ya kuhifadhiwa.
              </div>
              <label style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, cursor:'pointer' }}>
                <input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} />
                <span>Ninathibitisha kwamba taarifa zote zilizo hapo juu ni sahihi na za kweli</span>
              </label>
            </div>
          </div>
        )}

        {/* Nav */}
        <div style={{ padding:16, borderTop:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          {step > 1
            ? <Button variant="outline" onClick={() => setStep(s => s - 1)}>← Nyuma</Button>
            : <div />}
          <div style={{ fontSize:11, color:'var(--text-muted)' }}>Hatua ya {step} ya {STEPS.length}: {STEPS[step-1]}</div>
          {step < STEPS.length
            ? <Button variant="accent" onClick={() => setStep(s => s + 1)}>Inayofuata →</Button>
            : <Button variant="accent" disabled={saving} onClick={handleFinish}>
                {saving ? '⏳ Inahifadhi...' : '✓ Thibitisha na Hifadhi Citation'}
              </Button>
          }
        </div>
      </div>
    </div>
  )
}
