import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider }    from '@context/AppContext'
import { AuthProvider }   from '@context/AuthContext'
import MainLayout         from '@layout/MainLayout'

// Auth pages (no sidebar/topbar)
import SplashScreen       from '@pages/Auth/SplashScreen'
import SplashGuard       from '@pages/Auth/SplashGuard'
import LoginPage          from '@pages/Auth/LoginPage'

// Dashboards
import NationalDashboard  from '@pages/Dashboard/National/NationalDashboard'
import RegionalDashboard  from '@pages/Dashboard/Regional/RegionalDashboard'
import DistrictDashboard  from '@pages/Dashboard/District/DistrictDashboard'
import StationDashboard   from '@pages/Dashboard/Station/StationDashboard'

// Operations
import OpsMap             from '@pages/Operations/Map/OpsMap'
import Alerts             from '@pages/Operations/Alerts/Alerts'
import Patrol             from '@pages/Operations/Patrol/Patrol'
import Roadblocks         from '@pages/Operations/Roadblocks/Roadblocks'
import Checkpoints        from '@pages/Operations/Checkpoints/Checkpoints'

// Enforcement
import Citations          from '@pages/Enforcement/Citations/Citations'
import CitationWizard     from '@pages/Enforcement/Citations/CitationWizard'
import CitationDetail     from '@pages/Enforcement/Citations/CitationDetail'
import Arrests            from '@pages/Enforcement/Arrests/Arrests'
import ArrestWizard       from '@pages/Enforcement/Arrests/ArrestWizard'
import Detentions         from '@pages/Enforcement/Detentions/Detentions'
import Incidents          from '@pages/Enforcement/Incidents/Incidents'
import Accidents          from '@pages/Enforcement/Accidents/Accidents'
import PF3Forms           from '@pages/Enforcement/PF3/PF3Forms'

// Investigation
import Cases              from '@pages/Investigation/Cases/Cases'
import CaseDetail         from '@pages/Investigation/Cases/CaseDetail'
import Warrants           from '@pages/Investigation/Warrants/Warrants'
import Wanted             from '@pages/Investigation/Wanted/Wanted'
import Missing            from '@pages/Investigation/Missing/Missing'
import Evidence           from '@pages/Investigation/Evidence/Evidence'
import Forensics          from '@pages/Investigation/Forensics/Forensics'

// Intelligence
import Intelligence       from '@pages/Intelligence/Intelligence'

// Management
import Persons            from '@pages/Management/Persons/Persons'
import Vehicles           from '@pages/Management/Vehicles/Vehicles'
import Officers           from '@pages/Management/Officers/Officers'
import Stations           from '@pages/Management/Stations/Stations'
import Prisoners          from '@pages/Management/Prisoners/Prisoners'
import Cells              from '@pages/Management/Cells/Cells'
import Firearms           from '@pages/Management/Firearms/Firearms'
import Assets             from '@pages/Management/Assets/Assets'
import Courts             from '@pages/Management/Courts/Courts'

// Other
import Communications     from '@pages/Communications/Communications'
import HR                 from '@pages/HR/HR'

// Reports
import CrimeReports       from '@pages/Reports/Crime/CrimeReports'
import Analytics          from '@pages/Reports/Analytics/Analytics'
import Performance        from '@pages/Reports/Performance/Performance'

// System
import Audit              from '@pages/System/Audit/Audit'
import RBAC               from '@pages/System/RBAC/RBAC'
import Settings           from '@pages/System/Settings/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            {/* ── PUBLIC: splash + login (no layout) ── */}
            <Route path="/entry"  element={<SplashGuard />} />
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/login"  element={<LoginPage />} />

            {/* ── PROTECTED: all app routes inside MainLayout ── */}
            <Route path="/" element={<MainLayout />}>
              <Route index                          element={<NationalDashboard />} />
              <Route path="dashboard/regional"      element={<RegionalDashboard />} />
              <Route path="dashboard/district"      element={<DistrictDashboard />} />
              <Route path="dashboard/station"       element={<StationDashboard />} />

              <Route path="operations/map"          element={<OpsMap />} />
              <Route path="operations/alerts"       element={<Alerts />} />
              <Route path="operations/patrol"       element={<Patrol />} />
              <Route path="operations/roadblocks"   element={<Roadblocks />} />
              <Route path="operations/checkpoints"  element={<Checkpoints />} />

              <Route path="enforcement/citations"         element={<Citations />} />
              <Route path="enforcement/citations/new"     element={<CitationWizard />} />
              <Route path="enforcement/citations/:id"     element={<CitationDetail />} />
              <Route path="enforcement/arrests"           element={<Arrests />} />
              <Route path="enforcement/arrests/new"       element={<ArrestWizard />} />
              <Route path="enforcement/detentions"        element={<Detentions />} />
              <Route path="enforcement/incidents"         element={<Incidents />} />
              <Route path="enforcement/accidents"         element={<Accidents />} />
              <Route path="enforcement/pf3"               element={<PF3Forms />} />

              <Route path="investigation/cases"           element={<Cases />} />
              <Route path="investigation/cases/:id"       element={<CaseDetail />} />
              <Route path="investigation/warrants"        element={<Warrants />} />
              <Route path="investigation/wanted"          element={<Wanted />} />
              <Route path="investigation/missing"         element={<Missing />} />
              <Route path="investigation/evidence"        element={<Evidence />} />
              <Route path="investigation/forensics"       element={<Forensics />} />

              <Route path="intelligence"                  element={<Intelligence />} />

              <Route path="management/persons"            element={<Persons />} />
              <Route path="management/vehicles"           element={<Vehicles />} />
              <Route path="management/officers"           element={<Officers />} />
              <Route path="management/stations"           element={<Stations />} />
              <Route path="management/prisoners"          element={<Prisoners />} />
              <Route path="management/cells"              element={<Cells />} />
              <Route path="management/firearms"           element={<Firearms />} />
              <Route path="management/assets"             element={<Assets />} />
              <Route path="management/courts"             element={<Courts />} />

              <Route path="communications"                element={<Communications />} />
              <Route path="hr"                            element={<HR />} />

              <Route path="reports/crime"                 element={<CrimeReports />} />
              <Route path="reports/analytics"             element={<Analytics />} />
              <Route path="reports/performance"           element={<Performance />} />

              <Route path="system/audit"                  element={<Audit />} />
              <Route path="system/rbac"                   element={<RBAC />} />
              <Route path="system/settings"               element={<Settings />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
