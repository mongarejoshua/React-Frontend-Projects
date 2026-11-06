import { Link, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useSurveys } from './context/SurveyContext'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import SurveyBuilder from './pages/SurveyBuilder'
import TakeSurvey from './pages/TakeSurvey'
import Analytics from './pages/Analytics'
import Responses from './pages/Responses'
import Settings from './pages/Settings'

function WorkspaceLayout() {
  const { notice, setNotice } = useSurveys()
  const location = useLocation()
  useEffect(() => { setNotice('') }, [location.pathname, setNotice])
  return <div className="app-shell"><Sidebar /><div className="workspace-main"><Topbar />{notice && <div className="toast-notice" role="status"><i className="bi bi-check-circle-fill" /><span>{notice}</span><button aria-label="Dismiss notification" onClick={() => setNotice('')}><i className="bi bi-x" /></button></div>}<Outlet /></div></div>
}

function NotFound() {
  return <div className="page-content"><div className="public-not-found"><i className="bi bi-compass" /><h1>Looks like you took a wrong turn.</h1><p>That page doesn’t exist, but your next great idea does.</p><Link className="btn btn-primary-custom" to="/">Back home</Link></div></div>
}

export default function App() {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route element={<WorkspaceLayout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/surveys" element={<Dashboard surveysPage />} />
      <Route path="/builder/:id" element={<SurveyBuilder />} />
      <Route path="/preview/:id" element={<TakeSurvey preview />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/responses" element={<Responses />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Route>
    <Route path="/take/:id" element={<TakeSurvey />} />
  </Routes>
}
