import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { currentUser, ready } = useAuth()
  const location = useLocation()
  if (!ready) return <div className="loading-screen"><span className="spinner-border text-primary" role="status" /><span>Getting your space ready…</span></div>
  if (!currentUser) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  if (adminOnly && currentUser.role !== 'admin') return <Navigate to="/dashboard" replace />
  return children
}
