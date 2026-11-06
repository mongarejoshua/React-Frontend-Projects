import { Link, useLocation } from 'react-router-dom'
import { useSurveys } from '../context/SurveyContext'

const titles = { '/dashboard': 'Overview', '/surveys': 'My surveys', '/analytics': 'Analytics', '/responses': 'Responses', '/settings': 'Settings' }

export default function Topbar() {
  const { pathname } = useLocation()
  const { settings, setSettings, setNotice } = useSurveys()
  return <header className="topbar"><div className="mobile-brand"><span className="brand-mark"><i className="bi bi-command" /></span>formly<span className="brand-period">.</span></div><div className="breadcrumbs"><span>Workspace</span><i className="bi bi-chevron-right" />{titles[pathname] || 'Workspace'}</div><div className="topbar-actions"><button className="icon-button theme-toggle" aria-label="Toggle color theme" onClick={() => setSettings({ ...settings, theme: settings.theme === 'dark' ? 'light' : 'dark' })}><i className={`bi ${settings.theme === 'dark' ? 'bi-sun' : 'bi-moon'}`} /></button><button className="icon-button notification-button" aria-label="Notifications" onClick={() => setNotice('You’re all caught up — no new notifications.')}><i className="bi bi-bell" /><span /></button><Link to="/settings" className="avatar top-avatar" aria-label="Account settings">JD</Link></div></header>
}
