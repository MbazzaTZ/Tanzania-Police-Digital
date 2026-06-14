import { useNavigate } from 'react-router-dom'
import PoliceBadge from '@components/shared/PoliceBadge'
import { MOCK_CITATIONS, MOCK_ARRESTS, MOCK_DETENTIONS } from '@utils/mockData'

const CELLS = [
  {no:'A-1',capacity:4,occupied:3,status:'partial'},{no:'A-2',capacity:4,occupied:4,status:'full'},
  {no:'A-3',capacity:4,occupied:1,status:'partial'},{no:'B-1',capacity:6,occupied:0,status:'empty'},
  {no:'B-2',capacity:6,occupied:4,status:'partial'},{no:'B-3',capacity:6,occupied:6,status:'full'},
]

export default function StationDashboard() {
  const nav = useNavigate()
  return (
    <div className="afd">
      <div style={{background:'linear-gradient(135deg,#080C1A,#1a237e)',borderRadius:'var(--r16)',padding:'18px 22px',marginBottom:16,display:'flex',gap:16,alignItems:'center'}}>
        <PoliceBadge size={50} />
        <div style={{flex:1}}>
          <div style={{fontSize:9,color:'rgba(255,255,255,.5)',textTransform:'uppercase',letterSpacing:1,marginBottom:2}}>DASHIBODI YA KITUO</div>
          <div style={{fontSize:18,fontWeight:800,color:'white',marginBottom:2}}>Oysterbay Police Station</div>
          <div style={{fontSize:11,color:'rgba(255,255,255,.6)'}}>OCS: Insp. Juma M. Khamis · Kinondoni · Dar es Salaam</div>
        </div>
        <div style={{display:'flex',gap:14,flexShrink:0}}>
          {[['52','Wanafanya Kazi'],['6','Seli'],['28','Citations Leo'],['8','Kukamatwa']].map(([v,l]) => (
            <div key={l} style={{textAlign:'center'}}>
              <div style={{fontSize:20,fontWeight:800,color:'var(--gold)',fontFamily:'var(--fm)',lineHeight:1}}>{v}</div>
              <div style={{fontSize:8.5,color:'rgba(255,255,255,.5)',textTransform:'uppercase',letterSpacing:.4,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-row s4 mb-sec">
        {[
          {ic:'📋',cls:'ic-green', n:28,  lbl:'Jumla ya Kamata Leo',    delta:'↑ 12%', dcls:'up'},
          {ic:'📝',cls:'ic-blue',  n:19,  lbl:'Tiketi Zilizotolewa',    delta:'↑ 8%',  dcls:'up'},
          {ic:'👤',cls:'ic-purple',n:7,   lbl:'Maonyo (Warnings)',      delta:'↑ 15%', dcls:'up'},
          {ic:'⏳',cls:'ic-amber', n:5,   lbl:'Inasubiri (Pending)',    delta:'↓ 5%',  dcls:'down'},
        ].map(c => (
          <div key={c.lbl} className="scard">
            <div className="scard-top">
              <div className={`scard-icon ${c.cls}`}>{c.ic}</div>
              <div className={`scard-delta ${c.dcls}`}>{c.delta}</div>
            </div>
            <div className="scard-num">{c.n}</div>
            <div className="scard-lbl">{c.lbl}</div>
            <div className="scard-sub">Leo</div>
          </div>
        ))}
      </div>

      <div className="row4 mb-sec">
        {/* Today's activity */}
        <div className="card">
          <div className="card-h">
            <div className="card-t">🕐 Shughuli za Leo</div>
            <select className="fs" style={{width:'auto',fontSize:10.5,padding:'4px 8px'}}>
              <option>📅 Leo</option><option>Wiki</option><option>Mwezi</option>
            </select>
          </div>
          <div style={{overflowX:'auto'}}>
            <table>
              <thead><tr><th>Wakati</th><th>Shughuli</th><th>Mahali</th><th>Hali</th></tr></thead>
              <tbody>
                {[
                  {t:'10:45 AM',a:'Kukamata: Kuendesha bila Leseni',   l:'Morogoro Rd',    s:'done'},
                  {t:'10:20 AM',a:'Citation: Mwendo Kasi (85 km/h)',   l:'Morogoro Rd',    s:'done'},
                  {t:'09:43 AM',a:'Onyo: Kutokuweka Mkanda',           l:'Morogoro Rd',    s:'done'},
                  {t:'09:15 AM',a:'Citation: Kutumia Simu',            l:'Morogoro Rd',    s:'done'},
                  {t:'08:50 AM',a:'Ukaguzi wa Gari – T456 XYZ',        l:'Bagamoyo Rd',    s:'done'},
                  {t:'08:20 AM',a:'Taarifa ya Tukio – Wizi wa Nyumba', l:'Msasani',        s:'pending'},
                ].map((r,i) => (
                  <tr key={i}>
                    <td className="td-mo" style={{fontSize:10.5,color:'var(--td)'}}>{r.t}</td>
                    <td style={{fontSize:11,color:'var(--tl)'}}>{r.a}</td>
                    <td style={{fontSize:10.5,color:'var(--tm)'}}>{r.l}</td>
                    <td><span className={`pill ${r.s==='done'?'p-done':'p-pending'}`}>{r.s==='done'?'Imekamilika':'Inasubiri'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cells + Quick actions */}
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <div className="card">
            <div className="card-h">
              <div className="card-t">🔒 Hali ya Seli</div>
              <button className="btn btn-gh btn-sm" onClick={()=>nav('/management/cells')}>Simamia →</button>
            </div>
            <div style={{padding:'10px 14px',display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
              {CELLS.map(c => (
                <div key={c.no} style={{background:c.status==='full'?'rgba(198,40,40,.12)':c.status==='empty'?'rgba(76,175,80,.08)':'rgba(255,193,7,.08)',border:`1px solid ${c.status==='full'?'rgba(198,40,40,.25)':c.status==='empty'?'rgba(76,175,80,.2)':'rgba(255,193,7,.2)'}`,borderRadius:'var(--r8)',padding:'8px',textAlign:'center'}}>
                  <div style={{fontSize:11,fontWeight:700,color:'var(--tw)'}}>{c.no}</div>
                  <div style={{fontSize:18,margin:'4px 0'}}>{c.status==='full'?'🔴':c.status==='empty'?'🟢':'🟡'}</div>
                  <div style={{fontSize:9.5,color:'var(--tm)'}}>{c.occupied}/{c.capacity}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-h"><div className="card-t">⚡ Vitendo vya Haraka</div></div>
            <div style={{padding:'10px 14px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
              {[
                {ic:'⛓️',lb:'Kukamata Mpya',to:'/enforcement/arrests/new'},
                {ic:'📋',lb:'Toa Citation',to:'/enforcement/citations/new'},
                {ic:'📝',lb:'Ripoti Tukio',to:'/enforcement/incidents'},
                {ic:'🔍',lb:'Tafuta Mtu',  to:'/management/persons'},
              ].map(a => (
                <div key={a.lb} className="qa-item" onClick={()=>nav(a.to)} style={{padding:'8px 6px'}}>
                  <div style={{fontSize:18}}>{a.ic}</div>
                  <div style={{fontSize:10,fontWeight:600,color:'var(--tl)',textAlign:'center',lineHeight:1.2}}>{a.lb}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pending detentions */}
      <div className="card mb-sec">
        <div className="card-h">
          <div><div className="card-t">🔒 Watu Walioko Kizuizini</div><div className="card-st">Seli 6 · Watu 18 kati ya 30</div></div>
          <button className="btn btn-gh btn-sm" onClick={()=>nav('/enforcement/detentions')}>Wote →</button>
        </div>
        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr><th>Namba</th><th>Mtu</th><th>Seli</th><th>Sababu</th><th>Checkin</th><th>Masaa Zilizobaki</th><th>Hali</th></tr></thead>
            <tbody>
              {MOCK_DETENTIONS.map(d => (
                <tr key={d.id}>
                  <td className="td-id">{d.id}</td>
                  <td><div className="td-nm">{d.person}</div><div className="td-sub">NIDA: {d.nida}</div></td>
                  <td className="td-mo">{d.cell}</td>
                  <td style={{fontSize:11}}>{d.reason}</td>
                  <td className="td-mo" style={{fontSize:10.5}}>{d.checkin}</td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:6}}>
                      <div style={{flex:1,background:'rgba(0,0,0,.3)',borderRadius:3,height:4,maxWidth:60}}>
                        <div style={{height:'100%',background:'var(--redL)',borderRadius:3,width:'75%'}} />
                      </div>
                      <span style={{fontSize:10,color:'var(--redL)',fontFamily:'var(--fm)'}}>12h</span>
                    </div>
                  </td>
                  <td><span className="pill p-detained">Kizuizini</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
