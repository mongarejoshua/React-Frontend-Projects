export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="category-list" role="group" aria-label="Filter photos by category">
      {categories.map((category) => (
        <button key={category} className={`category-chip ${active === category ? 'active' : ''}`} onClick={() => onChange(category)}>
          {category}
        </button>
      ))}
    </div>
  );
}
