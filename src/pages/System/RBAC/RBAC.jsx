import { Card, CardHeader, CardBody } from '@components/ui/Card'
import { ROLES, PERMISSIONS } from '@utils/constants'
export default function RBAC() {
  return (
    <div className="afd">
      <div className="bc"><a href="/dashboard">🏠</a><span>›</span>Mfumo<span>›</span>Udhibiti wa Ufikiaji</div>
      <div className="ph"><div><h1>🛡️ Udhibiti wa Ufikiaji / RBAC</h1><p>Usimamizi wa majukumu na ruhusa – IGP peke yake</p></div></div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1.5fr',gap:16}}>
        <Card>
          <CardHeader title="🎭 Majukumu / Roles" />
          <CardBody>
            {Object.values(ROLES).map(role => (
              <div key={role.id} style={{padding:'10px 12px',marginBottom:6,background:'var(--green-900)',borderRadius:'var(--r)',border:'1px solid var(--border)'}}>
                <div style={{fontSize:13,fontWeight:700,color:'var(--text-white)',marginBottom:4}}>{role.label}</div>
                <div style={{fontSize:10,color:'var(--text-muted)',fontFamily:'var(--font-mono)'}}>ID: {role.id}</div>
                {role.scope && <div style={{fontSize:10,color:'var(--gold)',marginTop:2}}>Upeo: {role.scope}</div>}
                <div style={{marginTop:6}}>
                  {role.can && role.can[0] !== '*' ? role.can.slice(0,3).map(p => (
                    <span key={p} style={{fontSize:9,background:'rgba(76,175,80,.15)',color:'#66BB6A',padding:'1px 5px',borderRadius:8,marginRight:3,marginTop:2,display:'inline-block'}}>{p}</span>
                  )) : <span style={{fontSize:9,color:'var(--gold)',fontWeight:700}}>⭐ UFIKIAJI KAMILI</span>}
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="🔑 Ruhusa / Permissions" />
          <CardBody>
            <div style={{maxHeight:500,overflowY:'auto'}}>
              {Object.entries(PERMISSIONS).map(([perm, roles]) => (
                <div key={perm} style={{padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                  <div style={{fontSize:11,fontFamily:'var(--font-mono)',color:'var(--gold)',marginBottom:4}}>{perm}</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:3}}>
                    {roles.map(r => (
                      <span key={r} style={{fontSize:9,background:'rgba(21,101,192,.15)',color:'#64B5F6',padding:'1px 6px',borderRadius:8}}>{r}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
