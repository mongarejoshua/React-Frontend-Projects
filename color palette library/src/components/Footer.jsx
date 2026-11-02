export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="container footer-inner">
        <a className="navbar-brand brand-mark" href="#home"><span className="brand-icon"><i className="bi bi-palette2" /></span><span>color<span className="brand-light">maker</span></span></a>
        <span className="footer-note">A little more color in your day.</span>
        <div className="footer-links"><a href="#generator">Generator</a><a href="#presets">Palettes</a><a href="#about">About</a><a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><i className="bi bi-github" /></a><a href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="bi bi-instagram" /></a><a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X"><i className="bi bi-twitter-x" /></a></div>
        <span className="copyright">© {new Date().getFullYear()} Color Maker</span>
      </div>
    </footer>
  )
}
