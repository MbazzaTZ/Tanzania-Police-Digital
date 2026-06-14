import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from '@context/AppContext'
import MainLayout from '@layout/MainLayout'

// Pages
import Dashboard       from '@pages/Dashboard/Dashboard'
import Citations       from '@pages/Enforcement/Citations/Citations'
import CitationWizard  from '@pages/Enforcement/Citations/CitationWizard'
import CitationDetail  from '@pages/Enforcement/Citations/CitationDetail'
import Arrests         from '@pages/Enforcement/Arrests/Arrests'
import Incidents       from '@pages/Enforcement/Incidents/Incidents'
import Accidents       from '@pages/Enforcement/Accidents/Accidents'
import Cases           from '@pages/Investigation/Cases/Cases'
import Wanted          from '@pages/Investigation/Wanted/Wanted'
import Missing         from '@pages/Investigation/Missing/Missing'
import Evidence        from '@pages/Investigation/Evidence/Evidence'
import Persons         from '@pages/Management/Persons/Persons'
import Officers        from '@pages/Management/Officers/Officers'
import Stations        from '@pages/Management/Stations/Stations'
import Prisoners       from '@pages/Management/Prisoners/Prisoners'
import Vehicles        from '@pages/Management/Vehicles/Vehicles'
import Firearms        from '@pages/Management/Firearms/Firearms'
import OpsMap          from '@pages/Operations/Map/OpsMap'
import Alerts          from '@pages/Operations/Alerts/Alerts'
import Reports         from '@pages/Reports/Reports'
import Analytics       from '@pages/Reports/Analytics'
import Intelligence    from '@pages/System/Intelligence/Intelligence'
import Audit           from '@pages/System/Audit/Audit'
import Settings        from '@pages/System/Settings/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />

            {/* Enforcement */}
            <Route path="enforcement/citations"              element={<Citations />} />
            <Route path="enforcement/citations/new"          element={<CitationWizard />} />
            <Route path="enforcement/citations/:id"          element={<CitationDetail />} />
            <Route path="enforcement/arrests"                element={<Arrests />} />
            <Route path="enforcement/incidents"              element={<Incidents />} />
            <Route path="enforcement/accidents"              element={<Accidents />} />

            {/* Investigation */}
            <Route path="investigation/cases"                element={<Cases />} />
            <Route path="investigation/wanted"               element={<Wanted />} />
            <Route path="investigation/missing"              element={<Missing />} />
            <Route path="investigation/evidence"             element={<Evidence />} />

            {/* Management */}
            <Route path="management/persons"                 element={<Persons />} />
            <Route path="management/officers"                element={<Officers />} />
            <Route path="management/stations"                element={<Stations />} />
            <Route path="management/prisoners"               element={<Prisoners />} />
            <Route path="management/vehicles"                element={<Vehicles />} />
            <Route path="management/firearms"                element={<Firearms />} />

            {/* Operations */}
            <Route path="operations/map"                     element={<OpsMap />} />
            <Route path="operations/alerts"                  element={<Alerts />} />

            {/* Reports */}
            <Route path="reports"                            element={<Reports />} />
            <Route path="reports/analytics"                  element={<Analytics />} />

            {/* System */}
            <Route path="system/intelligence"                element={<Intelligence />} />
            <Route path="system/audit"                       element={<Audit />} />
            <Route path="system/settings"                    element={<Settings />} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}
