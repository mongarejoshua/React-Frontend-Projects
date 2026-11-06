const USERS_KEY = 'nook.users.v1'
const SESSION_KEY = 'nook.session.v1'

export function readUsers() {
  try {
    const stored = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    return Array.isArray(stored) ? stored : []
  } catch {
    throw new Error('Saved account data could not be read. Clear this app’s local storage to start over.')
  }
}

export function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function readSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
  } catch {
    return null
  }
}

export function writeSession(session) {
  if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  else localStorage.removeItem(SESSION_KEY)
}

export const makeId = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`
