import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const nav = useNavigate()
  const [lang, setLang]     = useState('sw')
  const [badge, setBadge]   = useState('')
  const [password, setPass] = useState('')
  const [showPass, setShow] = useState(false)
  const [remember, setRem]  = useState(true)
  const [loading, setLoad]  = useState(false)
  const [error, setError]   = useState('')

  const sw = lang === 'sw'

  const login = () => {
    if (!badge || !password) {
      setError(sw ? 'Tafadhali jaza namba ya utambulisho na nenosiri' : 'Please enter badge number and password')
      return
    }
    setError('')
    setLoad(true)
    setTimeout(() => { setLoad(false); nav('/') }, 1400)
  }

  const biometric = () => { setLoad(true); setTimeout(() => { setLoad(false); nav('/') }, 1000) }

  return (
    <div style={{
      height: '100vh',
      background: 'linear-gradient(180deg,#060E07 0%,#0B1E0D 30%,#163B18 60%,#0A1B0B 100%)',
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
      fontFamily: "'Inter',sans-serif",
    }}>

      {/* ── HERO TOP ── */}
      <div style={{ flex:'0 0 auto', position:'relative', minHeight:300, overflow:'hidden' }}>

        {/* Glow */}
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 70% 60%, rgba(46,125,50,.18) 0%, transparent 70%)' }} />

        {/* Officer */}
        <div style={{ position:'absolute', right:0, top:0, bottom:0, display:'flex', alignItems:'flex-end', justifyContent:'flex-end' }}>
          <div style={{ fontSize:150, lineHeight:1, paddingRight:8, filter:'drop-shadow(0 12px 32px rgba(0,0,0,.9))' }}>👮</div>
        </div>

        {/* SW/EN toggle */}
        <div style={{ position:'absolute', top:18, right:18, zIndex:10 }}>
          <div style={{ display:'flex', background:'rgba(0,0,0,.45)', border:'1px solid rgba(255,255,255,.14)', borderRadius:22, padding:3, gap:2 }}>
            {['SW','EN'].map(l => (
              <button key={l} onClick={()=>setLang(l.toLowerCase())}
                style={{ padding:'5px 13px', borderRadius:18, border:'none', cursor:'pointer',
                  fontFamily:'Inter,sans-serif', fontSize:11, fontWeight:700,
                  background: lang===l.toLowerCase() ? '#1B5E20' : 'transparent',
                  color: lang===l.toLowerCase() ? '#fff' : 'rgba(255,255,255,.5)',
                  transition:'all .14s' }}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Badge + title */}
        <div style={{ padding:'30px 26px 16px', position:'relative', zIndex:1 }}>
          <svg width="52" height="52" viewBox="0 0 100 100" style={{ marginBottom:14, filter:'drop-shadow(0 4px 16px rgba(0,0,0,.6))' }}>
            <circle cx="50" cy="50" r="48" fill="#1B5E20" stroke="#FFC107" strokeWidth="3"/>
            <circle cx="50" cy="50" r="40" fill="white"/>
            <circle cx="50" cy="50" r="36" fill="#1B5E20"/>
            <line x1="34" y1="28" x2="66" y2="72" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
            <line x1="66" y1="28" x2="34" y2="72" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
            <line x1="50" y1="24" x2="50" y2="76" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
            <circle cx="50" cy="50" r="5.5" fill="#FFC107"/>
            <ellipse cx="50" cy="12" rx="7" ry="11" fill="#E65100"/>
            <ellipse cx="50" cy="17" rx="2.8" ry="4" fill="#FFC107"/>
          </svg>

          <div style={{ fontSize:36, fontWeight:900, color:'#fff', lineHeight:1, letterSpacing:-1.2, marginBottom:8 }}>
            TANZANIA<br/>POLICE
          </div>

          {/* Flag stripe */}
          <div style={{ display:'flex', gap:0, marginBottom:8 }}>
            {[['#1DB954',44],['#FFD700',22],['#111',12],['#1EB2FC',32]].map(([c,w]) => (
              <div key={c} style={{ width:w, height:3.5, background:c }} />
            ))}
          </div>

          <div style={{ fontSize:11, fontWeight:700, color:'#FFC107', letterSpacing:1.8, textTransform:'uppercase', marginBottom:3 }}>
            Digital Operations Platform
          </div>
          <div style={{ fontSize:11, color:'rgba(255,255,255,.4)' }}>
            Kulinda • Kutumikia • Kuweka Usalama
          </div>
        </div>
      </div>

      {/* ── LOGIN CARD ── */}
      <div style={{
        flex:1, background:'#F4F5F4',
        borderRadius:'26px 26px 0 0',
        padding:'26px 24px 20px',
        marginTop:-24, position:'relative', zIndex:2,
        overflowY:'auto',
      }}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:22 }}>
          <div style={{ width:44, height:44, borderRadius:12, background:'#E8F5E9', border:'1px solid #C8E6C9', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>
            🛡️
          </div>
          <div>
            <div style={{ fontSize:15.5, fontWeight:800, color:'#111', letterSpacing:-.3 }}>
              {sw ? 'INGIA KWENYE MFUMO' : 'SYSTEM LOGIN'}
            </div>
            <div style={{ fontSize:11.5, color:'#777', marginTop:1 }}>
              {sw ? 'Tumia taarifa zako za kazi kuendelea' : 'Use your service credentials to continue'}
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background:'#FFF3F3', border:'1px solid #FFCDD2', borderRadius:10, padding:'9px 14px', fontSize:12, color:'#C62828', marginBottom:14, display:'flex', alignItems:'center', gap:6 }}>
            ⚠️ {error}
          </div>
        )}

        {/* Badge field */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11.5, fontWeight:600, color:'#444', marginBottom:5 }}>
            {sw ? 'Namba ya Utambulisho (Service / Badge No.)' : 'Service / Badge Number'}
          </div>
          <div style={{ position:'relative' }}>
            <div style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:17, color:'#999' }}>🪪</div>
            <input
              type="text"
              value={badge}
              onChange={e => setBadge(e.target.value)}
              placeholder={sw ? 'Weka namba yako ya utambulisho' : 'Enter your badge number'}
              onKeyDown={e => e.key === 'Enter' && login()}
              style={{ width:'100%', padding:'13px 44px 13px 42px', border:'1.5px solid #DDD', borderRadius:12, fontSize:13, fontFamily:'Inter,sans-serif', outline:'none', background:'#fff', color:'#111', boxSizing:'border-box', transition:'border-color .14s' }}
              onFocus={e => e.target.style.borderColor='#1B5E20'}
              onBlur={e => e.target.style.borderColor='#DDD'}
            />
            <div style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', fontSize:18, color:'#CCC' }}>👤</div>
          </div>
        </div>

        {/* Password field */}
        <div style={{ marginBottom:12 }}>
          <div style={{ fontSize:11.5, fontWeight:600, color:'#444', marginBottom:5 }}>
            {sw ? 'Nenosiri (Password)' : 'Password'}
          </div>
          <div style={{ position:'relative' }}>
            <div style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:17, color:'#999' }}>🔒</div>
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={e => setPass(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && login()}
              placeholder={sw ? 'Weka nenosiri lako' : 'Enter your password'}
              style={{ width:'100%', padding:'13px 44px 13px 42px', border:'1.5px solid #DDD', borderRadius:12, fontSize:13, fontFamily:'Inter,sans-serif', outline:'none', background:'#fff', color:'#111', boxSizing:'border-box', transition:'border-color .14s' }}
              onFocus={e => e.target.style.borderColor='#1B5E20'}
              onBlur={e => e.target.style.borderColor='#DDD'}
            />
            <button onClick={()=>setShow(!showPass)}
              style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', fontSize:17, color:'#AAA', lineHeight:1 }}>
              {showPass ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
          <label style={{ display:'flex', alignItems:'center', gap:7, cursor:'pointer' }}>
            <div onClick={()=>setRem(!remember)}
              style={{ width:18, height:18, borderRadius:4, border:`2px solid ${remember?'#1B5E20':'#CCC'}`, background:remember?'#1B5E20':'transparent', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .14s', flexShrink:0 }}>
              {remember && <span style={{ color:'#fff', fontSize:11, fontWeight:900, lineHeight:1 }}>✓</span>}
            </div>
            <span style={{ fontSize:12.5, color:'#555' }}>{sw ? 'Kumbuka mimi' : 'Remember me'}</span>
          </label>
          <button style={{ background:'none', border:'none', cursor:'pointer', fontSize:12.5, color:'#1B5E20', fontWeight:700, fontFamily:'Inter,sans-serif' }}>
            {sw ? 'Umesahau nenosiri?' : 'Forgot password?'}
          </button>
        </div>

        {/* Login button */}
        <button onClick={login} disabled={loading}
          style={{ width:'100%', padding:'15px', background:loading?'#2E7D32':'#1B5E20', color:'#fff', border:'none', borderRadius:14, fontSize:15, fontWeight:700, fontFamily:'Inter,sans-serif', cursor:loading?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginBottom:16, transition:'background .14s', boxShadow:'0 4px 20px rgba(27,94,32,.4)' }}>
          {loading ? '⏳ Inaingia...' : <><span style={{fontSize:18}}>🔒</span> {sw ? 'INGIA' : 'LOGIN'}</>}
        </button>

        {/* Divider */}
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
          <div style={{ flex:1, height:1, background:'#E0E0E0' }} />
          <div style={{ fontSize:11, color:'#AAA', fontWeight:600, whiteSpace:'nowrap' }}>{sw ? 'AU INGIA KWA' : 'OR LOGIN WITH'}</div>
          <div style={{ flex:1, height:1, background:'#E0E0E0' }} />
        </div>

        {/* Biometric */}
        <button onClick={biometric}
          style={{ width:'100%', padding:'13px', background:'#fff', border:'1.5px solid #DDD', borderRadius:14, fontSize:13, fontWeight:600, fontFamily:'Inter,sans-serif', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, color:'#333', marginBottom:24, transition:'border-color .14s' }}
          onMouseEnter={e=>e.currentTarget.style.borderColor='#1B5E20'}
          onMouseLeave={e=>e.currentTarget.style.borderColor='#DDD'}>
          <span style={{fontSize:20}}>👆</span>
          {sw ? 'Tumia Alama ya Kidole' : 'Use Fingerprint'}
        </button>

        {/* Footer links */}
        <div style={{ display:'flex', justifyContent:'space-around', paddingTop:14, borderTop:'1px solid #EEE', marginBottom:14 }}>
          {[['💬', sw?'Msaada':'Help'],['🛡️', sw?'Serikali ya Tanzania':'Govt of Tanzania'],['ℹ️', sw?'Kuhusu Mfumo':'About System']].map(([ic,lb]) => (
            <div key={lb} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, cursor:'pointer' }}>
              <div style={{ fontSize:20 }}>{ic}</div>
              <div style={{ fontSize:10, color:'#999', fontWeight:500 }}>{lb}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign:'center', fontSize:11, color:'#BBB' }}>
          © 2024 Tanzania Police Force. Haki zote zimehifadhiwa.
        </div>
      </div>
    </div>
  )
}
