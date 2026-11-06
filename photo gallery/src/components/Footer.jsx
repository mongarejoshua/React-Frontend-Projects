export default function Footer({ onNavigate, onUpload }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div><a className="navbar-brand brand-mark" href="#home" onClick={() => onNavigate('home')}><span className="brand-icon"><i className="bi bi-aperture" /></span><span>PIXEL <strong>GALLERY</strong></span></a><p>A little space for what you see.</p></div>
          <div className="footer-links"><span>EXPLORE</span><button onClick={() => onNavigate('gallery')}>Gallery</button><button onClick={() => onNavigate('albums')}>Albums</button><button onClick={onUpload}>Upload a photo</button></div>
          <div className="footer-social"><span>FIND YOUR PERSPECTIVE</span><div><a href="https://www.instagram.com/" aria-label="Instagram" target="_blank" rel="noreferrer"><i className="bi bi-instagram" /></a><a href="https://www.pinterest.com/" aria-label="Pinterest" target="_blank" rel="noreferrer"><i className="bi bi-pinterest" /></a><a href="https://www.behance.net/" aria-label="Behance" target="_blank" rel="noreferrer"><i className="bi bi-behance" /></a></div></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Pixel Gallery. All rights reserved.</span><span>DESIGNED WITH CARE BY MONGAREPORTFOLIO</span></div>
      </div>
    </footer>
  );
}
