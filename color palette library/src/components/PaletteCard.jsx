export default function PaletteCard({ palette, onLoad, onDelete, onCopy, showDelete = false }) {
  return (
    <article className="palette-card">
      <button className="palette-preview" onClick={() => onLoad(palette.colors)} aria-label={`Load ${palette.name}`}>
        {palette.colors.map((color, index) => <span key={`${color}-${index}`} style={{ backgroundColor: color }} />)}
      </button>
      <div className="palette-card-info"><div><strong>{palette.name}</strong><span>{palette.category || `${palette.colors.length} colors`}</span></div><div className="palette-card-actions">
        <button onClick={() => onLoad(palette.colors)} aria-label={`Load ${palette.name}`} title="Load palette"><i className="bi bi-arrow-up-right" /></button>
        <button onClick={() => onCopy(palette.colors)} aria-label={`Copy ${palette.name}`} title="Copy palette"><i className="bi bi-copy" /></button>
        {showDelete && <button className="delete-action" onClick={() => onDelete(palette.id)} aria-label={`Delete ${palette.name}`} title="Delete palette"><i className="bi bi-trash3" /></button>}
      </div></div>
    </article>
  )
}
