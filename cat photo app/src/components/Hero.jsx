import CatImage from './CatImage.jsx'

export default function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="container hero-layout">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> A little more lovely</span>
          <h1>Discover the wonderful world <span>of cats.</span></h1>
          <p>
            A cozy corner of the internet for curious cat people. Meet charming
            faces, find a new favorite, and celebrate every kind of cat.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="#gallery">
              Explore the gallery <i className="bi bi-arrow-up-right" aria-hidden="true" />
            </a>
            <a className="text-link" href="#about">Our little story <i className="bi bi-arrow-down" aria-hidden="true" /></a>
          </div>
          <div className="hero-note">
            <span className="hero-avatars" aria-hidden="true">
              <span>🐈</span><span>🐈‍⬛</span><span>🐈</span>
            </span>
            <span>A happy place for cat people</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-frame">
            <CatImage
              src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=90"
              alt="A curious cat looking straight at the camera"
              className="hero-image"
              loading="eager"
            />
          </div>
          <div className="hero-sticker" aria-label="Cats make life better">
            <i className="bi bi-heart-fill" aria-hidden="true" />
            <span>cats make<br />life better</span>
          </div>
          <span className="hero-sparkle sparkle-one" aria-hidden="true">✳</span>
          <span className="hero-sparkle sparkle-two" aria-hidden="true">✳</span>
        </div>
      </div>
      <div className="hero-bottom container">
        <span>SCROLL A LITTLE</span>
        <a href="#gallery" aria-label="Scroll to the cat gallery"><i className="bi bi-arrow-down" /></a>
        <span className="hero-bottom-line" />
      </div>
    </section>
  )
}
