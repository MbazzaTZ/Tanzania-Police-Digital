import { useState } from 'react'
import StatCard from '@components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import Button from '@components/ui/Button'
const MOCK_INTEL=[
  {id:'INT-2024-C-001',title:'Mtandao wa Madawa – Dar es Salaam',classification:'SIRI KABISA',region:'Dar es Salaam',date:'15/05/2024',status:'active',threats:4},
  {id:'INT-2024-C-002',title:'Ugaidi wa Mpakani – Kaskazini',classification:'SIRI',region:'Kilimanjaro',date:'10/05/2024',status:'monitoring',threats:2},
  {id:'INT-2024-B-003',title:'Uchakachuaji wa Sarafu – Mwanza',classification:'IMEHIFADHIWA',region:'Mwanza',date:'08/05/2024',status:'closed',threats:0},
]
const CLR={SIRI_KABISA:'#EF5350','SIRI KABISA':'#EF5350',SIRI:'#FF7043',IMEHIFADHIWA:'#64B5F6',WAZI:'#66BB6A'}
export default function Intelligence() {
  const [tab,setTab]=useState('active')
  return (
    <div className="afd">
      <div className="bc"><a href="/">🏠</a><span>›</span>Ujasusi<span>›</span>Intelligence</div>
      <div className="ph">
        <div><h1>🧠 Ujasusi / Intelligence</h1><p>Faili za siri – Ufikiaji kwa RPC, DIGP na IGP tu</p></div>
        <div className="flex g8"><Button variant="r">🔒 SIRI KABISA</Button><Button variant="g">+ Faili Mpya</Button></div>
      </div>
      <div style={{background:'rgba(198,40,40,.1)',border:'1px solid rgba(198,40,40,.3)',borderRadius:'var(--r)',padding:'10px 14px',marginBottom:16,fontSize:12,color:'#EF9A9A',display:'flex',gap:8,alignItems:'center'}}>
        🔒 <strong>TAHADHARI:</strong> Faili hizi ni za siri. Ufikiaji wowote unarekodi katika mfumo wa ukaguzi (audit trail). Mtu asiye na ruhusa anayejaribu kufikia ataripotiwa.
      </div>
      <div className="stats-row s4 mb-sec">
        <StatCard icon="🧠" value={47}  label="Faili Amilifu"      color="red" />
        <StatCard icon="👁️" value={12}  label="Zinafuatiliwa"      color="amber" />
        <StatCard icon="⚠️" value={4}   label="Vitisho Vya Juu"    color="red" />
        <StatCard icon="✅" value={234} label="Zilizofungwa Mwaka"  color="green" />
      </div>
      <Card>
        <CardHeader title="🧠 Faili za Ujasusi" subtitle="Classified Intelligence Files" />
        <CardBody noPadding>
          <div className="tw">
            <table>
              <thead><tr><th>Namba</th><th>Kichwa</th><th>Daraja la Usiri</th><th>Mkoa</th><th>Vitisho</th><th>Tarehe</th><th>Hali</th><th></th></tr></thead>
              <tbody>
                {MOCK_INTEL.map(i=>(
                  <tr key={i.id}>
                    <td className="td-mo">{i.id}</td>
                    <td className="td-nm">{i.title}</td>
                    <td><span style={{fontSize:9,fontWeight:700,padding:'2px 8px',borderRadius:10,background:`${CLR[i.classification]||'#9E9E9E'}22`,color:CLR[i.classification]||'#9E9E9E',textTransform:'uppercase'}}>{i.classification}</span></td>
                    <td style={{fontSize:11}}>{i.region}</td>
                    <td style={{textAlign:'center',fontFamily:'var(--font-mono)',color:i.threats>0?'#EF5350':'#66BB6A'}}>{i.threats}</td>
                    <td style={{fontFamily:'var(--font-mono)',fontSize:10}}>{i.date}</td>
                    <td><span className={`status ${i.status==='active'?'p-critical':i.status==='monitoring'?'p-pending':'p-closed'}`}>{i.status==='active'?'Amilifu':i.status==='monitoring'?'Inafuatiliwa':'Imefungwa'}</span></td>
                    <td><Button variant="r" size="sm">🔒 Angalia</Button></td>
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
