import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const nav = useNavigate()
  const [lang, setLang]         = useState('sw')
  const [badge, setBadge]       = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(true)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const login = () => {
    if (!badge || !password) { setError('Tafadhali jaza namba ya utambulisho na nenosiri'); return }
    setError('')
    setLoading(true)
    // Simulate auth — any badge + password works in demo
    setTimeout(() => { setLoading(false); nav('/') }, 1400)
  }

  const biometric = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); nav('/') }, 1000)
  }

  const sw = lang === 'sw'

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #071409 0%, #0E2210 40%, #122A14 100%)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── TOP HERO SECTION ── */}
      <div style={{ flex: '0 0 auto', position: 'relative', minHeight: 280, overflow: 'hidden' }}>
        {/* Background mountain silhouette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 70% 60%, rgba(46,125,50,.15) 0%, transparent 70%)',
        }} />

        {/* Officer */}
        <div style={{
          position: 'absolute',
          right: 0, top: 0, bottom: 0,
          width: 200,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
        }}>
          <div style={{ fontSize: 130, lineHeight: 1, paddingRight: 12, filter: 'drop-shadow(0 10px 30px rgba(0,0,0,.8))' }}>
            👮
          </div>
        </div>

        {/* Lang toggle top-right */}
        <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
          <div style={{ display: 'flex', background: 'rgba(0,0,0,.4)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 20, padding: 3, gap: 2 }}>
            <button onClick={()=>setLang('sw')} style={{ padding: '5px 12px', borderRadius: 16, border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif', fontSize: 11, fontWeight: 700, background: sw ? '#1B5E20' : 'transparent', color: sw ? '#fff' : 'rgba(255,255,255,.5)', transition: 'all .14s' }}>SW</button>
            <button onClick={()=>setLang('en')} style={{ padding: '5px 12px', borderRadius: 16, border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif', fontSize: 11, fontWeight: 700, background: !sw ? '#1B5E20' : 'transparent', color: !sw ? '#fff' : 'rgba(255,255,255,.5)', transition: 'all .14s' }}>EN</button>
          </div>
        </div>

        {/* Badge + title */}
        <div style={{ padding: '32px 24px 20px', position: 'relative', zIndex: 1 }}>
          <svg width="54" height="54" viewBox="0 0 100 100" style={{ marginBottom: 14, filter: 'drop-shadow(0 4px 16px rgba(0,0,0,.5))' }}>
            <circle cx="50" cy="50" r="48" fill="#1B5E20" stroke="#FFC107" strokeWidth="3"/>
            <circle cx="50" cy="50" r="40" fill="white"/>
            <circle cx="50" cy="50" r="36" fill="#1B5E20"/>
            <line x1="34" y1="28" x2="66" y2="72" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
            <line x1="66" y1="28" x2="34" y2="72" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
            <line x1="50" y1="24" x2="50" y2="76" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="50" cy="50" r="5" fill="#FFC107"/>
            <ellipse cx="50" cy="13" rx="7" ry="10" fill="#FF6F00"/>
            <ellipse cx="50" cy="16" rx="4" ry="6" fill="#FFC107"/>
          </svg>

          <div style={{ fontSize: 34, fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: -1 }}>TANZANIA<br />POLICE</div>

          {/* Flag colors */}
          <div style={{ display: 'flex', gap: 0, margin: '10px 0 8px' }}>
            <div style={{ width: 40, height: 3, background: '#1DB954' }} />
            <div style={{ width: 20, height: 3, background: '#FFD700' }} />
            <div style={{ width: 10, height: 3, background: '#111' }} />
            <div style={{ width: 30, height: 3, background: '#1EB2FC' }} />
          </div>

          <div style={{ fontSize: 11, fontWeight: 700, color: '#FFC107', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>
            Digital Operations Platform
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.45)' }}>
            Kulinda • Kutumikia • Kuweka Usalama
          </div>
        </div>
      </div>

      {/* ── LOGIN CARD ── */}
      <div style={{
        flex: 1,
        background: '#F5F5F5',
        borderRadius: '24px 24px 0 0',
        padding: '28px 24px 20px',
        marginTop: -20,
        position: 'relative',
        zIndex: 2,
        minHeight: 'calc(100vh - 260px)',
      }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
            🛡️
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#111', letterSpacing: -.3 }}>
              {sw ? 'INGIA KWENYE MFUMO' : 'SYSTEM LOGIN'}
            </div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 1 }}>
              {sw ? 'Tumia taarifa zako za kazi kuendelea' : 'Use your service credentials to continue'}
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: '#FFF3F3', border: '1px solid #FFCDD2', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: '#C62828', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
            ⚠️ {error}
          </div>
        )}

        {/* Badge No. field */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: '#444', marginBottom: 5 }}>
            {sw ? 'Namba ya Utambulisho (Service / Badge No.)' : 'Service / Badge Number'}
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: '#999' }}>🪪</div>
            <input
              type="text"
              value={badge}
              onChange={e => setBadge(e.target.value)}
              placeholder={sw ? 'Weka namba yako ya utambulisho' : 'Enter your badge number'}
              style={{ width: '100%', padding: '13px 42px 13px 42px', border: '1.5px solid #E0E0E0', borderRadius: 12, fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none', background: '#fff', color: '#111', boxSizing: 'border-box', transition: 'border-color .14s' }}
              onFocus={e => e.target.style.borderColor = '#1B5E20'}
              onBlur={e => e.target.style.borderColor = '#E0E0E0'}
            />
            <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: '#ccc' }}>👤</div>
          </div>
        </div>

        {/* Username field */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: '#444', marginBottom: 5 }}>
            {sw ? 'Jina la Mtumiaji (Username)' : 'Username'}
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: '#999' }}>👤</div>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder={sw ? 'Weka jina la mtumiaji' : 'Enter username'}
              style={{ width: '100%', padding: '13px 14px 13px 42px', border: '1.5px solid #E0E0E0', borderRadius: 12, fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none', background: '#fff', color: '#111', boxSizing: 'border-box', transition: 'border-color .14s' }}
              onFocus={e => e.target.style.borderColor = '#1B5E20'}
              onBlur={e => e.target.style.borderColor = '#E0E0E0'}
            />
          </div>
        </div>

        {/* Password field */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: '#444', marginBottom: 5 }}>
            {sw ? 'Nenosiri (Password)' : 'Password'}
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: '#999' }}>🔒</div>
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && login()}
              placeholder={sw ? 'Weka nenosiri lako' : 'Enter password'}
              style={{ width: '100%', padding: '13px 42px 13px 42px', border: '1.5px solid #E0E0E0', borderRadius: 12, fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none', background: '#fff', color: '#111', boxSizing: 'border-box', transition: 'border-color .14s' }}
              onFocus={e => e.target.style.borderColor = '#1B5E20'}
              onBlur={e => e.target.style.borderColor = '#E0E0E0'}
            />
            <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#999' }}>
              {showPass ? '👁️' : '🚫'}
            </button>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer' }}>
            <div onClick={() => setRemember(!remember)} style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${remember ? '#1B5E20' : '#CCC'}`, background: remember ? '#1B5E20' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .14s', flexShrink: 0 }}>
              {remember && <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>✓</span>}
            </div>
            <span style={{ fontSize: 12.5, color: '#444' }}>{sw ? 'Kumbuka mimi' : 'Remember me'}</span>
          </label>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12.5, color: '#1B5E20', fontWeight: 600, fontFamily: 'Inter,sans-serif' }}>
            {sw ? 'Umesahau nenosiri?' : 'Forgot password?'}
          </button>
        </div>

        {/* Login button */}
        <button
          onClick={login}
          disabled={loading}
          style={{
            width: '100%',
            padding: '15px',
            background: loading ? '#388E3C' : '#1B5E20',
            color: '#fff',
            border: 'none',
            borderRadius: 14,
            fontSize: 15,
            fontWeight: 700,
            fontFamily: 'Inter,sans-serif',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 16,
            transition: 'background .14s',
            boxShadow: '0 4px 16px rgba(27,94,32,.35)',
          }}
        >
          {loading ? '⏳ Inaingia...' : <><span style={{ fontSize: 18 }}>🔒</span> {sw ? 'INGIA' : 'LOGIN'}</>}
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{ flex: 1, height: 1, background: '#E0E0E0' }} />
          <div style={{ fontSize: 11, color: '#999', fontWeight: 600 }}>{sw ? 'AU INGIA KWA' : 'OR LOGIN WITH'}</div>
          <div style={{ flex: 1, height: 1, background: '#E0E0E0' }} />
        </div>

        {/* Biometric */}
        <button
          onClick={biometric}
          style={{
            width: '100%',
            padding: '13px',
            background: '#fff',
            border: '1.5px solid #E0E0E0',
            borderRadius: 14,
            fontSize: 13,
            fontWeight: 600,
            fontFamily: 'Inter,sans-serif',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            color: '#333',
            marginBottom: 24,
          }}
        >
          <span style={{ fontSize: 20 }}>👆</span>
          {sw ? 'Tumia Alama ya Kidole' : 'Use Fingerprint'}
        </button>

        {/* Footer links */}
        <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 14, borderTop: '1px solid #EEE', marginBottom: 16 }}>
          {[['💬', sw?'Msaada':'Help'], ['🛡️', sw?'Serikali ya Tanzania':'Govt of Tanzania'], ['ℹ️', sw?'Kuhusu Mfumo':'About System']].map(([ic, lb]) => (
            <div key={lb} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              <div style={{ fontSize: 20 }}>{ic}</div>
              <div style={{ fontSize: 10, color: '#888', fontWeight: 500 }}>{lb}</div>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div style={{ textAlign: 'center', fontSize: 10.5, color: '#AAA' }}>
          © 2024 Tanzania Police Force. Haki zote zimehifadhiwa.
        </div>
      </div>
    </div>
  )
}
