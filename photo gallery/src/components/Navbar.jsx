import { useState } from 'react';

const links = [
  ['Home', 'home'],
  ['Explore', 'gallery'],
  ['My Gallery', 'uploads'],
  ['Favourites', 'favorites'],
  ['Albums', 'albums'],
  ['About', 'about'],
];

export default function Navbar({ onNavigate, onUpload, onSearch }) {
  const [expanded, setExpanded] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = (section) => {
    onNavigate(section);
    setExpanded(false);
  };

  return (
    <nav className="navbar navbar-expand-lg gallery-nav">
      <div className="container">
        <a className="navbar-brand brand-mark" href="#home" onClick={() => navigate('home')}>
          <span className="brand-icon"><i className="bi bi-aperture" /></span>
          <span>PIXEL <strong>GALLERY</strong></span>
        </a>
        <button className="navbar-toggler" type="button" aria-label="Toggle navigation" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
          <i className={`bi ${expanded ? 'bi-x-lg' : 'bi-list'}`} />
        </button>
        <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}>
          <div className="navbar-nav mx-auto">
            {links.map(([label, section]) => (
              <button className="nav-link" key={section} onClick={() => navigate(section)}>{label}</button>
            ))}
          </div>
          <div className="nav-actions">
            {searchOpen && <input className="nav-search" aria-label="Search photos" placeholder="Search photos..." onChange={(event) => onSearch(event.target.value)} autoFocus />}
            <button className="icon-button search-toggle" aria-label="Search photos" onClick={() => setSearchOpen(!searchOpen)}><i className={`bi ${searchOpen ? 'bi-x-lg' : 'bi-search'}`} /></button>
            <button className="btn btn-dark upload-nav" onClick={onUpload}><i className="bi bi-plus-lg me-2" />Upload Photo</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
