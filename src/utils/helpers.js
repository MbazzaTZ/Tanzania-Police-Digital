// ── Format TZS currency ──
export const formatTZS = (amount) =>
  `TZS ${Number(amount).toLocaleString('en-TZ')}`

// ── Format date DD/MM/YYYY ──
export const formatDate = (date) => {
  if (!date) return '–'
  const d = new Date(date)
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`
}

// ── Truncate text ──
export const truncate = (str, len = 40) =>
  str && str.length > len ? str.slice(0, len) + '…' : str

// ── Status config ──
export const STATUS_CONFIG = {
  issued:    { label:'Imetolewa',   labelEn:'Issued',    cls:'s-issued'   },
  paid:      { label:'Imelipwa',    labelEn:'Paid',      cls:'s-paid'     },
  unpaid:    { label:'Haijalipwa',  labelEn:'Unpaid',    cls:'s-pending'  },
  cancelled: { label:'Imeghairiwa', labelEn:'Cancelled', cls:'s-closed'   },
  draft:     { label:'Rasimu',      labelEn:'Draft',     cls:'s-draft'    },
  pending:   { label:'Inasubiri',   labelEn:'Pending',   cls:'s-pending'  },
  detained:  { label:'Kizuizini',   labelEn:'Detained',  cls:'s-critical' },
  court:     { label:'Mahakamani',  labelEn:'In Court',  cls:'s-issued'   },
  completed: { label:'Imekamilika', labelEn:'Completed', cls:'s-paid'     },
  active:    { label:'Hai',         labelEn:'Active',    cls:'s-active'   },
  closed:    { label:'Imefungwa',   labelEn:'Closed',    cls:'s-closed'   },
  critical:  { label:'Muhimu',      labelEn:'Critical',  cls:'s-critical' },
}

// ── Alert type config ──
export const ALERT_CONFIG = {
  critical: { label:'Muhimu',  color:'var(--clr-red)',    bg:'rgba(198,40,40,.08)',    dot:'#EF5350' },
  urgent:   { label:'Haraka',  color:'var(--clr-orange)', bg:'rgba(230,81,0,.08)',     dot:'#FF7043' },
  info:     { label:'Taarifa', color:'var(--clr-blue)',   bg:'rgba(21,101,192,.08)',   dot:'#64B5F6' },
}

// ── Generate citation ID ──
export const newCitationId = (num) =>
  `CIT-${new Date().getFullYear()}-${String(num).padStart(5,'0')}`

// ── Class helper ──
export const cls = (...classes) => classes.filter(Boolean).join(' ')
