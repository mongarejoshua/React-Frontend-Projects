export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-field">
      <i className="bi bi-search" aria-hidden="true" />
      <span className="visually-hidden">Search cats by name</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Find a cat..."
      />
      {value && (
        <button type="button" onClick={() => onChange('')} aria-label="Clear search">
          <i className="bi bi-x-lg" aria-hidden="true" />
        </button>
      )}
    </label>
  )
}
