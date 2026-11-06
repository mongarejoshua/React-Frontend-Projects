export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-field">
      <i className="bi bi-search" />
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search photos, places, stories..." aria-label="Search by photo title, category, or description" />
      {value && <button type="button" aria-label="Clear search" onClick={() => onChange('')}><i className="bi bi-x-lg" /></button>}
      <kbd>⌘ K</kbd>
    </label>
  );
}
