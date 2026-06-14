import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// ── Animated counter hook ──
function useCount(target, duration = 1800, start = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!start) return
    let frame, startTime
    const step = (now) => {
      if (!startTime) startTime = now
      const p = Math.min((now - startTime) / duration, 1)
      setVal(Math.floor(p * target))
      if (p < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [target, duration, start])
  return val
}

const STATS = [
  { n: 1247,  suffix: '+', label: 'Maafisa Wanaofanya Kazi',   sub: 'Active Officers' },
  { n: 312,   suffix: '',  label: 'Vituo vya Polisi',          sub: 'Police Stations' },
  { n: 26,    suffix: '',  label: 'Mikoa ya Tanzania',         sub: 'Regions Covered' },
  { n: 99,    suffix: '%', label: 'Upatikanaji wa Mfumo',      sub: 'System Uptime' },
]

const MODULES = [
  { ic:'📋', title:'Citations & Tiketi',    desc:'Toa na simamia tiketi za barabarani kwa haraka. Inaunganishwa na NIDA na TAZARA moja kwa moja.' },
  { ic:'⛓️', title:'Kukamatwa / Arrests',   desc:'Rekodi kamili ya kukamata na haki za mtuhumiwa, na uthibitisho wa dijitali.' },
  { ic:'🔍', title:'Utafutaji wa Watu',     desc:'Tafuta kwa NIDA, TIN, I-NEC, Pasipoti, Leseni, Gari, Simu, au Alama ya Kidole.' },
  { ic:'📁', title:'Usimamizi wa Kesi',     desc:'CID case management na chain of custody ya ushahidi, warrants, na mahakama.' },
  { ic:'🗺️', title:'Ramani ya Operesheni', desc:'GPS tracking ya maafisa wote hai, doria, vizuizi na vituo vya ukaguzi.' },
  { ic:'🧠', title:'Ujasusi / Intelligence',desc:'Faili za siri kwa RPC, DIGP na IGP. Vitisho, mitandao ya uhalifu, taarifa za kina.' },
  { ic:'📊', title:'Takwimu & Ripoti',      desc:'Uchambuzi wa uhalifu kwa mkoa, wilaya na kituo. Mwenendo wa kila wiki na mwezi.' },
  { ic:'🗂️', title:'Rekodi ya Ukaguzi',    desc:'Kila hatua ya mfumo inarekodiwa: Afisa · GPS · Wakati · Kifaa. Haiwezi kubadilishwa.' },
]

const FEATURES = [
  { ic:'🔒', title:'Usalama wa Hali ya Juu',   desc:'Supabase Row Level Security, End-to-End Encryption, Biometric Auth, 2FA' },
  { ic:'📱', title:'Inafanya Kazi Popote',      desc:'Web Command Center, Mobile App ya Maafisani, Tablet na Desktop' },
  { ic:'⚡', title:'Wakati Halisi',             desc:'GPS tracking, taarifa za haraka, na operesheni zote hai kwa sekunde' },
  { ic:'🇹🇿', title:'Imejengwa kwa Tanzania', desc:'Swahili kwanza, TZS, DD/MM/YYYY, NIDA, TAZARA, TRA-TIN integrations' },
]

const RANKS = ['Constable','Corporal','Sergeant','Staff Sergeant','Inspector','ASP','SP','SSP','ACP','DCP','SCP','CP','RPC','DIGP','IGP']

