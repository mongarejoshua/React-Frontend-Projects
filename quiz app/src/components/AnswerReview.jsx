import React from 'react';

export default function AnswerReview({ result, onBack }) {
  return (
    <section className="review-section">
      <div className="review-header"><div><span className="eyebrow">LEARN FROM EVERY QUESTION</span><h1>Answer review</h1><p>Here’s how you did, with a little explanation for each one.</p></div><button className="btn btn-outline-secondary" onClick={onBack}><i className="bi bi-arrow-left" /> Results</button></div>
      <div className="review-list">
        {result.questions.map((question, index) => {
          const chosen = result.answers[question.id];
          const isCorrect = chosen === question.answer;
          return (
            <article className={`review-card ${isCorrect ? 'review-correct' : chosen ? 'review-incorrect' : 'review-unanswered'}`} key={question.id}>
              <div className="review-number">QUESTION {String(index + 1).padStart(2, '0')} <span className={`review-status ${isCorrect ? 'correct-text' : chosen ? 'wrong-text' : ''}`}><i className={`bi ${isCorrect ? 'bi-check-circle-fill' : chosen ? 'bi-x-circle-fill' : 'bi-dash-circle'}`} /> {isCorrect ? 'Correct' : chosen ? 'Incorrect' : 'Unanswered'}</span></div>
              <h2>{question.question}</h2>
              <div className="review-answer-lines"><div><span>Your answer</span><strong>{chosen || 'No answer selected'}</strong></div><div><span>Correct answer</span><strong className="correct-text">{question.answer}</strong></div></div>
              <p className="explanation"><i className="bi bi-lightbulb" /> {question.explanation}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
