import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import QuizSelection from './components/QuizSelection.jsx';
import QuizInterface from './components/QuizInterface.jsx';
import Results from './components/Results.jsx';
import AnswerReview from './components/AnswerReview.jsx';
import Toast from './components/Toast.jsx';
import { categories } from './data/categories.js';
import { questions } from './data/questions.js';
import { getFavorites, getTheme, saveFavorites, saveTheme } from './utils/storageUtils.js';
import { useQuiz } from './hooks/useQuiz.js';

const defaultSettings = { category: 'general', difficulty: 'any', count: 5, type: 'mixed' };

function App() {
  const quiz = useQuiz();
  const [settings, setSettings] = useState(defaultSettings);
  const [theme, setTheme] = useState(getTheme);
  const [favorites, setFavorites] = useState(getFavorites);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');
  const [reviewing, setReviewing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const notify = useCallback((message) => setToast(message), []);
  useEffect(() => {
    if (quiz.result?.timedOut) notify('Time is up. Your results have been generated.');
  }, [quiz.result, notify]);
  const filteredCategories = useMemo(() => categories.filter((category) => {
    const term = search.trim().toLowerCase();
    return (!term || category.name.toLowerCase().includes(term) || category.description.toLowerCase().includes(term))
      && (activeFilter === 'all' || (activeFilter === 'favorites' ? favorites.includes(category.id) : category.id === activeFilter));
  }), [activeFilter, favorites, search]);

  const navigate = (id) => {
    if (id === 'results' && quiz.result) {
      setReviewing(false);
      document.getElementById('results-view')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (id === 'results') {
      document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    saveTheme(next);
  };

  const startQuiz = (overrides = {}) => {
    const nextSettings = { ...settings, ...overrides };
    const started = quiz.startQuiz(nextSettings);
    if (!started) {
      notify('No questions match those settings. Try a different difficulty or type.');
      return;
    }
    setSettings(nextSettings);
    setReviewing(false);
    notify('Your quiz is ready. Good luck!');
    window.setTimeout(() => document.getElementById('quiz-view')?.scrollIntoView({ behavior: 'smooth' }), 40);
  };

  const toggleFavorite = (categoryId) => {
    const updated = favorites.includes(categoryId) ? favorites.filter((id) => id !== categoryId) : [...favorites, categoryId];
    setFavorites(updated);
    saveFavorites(updated);
    notify(updated.includes(categoryId) ? 'Added to your favorites.' : 'Removed from your favorites.');
  };

  const dailyCategory = categories[(new Date().getDate() - 1) % categories.length];
  const totalQuizzes = categories.length * 3;
  const average = quiz.history.length ? Math.round(quiz.history.reduce((sum, item) => sum + item.percentage, 0) / quiz.history.length) : 0;
  const best = quiz.history.length ? Math.max(...quiz.history.map((item) => item.percentage)) : 0;
  const dailyStarted = () => startQuiz({ category: dailyCategory.id, difficulty: 'any', count: 5, type: 'mixed' });

  return (
    <div className={`app-shell theme-${theme}`}>
      <Navbar theme={theme} onToggleTheme={toggleTheme} historyCount={quiz.history.length} onNavigate={navigate} />
      {quiz.session ? (
        <main className="container quiz-container" id="quiz-view">
          <QuizInterface
            session={quiz.session}
            currentIndex={quiz.currentIndex}
            setCurrentIndex={quiz.setCurrentIndex}
            answers={quiz.answers}
            setAnswers={quiz.setAnswers}
            remainingSeconds={quiz.remainingSeconds}
            onSubmit={() => { quiz.finishQuiz(); notify('Quiz submitted. Your results are ready!'); }}
            onAnswer={() => notify('Answer saved. You can change it before submitting.')}
          />
        </main>
      ) : quiz.result && !reviewing ? (
        <main className="container results-container" id="results-view">
          <Results
            result={quiz.result}
            onReview={() => { setReviewing(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            onRetake={() => { quiz.setResult(null); startQuiz(); }}
            onHome={() => { quiz.setResult(null); setReviewing(false); navigate('home'); }}
          />
        </main>
      ) : reviewing && quiz.result ? (
        <main className="container review-container" id="results-view">
          <AnswerReview result={quiz.result} onBack={() => { setReviewing(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
        </main>
      ) : (
        <>
          <main>
            <section className="hero-section" id="home">
              <div className="container hero-grid">
                <div className="hero-copy">
                  <div className="hero-badge"><span className="badge-spark"><i className="bi bi-stars" /></span> LEARN SOMETHING NEW TODAY</div>
                  <h1>Challenge your knowledge.<br /><span>Discover your potential.</span></h1>
                  <p>Test your knowledge, explore exciting topics, and improve your skills through interactive quizzes.</p>
                  <div className="hero-actions"><button className="btn btn-primary btn-lg" onClick={() => { navigate('explore'); }}>Start a quiz <i className="bi bi-arrow-up-right" /></button><button className="btn btn-quiet btn-lg" onClick={() => navigate('categories')}>Explore categories <i className="bi bi-arrow-down" /></button></div>
                  <div className="hero-proof"><div className="avatar-stack"><span>✦</span><span>Q</span><span>+</span></div><div><strong>Made for curious minds</strong><small>Pick a topic. Find your spark.</small></div></div>
                </div>
                <div className="hero-art" aria-label="Quiz Master learning illustration">
                  <div className="art-glow" /><div className="orbit orbit-one" /><div className="orbit orbit-two" />
                  <div className="floating-chip chip-one"><i className="bi bi-lightbulb" /> Keep learning</div>
                  <div className="floating-chip chip-two"><i className="bi bi-check2-circle" /> You got this!</div>
                  <div className="hero-quiz-card">
                    <div className="mini-card-top"><span className="mini-logo"><i className="bi bi-lightning-charge-fill" /></span><span className="mini-dots">•••</span></div>
                    <span className="mini-label">QUICK BRAIN BREAK</span><div className="mini-question">Which planet is<br />known as the<br /><b>Red Planet?</b></div>
                    <div className="mini-answer mini-active"><span>A</span> Venus <i className="bi bi-check-circle-fill" /></div>
                    <div className="mini-answer"><span>B</span> Mars</div><div className="mini-answer"><span>C</span> Jupiter</div>
                    <div className="mini-progress"><span /></div>
                  </div>
                  <span className="art-spark spark-a">✳</span><span className="art-spark spark-b">✦</span><span className="art-spark spark-c">✧</span>
                </div>
              </div>
              <div className="container hero-stats"><div><strong>{totalQuizzes}+</strong><span>Curated quizzes</span></div><div><strong>{questions.length}</strong><span>Questions to explore</span></div><div><strong>10</strong><span>Topics to dive into</span></div><div className="stats-caption">A little curiosity goes a long way <i className="bi bi-arrow-up-right" /></div></div>
            </section>

            <section className="explore-section section-space" id="explore">
              <div className="container explore-grid">
                <div className="section-intro"><span className="eyebrow">YOUR NEXT BRAIN BREAK</span><h2>Ready when<br />you are.</h2><p>Choose your topic and make this quiz your own. No pressure, just progress.</p>
                  <div className="explore-micro"><i className="bi bi-shuffle" /> Every quiz is a little different</div>
                </div>
                <QuizSelection categories={categories} settings={settings} onChange={setSettings} onStart={() => startQuiz()} />
              </div>
            </section>

            <section className="category-section section-space" id="categories">
              <div className="container">
                <div className="section-heading-row"><div><span className="eyebrow">FIND YOUR THING</span><h2>Explore by category</h2><p>From quick facts to deep dives, there’s something for every curious mind.</p></div><button className="text-button categories-link" onClick={() => { setActiveFilter('all'); navigate('categories'); }}>All subjects <i className="bi bi-arrow-right" /></button></div>
                <div className="search-and-filter"><div className="search-box"><i className="bi bi-search" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search quizzes or topics..." aria-label="Search quizzes or topics" />{search && <button onClick={() => setSearch('')} aria-label="Clear search"><i className="bi bi-x" /></button>}</div>
                  <select className="form-select category-filter" value={activeFilter} onChange={(event) => setActiveFilter(event.target.value)} aria-label="Filter quiz categories"><option value="all">All categories</option><option value="favorites">My favorites</option>{categories.map((category) => <option value={category.id} key={category.id}>{category.name}</option>)}</select>
                </div>
                {filteredCategories.length ? <div className="category-grid">{filteredCategories.map((category) => {
                  const amount = questions.filter((question) => question.category === category.id).length;
                  const favorite = favorites.includes(category.id);
                  return <article className="category-card" key={category.id}><div className="category-card-top"><span className={`category-icon ${category.color}`}><i className={`bi ${category.icon}`} /></span><button className={`favorite-btn ${favorite ? 'is-favorite' : ''}`} onClick={() => toggleFavorite(category.id)} aria-label={`${favorite ? 'Remove' : 'Add'} ${category.name} ${favorite ? 'from' : 'to'} favorites`}><i className={`bi ${favorite ? 'bi-heart-fill' : 'bi-heart'}`} /></button></div><h3>{category.name}</h3><p>{category.description}</p><div className="category-card-bottom"><span>{amount} questions</span><button onClick={() => startQuiz({ category: category.id })}>Start <i className="bi bi-arrow-up-right" /></button></div></article>;
                })}</div> : <div className="empty-state"><i className="bi bi-search" /><h3>No topics found</h3><p>Try a different search or category filter.</p><button className="btn btn-outline-secondary" onClick={() => { setSearch(''); setActiveFilter('all'); }}>Clear filters</button></div>}
              </div>
            </section>

            <section className="daily-section section-space">
              <div className="container">
                <div className="daily-card"><div className="daily-copy"><span className="eyebrow">YOUR DAILY MOMENT OF CURIOSITY</span><h2>A fresh challenge.<br /><span>A new little win.</span></h2><p>Take five questions in today’s featured subject. A small step that adds up to a lot.</p><button className="btn btn-primary" onClick={dailyStarted}>Take today’s challenge <i className="bi bi-arrow-right" /></button><small><i className="bi bi-arrow-repeat" /> New subject every day</small></div><div className="daily-art"><div className="daily-date"><i className={`bi ${dailyCategory.icon}`} /><span>FEATURED TODAY</span><strong>{dailyCategory.name}</strong><small>5 questions · about 3 minutes</small></div><span className="daily-star star-one">✦</span><span className="daily-star star-two">✧</span><span className="daily-circle circle-one" /><span className="daily-circle circle-two" /></div></div>
              </div>
            </section>

            <section className="dashboard-section section-space" id="results">
              <div className="container">
                <div className="section-heading-row"><div><span className="eyebrow">YOUR PERSONAL PROGRESS</span><h2>Look how far you’ve come.</h2><p>Your activity is saved privately on this device.</p></div><span className="local-badge"><i className="bi bi-lock" /> Your personal dashboard</span></div>
                <div className="dashboard-grid" id="dashboard">
                  <div className="dashboard-stat"><span className="dash-icon blue"><i className="bi bi-journal-check" /></span><strong>{quiz.history.length}</strong><span>Quizzes completed</span></div>
                  <div className="dashboard-stat"><span className="dash-icon violet"><i className="bi bi-graph-up-arrow" /></span><strong>{average}%</strong><span>Average score</span></div>
                  <div className="dashboard-stat"><span className="dash-icon green"><i className="bi bi-trophy" /></span><strong>{best}%</strong><span>Personal best</span></div>
                  <div className="history-card"><div className="history-title"><h3>Recent attempts</h3><span>Local activity</span></div>{quiz.history.length ? <div className="history-list">{quiz.history.slice(0, 5).map((attempt) => {
                    const category = categories.find((item) => item.id === attempt.category);
                    return <div className="history-row" key={attempt.id}><span className={`history-icon ${category?.color || 'violet'}`}><i className={`bi ${category?.icon || 'bi-globe2'}`} /></span><div className="history-info"><strong>{category?.name || 'All subjects'}</strong><small>{new Date(attempt.completedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} · {attempt.correct}/{attempt.total} correct</small></div><span className={`history-score ${attempt.percentage >= 75 ? 'correct-text' : ''}`}>{attempt.percentage}%</span></div>;
                  })}</div> : <div className="history-empty"><i className="bi bi-bar-chart" /><p>Your quiz journey starts here.</p><button className="text-button" onClick={() => navigate('explore')}>Take your first quiz <i className="bi bi-arrow-right" /></button></div>}</div>
                </div>
              </div>
            </section>

            <section className="leaderboard-section section-space">
              <div className="container"><div className="leaderboard-card"><div><span className="eyebrow">A LITTLE FRIENDLY MOTIVATION</span><h2>Keep your curiosity<br />in good company.</h2><p>This is a demo leaderboard using example scores. Your real results stay right here on your device.</p><span className="demo-label"><i className="bi bi-info-circle" /> Example data · not global rankings</span></div><div className="leaderboard-list"><div className="leader-row"><span className="leader-rank gold-rank">01</span><span className="leader-avatar avatar-purple">AM</span><strong>Alex Morgan <small>Science explorer</small></strong><span className="leader-score">98%</span></div><div className="leader-row"><span className="leader-rank silver-rank">02</span><span className="leader-avatar avatar-blue">JK</span><strong>Jamie Kim <small>History enthusiast</small></strong><span className="leader-score">94%</span></div><div className="leader-row"><span className="leader-rank bronze-rank">03</span><span className="leader-avatar avatar-orange">SR</span><strong>Sam Rivera <small>Number cruncher</small></strong><span className="leader-score">91%</span></div><div className="leader-row your-row"><span className="leader-rank">—</span><span className="leader-avatar avatar-self"><i className="bi bi-person" /></span><strong>You <small>{quiz.history.length ? 'Your local score' : 'Your spot is waiting'}</small></strong><span className="leader-score">{quiz.history.length ? `${best}%` : '—'}</span></div></div></div></div>
            </section>

            <section className="about-section" id="about"><div className="container about-inner"><span className="brand-mark"><i className="bi bi-lightning-charge-fill" /></span><div><span className="eyebrow">A NOTE FROM QUIZ MASTER</span><h2>Learning should feel like<br />opening a new door.</h2><p>Quiz Master is a small space for big curiosity. No grades, no pressure — just good questions and the joy of knowing a little more than yesterday.</p></div><button className="btn btn-outline-secondary" onClick={() => navigate('explore')}>Find your next quiz <i className="bi bi-arrow-up-right" /></button></div></section>
          </main>
          <footer className="app-footer"><div className="container"><a className="brand footer-brand" href="#home"><span className="brand-mark"><i className="bi bi-lightning-charge-fill" /></span><span>QUIZ<span className="brand-light">MASTER</span></span></a><span>Made for curious minds, everywhere.</span><span>© {new Date().getFullYear()} Quiz Master</span></div></footer>
        </>
      )}
      <Toast message={toast} onClose={() => setToast('')} />
    </div>
  );
}

export default App;
