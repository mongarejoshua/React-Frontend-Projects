export default function PresetGallery({ presets, activePreset, onSelect }) {
  return (
    <section className="section-block presets-section" id="presets">
      <div className="section-heading">
        <div><p className="eyebrow">A place to begin</p><h2>Find your first feeling.</h2></div>
        <p>Each palette is a starting point, never a rule.<br />Choose one and make it your own.</p>
      </div>
      <div className="preset-grid">
        {presets.map((preset, index) => (
          <button type="button" className={`preset-card ${activePreset === preset.id ? 'preset-active' : ''}`} onClick={() => onSelect(preset)} key={preset.id}>
            <span className="preset-art" style={{ backgroundColor: preset.background }}>
              {preset.shapes.map((shape, shapeIndex) => <span key={shapeIndex} style={{ backgroundColor: shape.color, left: `${shape.x}%`, top: `${shape.y}%`, width: `${shape.width}%`, height: `${shape.height}%`, opacity: shape.opacity }} />)}
            </span>
            <span className="preset-info"><span><strong>{preset.name}</strong><small>{preset.note}</small></span><i className="bi bi-arrow-up-right" /></span>
            <span className="preset-number">0{index + 1}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
