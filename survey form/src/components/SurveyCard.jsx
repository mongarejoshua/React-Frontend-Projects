import { Link } from 'react-router-dom'
import { useState } from 'react'

const palette = ['peach', 'lavender', 'mint', 'blue']
const art = ['bi-chat-square-heart', 'bi-mortarboard', 'bi-people', 'bi-lightbulb']

export default function SurveyCard({ survey, index = 0, onDelete }) {
  const [copied, setCopied] = useState(false)
  const link = `${window.location.origin}/take/${survey.id}`
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 1800) }
    catch { window.prompt('Copy your survey link:', link) }
  }
  return <article className="survey-card">
    <div className={`survey-art ${palette[index % palette.length]}`}><i className={`bi ${art[index % art.length]}`} /><span className={`status-pill ${survey.status.toLowerCase()}`}><span />{survey.status}</span><button className="card-more" aria-label="More survey actions" onClick={() => copyLink()}><i className="bi bi-link-45deg" /></button></div>
    <div className="survey-card-body">
      <div className="survey-category">{survey.category || 'General'}</div><h3>{survey.title}</h3><p className="survey-description">{survey.description || 'Add a description to help respondents understand your survey.'}</p>
      <div className="survey-meta"><span><i className="bi bi-ui-checks" />{survey.questions.length} questions</span><span><i className="bi bi-chat-dots" />{survey.responses.length} responses</span></div>
      <div className="survey-card-footer"><small>Created {new Date(survey.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</small><div className="card-actions">
        <Link title="Edit survey" to={`/builder/${survey.id}`}><i className="bi bi-pencil" /></Link><Link title="Preview survey" to={`/preview/${survey.id}`}><i className="bi bi-eye" /></Link><button title={copied ? 'Copied!' : 'Copy survey link'} onClick={copyLink}><i className={`bi ${copied ? 'bi-check2' : 'bi-share'}`} /></button><button title="Delete survey" onClick={() => onDelete(survey.id)}><i className="bi bi-trash3" /></button>
      </div></div>
    </div>
  </article>
}
