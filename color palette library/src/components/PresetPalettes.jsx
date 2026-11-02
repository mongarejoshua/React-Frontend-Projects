import { useState } from 'react'
import PaletteCard from './PaletteCard.jsx'
import { PALETTE_CATEGORIES, PRESET_PALETTES } from '../data/palettes.js'

export default function PresetPalettes({ onLoad, onCopy }) {
  const [category, setCategory] = useState('All')
  const visiblePalettes = category === 'All' ? PRESET_PALETTES : PRESET_PALETTES.filter((palette) => palette.category === category)
  return (
    <section className="section-block" id="presets">
      <div className="container">
        <div className="section-heading"><div><span className="section-kicker">A GOOD PLACE TO START</span><h2>Borrow a little inspiration<span className="heading-period">.</span></h2><p>Thoughtful color stories, ready to make your own.</p></div><a className="text-link preset-link" href="#generator">Make your own <i className="bi bi-arrow-up-right ms-1" /></a></div>
        <div className="category-tabs" role="group" aria-label="Filter color collections">{PALETTE_CATEGORIES.map((item) => <button key={item} className={category === item ? 'category-tab active' : 'category-tab'} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <div className="palette-grid preset-grid">{visiblePalettes.map((palette) => <PaletteCard key={palette.name} palette={palette} onLoad={onLoad} onCopy={onCopy} />)}</div>
      </div>
    </section>
  )
}
