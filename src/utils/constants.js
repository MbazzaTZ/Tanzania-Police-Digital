// =========================================================
// TPDOP – Complete Constants (Full Spec)
// =========================================================

export const APP = {
  name:'Tanzania Police Digital Operations Platform',short:'TPDOP',
  force:'Jeshi la Polisi Tanzania',motto_sw:'Kulinda · Kutumikia · Kuweka Usalama',
  motto_en:'Protect · Serve · Secure',version:'1.0.0',year:2024,
}

export const RANKS = [
  {id:'constable', label:'Constable',                         short:'Const',  level:1},
  {id:'corporal',  label:'Corporal',                          short:'Cpl',    level:2},
  {id:'sergeant',  label:'Sergeant',                          short:'Sgt',    level:3},
  {id:'ssgt',      label:'Staff Sergeant',                    short:'S/Sgt',  level:4},
  {id:'inspector', label:'Inspector',                         short:'Insp',   level:5},
  {id:'asp',       label:'Assistant Superintendent of Police',short:'ASP',    level:6},
  {id:'sp',        label:'Superintendent of Police',          short:'SP',     level:7},
  {id:'ssp',       label:'Senior Superintendent of Police',   short:'SSP',    level:8},
  {id:'acp',       label:'Assistant Commissioner of Police',  short:'ACP',    level:9},
  {id:'dcp',       label:'Deputy Commissioner of Police',     short:'DCP',    level:10},
  {id:'scp',       label:'Senior Commissioner of Police',     short:'SCP',    level:11},
  {id:'cp',        label:'Commissioner of Police',            short:'CP',     level:12},
  {id:'rpc',       label:'Regional Police Commander',         short:'RPC',    level:13},
  {id:'digp',      label:'Deputy Inspector General',          short:'DIGP',   level:14},
  {id:'igp',       label:'Inspector General of Police',       short:'IGP',    level:15},
]

export const HIERARCHY_LEVELS = ['National','Zone','Region','District','Division','Ward','Police Station','Police Post']

export const HQ_DEPARTMENTS = [
  'Operations Department','Criminal Investigation Department (CID)','Traffic Police Department',
  'Intelligence Department','Forensic Bureau','Community Policing','Anti-Narcotics Unit',
  'Cyber Crime Unit','Financial & Economic Crimes Unit','Human Resources Department',
  'Administration & Logistics','Communications Department','Legal Services Department',
  'Planning & Research Department','ICT Department','Internal Affairs / Professional Standards',
  'Training & Police Colleges','Procurement Unit',
]

export const SPECIALIZED_UNITS = [
  'Field Force Unit (FFU)','Marine Police Unit','Railway Police Unit','Airport Police Unit',
  'Tourist Police Unit','Stock Theft Prevention Unit','K9 Unit','Counter Terrorism Unit',
  'Anti-Robbery Unit','Special Operations Unit','VIP Protection Unit','Interpol Desk',
  'Gender & Children Desk','Disaster Response Unit','Fire & Rescue Coordination',
]

export const ROLES = {
  traffic_officer: {
    id:'traffic_officer', label:'Traffic Officer',
    can:['traffic_dashboard','vehicle_search','license_search','insurance_verification','citations','accident_reports','safety_points'],
    cannot:['cid_cases','intelligence_files','counter_terrorism','internal_affairs'],
  },
  regular_officer: {
    id:'regular_officer', label:'Regular Police Officer',
    can:['person_search','incident_reports','arrests','detentions','patrol_operations','evidence_upload','communications'],
    cannot:['traffic_management','cid_intelligence','national_statistics'],
  },
  cid_officer: {
    id:'cid_officer', label:'CID Officer',
    can:['criminal_cases','warrants','investigations','suspects','witnesses','evidence','forensics','wanted_persons'],
    cannot:[],
  },
  forensic_officer: {
    id:'forensic_officer', label:'Forensic Officer',
    can:['fingerprints','dna_records','ballistics','document_analysis','digital_forensics'],
    cannot:[],
  },
  ocs: {id:'ocs', label:'Officer Commanding Station', scope:'station',
    can:['all_station_officers','station_reports','station_cases','station_statistics'], cannot:[]},
  ocd: {id:'ocd', label:'Officer Commanding District', scope:'district',
    can:['all_district_stations','district_statistics','district_crime_reports','district_performance'], cannot:[]},
  rpc: {id:'rpc', label:'Regional Police Commander', scope:'region',
    can:['entire_region','all_districts','regional_intelligence','regional_dashboards','crime_heatmaps'],
    cannot:['other_regions']},
  digp: {id:'digp', label:'Deputy Inspector General', scope:'national', can:['*'], cannot:[]},
  igp:  {id:'igp',  label:'Inspector General of Police', scope:'national', can:['*'], cannot:[]},
}

