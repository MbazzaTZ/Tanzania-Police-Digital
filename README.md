# Tanzania Police Digital Operations Platform (TPDOP)

> **Kulinda · Kutumikia · Kuweka Usalama** | Protect · Serve · Secure

React + Vite frontend for the Tanzania Police Force national digital platform.

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/MbazzaTZ/Tanzania-Police-Digital.git
cd Tanzania-Police-Digital

# Install
npm install

# Run dev server (opens at http://localhost:3000)
npm run dev

# Build for production
npm run build
```

## 🗂️ Project Structure

```
src/
├── assets/           # Images, fonts, icons, shared CSS
├── components/
│   ├── ui/           # Button, Card, Badge, Table, Tabs, Stepper, Toast, Breadcrumb
│   └── layout/       # Sidebar, Topbar
├── context/          # AppContext (lang, officer, sidebar)
├── features/         # Feature-based modules (citations, arrests, cases…)
├── hooks/            # useSearch, useFilter, useToast, useAnimateCount
├── layout/           # MainLayout (Outlet wrapper)
├── pages/
│   ├── Dashboard/    # National command center
│   ├── Enforcement/  # Citations · CitationWizard · CitationDetail · Arrests · Incidents · Accidents
│   ├── Investigation/# Cases · Wanted · Missing · Evidence
│   ├── Management/   # Persons · Officers · Stations · Prisoners · Vehicles · Firearms
│   ├── Operations/   # Map · Alerts
│   ├── Reports/      # Reports · Analytics
│   └── System/       # Intelligence · Audit · Settings
├── redux/
│   ├── slices/       # citationsSlice · arrestsSlice · casesSlice · personsSlice · alertsSlice · uiSlice
│   └── store/        # store.js
├── services/         # api.js (Supabase REST layer)
├── utils/            # mockData.js · helpers.js · constants.js
├── App.jsx           # React Router routes
├── main.jsx          # Entry point + Redux Provider
└── index.css         # Design tokens + global styles
```

## 🎨 Design System

| Token | Value |
|-------|-------|
| `--clr-primary`   | `#1B5E20` – Tanzania Police Green |
| `--clr-secondary` | `#2E7D32` – Rich Green |
| `--clr-accent`    | `#FFC107` – Amber/Gold |
| `--clr-dark`      | `#0D1B0F` – Background |
| `--font-ui`       | Inter |
| `--font-mono`     | JetBrains Mono |

## 🛣️ Routes

| Path | Page |
|------|------|
| `/` | Dashboard |
| `/enforcement/citations` | Citations list |
| `/enforcement/citations/new` | 4-step Citation Wizard |
| `/enforcement/citations/:id` | Citation detail |
| `/enforcement/arrests` | Arrests list |
| `/enforcement/incidents` | Incidents |
| `/enforcement/accidents` | Accidents |
| `/investigation/cases` | Case management |
| `/investigation/wanted` | Wanted persons |
| `/investigation/missing` | Missing persons |
| `/investigation/evidence` | Evidence chain |
| `/management/persons` | Person search (NIDA/Passport/TIN…) |
| `/management/officers` | Officer management |
| `/management/stations` | Police stations |
| `/management/prisoners` | Detention management |
| `/management/vehicles` | Vehicle registry |
| `/management/firearms` | Firearms registry |
| `/operations/map` | Live operations map |
| `/operations/alerts` | Active alerts |
| `/reports` | Reports |
| `/reports/analytics` | Crime analytics |
| `/system/intelligence` | Intelligence |
| `/system/audit` | Audit trail |
| `/system/settings` | Settings |

## ⚙️ Environment Variables

Create `.env.local` for Supabase connection:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 🏛️ RBAC Roles

| Role | Access |
|------|--------|
| Traffic Officer | Citations, Vehicle Search, Accidents |
| Regular Officer | Incidents, Arrests, Patrol |
| CID Officer | Cases, Evidence, Warrants |
| OCS | All station data |
| OCD | All district data |
| RPC | Full region view |
| IGP | Everything |

## 📦 Tech Stack

| Layer | Tech |
|-------|------|
| UI Framework | React 18 |
| Build Tool | Vite 5 |
| Routing | React Router v6 |
| State | Redux Toolkit |
| Styling | CSS Custom Properties |
| Backend (Sprint 2) | Supabase |
| Auth (Sprint 2) | Firebase Phone Auth |
| Charts (Sprint 2) | Recharts |

© 2024 Tanzania Police Force · Jeshi la Polisi Tanzania
