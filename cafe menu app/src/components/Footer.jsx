function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand-lockup" href="#home"><span className="brand-mark"><i className="bi bi-cup-hot-fill" /></span><span className="brand-name">The Daily<span>Grind</span></span></a>
            <p>Good coffee, kind people, and a little pause in your day. Made with love in Nairobi.</p>
            <div className="footer-socials"><a href="https://www.instagram.com/" aria-label="Instagram"><i className="bi bi-instagram" /></a><a href="https://www.facebook.com/" aria-label="Facebook"><i className="bi bi-facebook" /></a><a href="https://www.tiktok.com/" aria-label="TikTok"><i className="bi bi-tiktok" /></a></div>
          </div>
          <div className="footer-links"><h3>Take a look</h3><a href="#menu">Our menu</a><a href="#about">Our story</a><a href="#offers">Little extras</a><a href="#contact">Say hello</a></div>
          <div className="footer-links"><h3>Find your way</h3><span>14 Riverside Drive</span><span>Westlands, Nairobi</span><a href="tel:+254700123456">+254 700 123 456</a><a href="mailto:hello@thedailygrind.co.ke">hello@thedailygrind.co.ke</a></div>
          <div className="footer-hours"><span className="eyebrow">THE DOORS ARE OPEN</span><p>Every single day<br /><strong>7:00 am — 8:00 pm</strong></p><span className="footer-status"><i /> Here for your next coffee</span></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} The Daily Grind. Made with a little extra love.</span><a href="#home">Back to the top <i className="bi bi-arrow-up" /></a></div>
      </div>
    </footer>
  )
}

export default Footer
