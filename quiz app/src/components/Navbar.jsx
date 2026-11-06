import React from 'react';

export default function Navbar({ theme, onToggleTheme, historyCount, onNavigate }) {
  return (
    <nav className="navbar navbar-expand-lg app-nav">
      <div className="container">
        <a className="navbar-brand brand" href="#home" onClick={() => onNavigate('home')}>
          <span className="brand-mark"><i className="bi bi-lightning-charge-fill" /></span>
          <span>QUIZ<span className="brand-light">MASTER</span></span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <div className="navbar-nav mx-auto">
            <a className="nav-link" href="#home" onClick={() => onNavigate('home')}>Home</a>
            <a className="nav-link" href="#explore" onClick={() => onNavigate('explore')}>Explore quizzes</a>
            <a className="nav-link" href="#categories" onClick={() => onNavigate('categories')}>Categories</a>
            <a className="nav-link" href="#results" onClick={() => onNavigate('results')}>My results <span className="nav-count">{historyCount}</span></a>
            <a className="nav-link" href="#about" onClick={() => onNavigate('about')}>About</a>
          </div>
          <button className="theme-toggle" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            <i className={`bi ${theme === 'light' ? 'bi-moon-stars' : 'bi-sun'}`} />
          </button>
        </div>
      </div>
    </nav>
  );
}
