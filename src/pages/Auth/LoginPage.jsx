import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PoliceBadge from '@components/shared/PoliceBadge'

export default function LoginPage() {
  const nav = useNavigate()
  const [lang, setLang]       = useState('sw')
  const [badge, setBadge]     = useState('')
  const [pass, setPass]       = useState('')
  const [remember, setRem]    = useState(false)
  const [loading, setBusy]    = useState(false)
  const [error, setError]     = useState('')

  const sw = lang === 'sw'

  const login = () => {
    if (!badge || !pass) {
      setError(sw ? 'Tafadhali jaza namba ya utambulisho na nenosiri' : 'Please enter badge number and password')
      return
    }
    setError('')
    setBusy(true)
    setTimeout(() => { setBusy(false); nav('/dashboard') }, 1400)
  }

  return (
    <div style={{
      minHeight:'100vh', display:'flex',
      background:'linear-gradient(135deg,#070C1A 0%,#0D1430 50%,#1E3A6E 100%)',
      fontFamily:"'Inter',system-ui,sans-serif",
      position:'relative', overflow:'hidden',
    }}>

      {/* Grid overlay */}
      <div style={{position:'absolute',inset:0,pointerEvents:'none',backgroundImage:'linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)',backgroundSize:'40px 40px'}}/>

      {/* Radial glow */}
      <div style={{position:'absolute',top:'25%',left:'25%',width:500,height:500,borderRadius:'50%',background:'rgba(30,58,110,.2)',filter:'blur(80px)',pointerEvents:'none'}}/>

      {/* ════════════ LEFT HERO ════════════ */}
      <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'32px 48px',position:'relative',zIndex:1,minWidth:0}}>

        {/* Top bar */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <PoliceBadge size={48} />
            <div>
              <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:1.5,color:'rgba(255,255,255,.4)',marginBottom:2}}>
                Jeshi la Polisi Tanzania
              </div>
              <div style={{fontSize:20,fontWeight:900,color:'#fff',letterSpacing:-.5,lineHeight:1}}>TPDOP</div>
            </div>
          </div>

          {/* Lang toggle */}
          <div style={{display:'flex',background:'rgba(0,0,0,.3)',backdropFilter:'blur(4px)',border:'1px solid rgba(255,255,255,.1)',borderRadius:999,padding:4,gap:2}}>
            {[{c:'sw',l:'SW'},{c:'en',l:'EN'}].map(it => {
              const on = lang === it.c
              return (
                <button key={it.c} onClick={()=>setLang(it.c)} style={{
                  padding:'6px 20px', borderRadius:999, border:'none', cursor:'pointer',
                  fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:700,
                  background: on ? '#1E3A6E' : 'transparent',
                  color: on ? '#fff' : 'rgba(255,255,255,.5)',
                  boxShadow: on ? '0 2px 8px rgba(0,0,0,.3)' : 'none',
                  transition: 'all .14s',
                }}>{it.l}</button>
              )
            })}
          </div>
        </div>

        {/* Center content */}
        <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',padding:'48px 0'}}>
          <div style={{fontSize:12,fontWeight:600,color:'rgba(255,255,255,.5)',letterSpacing:1.5,marginBottom:8}}>
            {sw ? 'JAMHURI YA MUUNGANO WA TANZANIA' : 'UNITED REPUBLIC OF TANZANIA'}
          </div>
          <div style={{fontSize:12,fontWeight:600,color:'rgba(255,255,255,.5)',letterSpacing:1.5,marginBottom:24}}>
            {sw ? 'WIZARA YA MAMBO YA NDANI YA NCHI' : 'MINISTRY OF HOME AFFAIRS'}
          </div>

          <h1 style={{fontSize:'clamp(48px,5.5vw,80px)',fontWeight:900,color:'#fff',lineHeight:1.05,letterSpacing:-2,margin:0}}>
            {sw ? 'JESHI LA' : 'TANZANIA'}<br/>
            <span style={{color:'#F57C00'}}>{sw ? 'POLISI TANZANIA' : 'POLICE'}</span>
          </h1>

          {/* Flag stripe */}
          <div style={{display:'flex',marginTop:24,marginBottom:32,width:192}}>
            <div style={{width:72,height:4,background:'#1DB954'}}/>
            <div style={{width:36,height:4,background:'#FFD700'}}/>
            <div style={{width:20,height:4,background:'#111'}}/>
            <div style={{width:58,height:4,background:'#1EB2FC'}}/>
          </div>

          {/* Badge + officer illustration */}
          <div style={{position:'relative',marginTop:32,display:'flex',flexDirection:'column',alignItems:'center'}}>
            <div style={{position:'absolute',bottom:-24,left:'50%',transform:'translateX(-50%)',width:320,height:192,borderRadius:'50%',background:'rgba(30,58,110,.2)',filter:'blur(40px)'}}/>
            <div style={{marginBottom:16,filter:'drop-shadow(0 16px 32px rgba(0,0,0,.5))',position:'relative'}}>
              <PoliceBadge size={100} />
            </div>
            <div style={{fontSize:96,filter:'drop-shadow(0 16px 32px rgba(0,0,0,.5))',position:'relative'}}>👮</div>
            <div style={{fontSize:48,marginTop:-12,opacity:.6,filter:'drop-shadow(0 8px 16px rgba(0,0,0,.5))',position:'relative'}}>🚔</div>
          </div>
        </div>
      </div>

      {/* ════════════ RIGHT LOGIN CARD ════════════ */}
      <div style={{
        width:'100%', maxWidth:480,
        background:'#fff',
        boxShadow:'-24px 0 64px rgba(0,0,0,.5)',
        display:'flex', flexDirection:'column', justifyContent:'center',
        padding:'48px',
        position:'relative', zIndex:1,
      }}>

        {/* Header */}
        <div style={{marginBottom:32}}>
          <h2 style={{fontSize:22,fontWeight:900,color:'#1E3A6E',letterSpacing:-.4,lineHeight:1.1,margin:0}}>
            {sw ? 'INGIA KWENYE MFUMO' : 'SYSTEM LOGIN'}
          </h2>
          <p style={{fontSize:12,color:'#888',margin:0,marginTop:4}}>
            {sw ? 'Tumia taarifa zako za kazi kuendelea' : 'Use your service credentials'}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{marginBottom:24,padding:'12px 14px',background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:10,color:'#B91C1C',fontSize:12.5,display:'flex',alignItems:'center',gap:6}}>
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Badge field */}
        <div style={{marginBottom:20}}>
          <label style={{display:'block',fontSize:12,fontWeight:600,color:'#374151',marginBottom:6}}>
            {sw ? 'Namba ya Utambulisho' : 'Service / Badge Number'}
            {sw && <span style={{fontWeight:400,color:'#9CA3AF'}}> (Service / Badge No.)</span>}
          </label>
          <div style={{position:'relative'}}>
            <span style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',fontSize:14,color:'#9CA3AF'}}>☐</span>
            <input
              type="text"
              value={badge}
              onChange={e=>setBadge(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&login()}
              placeholder={sw ? 'Weka namba yako ya utambulisho' : 'Enter your badge number'}
              style={{
                width:'100%',padding:'12px 16px 12px 36px',
                background:'#F9FAFB',border:'1px solid #E5E7EB',borderRadius:8,
                fontSize:13.5,fontFamily:'Inter,sans-serif',outline:'none',
                color:'#111',boxSizing:'border-box',transition:'all .14s',
              }}
              onFocus={e=>{e.target.style.borderColor='#1E3A6E';e.target.style.background='#fff'}}
              onBlur={e=>{e.target.style.borderColor='#E5E7EB';e.target.style.background='#F9FAFB'}}
            />
          </div>
        </div>

        {/* Password field */}
        <div style={{marginBottom:16}}>
          <label style={{display:'block',fontSize:12,fontWeight:600,color:'#374151',marginBottom:6}}>
            {sw ? 'Nenosiri' : 'Password'}
            {sw && <span style={{fontWeight:400,color:'#9CA3AF'}}> (Password)</span>}
          </label>
          <div style={{position:'relative'}}>
            <span style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',fontSize:14,color:'#9CA3AF'}}>☑</span>
            <input
              type="password"
              value={pass}
              onChange={e=>setPass(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&login()}
              placeholder={sw ? 'Weka nenosiri lako' : 'Enter your password'}
              style={{
                width:'100%',padding:'12px 16px 12px 36px',
                background:'#F9FAFB',border:'1px solid #E5E7EB',borderRadius:8,
                fontSize:13.5,fontFamily:'Inter,sans-serif',outline:'none',
                color:'#111',boxSizing:'border-box',transition:'all .14s',
              }}
              onFocus={e=>{e.target.style.borderColor='#1E3A6E';e.target.style.background='#fff'}}
              onBlur={e=>{e.target.style.borderColor='#E5E7EB';e.target.style.background='#F9FAFB'}}
            />
          </div>
        </div>

        {/* Options row */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:32}}>
          <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer'}}>
            <div onClick={()=>setRem(!remember)}
              style={{
                width:16,height:16,borderRadius:4,
                border:`1px solid ${remember?'#1E3A6E':'#D1D5DB'}`,
                background:remember?'#1E3A6E':'#fff',
                display:'flex',alignItems:'center',justifyContent:'center',
                transition:'all .14s',flexShrink:0,
              }}>
              {remember && <span style={{color:'#fff',fontSize:10,fontWeight:700,lineHeight:1}}>✓</span>}
            </div>
            <span style={{fontSize:14,color:'#374151'}}>
              {sw ? 'Kumbuka mimi' : 'Remember me'}
            </span>
          </label>
          <button style={{background:'none',border:'none',cursor:'pointer',fontSize:14,color:'#1E3A6E',fontFamily:'Inter,sans-serif',textDecoration:'none'}}
            onMouseEnter={e=>e.target.style.textDecoration='underline'}
            onMouseLeave={e=>e.target.style.textDecoration='none'}>
            {sw ? 'Umesahau nenosiri?' : 'Forgot password?'}
          </button>
        </div>

        {/* Login button */}
        <button onClick={login} disabled={loading}
          style={{
            width:'100%',padding:'14px',borderRadius:10,
            background:loading?'rgba(30,58,110,.7)':'#1E3A6E',
            color:'#fff',border:'none',
            fontSize:15,fontWeight:700,fontFamily:'Inter,sans-serif',
            cursor:loading?'not-allowed':'pointer',
            transition:'all .14s',
          }}
          onMouseEnter={e=>{if(!loading)e.currentTarget.style.background='#234086'}}
          onMouseLeave={e=>{if(!loading)e.currentTarget.style.background='#1E3A6E'}}>
          {loading ? (sw ? 'Inaingia...' : 'Logging in...') : (sw ? 'INGIA' : 'LOGIN')}
        </button>

        {/* Footer links */}
        <div style={{display:'flex',justifyContent:'center',gap:48,marginTop:32,paddingTop:24,borderTop:'1px solid #F3F4F6'}}>
          {[sw?'Msaada':'Help',sw?'Serikali':'Govt',sw?'Kuhusu':'About'].map(l => (
            <button key={l} style={{background:'none',border:'none',cursor:'pointer',fontSize:14,color:'#6B7280',fontFamily:'Inter,sans-serif',transition:'color .14s'}}
              onMouseEnter={e=>e.target.style.color='#374151'}
              onMouseLeave={e=>e.target.style.color='#6B7280'}>
              {l}
            </button>
          ))}
        </div>

        {/* Copyright */}
        <div style={{textAlign:'center',fontSize:11,color:'#9CA3AF',marginTop:24}}>
          © 2024 Tanzania Police Force · {sw ? 'Haki zote zimehifadhiwa.' : 'All rights reserved.'}
        </div>
      </div>
    </div>
  )
}
