import { NavLink } from 'react-router-dom'

const links = [
  { to: '/dashboard', label: 'Overview', icon: 'bi-grid-1x2' },
  { to: '/surveys', label: 'My surveys', icon: 'bi-ui-checks-grid' },
  { to: '/analytics', label: 'Analytics', icon: 'bi-bar-chart-line' },
  { to: '/responses', label: 'Responses', icon: 'bi-inbox' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/" className="brand-lockup"><span className="brand-mark"><i className="bi bi-command" /></span><span>formly<span className="brand-period">.</span></span></NavLink>
      <div className="sidebar-label">WORKSPACE</div>
      <nav className="sidebar-nav">
        {links.map((link) => <NavLink key={link.to} to={link.to} aria-label={link.label} className={({ isActive }) => `side-link${isActive ? ' active' : ''}`}><i className={`bi ${link.icon}`} /><span>{link.label}</span></NavLink>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="sidebar-help"><div className="help-icon"><i className="bi bi-stars" /></div><strong>Need a hand?</strong><p>Our team is here to help you get more from your surveys.</p><a href="mailto:hello@formly.app">Get in touch <i className="bi bi-arrow-up-right" /></a></div>
        <NavLink to="/settings" className={({ isActive }) => `side-link${isActive ? ' active' : ''}`}><i className="bi bi-gear" /><span>Settings</span></NavLink>
        <div className="profile-row"><div className="avatar">JD</div><div className="profile-copy"><strong>Jordan Davis</strong><small>Workspace admin</small></div><i className="bi bi-three-dots" /></div>
      </div>
    </aside>
  )
}
