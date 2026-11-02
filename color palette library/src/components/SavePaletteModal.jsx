import { useEffect, useState } from 'react'

export default function SavePaletteModal({ open, defaultName, onClose, onSave }) {
  const [name, setName] = useState(defaultName)

  useEffect(() => {
    if (open) setName(defaultName)
  }, [defaultName, open])

  useEffect(() => {
    if (!open) return undefined
    function handleEscape(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  if (!open) return null

  function handleSubmit(event) {
    event.preventDefault()
    const cleanName = name.trim()
    if (cleanName) onSave(cleanName)
  }

  return (
    <div className="dialog-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <form className="save-dialog" role="dialog" aria-modal="true" aria-labelledby="save-dialog-title" onSubmit={handleSubmit}>
        <button className="dialog-close" type="button" onClick={onClose} aria-label="Close dialog"><i className="bi bi-x-lg" /></button>
        <span className="dialog-icon"><i className="bi bi-bookmark-heart" /></span>
        <span className="section-kicker">KEEP THIS COLOR STORY</span>
        <h2 id="save-dialog-title">Give it a name<span className="heading-period">.</span></h2>
        <p>Your palette will be waiting for you in My Palettes.</p>
        <label className="field-label" htmlFor="palette-name">PALETTE NAME</label>
        <input id="palette-name" className="dialog-name-input" value={name} onChange={(event) => setName(event.target.value)} maxLength={48} autoFocus required />
        <div className="dialog-actions">
          <button type="button" className="btn btn-outline-custom" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary-custom" disabled={!name.trim()}><i className="bi bi-bookmark-plus me-2" /> Save palette</button>
        </div>
      </form>
    </div>
  )
}
