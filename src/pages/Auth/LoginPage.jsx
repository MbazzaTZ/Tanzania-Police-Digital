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
    setTimeout(() => { setLoad(false); nav('/dashboard') }, 1400)
  }

  const biometric = () => {
    setLoad(true)
    setTimeout(() => { setLoad(false); nav('/dashboard') }, 1000)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'linear-gradient(160deg, #060E07 0%, #0B1E0D 45%, #163B18 100%)',
      fontFamily: "'Inter', system-ui, sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── LEFT HERO PANEL ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '40px 48px',
        position: 'relative',
        minWidth: 0,
      }}>

        {/* Background grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(26,35,126,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(26,35,126,.06) 1px,transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        {/* Glow */}
        <div style={{
          position: 'absolute', top: '30%', left: '10%',
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(26,35,126,.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* SW/EN Toggle */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {/* Badge + Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <svg width="48" height="48" viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.5))', flexShrink: 0 }}>
              <circle cx="50" cy="50" r="48" fill="#1B5E20" stroke="#FFC107" strokeWidth="3"/>
              <circle cx="50" cy="50" r="40" fill="white"/>
              <circle cx="50" cy="50" r="36" fill="#1B5E20"/>
              <line x1="34" y1="28" x2="66" y2="72" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
              <line x1="66" y1="28" x2="34" y2="72" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
              <line x1="50" y1="24" x2="50" y2="76" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
              <circle cx="50" cy="50" r="5.5" fill="#FFC107"/>
              <ellipse cx="50" cy="12" rx="7" ry="10" fill="#E65100"/>
              <ellipse cx="50" cy="16" rx="3" ry="5" fill="#FFC107"/>
            </svg>
            <div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 }}>Jeshi la Polisi Tanzania</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', letterSpacing: -.5, lineHeight: 1 }}>TPDOP</div>
            </div>
          </div>

          {/* Lang toggle */}
          <div style={{ display: 'flex', background: 'rgba(0,0,0,.35)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 22, padding: 3, gap: 2 }}>
            {['SW','EN'].map(l => (
              <button key={l} onClick={() => setLang(l.toLowerCase())} style={{
                padding: '5px 14px', borderRadius: 18, border: 'none', cursor: 'pointer',
                fontFamily: 'Inter,sans-serif', fontSize: 11, fontWeight: 700,
                background: lang === l.toLowerCase() ? '#1E3A6E' : 'transparent',
                color: lang === l.toLowerCase() ? '#fff' : 'rgba(255,255,255,.5)',
                transition: 'all .14s',
              }}>{l}</button>
            ))}
          </div>
        </div>

        {/* Center hero content */}
        <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 20 }}>
          <div style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: -2, marginBottom: 16 }}>
            TANZANIA<br /><span style={{ color: '#FFC107' }}>POLICE</span>
          </div>

          {/* Flag stripe */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 14, width: 160 }}>
            {[['#1DB954',64],['#FFD700',32],['#111',18],['#1EB2FC',46]].map(([c,w]) => (
              <div key={c} style={{ width: w, height: 4, background: c }} />
            ))}
          </div>

          <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,.7)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>
            DIGITAL OPERATIONS PLATFORM
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', letterSpacing: .5 }}>
            Kulinda • Kutumikia • Kuweka Usalama
          </div>

          {/* Officer figure */}
          <div style={{ marginTop: 40, position: 'relative' }}>
            {/* Glow behind officer */}
            <div style={{
              position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)',
              width: 300, height: 200,
              background: 'radial-gradient(ellipse, rgba(26,35,126,.3) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{ fontSize: 160, lineHeight: 1, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,.8))', textAlign: 'center', position: 'relative' }}>
              👮
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: -16 }}>
              <span style={{ fontSize: 48, filter: 'drop-shadow(0 8px 16px rgba(0,0,0,.6))' }}>🚔</span>
            </div>
          </div>
        </div>

        {/* Bottom info */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['👮','1,247+','Maafisa'],['🏢','312','Vituo'],['🇹🇿','26','Mikoa']].map(([ic,n,l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 16 }}>{ic}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#FFC107', fontFamily: 'monospace', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', letterSpacing: .5 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT LOGIN CARD ── */}
      <div style={{
        width: 460,
        flexShrink: 0,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px 44px',
        position: 'relative',
        boxShadow: '-20px 0 60px rgba(0,0,0,.4)',
      }}>

        {/* Top logo on card */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: '#E8EAF6', border: '1px solid #C8E6C9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
            🛡️
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#111', letterSpacing: -.3 }}>
              {sw ? 'INGIA KWENYE MFUMO' : 'SYSTEM LOGIN'}
            </div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 1 }}>
              {sw ? 'Tumia taarifa zako za kazi kuendelea' : 'Use your service credentials to continue'}
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: '#FFF3F3', border: '1px solid #FFCDD2', borderRadius: 8, padding: '10px 14px', fontSize: 12.5, color: '#C62828', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 6 }}>
            ⚠️ {error}
          </div>
        )}

        {/* Badge field */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#555', marginBottom: 6 }}>
            {sw ? 'Namba ya Utambulisho (Service / Badge No.)' : 'Service / Badge Number'}
          </label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: '#AAA' }}>🪪</span>
            <input
              type="text"
              value={badge}
              onChange={e => setBadge(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && login()}
              placeholder={sw ? 'Weka namba yako ya utambulisho' : 'Enter your badge number'}
              style={{
                width: '100%', padding: '12px 14px 12px 40px',
                border: '1.5px solid #E0E0E0', borderRadius: 10,
                fontSize: 13.5, fontFamily: 'Inter,sans-serif',
                outline: 'none', background: '#FAFAFA', color: '#111',
                boxSizing: 'border-box', transition: 'border-color .14s, background .14s',
              }}
              onFocus={e => { e.target.style.borderColor = '#1E3A6E'; e.target.style.background = '#fff' }}
              onBlur={e => { e.target.style.borderColor = '#E0E0E0'; e.target.style.background = '#FAFAFA' }}
            />
          </div>
        </div>

        {/* Password field */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#555', marginBottom: 6 }}>
            {sw ? 'Nenosiri (Password)' : 'Password'}
          </label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: '#AAA' }}>🔒</span>
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={e => setPass(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && login()}
              placeholder={sw ? 'Weka nenosiri lako' : 'Enter your password'}
              style={{
                width: '100%', padding: '12px 42px 12px 40px',
                border: '1.5px solid #E0E0E0', borderRadius: 10,
                fontSize: 13.5, fontFamily: 'Inter,sans-serif',
                outline: 'none', background: '#FAFAFA', color: '#111',
                boxSizing: 'border-box', transition: 'border-color .14s, background .14s',
              }}
              onFocus={e => { e.target.style.borderColor = '#1E3A6E'; e.target.style.background = '#fff' }}
              onBlur={e => { e.target.style.borderColor = '#E0E0E0'; e.target.style.background = '#FAFAFA' }}
            />
            <button onClick={() => setShow(!showPass)} style={{
              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#AAA', lineHeight: 1, padding: 4,
            }}>
              {showPass ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <div onClick={() => setRem(!remember)} style={{
              width: 18, height: 18, borderRadius: 5,
              border: `2px solid ${remember ? '#1E3A6E' : '#CCC'}`,
              background: remember ? '#1E3A6E' : '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all .14s', flexShrink: 0,
            }}>
              {remember && <span style={{ color: '#fff', fontSize: 11, fontWeight: 700, lineHeight: 1 }}>✓</span>}
            </div>
            <span style={{ fontSize: 13, color: '#555' }}>{sw ? 'Kumbuka mimi' : 'Remember me'}</span>
          </label>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#1E3A6E', fontWeight: 600, fontFamily: 'Inter,sans-serif' }}>
            {sw ? 'Umesahau nenosiri?' : 'Forgot password?'}
          </button>
        </div>

        {/* INGIA button */}
        <button onClick={login} disabled={loading} style={{
          width: '100%', padding: '14px',
          background: loading ? '#234086' : '#1E3A6E',
          color: '#fff', border: 'none', borderRadius: 12,
          fontSize: 15, fontWeight: 700, fontFamily: 'Inter,sans-serif',
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          marginBottom: 18, transition: 'all .14s',
          boxShadow: '0 4px 20px rgba(26,35,126,.35)',
        }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#234086' }}
          onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#1E3A6E' }}>
          {loading ? '⏳ Inaingia...' : <><span style={{ fontSize: 18 }}>🔒</span> {sw ? 'INGIA' : 'LOGIN'}</>}
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1, height: 1, background: '#EEE' }} />
          <span style={{ fontSize: 11.5, color: '#BBB', fontWeight: 600 }}>{sw ? 'AU INGIA KWA' : 'OR'}</span>
          <div style={{ flex: 1, height: 1, background: '#EEE' }} />
        </div>

        {/* Biometric */}
        <button onClick={biometric} style={{
          width: '100%', padding: '12px',
          background: '#fff', border: '1.5px solid #E0E0E0', borderRadius: 12,
          fontSize: 13.5, fontWeight: 600, fontFamily: 'Inter,sans-serif',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 8, color: '#444', marginBottom: 32, transition: 'border-color .14s',
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#1E3A6E'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#E0E0E0'}>
          <span style={{ fontSize: 20 }}>👆</span>
          {sw ? 'Tumia Alama ya Kidole' : 'Use Fingerprint'}
        </button>

        {/* Footer links */}
        <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 20, borderTop: '1px solid #F0F0F0', marginBottom: 16 }}>
          {[['💬', sw?'Msaada':'Help'],['🛡️', sw?'Serikali':'Govt'],['ℹ️', sw?'Kuhusu':'About']].map(([ic,lb]) => (
            <div key={lb} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              <span style={{ fontSize: 18 }}>{ic}</span>
              <span style={{ fontSize: 10.5, color: '#AAA', fontWeight: 500 }}>{lb}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', fontSize: 11, color: '#CCC' }}>
          © 2024 Tanzania Police Force · Haki zote zimehifadhiwa.
        </div>
      </div>
    </div>
  )
}
