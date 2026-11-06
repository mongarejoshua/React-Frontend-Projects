export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <div className="brand footer-brand"><span className="brand-mark"><i className="bi bi-flower1" /></span> nook <span className="footer-copy">© {new Date().getFullYear()} Nook. Made for belonging.</span></div>
        <div className="d-flex align-items-center gap-3">
          <a href="mailto:hello@nook.demo">Contact</a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="bi bi-instagram" /></a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="bi bi-linkedin" /></a>
        </div>
      </div>
    </footer>
  )
}
