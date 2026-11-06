import { sampleSurveys } from '../data/sampleSurveys'

const STORAGE_KEY = 'formly-surveys-v1'
const SETTINGS_KEY = 'formly-settings-v1'

export function loadSurveys() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleSurveys))
      return sampleSurveys
    }
    const parsed = JSON.parse(saved)
    if (!Array.isArray(parsed)) throw new Error('Saved survey data is not a list.')
    return parsed
  } catch (error) {
    console.error('Unable to load saved surveys:', error)
    return sampleSurveys
  }
}

export function saveSurveys(surveys) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(surveys))
  } catch (error) {
    console.error('Unable to save surveys:', error)
    throw new Error('Your changes could not be saved. Check available browser storage and try again.')
  }
}

export function loadSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{"theme":"light"}')
  } catch (error) {
    console.error('Unable to load settings:', error)
    return { theme: 'light' }
  }
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}
