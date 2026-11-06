import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Avatar from '../components/Avatar'

function Info({ label, value, icon }) {
  return <div className="info-item"><span className="info-icon"><i className={`bi ${icon}`} /></span><div><span className="info-label">{label}</span><strong>{value || 'Not added yet'}</strong></div></div>
}

export default function Dashboard() {
  const { currentUser, users } = useAuth()
  const joined = new Date(currentUser.createdAt)
  const status = currentUser.status || 'active'
  return <main className="dashboard-page"><div className="container">
    <div className="dashboard-welcome"><div><span className="eyebrow">YOUR NOOK</span><h1>Good to have you here, <span>{currentUser.firstName}.</span></h1><p>Your details, all in one place. Make yourself at home.</p></div><Link className="btn btn-primary-nook" to="/profile"><i className="bi bi-pencil me-2" />Edit profile</Link></div>
    <div className="row g-4 mb-4"><div className="col-md-4"><div className="metric-card"><span className="metric-icon peach"><i className="bi bi-person-vcard" /></span><span className="metric-label">ACCOUNT STATUS</span><strong className="metric-value"><span className="status-dot" />{status === 'active' ? 'Active' : 'Suspended'}</strong><span className="metric-foot">You’re all set</span></div></div>
      <div className="col-md-4"><div className="metric-card"><span className="metric-icon blue"><i className="bi bi-calendar-heart" /></span><span className="metric-label">WITH NOOK SINCE</span><strong className="metric-value">{joined.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</strong><span className="metric-foot">Glad you joined us</span></div></div>
      <div className="col-md-4"><div className="metric-card"><span className="metric-icon green"><i className="bi bi-people" /></span><span className="metric-label">YOUR COMMUNITY</span><strong className="metric-value">{Math.max(0, users.length - 1)} members</strong><span className="metric-foot">Growing together</span></div></div></div>
    <div className="row g-4"><div className="col-lg-4"><section className="profile-summary-card">
      <div className="summary-cover"><span className="summary-sparkle">✳</span></div>
      <div className="summary-body"><Avatar user={currentUser} size="xl" className="summary-avatar" /><h2>{currentUser.firstName} {currentUser.lastName}</h2><p>@{currentUser.username}</p><a className="summary-email" href={`mailto:${currentUser.email}`}>{currentUser.email}</a>
        <div className="summary-divider" /><div className="summary-fact"><i className="bi bi-geo-alt" /><span>{[currentUser.region, currentUser.country].filter(Boolean).join(', ') || 'Add your location'}</span></div>
        <div className="summary-fact"><i className="bi bi-calendar3" /><span>Member since {joined.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span></div>
        <Link to="/profile" className="btn btn-soft w-100 mt-3">View full profile <i className="bi bi-arrow-up-right ms-1" /></Link>
      </div>
    </section></div>
      <div className="col-lg-8"><section className="content-card">
        <div className="card-heading"><div><span className="eyebrow">AT A GLANCE</span><h2>Your information</h2></div><Link to="/profile" className="text-link">Edit details <i className="bi bi-arrow-up-right" /></Link></div>
        <div className="row g-4 mt-1">
          <div className="col-sm-6"><Info label="Full name" value={`${currentUser.firstName} ${currentUser.lastName}`} icon="bi-person" /></div>
          <div className="col-sm-6"><Info label="Email address" value={currentUser.email} icon="bi-envelope" /></div>
          <div className="col-sm-6"><Info label="Phone number" value={currentUser.phone} icon="bi-telephone" /></div>
          <div className="col-sm-6"><Info label="Date of birth" value={currentUser.dateOfBirth ? new Date(`${currentUser.dateOfBirth}T12:00:00`).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) : ''} icon="bi-cake2" /></div>
          <div className="col-sm-6"><Info label="Gender" value={currentUser.gender} icon="bi-person-heart" /></div>
          <div className="col-sm-6"><Info label="Address" value={[currentUser.address, currentUser.region, currentUser.country].filter(Boolean).join(', ')} icon="bi-geo" /></div>
        </div>
      </section>
      <section className="security-banner mt-4"><span className="security-icon"><i className="bi bi-shield-check" /></span><div><h3>Your account, your call.</h3><p>Keep your profile up to date and your password secure.</p></div><Link to="/profile#security" className="btn btn-outline-navy btn-sm ms-auto">Account settings <i className="bi bi-arrow-right ms-1" /></Link></section>
      </div></div>
    <div className="demo-disclaimer"><i className="bi bi-info-circle" /> Nook is a browser-only demo. Your account data is stored in this browser and is not suitable for real personal information.</div>
  </div></main>
}
