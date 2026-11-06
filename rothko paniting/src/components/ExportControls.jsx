import { useState } from 'react';
import { exportPainting } from '../utils/exportUtils.js';

export default function ExportControls({ painting, onReset, onSave, title, onTitleChange }) {
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState('');

  async function download(format, scale) {
    setError('');
    setExporting(true);
    try {
      await exportPainting(painting, format, scale);
    } catch (exportError) {
      setError(exportError.message || 'The painting could not be exported.');
    } finally {
      setExporting(false);
    }
  }

  async function copyPalette() {
    const palette = [painting.background, ...painting.shapes.map((shape) => shape.color)].join(', ');
    try {
      await navigator.clipboard.writeText(palette);
      setError('Palette copied to clipboard.');
    } catch {
      setError('Clipboard access is unavailable in this browser.');
    }
  }

  return (
    <section className="panel-section export-section">
      <div className="panel-section-title"><span>03</span><h3>Keep & export</h3></div>
      <label className="save-title-label" htmlFor="painting-title">Name this study</label>
      <div className="save-row"><input id="painting-title" value={title} maxLength={60} onChange={(event) => onTitleChange(event.target.value)} placeholder="A name for this feeling" /><button className="save-button" type="button" onClick={onSave}><i className="bi bi-bookmark-plus" /> Save</button></div>
      <div className="export-row">
        <button type="button" className="export-button" onClick={() => download('png', 1)} disabled={exporting}><i className="bi bi-download" /> PNG</button>
        <button type="button" className="export-button" onClick={() => download('jpeg', 1)} disabled={exporting}><i className="bi bi-image" /> JPEG</button>
        <button type="button" className="export-button" onClick={() => download('png', 2)} disabled={exporting}><i className="bi bi-aspect-ratio" /> 2× PNG</button>
        <button type="button" className="export-button" onClick={copyPalette}><i className="bi bi-copy" /> Copy palette</button>
      </div>
      {error && <p className="inline-message" role="status">{error}</p>}
      <button type="button" className="reset-button" onClick={onReset}><i className="bi bi-arrow-counterclockwise" /> Reset to the beginning</button>
    </section>
  );
}
