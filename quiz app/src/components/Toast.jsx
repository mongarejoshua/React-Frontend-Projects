import React, { useEffect } from 'react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return undefined;
    const timeout = window.setTimeout(onClose, 2800);
    return () => window.clearTimeout(timeout);
  }, [message, onClose]);

  if (!message) return null;
  return (
    <div className="toast-message" role="status">
      <i className="bi bi-check-circle-fill" aria-hidden="true" />
      {message}
      <button className="toast-close" onClick={onClose} aria-label="Dismiss notification"><i className="bi bi-x" /></button>
    </div>
  );
}
