import { useState } from 'react'
import { createHarmony, HARMONY_TYPES } from '../utils/harmonyUtils.js'

export default function ColorHarmony({ onLoadPalette, onCopy }) {
  const [base, setBase] = useState('#6558E8')
  const [type, setType] = useState('Complementary')
  const colors = createHarmony(base, type)
  const palette = colors.length >= 5 ? colors.slice(0, 5) : [...colors, ...colors].slice(0, 5)

  return (
    <section className="section-block" id="harmony">
      <div className="container">
        <div className="section-heading"><div><span className="section-kicker">COLOR THEORY, MADE FRIENDLY</span><h2>Make a little harmony<span className="heading-period">.</span></h2><p>Pick a starting color and let the color wheel do its thing.</p></div></div>
        <div className="harmony-panel">
          <div className="harmony-controls">
            <div><label className="field-label" htmlFor="harmony-type">HARMONY</label><select id="harmony-type" className="form-select custom-select" value={type} onChange={(event) => setType(event.target.value)}>{HARMONY_TYPES.map((name) => <option key={name}>{name}</option>)}</select></div>
            <div><label className="field-label" htmlFor="harmony-base">STARTING COLOR</label><div className="base-color-control"><input id="harmony-base" type="color" value={base} onChange={(event) => setBase(event.target.value.toUpperCase())} aria-label="Choose harmony base color" /><span>{base}</span><i className="bi bi-chevron-down" /></div></div>
            <button className="btn btn-outline-custom" onClick={() => onLoadPalette(palette)}><i className="bi bi-arrow-down-square me-2" /> Use this palette</button>
          </div>
          <div className="harmony-swatches">{colors.map((color, index) => <button key={`${color}-${index}`} className="harmony-swatch" style={{ backgroundColor: color }} onClick={() => onCopy(color)} title={`Copy ${color}`} aria-label={`Copy ${color}`}><span>{color}</span><i className="bi bi-copy" /></button>)}</div>
        </div>
      </div>
    </section>
  )
}
