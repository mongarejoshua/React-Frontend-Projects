export default function EmptyState({ icon = 'bi-inbox', title, description, action }) {
  return <div className="empty-state"><div className="empty-icon"><i className={`bi ${icon}`} /></div><h3>{title}</h3><p>{description}</p>{action}</div>
}
