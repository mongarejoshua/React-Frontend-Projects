import { categories } from '../data/menuData'

function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="category-list" role="group" aria-label="Filter menu by category">
      {categories.map((category) => (
        <button
          className={`category-pill ${activeCategory === category ? 'active' : ''}`}
          key={category}
          onClick={() => onCategoryChange(category)}
          type="button"
          aria-pressed={activeCategory === category}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
