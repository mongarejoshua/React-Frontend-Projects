import { useState } from 'react'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="site-nav navbar navbar-expand-lg" aria-label="Main navigation">
      <div className="container">
        <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
          <span className="brand-icon" aria-hidden="true"><i className="bi bi-camera-fill" /></span>
          <span>cat <span className="brand-light">gallery</span></span>
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'}`} aria-hidden="true" />
        </button>
        <div id="primary-navigation" className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          {links.map(({ label, href }) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a className="nav-favorites" href="#gallery" onClick={() => setMenuOpen(false)}>
            <i className="bi bi-heart-fill" aria-hidden="true" /> Made with love
          </a>
        </div>
      </div>
    </nav>
  )
}
