// =========================================================
// TPDOP – RBAC Utility  (matches full spec)
// =========================================================
import { PERMISSIONS } from './constants'

export const isSuper = (role) => role === 'igp' || role === 'digp'

export function hasPermission(userRole, permission) {
  if (isSuper(userRole)) return true
  const allowed = PERMISSIONS[permission]
  if (!allowed) return false
  return allowed.includes('*') || allowed.includes(userRole)
}

export function canAccess(userRole, feature) {
  if (isSuper(userRole)) return true
  const map = {
    // Traffic Officer – only traffic tools
    citations:         ['traffic_officer','rpc','ocd','ocs','igp','digp'],
    accidents:         ['traffic_officer','rpc','ocd','ocs','igp','digp'],
    traffic_dashboard: ['traffic_officer','rpc','ocd','ocs','igp','digp'],
    // Regular Officer
    arrests:           ['regular_officer','cid_officer','rpc','ocd','ocs','igp','digp'],
    detentions:        ['regular_officer','cid_officer','rpc','ocd','ocs','igp','digp'],
    incidents:         ['regular_officer','rpc','ocd','ocs','igp','digp'],
    pf3:               ['regular_officer','cid_officer','rpc','ocd','ocs','igp','digp'],
    patrol:            ['regular_officer','rpc','ocd','ocs','igp','digp'],
    communications:    ['*'],
    // CID
    cases:             ['cid_officer','rpc','igp','digp'],
    warrants:          ['cid_officer','igp','digp'],
    evidence:          ['cid_officer','forensic_officer','igp','digp'],
    forensics:         ['forensic_officer','cid_officer','igp','digp'],
    wanted:            ['cid_officer','regular_officer','rpc','ocd','ocs','igp','digp'],
    missing:           ['regular_officer','cid_officer','rpc','ocd','ocs','igp','digp'],
    // Intelligence — RPC and above only
    intelligence:      ['rpc','igp','digp'],
    // Leadership only
    hr:                ['rpc','ocd','ocs','igp','digp'],
    national_stats:    ['rpc','igp','digp'],
    // System — IGP only
    internal_affairs:  ['igp','digp'],
    rbac:              ['igp'],
    audit:             ['igp','digp'],
  }
  const allowed = map[feature]
  if (!allowed) return true
  return allowed.includes('*') || allowed.includes(userRole)
}

export function getDashboardScope(role) {
  const scopes = {
    igp:'national', digp:'national', rpc:'regional',
    ocd:'district',  ocs:'station',
    cp:'national',  scp:'national', dcp:'national', acp:'regional',
    ssp:'district',  sp:'district',  asp:'station',  inspector:'station',
    ssgt:'station', sergeant:'station', corporal:'station', constable:'station',
    traffic_officer:'station', regular_officer:'station',
    cid_officer:'station', forensic_officer:'station',
  }
  return scopes[role] || 'station'
}

