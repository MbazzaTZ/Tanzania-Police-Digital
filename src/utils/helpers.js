export const formatTZS = (n) => `TZS ${Number(n||0).toLocaleString('en-TZ')}`
export const formatDate = (d) => {
  if (!d) return '–'
  try { const dt=new Date(d); return `${String(dt.getDate()).padStart(2,'0')}/${String(dt.getMonth()+1).padStart(2,'0')}/${dt.getFullYear()}` }
  catch { return d }
}
export const truncate = (s,n=36) => s&&s.length>n ? s.slice(0,n)+'…' : s
export const cls = (...c) => c.filter(Boolean).join(' ')
export const newId = (prefix,num) => `${prefix}-${new Date().getFullYear()}-${String(num).padStart(5,'0')}`

export const STATUS_CONFIG = {
  issued:       {label:'Imetolewa',   cls:'s-issued'},
  paid:         {label:'Imelipwa',    cls:'s-paid'},
  unpaid:       {label:'Haijalipwa',  cls:'s-pending'},
  cancelled:    {label:'Imeghairiwa', cls:'s-closed'},
  draft:        {label:'Rasimu',      cls:'s-draft'},
  pending:      {label:'Inasubiri',   cls:'s-pending'},
  detained:     {label:'Kizuizini',   cls:'s-critical'},
  court:        {label:'Mahakamani',  cls:'s-issued'},
  completed:    {label:'Imekamilika', cls:'s-paid'},
  active:       {label:'Hai',         cls:'s-active'},
  open:         {label:'Wazi',        cls:'s-active'},
  closed:       {label:'Imefungwa',   cls:'s-closed'},
  critical:     {label:'Muhimu',      cls:'s-critical'},
  high:         {label:'Juu',         cls:'s-critical'},
  medium:       {label:'Wastani',     cls:'s-pending'},
  low:          {label:'Chini',       cls:'s-closed'},
  investigating:{label:'Inachunguzwa',cls:'s-pending'},
  released:     {label:'Aliachiwa',   cls:'s-closed'},
  convicted:    {label:'Alihukumiwa', cls:'s-critical'},
  acquitted:    {label:'Aliachiliwa', cls:'s-paid'},
}

export const ALERT_CONFIG = {
  critical:{label:'Muhimu', color:'var(--clr-red)',    bg:'rgba(198,40,40,.09)',  dot:'#EF5350'},
  urgent:  {label:'Haraka', color:'var(--clr-orange)', bg:'rgba(230,81,0,.09)',   dot:'#FF7043'},
  info:    {label:'Taarifa',color:'var(--clr-blue)',   bg:'rgba(21,101,192,.09)', dot:'#64B5F6'},
}

export const PRIORITY_COLOR = {
  critical:'#EF5350', high:'#FF7043', medium:' var(--clr-accent)', low:'#9E9E9E'
}
