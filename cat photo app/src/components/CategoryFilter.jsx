const categories = ['All Cats', 'Kittens', 'Persian Cats', 'Orange Cats', 'Black Cats']

export default function CategoryFilter({ activeCategory, onChange }) {
  return (
    <div className="category-list" role="group" aria-label="Filter cats by category">
      {categories.map((category) => (
        <button
          className={`category-chip ${activeCategory === category ? 'active' : ''}`}
          key={category}
          type="button"
          aria-pressed={activeCategory === category}
          onClick={() => onChange(category)}
        >
          {category === 'All Cats' && <i className="bi bi-grid-3x3-gap-fill" aria-hidden="true" />}
          {category}
        </button>
      ))}
    </div>
  )
}
