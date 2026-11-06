import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { validatePassword } from '../utils/validation'
import Avatar from '../components/Avatar'
import PasswordField from '../components/PasswordField'

const profileFields = [['firstName', 'First name'], ['lastName', 'Last name'], ['username', 'Username'], ['email', 'Email address'], ['phone', 'Phone number'], ['dateOfBirth', 'Date of birth'], ['country', 'Country'], ['region', 'County / State']]
function toForm(user) { return Object.fromEntries(profileFields.map(([key]) => [key, user[key] || '']).concat([['gender', user.gender || ''], ['address', user.address || '']])) }

export default function Profile() {
  const { currentUser, updateProfile, changePassword } = useAuth()
  const [values, setValues] = useState(() => toForm(currentUser))
  const [picture, setPicture] = useState(currentUser.profilePicture || '')
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirm: '' })
  const [busy, setBusy] = useState(false)
  const [passwordBusy, setPasswordBusy] = useState(false)
  const [error, setError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [saved, setSaved] = useState(false)
  async function upload(event) {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/') || file.size > 2 * 1024 * 1024) { setError('Choose an image file smaller than 2 MB.'); return }
    const reader = new FileReader()
    reader.onload = () => setPicture(reader.result)
    reader.onerror = () => setError('The image could not be read.')
    reader.readAsDataURL(file)
  }
  async function saveProfile(event) {
    event.preventDefault(); setBusy(true); setError(''); setSaved(false)
    try {
      await updateProfile(currentUser.id, { ...values, profilePicture: picture })
      setSaved(true)
      window.dispatchEvent(new CustomEvent('nook:notice', { detail: { type: 'success', message: 'Your profile has been updated.' } }))
    } catch (issue) { setError(issue.message) }
    finally { setBusy(false) }
  }
  async function savePassword(event) {
    event.preventDefault(); setPasswordBusy(true); setPasswordError('')
    if (!validatePassword(passwords.newPassword)) { setPasswordError('Use 8+ characters with uppercase, lowercase, a number, and a symbol.'); setPasswordBusy(false); return }
    if (passwords.newPassword !== passwords.confirm) { setPasswordError('Passwords do not match.'); setPasswordBusy(false); return }
    try {
      await changePassword(currentUser.id, passwords.oldPassword, passwords.newPassword)
      setPasswords({ oldPassword: '', newPassword: '', confirm: '' })
      window.dispatchEvent(new CustomEvent('nook:notice', { detail: { type: 'success', message: 'Your password has been changed.' } }))
    } catch (issue) { setPasswordError(issue.message) }
    finally { setPasswordBusy(false) }
  }
  return <main className="dashboard-page"><div className="container">
    <div className="page-back"><Link to="/dashboard"><i className="bi bi-arrow-left" /> Back to dashboard</Link></div>
    <div className="dashboard-welcome profile-title"><div><span className="eyebrow">ACCOUNT SETTINGS</span><h1>Make it <span>yours.</span></h1><p>A few details help make your Nook feel like home.</p></div></div>
    <div className="profile-edit-grid"><aside className="profile-edit-aside"><div className="profile-edit-card"><Avatar user={{ ...currentUser, profilePicture: picture }} size="xl" /><h2>{currentUser.firstName} {currentUser.lastName}</h2><p>@{currentUser.username}</p><label htmlFor="avatarUpload" className="btn btn-soft btn-sm"><i className="bi bi-camera me-1" />Change photo</label><input id="avatarUpload" className="visually-hidden" type="file" accept="image/*" onChange={upload} /><small>JPG or PNG · max 2 MB</small></div>
      <nav className="profile-tabs"><a href="#personal"><i className="bi bi-person" /> Personal information</a><a href="#security"><i className="bi bi-shield-lock" /> Password &amp; security</a></nav>
    </aside>
    <div className="profile-edit-main">
      <section className="content-card" id="personal"><div className="card-heading"><div><span className="eyebrow">THE BASICS</span><h2>Personal information</h2></div></div>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        {saved && <div className="alert alert-success py-2">Your changes have been saved.</div>}
        <form onSubmit={saveProfile}><div className="row gx-3">{profileFields.map(([key, label]) => <div className="col-md-6" key={key}><div className="mb-3"><label className="form-label" htmlFor={key}>{label}<span className="required-mark"> *</span></label><input id={key} type={key === 'dateOfBirth' ? 'date' : key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'} className="form-control" value={values[key]} onChange={(event) => setValues({ ...values, [key]: event.target.value })} required /></div></div>)}
          <div className="col-md-6"><div className="mb-3"><label className="form-label" htmlFor="gender">Gender</label><select id="gender" className="form-select" value={values.gender} onChange={(event) => setValues({ ...values, gender: event.target.value })}><option value="">Select an option</option><option>Female</option><option>Male</option><option>Other</option></select></div></div>
          <div className="col-12"><div className="mb-3"><label className="form-label" htmlFor="address">Physical address</label><textarea id="address" className="form-control" rows="2" value={values.address} onChange={(event) => setValues({ ...values, address: event.target.value })} /></div></div></div>
          <button type="submit" className="btn btn-primary-nook" disabled={busy}>{busy ? 'Saving…' : 'Save changes'} <i className="bi bi-arrow-right ms-1" /></button>
        </form>
      </section>
      <section className="content-card mt-4" id="security"><div className="card-heading"><div><span className="eyebrow">KEEP IT SECURE</span><h2>Change password</h2></div></div>
        {passwordError && <div className="alert alert-danger py-2">{passwordError}</div>}
        <form onSubmit={savePassword}><PasswordField label="Current password" name="oldPassword" value={passwords.oldPassword} onChange={(event) => setPasswords({ ...passwords, oldPassword: event.target.value })} autoComplete="current-password" />
          <div className="row gx-3"><div className="col-md-6"><PasswordField label="New password" name="newPassword" value={passwords.newPassword} onChange={(event) => setPasswords({ ...passwords, newPassword: event.target.value })} /></div><div className="col-md-6"><PasswordField label="Confirm new password" name="confirm" value={passwords.confirm} onChange={(event) => setPasswords({ ...passwords, confirm: event.target.value })} /></div></div>
          <p className="password-hint"><i className="bi bi-info-circle" /> 8+ characters with uppercase, lowercase, a number, and a symbol.</p>
          <button type="submit" className="btn btn-outline-navy" disabled={passwordBusy}>{passwordBusy ? 'Updating…' : 'Update password'}</button>
        </form>
      </section>
    </div></div>
    <div className="demo-disclaimer"><i className="bi bi-info-circle" /> This is a local demo. Password changes are saved in this browser only.</div>
  </div></main>
}
