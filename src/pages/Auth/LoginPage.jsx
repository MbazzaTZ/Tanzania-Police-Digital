import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PoliceBadge from '@components/shared/PoliceBadge'

export default function LoginPage() {
  const nav = useNavigate()
  const [lang, setLang]   = useState('sw')
  const [badge, setBadge] = useState('')
  const [pass, setPass]   = useState('')
  const [show, setShow]   = useState(false)
  const [rem, setRem]     = useState(true)
  const [busy, setBusy]   = useState(false)
  const [err, setErr]     = useState('')

  const sw = lang === 'sw'

  const login = () => {
    if (!badge || !pass) {
      setErr(sw ? 'Tafadhali jaza namba ya utambulisho na nenosiri' : 'Please enter badge number and password')
      return
    }
    setErr('')
    setBusy(true)
    setTimeout(() => { setBusy(false); nav('/dashboard') }, 1400)
  }

  return (
    <div style={{
      minHeight:'100vh', display:'flex',
      background:'linear-gradient(160deg,#070C1A 0%,#0D1430 45%,#1E3A6E 100%)',
      fontFamily:"'Inter',system-ui,sans-serif",
      position:'relative', overflow:'hidden',
    }}>

      {/* Grid overlay */}
      <div style={{position:'absolute',inset:0,pointerEvents:'none',backgroundImage:'linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)',backgroundSize:'40px 40px'}}/>
      {/* Glow */}
      <div style={{position:'absolute',top:'20%',left:'15%',width:400,height:400,background:'radial-gradient(circle,rgba(30,58,110,.2) 0%,transparent 70%)',pointerEvents:'none'}}/>

      {/* ══════════════ LEFT HERO ══════════════ */}
      <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'40px 48px',position:'relative',minWidth:0}}>

        {/* Top row: badge + lang toggle */}
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',position:'relative',zIndex:1}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <PoliceBadge size={52} />
            <div>
              <div style={{fontSize:10,color:'rgba(255,255,255,.45)',letterSpacing:1.5,textTransform:'uppercase',marginBottom:1}}>Jeshi la Polisi Tanzania</div>
              <div style={{fontSize:18,fontWeight:900,color:'#fff',letterSpacing:-.5,lineHeight:1}}>TPDOP</div>
            </div>
          </div>

          {/* SW/EN */}
          <div style={{display:'flex',background:'rgba(0,0,0,.4)',border:'1px solid rgba(255,255,255,.12)',borderRadius:22,padding:3,gap:2}}>
            {['SW','EN'].map(l => (
              <button key={l} onClick={()=>setLang(l.toLowerCase())} style={{
                padding:'5px 14px',borderRadius:18,border:'none',cursor:'pointer',
                fontFamily:'Inter,sans-serif',fontSize:11,fontWeight:700,
                background:lang===l.toLowerCase()?'#1E3A6E':'transparent',
                color:lang===l.toLowerCase()?'#fff':'rgba(255,255,255,.5)',
                transition:'all .14s',
              }}>{l}</button>
            ))}
          </div>
        </div>

        {/* Center content */}
        <div style={{position:'relative',zIndex:1,flex:1,display:'flex',flexDirection:'column',justifyContent:'center',paddingTop:24}}>
          <div style={{fontSize:'clamp(40px,5vw,70px)',fontWeight:900,color:'#fff',lineHeight:1.0,letterSpacing:-2,marginBottom:14}}>
            TANZANIA<br/><span style={{color:'#F57C00'}}>POLICE</span>
          </div>

          {/* Flag stripe */}
          <div style={{display:'flex',gap:0,marginBottom:14,width:160}}>
            {[['#1DB954',62],['#FFD700',31],['#111',17],['#1EB2FC',50]].map(([c,w])=>(
              <div key={c} style={{width:w,height:4,background:c}}/>
            ))}
          </div>

          <div style={{fontSize:12,fontWeight:700,color:'rgba(255,255,255,.6)',letterSpacing:2.5,textTransform:'uppercase',marginBottom:6}}>
            DIGITAL OPERATIONS PLATFORM
          </div>
          <div style={{fontSize:12,color:'rgba(255,255,255,.35)',letterSpacing:.5}}>
            Kulinda • Kutumikia • Kuweka Usalama
          </div>

          {/* Large badge + officer */}
          <div style={{marginTop:40,display:'flex',flexDirection:'column',alignItems:'center',position:'relative'}}>
            <div style={{position:'absolute',bottom:-20,left:'50%',transform:'translateX(-50%)',width:280,height:200,background:'radial-gradient(ellipse,rgba(30,58,110,.25) 0%,transparent 70%)',pointerEvents:'none'}}/>
            {/* Big badge */}
            <div style={{marginBottom:16,filter:'drop-shadow(0 12px 32px rgba(0,0,0,.8))'}}>
              <PoliceBadge size={110} />
            </div>
            {/* Officer */}
            <div style={{fontSize:100,lineHeight:1,filter:'drop-shadow(0 12px 32px rgba(0,0,0,.7))'}}>👮</div>
            <div style={{fontSize:50,marginTop:-14,opacity:.55,filter:'drop-shadow(0 6px 16px rgba(0,0,0,.7))'}}>🚔</div>
          </div>
        </div>

        {/* Bottom stats */}
        <div style={{position:'relative',zIndex:1}}>
          <div style={{display:'flex',gap:24}}>
            {[['👮','1,247+','Maafisa'],['🏢','312','Vituo'],['🇹🇿','26','Mikoa']].map(([ic,n,l])=>(
              <div key={l} style={{textAlign:'center'}}>
                <div style={{fontSize:16}}>{ic}</div>
                <div style={{fontSize:18,fontWeight:800,color:'#F57C00',fontFamily:'monospace',lineHeight:1}}>{n}</div>
                <div style={{fontSize:10,color:'rgba(255,255,255,.4)',textTransform:'uppercase',letterSpacing:.5}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════ RIGHT LOGIN CARD ══════════════ */}
      <div style={{
        width:460,flexShrink:0,
        background:'#fff',
        display:'flex',flexDirection:'column',justifyContent:'center',
        padding:'52px 44px',
        boxShadow:'-24px 0 64px rgba(0,0,0,.45)',
        position:'relative',
      }}>

        {/* Card header with BADGE */}
        <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:32}}>
          <PoliceBadge size={52} />
          <div>
            <div style={{fontSize:16,fontWeight:900,color:'#1E3A6E',letterSpacing:-.4,lineHeight:1.1}}>
              {sw ? 'INGIA KWENYE MFUMO' : 'SYSTEM LOGIN'}
            </div>
            <div style={{fontSize:12,color:'#888',marginTop:3}}>
              {sw ? 'Tumia taarifa zako za kazi kuendelea' : 'Use your service credentials'}
            </div>
          </div>
        </div>

        {/* Error */}
        {err && (
          <div style={{background:'#FFF3F3',border:'1px solid #FFCDD2',borderRadius:8,padding:'10px 14px',fontSize:12.5,color:'#C62828',marginBottom:16,display:'flex',alignItems:'center',gap:6}}>
            ⚠️ {err}
          </div>
        )}

        {/* Badge No. */}
        <div style={{marginBottom:16}}>
          <label style={{display:'block',fontSize:12,fontWeight:600,color:'#444',marginBottom:5}}>
            {sw?'Namba ya Utambulisho (Service / Badge No.)':'Service / Badge Number'}
          </label>
          <div style={{position:'relative'}}>
            <span style={{position:'absolute',left:13,top:'50%',transform:'translateY(-50%)',fontSize:17,color:'#AAA'}}>🪪</span>
            <input type="text" value={badge} onChange={e=>setBadge(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&login()}
              placeholder={sw?'Weka namba yako ya utambulisho':'Enter your badge number'}
              style={{width:'100%',padding:'13px 14px 13px 42px',border:'1.5px solid #DDD',borderRadius:10,fontSize:13.5,fontFamily:'Inter,sans-serif',outline:'none',background:'#FAFAFA',color:'#111',boxSizing:'border-box',transition:'border-color .14s,background .14s'}}
              onFocus={e=>{e.target.style.borderColor='#1E3A6E';e.target.style.background='#fff'}}
              onBlur={e=>{e.target.style.borderColor='#DDD';e.target.style.background='#FAFAFA'}}
            />
          </div>
        </div>

        {/* Password */}
        <div style={{marginBottom:14}}>
          <label style={{display:'block',fontSize:12,fontWeight:600,color:'#444',marginBottom:5}}>
            {sw?'Nenosiri (Password)':'Password'}
          </label>
          <div style={{position:'relative'}}>
            <span style={{position:'absolute',left:13,top:'50%',transform:'translateY(-50%)',fontSize:17,color:'#AAA'}}>🔒</span>
            <input type={show?'text':'password'} value={pass} onChange={e=>setPass(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&login()}
              placeholder={sw?'Weka nenosiri lako':'Enter your password'}
              style={{width:'100%',padding:'13px 42px 13px 42px',border:'1.5px solid #DDD',borderRadius:10,fontSize:13.5,fontFamily:'Inter,sans-serif',outline:'none',background:'#FAFAFA',color:'#111',boxSizing:'border-box',transition:'border-color .14s,background .14s'}}
              onFocus={e=>{e.target.style.borderColor='#1E3A6E';e.target.style.background='#fff'}}
              onBlur={e=>{e.target.style.borderColor='#DDD';e.target.style.background='#FAFAFA'}}
            />
            <button onClick={()=>setShow(!show)} style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',fontSize:16,color:'#AAA',lineHeight:1,padding:4}}>
              {show?'🙈':'👁️'}
            </button>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
          <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer'}}>
            <div onClick={()=>setRem(!rem)} style={{width:18,height:18,borderRadius:5,border:`2px solid ${rem?'#1E3A6E':'#CCC'}`,background:rem?'#1E3A6E':'#fff',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .14s',flexShrink:0}}>
              {rem&&<span style={{color:'#fff',fontSize:11,fontWeight:700,lineHeight:1}}>✓</span>}
            </div>
            <span style={{fontSize:13,color:'#555'}}>{sw?'Kumbuka mimi':'Remember me'}</span>
          </label>
          <button style={{background:'none',border:'none',cursor:'pointer',fontSize:13,color:'#1E3A6E',fontWeight:700,fontFamily:'Inter,sans-serif'}}>
            {sw?'Umesahau nenosiri?':'Forgot password?'}
          </button>
        </div>

        {/* INGIA button */}
        <button onClick={login} disabled={busy} style={{
          width:'100%',padding:'15px',
          background:busy?'#234086':'#1E3A6E',
          color:'#fff',border:'none',borderRadius:12,
          fontSize:15,fontWeight:700,fontFamily:'Inter,sans-serif',
          cursor:busy?'not-allowed':'pointer',
          display:'flex',alignItems:'center',justifyContent:'center',gap:8,
          boxShadow:'0 4px 20px rgba(30,58,110,.4)',transition:'all .14s',
        }}
          onMouseEnter={e=>{if(!busy)e.currentTarget.style.background='#234086'}}
          onMouseLeave={e=>{if(!busy)e.currentTarget.style.background='#1E3A6E'}}>
          {busy?'⏳ Inaingia...':<><span style={{fontSize:18}}>🔒</span>{sw?'INGIA':'LOGIN'}</>}
        </button>

        {/* Footer */}
        <div style={{display:'flex',justifyContent:'space-around',paddingTop:24,borderTop:'1px solid #F0F0F0',marginTop:28}}>
          {[['💬',sw?'Msaada':'Help'],['🛡️',sw?'Serikali':'Govt'],['ℹ️',sw?'Kuhusu':'About']].map(([ic,lb])=>(
            <div key={lb} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4,cursor:'pointer'}}>
              <span style={{fontSize:18}}>{ic}</span>
              <span style={{fontSize:11,color:'#AAA',fontWeight:500}}>{lb}</span>
            </div>
          ))}
        </div>

        <div style={{textAlign:'center',fontSize:11,color:'#CCC',marginTop:12}}>
          © 2024 Tanzania Police Force · Haki zote zimehifadhiwa.
        </div>
      </div>
    </div>
  )
}
