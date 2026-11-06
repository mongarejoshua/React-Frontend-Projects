export default function PhotoCard({ photo, isFavorite, onFavorite, onOpen, onDelete }) {
  return (
    <article className={`photo-card ${photo.height || ''}`}>
      <button className="photo-image-button" onClick={() => onOpen(photo)} aria-label={`View ${photo.title}`}>
        <img src={photo.src} alt={photo.title} loading="lazy" />
        <span className="photo-view"><i className="bi bi-arrows-fullscreen" /> View photo</span>
      </button>
      <button className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`} aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'} onClick={() => onFavorite(photo.id)}>
        <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`} />
      </button>
      {photo.isUpload && <button className="delete-photo-button" aria-label={`Delete ${photo.title}`} onClick={() => onDelete(photo)}><i className="bi bi-trash3" /></button>}
      <div className="photo-meta">
        <div><h3>{photo.title}</h3><span>{photo.category} <b>·</b> {photo.date}</span></div>
        {photo.isUpload && <span className="user-photo-tag">YOUR PHOTO</span>}
      </div>
    </article>
  );
}
