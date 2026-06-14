// =========================================================
// TPDOP – Complete Mock Data (all modules)
// =========================================================

export const CURRENT_OFFICER = {
  id:'OPS-2024-00125', badge:'123456', name:'Insp. Juma M. Khamis',
  rank:'inspector', role:'igp', // change to test RBAC: 'traffic_officer','regular_officer','cid_officer','rpc','ocs' etc
  station:'Oysterbay Police Station', region:'Dar es Salaam', district:'Kinondoni',
  phone:'+255 712 345 678', online:true, lastSeen:'17/05/2024 10:45',
}

export const MOCK_CITATIONS = [
  {id:'CIT-2024-00028',num:28,suspect:'Juma Ally Khamis',nida:'1234567890123',vehicle:'T123 DFG',vehicleType:'Toyota Noah',offence:'Kuendesha bila leseni',law:'Traffic Offences Act, Cap. 168 – Kif. 129(1)',officer:'Insp. J.M. Khamis',location:'Morogoro Rd, Oysterbay',date:'17/05/2024',time:'10:45',fine:50000,status:'issued'},
  {id:'CIT-2024-00027',num:27,suspect:'David John Mallya',nida:'9876543210987',vehicle:'T987 ABC',vehicleType:'Toyota Corolla',offence:'Mwendo kasi (85 km/h)',law:'Traffic Offences Act, Cap. 168 – Kif. 131(1)',officer:'Sgt. A. Suleiman',location:'Haile Selassie Rd',date:'17/05/2024',time:'09:58',fine:30000,status:'issued'},
  {id:'CIT-2024-00026',num:26,suspect:'Salma Said Mwinyi',nida:'1122334455667',vehicle:'T456 EFG',vehicleType:'Honda Fit',offence:'Kuvuka taa nyekundu',law:'Traffic Offences Act, Cap. 168 – Kif. 132(1)',officer:'Cpl. H. Mwinyi',location:'Ali Hassan Mwinyi Rd',date:'16/05/2024',time:'16:30',fine:30000,status:'paid'},
  {id:'CIT-2024-00025',num:25,suspect:'Nesto Eliya Masoud',nida:'3344556677889',vehicle:'T222 HJK',vehicleType:'Suzuki Alto',offence:'Bila mkanda wa usalama',law:'Traffic Offences Act, Cap. 168 – Kif. 133(1)',officer:'Insp. J.M. Khamis',location:'Bagamoyo Road',date:'16/05/2024',time:'04:45',fine:10000,status:'unpaid'},
  {id:'CIT-2024-00024',num:24,suspect:'Rajabu Abubakar',nida:'5566778899001',vehicle:'T789 LMN',vehicleType:'Toyota Hiace',offence:'Kuendesha bila bima',law:'Road Traffic Act – Kif. 107(1)',officer:'ASP F. Kimaro',location:'Morogoro Rd, Oysterbay',date:'16/05/2024',time:'02:30',fine:50000,status:'issued'},
  {id:'CIT-2024-00023',num:23,suspect:'Hassan Juma',nida:'2233445566778',vehicle:'T555 OPQ',vehicleType:'Nissan March',offence:'Taa zisizofanya kazi',law:'Traffic Offences Act, Cap. 168 – Kif. 114(1)',officer:'Sgt. A. Suleiman',location:'Nyerere Road',date:'15/05/2024',time:'19:45',fine:50000,status:'unpaid'},
]

