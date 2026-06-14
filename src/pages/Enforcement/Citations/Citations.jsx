import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumb  from '@components/ui/Breadcrumb'
import Tabs        from '@components/ui/Tabs'
import Badge       from '@components/ui/Badge'
import Button      from '@components/ui/Button'
import { Card, CardHeader, CardBody } from '@components/ui/Card'
import { useSearch } from '@hooks/useSearch'
import { MOCK_CITATIONS } from '@utils/mockData'

const TABS = [
  { id:'all',       label:'Zote' },
  { id:'issued',    label:'Imetolewa' },
  { id:'paid',      label:'Imelipwa' },
  { id:'unpaid',    label:'Haijalipwa' },
  { id:'cancelled', label:'Imeghairiwa' },
]

export default function Citations() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('all')
  const { query, setQuery, results } = useSearch(MOCK_CITATIONS, ['suspect','vehicle','offence','id'])

  const filtered = tab === 'all' ? results : results.filter(c => c.status === tab)

  const totals = {
    total:     MOCK_CITATIONS.length,
    issued:    MOCK_CITATIONS.filter(c => c.status === 'issued').length,
    paid:      MOCK_CITATIONS.filter(c => c.status === 'paid').length,
    unpaid:    MOCK_CITATIONS.filter(c => c.status === 'unpaid').length,
    cancelled: MOCK_CITATIONS.filter(c => c.status === 'cancelled').length,
    totalFine: MOCK_CITATIONS.reduce((a,c) => a + c.fine, 0),
  }

  return (
    <div className="animate-fade-in">
      <Breadcrumb items={[{label:'🏠 Makao Makuu', href:'/'},{label:'Utekelezaji'},{label:'Citations'}]} />

      <div className="page-header">
        <div>
          <h1>📋 Citations / Tiketi</h1>
          <p>Angalia, tafuta na dhibiti citations zote · {totals.total.toLocaleString()} jumla</p>
        </div>
        <div className="flex gap-8">
          <Button variant="outline">⬇ Pakua</Button>
          <Button variant="accent" onClick={() => navigate('/enforcement/citations/new')}>+ Toa Citation Mpya</Button>
        </div>
      </div>

      {/* Summary pills */}
      <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:20 }}>
        {[
          { label:'Zote',        val:totals.total,     color:'var(--clr-white)' },
          { label:'Imetolewa',   val:totals.issued,    color:'#64B5F6' },
          { label:'Imelipwa',    val:totals.paid,      color:'#66BB6A' },
          { label:'Haijalipwa',  val:totals.unpaid,    color:'var(--clr-accent)' },
          { label:'Jumla Faini', val:`TZS ${(totals.totalFine/1000000).toFixed(1)}M`, color:'var(--clr-accent)' },
        ].map(p => (
          <div key={p.label} style={{ background:'var(--clr-panel)', border:'1px solid var(--clr-border)', borderRadius:'var(--r)', padding:'10px 16px', textAlign:'center', minWidth:100 }}>
            <div style={{ fontSize:20, fontWeight:800, color:p.color, fontFamily:'var(--font-mono)' }}>{typeof p.val === 'number' ? p.val.toLocaleString() : p.val}</div>
            <div style={{ fontSize:9, color:'var(--clr-muted)', textTransform:'uppercase', letterSpacing:.5 }}>{p.label}</div>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader
          title={null}
          action={
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <Tabs tabs={TABS} active={tab} onChange={setTab} />
              <input className="form-input" style={{ width:200, fontSize:11, padding:'6px 10px' }}
                placeholder="🔍 Tafuta..." value={query} onChange={e => setQuery(e.target.value)} />
              <select className="form-select" style={{ width:'auto', fontSize:11, padding:'6px 10px' }}>
                <option>Tarehe: Zote</option><option>Leo</option><option>Wiki Hii</option>
              </select>
            </div>
          }
        />
        <CardBody noPadding>
          <div className="table-wrap">
            <table>
              <thead><tr>
                <th>#</th><th>Namba ya Citation</th><th>Mtuhumiwa</th>
                <th>Gari</th><th>Makosa</th><th>Afisa</th>
                <th>Mahali</th><th>Tarehe</th><th>Faini (TZS)</th><th>Hali</th><th></th>
              </tr></thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id}>
                    <td className="td-mono">{c.num}</td>
                    <td className="td-mono" style={{ color:'var(--clr-accent)' }}>{c.id}</td>
                    <td><div className="td-name">{c.suspect}</div><div className="td-sub">NIDA: {c.nida}</div></td>
                    <td className="td-mono">{c.vehicle}</td>
                    <td style={{ fontSize:11 }}>{c.offence}</td>
                    <td style={{ fontSize:11 }}>{c.officer}</td>
                    <td style={{ fontSize:11 }}>{c.location}</td>
                    <td style={{ fontFamily:'var(--font-mono)', fontSize:10 }}>{c.date} {c.time}</td>
                    <td className="td-mono">{c.fine.toLocaleString()}</td>
                    <td><Badge status={c.status} /></td>
                    <td>
                      <Button variant="outline" size="sm" onClick={() => navigate(`/enforcement/citations/${c.id}`)}>
                        Angalia
                      </Button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={11} style={{ textAlign:'center', padding:32, color:'var(--clr-muted)' }}>Hakuna matokeo</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div style={{ padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid var(--clr-border)' }}>
            <div style={{ fontSize:11, color:'var(--clr-muted)' }}>Inaonyesha {filtered.length} ya {MOCK_CITATIONS.length.toLocaleString()} matokeo</div>
            <div style={{ display:'flex', gap:6 }}>
              {[1,2,3,'...',537].map((p,i) => (
                <button key={i} className={`btn btn-sm ${p===1?'btn-primary':'btn-outline'}`}>{p}</button>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
