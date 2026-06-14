const STATUS_MAP = {
  issued:       {label:'Imetolewa',    cls:'s-issued'},
  paid:         {label:'Imelipwa',     cls:'s-paid'},
  imepwa:       {label:'Imelipwa',     cls:'s-paid'},
  haijapwa:     {label:'Haijalipwa',   cls:'s-unpaid'},
  unpaid:       {label:'Haijalipwa',   cls:'s-unpaid'},
  cancelled:    {label:'Imeghairiwa',  cls:'s-cancelled'},
  draft:        {label:'Rasimu',       cls:'s-draft'},
  pending:      {label:'Inasubiri',    cls:'s-pending'},
  detained:     {label:'Kizuizini',    cls:'s-detained'},
  court:        {label:'Mahakamani',   cls:'s-court'},
  completed:    {label:'Imekamilika',  cls:'s-done'},
  active:       {label:'Hai',          cls:'s-active'},
  closed:       {label:'Imefungwa',    cls:'s-closed'},
  critical:     {label:'Muhimu Sana',  cls:'s-critical'},
  high:         {label:'Juu',          cls:'s-high'},
  medium:       {label:'Wastani',      cls:'s-medium'},
  low:          {label:'Chini',        cls:'s-closed'},
  open:         {label:'Wazi',         cls:'s-active'},
  investigating:{label:'Inachunguzwa', cls:'s-pending'},
  halali:       {label:'Halali',       cls:'s-halali'},
  Felony:       {label:'Felony',       cls:'s-critical'},
  Misdemeanor:  {label:'Misdemeanor',  cls:'s-pending'},
}

export default function Badge({ status, size = 'sm' }) {
  const cfg = STATUS_MAP[status] || STATUS_MAP[status?.toLowerCase()] || {label: status || '–', cls: 's-closed'}
  return (
    <span className={`status ${cfg.cls}`}
      style={size==='xs' ? {fontSize:'8.5px', padding:'1px 6px'} : {}}>
      {cfg.label}
    </span>
  )
}
