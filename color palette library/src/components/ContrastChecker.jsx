import { useState } from 'react'
import { contrastRatio } from '../utils/contrastUtils.js'

const STANDARDS = [
  { label: 'AA · Normal text', threshold: 4.5 },
  { label: 'AA · Large text', threshold: 3 },
  { label: 'AAA · Normal text', threshold: 7 },
  { label: 'AAA · Large text', threshold: 4.5 },
]

function ContrastControl({ label, value, onChange }) {
  return <label className="contrast-control"><span>{label}</span><span className="contrast-color-input"><input type="color" value={value} onChange={(event) => onChange(event.target.value.toUpperCase())} aria-label={`${label} color`} /><code>{value}</code></span></label>
}

export default function ContrastChecker() {
  const [foreground, setForeground] = useState('#22223B')
  const [background, setBackground] = useState('#F4F1DE')
  const ratio = contrastRatio(foreground, background)
  return (
    <section className="section-block soft-section" id="accessibility">
      <div className="container">
        <div className="section-heading"><div><span className="section-kicker">DESIGN FOR EVERYONE</span><h2>Check your contrast<span className="heading-period">.</span></h2><p>A quick WCAG check to make sure your colors stay easy to read.</p></div></div>
        <div className="contrast-panel">
          <div className="contrast-controls">
            <ContrastControl label="Text color" value={foreground} onChange={setForeground} />
            <ContrastControl label="Background color" value={background} onChange={setBackground} />
            <div className="contrast-score"><span>CONTRAST RATIO</span><strong>{ratio?.toFixed(2)}<small>:1</small></strong></div>
          </div>
          <div className="contrast-preview" style={{ color: foreground, backgroundColor: background }}><span className="preview-label">A LITTLE PREVIEW</span><strong>Readable is beautiful.</strong><p>Good contrast helps everyone enjoy what you make.</p></div>
          <div className="wcag-results">{STANDARDS.map((standard) => {
            const passes = ratio >= standard.threshold
            return <div key={standard.label} className="wcag-result"><i className={`bi ${passes ? 'bi-check-circle-fill pass-icon' : 'bi-x-circle-fill fail-icon'}`} /><span>{standard.label}</span><strong>{passes ? 'Pass' : 'Fail'}</strong></div>
          })}</div>
        </div>
      </div>
    </section>
  )
}