export const PERMISSIONS = {
  VIEW_NATIONAL_DASHBOARD: ['igp','digp'],
  VIEW_REGIONAL_DASHBOARD: ['igp','digp','rpc'],
  VIEW_DISTRICT_DASHBOARD: ['igp','digp','rpc','ocd'],
  VIEW_STATION_DASHBOARD:  ['igp','digp','rpc','ocd','ocs'],
  ISSUE_CITATIONS:         ['traffic_officer','igp','digp','rpc','ocd','ocs'],
  MAKE_ARRESTS:            ['regular_officer','cid_officer','igp','digp','rpc','ocd','ocs'],
  ISSUE_DETENTIONS:        ['regular_officer','cid_officer','igp','digp','rpc','ocd','ocs'],
  FILE_INCIDENTS:          ['regular_officer','igp','digp','rpc','ocd','ocs'],
  FILE_ACCIDENTS:          ['traffic_officer','igp','digp','rpc','ocd','ocs'],
  FILE_PF3:                ['regular_officer','cid_officer','igp','digp','rpc','ocd','ocs'],
  VIEW_CID_CASES:          ['cid_officer','igp','digp','rpc'],
  MANAGE_WARRANTS:         ['cid_officer','igp','digp'],
  VIEW_WANTED_PERSONS:     ['cid_officer','regular_officer','igp','digp','rpc','ocd','ocs'],
  VIEW_MISSING_PERSONS:    ['regular_officer','cid_officer','igp','digp','rpc','ocd','ocs'],
  MANAGE_EVIDENCE:         ['cid_officer','forensic_officer','igp','digp'],
  ACCESS_FORENSICS:        ['forensic_officer','cid_officer','igp','digp'],
  VIEW_INTELLIGENCE:       ['igp','digp','rpc'],
  MANAGE_INTELLIGENCE:     ['igp','digp'],
  SEARCH_PERSONS:          ['*'],
  SEARCH_VEHICLES:         ['*'],
  VIEW_INTERNAL_AFFAIRS:   ['igp','digp'],
  MANAGE_INTERNAL_AFFAIRS: ['igp'],
  VIEW_HR:                 ['igp','digp','rpc','ocd','ocs'],
  MANAGE_HR:               ['igp','digp'],
  VIEW_AUDIT_LOGS:         ['igp','digp'],
  MANAGE_RBAC:             ['igp'],
  VIEW_NATIONAL_STATS:     ['igp','digp','rpc'],
  MANAGE_PRISONERS:        ['regular_officer','cid_officer','igp','digp','rpc','ocd','ocs'],
  VIEW_FIREARMS:           ['igp','digp','rpc','ocd','ocs'],
  MANAGE_COURTS:           ['cid_officer','igp','digp'],
}

export const REGIONS = [
  'Dar es Salaam','Arusha','Mwanza','Dodoma','Mbeya','Tanga','Morogoro',
  'Zanzibar','Kilimanjaro','Iringa','Kagera','Mara','Ruvuma','Tabora',
  'Kigoma','Singida','Shinyanga','Lindi','Mtwara','Pwani','Geita',
  'Simiyu','Katavi','Njombe','Songwe','Rukwa',
]

