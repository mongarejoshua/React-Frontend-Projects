import { useState } from 'react';
import { hexToRgb, normalizeHex, randomHex } from '../utils/colorUtils.js';

function ColorInput({ label, color, onChange, onRandom, onReset, resetColor }) {
  const [draft, setDraft] = useState(color);
  const [editing, setEditing] = useState(false);
  const rgb = hexToRgb(color);

  function updateDraft(value) {
    setDraft(value);
    const normalized = normalizeHex(value);
    if (normalized) onChange(normalized);
  }

  return (
    <div className="color-control">
      <div className="color-control-heading"><span>{label}</span><span className="rgb-value">{rgb ? `RGB ${rgb.r} · ${rgb.g} · ${rgb.b}` : ''}</span></div>
      <div className="color-input-row">
        <label className="color-swatch" style={{ backgroundColor: color }} title={`Pick ${label} color`}>
          <input type="color" value={color} aria-label={`${label} color picker`} onChange={(event) => onChange(event.target.value)} />
        </label>
        <div className={`hex-input-wrap ${editing ? 'hex-editing' : ''}`}>
          <span>#</span><input aria-label={`${label} HEX color`} value={editing ? draft.replace(/^#/, '') : color.replace(/^#/, '')} maxLength={6} onFocus={() => { setEditing(true); setDraft(color); }} onBlur={() => { setEditing(false); setDraft(color); }} onChange={(event) => updateDraft(`#${event.target.value}`)} />
        </div>
        <button type="button" className="icon-button" title="Random color" aria-label={`Randomize ${label}`} onClick={() => onChange(randomHex())}><i className="bi bi-shuffle" /></button>
        <button type="button" className="icon-button" title="Reset color" aria-label={`Reset ${label}`} onClick={onReset}><i className="bi bi-arrow-counterclockwise" /></button>
      </div>
    </div>
  );
}

export default function ColorControls({ painting, selectedShape, initial, onBackgroundChange, onShapeColorChange }) {
  return (
    <section className="panel-section">
      <div className="panel-section-title"><span>01</span><h3>Colour palette</h3></div>
      <ColorInput label="Canvas" color={painting.background} onChange={onBackgroundChange} onReset={() => onBackgroundChange(initial.background)} />
      {selectedShape && <ColorInput label={selectedShape.name} color={selectedShape.color} onChange={(color) => onShapeColorChange(selectedShape.id, { color })} onReset={() => onShapeColorChange(selectedShape.id, { color: selectedShape.baseColor || initial.shapes.find((shape) => shape.id === selectedShape.id)?.color || '#a94e3d' })} />}
      <p className="panel-hint">Pick a field on the canvas to edit its colour.</p>
    </section>
  );
}
