import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Button from '@components/ui/Button'
import { MOCK_ALERTS } from '@utils/mockData'
import { ALERT_CONFIG } from '@utils/helpers'
export default function Alerts() {
  const [alerts, setAlerts] = useState(MOCK_ALERTS)
  const markRead = (id) => setAlerts(prev => prev.map(a => a.id===id ? {...a,read:true} : a))
  return (
    <div className="afd">
      <div className="bc"><a href="/dashboard">🏠</a><span>›</span>Operesheni<span>›</span>Taarifa za Haraka</div>
      <div className="ph">
        <div><h1>🚨 Taarifa za Haraka</h1><p>Taarifa {alerts.filter(a=>!a.read).length} za kusomwa · Jumla {alerts.length}</p></div>
        <div className="flex g8"><Button variant="o">Soma Zote</Button><Button variant="g">+ Taarifa Mpya</Button></div>
      </div>
      <Card>
        <CardBody>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {alerts.map(a => {
              const cfg = ALERT_CONFIG[a.type]
              return (
                <div key={a.id} style={{display:'flex',alignItems:'flex-start',gap:12,padding:'12px 14px',borderRadius:'var(--r)',borderLeft:`3px solid ${cfg.dot}`,background:a.read?'rgba(255,255,255,.02)':cfg.bg,cursor:'pointer',transition:'var(--t)'}}>
                  <div style={{width:10,height:10,borderRadius:'50%',background:a.read?'#555':cfg.dot,flexShrink:0,marginTop:4}} />
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:a.read?500:700,color:a.read?'var(--text-muted)':'var(--text-white)'}}>{a.title}</div>
                    <div style={{fontSize:11,color:'var(--text-muted)',marginTop:3}}>{a.desc}</div>
                    <div style={{fontSize:10,color:'var(--text-muted)',marginTop:3,opacity:.7}}>🕐 {a.time}</div>
                  </div>
                  <div style={{display:'flex',flexDirection:'column',gap:6,alignItems:'flex-end'}}>
                    <span style={{fontSize:9,fontWeight:700,padding:'2px 8px',borderRadius:10,background:`${cfg.dot}22`,color:cfg.dot,textTransform:'uppercase'}}>{cfg.label}</span>
                    {!a.read && <Button variant="o" size="sm" onClick={() => markRead(a.id)}>Soma</Button>}
                  </div>
                </div>
              )
            })}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
