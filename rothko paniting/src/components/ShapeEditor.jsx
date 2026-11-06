function Slider({ label, value, min, max, unit = '%', onChange }) {
  return (
    <label className="slider-control">
      <span>{label}<output>{value}{unit}</output></span>
      <input type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

export default function ShapeEditor({ painting, selectedShape, onSelect, onUpdate, onAdd, onRemove, onMove, onSpacingChange, onBorderChange }) {
  return (
    <section className="panel-section shape-editor">
      <div className="panel-section-title"><span>02</span><h3>Composition</h3><button className="text-action ms-auto" type="button" onClick={onAdd}><i className="bi bi-plus-lg" /> Add field</button></div>
      <div className="field-list">
        {painting.shapes.map((shape, index) => (
          <div className={`field-row ${shape.id === selectedShape?.id ? 'field-row-active' : ''}`} key={shape.id}>
            <button className="field-select" type="button" onClick={() => onSelect(shape.id)}><span className="field-color-dot" style={{ background: shape.color }} /><span>{shape.name}</span></button>
            <button className="mini-icon" type="button" onClick={() => onMove(shape.id, 1)} disabled={index === painting.shapes.length - 1} title="Bring forward" aria-label={`Bring ${shape.name} forward`}><i className="bi bi-chevron-up" /></button>
            <button className="mini-icon" type="button" onClick={() => onMove(shape.id, -1)} disabled={index === 0} title="Send backward" aria-label={`Send ${shape.name} backward`}><i className="bi bi-chevron-down" /></button>
            <button className="mini-icon danger-icon" type="button" onClick={() => onRemove(shape.id)} disabled={painting.shapes.length <= 1} title="Remove field" aria-label={`Remove ${shape.name}`}><i className="bi bi-trash3" /></button>
          </div>
        ))}
      </div>
      {selectedShape && <div className="slider-grid">
        <Slider label="Width" value={selectedShape.width} min={15} max={Math.max(15, Math.min(90, 100 - selectedShape.x))} onChange={(width) => onUpdate(selectedShape.id, { width })} />
        <Slider label="Height" value={selectedShape.height} min={10} max={Math.max(10, Math.min(55, 100 - selectedShape.y))} onChange={(height) => onUpdate(selectedShape.id, { height })} />
        <Slider label="Horizontal position" value={selectedShape.x} min={0} max={Math.max(0, 100 - selectedShape.width)} onChange={(x) => onUpdate(selectedShape.id, { x })} />
        <Slider label="Vertical position" value={selectedShape.y} min={0} max={Math.max(0, 100 - selectedShape.height)} onChange={(y) => onUpdate(selectedShape.id, { y })} />
        <Slider label="Softness" value={selectedShape.radius} min={0} max={18} onChange={(radius) => onUpdate(selectedShape.id, { radius })} />
        <Slider label="Opacity" value={Math.round(selectedShape.opacity * 100)} min={20} max={100} onChange={(opacity) => onUpdate(selectedShape.id, { opacity: opacity / 100 })} />
      </div>}
      <div className="composition-options">
        <label className="slider-control spacing-control"><span>Field spacing<output>{painting.spacing}%</output></span><input type="range" min="0" max="24" value={painting.spacing} onChange={(event) => onSpacingChange(Number(event.target.value))} /></label>
        <label className="switch-row"><span>Fine borders</span><input className="form-check-input" type="checkbox" checked={painting.border} onChange={(event) => onBorderChange(event.target.checked)} /></label>
      </div>
    </section>
  );
}
