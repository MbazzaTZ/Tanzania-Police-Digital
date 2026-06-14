import { useApp } from '@context/AppContext'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import { CURRENT_OFFICER } from '@utils/mockData'
import { ROLES } from '@utils/constants'
export default function Settings() {
  const { lang, toggleLang, currentOfficer } = useApp()
  const role = ROLES[currentOfficer.role] || {}
  return (
    <div className="afd">
      <div className="bc"><a href="/">🏠</a><span>›</span>Mfumo<span>›</span>Mipangilio</div>
      <div className="ph"><div><h1>⚙️ Mipangilio / Settings</h1><p>Mipangilio ya akaunti na mfumo</p></div></div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <Card>
          <CardHeader title="👮 Profaili ya Afisa" />
          <CardBody>
            <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:16,padding:'12px 14px',background:'var(--green-900)',borderRadius:'var(--r)'}}>
              <div style={{width:56,height:56,borderRadius:'50%',background:'var(--green-600)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,border:'2px solid var(--gold)'}}>👮</div>
              <div>
                <div style={{fontSize:15,fontWeight:700,color:'var(--text-white)'}}>{currentOfficer.name}</div>
                <div style={{fontSize:11,color:'var(--text-muted)'}}>Namba ya Kitambulisho: {currentOfficer.badge}</div>
                <div style={{fontSize:11,color:'var(--text-muted)'}}>Cheo: {currentOfficer.rank.toUpperCase()}</div>
              </div>
            </div>
            {[['Kituo',currentOfficer.station],['Wilaya',currentOfficer.district],['Mkoa',currentOfficer.region],['Simu',currentOfficer.phone]].map(([l,v]) => (
              <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',fontSize:12,borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                <span style={{color:'var(--text-muted)'}}>{l}</span><span style={{fontWeight:500}}>{v}</span>
              </div>
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="🛡️ Majukumu na Ruhusa" />
          <CardBody>
            <div style={{background:'var(--green-900)',borderRadius:'var(--r)',padding:'10px 14px',marginBottom:12}}>
              <div style={{fontSize:10,color:'var(--text-muted)',textTransform:'uppercase'}}>Jukumu / Role</div>
              <div style={{fontSize:14,fontWeight:700,color:'var(--gold)',marginTop:2}}>{role.label || currentOfficer.role}</div>
              <div style={{fontSize:10,color:'var(--text-muted)',marginTop:2}}>Upeo: {role.scope || 'Station'}</div>
            </div>
            {role.can && role.can.length > 0 && role.can[0] !== '*' && (
              <>
                <div style={{fontSize:11,fontWeight:600,color:'var(--text-muted)',marginBottom:6}}>✅ Anaweza Kufikia:</div>
                {role.can.slice(0,6).map(p => (
                  <div key={p} style={{fontSize:11,padding:'3px 0',color:'#66BB6A'}}>✓ {p.replace(/_/g,' ')}</div>
                ))}
                {role.cannot && role.cannot.length > 0 && (
                  <>
                    <div style={{fontSize:11,fontWeight:600,color:'var(--text-muted)',marginTop:10,marginBottom:6}}>❌ Haiwezi Kufikia:</div>
                    {role.cannot.map(p => (
                      <div key={p} style={{fontSize:11,padding:'3px 0',color:'#EF5350'}}>✗ {p.replace(/_/g,' ')}</div>
                    ))}
                  </>
                )}
              </>
            )}
            {role.can && role.can[0] === '*' && (
              <div style={{padding:'12px 14px',background:'rgba(255,193,7,.1)',borderRadius:'var(--r)',fontSize:12,color:'var(--gold)',textAlign:'center'}}>
                ⭐ Ufikiaji Kamili – {role.label}
              </div>
            )}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="🌍 Lugha na Muundo" />
          <CardBody>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:11,fontWeight:600,color:'var(--text-muted)',display:'block',marginBottom:6}}>LUGHA / LANGUAGE</label>
              <div className="lang-toggle">
                <button className={`lang-btn ${lang==='sw'?'active':''}`} onClick={toggleLang}>🇹🇿 Swahili (SW)</button>
                <button className={`lang-btn ${lang==='en'?'active':''}`} onClick={toggleLang}>🇬🇧 English (EN)</button>
              </div>
            </div>
            {[['Sarafu / Currency','TZS'],['Tarehe / Date','DD/MM/YYYY'],['Muda / Time','24-hour'],['Nchi / Country','Tanzania (+255)']].map(([l,v]) => (
              <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',fontSize:12,borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                <span style={{color:'var(--text-muted)'}}>{l}</span><span style={{color:'var(--gold)',fontWeight:600}}>{v}</span>
              </div>
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="🔒 Usalama / Security" />
          <CardBody>
            {[['Uthibitisho wa Biometric','Imewezeshwa ✅'],['Uthibitisho wa Hatua Mbili (2FA)','Imewezeshwa ✅'],['Usimbuaji wa Mwisho kwa Mwisho','Imewezeshwa ✅'],['Usajili wa Kifaa','Imesajiliwa ✅'],['Ufuatiliaji wa GPS','Imewezeshwa ✅'],['Rekodi ya Ukaguzi','Imewezeshwa ✅']].map(([l,v]) => (
              <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',fontSize:12,borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                <span style={{color:'var(--text-muted)'}}>{l}</span><span style={{color:'#66BB6A'}}>{v}</span>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
