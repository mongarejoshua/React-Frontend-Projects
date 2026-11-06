import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { validatePassword } from '../utils/validation'
import PasswordField from '../components/PasswordField'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)
  const { resetPassword } = useAuth()
  const navigate = useNavigate()
  async function submit(event) {
    event.preventDefault(); setError('')
    if (!validatePassword(password)) { setError('Use 8+ characters with uppercase, lowercase, a number, and a symbol.'); return }
    if (password !== confirm) { setError('Passwords do not match.'); return }
    setBusy(true)
    try { await resetPassword(email, password); setDone(true) }
    catch (issue) { setError(issue.message) }
    finally { setBusy(false) }
  }
  return <main className="auth-page"><div className="container"><div className="compact-auth">
    <span className="compact-icon"><i className={`bi ${done ? 'bi-check2' : 'bi-key'}`} /></span>
    <span className="eyebrow">{done ? 'ALL SET' : 'ACCOUNT RECOVERY'}</span>
    <h1>{done ? 'Password updated.' : 'Let’s get you back in.'}</h1>
    <p>{done ? 'Your new password is ready to use.' : 'Enter your email and choose a new password. In this local demo, no email is sent.'}</p>
    {error && <div className="alert alert-danger py-2">{error}</div>}
    {done ? <button className="btn btn-primary-nook btn-lg w-100" onClick={() => navigate('/login')}>Back to log in <i className="bi bi-arrow-right ms-2" /></button> : <form onSubmit={submit}>
      <div className="mb-3"><label className="form-label" htmlFor="reset-email">Email address</label><input id="reset-email" className="form-control" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
      <PasswordField label="New password" id="new-password" value={password} onChange={(event) => setPassword(event.target.value)} />
      <PasswordField label="Confirm new password" id="confirm-new-password" value={confirm} onChange={(event) => setConfirm(event.target.value)} />
      <button className="btn btn-primary-nook btn-lg w-100 mt-2" type="submit" disabled={busy}>{busy ? 'Updating…' : 'Update password'}</button>
    </form>}
    <p className="auth-switch"><Link to="/login"><i className="bi bi-arrow-left me-1" /> Back to log in</Link></p>
  </div></div></main>
}
