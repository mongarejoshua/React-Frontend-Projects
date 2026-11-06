export default function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-copy">
        <p className="eyebrow"><span /> A little room for feeling</p>
        <h1>Create your own<br /><em>abstract masterpiece.</em></h1>
        <p className="hero-description">Explore colour, emotion, and simplicity. Make a space for a feeling, one field at a time.</p>
        <div className="hero-actions">
          <a className="button-primary" href="#studio">Start creating <i className="bi bi-arrow-up-right" /></a>
          <a className="button-quiet" href="#presets">Explore the palettes <i className="bi bi-arrow-down" /></a>
        </div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <span className="hero-art-frame" />
        <span className="hero-block hero-block-one" />
        <span className="hero-block hero-block-two" />
        <span className="hero-block hero-block-three" />
        <span className="hero-caption">No. 08 — studies in warmth</span>
      </div>
      <span className="hero-index">01 / 04</span>
    </section>
  );
}