export const MOCK_ARRESTS = [
  {id:'AR-2024-00005',suspect:'Juma Ally Khamis',nida:'1234567890123',charges:'Kuendesha bila leseni',chargeCode:'Kif. 129(1)',category:'Traffic',officer:'Insp. J.M. Khamis',station:'Oysterbay PS',date:'17/05/2024',time:'10:45',status:'pending',rights_read:true},
  {id:'AR-2024-00004',suspect:'Omar Said Bakari',nida:'9988776655443',charges:'Wizi wa nyumba',chargeCode:'Kif. 258(a)',category:'Criminal',officer:'Sgt. A. Suleiman',station:'Kariakoo PS',date:'16/05/2024',time:'23:15',status:'detained',rights_read:true},
  {id:'AR-2024-00003',suspect:'Neema Kazimoto',nida:'6677889900112',charges:'Udanganyifu wa fedha',chargeCode:'Kif. 265',category:'Economic',officer:'ASP F.R. Kimaro',station:'Ilala PS',date:'15/05/2024',time:'14:30',status:'completed',rights_read:true},
  {id:'AR-2024-00002',suspect:'Hassan Mwita Mugisha',nida:'4455667788990',charges:'Mapigano ya Mitaani',chargeCode:'Kif. 233',category:'Assault',officer:'Cpl. H.A. Mwinyi',station:'Temeke PS',date:'14/05/2024',time:'22:00',status:'court',rights_read:true},
  {id:'AR-2024-00001',suspect:'Safia Ramadhani',nida:'3344556677889',charges:'Kuuza dawa za kulevya',chargeCode:'Narcotics Act',category:'Narcotics',officer:'ASP F.R. Kimaro',station:'Kinondoni PS',date:'13/05/2024',time:'18:45',status:'detained',rights_read:true},
]

export const MOCK_DETENTIONS = [
  {id:'DET-2024-00012',person:'Omar Said Bakari',nida:'9988776655443',reason:'Wizi wa nyumba',cell:'A-3',station:'Kariakoo PS',officer:'Sgt. A. Suleiman',checkin:'16/05/2024 23:30',checkout:null,status:'active',max_hours:48},
  {id:'DET-2024-00011',person:'Safia Ramadhani',nida:'3344556677889',reason:'Dawa za kulevya',cell:'B-1',station:'Kinondoni PS',officer:'ASP F.R. Kimaro',checkin:'13/05/2024 19:00',checkout:null,status:'active',max_hours:48},
]

export const MOCK_INCIDENTS = [
  {id:'INC-2024-00312',type:'Wizi wa Gari',description:'Gari liliibwa usiku wa manane',officer:'Sgt. A. Suleiman',location:'Kariakoo, DSM',date:'17/05/2024',time:'08:30',status:'investigating',priority:'critical'},
  {id:'INC-2024-00311',type:'Mapigano ya Mitaani',description:'Mapigano yaliyosababisha majeraha',officer:'Cpl. H. Mwinyi',location:'Mwananyamala, DSM',date:'16/05/2024',time:'22:15',status:'pending',priority:'high'},
  {id:'INC-2024-00310',type:'Uvunjaji wa Nyumba',description:'Wezi waliingia nyumbani usiku',officer:'Insp. J.M. Khamis',location:'Mikocheni B, DSM',date:'16/05/2024',time:'02:40',status:'closed',priority:'medium'},
]

export const MOCK_CASES = [
  {id:'CASE-2024-00128',title:'Wizi wa Benki ya CRDB',type:'Criminal',status:'active',officer:'CID Insp. Mwangi',date:'17/05/2024',priority:'critical',suspects:2,evidence:8,updates:5},
  {id:'CASE-2024-00127',title:'Udanganyifu wa Leseni za Magari',type:'Fraud',status:'active',officer:'CID Sgt. Hassan',date:'16/05/2024',priority:'high',suspects:1,evidence:12,updates:3},
  {id:'CASE-2024-00126',title:'Madawa ya Kulevya – Kariakoo Network',type:'Narcotics',status:'active',officer:'CID ASP Kimaro',date:'15/05/2024',priority:'critical',suspects:5,evidence:20,updates:8},
  {id:'CASE-2024-00125',title:'Mauaji ya Temeke',type:'Murder',status:'active',officer:'CID Insp. Mwangi',date:'14/05/2024',priority:'critical',suspects:1,evidence:15,updates:12},
]

export const MOCK_WANTED = [
  {id:'WNT-2024-00045',name:'Khalid Omar Rashidi',alias:'Black Spider',nida:'7788990011223',age:34,crime:'Wizi wa Mkoba na Unyakuzi',region:'Dar es Salaam',lastSeen:'Kariakoo Market',date:'15/05/2024',reward:5000000,status:'active',dangerous:true},
  {id:'WNT-2024-00044',name:'Amina Said Ally',alias:'Mama Dawa',nida:'3322110099887',age:45,crime:'Usambazaji wa Dawa za Kulevya',region:'Mwanza',lastSeen:'Mwanza Port Area',date:'10/05/2024',reward:3000000,status:'active',dangerous:false},
]

