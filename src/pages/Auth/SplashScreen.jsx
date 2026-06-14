import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SplashScreen() {
  const nav = useNavigate()
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Inapakia...')
  const [loadingText, setLoadingText] = useState('Loading...')

  useEffect(() => {
    const stages = [
      { sw:'Inapakia...', en:'Loading...', pct:15, delay:0 },
      { sw:'Inaunganisha seva...', en:'Connecting to server...', pct:35, delay:500 },
      { sw:'Inathibitisha usalama...', en:'Verifying security...', pct:60, delay:1000 },
      { sw:'Inapakia rasilimali...', en:'Loading resources...', pct:80, delay:1600 },
      { sw:'Inaandaa mfumo...', en:'Preparing system...', pct:95, delay:2100 },
      { sw:'Imekamilika!', en:'Complete!', pct:100, delay:2600 },
    ]
    stages.forEach(({ sw, en, pct, delay }) => {
      setTimeout(() => { setStatus(sw); setLoadingText(en); setProgress(pct) }, delay)
    })
    setTimeout(() => nav('/login'), 3200)
  }, [nav])

  const circumference = 2 * Math.PI * 18
  const dash = (progress / 100) * circumference

  return (
    <div style={{
      height: '100vh',
      background: 'linear-gradient(180deg, #060E07 0%, #0B1E0D 30%, #163B18 60%, #0A1B0B 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '52px 28px 36px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif",
    }}>

      {/* Watermark faint badge */}
      <div style={{ position:'absolute', right:-80, top:'15%', width:320, height:320, opacity:.04, pointerEvents:'none', fontSize:240, userSelect:'none' }}>🛡️</div>
      {/* Second watermark */}
      <div style={{ position:'absolute', left:-60, bottom:'20%', width:240, height:240, opacity:.03, pointerEvents:'none', fontSize:180, userSelect:'none' }}>🇹🇿</div>

      {/* ── TOP: badge + title ── */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', zIndex:1 }}>
        {/* Large SVG badge */}
        <div style={{ marginBottom:22, filter:'drop-shadow(0 12px 36px rgba(0,0,0,.7))' }}>
          <svg width="150" height="150" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="#1B5E20" stroke="#FFC107" strokeWidth="2.5"/>
            <circle cx="50" cy="50" r="40" fill="white"/>
            <circle cx="50" cy="50" r="36" fill="#1B5E20"/>
            {/* Emblem */}
            <line x1="34" y1="28" x2="66" y2="72" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
            <line x1="66" y1="28" x2="34" y2="72" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
            <line x1="50" y1="24" x2="50" y2="76" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
            <circle cx="50" cy="50" r="5.5" fill="#FFC107"/>
            {/* Flame */}
            <ellipse cx="50" cy="12" rx="7" ry="11" fill="#E65100"/>
            <ellipse cx="49" cy="15" rx="4.5" ry="6.5" fill="#FF6F00"/>
            <ellipse cx="50" cy="17" rx="2.8" ry="4" fill="#FFC107"/>
            {/* Text */}
            <text x="50" y="43" textAnchor="middle" fontSize="5.5" fontWeight="800" fill="white" letterSpacing="2.5">TANZANIA</text>
            <text x="50" y="62" textAnchor="middle" fontSize="7" fontWeight="900" fill="white" letterSpacing="1.5">POLISI</text>
            <path d="M 22 70 Q 50 84 78 70" stroke="#FFC107" strokeWidth="1.5" fill="none"/>
            <text x="50" y="78" textAnchor="middle" fontSize="3.8" fontWeight="700" fill="#FFC107" letterSpacing=".8">USALAMA WA RAIA</text>
          </svg>
        </div>

        {/* Title */}
        <div style={{ fontSize:42, fontWeight:900, color:'#fff', letterSpacing:-1.5, textAlign:'center', lineHeight:1 }}>
          TANZANIA POLICE
        </div>

        {/* Flag stripe */}
        <div style={{ display:'flex', margin:'12px 0 10px', gap:0 }}>
          {[['#1DB954',50],['#FFD700',26],['#111111',14],['#1EB2FC',36]].map(([c,w]) => (
            <div key={c} style={{ width:w, height:3.5, background:c }} />
          ))}
        </div>

        <div style={{ fontSize:13, fontWeight:700, color:'rgba(255,255,255,.75)', letterSpacing:2.5, textTransform:'uppercase', marginBottom:10 }}>
          DIGITAL OPERATIONS PLATFORM
        </div>

        <div style={{ width:36, height:1.5, background:'#FFC107', marginBottom:14 }} />

        <div style={{ fontSize:15, fontWeight:700, color:'#FFC107', letterSpacing:.4, marginBottom:4 }}>
          Kulinda • Kutumikia • Kuweka Usalama
        </div>
        <div style={{ fontSize:12.5, color:'rgba(255,255,255,.4)', letterSpacing:.4 }}>
          Protect • Serve • Secure
        </div>
      </div>

      {/* ── CENTER: Officer hero ── */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', position:'relative', width:'100%' }}>
        {/* Glow behind officer */}
        <div style={{ position:'absolute', width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle, rgba(46,125,50,.2) 0%, transparent 70%)', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }} />

        {/* Officer */}
        <div style={{ fontSize:130, lineHeight:1, filter:'drop-shadow(0 20px 48px rgba(0,0,0,.9))', position:'relative', zIndex:1 }}>👮</div>

        {/* Police car */}
        <div style={{ fontSize:64, marginTop:-24, opacity:.55, zIndex:1, position:'relative', filter:'drop-shadow(0 8px 20px rgba(0,0,0,.8))' }}>🚔</div>

        {/* Gradient fade at bottom */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:100, background:'linear-gradient(0deg, rgba(6,14,7,.9), transparent)', zIndex:2 }} />
      </div>

      {/* ── BOTTOM: loading + footer ── */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:10, zIndex:1 }}>
        {/* SVG spinner */}
        <div style={{ position:'relative', width:46, height:46 }}>
          <svg width="46" height="46" viewBox="0 0 46 46" style={{ transform:'rotate(-90deg)' }}>
            <circle cx="23" cy="23" r="18" fill="none" stroke="rgba(255,193,7,.12)" strokeWidth="3.5"/>
            <circle cx="23" cy="23" r="18" fill="none" stroke="#FFC107" strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circumference}`}
              style={{ transition:'stroke-dasharray .5s ease' }}/>
          </svg>
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:700, color:'#FFC107' }}>
            {progress}
          </div>
        </div>

        <div style={{ fontSize:14.5, fontWeight:600, color:'rgba(255,255,255,.9)', letterSpacing:.2 }}>{status}</div>
        <div style={{ fontSize:12, color:'rgba(255,255,255,.35)' }}>{loadingText}</div>

        {/* Footer */}
        <div style={{ marginTop:12, display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ fontSize:18 }}>🇹🇿</div>
          <div style={{ fontSize:12, fontWeight:700, color:'rgba(255,255,255,.6)', letterSpacing:.8, textTransform:'uppercase' }}>Tanzania Police Force</div>
        </div>
        <div style={{ fontSize:11, color:'rgba(255,255,255,.25)', textAlign:'center' }}>
          Haki zote zimehifadhiwa. © 2024
        </div>
      </div>
    </div>
  )
}
