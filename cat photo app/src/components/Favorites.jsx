export default function Favorites({ active, count, onClick }) {
  return (
    <button
      className={`favorites-filter ${active ? 'active' : ''}`}
      type="button"
      aria-pressed={active}
      onClick={onClick}
    >
      <i className={`bi ${active ? 'bi-heart-fill' : 'bi-heart'}`} aria-hidden="true" />
      Favorites <span>{count}</span>
    </button>
  )
}
