import { useState } from 'react'
import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Button from '@components/ui/Button'
import { MOCK_EVIDENCE } from '@utils/mockData'
export default function Evidence() {
  const [selected,setSelected]=useState(null)
  return (
    <div className="animate-fade-in">
      <div className="breadcrumb"><a href="/">🏠</a><span>›</span>Uchunguzi<span>›</span>Ushahidi</div>
      <div className="page-header">
        <div><h1>🔬 Ushahidi / Evidence</h1><p>Usimamizi wa ushahidi na chain of custody</p></div>
        <Button variant="accent">+ Ongeza Ushahidi</Button>
      </div>
      <div className="stat-grid stat-grid-4 section-gap">
        <StatCard icon="🔬" value={2847}  label="Ushahidi Jumla"        color="blue" />
        <StatCard icon="✅" value={2612}  label="Unaotunzwa Vizuri"      delta="5%"  color="green" />
        <StatCard icon="⚠️" value={23}    label="Unaohitaji Umakini"                 color="amber" />
        <StatCard icon="🚨" value={12}    label="Tamper Imegunduliwa"               color="red" />
      </div>
      <div className="info-box section-gap">🔒 Kila ushahidi una chain of custody inayorekodi: Aliyekusanya → Aliyehifadhi → Aliyechunguza → Mahakamani. Mfumo unagunduwa mabadiliko yoyote ya haramu.</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1.5fr',gap:16}}>
        <Card>
          <CardHeader title="🔬 Ushahidi Wote" />
          <CardBody noPadding>
            {MOCK_EVIDENCE.map(e=>(
              <div key={e.id} onClick={()=>setSelected(e)}
                style={{padding:'10px 14px',borderBottom:'1px solid rgba(255,255,255,.04)',cursor:'pointer',background:selected?.id===e.id?'rgba(46,125,50,.1)':'transparent'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
                  <span className="td-mono" style={{fontSize:10}}>{e.id}</span>
                  <span style={{fontSize:9,background:'rgba(255,255,255,.07)',padding:'1px 6px',borderRadius:8,color:'var(--text-muted)'}}>{e.type}</span>
                </div>
                <div style={{fontSize:12,fontWeight:600,color:'var(--text-white)',marginBottom:2}}>{e.description}</div>
                <div style={{fontSize:10,color:'var(--text-muted)'}}>{e.case} · {e.officer}</div>
              </div>
            ))}
          </CardBody>
        </Card>
        {selected ? (
          <Card>
            <CardHeader title={`🔬 ${selected.id}`} subtitle={selected.description} />
            <CardBody>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:16}}>
                {[['Aina',selected.type],['Faili',selected.file],['Ukubwa',selected.size],['Afisa',selected.officer],['Kesi',selected.case],['Tarehe',selected.date]].map(([l,v])=>(
                  <div key={l} style={{background:'var(--green-900)',borderRadius:'var(--r)',padding:'8px 10px'}}>
                    <div style={{fontSize:9,color:'var(--text-muted)',textTransform:'uppercase'}}>{l}</div>
                    <div style={{fontSize:12,color:'var(--text-white)',fontWeight:500,marginTop:2}}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{fontSize:11,fontWeight:700,color:'var(--text-muted)',textTransform:'uppercase',marginBottom:10}}>🔗 Chain of Custody</div>
              {selected.chain.map((c,i)=>(
                <div key={i} className="chain-item">
                  <div className="chain-dot">{i+1}</div>
                  <div style={{flex:1,paddingBottom:12}}>
                    <div style={{fontSize:12,fontWeight:600,color:'var(--text-white)'}}>{c.action}</div>
                    <div style={{fontSize:10,color:'var(--text-muted)'}}>{c.officer} · {c.date}</div>
                  </div>
                </div>
              ))}
              <Button variant="primary" style={{marginTop:8,width:'100%'}}>+ Ongeza Hatua ya Custody</Button>
            </CardBody>
          </Card>
        ) : (
          <Card><CardBody><div style={{textAlign:'center',padding:40,color:'var(--text-muted)'}}>Chagua ushahidi kuona chain of custody</div></CardBody></Card>
        )}
      </div>
    </div>
  )
}
