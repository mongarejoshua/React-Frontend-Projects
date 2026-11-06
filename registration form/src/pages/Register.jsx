import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { validateRegistration } from '../utils/validation'
import PasswordField from '../components/PasswordField'

const blank = { firstName: '', lastName: '', username: '', email: '', phone: '', gender: '', dateOfBirth: '', country: '', region: '', address: '', password: '', confirmPassword: '', profilePicture: '', terms: false }
const inputFields = [
  ['firstName', 'First name', 'text'], ['lastName', 'Last name', 'text'],
  ['username', 'Username', 'text'], ['email', 'Email address', 'email'],
  ['phone', 'Phone number', 'tel'], ['dateOfBirth', 'Date of birth', 'date'],
  ['country', 'Country', 'text'], ['region', 'County / State', 'text'],
]

function PictureUpload({ value, onChange }) {
  const [message, setMessage] = useState('')
  async function handleFile(event) {
    const file = event.target.files?.[0]
    if (!file) return
    const input = event.currentTarget
    input.value = ''
    if (!file.type.startsWith('image/')) { setMessage('Choose an image file.'); return }
    if (file.size > 2 * 1024 * 1024) { setMessage('Choose an image smaller than 2 MB.'); return }
    const picture = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = () => reject(new Error('The image could not be read.'))
      reader.readAsDataURL(file)
    }).catch((error) => { setMessage(error.message); return '' })
    if (picture) { onChange(picture); setMessage('') }
  }
  return <div className="mb-3">
    <label className="form-label" htmlFor="profilePicture">Profile picture <span className="optional-label">Optional</span></label>
    <div className="upload-field">
      {value ? <img src={value} alt="Profile preview" className="upload-preview" /> : <span className="upload-icon"><i className="bi bi-camera" /></span>}
      <div className="flex-grow-1"><label className="upload-label" htmlFor="profilePicture">Choose an image</label><p className="upload-hint mb-0">JPG, PNG or GIF · up to 2 MB</p></div>
      {value && <button className="btn btn-sm btn-soft" type="button" onClick={() => onChange('')}>Remove</button>}
      <input id="profilePicture" className="visually-hidden" type="file" accept="image/*" onChange={handleFile} />
    </div>
    {message && <div className="text-danger small mt-1">{message}</div>}
  </div>
}

export default function Register() {
  const [values, setValues] = useState(blank)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()
  function change(event) {
    const { name, value, checked, type } = event.target
    setValues((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }
  async function submit(event) {
    event.preventDefault()
    const validation = validateRegistration(values)
    setErrors(validation)
    if (Object.keys(validation).length) return
    setSubmitting(true)
    setFormError('')
    try {
      await register(values)
      window.dispatchEvent(new CustomEvent('nook:notice', { detail: { type: 'success', message: 'Your Nook account is ready. Welcome in!' } }))
      navigate('/dashboard')
    } catch (error) {
      setFormError(error.message)
    } finally { setSubmitting(false) }
  }
  return <main className="auth-page">
    <div className="container">
      <div className="auth-shell register-shell">
        <div className="auth-aside register-aside">
          <span className="auth-aside-mark"><i className="bi bi-flower1" /></span>
          <span className="eyebrow">A warm welcome</span>
          <h1>Make yourself<br />at <span>home.</span></h1>
          <p>One small step to a more personal, more thoughtful space.</p>
          <div className="aside-note"><i className="bi bi-lock" /> Your details stay in your browser in this demo.</div>
          <div className="aside-decoration">✳</div>
        </div>
        <div className="auth-content">
          <div className="auth-heading"><span className="eyebrow">GET STARTED</span><h2>Create your account</h2><p>We’re glad you’re here. It all starts with the basics.</p></div>
          {formError && <div className="alert alert-danger py-2">{formError}</div>}
          <form onSubmit={submit} noValidate>
            <div className="row gx-3">{inputFields.map(([name, label, type]) => <div className="col-sm-6" key={name}>
              <div className="mb-3"><label className="form-label" htmlFor={name}>{label}<span className="required-mark"> *</span></label><input id={name} name={name} type={type} className={`form-control ${errors[name] ? 'is-invalid' : ''}`} value={values[name]} onChange={change} autoComplete={name === 'firstName' ? 'given-name' : name === 'lastName' ? 'family-name' : name === 'email' ? 'email' : name === 'phone' ? 'tel' : 'off'} required />{errors[name] && <div className="invalid-feedback">{errors[name]}</div>}</div>
            </div>)}</div>
            <div className="mb-3"><label className="form-label" htmlFor="gender">Gender<span className="required-mark"> *</span></label><select id="gender" name="gender" className={`form-select ${errors.gender ? 'is-invalid' : ''}`} value={values.gender} onChange={change} required><option value="">Select an option</option><option>Female</option><option>Male</option><option>Other</option></select>{errors.gender && <div className="invalid-feedback">{errors.gender}</div>}</div>
            <div className="mb-3"><label className="form-label" htmlFor="address">Physical address<span className="required-mark"> *</span></label><textarea id="address" name="address" rows="2" className={`form-control ${errors.address ? 'is-invalid' : ''}`} value={values.address} onChange={change} placeholder="Street address, city" required />{errors.address && <div className="invalid-feedback">{errors.address}</div>}</div>
            <PictureUpload value={values.profilePicture} onChange={(picture) => setValues((current) => ({ ...current, profilePicture: picture }))} />
            <div className="row gx-3">
              <div className="col-sm-6"><PasswordField label="Password" value={values.password} onChange={change} error={errors.password} /></div>
              <div className="col-sm-6"><PasswordField label="Confirm password" name="confirmPassword" value={values.confirmPassword} onChange={change} error={errors.confirmPassword} /></div>
            </div>
            <div className="password-hint mb-3"><i className="bi bi-info-circle" /> 8+ characters with uppercase, lowercase, a number, and a symbol.</div>
            <div className="form-check mb-3"><input id="terms" name="terms" className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`} type="checkbox" checked={values.terms} onChange={change} /><label className="form-check-label" htmlFor="terms">I agree to the <a href="#terms-note" data-bs-toggle="modal" data-bs-target="#termsModal">Terms &amp; Conditions</a></label>{errors.terms && <div className="invalid-feedback d-block">{errors.terms}</div>}</div>
            <div className="modal fade" id="termsModal" tabIndex="-1" aria-labelledby="termsTitle" aria-hidden="true"><div className="modal-dialog modal-dialog-centered"><div className="modal-content"><div className="modal-header"><h5 className="modal-title" id="termsTitle">A note about this demo</h5><button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" /></div><div className="modal-body">Nook is a browser-only demonstration. Account information is saved in this browser’s local storage; do not use real or sensitive information. This app is not a production authentication service.</div><div className="modal-footer"><button type="button" className="btn btn-primary-nook" data-bs-dismiss="modal">Got it</button></div></div></div></div>
            <div className="d-flex flex-column flex-sm-row gap-2 mt-2">
              <button type="button" className="btn btn-soft flex-grow-1" onClick={() => { setValues(blank); setErrors({}); setFormError('') }} disabled={submitting}>Reset form</button>
              <button type="submit" className="btn btn-primary-nook flex-grow-1" disabled={submitting}>{submitting ? <><span className="spinner-border spinner-border-sm me-2" />Creating your account…</> : <>Create account <i className="bi bi-arrow-right ms-2" /></>}</button>
            </div>
            <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
          </form>
        </div>
      </div>
    </div>
  </main>
}
