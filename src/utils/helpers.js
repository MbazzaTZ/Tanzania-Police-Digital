export const formatTZS = n => `TZS ${Number(n).toLocaleString('en-TZ')}`
export const formatDate = d => { if(!d) return '–'; const dt=new Date(d); return `${String(dt.getDate()).padStart(2,'0')}/${String(dt.getMonth()+1).padStart(2,'0')}/${dt.getFullYear()}` }
export const truncate = (s,n=40) => s&&s.length>n ? s.slice(0,n)+'…' : s
export const cls = (...c) => c.filter(Boolean).join(' ')
export const newId = (prefix,num) => `${prefix}-${new Date().getFullYear()}-${String(num).padStart(5,'0')}`

export const STATUS_CONFIG = {
  issued:        {label:'Imetolewa',    cls:'s-issued'},
  paid:          {label:'Imelipwa',     cls:'s-paid'},
  unpaid:        {label:'Haijalipwa',   cls:'s-unpaid'},
  cancelled:     {label:'Imeghairiwa',  cls:'s-cancelled'},
  draft:         {label:'Rasimu',       cls:'s-draft'},
  pending:       {label:'Inasubiri',    cls:'s-pending'},
  detained:      {label:'Kizuizini',    cls:'s-detained'},
  court:         {label:'Mahakamani',   cls:'s-court'},
  completed:     {label:'Imekamilika',  cls:'s-done'},
  active:        {label:'Hai',          cls:'s-active'},
  closed:        {label:'Imefungwa',    cls:'s-closed'},
  critical:      {label:'Muhimu',       cls:'s-critical'},
  high:          {label:'Juu',          cls:'s-high'},
  medium:        {label:'Wastani',      cls:'s-medium'},
  investigating: {label:'Inachunguzwa', cls:'s-pending'},
}

export const ALERT_CONFIG = {
  critical: {label:'Muhimu', color:'var(--red)',    bg:'rgba(198,40,40,.08)',   dot:'#EF5350'},
  urgent:   {label:'Haraka', color:'var(--orange)', bg:'rgba(230,81,0,.08)',    dot:'#FF7043'},
  info:     {label:'Taarifa',color:'var(--blue)',   bg:'rgba(21,101,192,.08)',  dot:'#64B5F6'},
}
