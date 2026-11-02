export default function Navbar({ darkMode, onToggleTheme }) {
  return (
    <nav className="navbar navbar-expand-lg app-navbar sticky-top">
      <div className="container">
        <a className="navbar-brand brand-mark" href="#home">
          <span className="brand-icon"><i className="bi bi-palette2" /></span>
          <span>color<span className="brand-light">maker</span></span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavigation" aria-controls="mainNavigation" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNavigation">
          <div className="navbar-nav mx-auto">
            <a className="nav-link" href="#home">Home</a>
            <a className="nav-link" href="#generator">Color generator</a>
            <a className="nav-link" href="#presets">Explore palettes</a>
            <a className="nav-link" href="#saved">My palettes</a>
            <a className="nav-link" href="#about">About</a>
          </div>
          <button className="theme-toggle" onClick={onToggleTheme} aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}>
            <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon-stars'}`} />
          </button>
        </div>
      </div>
    </nav>
  )
}
