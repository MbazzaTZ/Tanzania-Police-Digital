// =========================================================
// TPDOP Mock Data – used until Supabase backend is connected
// =========================================================

export const MOCK_CITATIONS = [
  { id:'CIT-2024-00028', num:28, suspect:'Juma Ally Khamis', nida:'1234567890123', vehicle:'T123 DFG', vehicleType:'Toyota Noah', offence:'Kuendesha bila leseni', law:'Traffic Offences Act, Cap. 168 – Kif. 129(1)', officer:'Insp. J.M. Khamis', location:'Morogoro Rd, Oysterbay', date:'17/05/2024', time:'10:45', fine:50000, status:'issued' },
  { id:'CIT-2024-00027', num:27, suspect:'David John Mallya', nida:'9876543210987', vehicle:'T987 ABC', vehicleType:'Toyota Corolla', offence:'Mwendo kasi (85 km/h)', law:'Traffic Offences Act, Cap. 168 – Kif. 131(1)', officer:'Sgt. A. Suleiman', location:'Haile Selassie Rd', date:'17/05/2024', time:'09:58', fine:30000, status:'issued' },
  { id:'CIT-2024-00026', num:26, suspect:'Salma Said Mwinyi', nida:'1122334455667', vehicle:'T456 EFG', vehicleType:'Honda Fit', offence:'Kuvuka taa nyekundu', law:'Traffic Offences Act, Cap. 168 – Kif. 132(1)', officer:'Cpl. H. Mwinyi', location:'Ali Hassan Mwinyi Rd', date:'16/05/2024', time:'16:30', fine:30000, status:'paid' },
  { id:'CIT-2024-00025', num:25, suspect:'Nesto Eliya Masoud', nida:'3344556677889', vehicle:'T222 HJK', vehicleType:'Suzuki Alto', offence:'Bila mkanda wa usalama', law:'Traffic Offences Act, Cap. 168 – Kif. 133(1)', officer:'Insp. J.M. Khamis', location:'Bagamoyo Road', date:'16/05/2024', time:'04:45', fine:10000, status:'unpaid' },
  { id:'CIT-2024-00024', num:24, suspect:'Rajabu Abubakar', nida:'5566778899001', vehicle:'T789 LMN', vehicleType:'Toyota Hiace', offence:'Kuendesha bila bima', law:'Traffic Offences Act, Cap. 168 – Kif. 107(1)', officer:'ASP F. Kimaro', location:'Morogoro Rd, Oysterbay', date:'16/05/2024', time:'02:30', fine:50000, status:'issued' },
  { id:'CIT-2024-00023', num:23, suspect:'Hassan Juma', nida:'2233445566778', vehicle:'T555 OPQ', vehicleType:'Nissan March', offence:'Taa zisizofanya kazi', law:'Traffic Offences Act, Cap. 168 – Kif. 114(1)', officer:'Sgt. A. Suleiman', location:'Nyerere Road', date:'15/05/2024', time:'19:45', fine:50000, status:'unpaid' },
  { id:'CIT-2024-00022', num:22, suspect:'Neema Kazimoto', nida:'6677889900112', vehicle:'T333 RST', vehicleType:'Toyota Vitz', offence:'Kutumia simu wakati wa kuendesha', law:'Traffic Offences Act, Cap. 168 – Kif. 134(1)', officer:'Cpl. H. Mwinyi', location:'Nyerere Road', date:'15/05/2024', time:'16:20', fine:100000, status:'paid' },
  { id:'CIT-2024-00021', num:21, suspect:'Omary Said', nida:'8899001122334', vehicle:'T112 UVW', vehicleType:'Mitsubishi Pajero', offence:'Hati za gari hazikamiliki', law:'Traffic Offences Act, Cap. 168 – Kif. 103(1)', officer:'Insp. J.M. Khamis', location:'Sam Nujoma Road', date:'14/05/2024', time:'15:10', fine:100000, status:'paid' },
]

export const MOCK_ARRESTS = [
  { id:'AR-2024-00005', suspect:'Juma Ally Khamis', nida:'1234567890123', charges:'Kuendesha bila leseni', category:'Traffic', officer:'Insp. J.M. Khamis', station:'Oysterbay PS', date:'17/05/2024', time:'10:45', status:'pending' },
  { id:'AR-2024-00004', suspect:'Omar Said Bakari', nida:'9988776655443', charges:'Wizi wa nyumba', category:'Criminal', officer:'Sgt. A. Suleiman', station:'Kariakoo PS', date:'16/05/2024', time:'23:15', status:'detained' },
  { id:'AR-2024-00003', suspect:'Neema Kazimoto', nida:'6677889900112', charges:'Udanganyifu wa fedha', category:'Economic', officer:'ASP F.R. Kimaro', station:'Ilala PS', date:'15/05/2024', time:'14:30', status:'completed' },
  { id:'AR-2024-00002', suspect:'Hassan Mwita Mugisha', nida:'4455667788990', charges:'Mapigano ya Mitaani', category:'Assault', officer:'Cpl. H.A. Mwinyi', station:'Temeke PS', date:'14/05/2024', time:'22:00', status:'court' },
  { id:'AR-2024-00001', suspect:'Safia Ramadhani', nida:'3344556677889', charges:'Kuuza dawa za kulevya', category:'Narcotics', officer:'ASP F.R. Kimaro', station:'Kinondoni PS', date:'13/05/2024', time:'18:45', status:'detained' },
]

