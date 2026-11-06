import { useMemo, useState } from 'react'
import { useSurveys } from '../context/SurveyContext'
import { exportResponses } from '../utils/exportCSV'
import EmptyState from '../components/EmptyState'

export default function Responses() {
  const { surveys, updateSurvey, setNotice } = useSurveys()
  const [surveyId, setSurveyId] = useState('all')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const items = useMemo(() => surveys.filter((survey) => surveyId === 'all' || survey.id === surveyId).flatMap((survey) => survey.responses.map((response) => ({ survey, response }))).filter(({ survey, response }) => `${survey.title} ${response.respondent?.name || ''} ${response.respondent?.email || ''} ${Object.values(response.answers).flat().join(' ')}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => new Date(b.response.submittedAt) - new Date(a.response.submittedAt)), [surveys, surveyId, query])
  const onDelete = (survey, response) => {
    if (window.confirm('Delete this response? This cannot be undone.')) {
      updateSurvey(survey.id, { responses: survey.responses.filter((item) => item.id !== response.id) })
      if (selected?.response.id === response.id) setSelected(null)
      setNotice('Response deleted.')
    }
  }
  const selectedSurvey = selected?.survey
  return <div className="page-content"><div className="page-heading"><div><div className="eyebrow">LISTEN CLOSELY</div><h1>Responses</h1><p>Every answer is a chance to do something better.</p></div><div className="response-toolbar"><select value={surveyId} onChange={(event) => setSurveyId(event.target.value)}><option value="all">All surveys</option>{surveys.map((survey) => <option value={survey.id} key={survey.id}>{survey.title}</option>)}</select>{surveyId !== 'all' && <button className="btn btn-light-outline" onClick={() => { const survey = surveys.find((item) => item.id === surveyId); if (survey) exportResponses(survey) }}><i className="bi bi-download" /> Export CSV</button>}</div></div>
    <div className="response-summary"><span><strong>{items.length}</strong> {items.length === 1 ? 'response' : 'responses'}</span><div className="search-field"><i className="bi bi-search" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search answers..." /></div></div>
    {items.length ? <div className="panel responses-table-wrap"><table className="responses-table"><thead><tr><th>Survey</th><th>Respondent</th><th>Response preview</th><th>Submitted</th><th>Actions</th></tr></thead><tbody>{items.map(({ survey, response }) => <tr key={response.id}><td><strong>{survey.title}</strong><small>{survey.category}</small></td><td>{response.respondent ? <><strong>{response.respondent.name}</strong><small>{response.respondent.email}</small></> : survey.anonymous ? 'Anonymous' : 'Not provided'}</td><td>{Object.values(response.answers).flat().filter(Boolean).slice(0, 2).join(' · ') || 'No text answer'}</td><td>{new Date(response.submittedAt).toLocaleString()}</td><td><button className="table-action" onClick={() => setSelected({ survey, response })}>View <i className="bi bi-arrow-up-right" /></button><button className="table-delete" aria-label="Delete response" onClick={() => onDelete(survey, response)}><i className="bi bi-trash3" /></button></td></tr>)}</tbody></table></div> : <EmptyState title={query ? 'No matching responses' : 'Nothing to see just yet'} description={query ? 'Try another search or choose a different survey.' : 'Responses will appear here as soon as people start sharing their thoughts.'} />}
    {selected && selectedSurvey && <div className="modal-backdrop-custom" role="presentation" onClick={() => setSelected(null)}><div className="response-modal" role="dialog" aria-modal="true" aria-label="Response details" onClick={(event) => event.stopPropagation()}><div className="modal-heading"><div><span className="eyebrow">RESPONSE DETAIL</span><h2>{selectedSurvey.title}</h2></div><button className="icon-button" onClick={() => setSelected(null)} aria-label="Close"><i className="bi bi-x-lg" /></button></div><p className="response-modal-date"><i className="bi bi-clock" /> Submitted {new Date(selected.response.submittedAt).toLocaleString()}</p>{selected.response.respondent && <div className="response-detail-item"><span>Respondent</span><p>{selected.response.respondent.name} · {selected.response.respondent.email}</p></div>}{selectedSurvey.questions.map((question, index) => <div className="response-detail-item" key={question.id}><span>{question.title}</span><p>{Array.isArray(selected.response.answers[index]) ? selected.response.answers[index].join(', ') : selected.response.answers[index] || <em>No answer</em>}</p></div>)}<button className="btn btn-light-outline" onClick={() => setSelected(null)}>Close</button></div></div>}
  </div>
}
