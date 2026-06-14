import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Button from '@components/ui/Button'
import { REGIONS } from '@utils/constants'
const MOCK_STATIONS=[
  {id:'STA-001',name:'Oysterbay Police Station',type:'Police Station',region:'Dar es Salaam',district:'Kinondoni',ward:'Oysterbay',ocs:'Insp. J.M. Khamis',officers:34,cells:6,status:'active'},
  {id:'STA-002',name:'Kariakoo Police Station',type:'Police Station',region:'Dar es Salaam',district:'Ilala',ward:'Kariakoo',ocs:'SP A. Hamisi',officers:41,cells:8,status:'active'},
  {id:'STA-003',name:'Temeke Police Station',type:'Police Station',region:'Dar es Salaam',district:'Temeke',ward:'Temeke',ocs:'ASP F.R. Kimaro',officers:29,cells:5,status:'active'},
  {id:'STA-004',name:'Kinondoni Police Post',type:'Police Post',region:'Dar es Salaam',district:'Kinondoni',ward:'Sinza',ocs:'Sgt. B. Nyange',officers:8,cells:2,status:'active'},
]
export default function Stations() {
  return (
    <div className="animate-fade-in">
      <div className="breadcrumb"><a href="/">🏠</a><span>›</span>Usimamizi<span>›</span>Vituo</div>
      <div className="page-header">
        <div><h1>🏢 Vituo / Stations</h1><p>Vituo 312 vya polisi nchini Tanzania</p></div>
        <div className="flex gap-8"><Button variant="outline">⬇ Pakua</Button><Button variant="accent">+ Kituo Kipya</Button></div>
      </div>
      <div className="stat-grid stat-grid-4 section-gap">
        <StatCard icon="🏢" value={312}  label="Vituo Jumla"       color="blue" />
        <StatCard icon="✅" value={308}  label="Vinavyofanya Kazi" delta="2%"  color="green" />
        <StatCard icon="👮" value={38547}label="Maafisa Jumla"      delta="5%"  color="amber" />
        <StatCard icon="🌍" value={26}   label="Mikoa"                          color="blue" />
      </div>
      <Card>
        <CardHeader title="🏢 Orodha ya Vituo" action={<div className="flex gap-8"><select className="form-select" style={{width:'auto',fontSize:11,padding:'5px 10px'}}><option>Mikoa yote</option>{REGIONS.map(r=><option key={r}>{r}</option>)}</select><input className="form-input" style={{width:180,fontSize:11,padding:'5px 10px'}} placeholder="🔍 Tafuta..." /></div>} />
        <CardBody noPadding>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Namba</th><th>Jina la Kituo</th><th>Aina</th><th>Mkoa</th><th>Wilaya</th><th>Kata</th><th>OCS</th><th>Maafisa</th><th>Seli</th><th>Hali</th><th></th></tr></thead>
              <tbody>
                {MOCK_STATIONS.map(s=>(
                  <tr key={s.id}>
                    <td className="td-mono">{s.id}</td>
                    <td className="td-name">{s.name}</td>
                    <td><span style={{fontSize:9,background:'rgba(255,255,255,.07)',padding:'2px 6px',borderRadius:8,color:'var(--clr-muted)'}}>{s.type}</span></td>
                    <td style={{fontSize:11}}>{s.region}</td>
                    <td style={{fontSize:11}}>{s.district}</td>
                    <td style={{fontSize:11}}>{s.ward}</td>
                    <td style={{fontSize:11}}>{s.ocs}</td>
                    <td style={{textAlign:'center',fontFamily:'var(--font-mono)'}}>{s.officers}</td>
                    <td style={{textAlign:'center',fontFamily:'var(--font-mono)'}}>{s.cells}</td>
                    <td><span className="status s-active">Hai</span></td>
                    <td><Button variant="outline" size="sm">Angalia</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
