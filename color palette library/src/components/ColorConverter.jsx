import { useState } from 'react'
import { getColorFormats, parseColorInput } from '../utils/colorUtils.js'

export default function ColorConverter({ onCopy }) {
  const [input, setInput] = useState('#6C63FF')
  const normalized = parseColorInput(input)
  const formats = normalized ? getColorFormats(normalized) : null

  return (
    <section className="section-block soft-section" id="converter">
      <div className="container">
        <div className="section-heading"><div><span className="section-kicker">A LITTLE TRANSLATION</span><h2>Color, in any language<span className="heading-period">.</span></h2><p>Paste a HEX, RGB, or HSL value. We’ll take it from here.</p></div></div>
        <div className="converter-panel">
          <div className="converter-input-side">
            <label className="field-label" htmlFor="color-converter">YOUR COLOR</label>
            <div className={`converter-input-wrap ${input && !formats ? 'input-invalid' : ''}`}>
              <span className="converter-color-dot" style={{ backgroundColor: normalized || 'transparent' }} />
              <input id="color-converter" value={input} onChange={(event) => setInput(event.target.value)} placeholder="#6C63FF, rgb(...), hsl(...)" aria-describedby="converter-help" />
              <label className="mini-color-picker" title="Pick a color"><i className="bi bi-eyedropper" /><input type="color" value={normalized || '#6C63FF'} onChange={(event) => setInput(event.target.value.toUpperCase())} aria-label="Choose converter color" /></label>
            </div>
            <span className="field-hint" id="converter-help">{input && !formats ? 'That color format doesn’t look right yet.' : 'Try #6C63FF, rgb(108, 99, 255), or hsl(243, 100%, 69%)'}</span>
          </div>
          <div className="format-results">
            {['hex', 'rgb', 'hsl'].map((format) => (
              <button className="format-result" key={format} onClick={() => formats && onCopy(formats[format])} disabled={!formats}>
                <span className="format-result-label">{format}</span><strong>{formats ? formats[format] : '—'}</strong><i className="bi bi-copy" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
