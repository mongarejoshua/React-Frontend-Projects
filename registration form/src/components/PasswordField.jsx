import { useState } from 'react'

export default function PasswordField({ label = 'Password', name = 'password', value, onChange, error, autoComplete = 'new-password', placeholder = 'Enter your password', id, required = true }) {
  const [visible, setVisible] = useState(false)
  const fieldId = id || name
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={fieldId}>{label}{required && <span className="required-mark"> *</span>}</label>
      <div className="password-wrap">
        <input id={fieldId} name={name} type={visible ? 'text' : 'password'} className={`form-control ${error ? 'is-invalid' : ''}`} value={value} onChange={onChange} autoComplete={autoComplete} placeholder={placeholder} required={required} />
        <button type="button" className="password-toggle" aria-label={visible ? 'Hide password' : 'Show password'} onClick={() => setVisible((open) => !open)}>
          <i className={`bi ${visible ? 'bi-eye-slash' : 'bi-eye'}`} />
        </button>
      </div>
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  )
}
