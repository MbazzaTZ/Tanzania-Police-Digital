import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PoliceBadge from '@components/shared/PoliceBadge'
import Button from '@components/ui/Button'
import Badge from '@components/ui/Badge'
import { MOCK_PERSON } from '@utils/mockData'
import { SEARCH_TYPES } from '@utils/constants'

export default function Persons() {
  const navigate = useNavigate()
  const [type, setType]     = useState('NIDA')
  const [query, setQuery]   = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const p = MOCK_PERSON

  const doSearch = () => {
    if (!query.trim()) return
    setLoading(true)
    setTimeout(() => { setResult(p); setLoading(false) }, 600)
  }

  return (
    <div className="afd">
      {/* Header matching app design */}
      <div style={{background:'linear-gradient(135deg,#0D2E0F,#1B5E20)',borderRadius:'var(--r-xl)',padding:'16px 20px',marginBottom:20,display:'flex',gap:14,alignItems:'center'}}>
        <PoliceBadge size={42} />
        <div>
          <div style={{fontSize:9,color:'rgba(255,255,255,.5)',textTransform:'uppercase',letterSpacing:1}}>TAFUTA MTU</div>
          <div style={{fontSize:15,fontWeight:800,color:'white'}}>Person Search</div>
          <div style={{fontSize:10,color:'rgba(255,255,255,.6)'}}>NIDA · TIN · I-NEC · Passport · Leseni · Gari · Simu · Biometric · Face</div>
        </div>
      </div>

      {/* 9 Search type grid */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:18}}>
        {SEARCH_TYPES.map(t => {
          const isActive = type === t.id
          return (
            <div key={t.id} onClick={() => setType(t.id)} style={{
              background: isActive ? 'rgba(255,193,7,.08)' : 'var(--green-700)',
              border: `1px solid ${isActive ? 'var(--gold)' : 'var(--border)'}`,
              borderRadius:'var(--r-md)',
              padding:'10px 12px',
              cursor:'pointer',
              display:'flex',
              alignItems:'center',
              gap:10,
              transition:'var(--t)',
            }}>
              <span style={{fontSize:20}}>{t.icon}</span>
              <div>
                <div style={{fontSize:12,fontWeight:700,color: isActive ? 'var(--gold)' : 'var(--text-white)'}}>{t.label}</div>
                <div style={{fontSize:10,color:'var(--text-muted)'}}>{t.sub}</div>
              </div>
              {isActive && <span style={{marginLeft:'auto',color:'var(--gold)',fontSize:16}}>✓</span>}
            </div>
          )
        })}
      </div>

      {/* Search bar */}
      <div className="card mb-sec">
        <div className="card-bd">
          <div style={{fontSize:11,fontWeight:700,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:.5,marginBottom:8}}>
            Ingiza Namba ya {type}
          </div>
          <div style={{display:'flex',gap:8}}>
            <input className="fi" style={{flex:1,fontSize:14,padding:'12px 16px'}}
              placeholder={`Weka namba ya ${type}...`}
              value={query} onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key==='Enter' && doSearch()} />
            <Button variant="p" size="lg" onClick={doSearch}>
              {loading ? '⏳' : '🔍'} TAFUTA
            </Button>
            <Button variant="o" size="lg">📷 Scan QR</Button>
          </div>

          <div style={{display:'flex',alignItems:'center',gap:12,margin:'14px 0'}}>
            <div style={{flex:1,height:1,background:'var(--border)'}} />
            <span style={{fontSize:11,color:'var(--text-muted)'}}>AU</span>
            <div style={{flex:1,height:1,background:'var(--border)'}} />
          </div>

          {/* Scan option */}
          <div style={{border:'1px solid var(--border)',borderRadius:'var(--r-md)',padding:'12px 14px',display:'flex',alignItems:'center',gap:12,cursor:'pointer',background:'rgba(255,255,255,.03)'}}
            onClick={() => {}}>
            <span style={{fontSize:22}}>📱</span>
            <div>
              <div style={{fontSize:12,fontWeight:700,color:'var(--text-white)'}}>Tafuta kwa Scan</div>
              <div style={{fontSize:11,color:'var(--text-muted)'}}>Scan QR Code au Namba ya NIDA</div>
            </div>
            <span style={{marginLeft:'auto',color:'var(--text-muted)'}}>›</span>
          </div>
        </div>
      </div>

      {/* Recent searches */}
      {!result && (
        <div className="card mb-sec">
          <div className="card-h">
            <div className="card-t">🕐 Utafutaji wa Hivi Karibuni</div>
            <span className="view-all">Ona Zote</span>
          </div>
          {[
            {name:'Juma Ally Khamis',nida:'1234567890123',time:'17 Mei 2024, 10:35'},
            {name:'Asha Mohamed Suleiman',nida:'9876543210987',time:'17 Mei 2024, 09:42'},
            {name:'Abdallah Hassan Mwinyi',nida:'1122334455667',time:'16 Mei 2024, 16:20'},
          ].map(r => (
            <div key={r.nida} style={{display:'flex',alignItems:'center',gap:12,padding:'11px 16px',borderBottom:'1px solid rgba(255,255,255,.04)',cursor:'pointer'}}
              onClick={() => { setQuery(r.nida); setResult(p) }}>
              <div className="officer-avatar" style={{width:40,height:40,fontSize:16}}>👤</div>
              <div style={{flex:1}}>
                <div style={{fontSize:12,fontWeight:600,color:'var(--text-white)'}}>{r.name}</div>
                <div style={{fontSize:10,color:'var(--text-muted)'}}>NIDA: {r.nida}</div>
              </div>
              <div style={{fontSize:10,color:'var(--text-muted)'}}>{r.time}</div>
              <span style={{color:'var(--text-muted)'}}>›</span>
            </div>
          ))}
        </div>
      )}

      {/* Person result - matching screenshot exactly */}
      {result && (
        <div className="card afd mb-sec" style={{overflow:'hidden'}}>
          {/* Profile header */}
          <div className="profile-header">
            <div className="profile-photo">👤</div>
            <div style={{flex:1}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:4}}>
                <div style={{fontSize:18,fontWeight:800,color:'white'}}>{p.fullName.toUpperCase()}</div>
              </div>
              <div style={{display:'flex',gap:8,marginBottom:8,flexWrap:'wrap'}}>
                <span className="pill p-active">✓ Hakuna Tahadhari</span>
                <span className="pill p-paid">Amilifu</span>
              </div>
              <div style={{fontSize:10,fontFamily:"'JetBrains Mono',monospace",color:'rgba(255,255,255,.6)',marginBottom:6}}>
                ID: PRS-2024-0517-000123
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:6}}>
                {[['Jina Kamili',p.fullName],['NIDA',p.nida],['Jinsia',p.gender],['Tarehe ya Kuzaliwa',`${p.dob} (${p.age} yrs)`],['Uraia',p.nationality]].map(([l,v]) => (
                  <div key={l}>
                    <div style={{fontSize:9,color:'rgba(255,255,255,.45)',textTransform:'uppercase',marginBottom:1}}>{l}</div>
                    <div style={{fontSize:11,color:'white',fontWeight:600,fontFamily:l==='NIDA'?"'JetBrains Mono',monospace":undefined}}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* QR Code */}
            <div style={{textAlign:'center',flexShrink:0}}>
              <div style={{width:70,height:70,background:'white',borderRadius:'var(--r)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,marginBottom:4}}>⊞</div>
              <div style={{fontSize:9,color:'rgba(255,255,255,.5)'}}>Scan kwa uthibitisho</div>
              <Button variant="o" size="sm" style={{marginTop:6,fontSize:10}}>⏱ Ona Historia</Button>
            </div>
          </div>

          {/* Inner tabs */}
          <div className="vehicle-tabs">
            {['Muhtasari','Nyaraka','Mashauri ya Polisi','Magari','Leseni','Kesi','Zaidi'].map(t => (
              <div key={t} className={`vehicle-tab ${t==='Muhtasari'?'active':''}`}>{t}</div>
            ))}
          </div>

          {/* Documents */}
          <div style={{padding:'14px 16px',borderBottom:'1px solid var(--border)'}}>
            <div style={{fontSize:10,fontWeight:700,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:.5,marginBottom:10}}>📋 Nyaraka za Utambulisho</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:8}}>
              {[
                {type:'NIDA',num:'1234567890123',sub:'Imetolewa: 12/06/2016'},
                {type:'Leseni ya Udereva',num:'DL12345678TZ',sub:'Daraja: B, C · Expiry: 20/08/2026'},
                {type:'TIN',num:'123-456-789',sub:'Aina: Individual · Active'},
                {type:'I-NEC',num:'NEC987654321',sub:'Kituo: Oysterbay'},
                {type:'Passport',num:'PP1234567',sub:'Expiry: 10/02/2028 · Ordinary'},
              ].map(d => (
                <div key={d.type} className="doc-card">
                  <div className="doc-label">{d.type}</div>
                  <div className="doc-value">{d.num}</div>
                  <span className="pill p-paid" style={{fontSize:'8.5px',padding:'1px 6px'}}>Ndio</span>
                  <div className="doc-sub">{d.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Personal + Police info */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',borderBottom:'1px solid var(--border)'}}>
            <div style={{padding:'14px 16px',borderRight:'1px solid var(--border)'}}>
              <div style={{fontSize:10,fontWeight:700,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:.5,marginBottom:10}}>👤 Taarifa Binafsi</div>
              {[['Jina la Baba',p.father],['Jina la Mama',p.mother],['Simu',p.phone],['Barua Pepe',p.email],['Anuani',p.address],['Mkoa',p.region],['Wilaya',p.district],['Kata',p.ward],['Raia',p.nationality]].map(([l,v]) => (
                <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',fontSize:11.5,borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                  <span style={{color:'var(--text-muted)'}}>{l}</span>
                  <span style={{fontWeight:500,textAlign:'right'}}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{padding:'14px 16px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
                <div style={{fontSize:10,fontWeight:700,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:.5}}>🛡️ Taarifa za Polisi</div>
                <span className="view-all">Ona Zote</span>
              </div>
              {[
                {icon:'⚠️',label:'Tahadhari / Watchlist',val:p.policeRecord.watchlist},
                {icon:'⛓️',label:'Historia ya Kukamatwa',val:p.policeRecord.arrests},
                {icon:'⚖️',label:'Mashtaka / Makosa',val:p.policeRecord.charges},
                {icon:'📁',label:'Kesi Zinazoendelea',val:p.policeRecord.activeCases},
                {icon:'🏛️',label:'Amri za Mahakama',val:p.policeRecord.warrants},
              ].map(item => (
                <div key={item.label} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 0',borderBottom:'1px solid rgba(255,255,255,.04)',cursor:'pointer'}}>
                  <span style={{fontSize:16,width:20}}>{item.icon}</span>
                  <div style={{flex:1,fontSize:12}}>{item.label}</div>
                  <span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:800,color:item.val>0?'var(--red-light)':'var(--text-muted)',fontSize:14}}>{item.val}</span>
                  <span style={{color:'var(--text-muted)'}}>›</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div style={{padding:'14px 16px'}}>
            <div style={{fontSize:10,fontWeight:700,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:.5,marginBottom:10}}>⚡ Kitendo cha Haraka</div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              <Button variant="p" size="sm" onClick={() => navigate('/enforcement/citations/new')}>📋 Toa Citation</Button>
              <Button variant="g" size="sm" onClick={() => navigate('/enforcement/arrests/new')}>⛓️ Kamata</Button>
              <Button variant="o" size="sm">🔒 Detain (Shikilia)</Button>
              <Button variant="o" size="sm" onClick={() => navigate('/enforcement/incidents')}>📝 Ripoti ya Tukio</Button>
              <Button variant="r" size="sm">🚨 Escalate</Button>
              <Button variant="gh" size="sm">⋯ Zaidi</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
