export default function Hero({ onExplore, onUpload }) {
  return (
    <section className="hero-section" id="home">
      <div className="container">
        <div className="hero-copy">
          <span className="eyebrow"><span /> A HOME FOR YOUR PERSPECTIVE</span>
          <h1>Every picture<br />tells a <em>story.</em></h1>
          <p>Discover, organize, and showcase beautiful moments through a collection of stunning photographs.</p>
          <div className="hero-actions">
            <button className="btn btn-dark btn-lg" onClick={onExplore}>Explore gallery <i className="bi bi-arrow-up-right ms-3" /></button>
            <button className="btn btn-outline-dark btn-lg" onClick={onUpload}><i className="bi bi-cloud-arrow-up me-2" />Upload photos</button>
          </div>
          <div className="hero-caption"><span className="caption-line" /> A LITTLE SPACE FOR WHAT YOU SEE</div>
        </div>
        <div className="hero-art" aria-label="A collage of landscape photographs">
          <img className="hero-img hero-img-one" src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=85" alt="Misty mountain lake" />
          <img className="hero-img hero-img-two" src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=700&q=85" alt="Ocean waves" />
          <img className="hero-img hero-img-three" src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=700&q=85" alt="Sunrise over a field" />
          <div className="art-note"><i className="bi bi-stars" /><span>COLLECT MOMENTS<br />NOT THINGS</span></div>
          <span className="art-index">01 — 20</span>
        </div>
      </div>
    </section>
  );
}
