import { useNavigate } from 'react-router-dom'
import { useApp } from '@context/AppContext'
import PoliceBadge from '@components/shared/PoliceBadge'
import { MOCK_DASHBOARD_STATS, MOCK_ALERTS, MOCK_CITATIONS, MOCK_ARRESTS, MOCK_REGIONS_STATS, MOCK_OFFICERS } from '@utils/mockData'

const ALERT_CFG = {
  critical:{dot:'#EF5350',bg:'rgba(198,40,40,.08)',cls:'a-critical',lbl:'Muhimu'},
  urgent:  {dot:'#FF7043',bg:'rgba(230,81,0,.08)', cls:'a-urgent',  lbl:'Haraka'},
  info:    {dot:'#64B5F6',bg:'rgba(21,101,192,.08)',cls:'a-info',   lbl:'Taarifa'},
}

const STATUS_CLS = {
  issued:'p-issued', paid:'p-paid', unpaid:'p-unpaid', cancelled:'p-imegha', draft:'p-rasimu',
  pending:'p-pending', detained:'p-detained', completed:'p-done', active:'p-active',
  court:'p-court', closed:'p-closed', critical:'p-critical',
}

const QUICK = [
  {ic:'🔍',lb:'Tafuta Mtu',to:'/management/persons'},
  {ic:'🚗',lb:'Tafuta Gari',to:'/management/vehicles'},
  {ic:'📋',lb:'Toa Citation',to:'/enforcement/citations/new'},
  {ic:'⛓️',lb:'Kukamata',to:'/enforcement/arrests/new'},
  {ic:'📝',lb:'Ripoti Tukio',to:'/enforcement/incidents'},
  {ic:'🚗',lb:'Ripoti Ajali',to:'/enforcement/accidents'},
  {ic:'🎯',lb:'Watuhumiwa',to:'/investigation/wanted'},
  {ic:'👤',lb:'Watu Waliopotea',to:'/investigation/missing'},
  {ic:'📁',lb:'Kesi Mpya',to:'/investigation/cases'},
  {ic:'📄',lb:'PF3 Form',to:'/enforcement/pf3'},
  {ic:'🗺️',lb:'Ramani Hai',to:'/operations/map'},
  {ic:'📊',lb:'Takwimu',to:'/reports/analytics'},
]

const RECENT_ACTIVITY = [
  {ic:'📋',bg:'rgba(26,35,126,.25)',title:'Citation #TZA-2024-00028',sub:'Kuendesha bila leseni · Morogoro Rd',time:'10:35 AM',status:'Imekamilika'},
  {ic:'⛓️',bg:'rgba(198,40,40,.15)',title:'Kukamata #AR-2024-00005',sub:'Mtuhumiwa wa Ukiukaji wa Barabara',time:'09:58 AM',status:'Imekamilika'},
  {ic:'🚗',bg:'rgba(21,101,192,.15)',title:'Ukaguzi wa Gari – T123 DFG',sub:'Ukaguzi wa Kawaida',time:'09:20 AM',status:'Imekamilika'},
  {ic:'👤',bg:'rgba(106,27,154,.15)',title:'Uthibitisho wa Mtu – NIDA: 1234567890123',sub:'Hakuna Rekodi Iliyopatikana',time:'08:55 AM',status:'Imekamilika'},
]

const PENDING_CASES = [
  {ic:'🚗',bg:'rgba(255,143,0,.15)',title:'Kuendesha bila Leseni',loc:'Morogoro Road',time:'10:20 AM'},
  {ic:'⚡',bg:'rgba(198,40,40,.15)',title:'Mwendo Kasi (zaidi ya 80 km/h)',loc:'Morogoro Road',time:'09:43 AM'},
  {ic:'📱',bg:'rgba(21,101,192,.15)',title:'Kutumia Simu Wakati wa Kuendesha',loc:'Morogoro Road',time:'09:15 AM'},
  {ic:'🪑',bg:'rgba(106,27,154,.15)',title:'Kutokuweka Mkanda wa Usalama',loc:'Bagamoyo Road',time:'08:50 AM'},
]

