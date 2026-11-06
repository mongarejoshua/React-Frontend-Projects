import React from 'react';
import { questions } from '../data/questions.js';

export default function QuizSelection({ categories, settings, onChange, onStart }) {
  const availableCount = questions.filter((question) =>
    (settings.category === 'all' || question.category === settings.category)
    && (settings.difficulty === 'any' || question.difficulty === settings.difficulty)
    && (settings.type === 'mixed' || question.type === settings.type),
  ).length;
  const countOptions = [5, 10, 15, 20].filter((count) => count <= availableCount);
  if (availableCount > 0 && countOptions.length === 0) countOptions.push(availableCount);

  return (
    <div className="selection-panel">
      <div className="panel-heading"><span className="eyebrow">MAKE IT YOURS</span><h2>Set up your quiz</h2></div>
      <div className="row g-3">
        <div className="col-12">
          <label className="form-label" htmlFor="quiz-category">Choose a subject</label>
          <select className="form-select" id="quiz-category" value={settings.category} onChange={(event) => onChange({ ...settings, category: event.target.value })}>
            <option value="all">Surprise me — all subjects</option>
            {categories.map((category) => <option value={category.id} key={category.id}>{category.name}</option>)}
          </select>
        </div>
        <div className="col-6">
          <label className="form-label" htmlFor="quiz-difficulty">Difficulty</label>
          <select className="form-select" id="quiz-difficulty" value={settings.difficulty} onChange={(event) => onChange({ ...settings, difficulty: event.target.value })}>
            <option value="any">Any level</option><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>
          </select>
        </div>
        <div className="col-6">
          <label className="form-label" htmlFor="quiz-count">Questions</label>
          <select className="form-select" id="quiz-count" value={countOptions.includes(settings.count) ? settings.count : (countOptions[countOptions.length - 1] ?? '')} onChange={(event) => onChange({ ...settings, count: Number(event.target.value) })}>
            {countOptions.length
              ? countOptions.map((count) => <option value={count} key={count}>{count} questions</option>)
              : <option value="" disabled>No matching questions</option>}
          </select>
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="quiz-type">Question type</label>
          <select className="form-select" id="quiz-type" value={settings.type} onChange={(event) => onChange({ ...settings, type: event.target.value })}>
            <option value="mixed">Mixed questions</option><option value="multiple-choice">Multiple choice</option><option value="true-false">True or false</option>
          </select>
        </div>
        <div className="col-12 selection-note"><i className="bi bi-clock" /> 30 seconds per question <span>·</span> {availableCount} {availableCount === 1 ? 'question' : 'questions'} available</div>
        <div className="col-12"><button className="btn btn-primary w-100 btn-start" onClick={onStart} disabled={availableCount === 0}>Start quiz <i className="bi bi-arrow-up-right" /></button></div>
      </div>
    </div>
  );
}
