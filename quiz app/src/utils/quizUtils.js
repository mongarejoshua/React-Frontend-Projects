export const shuffle = (items) => {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
};

export function getQuizQuestions(questionBank, { category, difficulty, count, type }) {
  const available = questionBank.filter((question) =>
    (!category || category === 'all' || question.category === category)
    && (!difficulty || difficulty === 'any' || question.difficulty === difficulty)
    && (!type || type === 'mixed' || question.type === type),
  );
  return shuffle(available)
    .slice(0, Math.min(Number(count) || 5, available.length))
    .map((question) => ({ ...question, options: shuffle(question.options) }));
}

export function scoreQuiz(questions, answers) {
  const correct = questions.reduce(
    (total, question) => total + (answers[question.id] === question.answer ? 1 : 0),
    0,
  );
  const unanswered = questions.filter((question) => !answers[question.id]).length;
  const percentage = questions.length ? Math.round((correct / questions.length) * 100) : 0;
  return { correct, unanswered, incorrect: questions.length - correct - unanswered, percentage };
}

export function getPerformanceMessage(percentage) {
  if (percentage >= 90) return 'Excellent!';
  if (percentage >= 75) return 'Great Job!';
  if (percentage >= 50) return 'Good Effort!';
  return 'Keep Practicing!';
}
