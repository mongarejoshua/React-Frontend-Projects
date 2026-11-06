import { useEffect } from 'react';

function formatBytes(bytes = 0) {
  if (!bytes) return '—';
  return bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(0)} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function Lightbox({ photo, photos, onClose, onNavigate, isFavorite, onFavorite, albums, onAddToAlbum, onDownload }) {
  const index = photos.findIndex((item) => item.id === photo.id);
  const previous = () => onNavigate(photos[(index - 1 + photos.length) % photos.length]);
  const next = () => onNavigate(photos[(index + 1) % photos.length]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.classList.add('lightbox-open');
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('lightbox-open');
    };
  }, [photo, photos]);

  return (
    <div className="lightbox-backdrop" role="dialog" aria-modal="true" aria-label={`Photo: ${photo.title}`} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close viewer"><i className="bi bi-x-lg" /></button>
      <button className="lightbox-arrow previous" onClick={previous} aria-label="Previous photo"><i className="bi bi-arrow-left" /></button>
      <div className="lightbox-content">
        <div className="lightbox-image-wrap"><img src={photo.src} alt={photo.title} /></div>
        <aside className="lightbox-info">
          <div className="lightbox-counter">{String(index + 1).padStart(2, '0')} <span>/</span> {String(photos.length).padStart(2, '0')}</div>
          <span className="eyebrow"><span /> {photo.category}</span>
          <h2>{photo.title}</h2><p>{photo.description || 'A moment worth keeping.'}</p>
          <div className="details-rule" />
          <dl className="photo-details">
            <div><dt>DATE ADDED</dt><dd>{photo.date}</dd></div>
            <div><dt>FILE NAME</dt><dd>{photo.fileName || 'Sample photograph'}</dd></div>
            <div><dt>DIMENSIONS</dt><dd>{photo.dimensions || '—'}</dd></div>
            <div><dt>FILE SIZE</dt><dd>{formatBytes(photo.size)}</dd></div>
          </dl>
          <div className="lightbox-actions">
            <button className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-light'}`} onClick={() => onFavorite(photo.id)}><i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'} me-2`} />{isFavorite ? 'Favourited' : 'Favourite'}</button>
            <button className="btn btn-outline-light" onClick={() => onDownload(photo)}><i className="bi bi-download me-2" />Download</button>
          </div>
          {albums.length > 0 && <label className="album-select-label">ADD TO ALBUM
            <select className="form-select form-select-sm" defaultValue="" onChange={(event) => { if (event.target.value) onAddToAlbum(event.target.value, photo.id); event.target.value = ''; }}>
              <option value="">Choose an album...</option>
              {albums.map((album) => <option key={album.id} value={album.id}>{album.name}</option>)}
            </select>
          </label>}
        </aside>
      </div>
      <button className="lightbox-arrow next" onClick={next} aria-label="Next photo"><i className="bi bi-arrow-right" /></button>
    </div>
  );
}
