import { useMemo, useState } from 'react'
import Avatar from '../components/Avatar'
import { useAuth } from '../context/AuthContext'

const editableFields = [['firstName', 'First name'], ['lastName', 'Last name'], ['username', 'Username'], ['email', 'Email'], ['phone', 'Phone'], ['country', 'Country'], ['region', 'County / State']]
const emptyEdit = (user) => ({ firstName: user.firstName || '', lastName: user.lastName || '', username: user.username || '', email: user.email || '', phone: user.phone || '', country: user.country || '', region: user.region || '', gender: user.gender || '', status: user.status || 'active' })

function UserDialog({ mode, user, onClose, onSave, onDelete }) {
  const [form, setForm] = useState(user ? emptyEdit(user) : {})
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  if (!mode || !user) return null
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError('')
    try {
      await onSave(user.id, form)
      window.dispatchEvent(new CustomEvent('nook:notice', { detail: { type: 'success', message: 'Member details have been updated.' } }))
      onClose()
    }
    catch (issue) { setError(issue.message) }
    finally { setBusy(false) }
  }
  return <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className="dialog-panel" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <div className="dialog-header"><div><span className="eyebrow">{mode === 'view' ? 'MEMBER DETAILS' : mode === 'edit' ? 'UPDATE MEMBER' : 'REMOVE MEMBER'}</span><h2 id="dialog-title">{mode === 'view' ? `${user.firstName} ${user.lastName}` : mode === 'edit' ? 'Edit member' : 'Delete account?'}</h2></div><button className="dialog-close" onClick={onClose} aria-label="Close"><i className="bi bi-x-lg" /></button></div>
      {mode === 'view' && <div className="dialog-body"><div className="member-profile"><Avatar user={user} size="lg" /><div><strong>{user.firstName} {user.lastName}</strong><span>@{user.username}</span></div></div><div className="detail-list">{[['Email', user.email], ['Phone', user.phone], ['Gender', user.gender], ['Date of birth', user.dateOfBirth], ['Location', [user.region, user.country].filter(Boolean).join(', ')], ['Address', user.address], ['Joined', new Date(user.createdAt).toLocaleDateString()], ['Status', user.status]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value || '—'}</strong></div>)}</div></div>}
      {mode === 'edit' && <form className="dialog-body" onSubmit={submit}>{error && <div className="alert alert-danger py-2">{error}</div>}<div className="row gx-3">{editableFields.map(([key, label]) => <div className="col-sm-6" key={key}><div className="mb-3"><label className="form-label" htmlFor={`edit-${key}`}>{label}</label><input id={`edit-${key}`} className="form-control" value={form[key]} onChange={(event) => setForm({ ...form, [key]: event.target.value })} required /></div></div>)}
        <div className="col-sm-6"><div className="mb-3"><label className="form-label" htmlFor="edit-gender">Gender</label><select id="edit-gender" className="form-select" value={form.gender} onChange={(event) => setForm({ ...form, gender: event.target.value })}><option>Female</option><option>Male</option><option>Other</option></select></div></div>
        <div className="col-sm-6"><div className="mb-3"><label className="form-label" htmlFor="edit-status">Account status</label><select id="edit-status" className="form-select" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}><option value="active">Active</option><option value="suspended">Suspended</option></select></div></div>
      </div><div className="dialog-actions"><button type="button" className="btn btn-soft" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary-nook" disabled={busy}>{busy ? 'Saving…' : 'Save changes'}</button></div></form>}
      {mode === 'delete' && <div className="dialog-body"><p>Are you sure you want to delete <strong>{user.firstName} {user.lastName}</strong>’s account? This action cannot be undone.</p><div className="dialog-actions"><button className="btn btn-soft" onClick={onClose}>Keep account</button><button className="btn btn-danger" onClick={() => { onDelete(user.id); onClose() }}>Delete account</button></div></div>}
    </section>
  </div>
}

