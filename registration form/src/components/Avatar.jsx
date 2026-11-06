export default function Avatar({ user, size = 'md', className = '' }) {
  const initials = `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase() || 'N'
  return user?.profilePicture
    ? <img className={`avatar avatar-${size} ${className}`} src={user.profilePicture} alt={`${user.firstName} ${user.lastName}`} />
    : <span className={`avatar avatar-${size} avatar-placeholder ${className}`} aria-label={user ? `${user.firstName} ${user.lastName}` : 'Profile'}>{initials}</span>
}
