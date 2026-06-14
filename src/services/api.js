// =========================================================
// TPDOP API Service Layer
// Replace SUPABASE_URL and SUPABASE_KEY with real values
// from your Supabase project dashboard
// =========================================================

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
}

// ── Generic fetch wrapper ──
async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
    headers: { ...headers, ...options.headers },
    ...options,
  })
  if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`)
  return res.json()
}

// ── Citations ──
export const citationsApi = {
  getAll:    (params = '') => apiFetch(`citations?${params}&order=created_at.desc`),
  getById:   (id)          => apiFetch(`citations?id=eq.${id}&select=*,officer:profiles(*)`),
  create:    (data)        => apiFetch('citations', { method:'POST', body:JSON.stringify(data) }),
  update:    (id, data)    => apiFetch(`citations?id=eq.${id}`, { method:'PATCH', body:JSON.stringify(data) }),
}

// ── Arrests ──
export const arrestsApi = {
  getAll:  (params = '') => apiFetch(`arrests?${params}&order=arrest_time.desc`),
  getById: (id)          => apiFetch(`arrests?id=eq.${id}`),
  create:  (data)        => apiFetch('arrests', { method:'POST', body:JSON.stringify(data) }),
}

// ── Persons ──
export const personsApi = {
  searchByNIDA:    (nida)     => apiFetch(`persons?nida=eq.${nida}`),
  searchByName:    (name)     => apiFetch(`persons?full_name=ilike.*${name}*`),
  searchByPhone:   (phone)    => apiFetch(`persons?phone=eq.${phone}`),
  searchByLicense: (license)  => apiFetch(`persons?license_number=eq.${license}`),
}

// ── Cases ──
export const casesApi = {
  getAll:  (params = '') => apiFetch(`cases?${params}&order=created_at.desc`),
  getById: (id)          => apiFetch(`cases?id=eq.${id}&select=*,updates:case_updates(*)`),
  create:  (data)        => apiFetch('cases', { method:'POST', body:JSON.stringify(data) }),
  update:  (id, data)    => apiFetch(`cases?id=eq.${id}`, { method:'PATCH', body:JSON.stringify(data) }),
}

// ── Officers ──
export const officersApi = {
  getAll:  ()   => apiFetch('profiles?order=full_name'),
  getById: (id) => apiFetch(`profiles?id=eq.${id}`),
}

// ── Alerts ──
export const alertsApi = {
  getAll:    ()   => apiFetch('alerts?order=created_at.desc&limit=50'),
  markRead:  (id) => apiFetch(`alerts?id=eq.${id}`, { method:'PATCH', body:JSON.stringify({ read:true }) }),
}

// ── Auth ──
export const authApi = {
  login: (badge, password) => fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method:'POST', headers,
    body: JSON.stringify({ email:`${badge}@tpf.go.tz`, password }),
  }).then(r => r.json()),
  logout: () => fetch(`${SUPABASE_URL}/auth/v1/logout`, { method:'POST', headers }),
}
