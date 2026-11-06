function csvCell(value) {
  const text = Array.isArray(value) ? value.join('; ') : String(value ?? '')
  return `"${text.replaceAll('"', '""')}"`
}

export function exportResponses(survey) {
  const headings = ['Submitted at', ...(survey.anonymous ? [] : ['Respondent name', 'Respondent email']), ...survey.questions.map((question) => question.title)]
  const rows = survey.responses.map((response) => [
    new Date(response.submittedAt).toLocaleString(),
    ...(!survey.anonymous ? [response.respondent?.name, response.respondent?.email] : []),
    ...survey.questions.map((_, index) => response.answers[index]),
  ])
  const csv = [headings, ...rows].map((row) => row.map(csvCell).join(',')).join('\r\n')
  const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' }))
  const link = document.createElement('a')
  link.href = url
  link.download = `${survey.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-responses.csv`
  link.click()
  URL.revokeObjectURL(url)
}
