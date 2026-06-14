// =========================================================
// TPDOP – RBAC Utility Functions
// =========================================================
import { PERMISSIONS } from './constants'

export function hasPermission(userRole, permission) {
  const allowed = PERMISSIONS[permission]
  if (!allowed) return false
  if (allowed.includes('*')) return true
  return allowed.includes(userRole)
}

export function canAccess(userRole, feature) {
  // '*' = IGP/DIGP see everything
  if (userRole === 'igp' || userRole === 'digp') return true
  const permMap = {
    citations:        ['traffic_officer','rpc','ocd','ocs'],
    accidents:        ['traffic_officer','rpc','ocd','ocs'],
    traffic_dashboard:['traffic_officer','rpc','ocd','ocs'],
    arrests:          ['regular_officer','cid_officer','rpc','ocd','ocs'],
    detentions:       ['regular_officer','cid_officer','rpc','ocd','ocs'],
    incidents:        ['regular_officer','rpc','ocd','ocs'],
    pf3:              ['regular_officer','cid_officer','rpc','ocd','ocs'],
    patrol:           ['regular_officer','rpc','ocd','ocs'],
    cases:            ['cid_officer','rpc'],
    warrants:         ['cid_officer'],
    evidence:         ['cid_officer','forensic_officer'],
    forensics:        ['forensic_officer','cid_officer'],
    wanted:           ['cid_officer','regular_officer','rpc','ocd','ocs'],
    missing:          ['regular_officer','cid_officer','rpc','ocd','ocs'],
    intelligence:     ['rpc'],
    internal_affairs: [],
    hr:               ['rpc','ocd','ocs'],
    national_stats:   ['rpc'],
    rbac:             [],
    audit:            [],
  }
  const allowed = permMap[feature]
  if (!allowed) return true  // public features
  return allowed.includes(userRole)
}

export function getDashboardScope(role) {
  const scopes = {
    igp:'national', digp:'national', rpc:'regional',
    ocd:'district', ocs:'station', cp:'national',
    scp:'national', dcp:'national', acp:'regional',
    ssp:'district', sp:'district',
    inspector:'station', asp:'station',
    sergeant:'station', ssgt:'station', corporal:'station', constable:'station',
    traffic_officer:'station', regular_officer:'station',
    cid_officer:'station', forensic_officer:'station',
  }
  return scopes[role] || 'station'
}

