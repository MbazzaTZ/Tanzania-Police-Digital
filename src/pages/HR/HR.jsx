import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
import { MOCK_OFFICERS } from '@utils/mockData'
export default function HR() {
  const records=[
    {id:'HR-001',officer:'Insp. J.M. Khamis',type:'Promotion',desc:'Alipandishwa cheo kutoka ASP hadi Insp.',date:'01/01/2024',by:'RPC DSM'},
    {id:'HR-002',officer:'Sgt. A. Suleiman',type:'Training',desc:'Mafunzo ya CID – Dar es Salaam',date:'15/03/2024',by:'HQ Training'},
    {id:'HR-003',officer:'ASP F.R. Kimaro',type:'Transfer',desc:'Uhamisho kutoka Arusha hadi Dar es Salaam',date:'01/04/2024',by:'IGP Office'},
    {id:'HR-004',officer:'Cpl. H.A. Mwinyi',type:'Commendation',desc:'Tuzo ya utendaji bora mwaka 2023',date:'15/12/2023',by:'Commissioner DSM'},
  ]
  const types={Promotion:'s-active',Training:'s-issued',Transfer:'s-pending',Commendation:'s-paid',Suspension:'s-critical'}
  return (
    <div className="animate-fade-in">
      <div className="breadcrumb"><a href="/">🏠</a><span>›</span>HR<span>›</span>Rasilimali Watu</div>
      <div className="page-header">
        <div><h1>👥 Rasilimali Watu / Human Resources</h1><p>Usimamizi wa wafanyakazi · Tanzania Police Force</p></div>
        <div className="flex gap-8"><Button variant="outline">⬇ Ripoti ya HR</Button><Button variant="accent">+ Rekodi Mpya</Button></div>
      </div>
      <div className="stat-grid stat-grid-5 section-gap">
        <StatCard icon="👮" value={38547} label="Wafanyakazi Jumla"  delta="2%"  color="blue" />
        <StatCard icon="⬆️" value={234}   label="Waliопandishwa Mwaka Huu" color="green" />
        <StatCard icon="🎓" value={1247}  label="Wanaofunzwa"        delta="5%"  color="amber" />
        <StatCard icon="🔄" value={89}    label="Uhamisho Mwaka Huu"             color="blue" />
        <StatCard icon="🏅" value={156}   label="Tuzo Zilizotolewa"              color="amber" />
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <Card>
          <CardHeader title="📋 Rekodi za Hivi Karibuni" />
          <CardBody noPadding>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Namba</th><th>Afisa</th><th>Aina</th><th>Maelezo</th><th>Tarehe</th><th></th></tr></thead>
                <tbody>
                  {records.map(r=>(
                    <tr key={r.id}>
                      <td className="td-mono">{r.id}</td>
                      <td className="td-name">{r.officer}</td>
                      <td><span className={`status ${types[r.type]||'s-draft'}`}>{r.type}</span></td>
                      <td style={{fontSize:11}}>{r.desc}</td>
                      <td style={{fontFamily:'var(--font-mono)',fontSize:10}}>{r.date}</td>
                      <td><Button variant="outline" size="sm">Angalia</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="📊 Muhtasari wa HR" />
          <CardBody>
            {[['Jumla ya Wafanyakazi','38,547'],['Wanafanya Kazi Sasa','37,024'],['Likizoni','234'],['Wagonjwa','89'],['Mafunzo','156'],['Wamesimamishwa','44'],['Walistaafu Mwaka Huu','178'],['Waajiriwa Wapya Mwaka Huu','312']].map(([l,v])=>(
              <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',fontSize:12,borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                <span style={{color:'var(--text-muted)'}}>{l}</span>
                <span style={{fontFamily:'var(--font-mono)',color:'var(--gold)',fontWeight:600}}>{v}</span>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
