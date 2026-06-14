import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PoliceBadge from '@components/shared/PoliceBadge'

export default function SplashScreen() {
  const nav = useNavigate()
  const [progress, setProgress] = useState(0)
  const [status, setStatus]     = useState('Inapakia...')
  const [engStatus, setEng]     = useState('Loading...')

  useEffect(() => {
    const stages = [
      { sw:'Inapakia...',              en:'Loading...',              pct:15,  d:0    },
      { sw:'Inaunganisha seva...',      en:'Connecting to server...', pct:35,  d:500  },
      { sw:'Inathibitisha usalama...', en:'Verifying security...',   pct:60,  d:1000 },
      { sw:'Inapakia rasilimali...',   en:'Loading resources...',    pct:80,  d:1600 },
      { sw:'Inaandaa mfumo...',        en:'Preparing system...',     pct:95,  d:2100 },
      { sw:'Imekamilika!',             en:'Complete!',               pct:100, d:2600 },
    ]
    stages.forEach(({ sw, en, pct, d }) => {
      setTimeout(() => { setStatus(sw); setEng(en); setProgress(pct) }, d)
    })
    setTimeout(() => nav('/login'), 3200)
  }, [nav])

  const circ = 2 * Math.PI * 20
  const dash  = (progress / 100) * circ

  return (
    <div style={{
      height: '100vh',
      background: 'linear-gradient(180deg,#070C1A 0%,#0B1430 35%,#1E3A6E 65%,#0A1228 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'space-between',
      padding: '52px 28px 36px',
      position: 'relative', overflow: 'hidden',
      fontFamily: "'Inter',sans-serif",
    }}>

      {/* Faint watermark grid */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none',
        backgroundImage:'linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)',
        backgroundSize:'40px 40px',
      }}/>

      {/* Glow */}
      <div style={{position:'absolute',top:'30%',left:'50%',transform:'translateX(-50%)',width:360,height:360,background:'radial-gradient(circle,rgba(30,58,110,.35) 0%,transparent 70%)',pointerEvents:'none'}}/>

      {/* ── TOP: badge + title ── */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', zIndex:1 }}>
        {/* POLICE BADGE */}
        <div style={{ marginBottom:20, filter:'drop-shadow(0 8px 24px rgba(0,0,0,.7))' }}>
          <PoliceBadge size={130} />
        </div>

        {/* Title */}
        <div style={{ fontSize:38, fontWeight:900, color:'#fff', letterSpacing:-1.5, lineHeight:1.05, textAlign:'center', marginBottom:8 }}>
          TANZANIA POLICE
        </div>

        {/* Tanzania flag stripe */}
        <div style={{ display:'flex', gap:0, marginBottom:10 }}>
          {[['#1DB954',50],['#FFD700',25],['#111',14],['#1EB2FC',38]].map(([c,w]) => (
            <div key={c} style={{ width:w, height:4, background:c }} />
          ))}
        </div>

        <div style={{ fontSize:12.5, fontWeight:700, color:'rgba(255,255,255,.65)', letterSpacing:2.5, textTransform:'uppercase', marginBottom:10 }}>
          DIGITAL OPERATIONS PLATFORM
        </div>
        <div style={{ width:36, height:1.5, background:'#F57C00', marginBottom:14 }}/>
        <div style={{ fontSize:14, fontWeight:700, color:'#F57C00', letterSpacing:.4, marginBottom:4 }}>
          Kulinda • Kutumikia • Kuweka Usalama
        </div>
        <div style={{ fontSize:12, color:'rgba(255,255,255,.38)', letterSpacing:.4 }}>
          Protect • Serve • Secure
        </div>
      </div>

      {/* ── CENTER: Officer silhouette ── */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', position:'relative', width:'100%' }}>
        <div style={{ position:'absolute', width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle,rgba(30,58,110,.25) 0%,transparent 70%)', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }}/>
        <div style={{ fontSize:130, lineHeight:1, filter:'drop-shadow(0 16px 40px rgba(0,0,0,.9))', position:'relative', zIndex:1 }}>👮</div>
        <div style={{ fontSize:60, marginTop:-20, opacity:.55, position:'relative', zIndex:1, filter:'drop-shadow(0 6px 16px rgba(0,0,0,.8))' }}>🚔</div>
        {/* Bottom gradient fade */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:80, background:'linear-gradient(0deg,rgba(7,12,26,.9),transparent)', zIndex:2 }}/>
      </div>

      {/* ── BOTTOM: loading ── */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, zIndex:1 }}>
        {/* Progress ring */}
        <div style={{ position:'relative', width:48, height:48 }}>
          <svg width="48" height="48" viewBox="0 0 48 48" style={{ transform:'rotate(-90deg)' }}>
            <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(245,124,0,.15)" strokeWidth="3.5"/>
            <circle cx="24" cy="24" r="20" fill="none" stroke="#F57C00" strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circ}`}
              style={{ transition:'stroke-dasharray .5s ease' }}/>
          </svg>
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'#F57C00' }}>
            {progress}
          </div>
        </div>

        <div style={{ fontSize:14.5, fontWeight:600, color:'rgba(255,255,255,.9)' }}>{status}</div>
        <div style={{ fontSize:12, color:'rgba(255,255,255,.35)' }}>{engStatus}</div>

        {/* Footer */}
        <div style={{ marginTop:14, display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ fontSize:18 }}>🇹🇿</span>
          <span style={{ fontSize:12, fontWeight:700, color:'rgba(255,255,255,.55)', letterSpacing:.8, textTransform:'uppercase' }}>Tanzania Police Force</span>
        </div>
        <div style={{ fontSize:11, color:'rgba(255,255,255,.25)', textAlign:'center' }}>
          Haki zote zimehifadhiwa. © 2024
        </div>
      </div>
    </div>
  )
}