export function getNavItems(role) {
  const all = [
    // Core
    {id:'national',   to:'/',                        icon:'📊', label:'Dashibodi ya Taifa',      section:'Dashibodi',                roles:['igp','digp']},
    {id:'regional',   to:'/dashboard/regional',      icon:'🗺️', label:'Dashibodi ya Mkoa',       section:'Dashibodi',                roles:['igp','digp','rpc']},
    {id:'district',   to:'/dashboard/district',      icon:'🏛️', label:'Dashibodi ya Wilaya',     section:'Dashibodi',                roles:['igp','digp','rpc','ocd']},
    {id:'station',    to:'/dashboard/station',       icon:'🏢', label:'Dashibodi ya Kituo',      section:'Dashibodi',                roles:['igp','digp','rpc','ocd','ocs']},

    // Operations
    {id:'map',        to:'/operations/map',          icon:'🗺️', label:'Ramani ya Operesheni',    section:'Operesheni',               roles:['*']},
    {id:'alerts',     to:'/operations/alerts',       icon:'🚨', label:'Taarifa za Haraka',       section:'Operesheni', badge:5,       roles:['*']},
    {id:'patrol',     to:'/operations/patrol',       icon:'🚔', label:'Doria / Patrol',          section:'Operesheni',               roles:['regular_officer','ocs','ocd','rpc','igp','digp']},
    {id:'roadblocks', to:'/operations/roadblocks',   icon:'🚧', label:'Vizuizi / Roadblocks',    section:'Operesheni',               roles:['regular_officer','ocs','ocd','rpc','igp','digp']},
    {id:'checkpoints',to:'/operations/checkpoints',  icon:'⛽', label:'Vituo vya Ukaguzi',       section:'Operesheni',               roles:['*']},

    // Enforcement - Traffic
    {id:'citations',  to:'/enforcement/citations',   icon:'📋', label:'Citations / Tiketi',      section:'Utekelezaji - Barabara',   roles:['traffic_officer','ocs','ocd','rpc','igp','digp']},
    {id:'accidents',  to:'/enforcement/accidents',   icon:'🚗', label:'Ajali / Accidents',       section:'Utekelezaji - Barabara',   roles:['traffic_officer','ocs','ocd','rpc','igp','digp']},

    // Enforcement - General
    {id:'arrests',    to:'/enforcement/arrests',     icon:'⛓️', label:'Kukamatwa / Arrests',    section:'Utekelezaji',              roles:['regular_officer','cid_officer','ocs','ocd','rpc','igp','digp']},
    {id:'detentions', to:'/enforcement/detentions',  icon:'🔒', label:'Kizuizini / Detentions',  section:'Utekelezaji',              roles:['regular_officer','cid_officer','ocs','ocd','rpc','igp','digp']},
    {id:'incidents',  to:'/enforcement/incidents',   icon:'📝', label:'Matukio / Incidents',     section:'Utekelezaji',              roles:['regular_officer','ocs','ocd','rpc','igp','digp']},
    {id:'pf3',        to:'/enforcement/pf3',         icon:'📄', label:'PF3 Forms',               section:'Utekelezaji',              roles:['regular_officer','cid_officer','ocs','ocd','rpc','igp','digp']},

    // Investigation (CID)
    {id:'cases',      to:'/investigation/cases',     icon:'📁', label:'Kesi / Cases',            section:'Uchunguzi (CID)', badge:12,  roles:['cid_officer','rpc','igp','digp']},
    {id:'warrants',   to:'/investigation/warrants',  icon:'⚖️', label:'Amri / Warrants',         section:'Uchunguzi (CID)',           roles:['cid_officer','igp','digp']},
    {id:'wanted',     to:'/investigation/wanted',    icon:'🎯', label:'Watuhumiwa Wanaotafutwa', section:'Uchunguzi (CID)',           roles:['regular_officer','cid_officer','ocs','ocd','rpc','igp','digp']},
    {id:'missing',    to:'/investigation/missing',   icon:'👤', label:'Watu Waliopotea',         section:'Uchunguzi (CID)',           roles:['regular_officer','cid_officer','ocs','ocd','rpc','igp','digp']},
    {id:'evidence',   to:'/investigation/evidence',  icon:'🔬', label:'Ushahidi / Evidence',     section:'Uchunguzi (CID)',           roles:['cid_officer','forensic_officer','igp','digp']},
    {id:'forensics',  to:'/investigation/forensics', icon:'🧪', label:'Forensics',               section:'Uchunguzi (CID)',           roles:['forensic_officer','cid_officer','igp','digp']},

    // Intelligence
    {id:'intelligence',to:'/intelligence',           icon:'🧠', label:'Ujasusi / Intelligence',  section:'Ujasusi',                  roles:['rpc','igp','digp']},

    // Search
    {id:'persons',    to:'/management/persons',      icon:'🔍', label:'Tafuta Watu',             section:'Utafutaji',                roles:['*']},
    {id:'vehicles',   to:'/management/vehicles',     icon:'🚗', label:'Tafuta Magari',           section:'Utafutaji',                roles:['*']},

    // Management
    {id:'officers',   to:'/management/officers',     icon:'👮', label:'Maafisa / Officers',      section:'Usimamizi',                roles:['ocs','ocd','rpc','igp','digp']},
    {id:'stations',   to:'/management/stations',     icon:'🏢', label:'Vituo / Stations',        section:'Usimamizi',                roles:['ocd','rpc','igp','digp']},
    {id:'prisoners',  to:'/management/prisoners',    icon:'🔒', label:'Wafungwa / Prisoners',    section:'Usimamizi',                roles:['regular_officer','cid_officer','ocs','ocd','rpc','igp','digp']},
    {id:'firearms',   to:'/management/firearms',     icon:'🔫', label:'Silaha / Firearms',       section:'Usimamizi',                roles:['ocs','ocd','rpc','igp','digp']},
    {id:'assets',     to:'/management/assets',       icon:'🏗️', label:'Mali / Assets',           section:'Usimamizi',                roles:['ocd','rpc','igp','digp']},
    {id:'courts',     to:'/management/courts',       icon:'🏛️', label:'Mahakama / Courts',       section:'Usimamizi',                roles:['cid_officer','igp','digp']},

    // Communications
    {id:'messages',   to:'/communications',          icon:'💬', label:'Mawasiliano',             section:'Mawasiliano',              roles:['*']},

    // Reports
    {id:'crime_reports',to:'/reports/crime',         icon:'📊', label:'Takwimu za Uhalifu',      section:'Ripoti',                   roles:['ocs','ocd','rpc','igp','digp']},
    {id:'analytics',  to:'/reports/analytics',       icon:'📉', label:'Uchambuzi / Analytics',   section:'Ripoti',                   roles:['rpc','igp','digp']},
    {id:'performance',to:'/reports/performance',     icon:'📈', label:'Utendaji / Performance',  section:'Ripoti',                   roles:['ocs','ocd','rpc','igp','digp']},

    // HR
    {id:'hr',         to:'/hr',                      icon:'👥', label:'Rasilimali Watu / HR',    section:'HR',                       roles:['ocs','ocd','rpc','igp','digp']},

    // System
    {id:'audit',      to:'/system/audit',            icon:'🗂️', label:'Rekodi ya Ukaguzi',       section:'Mfumo',                    roles:['igp','digp']},
    {id:'rbac',       to:'/system/rbac',             icon:'🛡️', label:'Udhibiti wa Ufikiaji',    section:'Mfumo',                    roles:['igp']},
    {id:'settings',   to:'/system/settings',         icon:'⚙️', label:'Mipangilio',              section:'Mfumo',                    roles:['*']},
  ]

  const isIGP = role === 'igp' || role === 'digp'
  return all.filter(item =>
    item.roles.includes('*') || item.roles.includes(role) || isIGP
  )
}
