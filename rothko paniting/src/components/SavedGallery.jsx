import { getFieldTop } from '../utils/paintingUtils.js';

function PaintingCard({ painting, onOpen, onDelete }) {
  return (
    <article className="saved-card">
      <button type="button" className="saved-preview" onClick={onOpen} aria-label={`Open ${painting.title}`}>
        <span className="saved-art" style={{ backgroundColor: painting.background }}>
          {painting.shapes.map((shape, index) => <span key={shape.id || index} style={{ backgroundColor: shape.color, left: `${shape.x}%`, top: `${getFieldTop(painting, shape)}%`, width: `${shape.width}%`, height: `${shape.height}%`, opacity: shape.opacity, borderRadius: `${shape.radius}%` }} />)}
        </span>
      </button>
      <div className="saved-card-info"><div><strong>{painting.title}</strong><small>{painting.shapes.length} fields · {new Date(painting.savedAt).toLocaleDateString()}</small></div><button className="mini-icon danger-icon" type="button" onClick={onDelete} aria-label={`Delete ${painting.title}`} title="Delete painting"><i className="bi bi-trash3" /></button></div>
      <button type="button" className="open-painting-link" onClick={onOpen}>Open in studio <i className="bi bi-arrow-up-right" /></button>
    </article>
  );
}

export default function SavedGallery({ paintings, onOpen, onDelete }) {
  return (
    <section className="section-block saved-gallery-section" id="gallery">
      <div className="section-heading">
        <div><p className="eyebrow">Kept close</p><h2>Your little collection.</h2></div>
        <span className="collection-count">{String(paintings.length).padStart(2, '0')} / SAVED WORKS</span>
      </div>
      {paintings.length ? <div className="saved-grid">{paintings.map((painting) => <PaintingCard key={painting.id} painting={painting} onOpen={() => onOpen(painting)} onDelete={() => onDelete(painting.id)} />)}</div> : (
        <div className="empty-gallery"><span className="empty-icon"><i className="bi bi-collection" /></span><div><strong>Nothing on the wall just yet.</strong><p>When a composition feels like yours, save it here.</p></div><a href="#studio">Make your first painting <i className="bi bi-arrow-up-right" /></a></div>
      )}
    </section>
  );
}
