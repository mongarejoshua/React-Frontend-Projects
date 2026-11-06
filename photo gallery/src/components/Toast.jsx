export default function Toast({ message, onClose }) {
  if (!message) return null;
  return <div className="toast-message" role="status"><i className="bi bi-check-circle-fill" /><span>{message}</span><button onClick={onClose} aria-label="Dismiss notification"><i className="bi bi-x-lg" /></button></div>;
}