export const MOCK_CASES = [
  { id:'CASE-2024-00128', title:'Wizi wa Benki ya CRDB', type:'Criminal', status:'active', officer:'CID Insp. Mwangi', date:'17/05/2024', priority:'high' },
  { id:'CASE-2024-00127', title:'Udanganyifu wa Leseni', type:'Fraud', status:'active', officer:'CID Sgt. Hassan', date:'16/05/2024', priority:'medium' },
  { id:'CASE-2024-00126', title:'Madawa ya Kulevya – Kariakoo', type:'Narcotics', status:'active', officer:'CID ASP Kimaro', date:'15/05/2024', priority:'critical' },
]

export const MOCK_ALERTS = [
  { id:'ALT-001', type:'critical', title:'Wizi wa Gari – T123 DFG', desc:'Gari lenye namba T123 DFG linatafutwa · Kariakoo, Dar es Salaam', time:'17 Mei 2024, 22:15', read:false },
  { id:'ALT-002', type:'urgent',   title:'Operesheni Maalum – Barabara ya Morogoro', desc:'Zuio la usalama kuanzia saa 18:00 hadi 06:00', time:'16 Mei 2024, 17:45', read:false },
  { id:'ALT-003', type:'info',     title:'Mkutano wa Maafisa – Makao Makuu', desc:'Maafisa wote wa ngazi ya SP na juu wanahitajika · Saa 09:00', time:'Kesho, 18 Mei 2024', read:false },
  { id:'ALT-004', type:'critical', title:'Mtu Aliyepotea – Amina Rashid Mbwana', desc:'Mtoto wa miaka 14 · Alikimbia tarehe 16 Mei · Kinondoni', time:'16 Mei 2024, 14:30', read:false },
  { id:'ALT-005', type:'urgent',   title:'Silaha Iliyoibiwa – Kituo cha Temeke', desc:'Bunduki moja ya mazoezi haipo. Uchunguzi unaendelea', time:'15 Mei 2024, 20:10', read:true },
]

export const MOCK_PERSON = {
  id: 'PRS-2024-0517-000123',
  fullName: 'Juma Ally Khamis',
  nida: '1234567890123',
  gender: 'Mwanaume',
  dob: '15/03/1985',
  age: 39,
  nationality: 'Mtanzania',
  phone: '+255 712 345 678',
  email: 'juma.ally@gmail.com',
  address: 'Mbezi Beach, Makabe Rd',
  region: 'Dar es Salaam',
  district: 'Kinondoni',
  ward: 'Mbezi',
  father: 'Ally Khamis',
  mother: 'Asha Mohamed',
  documents: {
    nida:    { number:'1234567890123',  valid:true, issued:'12/06/2016' },
    license: { number:'DL12345678TZ',   valid:true, class:'B,C', expiry:'20/08/2026' },
    tin:     { number:'123-456-789',    valid:true, type:'Individual' },
    inec:    { number:'NEC987654321',   valid:true, center:'Oysterbay' },
    passport:{ number:'PP1234567',      valid:true, expiry:'10/02/2028', type:'Ordinary' },
  },
  policeRecord: { watchlist:0, arrests:1, charges:1, activeCases:0, citations:3, warrants:0 },
  warning: false,
}

export const MOCK_DASHBOARD_STATS = {
  citationsToday: 284,
  citationsDelta: '+12%',
  arrestsToday:   47,
  arrestsDelta:   '+8%',
  criticalAlerts: 5,
  alertsDelta:    '+2 mpya',
  activeCases:    128,
  casesDelta:     '-3%',
  vehiclesChecked:1842,
  vehiclesDelta:  '+15%',
}

export const MOCK_REGIONS = [
  { name:'Dar es Salaam', count:847, color:'#ef5350', pct:85 },
  { name:'Mwanza',        count:312, color:'#2E7D32', pct:55 },
  { name:'Arusha',        count:198, color:'#2E7D32', pct:42 },
  { name:'Dodoma',        count:143, color:'#2E7D32', pct:30 },
  { name:'Mbeya',         count:98,  color:'#2E7D32', pct:22 },
  { name:'Tanga',         count:76,  color:'#2E7D32', pct:16 },
]

export const TRAFFIC_OFFENCES = [
  { code:'129(1)', name:'Kuendesha bila leseni',       law:'Traffic Offences Act, Cap. 168', fine:50000,  alt:'kifungo cha siku 90' },
  { code:'130(1)', name:'Kuendesha kwa uzembe',        law:'Traffic Offences Act, Cap. 168', fine:100000, alt:'kifungo cha miezi 6' },
  { code:'131(1)', name:'Mwendo kasi (Speeding)',       law:'Traffic Offences Act, Cap. 168', fine:30000,  alt:'TZS 150,000 max' },
  { code:'132(1)', name:'Kuvuka taa nyekundu',          law:'Traffic Offences Act, Cap. 168', fine:30000,  alt:'' },
  { code:'133(1)', name:'Bila mkanda wa usalama',       law:'Traffic Offences Act, Cap. 168', fine:10000,  alt:'' },
  { code:'134(1)', name:'Kutumia simu wakati wa kuendesha', law:'Traffic Offences Act, Cap. 168', fine:100000, alt:'' },
  { code:'107(1)', name:'Kuendesha bila bima',          law:'Road Traffic Act',               fine:50000,  alt:'kifungo cha miezi 3' },
  { code:'114(1)', name:'Taa zisizofanya kazi',         law:'Traffic Offences Act, Cap. 168', fine:50000,  alt:'' },
]
