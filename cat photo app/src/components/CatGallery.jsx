import { useMemo, useState } from 'react'
import { cats } from '../data/cats.js'
import CatCard from './CatCard.jsx'
import CategoryFilter from './CategoryFilter.jsx'
import Favorites from './Favorites.jsx'
import SearchBar from './SearchBar.jsx'

const PAGE_SIZE = 6

export default function CatGallery({ favorites, onFavorite, onSelect }) {
  const [activeCategory, setActiveCategory] = useState('All Cats')
  const [search, setSearch] = useState('')
  const [showFavorites, setShowFavorites] = useState(false)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const filteredCats = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    return cats.filter((cat) => {
      const matchesCategory =
        activeCategory === 'All Cats' || cat.categories.includes(activeCategory)
      const matchesSearch = !normalizedSearch || cat.name.toLowerCase().includes(normalizedSearch)
      const matchesFavorites = !showFavorites || favorites.includes(cat.id)
      return matchesCategory && matchesSearch && matchesFavorites
    })
  }, [activeCategory, favorites, search, showFavorites])

  const updateCategory = (category) => {
    setActiveCategory(category)
    setVisibleCount(PAGE_SIZE)
  }

  const updateSearch = (value) => {
    setSearch(value)
    setVisibleCount(PAGE_SIZE)
  }

  const toggleFavoritesView = () => {
    setShowFavorites((current) => !current)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <section className="gallery-section section-padding" id="gallery">
      <div className="container">
        <div className="section-heading gallery-heading">
          <div>
            <span className="eyebrow"><span className="eyebrow-dot" /> The good stuff</span>
            <h2>Meet your new <span>favorite.</span></h2>
            <p>A little collection of lovely faces, each with a story of their own.</p>
          </div>
          <div className="gallery-counter"><strong>{cats.length}</strong><span>happy faces<br />and counting</span></div>
        </div>
        <div className="gallery-tools">
          <CategoryFilter activeCategory={activeCategory} onChange={updateCategory} />
          <div className="gallery-utility">
            <Favorites active={showFavorites} count={favorites.length} onClick={toggleFavoritesView} />
            <SearchBar value={search} onChange={updateSearch} />
          </div>
        </div>
        {filteredCats.length ? (
          <>
            <div className="cat-grid">
              {filteredCats.slice(0, visibleCount).map((cat) => (
                <CatCard
                  key={cat.id}
                  cat={cat}
                  isFavorite={favorites.includes(cat.id)}
                  onFavorite={onFavorite}
                  onSelect={onSelect}
                />
              ))}
            </div>
            {visibleCount < filteredCats.length && (
              <div className="load-more-wrap">
                <button className="button-outline" type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
                  Show me more cats <i className="bi bi-arrow-down" aria-hidden="true" />
                </button>
                <span>{Math.min(visibleCount, filteredCats.length)} of {filteredCats.length}</span>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <span className="empty-state-icon"><i className="bi bi-heartbreak" aria-hidden="true" /></span>
            <h3>No cats found just yet</h3>
            <p>{showFavorites && !favorites.length ? 'Tap the heart on any cat to start your favorites list.' : 'Try another name or category. The perfect cat is out there.'}</p>
            <button
              type="button"
              className="text-link"
              onClick={() => {
                setActiveCategory('All Cats')
                setSearch('')
                setShowFavorites(false)
              }}
            >
              See all cats <i className="bi bi-arrow-right" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