export const MOCK_MISSING = [
  {id:'MIS-2024-00089',name:'Amina Rashid Mbwana',age:14,gender:'Mwanamke',region:'Dar es Salaam',lastSeen:'Kinondoni',date:'16/05/2024',reporter:'Rashid Mbwana (Baba)',phone:'+255 712 111 222',description:'Alikimbia nyumbani',status:'active',photo:true},
  {id:'MIS-2024-00088',name:'John Peter Mwita',age:8,gender:'Mwanaume',region:'Arusha',lastSeen:'Arusha Town',date:'14/05/2024',reporter:'Mary Peter (Mama)',phone:'+255 713 333 444',description:'Hakurudi shuleni',status:'active',photo:true},
]

export const MOCK_EVIDENCE = [
  {id:'EVD-2024-00234',case:'CASE-2024-00128',type:'Picha',description:'CCTV ya benki',file:'cctv_01.mp4',size:'24MB',officer:'CID Insp. Mwangi',date:'17/05/2024',chain:[{officer:'CID Insp. Mwangi',action:'Ilikusanywa',date:'17/05/2024'},{officer:'Forensic Sgt. Ali',action:'Ilichunguzwa',date:'18/05/2024'}],status:'active'},
  {id:'EVD-2024-00233',case:'CASE-2024-00128',type:'Nyaraka',description:'Risiti za benki',file:'receipts.pdf',size:'2MB',officer:'CID Sgt. Hassan',date:'17/05/2024',chain:[{officer:'CID Sgt. Hassan',action:'Ilikusanywa',date:'17/05/2024'}],status:'active'},
]

export const MOCK_PATROLS = [
  {id:'PAT-2024-00234',officer:'Insp. J.M. Khamis',badge:'123456',route:'Morogoro Rd – Oysterbay',station:'Oysterbay PS',start:'17/05/2024 06:00',end:null,status:'active',gps:{lat:-6.787,lng:39.283}},
  {id:'PAT-2024-00233',officer:'Sgt. A. Suleiman',badge:'234567',route:'Kariakoo – Mnazi Mmoja',station:'Kariakoo PS',start:'17/05/2024 05:00',end:'17/05/2024 14:00',status:'completed',gps:{lat:-6.814,lng:39.281}},
]

export const MOCK_ALERTS = [
  {id:'ALT-001',type:'critical',title:'Wizi wa Gari – T123 DFG',desc:'Gari lenye namba T123 DFG linatafutwa · Kariakoo, Dar es Salaam',time:'17 Mei 2024, 22:15',read:false},
  {id:'ALT-002',type:'urgent',  title:'Operesheni Maalum – Barabara ya Morogoro',desc:'Zuio la usalama kuanzia saa 18:00 hadi 06:00',time:'16 Mei 2024, 17:45',read:false},
  {id:'ALT-003',type:'info',    title:'Mkutano wa Maafisa – Makao Makuu',desc:'Maafisa wote wa ngazi ya SP na juu · Saa 09:00',time:'Kesho, 18 Mei 2024',read:false},
  {id:'ALT-004',type:'critical',title:'Mtu Aliyepotea – Amina Rashid Mbwana',desc:'Mtoto wa miaka 14 · Kinondoni',time:'16 Mei 2024, 14:30',read:false},
  {id:'ALT-005',type:'urgent',  title:'Silaha Iliyoibiwa – Kituo cha Temeke',desc:'Bunduki moja ya mazoezi haipo',time:'15 Mei 2024, 20:10',read:true},
]

export const MOCK_OFFICERS = [
  {id:'OFF-001',name:'Insp. Juma M. Khamis',badge:'123456',rank:'inspector',role:'regular_officer',station:'Oysterbay PS',district:'Kinondoni',region:'Dar es Salaam',phone:'+255 712 345 678',status:'active',online:true},
  {id:'OFF-002',name:'Sgt. Asha M. Suleiman',badge:'234567',rank:'sergeant',role:'regular_officer',station:'Kariakoo PS',district:'Ilala',region:'Dar es Salaam',phone:'+255 713 456 789',status:'active',online:true},
  {id:'OFF-003',name:'ASP Fatuma R. Kimaro',badge:'345678',rank:'asp',role:'cid_officer',station:'Ilala PS',district:'Ilala',region:'Dar es Salaam',phone:'+255 714 567 890',status:'active',online:false},
  {id:'OFF-004',name:'Cpl. Hassan A. Mwinyi',badge:'456789',rank:'corporal',role:'traffic_officer',station:'Temeke PS',district:'Temeke',region:'Dar es Salaam',phone:'+255 715 678 901',status:'active',online:true},
]

