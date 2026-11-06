import PhotoCard from './PhotoCard.jsx';
import CategoryFilter from './CategoryFilter.jsx';
import SearchBar from './SearchBar.jsx';

export default function Gallery({ photos, categories, activeCategory, onCategoryChange, query, onQueryChange, favorites, onFavorite, onOpen, onDelete, title = 'The collection', subtitle = 'A considered collection of moments, details, and places.' }) {
  return (
    <section className="gallery-section container" id="gallery">
      <div className="section-heading">
        <div><span className="eyebrow"><span /> THE GALLERY</span><h2>{title}<span className="heading-period">.</span></h2><p>{subtitle}</p></div>
        <div className="collection-count"><strong>{photos.length.toString().padStart(2, '0')}</strong><span>PHOTOGRAPHS</span></div>
      </div>
      <div className="gallery-controls"><SearchBar value={query} onChange={onQueryChange} /><CategoryFilter categories={categories} active={activeCategory} onChange={onCategoryChange} /></div>
      {photos.length ? (
        <div className="photo-grid">
          {photos.map((photo) => <PhotoCard key={photo.id} photo={photo} isFavorite={favorites.includes(photo.id)} onFavorite={onFavorite} onOpen={onOpen} onDelete={onDelete} />)}
        </div>
      ) : (
        <div className="empty-state"><i className="bi bi-image" /><h3>No photos found</h3><p>Try a different search or category to find what you’re looking for.</p></div>
      )}
    </section>
  );
}
