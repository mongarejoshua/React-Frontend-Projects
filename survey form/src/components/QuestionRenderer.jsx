export default function QuestionRenderer({ question, value, onChange, error, disabled = false }) {
  const common = { disabled, className: 'form-control answer-control', value: value ?? '', onChange: (event) => onChange(event.target.value) }
  let input
  switch (question.type) {
    case 'long': input = <textarea {...common} rows="4" placeholder="Type your answer here..." />; break
    case 'multiple':
    case 'yesno': {
      const options = question.type === 'yesno' ? ['Yes', 'No'] : question.options
      input = <div className="answer-options">{options.map((option) => <label className="choice-row" key={option}><input type="radio" name={question.id} checked={value === option} disabled={disabled} onChange={() => onChange(option)} /><span>{option}</span></label>)}</div>
      break
    }
    case 'checkboxes': input = <div className="answer-options">{question.options.map((option) => <label className="choice-row" key={option}><input type="checkbox" checked={(value || []).includes(option)} disabled={disabled} onChange={(event) => onChange(event.target.checked ? [...(value || []), option] : (value || []).filter((item) => item !== option))} /><span>{option}</span></label>)}</div>; break
    case 'dropdown': input = <select {...common}><option value="">Choose an option</option>{question.options.map((option) => <option key={option}>{option}</option>)}</select>; break
    case 'linear': input = <div className="scale-options"><span>{question.scale === 10 ? '1' : '1'}</span>{Array.from({ length: question.scale || 5 }, (_, i) => <button type="button" className={Number(value) === i + 1 ? 'selected' : ''} key={i} disabled={disabled} onClick={() => onChange(i + 1)}>{i + 1}</button>)}<span>{question.scale || 5}</span></div>; break
    case 'rating': input = <div className="star-options" role="radiogroup" aria-label={question.title}>{Array.from({ length: question.scale || 5 }, (_, i) => <button type="button" aria-label={`${i + 1} stars`} className={Number(value) >= i + 1 ? 'selected' : ''} key={i} disabled={disabled} onClick={() => onChange(i + 1)}><i className={`bi ${Number(value) >= i + 1 ? 'bi-star-fill' : 'bi-star'}`} /></button>)}</div>; break
    case 'date': input = <input {...common} type="date" />; break
    case 'email': input = <input {...common} type="email" placeholder="you@example.com" />; break
    case 'phone': input = <input {...common} type="tel" placeholder="+1 (555) 000-0000" />; break
    default: input = <input {...common} type="text" placeholder="Type your answer here..." />
  }
  return <div className="question-input">{input}{error && <div className="validation-message"><i className="bi bi-exclamation-circle" />{error}</div>}</div>
}
