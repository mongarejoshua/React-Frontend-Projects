import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PasswordField from '../components/PasswordField'

export default function Login() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  async function submit(event) {
    event.preventDefault()
    setBusy(true); setError('')
    try {
      const user = await login(identifier, password, remember)
      window.dispatchEvent(new CustomEvent('nook:notice', { detail: { type: 'success', message: `Welcome back, ${user.firstName}.` } }))
      navigate(location.state?.from || (user.role === 'admin' ? '/admin' : '/dashboard'), { replace: true })
    } catch (issue) { setError(issue.message) }
    finally { setBusy(false) }
  }
  return <main className="auth-page login-page"><div className="container"><div className="auth-shell login-shell">
    <div className="auth-aside login-aside"><span className="auth-aside-mark"><i className="bi bi-flower1" /></span><span className="eyebrow">GOOD TO SEE YOU</span><h1>Your corner<br />is waiting.</h1><p>Pick up right where you left off. This is your space.</p><div className="login-quote"><i className="bi bi-quote" /><span>Small things feel better when everything has a place.</span></div><div className="aside-decoration">✳</div></div>
    <div className="auth-content login-content"><div className="auth-heading"><span className="eyebrow">WELCOME BACK</span><h2>Log in to Nook</h2><p>We’ve saved you a spot.</p></div>
      {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}
      <form onSubmit={submit}>
        <div className="mb-3"><label className="form-label" htmlFor="identifier">Email or username</label><input id="identifier" className="form-control" value={identifier} onChange={(event) => setIdentifier(event.target.value)} autoComplete="username" required /></div>
        <PasswordField label="Password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" />
        <div className="d-flex align-items-center justify-content-between mb-4"><div className="form-check"><input className="form-check-input" id="remember" type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /><label className="form-check-label" htmlFor="remember">Remember me</label></div><Link className="small-link" to="/forgot-password">Forgot password?</Link></div>
        <button className="btn btn-primary-nook btn-lg w-100" type="submit" disabled={busy}>{busy ? <><span className="spinner-border spinner-border-sm me-2" />Logging in…</> : <>Log in <i className="bi bi-arrow-right ms-2" /></>}</button>
      </form>
      <p className="auth-switch">New to Nook? <Link to="/register">Create an account</Link></p>
      <div className="demo-hint"><i className="bi bi-info-circle" /><span>Admin demo: <strong>admin@nook.demo</strong> / <strong>NookAdmin2026!</strong></span></div>
    </div>
  </div></div></main>
}
