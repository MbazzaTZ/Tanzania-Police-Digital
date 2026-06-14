import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'

const MOCK_VEHICLE = {
  plate:'T 123 DRS', make:'TOYOTA', model:'LAND CRUISER V8 4.5',
  color:'Nyeupe',year:2020,type:'SUV',vin:'JTMCV05J802123456',
  engine:'1VD-FTV123456',weight:2850,seats:7,stolen:false,
  status:'Halali',
  owner:{name:'Juma Ally Khamis',nida:'1234567890123',phone:'+255 712 345 678',address:'Mbezi Mwisho, DSM'},
  registration:{region:'Dar es Salaam',date:'15/06/2020',expiry:'14/06/2025',valid:true},
  insurance:{company:'CRDB Insurance',policy:'POL/2023/1234567',type:'Comprehensive',from:'20/11/2023',to:'20/11/2024',valid:true},
  inspection:{valid:false,expired:'14/05/2024'},
  violations:[
    {offense:'Kasi Kubwa',loc:'Morogoro Road, DSM',date:'10/05/2024',fine:150000,status:'unpaid'},
    {offense:'Parki Kinyume',loc:'Mwenge, DSM',date:'02/04/2024',fine:50000,status:'pending'},
    {offense:'Kofia ya Usalama',loc:'Bagamoyo Road',date:'18/02/2024',fine:30000,status:'paid'},
  ],
}

