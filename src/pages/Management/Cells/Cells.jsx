import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Button from '@components/ui/Button'
const MOCK_CELLS=[
  {id:'CEL-001',cell_no:'A-1',station:'Oysterbay PS',capacity:4,occupied:2,type:'Male',status:'available'},
  {id:'CEL-002',cell_no:'A-2',station:'Oysterbay PS',capacity:4,occupied:4,type:'Male',status:'full'},
  {id:'CEL-003',cell_no:'A-3',station:'Kariakoo PS',capacity:4,occupied:1,type:'Male',status:'available'},
  {id:'CEL-004',cell_no:'B-1',station:'Kinondoni PS',capacity:2,occupied:1,type:'Female',status:'available'},
  {id:'CEL-005',cell_no:'B-2',station:'Temeke PS',capacity:4,occupied:0,type:'Male',status:'empty'},
]
export default function Cells() {
  return (
    <div className="animate-fade-in">
      <div className="breadcrumb"><a href="/">🏠</a><span>›</span>Usimamizi<span>›</span>Seli</div>
      <div className="page-header"><div><h1>🔐 Seli / Cells</h1><p>Hali ya seli zote katika vituo vya polisi</p></div></div>
      <div className="stat-grid stat-grid-4 section-gap">
        <StatCard icon="🔐" value={MOCK_CELLS.length} label="Seli Jumla"      color="blue" />
        <StatCard icon="🔴" value={1}                  label="Zimejaa (Full)"  color="red" />
        <StatCard icon="🟡" value={3}                  label="Zinatumiwa"      color="amber" />
        <StatCard icon="🟢" value={1}                  label="Tupu (Empty)"   color="green" />
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
        {MOCK_CELLS.map(c=>(
          <div key={c.id} className="card" style={{borderColor:c.status==='full'?'var(--red)':c.status==='empty'?'var(--border)':'var(--green-500)'}}>
            <div className="card-body">
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                <div style={{fontSize:20,fontWeight:800,fontFamily:'var(--font-mono)',color:'var(--text-white)'}}>{c.cell_no}</div>
                <span className={`status ${c.status==='full'?'s-critical':c.status==='empty'?'s-closed':'s-active'}`}>{c.status==='full'?'Imejaa':c.status==='empty'?'Tupu':'Inatumiwa'}</span>
              </div>
              <div style={{fontSize:12,color:'var(--text-muted)',marginBottom:6}}>{c.station} · {c.type}</div>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
                <div style={{flex:1,background:'var(--green-900)',borderRadius:4,height:8,overflow:'hidden'}}>
                  <div style={{height:'100%',background:c.status==='full'?'var(--red)':'var(--gold)',borderRadius:4,width:`${(c.occupied/c.capacity)*100}%`}} />
                </div>
                <span style={{fontSize:11,fontFamily:'var(--font-mono)',color:'var(--gold)'}}>{c.occupied}/{c.capacity}</span>
              </div>
              <Button variant="outline" size="sm" style={{width:'100%'}}>Angalia Wafungwa</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
