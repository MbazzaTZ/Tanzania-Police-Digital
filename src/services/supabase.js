// =========================================================
// TPDOP – Supabase Client + Service Layer
// =========================================================

const URL = import.meta.env.VITE_SUPABASE_URL || ''
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

const headers = {
  'Content-Type': 'application/json',
  'apikey': KEY,
  'Authorization': `Bearer ${KEY}`,
}

async function q(endpoint, opts = {}) {
  const res = await fetch(`${URL}/rest/v1/${endpoint}`, { headers:{ ...headers, ...opts.headers }, ...opts })
  if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`)
  return res.json()
}

// ── AUTH ──
export const auth = {
  login:  (badge, pass) => fetch(`${URL}/auth/v1/token?grant_type=password`, {
    method:'POST', headers, body:JSON.stringify({ email:`${badge}@tpf.go.tz`, password:pass }),
  }).then(r => r.json()),
  logout: () => fetch(`${URL}/auth/v1/logout`, { method:'POST', headers }),
  session:() => fetch(`${URL}/auth/v1/user`, { headers }).then(r => r.json()),
}

// ── CITATIONS ──
export const citations = {
  getAll:   (f='') => q(`citations?${f}&order=created_at.desc&select=*,officer:profiles(name,badge,rank)`),
  getById:  (id)   => q(`citations?id=eq.${id}&select=*,officer:profiles(*)`),
  create:   (d)    => q('citations', { method:'POST', body:JSON.stringify(d) }),
  update:   (id,d) => q(`citations?id=eq.${id}`, { method:'PATCH', body:JSON.stringify(d) }),
}

// ── ARRESTS ──
export const arrests = {
  getAll:  (f='') => q(`arrests?${f}&order=arrest_time.desc`),
  getById: (id)   => q(`arrests?id=eq.${id}&select=*,charges:arrest_charges(*)`),
  create:  (d)    => q('arrests', { method:'POST', body:JSON.stringify(d) }),
  update:  (id,d) => q(`arrests?id=eq.${id}`, { method:'PATCH', body:JSON.stringify(d) }),
}

// ── DETENTIONS ──
export const detentions = {
  getAll:  () => q('detentions?order=checkin_time.desc'),
  create:  (d) => q('detentions', { method:'POST', body:JSON.stringify(d) }),
  release: (id,d) => q(`detentions?id=eq.${id}`, { method:'PATCH', body:JSON.stringify({ checkout_time: new Date().toISOString(), ...d }) }),
}

// ── PERSONS ──
export const persons = {
  byNIDA:    (v) => q(`persons?nida=eq.${v}`),
  byName:    (v) => q(`persons?full_name=ilike.*${v}*`),
  byPhone:   (v) => q(`persons?phone=eq.${v}`),
  byLicense: (v) => q(`persons?license_number=eq.${v}`),
  byPassport:(v) => q(`persons?passport_number=eq.${v}`),
  byVehicle: (v) => q(`vehicles?plate=eq.${v}&select=*,owner:persons(*)`),
  byTIN:     (v) => q(`persons?tin=eq.${v}`),
}

// ── VEHICLES ──
export const vehicles = {
  getAll:  () => q('vehicles?order=created_at.desc'),
  byPlate: (p) => q(`vehicles?plate=eq.${p}&select=*,owner:persons(*)`),
  create:  (d) => q('vehicles', { method:'POST', body:JSON.stringify(d) }),
}

// ── CASES ──
export const cases = {
  getAll:  (f='') => q(`cases?${f}&order=created_at.desc`),
  getById: (id)   => q(`cases?id=eq.${id}&select=*,updates:case_updates(*),evidence:evidence(count)`),
  create:  (d)    => q('cases', { method:'POST', body:JSON.stringify(d) }),
  update:  (id,d) => q(`cases?id=eq.${id}`, { method:'PATCH', body:JSON.stringify(d) }),
  addUpdate:(d)   => q('case_updates', { method:'POST', body:JSON.stringify(d) }),
}

// ── EVIDENCE ──
export const evidence = {
  getAll:    (caseId) => q(`evidence?case_id=eq.${caseId}&order=collected_at.desc`),
  upload:    (d)      => q('evidence', { method:'POST', body:JSON.stringify(d) }),
  addChain:  (d)      => q('evidence_chain', { method:'POST', body:JSON.stringify(d) }),
}

// ── WANTED / MISSING ──
export const wanted  = { getAll: () => q('wanted_persons?status=eq.active&order=created_at.desc') }
export const missing = { getAll: () => q('missing_persons?status=eq.active&order=created_at.desc') }

// ── OFFICERS ──
export const officers = {
  getAll:     () => q('profiles?order=full_name'),
  getByBadge: (b) => q(`profiles?badge=eq.${b}`),
  update:     (id,d) => q(`profiles?id=eq.${id}`, { method:'PATCH', body:JSON.stringify(d) }),
}

// ── PRISONERS ──
export const prisoners = {
  getAll:   () => q('prisoners?order=checkin_time.desc'),
  transfer: (d) => q('transfers', { method:'POST', body:JSON.stringify(d) }),
}

// ── FIREARMS ──
export const firearms = {
  getAll:   () => q('firearms?order=serial_number'),
  getById:  (id) => q(`firearms?id=eq.${id}`),
}

// ── PATROLS ──
export const patrols = {
  getActive: () => q('patrols?status=eq.active&select=*,officer:profiles(name,badge)'),
  start:     (d) => q('patrols', { method:'POST', body:JSON.stringify(d) }),
  end:       (id) => q(`patrols?id=eq.${id}`, { method:'PATCH', body:JSON.stringify({ status:'completed', end_time: new Date().toISOString() }) }),
}

// ── LOCATIONS ──
export const locations = {
  update: (d) => q('officer_locations', { method:'POST', headers:{ ...headers, Prefer:'resolution=merge-duplicates' }, body:JSON.stringify(d) }),
  getAll: () => q('officer_locations?select=*,officer:profiles(name,badge,rank)'),
}

// ── ALERTS ──
export const alerts = {
  getAll:   () => q('alerts?order=created_at.desc&limit=50'),
  markRead: (id) => q(`alerts?id=eq.${id}`, { method:'PATCH', body:JSON.stringify({ read:true }) }),
  create:   (d) => q('alerts', { method:'POST', body:JSON.stringify(d) }),
}

// ── MESSAGES ──
export const messages = {
  getAll:    (uid) => q(`messages?or=(to.eq.${uid},from.eq.${uid})&order=created_at.desc`),
  send:      (d)   => q('messages', { method:'POST', body:JSON.stringify(d) }),
}

// ── AUDIT ──
export const audit = {
  getAll: (f='') => q(`audit_logs?${f}&order=created_at.desc&limit=100`),
  log:    (d)    => q('audit_logs', { method:'POST', body:JSON.stringify(d) }),
}

// ── INCIDENTS / ACCIDENTS ──
export const incidents = {
  getAll:  () => q('incident_reports?order=created_at.desc'),
  create:  (d) => q('incident_reports', { method:'POST', body:JSON.stringify(d) }),
}
export const accidents = {
  getAll:  () => q('accident_reports?order=created_at.desc'),
  create:  (d) => q('accident_reports', { method:'POST', body:JSON.stringify(d) }),
}

// ── PF3 FORMS ──
export const pf3 = {
  getAll:  () => q('pf3_forms?order=created_at.desc'),
  create:  (d) => q('pf3_forms', { method:'POST', body:JSON.stringify(d) }),
}

// ── COURTS ──
export const courts = {
  getCases:   () => q('court_cases?order=next_hearing.asc'),
  getHearings:() => q('hearings?order=hearing_date.asc'),
}

// ── INTELLIGENCE ──
export const intel = {
  getFiles:   () => q('intelligence_files?order=classification.desc,created_at.desc'),
  create:     (d) => q('intelligence_files', { method:'POST', body:JSON.stringify(d) }),
}

// ── HR ──
export const hr = {
  getRecords: () => q('hr_records?order=created_at.desc'),
  create:     (d) => q('hr_records', { method:'POST', body:JSON.stringify(d) }),
}
