import React from 'react';
import { categories } from '../data/categories.js';

function formatTime(seconds) {
  return `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
}

export default function QuizInterface({ session, currentIndex, setCurrentIndex, answers, setAnswers, remainingSeconds, onSubmit, onAnswer }) {
  const question = session.questions[currentIndex];
  const selectedCategory = categories.find((category) => category.id === session.category);
  const progress = ((currentIndex + 1) / session.questions.length) * 100;
  if (!question) return null;

  return (
    <section className="quiz-stage">
      <div className="quiz-topline"><button className="text-button" onClick={onSubmit}><i className="bi bi-arrow-left" /> Exit quiz</button><span className={`timer ${remainingSeconds <= 30 ? 'timer-warning' : ''}`}><i className="bi bi-stopwatch" /> {formatTime(remainingSeconds)}</span></div>
      <div className="quiz-progress-copy"><span>Question {currentIndex + 1} <span className="muted">of {session.questions.length}</span></span><span>{Math.round(progress)}% complete</span></div>
      <div className="progress quiz-progress" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"><div className="progress-bar" style={{ width: `${progress}%` }} /></div>
      <div className="question-card">
        <div className="question-tags"><span className={`category-icon small-icon ${selectedCategory?.color}`}><i className={`bi ${selectedCategory?.icon}`} /></span><span>{selectedCategory?.name}</span><span className="tag-dot">·</span><span className="capitalize">{question.difficulty}</span></div>
        <h1>{question.question}</h1>
        <p className="answer-prompt">Choose the best answer</p>
        <div className="answer-list">
          {question.options.map((option, index) => {
            const isSelected = answers[question.id] === option;
            return (
              <button key={option} className={`answer-option ${isSelected ? 'selected' : ''}`} aria-pressed={isSelected} onClick={() => { setAnswers((previous) => ({ ...previous, [question.id]: option })); onAnswer(); }}>
                <span className="answer-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span><span className="answer-check">{isSelected && <i className="bi bi-check2" />}</span>
              </button>
            );
          })}
        </div>
        <div className="quiz-controls">
          <button className="btn btn-outline-secondary" onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))} disabled={currentIndex === 0}><i className="bi bi-arrow-left" /> Previous</button>
          {currentIndex < session.questions.length - 1
            ? <button className="btn btn-primary" onClick={() => setCurrentIndex((index) => Math.min(session.questions.length - 1, index + 1))}>Next question <i className="bi bi-arrow-right" /></button>
            : <button className="btn btn-primary" onClick={onSubmit}>Submit quiz <i className="bi bi-check2" /></button>}
        </div>
      </div>
      <div className="quiz-footnote"><i className="bi bi-info-circle" /> Your answers are saved as you go. You can go back and change them anytime.</div>
    </section>
  );
}
