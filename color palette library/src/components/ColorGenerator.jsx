import ColorCard from './ColorCard.jsx'

export default function ColorGenerator({ colors, onGenerate, onChange, onToggleLock, onCopy }) {
  return (
    <section className="section-block" id="generator">
      <div className="container">
        <div className="section-heading generator-heading">
          <div><span className="section-kicker">THE PLAYGROUND</span><h2>Your color studio<span className="heading-period">.</span></h2><p>Hit generate to find a fresh combination. Lock the colors you love.</p></div>
          <button className="btn btn-primary-custom generate-button" onClick={onGenerate}><i className="bi bi-shuffle me-2" /> Generate palette <kbd>SPACE</kbd></button>
        </div>
        <div className="color-grid">
          {colors.map((color, index) => <ColorCard key={index} color={color} index={index} onChange={onChange} onToggleLock={onToggleLock} onCopy={onCopy} />)}
        </div>
        <div className="generator-footer"><span><i className="bi bi-info-circle me-2" />Click any color code to copy it</span><span>{colors.filter((color) => color.locked).length ? <><i className="bi bi-lock-fill me-1" /> {colors.filter((color) => color.locked).length} color{colors.filter((color) => color.locked).length === 1 ? '' : 's'} locked</> : 'Ready when you are'}</span></div>
      </div>
    </section>
  )
}
