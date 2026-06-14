const M = {
  issued:'p-issued',paid:'p-paid',unpaid:'p-unpaid',imepwa:'p-imepwa',haijapwa:'p-haijapwa',
  cancelled:'p-imegha',draft:'p-rasimu',pending:'p-pending',detained:'p-detained',
  court:'p-court',completed:'p-done',active:'p-active',closed:'p-closed',
  critical:'p-critical',high:'p-critical',medium:'p-pending',halali:'p-halali',
  Felony:'p-critical',Misdemeanor:'p-pending',open:'p-active',investigating:'p-pending',
}
const L = {
  issued:'Imetolewa',paid:'Imelipwa',unpaid:'Haijalipwa',imepwa:'Imelipwa',haijapwa:'Haijalipwa',
  cancelled:'Imeghairiwa',draft:'Rasimu',pending:'Inasubiri',detained:'Kizuizini',
  court:'Mahakamani',completed:'Imekamilika',active:'Hai',closed:'Imefungwa',
  critical:'Muhimu',high:'Juu',medium:'Wastani',halali:'Halali',
  Felony:'Felony',Misdemeanor:'Misdemeanor',open:'Wazi',investigating:'Inachunguzwa',
}
export default function Badge({ status, xs }) {
  const k = status?.toLowerCase ? status.toLowerCase() : status
  const cls = M[status] || M[k] || 'p-closed'
  const lbl = L[status] || L[k] || status || '–'
  return <span className={`pill ${cls}`} style={xs?{fontSize:'8.5px',padding:'1px 6px'}:{}}>{lbl}</span>
}
