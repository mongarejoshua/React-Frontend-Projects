export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null
  return (
    <div className={`toast-message ${type === 'error' ? 'toast-error' : ''}`} role="status">
      <i className={`bi ${type === 'error' ? 'bi-exclamation-circle-fill' : 'bi-check-circle-fill'}`} />
      <span>{message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Dismiss notification"><i className="bi bi-x" /></button>
    </div>
  )
}
