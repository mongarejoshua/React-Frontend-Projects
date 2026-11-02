import { getColorFormats } from '../utils/colorUtils.js'

export default function ColorCard({ color, index, onChange, onToggleLock, onCopy }) {
  const formats = getColorFormats(color.hex)
  return (
    <article className="color-card">
      <div className="color-swatch" style={{ backgroundColor: color.hex }}>
        <span className="swatch-index">0{index + 1}</span>
        <button className={`lock-button ${color.locked ? 'is-locked' : ''}`} onClick={() => onToggleLock(index)} aria-label={`${color.locked ? 'Unlock' : 'Lock'} color ${index + 1}`} title={color.locked ? 'Unlock color' : 'Lock color'}>
          <i className={`bi bi-${color.locked ? 'lock-fill' : 'unlock'}`} />
        </button>
        <label className="color-picker-trigger" title="Choose a color">
          <i className="bi bi-eyedropper" /><input type="color" value={color.hex} onChange={(event) => onChange(index, event.target.value.toUpperCase())} aria-label={`Choose color ${index + 1}`} />
        </label>
      </div>
      <div className="color-card-body">
        <button className="color-hex" onClick={() => onCopy(formats.hex)} title="Copy HEX">{formats.hex}<i className="bi bi-copy" /></button>
        <button className="color-format" onClick={() => onCopy(formats.rgb)}>{formats.rgb}</button>
        <button className="color-format" onClick={() => onCopy(formats.hsl)}>{formats.hsl}</button>
      </div>
    </article>
  )
}
