import { useState } from 'react'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Button from '@components/ui/Button'
import { MOCK_MESSAGES } from '@utils/mockData'
export default function Communications() {
  const [selected, setSelected] = useState(MOCK_MESSAGES[0])
  const [newMsg, setNewMsg] = useState('')
  return (
    <div className="animate-fade-in">
      <div className="breadcrumb"><a href="/">🏠</a><span>›</span>Mawasiliano</div>
      <div className="page-header"><div><h1>💬 Mawasiliano</h1><p>Ujumbe, Taarifa za Haraka na Escalations</p></div><Button variant="accent">+ Ujumbe Mpya</Button></div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:16,height:500}}>
        <Card style={{overflow:'hidden',display:'flex',flexDirection:'column'}}>
          <CardHeader title="📬 Inbox" subtitle={`${MOCK_MESSAGES.filter(m=>!m.read).length} mpya`} />
          <div style={{flex:1,overflowY:'auto',padding:8}}>
            {MOCK_MESSAGES.map(m => (
              <div key={m.id} onClick={() => setSelected(m)}
                style={{padding:'10px 12px',borderRadius:'var(--r)',marginBottom:4,cursor:'pointer',background:selected?.id===m.id?'var(--clr-primary)':'transparent',border:'1px solid',borderColor:selected?.id===m.id?'var(--clr-secondary)':'var(--clr-border)'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                  <div style={{fontSize:12,fontWeight:m.read?500:700,color:'var(--clr-white)'}}>{m.from}</div>
                  <span style={{fontSize:9,background:m.priority==='urgent'?'rgba(198,40,40,.2)':'rgba(21,101,192,.2)',color:m.priority==='urgent'?'#EF5350':'#64B5F6',padding:'1px 6px',borderRadius:10}}>{m.priority}</span>
                </div>
                <div style={{fontSize:11,color:'var(--clr-muted)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{m.content}</div>
                <div style={{fontSize:9,color:'var(--clr-muted)',marginTop:4,opacity:.7}}>{m.time}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card style={{display:'flex',flexDirection:'column'}}>
          {selected ? (
            <>
              <CardHeader title={`Kutoka: ${selected.from}`} subtitle={`Kwenda: ${selected.to} · ${selected.time}`} />
              <div style={{flex:1,padding:16,overflowY:'auto'}}>
                <div style={{background:'var(--clr-dark)',borderRadius:'var(--r)',padding:16,fontSize:13,color:'var(--clr-text)',lineHeight:1.6}}>{selected.content}</div>
              </div>
              <div style={{padding:16,borderTop:'1px solid var(--clr-border)',display:'flex',gap:8}}>
                <input className="form-input" style={{flex:1}} placeholder="Andika jibu..." value={newMsg} onChange={e=>setNewMsg(e.target.value)} />
                <Button variant="primary">Tuma ↗</Button>
              </div>
            </>
          ) : (
            <CardBody><div style={{textAlign:'center',padding:40,color:'var(--clr-muted)'}}>Chagua ujumbe kuona</div></CardBody>
          )}
        </Card>
      </div>
    </div>
  )
}