// ── Full nav items — each item specifies exactly which roles see it ──
const ALL_NAV = [
  // ─ DASHIBODI ─
  { to:'/dashboard', icon:'📊', label:'Dashibodi ya Taifa',       section:'Dashibodi',              roles:['igp','digp'] },
  { to:'/dashboard/regional',    icon:'🗺️', label:'Dashibodi ya Mkoa',        section:'Dashibodi',              roles:['rpc','igp','digp'] },
  { to:'/dashboard/district',    icon:'🏛️', label:'Dashibodi ya Wilaya',      section:'Dashibodi',              roles:['ocd','rpc','igp','digp'] },
  { to:'/dashboard/station',     icon:'🏢', label:'Dashibodi ya Kituo',       section:'Dashibodi',              roles:['ocs','ocd','rpc','igp','digp','traffic_officer','regular_officer','cid_officer','forensic_officer','inspector','asp','sp','ssp'] },

  // ─ OPERESHENI ─
  { to:'/operations/map',        icon:'🗺️', label:'Ramani ya Operesheni',     section:'Operesheni',             roles:['*'] },
  { to:'/operations/alerts',     icon:'🚨', label:'Taarifa za Haraka', badge:5,section:'Operesheni',             roles:['*'] },
  { to:'/operations/patrol',     icon:'🚔', label:'Doria / Patrol',           section:'Operesheni',             roles:['regular_officer','ocs','ocd','rpc','igp','digp'] },
  { to:'/operations/roadblocks', icon:'🚧', label:'Vizuizi / Roadblocks',     section:'Operesheni',             roles:['regular_officer','traffic_officer','ocs','ocd','rpc','igp','digp'] },
  { to:'/operations/checkpoints',icon:'⛽', label:'Vituo vya Ukaguzi',        section:'Operesheni',             roles:['traffic_officer','regular_officer','ocs','ocd','rpc','igp','digp'] },

  // ─ UTEKELEZAJI – BARABARA (Traffic Officer) ─
  { to:'/enforcement/citations', icon:'📋', label:'Citations / Tiketi',       section:'Utekelezaji – Barabara', roles:['traffic_officer','ocs','ocd','rpc','igp','digp'] },
  { to:'/enforcement/accidents', icon:'🚗', label:'Ajali / Accidents',        section:'Utekelezaji – Barabara', roles:['traffic_officer','ocs','ocd','rpc','igp','digp'] },

  // ─ UTEKELEZAJI – JUMLA (Regular Officer) ─
  { to:'/enforcement/arrests',   icon:'⛓️', label:'Kukamatwa / Arrests',     section:'Utekelezaji',            roles:['regular_officer','cid_officer','ocs','ocd','rpc','igp','digp'] },
  { to:'/enforcement/detentions',icon:'🔒', label:'Kizuizini / Detentions',   section:'Utekelezaji',            roles:['regular_officer','cid_officer','ocs','ocd','rpc','igp','digp'] },
  { to:'/enforcement/incidents', icon:'📝', label:'Matukio / Incidents',      section:'Utekelezaji',            roles:['regular_officer','ocs','ocd','rpc','igp','digp'] },
  { to:'/enforcement/pf3',       icon:'📄', label:'PF3 Forms',                section:'Utekelezaji',            roles:['regular_officer','cid_officer','ocs','ocd','rpc','igp','digp'] },

  // ─ UCHUNGUZI (CID) ─
  { to:'/investigation/cases',   icon:'📁', label:'Kesi / Cases',    badge:12, section:'Uchunguzi (CID)',        roles:['cid_officer','rpc','igp','digp'] },
  { to:'/investigation/warrants',icon:'⚖️', label:'Amri / Warrants',           section:'Uchunguzi (CID)',        roles:['cid_officer','igp','digp'] },
  { to:'/investigation/wanted',  icon:'🎯', label:'Watuhumiwa Wanaotafutwa',   section:'Uchunguzi (CID)',        roles:['regular_officer','cid_officer','ocs','ocd','rpc','igp','digp'] },
  { to:'/investigation/missing', icon:'👤', label:'Watu Waliopotea',           section:'Uchunguzi (CID)',        roles:['regular_officer','cid_officer','ocs','ocd','rpc','igp','digp'] },
  { to:'/investigation/evidence',icon:'🔬', label:'Ushahidi / Evidence',       section:'Uchunguzi (CID)',        roles:['cid_officer','forensic_officer','igp','digp'] },
  { to:'/investigation/forensics',icon:'🧪',label:'Forensics',                 section:'Uchunguzi (CID)',        roles:['forensic_officer','cid_officer','igp','digp'] },

  // ─ UJASUSI (RPC+) ─
  { to:'/intelligence',          icon:'🧠', label:'Ujasusi / Intelligence',    section:'Ujasusi',                roles:['rpc','igp','digp'] },

  // ─ UTAFUTAJI (All) ─
  { to:'/management/persons',    icon:'🔍', label:'Tafuta Watu / Search',      section:'Utafutaji',              roles:['*'] },
  { to:'/management/vehicles',   icon:'🚗', label:'Tafuta Magari',             section:'Utafutaji',              roles:['*'] },

  // ─ USIMAMIZI ─
  { to:'/management/officers',   icon:'👮', label:'Maafisa / Officers',        section:'Usimamizi',              roles:['ocs','ocd','rpc','igp','digp'] },
  { to:'/management/stations',   icon:'🏢', label:'Vituo / Stations',          section:'Usimamizi',              roles:['ocd','rpc','igp','digp'] },
  { to:'/management/prisoners',  icon:'🔒', label:'Wafungwa / Prisoners',      section:'Usimamizi',              roles:['regular_officer','cid_officer','ocs','ocd','rpc','igp','digp'] },
  { to:'/management/cells',      icon:'🔐', label:'Seli / Cells',              section:'Usimamizi',              roles:['ocs','ocd','rpc','igp','digp'] },
  { to:'/management/firearms',   icon:'🔫', label:'Silaha / Firearms',         section:'Usimamizi',              roles:['ocs','ocd','rpc','igp','digp'] },
  { to:'/management/assets',     icon:'🏗️', label:'Mali / Assets',             section:'Usimamizi',              roles:['ocd','rpc','igp','digp'] },
  { to:'/management/courts',     icon:'🏛️', label:'Mahakama / Courts',         section:'Usimamizi',              roles:['cid_officer','igp','digp'] },

  // ─ MAWASILIANO ─
  { to:'/communications',        icon:'💬', label:'Mawasiliano',               section:'Mawasiliano',            roles:['*'] },

  // ─ HR ─
  { to:'/hr',                    icon:'👥', label:'Rasilimali Watu / HR',      section:'HR',                     roles:['ocs','ocd','rpc','igp','digp'] },

  // ─ RIPOTI ─
  { to:'/reports/crime',         icon:'📊', label:'Takwimu za Uhalifu',        section:'Ripoti',                 roles:['ocs','ocd','rpc','igp','digp'] },
  { to:'/reports/analytics',     icon:'📉', label:'Uchambuzi / Analytics',     section:'Ripoti',                 roles:['rpc','igp','digp'] },
  { to:'/reports/performance',   icon:'📈', label:'Utendaji / Performance',    section:'Ripoti',                 roles:['ocs','ocd','rpc','igp','digp'] },

  // ─ MFUMO ─
  { to:'/system/audit',          icon:'🗂️', label:'Rekodi ya Ukaguzi',         section:'Mfumo',                  roles:['igp','digp'] },
  { to:'/system/rbac',           icon:'🛡️', label:'Udhibiti wa Ufikiaji',      section:'Mfumo',                  roles:['igp'] },
  { to:'/system/settings',       icon:'⚙️', label:'Mipangilio',                section:'Mfumo',                  roles:['*'] },
]

export function getNavItems(role) {
  const super_ = isSuper(role)
  return ALL_NAV.filter(item =>
    item.roles.includes('*') || item.roles.includes(role) || super_
  )
}