export default function Vehicles() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('usajili')
  const v = MOCK_VEHICLE

  return (
    <div className="animate-fade-in">
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)}>← Nyuma</button>
        <div style={{flex:1}}>
          <div style={{fontSize:11,color:'var(--text-muted)'}}>Maelezo ya Gari · Tazama taarifa kamili ya gari</div>
        </div>
        <Button variant="ghost" size="sm">🔗 Shiriki</Button>
        <Button variant="ghost" size="sm">⋮</Button>
      </div>

      {/* Vehicle header card */}
      <div className="card section-gap" style={{overflow:'hidden'}}>
        <div style={{background:'var(--green-800)',padding:'16px 20px',display:'flex',gap:16,alignItems:'flex-start'}}>
          {/* Vehicle image placeholder */}
          <div style={{width:120,height:80,background:'rgba(0,0,0,.4)',borderRadius:'var(--r)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:36,flexShrink:0}}>🚗</div>
          <div style={{flex:1}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:4}}>
              <div style={{fontSize:10,color:'var(--text-muted)'}}>🇹🇿</div>
              <div style={{fontSize:20,fontWeight:900,color:'var(--text-white)',fontFamily:"'JetBrains Mono',monospace",letterSpacing:1}}>T 123 DRS</div>
              <span className="status s-halali" style={{fontSize:'9px'}}>HALALI</span>
            </div>
            <div style={{fontSize:12,color:'var(--text-muted)',marginBottom:10}}>{v.make} {v.model}</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
              {[['Rangi',v.color],['Mwaka',v.year],['Aina',v.type],['Namba ya Chasi',v.vin]].map(([l,val]) => (
                <div key={l}>
                  <div style={{fontSize:9,color:'var(--text-muted)',textTransform:'uppercase',marginBottom:2}}>{l}</div>
                  <div style={{fontSize:11,color:'var(--text-white)',fontWeight:600}}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stolen check */}
        <div style={{padding:'10px 20px',background:v.stolen?'rgba(198,40,40,.1)':'rgba(76,175,80,.08)',display:'flex',alignItems:'center',gap:8,borderTop:'1px solid var(--border)',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <span style={{fontSize:16}}>{v.stolen?'🚨':'✅'}</span>
            <div style={{fontSize:11,color:v.stolen?'#EF5350':'#66BB6A',fontWeight:600}}>
              {v.stolen?'Gari LIMERIPOTIWA kuibiwa':'Gari halijasajiliwa kama lenye wizi'}
            </div>
          </div>
          <div style={{fontSize:10,color:'var(--text-muted)'}}>Imesasishwa: 17/05/2024 10:45 AM 🔄</div>
        </div>
      </div>

      {/* Owner section */}
      <div className="card section-gap">
        <div className="card-header">
          <div className="card-title">👤 MMILIKI WA GARI</div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/management/persons')}>👤 Tazama Wasifu</Button>
        </div>
        <div className="card-body">
          <div style={{display:'grid',gridTemplateColumns:'auto 1fr 1fr 1fr',gap:16,alignItems:'center'}}>
            <div style={{width:44,height:44,borderRadius:'50%',background:'var(--green-600)',border:'2px solid var(--border-light)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>👤</div>
            <div><div style={{fontSize:12,fontWeight:700,color:'var(--text-white)'}}>{v.owner.name}</div><div style={{fontSize:10,color:'var(--text-muted)'}}>NIDA: {v.owner.nida}</div></div>
            <div><div style={{fontSize:10,color:'var(--text-muted)'}}>Aina ya Mmiliki</div><div style={{fontSize:11,fontWeight:600}}>Mmiliki Binafsi</div></div>
            <div><div style={{fontSize:10,color:'var(--text-muted)'}}>Namba ya Simu</div><div style={{fontSize:11,fontFamily:"'JetBrains Mono',monospace"}}>{v.owner.phone}</div></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card section-gap">
        <div className="vehicle-tabs">
          {['usajili','bima','historia','matengenezo','ukaguzi','historia-umiliki'].map(t => (
            <div key={t} className={`vehicle-tab ${activeTab===t?'active':''}`} onClick={() => setActiveTab(t)}>
              {{usajili:'📋 Usajili',bima:'🛡️ Bima',historia:'📝 Historia ya Ukiukaji',matengenezo:'🔧 Rekodi ya Matengenezo',ukaguzi:'🔍 Ukaguzi & Vibali','historia-umiliki':'👥 Historia ya Umiliki'}[t]}
            </div>
          ))}
        </div>

        {activeTab === 'usajili' && (
          <div className="card-body">
            <div style={{display:'grid',gridTemplateColumns:'1fr auto 1fr',gap:20}}>
              <div>
                {[['Namba ya Usajili','T 123 DRS'],['Mkoa wa Usajili',v.registration.region],['Tarehe ya Usajili',v.registration.date],['Tarehe ya Kumalizika',v.registration.expiry],['Aina ya Matumizi','Binafsi'],['Uzito Halisi (kg)',v.weight],['Idadi ya Viti',v.seats],['Namba ya Engine',v.engine],['Namba ya Chasi (VIN)',v.vin]].map(([l,val]) => (
                  <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',fontSize:11.5,borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                    <span style={{color:'var(--text-muted)'}}>{l}</span>
                    <span style={{fontWeight:600,fontFamily:l.includes('Namba')||l.includes('Uzito')?'JetBrains Mono,monospace':undefined}}>{val}</span>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:10}}>
                <div style={{width:80,height:80,background:'rgba(0,0,0,.4)',borderRadius:'var(--r)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32}}>QR</div>
                <div style={{fontSize:9,color:'var(--text-muted)'}}>Scan kwa uhakiki</div>
                <Button variant="outline" size="sm">⬇ Pakua Usajili</Button>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {[{icon:'✅',label:'Usajili Halali',sub:`Unamaliza: ${v.registration.expiry}`,ok:true},{icon:'✅',label:'Bima Halali',sub:`Unamaliza: ${v.insurance.to}`,ok:true},{icon:'⚠️',label:'Safety Inspection',sub:'Imekwisha muda',note:`Ilipaswa kuwa: ${v.inspection.expired}`,ok:false}].map(item => (
                  <div key={item.label} style={{background:item.ok?'rgba(76,175,80,.08)':'rgba(198,40,40,.08)',border:`1px solid ${item.ok?'rgba(76,175,80,.2)':'rgba(198,40,40,.2)'}`,borderRadius:'var(--r)',padding:'10px 12px'}}>
                    <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:2}}>
                      <span style={{fontSize:14}}>{item.icon}</span>
                      <span style={{fontSize:11,fontWeight:700,color:item.ok?'#66BB6A':'#EF5350'}}>{item.label}</span>
                    </div>
                    <div style={{fontSize:10,color:'var(--text-muted)'}}>{item.sub}</div>
                    {item.note && <div style={{fontSize:10,color:'#EF5350',marginTop:2}}>{item.note}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'historia' && (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16}}>
            <div className="card-body">
              <div style={{fontSize:11,fontWeight:700,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:.5,marginBottom:10}}>🛡️ BIMA</div>
              <div style={{marginBottom:6}}><Badge status="halali" /></div>
              {[['Kampuni',v.insurance.company],['Namba ya Polisi',v.insurance.policy],['Aina ya Bima',v.insurance.type],['Kuanza',v.insurance.from],['Kumalizika',v.insurance.to]].map(([l,val]) => (
                <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'4px 0',fontSize:11,borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                  <span style={{color:'var(--text-muted)'}}>{l}</span><span style={{fontWeight:600}}>{val}</span>
                </div>
              ))}
              <Button variant="outline" size="sm" style={{marginTop:10,width:'100%'}}>👁️ Tazama Bima</Button>
            </div>
            <div className="card-body">
              <div style={{fontSize:11,fontWeight:700,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:.5,marginBottom:10}}>📝 HISTORIA YA UKIUKAJI</div>
              {v.violations.map(vi => (
                <div key={vi.offense} style={{padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:2}}>
                    <div style={{fontSize:11,fontWeight:600,color:'var(--text-white)'}}>{vi.offense}</div>
                    <Badge status={vi.status} size="xs" />
                  </div>
                  <div style={{fontSize:10,color:'var(--text-muted)'}}>{vi.loc}</div>
                  <div style={{display:'flex',justifyContent:'space-between',marginTop:2}}>
                    <div style={{fontSize:10,color:'var(--text-muted)'}}>{vi.date}</div>
                    <div style={{fontSize:10,fontWeight:700,fontFamily:"'JetBrains Mono',monospace",color:'var(--text-light)'}}>TZS {vi.fine.toLocaleString()}</div>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" style={{marginTop:10,width:'100%'}}>☰ Tazama Zote</Button>
            </div>
            <div className="card-body">
              <div style={{fontSize:11,fontWeight:700,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:.5,marginBottom:10}}>🛡️ HISTORIA YA WIZI</div>
              <div style={{textAlign:'center',padding:'20px 10px',color:'#66BB6A'}}>
                <div style={{fontSize:32,marginBottom:8}}>✅</div>
                <div style={{fontSize:12,fontWeight:600}}>Hakuna taarifa ya wizi</div>
                <div style={{fontSize:10,color:'var(--text-muted)',marginTop:4}}>Gari hili halijaripoliwa kama limeibiwa</div>
              </div>
              <Button variant="outline" size="sm" style={{width:'100%'}}>🔍 Angalia Taarifa Nyingine</Button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
        <Button variant="primary">📋 Orodha Citation</Button>
        <Button variant="danger" size="sm">⚠️ Ripoti Wizi</Button>
        <Button variant="ghost" size="sm">👤 Tazama Mmiliki</Button>
        <Button variant="ghost" size="sm">🔍 Gari Kagua</Button>
        <Button variant="ghost" size="sm">⋯ Zaidi</Button>
      </div>
    </div>
  )
}
