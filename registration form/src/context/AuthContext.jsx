import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { makeId, readSession, readUsers, writeSession, writeUsers } from '../utils/storage'
import { emailPattern, validatePassword } from '../utils/validation'

const AuthContext = createContext(null)
const ADMIN_EMAIL = 'admin@nook.demo'

async function hashPassword(password, salt = crypto.getRandomValues(new Uint8Array(16))) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 120000, hash: 'SHA-256' }, key, 256)
  return {
    salt: Array.from(salt, (byte) => byte.toString(16).padStart(2, '0')).join(''),
    passwordHash: Array.from(new Uint8Array(bits), (byte) => byte.toString(16).padStart(2, '0')).join(''),
  }
}

function safeUser(user) {
  const { passwordHash, salt, ...profile } = user
  return profile
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([])
  const [currentUserId, setCurrentUserId] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let active = true
    async function initialize() {
      try {
        let saved = readUsers()
        if (!saved.some((user) => user.role === 'admin')) {
          const credentials = await hashPassword('NookAdmin2026!')
          saved = [...saved, {
            id: makeId(), firstName: 'Nook', lastName: 'Admin', username: 'admin',
            email: ADMIN_EMAIL, phone: '', gender: 'Other', dateOfBirth: '',
            country: '', region: '', address: '', profilePicture: '', role: 'admin',
            status: 'active', createdAt: new Date().toISOString(), ...credentials,
          }]
          writeUsers(saved)
        }
        if (!active) return
        setUsers(saved)
        const session = readSession()
        if (session?.userId && saved.some((user) => user.id === session.userId)) setCurrentUserId(session.userId)
      } catch (error) {
        console.error(error)
        window.dispatchEvent(new CustomEvent('nook:notice', { detail: { type: 'error', message: error.message || 'Could not load saved accounts.' } }))
      } finally {
        if (active) setReady(true)
      }
    }
    initialize()
    return () => { active = false }
  }, [])

  const persist = useCallback((nextUsers) => {
    writeUsers(nextUsers)
    setUsers(nextUsers)
  }, [])

  const register = useCallback(async (values) => {
    const email = values.email.trim().toLowerCase()
    const username = values.username.trim()
    if (users.some((user) => user.email.toLowerCase() === email)) throw new Error('An account with this email already exists.')
    if (users.some((user) => user.username.toLowerCase() === username.toLowerCase())) throw new Error('That username is already taken.')
    if (!validatePassword(values.password)) throw new Error('Please use a stronger password.')
    const credentials = await hashPassword(values.password)
    const user = {
      id: makeId(), firstName: values.firstName.trim(), lastName: values.lastName.trim(),
      username, email, phone: values.phone.trim(), gender: values.gender,
      dateOfBirth: values.dateOfBirth, country: values.country.trim(),
      region: values.region.trim(), address: values.address.trim(),
      profilePicture: values.profilePicture || '', role: 'user', status: 'active',
      createdAt: new Date().toISOString(), ...credentials,
    }
    persist([...users, user])
    writeSession({ userId: user.id })
    setCurrentUserId(user.id)
    return safeUser(user)
  }, [persist, users])

  const login = useCallback(async (identifier, password, remember = true) => {
    const value = identifier.trim().toLowerCase()
    const user = users.find((item) => item.email.toLowerCase() === value || item.username.toLowerCase() === value)
    if (!user || !user.salt || !user.passwordHash) throw new Error('The email, username, or password is incorrect.')
    const salt = Uint8Array.from(user.salt.match(/.{2}/g), (byte) => parseInt(byte, 16))
    const candidate = await hashPassword(password, salt)
    if (candidate.passwordHash !== user.passwordHash) throw new Error('The email, username, or password is incorrect.')
    if (user.status === 'suspended') throw new Error('This account is currently suspended. Please contact support.')
    writeSession(remember ? { userId: user.id } : null)
    setCurrentUserId(user.id)
    return safeUser(user)
  }, [users])

  const logout = useCallback(() => {
    writeSession(null)
    setCurrentUserId(null)
  }, [])

  const updateProfile = useCallback(async (id, patch) => {
    const current = users.find((user) => user.id === id)
    if (!current) throw new Error('Account not found.')
    const email = String(patch.email ?? current.email).trim().toLowerCase()
    const username = String(patch.username ?? current.username).trim()
    if (!emailPattern.test(email)) throw new Error('Enter a valid email address.')
    if (users.some((user) => user.id !== id && user.email.toLowerCase() === email)) throw new Error('An account with this email already exists.')
    if (users.some((user) => user.id !== id && user.username.toLowerCase() === username.toLowerCase())) throw new Error('That username is already taken.')
    const allowed = ['firstName', 'lastName', 'username', 'email', 'phone', 'gender', 'dateOfBirth', 'country', 'region', 'address', 'profilePicture', 'status']
    const updated = { ...current }
    allowed.forEach((key) => { if (patch[key] !== undefined) updated[key] = typeof patch[key] === 'string' ? patch[key].trim() : patch[key] })
    persist(users.map((user) => user.id === id ? updated : user))
    return safeUser(updated)
  }, [persist, users])

  const changePassword = useCallback(async (id, oldPassword, newPassword) => {
    const current = users.find((user) => user.id === id)
    if (!current) throw new Error('Account not found.')
    const old = await hashPassword(oldPassword, Uint8Array.from(current.salt.match(/.{2}/g), (byte) => parseInt(byte, 16)))
    if (old.passwordHash !== current.passwordHash) throw new Error('Your current password is incorrect.')
    if (!validatePassword(newPassword)) throw new Error('Use 8+ characters with uppercase, lowercase, a number, and a symbol.')
    const updated = { ...current, ...await hashPassword(newPassword) }
    persist(users.map((user) => user.id === id ? updated : user))
  }, [persist, users])

  const resetPassword = useCallback(async (email, newPassword) => {
    const target = users.find((user) => user.email.toLowerCase() === email.trim().toLowerCase())
    if (!target) throw new Error('No account was found with that email address.')
    if (!validatePassword(newPassword)) throw new Error('Use 8+ characters with uppercase, lowercase, a number, and a symbol.')
    const updated = { ...target, ...await hashPassword(newPassword) }
    persist(users.map((user) => user.id === target.id ? updated : user))
  }, [persist, users])

  const updateManagedUser = useCallback((id, patch) => updateProfile(id, patch), [updateProfile])
  const deleteManagedUser = useCallback((id) => {
    const target = users.find((user) => user.id === id)
    if (!target || target.role === 'admin') throw new Error('Administrator accounts cannot be deleted here.')
    persist(users.filter((user) => user.id !== id))
  }, [persist, users])

  const currentUser = users.find((user) => user.id === currentUserId) || null
  const value = useMemo(() => ({
    users: users.map(safeUser), currentUser: currentUser ? safeUser(currentUser) : null,
    ready, register, login, logout, updateProfile, changePassword, resetPassword,
    updateManagedUser, deleteManagedUser,
  }), [users, currentUser, ready, register, login, logout, updateProfile, changePassword, resetPassword, updateManagedUser, deleteManagedUser])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider.')
  return context
}
