import { useState } from 'react';

export default function Albums({ albums, photos, onCreate, onDelete, onOpen, selectedAlbum, onBack, onOpenPhoto, onFavorite, favorites, onDeletePhoto }) {
  const [name, setName] = useState('');
  const selectedPhotos = selectedAlbum ? photos.filter((photo) => selectedAlbum.photoIds.includes(photo.id)) : [];

  const create = (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    onCreate(name.trim());
    setName('');
  };

  if (selectedAlbum) return (
    <section className="gallery-section container album-view">
      <button className="text-back" onClick={onBack}><i className="bi bi-arrow-left me-2" />All albums</button>
      <div className="section-heading"><div><span className="eyebrow"><span /> YOUR COLLECTION</span><h2>{selectedAlbum.name}<span className="heading-period">.</span></h2><p>{selectedPhotos.length} {selectedPhotos.length === 1 ? 'photograph' : 'photographs'} in this album</p></div></div>
      {selectedPhotos.length ? <div className="photo-grid">{selectedPhotos.map((photo) => (
        <article className={`photo-card ${photo.height || ''}`} key={photo.id}><button className="photo-image-button" onClick={() => onOpenPhoto(photo)}><img src={photo.src} alt={photo.title} loading="lazy" /><span className="photo-view"><i className="bi bi-arrows-fullscreen" /> View photo</span></button><button className="favorite-button" onClick={() => onFavorite(photo.id)} aria-label="Toggle favourite"><i className={`bi ${favorites.includes(photo.id) ? 'bi-heart-fill is-favorite' : 'bi-heart'}`} /></button><button className="delete-photo-button" onClick={() => onDeletePhoto(selectedAlbum.id, photo.id)} aria-label="Remove photo from album"><i className="bi bi-x-lg" /></button><div className="photo-meta"><div><h3>{photo.title}</h3><span>{photo.category} <b>·</b> {photo.date}</span></div></div></article>
      ))}</div> : <div className="empty-state"><i className="bi bi-images" /><h3>This album is waiting for its first photo</h3><p>Open any photo and add it to this album to start your collection.</p></div>}
    </section>
  );

  return (
    <section className="gallery-section container">
      <div className="section-heading"><div><span className="eyebrow"><span /> PERSONAL COLLECTIONS</span><h2>Your albums<span className="heading-period">.</span></h2><p>Gather the moments you want to keep close.</p></div><div className="collection-count"><strong>{albums.length.toString().padStart(2, '0')}</strong><span>ALBUMS</span></div></div>
      <form className="create-album-form" onSubmit={create}><i className="bi bi-folder-plus" /><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Give your new album a name..." aria-label="New album name" /><button className="btn btn-dark" type="submit">Create album <i className="bi bi-plus-lg ms-2" /></button></form>
      {albums.length ? <div className="album-grid">{albums.map((album) => {
        const cover = photos.find((photo) => photo.id === album.photoIds[0]) || photos[0];
        return <article className="album-card" key={album.id}><button className="album-cover" onClick={() => onOpen(album)}>{cover ? <img src={cover.src} alt="" loading="lazy" /> : <span className="album-placeholder"><i className="bi bi-images" /></span>}<span className="album-open"><i className="bi bi-arrow-up-right" /></span></button><div className="album-meta"><button onClick={() => onOpen(album)}><h3>{album.name}</h3><span>{album.photoIds.length} {album.photoIds.length === 1 ? 'photo' : 'photos'}</span></button><button className="album-delete" aria-label={`Delete ${album.name}`} onClick={() => onDelete(album)}><i className="bi bi-trash3" /></button></div></article>;
      })}</div> : <div className="empty-state"><i className="bi bi-folder2-open" /><h3>Your albums start here</h3><p>Create a collection for a trip, a feeling, or just because.</p></div>}
    </section>
  );
}