export default function LandingPage() {
  const nav = useNavigate()
  const [statsVisible, setStatsVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeModule, setActiveModule] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 400)
    return () => clearTimeout(timer)
  }, [])

  const c0 = useCount(STATS[0].n, 1600, statsVisible)
  const c1 = useCount(STATS[1].n, 1400, statsVisible)
  const c2 = useCount(STATS[2].n, 1200, statsVisible)
  const c3 = useCount(STATS[3].n, 1800, statsVisible)
  const counts = [c0, c1, c2, c3]

  return (
    <div style={{ fontFamily:"'Inter',system-ui,sans-serif", background:'#060E07', color:'#E8F5E9', minHeight:'100vh', overflowX:'hidden' }}>

      {/* ══════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════ */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:1000, background:'rgba(6,14,7,.92)', backdropFilter:'blur(12px)', borderBottom:'1px solid rgba(255,255,255,.06)', padding:'0 5%' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', height:64, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          {/* Logo */}
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <svg width="36" height="36" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="#1B5E20" stroke="#FFC107" strokeWidth="3"/>
              <circle cx="50" cy="50" r="40" fill="white"/>
              <circle cx="50" cy="50" r="36" fill="#1B5E20"/>
              <line x1="34" y1="28" x2="66" y2="72" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              <line x1="66" y1="28" x2="34" y2="72" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              <line x1="50" y1="24" x2="50" y2="76" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="50" cy="50" r="6" fill="#FFC107"/>
              <ellipse cx="50" cy="12" rx="7" ry="10" fill="#E65100"/>
              <ellipse cx="50" cy="16" rx="3" ry="5" fill="#FFC107"/>
            </svg>
            <div>
              <div style={{ fontSize:13, fontWeight:800, color:'#fff', letterSpacing:.5, lineHeight:1 }}>TANZANIA POLICE</div>
              <div style={{ fontSize:9, color:'#FFC107', letterSpacing:1.5, textTransform:'uppercase' }}>Digital Operations Platform</div>
            </div>
          </div>

          {/* Desktop nav links */}
          <div style={{ display:'flex', alignItems:'center', gap:28, fontSize:13, color:'rgba(255,255,255,.65)' }}>
            {['Kuhusu','Moduli','Vipengele','Usalama'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                style={{ color:'rgba(255,255,255,.65)', textDecoration:'none', fontWeight:500, transition:'color .14s' }}
                onMouseEnter={e=>e.target.style.color='#fff'}
                onMouseLeave={e=>e.target.style.color='rgba(255,255,255,.65)'}>
                {l}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display:'flex', gap:8 }}>
            <button onClick={()=>nav('/login')}
              style={{ padding:'8px 18px', borderRadius:8, border:'1px solid rgba(255,255,255,.2)', background:'transparent', color:'rgba(255,255,255,.8)', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'Inter,sans-serif', transition:'all .14s' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.5)';e.currentTarget.style.color='#fff'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.2)';e.currentTarget.style.color='rgba(255,255,255,.8)'}}>
              Ingia
            </button>
            <button onClick={()=>nav('/login')}
              style={{ padding:'8px 20px', borderRadius:8, border:'none', background:'#1B5E20', color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'Inter,sans-serif', boxShadow:'0 2px 12px rgba(27,94,32,.5)', transition:'background .14s' }}
              onMouseEnter={e=>e.currentTarget.style.background='#2E7D32'}
              onMouseLeave={e=>e.currentTarget.style.background='#1B5E20'}>
              🔒 Ingia kwenye Mfumo
            </button>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section style={{ minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', padding:'120px 5% 80px', position:'relative', overflow:'hidden' }}>
        {/* Background radial glows */}
        <div style={{ position:'absolute', top:'20%', left:'5%', width:500, height:500, background:'radial-gradient(circle, rgba(27,94,32,.2) 0%, transparent 65%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'10%', right:'10%', width:400, height:400, background:'radial-gradient(circle, rgba(255,193,7,.06) 0%, transparent 65%)', pointerEvents:'none' }} />

        {/* Grid overlay */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(27,94,32,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(27,94,32,.04) 1px, transparent 1px)', backgroundSize:'48px 48px', pointerEvents:'none' }} />

        <div style={{ maxWidth:1200, margin:'0 auto', width:'100%', display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center', position:'relative' }}>

          {/* Left copy */}
          <div>
            {/* Eyebrow */}
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(27,94,32,.2)', border:'1px solid rgba(27,94,32,.4)', borderRadius:20, padding:'5px 14px', marginBottom:24 }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'#4CAF50' }} className="pls" />
              <span style={{ fontSize:11.5, color:'#81C784', fontWeight:600, letterSpacing:.5 }}>Mfumo wa Taifa · National Platform · 2024</span>
            </div>

            {/* Headline */}
            <h1 style={{ fontSize:'clamp(36px,4.5vw,58px)', fontWeight:900, color:'#fff', lineHeight:1.05, letterSpacing:-2, marginBottom:20 }}>
              Jeshi la Polisi<br />
              <span style={{ color:'#FFC107' }}>Dijitali.</span>
            </h1>

            {/* Sub */}
            <p style={{ fontSize:17, color:'rgba(255,255,255,.55)', lineHeight:1.7, marginBottom:32, maxWidth:480 }}>
              Mfumo kamili wa kidijitali kwa Jeshi la Polisi Tanzania —
              Citations, Kukamatwa, Uchunguzi, Ujasusi, GPS Tracking,
              na Dashibodi ya Taifa kwa wakati halisi.
            </p>

            {/* Flag stripe */}
            <div style={{ display:'flex', gap:0, marginBottom:32, width:140 }}>
              {[['#1DB954',56],['#FFD700',28],['#111',15],['#1EB2FC',41]].map(([c,w]) => (
                <div key={c} style={{ width:w, height:4, background:c }} />
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <button onClick={()=>nav('/login')}
                style={{ padding:'14px 32px', borderRadius:10, border:'none', background:'#1B5E20', color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:'Inter,sans-serif', display:'flex', alignItems:'center', gap:8, boxShadow:'0 4px 24px rgba(27,94,32,.45)', transition:'all .14s' }}
                onMouseEnter={e=>{e.currentTarget.style.background='#2E7D32';e.currentTarget.style.transform='translateY(-1px)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='#1B5E20';e.currentTarget.style.transform='none'}}>
                🔒 Ingia kwenye Mfumo
              </button>
              <button onClick={()=>nav('/splash')}
                style={{ padding:'14px 28px', borderRadius:10, border:'1px solid rgba(255,255,255,.15)', background:'transparent', color:'rgba(255,255,255,.8)', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'Inter,sans-serif', display:'flex', alignItems:'center', gap:8, transition:'all .14s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.4)';e.currentTarget.style.color='#fff'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.15)';e.currentTarget.style.color='rgba(255,255,255,.8)'}}>
                ▶ Tazama Demo
              </button>
            </div>

            {/* Motto */}
            <div style={{ marginTop:32, fontSize:12, color:'rgba(255,255,255,.3)', letterSpacing:1 }}>
              Kulinda · Kutumikia · Kuweka Usalama
            </div>
          </div>

          {/* Right: Dashboard mockup */}
          <div style={{ position:'relative' }}>
            {/* Glow behind mockup */}
            <div style={{ position:'absolute', inset:-40, background:'radial-gradient(circle at 50% 50%, rgba(27,94,32,.25) 0%, transparent 70%)', pointerEvents:'none' }} />

            {/* Mockup frame */}
            <div style={{ position:'relative', background:'#0F1A10', border:'1px solid rgba(255,255,255,.1)', borderRadius:16, overflow:'hidden', boxShadow:'0 32px 80px rgba(0,0,0,.6)', zIndex:1 }}>
              {/* Browser bar */}
              <div style={{ background:'#122115', padding:'10px 16px', borderBottom:'1px solid rgba(255,255,255,.06)', display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ display:'flex', gap:5 }}>
                  {['#EF5350','#FFC107','#4CAF50'].map(c => <div key={c} style={{ width:10, height:10, borderRadius:'50%', background:c }} />)}
                </div>
                <div style={{ flex:1, background:'rgba(255,255,255,.05)', borderRadius:4, padding:'4px 10px', fontSize:10, color:'rgba(255,255,255,.3)', marginLeft:8 }}>
                  tpdop.polisi.go.tz
                </div>
              </div>

              {/* Mini dashboard inside */}
              <div style={{ padding:'12px', minHeight:320 }}>
                {/* Mini topbar */}
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12, padding:'6px 8px', background:'rgba(255,255,255,.04)', borderRadius:6 }}>
                  <div style={{ width:16, height:16, borderRadius:'50%', background:'#1B5E20', display:'flex', alignItems:'center', justifyContent:'center', fontSize:8 }}>🛡️</div>
                  <div style={{ fontSize:9, fontWeight:700, color:'rgba(255,255,255,.7)' }}>TPDOP · Oysterbay Police Station</div>
                  <div style={{ marginLeft:'auto', display:'flex', gap:5 }}>
                    {['🔔','💬','👤'].map(i => <div key={i} style={{ width:20, height:20, borderRadius:4, background:'rgba(255,255,255,.06)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:9 }}>{i}</div>)}
                  </div>
                </div>

                {/* Mini stat cards */}
                <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:6, marginBottom:10 }}>
                  {[['📋','284','Citations'],['⛓️','47','Kukamatwa'],['🚨','5','Muhimu'],['📁','128','Kesi']].map(([ic,n,l]) => (
                    <div key={l} style={{ background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.07)', borderRadius:6, padding:'8px 6px' }}>
                      <div style={{ fontSize:12, marginBottom:3 }}>{ic}</div>
                      <div style={{ fontSize:14, fontWeight:800, color:'#fff', fontFamily:'monospace', lineHeight:1 }}>{n}</div>
                      <div style={{ fontSize:8, color:'rgba(255,255,255,.4)', marginTop:2 }}>{l}</div>
                    </div>
                  ))}
                </div>

                {/* Mini alerts */}
                <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                  {[
                    ['🔴','Wizi wa Gari – T123 DFG linatafutwa','Muhimu'],
                    ['🟡','Operesheni Maalum – Barabara kuanzia 18:00','Haraka'],
                    ['🔵','Mkutano wa Maafisa – Makao Makuu kesho','Taarifa'],
                  ].map(([dot, msg, type]) => (
                    <div key={msg} style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(255,255,255,.03)', borderRadius:5, padding:'6px 8px' }}>
                      <span style={{ fontSize:8 }}>{dot}</span>
                      <span style={{ fontSize:8.5, color:'rgba(255,255,255,.6)', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{msg}</span>
                      <span style={{ fontSize:7.5, color:'rgba(255,255,255,.3)', flexShrink:0 }}>{type}</span>
                    </div>
                  ))}
                </div>

                {/* Mini map hint */}
                <div style={{ marginTop:10, background:'rgba(0,0,0,.3)', borderRadius:6, height:60, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(27,94,32,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(27,94,32,.06) 1px, transparent 1px)', backgroundSize:'12px 12px' }} />
                  {[['33%','48%'],['52%','35%'],['61%','55%'],['44%','62%']].map(([t,l],i) => (
                    <div key={i} style={{ position:'absolute', top:t, left:l, width:8, height:8, borderRadius:'50%', background:'#4CAF50', boxShadow:'0 0 0 3px rgba(76,175,80,.3)' }} />
                  ))}
                  <span style={{ position:'relative', fontSize:9, color:'rgba(255,255,255,.3)' }}>🗺️ Live GPS – Dar es Salaam</span>
                </div>
              </div>
            </div>

            {/* Floating badge chips */}
            {[
              { top:'-12px', right:'20px', text:'🟢 1,247 Maafisa Hai' },
              { bottom:'20px', left:'-20px', text:'📍 Vituo 312 Tanzania' },
            ].map(({ top, right, bottom, left, text }) => (
              <div key={text} style={{ position:'absolute', top, right, bottom, left, background:'rgba(18,33,21,.95)', border:'1px solid rgba(255,255,255,.12)', borderRadius:20, padding:'6px 14px', fontSize:11, fontWeight:600, color:'rgba(255,255,255,.8)', whiteSpace:'nowrap', backdropFilter:'blur(8px)', zIndex:2 }}>
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS
      ══════════════════════════════════════════ */}
      <section style={{ padding:'60px 5%', borderTop:'1px solid rgba(255,255,255,.06)', borderBottom:'1px solid rgba(255,255,255,.06)', background:'rgba(0,0,0,.2)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:32 }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ textAlign:'center' }}>
              <div style={{ fontSize:'clamp(36px,4vw,52px)', fontWeight:900, color:'#FFC107', fontFamily:"'JetBrains Mono',monospace", lineHeight:1, letterSpacing:-2, marginBottom:6 }}>
                {counts[i].toLocaleString()}{s.suffix}
              </div>
              <div style={{ fontSize:14, fontWeight:700, color:'rgba(255,255,255,.85)', marginBottom:3 }}>{s.label}</div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,.35)', letterSpacing:.5 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MODULES
      ══════════════════════════════════════════ */}
      <section id="moduli" style={{ padding:'80px 5%' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <div style={{ fontSize:11, color:'#4CAF50', fontWeight:700, letterSpacing:2, textTransform:'uppercase', marginBottom:10 }}>Moduli za Mfumo</div>
            <h2 style={{ fontSize:'clamp(28px,3.5vw,42px)', fontWeight:900, color:'#fff', letterSpacing:-1.5, marginBottom:14 }}>
              Kila kitu katika mfumo mmoja
            </h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,.45)', maxWidth:520, margin:'0 auto', lineHeight:1.7 }}>
              Kutoka barabarani hadi mahakamani — TPDOP inashughulikia kila hatua ya kazi ya polisi.
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {MODULES.map((m, i) => (
              <div key={m.title}
                onMouseEnter={()=>setActiveModule(i)}
                style={{ background: activeModule===i ? 'rgba(27,94,32,.2)' : 'rgba(255,255,255,.03)', border:`1px solid ${activeModule===i ? 'rgba(27,94,32,.5)' : 'rgba(255,255,255,.06)'}`, borderRadius:12, padding:'22px 20px', cursor:'pointer', transition:'all .18s' }}>
                <div style={{ fontSize:28, marginBottom:12 }}>{m.ic}</div>
                <div style={{ fontSize:14, fontWeight:700, color:'#fff', marginBottom:8, lineHeight:1.3 }}>{m.title}</div>
                <div style={{ fontSize:12, color:'rgba(255,255,255,.45)', lineHeight:1.6 }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          RANKS TICKER
      ══════════════════════════════════════════ */}
      <section style={{ padding:'20px 0', background:'rgba(27,94,32,.08)', borderTop:'1px solid rgba(27,94,32,.2)', borderBottom:'1px solid rgba(27,94,32,.2)', overflow:'hidden' }}>
        <div style={{ display:'flex', gap:40, animation:'ticker 20s linear infinite', whiteSpace:'nowrap' }}>
          {[...RANKS,...RANKS].map((r,i) => (
            <span key={i} style={{ fontSize:12, fontWeight:600, color:'rgba(129,199,132,.6)', letterSpacing:1, textTransform:'uppercase', flexShrink:0 }}>
              {r} <span style={{ color:'rgba(255,193,7,.4)', margin:'0 8px' }}>·</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
      </section>

      {/* ══════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════ */}
      <section id="vipengele" style={{ padding:'80px 5%' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center' }}>
          <div>
            <div style={{ fontSize:11, color:'#4CAF50', fontWeight:700, letterSpacing:2, textTransform:'uppercase', marginBottom:10 }}>Vipengele</div>
            <h2 style={{ fontSize:'clamp(26px,3vw,38px)', fontWeight:900, color:'#fff', letterSpacing:-1.2, marginBottom:20 }}>
              Imejengwa kwa<br /><span style={{ color:'#FFC107' }}>Polisi ya Tanzania</span>
            </h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,.45)', lineHeight:1.8, marginBottom:32 }}>
              Si mfumo wa kawaida wa polisi ulionukuliwa. TPDOP ulibuniwa kwa mahitaji halisi ya Jeshi la Polisi Tanzania — lugha ya Kiswahili, muundo wa shirika, na mfumo wa sheria za Tanzania.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {FEATURES.map(f => (
                <div key={f.title} style={{ display:'flex', gap:14, alignItems:'flex-start' }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:'rgba(27,94,32,.25)', border:'1px solid rgba(27,94,32,.4)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>
                    {f.ic}
                  </div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:700, color:'#fff', marginBottom:3 }}>{f.title}</div>
                    <div style={{ fontSize:12, color:'rgba(255,255,255,.45)', lineHeight:1.6 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RBAC visual */}
          <div style={{ background:'rgba(0,0,0,.3)', border:'1px solid rgba(255,255,255,.08)', borderRadius:16, padding:28 }}>
            <div style={{ fontSize:12, fontWeight:700, color:'rgba(255,255,255,.5)', textTransform:'uppercase', letterSpacing:1, marginBottom:16 }}>
              🛡️ Udhibiti wa Ufikiaji (RBAC)
            </div>
            {[
              { role:'IGP / DIGP',          scope:'Taifa Zima',   pct:100, c:'#EF5350' },
              { role:'RPC',                  scope:'Mkoa Wake',    pct:80,  c:'#FF7043' },
              { role:'OCD',                  scope:'Wilaya Yake',  pct:62,  c:'#FFC107' },
              { role:'OCS',                  scope:'Kituo Chake',  pct:45,  c:'#4CAF50' },
              { role:'CID Officer',          scope:'Kesi za CID',  pct:38,  c:'#64B5F6' },
              { role:'Traffic Officer',       scope:'Barabara tu',  pct:25,  c:'#CE93D8' },
              { role:'Regular Officer',       scope:'Kazi za Kawaida',pct:20, c:'#81C784' },
            ].map(r => (
              <div key={r.role} style={{ marginBottom:10 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                  <span style={{ fontSize:12, fontWeight:600, color:'rgba(255,255,255,.8)' }}>{r.role}</span>
                  <span style={{ fontSize:11, color:'rgba(255,255,255,.4)' }}>{r.scope}</span>
                </div>
                <div style={{ background:'rgba(255,255,255,.06)', borderRadius:4, height:6, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${r.pct}%`, background:r.c, borderRadius:4, transition:'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════════ */}
      <section style={{ padding:'80px 5%', background:'linear-gradient(135deg, rgba(27,94,32,.15) 0%, rgba(0,0,0,.1) 100%)', borderTop:'1px solid rgba(255,255,255,.06)' }}>
        <div style={{ maxWidth:700, margin:'0 auto', textAlign:'center' }}>
          <div style={{ fontSize:28, marginBottom:16 }}>🛡️</div>
          <h2 style={{ fontSize:'clamp(26px,3vw,38px)', fontWeight:900, color:'#fff', letterSpacing:-1.2, marginBottom:14 }}>
            Uko tayari kuanza?
          </h2>
          <p style={{ fontSize:15, color:'rgba(255,255,255,.45)', lineHeight:1.7, marginBottom:32 }}>
            Ingia kwenye mfumo ukitumia namba yako ya utambulisho (Badge No.) na nenosiri. Kama una matatizo, wasiliana na ICT Department ya Makao Makuu.
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={()=>nav('/login')}
              style={{ padding:'15px 36px', borderRadius:12, border:'none', background:'#1B5E20', color:'#fff', fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:'Inter,sans-serif', display:'flex', alignItems:'center', gap:8, boxShadow:'0 4px 24px rgba(27,94,32,.5)', transition:'all .14s' }}
              onMouseEnter={e=>{e.currentTarget.style.background='#2E7D32';e.currentTarget.style.transform='translateY(-2px)'}}
              onMouseLeave={e=>{e.currentTarget.style.background='#1B5E20';e.currentTarget.style.transform='none'}}>
              🔒 Ingia kwenye Mfumo
            </button>
            <button onClick={()=>nav('/splash')}
              style={{ padding:'15px 28px', borderRadius:12, border:'1px solid rgba(255,255,255,.2)', background:'transparent', color:'rgba(255,255,255,.7)', fontSize:15, fontWeight:600, cursor:'pointer', fontFamily:'Inter,sans-serif', transition:'all .14s' }}
              onMouseEnter={e=>{e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor='rgba(255,255,255,.4)'}}
              onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,.7)';e.currentTarget.style.borderColor='rgba(255,255,255,.2)'}}>
              Tazama Demo
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer style={{ borderTop:'1px solid rgba(255,255,255,.06)', padding:'40px 5% 28px', background:'rgba(0,0,0,.3)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:40, marginBottom:36 }}>
            {/* Brand */}
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:14 }}>
                <svg width="30" height="30" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" fill="#1B5E20" stroke="#FFC107" strokeWidth="3"/>
                  <circle cx="50" cy="50" r="40" fill="white"/>
                  <circle cx="50" cy="50" r="36" fill="#1B5E20"/>
                  <line x1="34" y1="28" x2="66" y2="72" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="66" y1="28" x2="34" y2="72" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                  <circle cx="50" cy="50" r="6" fill="#FFC107"/>
                  <ellipse cx="50" cy="12" rx="7" ry="10" fill="#E65100"/>
                  <ellipse cx="50" cy="16" rx="3" ry="5" fill="#FFC107"/>
                </svg>
                <div>
                  <div style={{ fontSize:12, fontWeight:800, color:'#fff', letterSpacing:.4 }}>TANZANIA POLICE</div>
                  <div style={{ fontSize:9, color:'#FFC107', letterSpacing:1 }}>DIGITAL OPERATIONS PLATFORM</div>
                </div>
              </div>
              <p style={{ fontSize:12, color:'rgba(255,255,255,.35)', lineHeight:1.7, maxWidth:260 }}>
                Mfumo wa kidijitali wa kitaifa kwa Jeshi la Polisi Tanzania. Kulinda · Kutumikia · Kuweka Usalama.
              </p>
            </div>

            {/* Links */}
            {[
              { title:'Mfumo', links:['Moduli','Vipengele','Usalama','Ripoti'] },
              { title:'Shirika', links:['Kuhusu TPF','Makao Makuu','Mikoa 26','Vituo 312'] },
              { title:'Msaada', links:['ICT Department','Mafunzo','Sera ya Faragha','Mawasiliano'] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,.6)', textTransform:'uppercase', letterSpacing:1, marginBottom:12 }}>{col.title}</div>
                {col.links.map(l => (
                  <div key={l} style={{ fontSize:12.5, color:'rgba(255,255,255,.35)', marginBottom:8, cursor:'pointer', transition:'color .14s' }}
                    onMouseEnter={e=>e.target.style.color='rgba(255,255,255,.7)'}
                    onMouseLeave={e=>e.target.style.color='rgba(255,255,255,.35)'}>{l}</div>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop:'1px solid rgba(255,255,255,.06)', paddingTop:20, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ fontSize:16 }}>🇹🇿</span>
              <span style={{ fontSize:12, color:'rgba(255,255,255,.3)' }}>© 2024 Jeshi la Polisi Tanzania · Tanzania Police Force. Haki zote zimehifadhiwa.</span>
            </div>
            <div style={{ display:'flex', gap:20 }}>
              {['Sera ya Faragha','Masharti ya Matumizi','Usalama'].map(l => (
                <span key={l} style={{ fontSize:11.5, color:'rgba(255,255,255,.3)', cursor:'pointer', transition:'color .14s' }}
                  onMouseEnter={e=>e.target.style.color='rgba(255,255,255,.6)'}
                  onMouseLeave={e=>e.target.style.color='rgba(255,255,255,.3)'}>{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
