import { useState } from 'react'

function Navbar({ cartCount, onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg container" aria-label="Main navigation">
        <a className="navbar-brand brand-lockup" href="#home" onClick={closeMenu}>
          <span className="brand-mark"><i className="bi bi-cup-hot-fill" /></span>
          <span className="brand-name">The Daily<span>Grind</span></span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'}`} />
        </button>
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {[['Home', '#home'], ['Menu', '#menu'], ['Our Story', '#about'], ['Contact', '#contact']].map(([label, href]) => (
              <li className="nav-item" key={href}>
                <a className="nav-link" href={href} onClick={closeMenu}>{label}</a>
              </li>
            ))}
            <li className="nav-item ms-lg-3">
              <button className="cart-nav-button" type="button" onClick={() => { closeMenu(); onOpenCart() }} aria-label={`Open cart, ${cartCount} items`}>
                <i className="bi bi-bag" /><span className="cart-nav-label">Your order</span>
                <span className="cart-count">{cartCount}</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