const CHART_DATA = [
  {lbl:'Citations', val:28, pct:53, color:'#1B5E20'},
  {lbl:'Checks',   val:18, pct:34, color:'#FFC107'},
  {lbl:'Arrests',  val:5,  pct:9,  color:'#1565C0'},
  {lbl:'Others',   val:2,  pct:4,  color:'#6A1B9A'},
]

const SHORTCUTS = [
  {ic:'🪪',lb:'Tafuta Leseni'},
  {ic:'🚗',lb:'Tafuta Namba ya Gari'},
  {ic:'📋',lb:'Tafuta Historia ya Makosa'},
  {ic:'⚠️',lb:'Black List Check'},
  {ic:'🛡️',lb:'Insurance Check'},
  {ic:'💳',lb:'Payment Status'},
]

export default function NationalDashboard() {
  const nav = useNavigate()
  const { currentOfficer } = useApp()
  const s = MOCK_DASHBOARD_STATS

  return (
    <div className="afd">

      {/* ── HERO BANNER ── */}
      <div className="hero">
        {/* Officer silhouette */}
        <div className="hero-officer">
          <div className="hero-officer-img">👮</div>
        </div>

        {/* Badge */}
        <PoliceBadge size={56} />

        {/* Content */}
        <div className="hero-content">
          <div className="hero-greeting">Karibu,</div>
          <div className="hero-name">
            {currentOfficer.name}
            <span className="verified-ic">✓</span>
          </div>
          <div className="hero-station">{currentOfficer.station}</div>
          <div className="hero-officer-id">
            <span>🎫</span> Officer ID: {currentOfficer.id}
          </div>
          <div className="hero-online">
            <span style={{width:7,height:7,background:'#4CAF50',borderRadius:'50%',display:'inline-block'}} />
            Online
          </div>
          <div className="hero-motto" style={{marginTop:4}}>
            🛡️ Protect<span>•</span>Serve<span>•</span>Secure
          </div>
        </div>

        {/* Date/time */}
        <div className="hero-meta">
          <div className="hero-meta-box">📅 Jumatatu, 17 Mei 2024</div>
          <div className="hero-meta-box">🕐 10:45 AM</div>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="stats-row s4 mb-sec">
        {[
          {ic:'📋',icCls:'ic-green', n:28, lbl:'Jumla ya Kamata',    sub:'Leo', delta:'↑ 12%', dcls:'up'},
          {ic:'📝',icCls:'ic-blue',  n:19, lbl:'Tiketi Zilizotolewa', sub:'Leo', delta:'↑ 8%',  dcls:'up'},
          {ic:'👤',icCls:'ic-purple',n:7,  lbl:'Maonyo (Warnings)',   sub:'Leo', delta:'↑ 15%', dcls:'up'},
          {ic:'⏳',icCls:'ic-amber', n:5,  lbl:'Inasubiri (Pending)', sub:'Leo', delta:'↓ 5%',  dcls:'down'},
        ].map(c => (
          <div key={c.lbl} className="scard">
            <div className="scard-top">
              <div className={`scard-icon ${c.icCls}`}>{c.ic}</div>
              <div className={`scard-delta ${c.dcls}`}>{c.delta}</div>
            </div>
            <div className="scard-num">{c.n}</div>
            <div className="scard-lbl">{c.lbl}</div>
            <div className="scard-sub">{c.sub}</div>
          </div>
        ))}
      </div>

      {/* ── QUICK ACTIONS + SEARCH ── */}
      <div className="card mb-sec">
        <div style={{padding:'12px 14px 10px',borderBottom:'1px solid var(--b)'}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
            <input className="fi" style={{flex:1,borderRadius:20,padding:'8px 16px 8px 14px'}}
              placeholder="🔍 Tafuta mtu, gari, leseni, ticket n.k..." />
            <button className="btn btn-g" style={{borderRadius:20,padding:'8px 16px',gap:6}}
              onClick={()=>nav('/management/persons')}>
              📷 Scan QR / NIDA
            </button>
          </div>
        </div>
        {/* Quick action row */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:0,borderBottom:'1px solid var(--b)'}}>
          {QUICK.slice(0,7).map(q => (
            <div key={q.lb} onClick={()=>nav(q.to)}
              style={{padding:'12px 4px 10px',textAlign:'center',cursor:'pointer',borderRight:'1px solid var(--b)',transition:'background .12s'}}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(26,35,126,.2)'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <div style={{fontSize:22,marginBottom:5}}>{q.ic}</div>
              <div style={{fontSize:9.5,fontWeight:600,color:'var(--tl)',lineHeight:1.2}}>{q.lb}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MUHTASARI WA LEO – 5 stats ── */}
      <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:10}}>
        <span style={{fontSize:14}}>📊</span>
        <div style={{fontSize:11,fontWeight:800,color:'var(--tm)',textTransform:'uppercase',letterSpacing:1}}>Muhtasari wa Leo</div>
      </div>

      <div className="stats-row s5 mb-sec">
        {[
          {ic:'📋',icCls:'ic-green', n:28,   lbl:'Citations Issued',   delta:'↑ 12% vs jana', dcls:'up'},
          {ic:'⛓️',icCls:'ic-amber', n:5,    lbl:'Arrests Made',       delta:'↑ 25% vs jana', dcls:'up'},
          {ic:'🚗',icCls:'ic-blue',  n:18,   lbl:'Vehicles Checked',   delta:'↑ 8% vs jana',  dcls:'up'},
          {ic:'👥',icCls:'ic-purple',n:32,   lbl:'Persons Checked',    delta:'↑ 15% vs jana', dcls:'up'},
          {ic:'🚨',icCls:'ic-red',   n:0,    lbl:'Accidents Reported', delta:'→ 0% vs jana',  dcls:'flat'},
        ].map(c => (
          <div key={c.lbl} className="scard">
            <div className="scard-top">
              <div className={`scard-icon ${c.icCls}`}>{c.ic}</div>
              <div className={`scard-delta ${c.dcls}`}>{c.delta}</div>
            </div>
            <div className="scard-num">{c.n}</div>
            <div className="scard-lbl">{c.lbl}</div>
          </div>
        ))}
      </div>

      {/* ── 2-COLUMN: Recent Activity + Takwimu ── */}
      <div className="row5 mb-sec">
        {/* Left: Recent Activity */}
        <div className="card">
          <div className="card-h">
            <div>
              <div className="card-t">🕐 Shughuli za Hivi Karibuni</div>
            </div>
            <span className="view-all" onClick={()=>nav('/enforcement/citations')}>View All</span>
          </div>
          {RECENT_ACTIVITY.map((a,i) => (
            <div key={i} className="act-item">
              <div className="act-ic" style={{background:a.bg}}>{a.ic}</div>
              <div className="act-meta">
                <div className="act-title">{a.title}</div>
                <div className="act-sub">{a.sub}</div>
              </div>
              <div style={{textAlign:'right',flexShrink:0}}>
                <div className="act-time">{a.time}</div>
                <span className="pill p-done" style={{marginTop:3,display:'inline-flex'}}>{a.status}</span>
              </div>
            </div>
          ))}
          <div style={{padding:'8px 14px',textAlign:'center',borderTop:'1px solid var(--b)'}}>
            <span style={{fontSize:11,color:'var(--gold)',cursor:'pointer',fontWeight:600}}
              onClick={()=>nav('/enforcement/citations')}>
              Tazama historia kamili →
            </span>
          </div>
        </div>

        {/* Right: Donut + Safety */}
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {/* Donut chart */}
          <div className="card" style={{flex:1}}>
            <div className="card-h">
              <div className="card-t">📊 Takwimu za Leo</div>
              <div style={{display:'flex',gap:4}}>
                <button className="btn btn-p btn-sm">Leo</button>
                <button className="btn btn-gh btn-sm">Wiki</button>
              </div>
            </div>
            <div className="card-bd">
              {/* SVG donut */}
              <div style={{display:'flex',alignItems:'center',gap:16}}>
                <div style={{position:'relative',flexShrink:0}}>
                  <svg width="110" height="110" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="3.2"/>
                    {/* Green: 53% */}
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1B5E20" strokeWidth="3.2"
                      strokeDasharray="33.3 66.7" strokeDashoffset="25" />
                    {/* Yellow: 34% */}
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#FFC107" strokeWidth="3.2"
                      strokeDasharray="21.4 78.6" strokeDashoffset="-8.3" />
                    {/* Blue: 9% */}
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1565C0" strokeWidth="3.2"
                      strokeDasharray="5.7 94.3" strokeDashoffset="-29.7" />
                    {/* Purple: 4% */}
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#6A1B9A" strokeWidth="3.2"
                      strokeDasharray="2.5 97.5" strokeDashoffset="-35.4" />
                  </svg>
                  <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                    <div style={{fontSize:20,fontWeight:800,color:'var(--tw)',fontFamily:'var(--fm)',lineHeight:1}}>53</div>
                    <div style={{fontSize:9,color:'var(--tm)'}}>Jumla</div>
                  </div>
                </div>
                <div className="legend">
                  {[['#1B5E20','Citations','28 (53%)'],['#FFC107','Checks','18 (34%)'],['#1565C0','Arrests','5 (9%)'],['#6A1B9A','Others','2 (4%)']].map(([c,l,v]) => (
                    <div key={l} className="leg-item">
                      <div className="leg-dot" style={{background:c}} />
                      <span>{l}</span>
                      <span className="leg-val">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Safety banner */}
          <div className="safety-card">
            <div className="safety-ic">🛡️</div>
            <div>
              <div className="safety-t">Usalama Kwanza</div>
              <div className="safety-d">Kila hatua yako inalinda maisha na mali za watanzania.</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Pending HATUA + Quick Actions ── */}
      <div className="row5 mb-sec">
        {/* Pending cases */}
        <div className="card">
          <div className="card-h">
            <div className="card-t">⏳ Kesi Zinazosubili HATUA</div>
            <span className="view-all" onClick={()=>nav('/enforcement/citations')}>View All</span>
          </div>
          {PENDING_CASES.map((p,i) => (
            <div key={i} className="pend-item" onClick={()=>nav('/enforcement/citations')}>
              <div className="pend-ic" style={{background:p.bg}}>{p.ic}</div>
              <div className="pend-meta">
                <div className="pend-title">{p.title}</div>
                <div className="pend-loc">{p.loc}</div>
              </div>
              <div style={{textAlign:'right',flexShrink:0}}>
                <div className="pend-time">{p.time}</div>
                <span className="pill p-pending" style={{marginTop:3,display:'inline-flex',fontSize:'8.5px'}}>Inasubiri</span>
              </div>
              <span style={{color:'var(--tm)',marginLeft:4}}>›</span>
            </div>
          ))}
        </div>

        {/* Vitendo vya Haraka */}
        <div className="card">
          <div className="card-h"><div className="card-t">⚡ Vitendo vya Haraka</div></div>
          <div className="card-bd">
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
              {[
                {ic:'⛓️',bg:'rgba(26,35,126,.25)',lb:'Kamata\n(Arrest)',to:'/enforcement/arrests/new'},
                {ic:'📋',bg:'rgba(21,101,192,.15)',lb:'Toa Tiketi\n(Citation)',to:'/enforcement/citations/new'},
                {ic:'⚠️',bg:'rgba(255,193,7,.15)',lb:'Maonyo\n(Warning)',to:'/enforcement/incidents'},
                {ic:'🔍',bg:'rgba(106,27,154,.15)',lb:'Tafuta\nMtu',to:'/management/persons'},
                {ic:'🚗',bg:'rgba(21,101,192,.15)',lb:'Tafuta\nGari',to:'/management/vehicles'},
                {ic:'🚗',bg:'rgba(198,40,40,.15)',lb:'Ripoti ya\nAjali',to:'/enforcement/accidents'},
              ].map(a => (
                <div key={a.lb} onClick={()=>nav(a.to)}
                  style={{background:a.bg,borderRadius:'var(--r8)',padding:'10px 6px',textAlign:'center',cursor:'pointer',transition:'var(--t)',border:'1px solid var(--b)'}}
                  onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.2)'}
                  onMouseLeave={e=>e.currentTarget.style.filter='none'}>
                  <div style={{fontSize:22,marginBottom:4}}>{a.ic}</div>
                  <div style={{fontSize:9.5,fontWeight:600,color:'var(--tl)',lineHeight:1.3}}>{a.lb}</div>
                </div>
              ))}
            </div>

            {/* Taarifa Muhimu */}
            <div style={{marginTop:10,background:'rgba(26,35,126,.15)',border:'1px solid rgba(26,35,126,.3)',borderRadius:'var(--r8)',padding:'10px 12px'}}>
              <div style={{fontSize:11,fontWeight:700,color:'var(--tw)',marginBottom:4}}>🛡️ Kumbuka!</div>
              <div style={{fontSize:10.5,color:'var(--tm)',lineHeight:1.5}}>Zingatia usalama barabarani. Usalama wa raia ni jukumu letu sote.</div>
            </div>

            {/* 112 */}
            <div className="cta-112" onClick={()=>{}}>
              <div className="cta-112-t">📞 Ripoti Tatizo lolote</div>
              <div className="cta-112-r">📞 Piga 112 ›</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Alerts ── */}
      <div className="card mb-sec">
        <div className="card-h">
          <div>
            <div className="card-t">🚨 Taarifa na Tahadhari</div>
          </div>
          <span className="view-all" onClick={()=>nav('/operations/alerts')}>Ona Zote →</span>
        </div>
        <div className="card-bd">
          {MOCK_ALERTS.map(a => {
            const cfg = ALERT_CFG[a.type]
            return (
              <div key={a.id} className={`alert-item ${cfg.cls}`}>
                <div className="a-dot" style={{background:cfg.dot}} />
                <div style={{flex:1}}>
                  <div className="a-title">{a.title}</div>
                  <div className="a-desc">{a.desc}</div>
                  <div className="a-time">🕐 {a.time}</div>
                </div>
                <span className="a-badge" style={{background:`${cfg.dot}20`,color:cfg.dot}}>{cfg.lbl}</span>
                <span style={{color:'var(--tm)',marginLeft:4}}>›</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Vifupisho ── */}
      <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:10}}>
        <span style={{fontSize:14}}>⚡</span>
        <div style={{fontSize:11,fontWeight:800,color:'var(--tm)',textTransform:'uppercase',letterSpacing:1}}>Vifupisho vya Haraka</div>
      </div>

      <div className="sc-grid mb-sec">
        {SHORTCUTS.map(s => (
          <div key={s.lb} className="sc-item">
            <div className="sc-ic">{s.ic}</div>
            <div className="sc-lbl">{s.lb}</div>
          </div>
        ))}
      </div>

      {/* ── Region map + Officers ── */}
      <div className="row4 mb-sec">
        <div className="card">
          <div className="card-h">
            <div className="card-t">🗺️ Uhalifu kwa Mkoa</div>
            <span className="view-all" onClick={()=>nav('/operations/map')}>Ramani →</span>
          </div>
          <div className="card-bd">
            {/* Map placeholder */}
            <div style={{background:'rgba(0,0,0,.3)',borderRadius:'var(--r8)',height:110,marginBottom:12,position:'relative',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(26,35,126,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(26,35,126,.08) 1px,transparent 1px)',backgroundSize:'18px 18px'}} />
              <div style={{position:'relative',textAlign:'center'}}>
                <div style={{fontSize:30}}>🇹🇿</div>
                <div style={{fontSize:9.5,color:'var(--tm)',marginTop:2}}>Tanzania · Live Operations Map</div>
              </div>
            </div>
            {MOCK_REGIONS_STATS.map(r => (
              <div key={r.name} className="heat-row">
                <div className="heat-lbl">{r.name}</div>
                <div className="heat-bar">
                  <div className="heat-fill" style={{width:`${r.pct}%`,background:r.color}} />
                </div>
                <div className="heat-cnt">{r.count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-h">
            <div className="card-t">👮 Maafisa Online</div>
            <span className="view-all" onClick={()=>nav('/management/officers')}>Wote →</span>
          </div>
          <div>
            {MOCK_OFFICERS.map(o => (
              <div key={o.id} className="act-item">
                <div className="act-ic" style={{background:'rgba(26,35,126,.2)',borderRadius:'50%',fontSize:14}}>👮</div>
                <div className="act-meta">
                  <div className="act-title" style={{fontSize:11}}>{o.name}</div>
                  <div className="act-sub">{o.rank} · {o.station}</div>
                </div>
                <div style={{width:7,height:7,borderRadius:'50%',background:o.online?'#4CAF50':'#555',flexShrink:0}} />
              </div>
            ))}

            {/* National stats */}
            <div style={{padding:'10px 14px',borderTop:'1px solid var(--b)'}}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8}}>
                {[[s.officersOnline.toLocaleString(),'Maafisa Hai'],[s.totalStations.toString(),'Vituo'],['26','Mikoa'],['99.8%','Upatikanaji']].map(([v,l]) => (
                  <div key={l} style={{textAlign:'center',padding:'8px',background:'rgba(0,0,0,.2)',borderRadius:'var(--r8)'}}>
                    <div style={{fontSize:18,fontWeight:800,color:'var(--gold)',fontFamily:'var(--fm)',lineHeight:1}}>{v}</div>
                    <div style={{fontSize:9,color:'var(--tm)',textTransform:'uppercase',letterSpacing:.4,marginTop:2}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Citations Table ── */}
      <div className="card mb-sec">
        <div className="card-h">
          <div>
            <div className="card-t">📋 Citations za Hivi Karibuni</div>
            <div className="card-st">Leo: {s.citationsToday} citations · TZS {(MOCK_CITATIONS.reduce((a,c)=>a+c.fine,0)/1000000).toFixed(1)}M</div>
          </div>
          <div className="flex g8">
            <button className="btn btn-gh btn-sm">⬇ Pakua</button>
            <button className="btn btn-g btn-sm" onClick={()=>nav('/enforcement/citations/new')}>+ Toa Citation</button>
          </div>
        </div>
        <div className="tw">
          <table>
            <thead><tr>
              <th>#</th><th>Namba ya Citation</th><th>Mtuhumiwa</th>
              <th>Gari</th><th>Makosa</th><th>Afisa</th>
              <th>Tarehe</th><th>Faini (TZS)</th><th>Hali</th><th></th>
            </tr></thead>
            <tbody>
              {MOCK_CITATIONS.map(c => (
                <tr key={c.id} onClick={()=>nav(`/enforcement/citations/${c.id}`)}>
                  <td className="td-mo" style={{color:'var(--tm)'}}>{c.num}</td>
                  <td className="td-id">{c.id}</td>
                  <td>
                    <div className="flex aic g8">
                      <div className="td-ph">👤</div>
                      <div>
                        <div className="td-nm">{c.suspect}</div>
                        <div className="td-sub">NIDA: {c.nida}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="td-mo" style={{background:'rgba(255,255,255,.06)',border:'1px solid var(--b)',padding:'2px 7px',borderRadius:'var(--r4)',display:'inline-block'}}>{c.vehicle}</span>
                  </td>
                  <td style={{fontSize:11,maxWidth:160}}>{c.offence}</td>
                  <td style={{fontSize:11}}>{c.officer}</td>
                  <td className="td-mo" style={{fontSize:10.5}}>{c.date}<br/><span style={{color:'var(--td)'}}>{c.time}</span></td>
                  <td className="td-mo">{c.fine.toLocaleString()}</td>
                  <td><span className={`pill ${STATUS_CLS[c.status]||'p-closed'}`}>{
                    {issued:'Imetolewa',paid:'Imelipwa',unpaid:'Haijalipwa',cancelled:'Imeghairiwa',draft:'Rasimu'}[c.status]||c.status
                  }</span></td>
                  <td><button className="btn btn-gh btn-sm" onClick={e=>{e.stopPropagation();nav(`/enforcement/citations/${c.id}`)}}>Angalia</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pag">
          <div className="pag-info">Inaonyesha 1–{MOCK_CITATIONS.length} ya 4,291</div>
          <button className="btn btn-gh btn-sm" onClick={()=>nav('/enforcement/citations')}>Ona Zote →</button>
        </div>
      </div>

    </div>
  )
}
