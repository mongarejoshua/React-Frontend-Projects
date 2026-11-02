import CatImage from './CatImage.jsx'

export default function CatCard({ cat, isFavorite, onFavorite, onSelect }) {
  return (
    <article className="cat-card">
      <div className="cat-card-image-wrap">
        <button
          className="cat-photo-button"
          type="button"
          onClick={() => onSelect(cat)}
          aria-label={`View a larger photo of ${cat.name}`}
        >
          <CatImage src={cat.image} alt={`${cat.name}, a lovely cat`} className="cat-card-image" />
        </button>
        <span className="cat-card-category">{cat.categories[0]}</span>
        <button
          className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
          type="button"
          aria-label={isFavorite ? `Remove ${cat.name} from favorites` : `Add ${cat.name} to favorites`}
          aria-pressed={isFavorite}
          onClick={() => onFavorite(cat.id)}
        >
          <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`} aria-hidden="true" />
        </button>
      </div>
      <div className="cat-card-body">
        <div>
          <h3>{cat.name}</h3>
          <p>{cat.description}</p>
        </div>
        <button className="details-button" type="button" onClick={() => onSelect(cat)}>
          View details <i className="bi bi-arrow-up-right" aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}
