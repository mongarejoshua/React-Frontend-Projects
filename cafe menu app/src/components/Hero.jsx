function Hero({ onOpenCart }) {
  return (
    <section className="hero-section" id="home">
      <div className="hero-overlay" />
      <div className="container hero-content">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow"><span /> YOUR LITTLE CORNER OF NAIROBI</span>
          <h1>Your daily dose<br />of <em>happiness.</em></h1>
          <p>Thoughtfully brewed coffee, good food, and the kind of moments that make an ordinary day feel special.</p>
          <div className="hero-actions">
            <a className="btn btn-caramel" href="#menu">Explore our menu <i className="bi bi-arrow-up-right" /></a>
            <button className="btn btn-ghost-light" type="button" onClick={onOpenCart}><i className="bi bi-bag" /> Order now</button>
          </div>
          <div className="hero-note"><i className="bi bi-geo-alt-fill" /> Westlands, Nairobi <span className="hero-note-divider" /> Open daily, 7am–8pm</div>
        </div>
        <div className="hero-side-note"><span>GOOD COFFEE. GOOD DAYS.</span><i className="bi bi-arrow-down" /></div>
      </div>
      <div className="hero-bottom container">
        <div className="hero-rating"><div className="rating-stars">★★★★★</div><span>4.9 / 5 <small>from our lovely guests</small></span></div>
        <span className="hero-caption">SLOW MORNINGS START HERE</span>
      </div>
    </section>
  )
}

export default Hero
