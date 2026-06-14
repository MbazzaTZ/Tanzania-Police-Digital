# Tanzania Police Digital Operations Platform (TPDOP)

> **Kulinda · Kutumikia · Kuweka Usalama**  
> Protect · Serve · Secure

A full national digital platform for the Tanzania Police Force — Web Command Center (Phase 1).

---

## 🗂️ Project Structure

```
TPDOP/
├── index.html                          # National Dashboard (Home)
├── assets/
│   ├── css/
│   │   └── tpdop.css                   # Shared design system & tokens
│   └── js/
│       ├── sidebar.js                  # Auto-injects sidebar + topbar
│       └── tpdop.js                    # Shared utilities
└── pages/
    ├── enforcement/
    │   ├── citations.html              # Citations / Tiketi list
    │   ├── citation-wizard.html        # 4-step citation creation wizard
    │   ├── citation-detail.html        # Citation detail view
    │   ├── arrests.html                # Arrests / Kukamatwa list
    │   ├── arrest-wizard.html          # Arrest recording wizard
    │   ├── incidents.html              # Incident reports
    │   └── accidents.html              # Accident reports
    ├── investigation/
    │   ├── cases.html                  # Case management (CID)
    │   ├── wanted.html                 # Wanted persons registry
    │   ├── missing.html                # Missing persons registry
    │   └── evidence.html               # Evidence chain of custody
    ├── management/
    │   ├── persons.html                # Person search (NIDA/Passport/etc)
    │   ├── officers.html               # Officer HR management
    │   ├── stations.html               # Police stations
    │   ├── prisoners.html              # Prisoner/detention management
    │   ├── vehicles.html               # Vehicle registry
    │   └── firearms.html               # Firearms registry
    ├── operations/
    │   ├── map.html                    # Live operations map
    │   └── alerts.html                 # Active alerts
    ├── reports/
    │   ├── reports.html                # Report generation
    │   └── analytics.html              # Crime analytics
    └── system/
        ├── intelligence.html           # Intelligence center
        ├── audit.html                  # Audit trail
        └── settings.html               # System settings
```

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--clr-primary` | `#1B5E20` | Tanzania Police Dark Green |
| `--clr-secondary` | `#2E7D32` | Rich Green |
| `--clr-accent` | `#FFC107` | Amber / Gold |
| `--clr-red` | `#C62828` | Alerts / Critical |
| `--clr-dark` | `#0D1B0F` | Background |
| `--font-ui` | Inter | Interface text |
| `--font-mono` | JetBrains Mono | IDs / Badge numbers |

---

## 🏛️ Role Hierarchy

```
IGP (Inspector General of Police)
└── DIGP (Deputy Inspector General)
    └── CP (Commissioner of Police)
        └── RPC (Regional Police Commander) — sees full region
            └── OCD (Officer Commanding District)
                └── OCS (Officer Commanding Station)
                    └── Officer (Constable–SSP)
```

Each role sees only what their level permits (RBAC enforced via Supabase RLS).

---

## 🔐 Role-Based Access

| Role | Access |
|------|--------|
| Traffic Officer | Traffic dashboard, citations, vehicle search, accident reports |
| Regular Officer | Person search, incident reports, arrests, patrol |
| CID Officer | Cases, warrants, suspects, evidence, forensics |
| Forensic Officer | Fingerprints, DNA, ballistics, digital forensics |
| OCS | All station officers, station reports, station cases |
| OCD | All district stations, district stats |
| RPC | Full region, heatmaps, regional intelligence |
| IGP | Everything — national view |

---

## 💻 Tech Stack

| Layer | Technology |
|-------|------------|
| Web Frontend | HTML5 · CSS3 · Vanilla JS (Phase 1) |
| Mobile App | React Native (Phase 2) |
| Backend | Supabase (PostgreSQL + RLS) |
| Auth | Firebase Phone Auth (+255 OTP) |
| Maps | Mapbox / Google Maps API |
| PDF | react-pdf |

---

## 📱 Key Modules

- **Citations / Tiketi** — 4-step wizard, TZS fine tracking, status badges
- **Person Search** — NIDA · TIN · I-NEC · Passport · Leseni · Biometric
- **Arrests** — Full PF3-style recording with evidence upload
- **Cases (CID)** — Investigation management with chain of custody
- **Wanted/Missing** — National registry with photo, status tracking
- **Live Map** — Officer GPS tracking, crime heatmaps per region
- **Intelligence** — Classified files, pattern analysis
- **Audit Trail** — Every action logged with Officer ID, rank, GPS, device

---

## 📅 Roadmap

| Sprint | Focus |
|--------|-------|
| Sprint 1 (Current) | Web Command Center — all HTML/CSS/JS screens |
| Sprint 2 | Supabase schema + RLS policies + Auth |
| Sprint 3 | React Native mobile app (officer field app) |
| Sprint 4 | API integrations (NIDA, TAZAMA, TRA-TIN) |
| Sprint 5 | Live maps + GPS tracking |
| Sprint 6 | Intelligence + biometric modules |

---

## 🇹🇿 Localization

- Bilingual: **Swahili (SW)** and **English (EN)**
- Currency: **TZS** (Tanzanian Shilling)
- Date format: **DD/MM/YYYY**
- Phone: **+255** prefix

---

© 2024 Tanzania Police Force · Jeshi la Polisi Tanzania  
*Haki zote zimehifadhiwa · All rights reserved*
