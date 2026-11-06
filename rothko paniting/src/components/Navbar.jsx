export default function Navbar({ darkMode, onToggleTheme }) {
  return (
    <nav className="studio-nav navbar navbar-expand-lg">
      <div className="container-fluid studio-container">
        <a className="navbar-brand brand-lockup" href="#home" aria-label="Rothko Studio home">
          <span className="brand-mark"><span /><span /></span>
          <span>ROTHKO <em>STUDIO</em></span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#studioNav" aria-controls="studioNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="studioNav">
          <div className="navbar-nav mx-auto">
            <a className="nav-link" href="#home">Home</a>
            <a className="nav-link" href="#studio">Create painting</a>
            <a className="nav-link" href="#gallery">Gallery</a>
            <a className="nav-link" href="#about">About</a>
          </div>
          <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={`Switch to ${darkMode ? 'light' : 'dark'} theme`}>
            <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon-stars'}`} /> <span>{darkMode ? 'Light' : 'Dark'} mode</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
