const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <a className="brand footer-brand" href="#home">
            <span className="brand-icon" aria-hidden="true"><i className="bi bi-camera-fill" /></span>
            <span>cat <span className="brand-light">gallery</span></span>
          </a>
          <p>A little more lovely, one cat at a time.</p>
          <nav className="footer-links" aria-label="Footer navigation">
            {footerLinks.map(({ label, href }) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <div className="social-links" aria-label="Social media">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="bi bi-instagram" /></a>
            <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer" aria-label="Pinterest"><i className="bi bi-pinterest" /></a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook"><i className="bi bi-facebook" /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Cat Gallery. Made with <i className="bi bi-heart-fill" aria-label="love" /> for cat people.</span>
          <a href="#home">Back to the top <i className="bi bi-arrow-up" aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  )
}