export const SEARCH_TYPES = [
  {id:'NIDA',       icon:'🪪', label:'NIDA',             sub:'Namba ya NIDA'},
  {id:'TIN',        icon:'📊', label:'TIN',              sub:'Namba ya TIN'},
  {id:'INEC',       icon:'🗳️', label:'I-NEC',            sub:'Namba ya I-NEC'},
  {id:'Passport',   icon:'🛂', label:'Passport',         sub:'Namba ya Pasipoti'},
  {id:'License',    icon:'🪪', label:'Leseni',           sub:'Driver Licence'},
  {id:'Vehicle',    icon:'🚗', label:'Namba ya Gari',    sub:'Plate Number'},
  {id:'Phone',      icon:'📱', label:'Simu',             sub:'Namba ya Simu'},
  {id:'Fingerprint',icon:'👆', label:'Alama ya Kidole',  sub:'Biometric'},
  {id:'Face',       icon:'🤳', label:'Uso / Face',       sub:'Face Recognition'},
]

export const TRAFFIC_OFFENCES = [
  {code:'129(1)',name:'Kuendesha bila leseni',    law:'Traffic Offences Act, Cap. 168',fine:50000},
  {code:'130(1)',name:'Kuendesha kwa uzembe',     law:'Traffic Offences Act, Cap. 168',fine:100000},
  {code:'131(1)',name:'Mwendo kasi (Speeding)',   law:'Traffic Offences Act, Cap. 168',fine:30000},
  {code:'132(1)',name:'Kuvuka taa nyekundu',      law:'Traffic Offences Act, Cap. 168',fine:30000},
  {code:'133(1)',name:'Bila mkanda wa usalama',   law:'Traffic Offences Act, Cap. 168',fine:10000},
  {code:'134(1)',name:'Kutumia simu wakati wa kuendesha',law:'Traffic Offences Act, Cap. 168',fine:100000},
  {code:'107(1)',name:'Kuendesha bila bima',      law:'Road Traffic Act',fine:50000},
  {code:'114(1)',name:'Taa zisizofanya kazi',     law:'Traffic Offences Act, Cap. 168',fine:50000},
]

export const CRIMINAL_CHARGES = [
  {code:'258(a)',name:'Wizi / Theft',law:'Penal Code',type:'Felony'},
  {code:'297',   name:'Wizi wa Mkoba / Robbery',law:'Penal Code',type:'Felony'},
  {code:'265',   name:'Ulaghai / Fraud',law:'Penal Code',type:'Misdemeanor'},
  {code:'312',   name:'Kujihusisha na Mali ya Wizi',law:'Penal Code',type:'Misdemeanor'},
  {code:'222',   name:'Mauaji / Murder',law:'Penal Code',type:'Felony'},
  {code:'233',   name:'Kuumiza mtu / Assault',law:'Penal Code',type:'Misdemeanor'},
  {code:'130',   name:'Ubakaji / Rape',law:'Penal Code',type:'Felony'},
]

export const DB_TABLES = [
  'profiles','roles','permissions','zones','regions','districts','divisions','wards','stations',
  'officers','persons','vehicles','citations','arrests','detentions','cases','case_updates',
  'incident_reports','accident_reports','pf3_forms','evidence','evidence_chain',
  'wanted_persons','missing_persons','stolen_vehicles','stolen_property',
  'messages','alerts','escalations','patrols','checkpoints','roadblocks',
  'officer_locations','firearms','firearm_licenses','prisoners','cells','transfers',
  'court_cases','hearings','audit_logs',
]

export const SCOPE_LABELS = {national:'Taifa',regional:'Mkoa',district:'Wilaya',station:'Kituo',post:'Kituo cha Doria'}
export const PRIORITY_LEVELS = ['critical','high','medium','low']
export const CASE_TYPES = ['Criminal','Fraud','Narcotics','Murder','Assault','Theft','Cyber','Financial','Terrorism']
export const INCIDENT_TYPES = ['Wizi wa Gari','Wizi wa Nyumba','Mapigano','Ubakaji','Mauaji','Ajali ya Gari','Uvunjaji wa Mali','Ulaghai','Madawa ya Kulevya','Ugaidi']
export const VEHICLE_TYPES = ['Toyota Noah','Toyota Corolla','Toyota Land Cruiser','Toyota Hilux','Nissan X-Trail','Honda Fit','Mitsubishi Pajero','Suzuki Alto','Toyota Hiace','Bajaj Boxer']
