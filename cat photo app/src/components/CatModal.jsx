import { useEffect } from 'react'
import CatImage from './CatImage.jsx'

export default function CatModal({ cat, isFavorite, onFavorite, onClose }) {
  useEffect(() => {
    if (!cat) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('modal-open')
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')
    }
  }, [cat, onClose])

  if (!cat) return null

  return (
    <div className="modal-backdrop-custom" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="cat-modal" role="dialog" aria-modal="true" aria-labelledby="modal-cat-name">
        <button className="modal-close" type="button" aria-label="Close photo details" onClick={onClose}>
          <i className="bi bi-x-lg" aria-hidden="true" />
        </button>
        <CatImage key={cat.id} src={cat.image} alt={`${cat.name}, a lovely cat`} className="modal-image" loading="eager" />
        <div className="modal-copy">
          <span className="eyebrow">{cat.categories.join(' · ')}</span>
          <h2 id="modal-cat-name">Say hello to {cat.name}</h2>
          <p>{cat.detail}</p>
          <button className={`button-primary modal-favorite ${isFavorite ? 'is-saved' : ''}`} type="button" onClick={() => onFavorite(cat.id)}>
            <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`} aria-hidden="true" />
            {isFavorite ? 'Saved to your favorites' : 'Add to favorites'}
          </button>
        </div>
      </section>
    </div>
  )
}
