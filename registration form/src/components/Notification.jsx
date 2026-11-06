import { useEffect, useState } from 'react'

export default function Notification() {
  const [notice, setNotice] = useState(null)
  useEffect(() => {
    const show = (event) => {
      setNotice({ ...event.detail, id: Date.now() })
    }
    window.addEventListener('nook:notice', show)
    return () => window.removeEventListener('nook:notice', show)
  }, [])
  useEffect(() => {
    if (!notice) return undefined
    const timer = window.setTimeout(() => setNotice(null), 4200)
    return () => window.clearTimeout(timer)
  }, [notice])
  if (!notice) return null
  const success = notice.type === 'success'
  return (
    <div className={`toast-card ${success ? 'toast-success' : 'toast-error'}`} role="status">
      <i className={`bi ${success ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill'}`} />
      <span>{notice.message}</span>
      <button className="btn-close ms-auto" aria-label="Dismiss notification" onClick={() => setNotice(null)} />
    </div>
  )
}
