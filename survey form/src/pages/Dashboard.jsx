import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useSurveys } from '../context/SurveyContext'
import StatCard from '../components/StatCard'
import SurveyCard from '../components/SurveyCard'
import EmptyState from '../components/EmptyState'

export default function Dashboard({ surveysPage = false }) {
  const { surveys, createSurvey, deleteSurvey, setNotice } = useSurveys()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const active = surveys.filter((survey) => survey.status === 'Active')
  const totalResponses = surveys.reduce((sum, survey) => sum + survey.responses.length, 0)
  const completedResponses = surveys.reduce((sum, survey) => sum + survey.responses.filter((response) => survey.questions.every((_, index) => {
    const answer = response.answers[index]
    return answer !== undefined && answer !== '' && (!Array.isArray(answer) || answer.length > 0)
  })).length, 0)
  const completionRate = totalResponses ? `${Math.round(completedResponses / totalResponses * 100)}%` : '—'
  const sortedSurveys = [...surveys].sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
  const visibleSurveys = sortedSurveys.filter((survey) => survey.title.toLowerCase().includes(query.toLowerCase()))
  const activity = Array.from({ length: 7 }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() - 6 + index)
    const count = surveys.reduce((sum, survey) => sum + survey.responses.filter((response) => new Date(response.submittedAt).toDateString() === date.toDateString()).length, 0)
    return { day: date.toLocaleDateString(undefined, { weekday: 'short' }), responses: count }
  })
  const remove = (id) => {
    if (window.confirm('Delete this survey and all its responses? This cannot be undone.')) {
      deleteSurvey(id)
      setNotice('Survey deleted.')
    }
  }
  const startSurvey = () => navigate(`/builder/${createSurvey().id}`)
  if (surveysPage) return <div className="page-content"><div className="page-heading"><div><div className="eyebrow">YOUR WORKSPACE</div><h1>My surveys</h1><p>All your questions, all in one place.</p></div><button className="btn btn-primary-custom" onClick={startSurvey}><i className="bi bi-plus-lg" /> Create survey</button></div><div className="survey-toolbar"><div className="search-field"><i className="bi bi-search" /><input value={query} placeholder="Search surveys..." onChange={(event) => setQuery(event.target.value)} /></div><span>{visibleSurveys.length} of {surveys.length} surveys</span></div>{visibleSurveys.length ? <div className="row g-4">{visibleSurveys.map((survey, index) => <div className="col-xl-4 col-md-6" key={survey.id}><SurveyCard survey={survey} index={index} onDelete={remove} /></div>)}</div> : <EmptyState title={query ? 'No surveys found' : 'Your next great idea starts here'} description={query ? 'Try another search.' : 'Create a survey and start collecting the feedback that moves you forward.'} action={!query && <button className="btn btn-primary-custom" onClick={startSurvey}>Create a survey</button>} />}</div>
  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase()
  return <div className="page-content"><div className="welcome-row"><div><div className="eyebrow">{today}</div><h1>Good morning, Jordan <span className="wave">✳</span></h1><p>Here’s what’s happening with your surveys today.</p></div><button className="btn btn-primary-custom" onClick={startSurvey}><i className="bi bi-plus-lg" /> Create survey</button></div>
    <div className="stats-grid"><StatCard label="Total surveys" value={surveys.length} note="Across your workspace" icon="bi-ui-checks-grid" tone="orange" /><StatCard label="Active surveys" value={active.length} note="Collecting responses now" icon="bi-broadcast" tone="green" /><StatCard label="Total responses" value={totalResponses} note="All-time submissions" icon="bi-chat-square-text" tone="purple" /><StatCard label="Completion rate" value={completionRate} note="Across all responses" icon="bi-check2-circle" tone="blue" /></div>
    <div className="dashboard-grid"><section className="panel activity-panel"><div className="panel-heading"><div><h2>Response activity</h2><p>A little feedback goes a long way</p></div><span className="time-select">Last 7 days <i className="bi bi-chevron-down" /></span></div><div className="chart-area"><ResponsiveContainer width="100%" height="100%"><AreaChart data={activity} margin={{ left: -20, right: 6, top: 10 }}><defs><linearGradient id="responseFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ff7046" stopOpacity={0.19} /><stop offset="100%" stopColor="#ff7046" stopOpacity={0.01} /></linearGradient></defs><CartesianGrid vertical={false} stroke="#eef0f4" /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9299a7', fontSize: 12 }} /><YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: '#9299a7', fontSize: 12 }} /><Tooltip /><Area type="monotone" dataKey="responses" stroke="#ff7046" strokeWidth={2.5} fill="url(#responseFill)" /></AreaChart></ResponsiveContainer></div></section>
      <section className="panel quick-panel"><div className="panel-heading"><div><h2>Quick actions</h2><p>Good things start small</p></div></div><Link to="/builder/new" className="quick-action"><span className="quick-icon orange"><i className="bi bi-plus-square" /></span><span><strong>Start a new survey</strong><small>Make a fresh start</small></span><i className="bi bi-arrow-up-right" /></Link><Link to="/responses" className="quick-action"><span className="quick-icon purple"><i className="bi bi-inboxes" /></span><span><strong>Explore responses</strong><small>Hear what people think</small></span><i className="bi bi-arrow-up-right" /></Link><Link to="/analytics" className="quick-action"><span className="quick-icon green"><i className="bi bi-bar-chart" /></span><span><strong>View insights</strong><small>Find your next move</small></span><i className="bi bi-arrow-up-right" /></Link></section></div>
    <div className="section-row"><div><h2>Recent surveys</h2><p>Your latest work, at a glance.</p></div><Link to="/surveys">View all <i className="bi bi-arrow-right" /></Link></div>{surveys.length ? <div className="row g-4">{sortedSurveys.slice(0, 3).map((survey, index) => <div className="col-xl-4 col-md-6" key={survey.id}><SurveyCard survey={survey} index={index} onDelete={remove} /></div>)}</div> : <EmptyState title="It’s a blank canvas" description="Create your first survey to start collecting responses." action={<Link className="btn btn-primary-custom" to="/builder/new">Create survey</Link>} />}
  </div>
}
