import { useMemo, useState } from 'react'
import { menuItems } from '../data/menuData'
import CategoryFilter from './CategoryFilter'
import MenuCard from './MenuCard'

function Menu({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('All Items')
  const [search, setSearch] = useState('')
  const filteredItems = useMemo(() => menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'All Items' || item.category === activeCategory
    const matchesSearch = item.name.toLowerCase().includes(search.trim().toLowerCase())
    return matchesCategory && matchesSearch
  }), [activeCategory, search])

  return (
    <section className="section-padding menu-section" id="menu">
      <div className="container">
        <div className="section-heading menu-heading">
          <div>
            <span className="eyebrow">A LITTLE SOMETHING FOR EVERYONE</span>
            <h2>Made with love.<br /><em>Served with a smile.</em></h2>
          </div>
          <p>From your first cup of the day to a well-earned afternoon treat, find your new favourite right here.</p>
        </div>
        <div className="menu-controls">
          <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
          <label className="menu-search">
            <i className="bi bi-search" />
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find your favourite..." aria-label="Search menu" />
            {search && <button type="button" aria-label="Clear search" onClick={() => setSearch('')}><i className="bi bi-x-lg" /></button>}
          </label>
        </div>
        <div className="menu-results" aria-live="polite">
          <span>{activeCategory === 'All Items' ? 'OUR MENU' : activeCategory.toUpperCase()}</span>
          <span>{filteredItems.length} lovely things</span>
        </div>
        {filteredItems.length ? (
          <div className="row g-4 menu-grid">
            {filteredItems.map((item) => (
              <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={item.id}>
                <MenuCard item={item} onAddToCart={onAddToCart} />
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <i className="bi bi-search-heart" />
            <h3>Nothing brewing just yet.</h3>
            <p>Try a different search or choose another category.</p>
            <button className="text-button" type="button" onClick={() => { setSearch(''); setActiveCategory('All Items') }}>Show me everything <i className="bi bi-arrow-right" /></button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Menu
