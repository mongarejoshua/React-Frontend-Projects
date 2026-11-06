import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const signOut = () => {
    logout()
    navigate('/')
  }
  return (
    <nav className="navbar navbar-expand-lg app-navbar">
      <div className="container">
        <Link className="navbar-brand brand" to="/">
          <span className="brand-mark"><i className="bi bi-flower1" /></span> nook
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavigation" aria-controls="mainNavigation" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNavigation">
          <div className="navbar-nav mx-auto gap-lg-3">
            <NavLink className="nav-link" to="/">Home</NavLink>
            {currentUser && <NavLink className="nav-link" to={currentUser.role === 'admin' ? '/admin' : '/dashboard'}>Dashboard</NavLink>}
            {currentUser?.role === 'admin' && <NavLink className="nav-link" to="/admin">Manage users</NavLink>}
          </div>
          <div className="d-flex align-items-center gap-2 py-3 py-lg-0">
            {currentUser ? <>
              <span className="nav-greeting d-none d-xl-inline">Hi, {currentUser.firstName}</span>
              <button className="btn btn-outline-navy btn-sm" onClick={signOut}>Log out</button>
            </> : <>
              <Link className="btn btn-link text-decoration-none login-link" to="/login">Log in</Link>
              <Link className="btn btn-primary-nook btn-sm" to="/register">Get started <i className="bi bi-arrow-up-right ms-1" /></Link>
            </>}
          </div>
        </div>
      </div>
    </nav>
  )
}