export default function AdminDashboard() {
  const { users, currentUser, updateManagedUser, deleteManagedUser } = useAuth()
  const [search, setSearch] = useState('')
  const [gender, setGender] = useState('all')
  const [status, setStatus] = useState('all')
  const [selected, setSelected] = useState(null)
  const [mode, setMode] = useState('')
  const members = users.filter((user) => user.role !== 'admin')
  const recent = members.filter((user) => Date.now() - new Date(user.createdAt).getTime() < 30 * 24 * 60 * 60 * 1000).length
  const filtered = useMemo(() => members.filter((user) => {
    const term = search.trim().toLowerCase()
    const matchesText = !term || [user.firstName, user.lastName, user.username, user.email].some((value) => value?.toLowerCase().includes(term))
    return matchesText && (gender === 'all' || user.gender === gender) && (status === 'all' || user.status === status)
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)), [members, search, gender, status])
  function openDialog(user, dialogMode) { setSelected(user); setMode(dialogMode) }
  function closeDialog() { setSelected(null); setMode('') }
  function remove(id) {
    try { deleteManagedUser(id); window.dispatchEvent(new CustomEvent('nook:notice', { detail: { type: 'success', message: 'The account has been deleted.' } })) }
    catch (error) { window.dispatchEvent(new CustomEvent('nook:notice', { detail: { type: 'error', message: error.message } })) }
  }
  return <main className="dashboard-page admin-page"><div className="container">
    <div className="admin-topline"><div><span className="eyebrow">NOOK ADMINISTRATION</span><h1>People make the <span>place.</span></h1><p>Here’s a little look at your growing community.</p></div><div className="admin-user"><Avatar user={currentUser} size="sm" /><span>Admin workspace</span></div></div>
    <div className="row g-3 admin-stats"><div className="col-md-4"><div className="admin-stat"><span className="metric-icon peach"><i className="bi bi-people" /></span><div><span>TOTAL MEMBERS</span><strong>{members.length}</strong></div></div></div><div className="col-md-4"><div className="admin-stat"><span className="metric-icon green"><i className="bi bi-person-check" /></span><div><span>ACTIVE MEMBERS</span><strong>{members.filter((user) => user.status === 'active').length}</strong></div></div></div><div className="col-md-4"><div className="admin-stat"><span className="metric-icon blue"><i className="bi bi-stars" /></span><div><span>JOINED THIS MONTH</span><strong>{recent}</strong></div></div></div></div>
    <section className="content-card users-card">
      <div className="card-heading users-heading"><div><span className="eyebrow">YOUR COMMUNITY</span><h2>All members <span className="count-pill">{members.length}</span></h2></div><div className="users-filters">
        <div className="search-wrap"><i className="bi bi-search" /><input aria-label="Search users" placeholder="Search people…" value={search} onChange={(event) => setSearch(event.target.value)} /><button className="visually-hidden" type="button" onClick={() => setSearch('')}>Clear search</button></div>
        <select className="form-select form-select-sm filter-select" aria-label="Filter by gender" value={gender} onChange={(event) => setGender(event.target.value)}><option value="all">All genders</option><option>Female</option><option>Male</option><option>Other</option></select>
        <select className="form-select form-select-sm filter-select" aria-label="Filter by account status" value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">All statuses</option><option value="active">Active</option><option value="suspended">Suspended</option></select>
      </div></div>
      <div className="table-responsive"><table className="table user-table align-middle mb-0"><thead><tr><th>MEMBER</th><th>EMAIL</th><th>GENDER</th><th>JOINED</th><th>STATUS</th><th aria-label="Actions" /></tr></thead><tbody>
        {filtered.map((user) => <tr key={user.id}><td><div className="table-person"><Avatar user={user} size="sm" /><div><strong>{user.firstName} {user.lastName}</strong><span>@{user.username}</span></div></div></td><td>{user.email}</td><td>{user.gender || '—'}</td><td>{new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td><td><span className={`member-status ${user.status === 'active' ? 'is-active' : 'is-suspended'}`}><span />{user.status}</span></td><td><div className="table-actions"><button aria-label={`View ${user.firstName}`} title="View member" onClick={() => openDialog(user, 'view')}><i className="bi bi-eye" /></button><button aria-label={`Edit ${user.firstName}`} title="Edit member" onClick={() => openDialog(user, 'edit')}><i className="bi bi-pencil" /></button><button aria-label={`Delete ${user.firstName}`} title="Delete member" onClick={() => openDialog(user, 'delete')}><i className="bi bi-trash3" /></button></div></td></tr>)}
        {!filtered.length && <tr><td colSpan="6"><div className="empty-state"><span><i className="bi bi-person-x" /></span><strong>{members.length ? 'No members match those filters.' : 'Your community is just getting started.'}</strong><p>{members.length ? 'Try another name or change a filter.' : 'Newly registered members will show up here.'}</p>{members.length > 0 && <button className="btn btn-soft btn-sm" onClick={() => { setSearch(''); setGender('all'); setStatus('all') }}>Clear filters</button>}</div></td></tr>}
      </tbody></table></div>
    </section>
    <div className="demo-disclaimer"><i className="bi bi-info-circle" /> Administration changes affect accounts saved in this browser only.</div>
    <UserDialog key={`${mode}-${selected?.id}`} mode={mode} user={selected} onClose={closeDialog} onSave={updateManagedUser} onDelete={remove} />
  </div></main>
}
