import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider }  from '@context/AppContext'
import { AuthProvider } from '@context/AuthContext'
import MainLayout       from '@layout/MainLayout'

// Auth
import SplashScreen  from '@pages/Auth/SplashScreen'
import LoginPage     from '@pages/Auth/LoginPage'
import SplashGuard   from '@pages/Auth/SplashGuard'

// Dashboards
import NationalDashboard from '@pages/Dashboard/National/NationalDashboard'
import RegionalDashboard from '@pages/Dashboard/Regional/RegionalDashboard'
import DistrictDashboard from '@pages/Dashboard/District/DistrictDashboard'
import StationDashboard  from '@pages/Dashboard/Station/StationDashboard'

// Operations
import OpsMap      from '@pages/Operations/Map/OpsMap'
import Alerts      from '@pages/Operations/Alerts/Alerts'
import Patrol      from '@pages/Operations/Patrol/Patrol'
import Roadblocks  from '@pages/Operations/Roadblocks/Roadblocks'
import Checkpoints from '@pages/Operations/Checkpoints/Checkpoints'

// Enforcement
import Citations     from '@pages/Enforcement/Citations/Citations'
import CitationWizard from '@pages/Enforcement/Citations/CitationWizard'
import CitationDetail from '@pages/Enforcement/Citations/CitationDetail'
import Arrests       from '@pages/Enforcement/Arrests/Arrests'
import ArrestWizard  from '@pages/Enforcement/Arrests/ArrestWizard'
import Detentions    from '@pages/Enforcement/Detentions/Detentions'
import Incidents     from '@pages/Enforcement/Incidents/Incidents'
import Accidents     from '@pages/Enforcement/Accidents/Accidents'
import PF3Forms      from '@pages/Enforcement/PF3/PF3Forms'

// Investigation
import Cases      from '@pages/Investigation/Cases/Cases'
import CaseDetail from '@pages/Investigation/Cases/CaseDetail'
import Warrants   from '@pages/Investigation/Warrants/Warrants'
import Wanted     from '@pages/Investigation/Wanted/Wanted'
import Missing    from '@pages/Investigation/Missing/Missing'
import Evidence   from '@pages/Investigation/Evidence/Evidence'
import Forensics  from '@pages/Investigation/Forensics/Forensics'

// Intelligence
import Intelligence from '@pages/Intelligence/Intelligence'

// Management
import Persons   from '@pages/Management/Persons/Persons'
import Vehicles  from '@pages/Management/Vehicles/Vehicles'
import Officers  from '@pages/Management/Officers/Officers'
import Stations  from '@pages/Management/Stations/Stations'
import Prisoners from '@pages/Management/Prisoners/Prisoners'
import Cells     from '@pages/Management/Cells/Cells'
import Firearms  from '@pages/Management/Firearms/Firearms'
import Assets    from '@pages/Management/Assets/Assets'
import Courts    from '@pages/Management/Courts/Courts'

// Other
import Communications from '@pages/Communications/Communications'
import HR             from '@pages/HR/HR'

// Reports
import CrimeReports from '@pages/Reports/Crime/CrimeReports'
import Analytics    from '@pages/Reports/Analytics/Analytics'
import Performance  from '@pages/Reports/Performance/Performance'

// System
import Audit    from '@pages/System/Audit/Audit'
import RBAC     from '@pages/System/RBAC/RBAC'
import Settings from '@pages/System/Settings/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>

            {/* ── PUBLIC (no layout) ── */}
            <Route path="/"       element={<SplashGuard />} />
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/login"  element={<LoginPage />} />

            {/* ── PROTECTED (MainLayout) ── */}
            <Route path="/dashboard" element={<MainLayout />}>
              <Route index           element={<NationalDashboard />} />
              <Route path="regional" element={<RegionalDashboard />} />
              <Route path="district" element={<DistrictDashboard />} />
              <Route path="station"  element={<StationDashboard />} />
            </Route>

            <Route path="/operations" element={<MainLayout />}>
              <Route path="map"         element={<OpsMap />} />
              <Route path="alerts"      element={<Alerts />} />
              <Route path="patrol"      element={<Patrol />} />
              <Route path="roadblocks"  element={<Roadblocks />} />
              <Route path="checkpoints" element={<Checkpoints />} />
            </Route>

            <Route path="/enforcement" element={<MainLayout />}>
              <Route path="citations"      element={<Citations />} />
              <Route path="citations/new"  element={<CitationWizard />} />
              <Route path="citations/:id"  element={<CitationDetail />} />
              <Route path="arrests"        element={<Arrests />} />
              <Route path="arrests/new"    element={<ArrestWizard />} />
              <Route path="detentions"     element={<Detentions />} />
              <Route path="incidents"      element={<Incidents />} />
              <Route path="accidents"      element={<Accidents />} />
              <Route path="pf3"            element={<PF3Forms />} />
            </Route>

            <Route path="/investigation" element={<MainLayout />}>
              <Route path="cases"       element={<Cases />} />
              <Route path="cases/:id"   element={<CaseDetail />} />
              <Route path="warrants"    element={<Warrants />} />
              <Route path="wanted"      element={<Wanted />} />
              <Route path="missing"     element={<Missing />} />
              <Route path="evidence"    element={<Evidence />} />
              <Route path="forensics"   element={<Forensics />} />
            </Route>

            <Route path="/intelligence" element={<MainLayout />}>
              <Route index element={<Intelligence />} />
            </Route>

            <Route path="/management" element={<MainLayout />}>
              <Route path="persons"   element={<Persons />} />
              <Route path="vehicles"  element={<Vehicles />} />
              <Route path="officers"  element={<Officers />} />
              <Route path="stations"  element={<Stations />} />
              <Route path="prisoners" element={<Prisoners />} />
              <Route path="cells"     element={<Cells />} />
              <Route path="firearms"  element={<Firearms />} />
              <Route path="assets"    element={<Assets />} />
              <Route path="courts"    element={<Courts />} />
            </Route>

            <Route path="/communications" element={<MainLayout />}>
              <Route index element={<Communications />} />
            </Route>

            <Route path="/hr" element={<MainLayout />}>
              <Route index element={<HR />} />
            </Route>

            <Route path="/reports" element={<MainLayout />}>
              <Route path="crime"       element={<CrimeReports />} />
              <Route path="analytics"   element={<Analytics />} />
              <Route path="performance" element={<Performance />} />
            </Route>

            <Route path="/system" element={<MainLayout />}>
              <Route path="audit"    element={<Audit />} />
              <Route path="rbac"     element={<RBAC />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
