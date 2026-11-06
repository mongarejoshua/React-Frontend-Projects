import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loadSettings, loadSurveys, saveSettings, saveSurveys } from '../utils/storage'

const SurveyContext = createContext(null)
export const questionTypes = [
  { value: 'short', label: 'Short answer', icon: 'bi-input-cursor-text' },
  { value: 'long', label: 'Long answer', icon: 'bi-textarea-t' },
  { value: 'multiple', label: 'Multiple choice', icon: 'bi-ui-radios' },
  { value: 'checkboxes', label: 'Checkboxes', icon: 'bi-ui-checks' },
  { value: 'dropdown', label: 'Dropdown', icon: 'bi-menu-button-wide' },
  { value: 'linear', label: 'Linear scale', icon: 'bi-sliders' },
  { value: 'rating', label: 'Star rating', icon: 'bi-star' },
  { value: 'yesno', label: 'Yes or no', icon: 'bi-toggle-on' },
  { value: 'date', label: 'Date', icon: 'bi-calendar3' },
  { value: 'email', label: 'Email', icon: 'bi-envelope' },
  { value: 'phone', label: 'Phone', icon: 'bi-telephone' },
]

export function SurveyProvider({ children }) {
  const [surveys, setSurveys] = useState(loadSurveys)
  const [settings, setSettings] = useState(loadSettings)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    try { saveSurveys(surveys) } catch (error) { setNotice(error.message) }
  }, [surveys])

  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme || 'light'
    try {
      saveSettings(settings)
    } catch (error) {
      console.error('Unable to save settings:', error)
      setNotice('Your appearance preference could not be saved.')
    }
  }, [settings])

  const updateSurvey = (id, changes) => setSurveys((items) => items.map((item) => item.id === id ? { ...item, ...changes, updatedAt: new Date().toISOString() } : item))
  const createSurvey = () => {
    const survey = {
      id: crypto.randomUUID(), title: 'Untitled survey', description: '', category: 'General',
      status: 'Draft', anonymous: true, multipleSubmissions: false, cover: '',
      createdAt: new Date().toISOString(), startDate: '', endDate: '', questions: [], responses: [],
    }
    setSurveys((items) => [survey, ...items])
    return survey
  }
  const deleteSurvey = (id) => setSurveys((items) => items.filter((item) => item.id !== id))
  const addResponse = (id, answers, respondent = null) => {
    const response = { id: crypto.randomUUID(), answers, respondent, submittedAt: new Date().toISOString() }
    updateSurvey(id, { responses: [...(surveys.find((item) => item.id === id)?.responses || []), response] })
  }
  const value = useMemo(() => ({
    surveys, settings, setSettings, notice, setNotice, createSurvey, updateSurvey, deleteSurvey, addResponse,
  }), [surveys, settings, notice])
  return <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>
}

export function useSurveys() {
  const context = useContext(SurveyContext)
  if (!context) throw new Error('useSurveys must be used inside SurveyProvider.')
  return context
}
