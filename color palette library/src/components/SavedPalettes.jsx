import PaletteCard from './PaletteCard.jsx'

export default function SavedPalettes({ palettes, onSave, onLoad, onDelete, onCopy }) {
  return (
    <section className="section-block soft-section" id="saved">
      <div className="container">
        <div className="section-heading saved-heading"><div><span className="section-kicker">KEEP THE GOOD ONES</span><h2>Your little library<span className="heading-period">.</span></h2><p>The color combinations you’ve saved for later.</p></div><button className="btn btn-outline-custom" onClick={onSave}><i className="bi bi-plus-lg me-2" /> Save current palette</button></div>
        {palettes.length ? <div className="palette-grid">{palettes.map((palette) => <PaletteCard key={palette.id} palette={palette} onLoad={onLoad} onDelete={onDelete} onCopy={onCopy} showDelete />)}</div> : <div className="empty-library"><span className="empty-icon"><i className="bi bi-bookmark-heart" /></span><div><strong>A fresh page</strong><p>When you find a palette you love, save it here for later.</p></div><button className="text-link-button" onClick={onSave}>Save this palette <i className="bi bi-arrow-right ms-1" /></button></div>}
      </div>
    </section>
  )
}
