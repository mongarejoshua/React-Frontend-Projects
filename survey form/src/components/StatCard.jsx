export default function StatCard({ label, value, note, icon, tone = 'orange' }) {
  return <div className="stat-card"><div className={`stat-icon ${tone}`}><i className={`bi ${icon}`} /></div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-note">{note}</div></div>
}