export const MOCK_PERSON = {
  id:'PRS-2024-0517-000123',fullName:'Juma Ally Khamis',nida:'1234567890123',
  gender:'Mwanaume',dob:'15/03/1985',age:39,nationality:'Mtanzania',
  phone:'+255 712 345 678',email:'juma.ally@gmail.com',
  address:'Mbezi Beach, Makabe Rd',region:'Dar es Salaam',district:'Kinondoni',ward:'Mbezi',
  father:'Ally Khamis',mother:'Asha Mohamed',
  documents:{
    nida:    {number:'1234567890123',valid:true,issued:'12/06/2016'},
    license: {number:'DL12345678TZ',valid:true,class:'B,C',expiry:'20/08/2026'},
    tin:     {number:'123-456-789',valid:true,type:'Individual'},
    inec:    {number:'NEC987654321',valid:true,center:'Oysterbay'},
    passport:{number:'PP1234567',valid:true,expiry:'10/02/2028',type:'Ordinary'},
  },
  policeRecord:{watchlist:0,arrests:1,charges:1,activeCases:0,citations:3,warrants:0},
  warning:false,
}

export const MOCK_PRISONERS = [
  {id:'PRZ-2024-00034',name:'Omar Said Bakari',nida:'9988776655443',cell:'A-3',station:'Kariakoo PS',reason:'Wizi wa nyumba',officer:'Sgt. A. Suleiman',checkin:'16/05/2024 23:30',maxHours:48,status:'active'},
  {id:'PRZ-2024-00033',name:'Safia Ramadhani',nida:'3344556677889',cell:'B-1',station:'Kinondoni PS',reason:'Dawa za kulevya',officer:'ASP F.R. Kimaro',checkin:'13/05/2024 19:00',maxHours:48,status:'active'},
]

export const MOCK_FIREARMS = [
  {id:'FRM-2024-001',serial:'TZP-9MM-001234',type:'Pistol 9mm',issued_to:'Insp. J.M. Khamis',badge:'123456',station:'Oysterbay PS',date_issued:'01/01/2024',status:'issued',condition:'Good'},
  {id:'FRM-2024-002',serial:'TZR-AK-005678',type:'Rifle AK-47',issued_to:'Station Armory',badge:null,station:'Kariakoo PS',date_issued:null,status:'armory',condition:'Good'},
]

export const MOCK_MESSAGES = [
  {id:'MSG-001',from:'RPC DSM',to:'All Stations',content:'Operesheni maalum leo usiku saa 12. Maafisa wote wasimame tayari.',time:'17/05/2024 14:30',priority:'urgent',read:false},
  {id:'MSG-002',from:'OCS Oysterbay',to:'Insp. Khamis',content:'Ripoti ya asubuhi imekamilika. Asante.',time:'17/05/2024 09:00',priority:'normal',read:true},
]

export const MOCK_REGIONS_STATS = [
  {name:'Dar es Salaam',count:847,pct:85,color:'#ef5350'},
  {name:'Mwanza',count:312,pct:55,color:'#2E7D32'},
  {name:'Arusha',count:198,pct:42,color:'#2E7D32'},
  {name:'Dodoma',count:143,pct:30,color:'#2E7D32'},
  {name:'Mbeya',count:98,pct:22,color:'#2E7D32'},
  {name:'Tanga',count:76,pct:16,color:'#2E7D32'},
]

export const MOCK_DASHBOARD_STATS = {
  citationsToday:284, citationsDelta:'+12%',
  arrestsToday:47,    arrestsDelta:'+8%',
  criticalAlerts:5,   alertsDelta:'+2',
  activeCases:128,    casesDelta:'-3%',
  vehiclesChecked:1842, vehiclesDelta:'+15%',
  officersOnline:1247, officersDelta:'+5',
  totalStations:312,  stationsDelta:'0',
  regions:26,
}
