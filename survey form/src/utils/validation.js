export function validateAnswer(question, answer) {
  const empty = answer === undefined || answer === null || answer === '' || (Array.isArray(answer) && answer.length === 0)
  if (question.required && empty) return 'This question is required.'
  if (empty) return ''
  if (question.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(answer))) return 'Enter a valid email address.'
  if (question.type === 'phone' && !/^[+]?[\d\s().-]{7,20}$/.test(String(answer))) return 'Enter a valid phone number.'
  return ''
}
