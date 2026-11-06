import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSurveys } from '../context/SurveyContext'
import QuestionRenderer from '../components/QuestionRenderer'
import { validateAnswer } from '../utils/validation'

export default function TakeSurvey({ preview = false }) {
  const { id } = useParams()
  const { surveys, addResponse } = useSurveys()
  const survey = surveys.find((item) => item.id === id)
  const [answers, setAnswers] = useState({})
  const [respondent, setRespondent] = useState({ name: '', email: '' })
  const [errors, setErrors] = useState({})
  const [page, setPage] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const completed = useMemo(() => survey?.questions.filter((_, index) => {
    const value = answers[index]
    return value !== undefined && value !== '' && (!Array.isArray(value) || value.length > 0)
  }).length || 0, [answers, survey])

  if (!survey) return <div className="public-page"><div className="public-not-found"><i className="bi bi-search" /><h1>We can’t find that survey</h1><p>It may have been removed or the link may be incorrect.</p><Link className="btn btn-primary-custom" to="/">Visit Formly</Link></div></div>
  const unavailable = (!preview && survey.status !== 'Active') || (survey.endDate && new Date(`${survey.endDate}T23:59:59`) < new Date()) || (survey.startDate && new Date(`${survey.startDate}T00:00:00`) > new Date())
  const respondentKey = `formly-response-${survey.id}`
  const alreadySubmitted = !survey.multipleSubmissions && localStorage.getItem(respondentKey)
  const questions = survey.questions
  const pageCount = Math.max(questions.length, 1)
  const currentQuestion = questions[page]
  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    questions.forEach((question, index) => {
      const error = validateAnswer(question, answers[index])
      if (error) nextErrors[index] = error
    })
    if (!survey.anonymous) {
      if (!respondent.name.trim()) nextErrors.respondentName = 'Enter your name.'
      const emailError = validateAnswer({ type: 'email', required: true }, respondent.email)
      if (emailError) nextErrors.respondentEmail = emailError
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      const firstInvalidQuestion = Object.keys(nextErrors).find((key) => /^\d+$/.test(key))
      if (firstInvalidQuestion !== undefined) setPage(Number(firstInvalidQuestion))
      return
    }
    if (!preview) {
      try {
        addResponse(survey.id, answers, survey.anonymous ? null : respondent)
        if (!survey.multipleSubmissions) localStorage.setItem(respondentKey, 'submitted')
      } catch {
        setErrorMessage('Your response could not be saved. Please try again.')
        return
      }
    }
    setSubmitted(true)
  }
  if (submitted) return <div className="public-page"><div className="public-success"><div className="success-icon"><i className="bi bi-check2" /></div><div className="eyebrow">THAT’S A WRAP</div><h1>{preview ? 'Preview complete!' : 'Thanks for sharing.'}</h1><p>{preview ? 'This is what your respondents will see after they submit.' : 'Your response has been recorded. Your feedback helps make things better.'}</p>{preview ? <Link to={`/builder/${survey.id}`} className="btn btn-primary-custom">Back to editing</Link> : <Link to="/" className="public-brand"><span className="brand-mark"><i className="bi bi-command" /></span> Made with Formly</Link>}</div></div>
  if (unavailable || alreadySubmitted) return <div className="public-page"><div className="public-not-found"><i className={`bi ${alreadySubmitted ? 'bi-check-circle' : 'bi-lock'}`} /><h1>{alreadySubmitted ? 'You’re all set.' : 'This survey is closed.'}</h1><p>{alreadySubmitted ? 'You’ve already responded to this survey. Thank you!' : 'This survey is not currently accepting responses.'}</p><Link to="/" className="public-brand"><span className="brand-mark"><i className="bi bi-command" /></span> Made with Formly</Link></div></div>
  return <div className="public-page"><div className="respondent-top"><Link to="/" className="public-brand"><span className="brand-mark"><i className="bi bi-command" /></span>formly<span className="brand-period">.</span></Link>{preview && <Link to={`/builder/${survey.id}`} className="preview-exit"><i className="bi bi-arrow-left" /> Back to editor</Link>}</div><div className="respondent-container"><div className="respondent-progress"><div><span>{questions.length ? `QUESTION ${String(page + 1).padStart(2, '0')}` : 'NO QUESTIONS YET'}</span><span>{questions.length ? `${Math.round((completed / questions.length) * 100)}% complete` : ''}</span></div><div className="progress-track"><span style={{ width: `${questions.length ? (completed / questions.length) * 100 : 0}%` }} /></div></div>
      <form className="respondent-card" noValidate onSubmit={handleSubmit}><div className="respondent-intro">{survey.cover && <img className="respondent-cover" src={survey.cover} alt="" />}<div className="eyebrow">{survey.category || 'A FORMly SURVEY'}</div><h1>{survey.title}</h1><p>{survey.description || 'We’d love to hear what you think. Your feedback helps us do better.'}</p></div>
        {!survey.anonymous && <div className="respondent-identity"><div className="identity-heading"><i className="bi bi-person-circle" /><span><strong>About you</strong><small>This survey collects your name and email.</small></span></div><label>Your name<input className="form-control answer-control" value={respondent.name} onChange={(event) => { setRespondent({ ...respondent, name: event.target.value }); setErrors({ ...errors, respondentName: '' }) }} placeholder="Your name" autoComplete="name" />{errors.respondentName && <span className="validation-message">{errors.respondentName}</span>}</label><label>Email address<input className="form-control answer-control" type="email" value={respondent.email} onChange={(event) => { setRespondent({ ...respondent, email: event.target.value }); setErrors({ ...errors, respondentEmail: '' }) }} placeholder="you@example.com" autoComplete="email" />{errors.respondentEmail && <span className="validation-message">{errors.respondentEmail}</span>}</label></div>}
        {!questions.length ? <div className="no-questions">This survey doesn’t have any questions yet. {preview ? 'Add questions in the editor to see them here.' : ''}</div> : <div className="respondent-question"><div className="respondent-question-heading"><h2>{currentQuestion.title}{currentQuestion.required && <span className="required-mark"> *</span>}</h2>{currentQuestion.description && <p>{currentQuestion.description}</p>}</div><QuestionRenderer question={currentQuestion} value={answers[page]} error={errors[page]} onChange={(value) => { setAnswers((prev) => ({ ...prev, [page]: value })); setErrors((prev) => ({ ...prev, [page]: '' })) }} /></div>}
        {errorMessage && <div className="validation-message">{errorMessage}</div>}<div className="respondent-footer"><span>{questions.length ? `${page + 1} of ${pageCount}` : 'Ready when you are'}</span><div>{page > 0 && <button type="button" className="btn btn-light-outline" onClick={() => setPage((value) => value - 1)}><i className="bi bi-arrow-left" /> Previous</button>}{questions.length && page < pageCount - 1 ? <button type="button" className="btn btn-primary-custom" onClick={() => { const error = validateAnswer(currentQuestion, answers[page]); setErrors({ ...errors, [page]: error }); if (!error) setPage((value) => value + 1) }}>Next <i className="bi bi-arrow-right" /></button> : <button type="submit" className="btn btn-primary-custom" disabled={!questions.length}>{preview ? 'Finish preview' : 'Submit survey'} <i className="bi bi-arrow-right" /></button>}</div></div>
      </form><div className="respondent-footer-brand">Made with a little <i className="bi bi-heart-fill" /> and Formly</div></div></div>
}
