import React from 'react';
import { categories } from '../data/categories.js';
import { getPerformanceMessage } from '../utils/quizUtils.js';

function formatTime(seconds) {
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

export default function Results({ result, onReview, onRetake, onHome }) {
  const category = categories.find((item) => item.id === result.category);
  return (
    <section className="results-screen">
      <div className="results-heading"><span className="eyebrow">QUIZ COMPLETE</span><h1>{getPerformanceMessage(result.percentage)}</h1><p>You showed up, stayed curious, and gave it your best.</p></div>
      <div className="results-card">
        <div className="score-visual" style={{ '--score': `${result.percentage}%` }}><div className="score-inner"><strong>{result.percentage}%</strong><span>your score</span></div></div>
        <div className="score-details"><span className="eyebrow">{category?.name || 'All subjects'} · {result.total} questions</span><h2>{result.correct} correct answers</h2><p>{result.percentage >= 75 ? 'You really know your stuff. Keep that momentum going!' : 'Every quiz is a chance to learn something new.'}</p>
          <div className="stats-grid">
            <div><span className="stat-number">{result.total}</span><span className="stat-label">Total</span></div>
            <div><span className="stat-number correct-text">{result.correct}</span><span className="stat-label">Correct</span></div>
            <div><span className="stat-number wrong-text">{result.incorrect}</span><span className="stat-label">Incorrect</span></div>
            <div><span className="stat-number">{result.unanswered}</span><span className="stat-label">Skipped</span></div>
          </div>
          <div className="time-spent"><i className="bi bi-stopwatch" /> Time taken: {formatTime(result.elapsedSeconds)} {result.timedOut && <span>· Time ran out</span>}</div>
        </div>
      </div>
      <div className="results-actions"><button className="btn btn-primary" onClick={onRetake}><i className="bi bi-arrow-repeat" /> Try another quiz</button><button className="btn btn-outline-secondary" onClick={onReview}><i className="bi bi-card-list" /> Review answers</button><button className="text-button" onClick={onHome}>Back to home <i className="bi bi-arrow-right" /></button></div>
    </section>
  );
}
