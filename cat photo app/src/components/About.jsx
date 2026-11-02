import CatImage from './CatImage.jsx'

export default function About() {
  return (
    <section className="about-section section-padding" id="about">
      <div className="container about-layout">
        <div className="about-visual">
          <div className="about-image-main">
            <CatImage
              src="https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&w=1000&q=85"
              alt="A relaxed cat enjoying a quiet moment"
              className="about-image"
            />
          </div>
          <div className="about-note"><i className="bi bi-stars" aria-hidden="true" /><span>Every cat has a little<br />magic of their own.</span></div>
          <span className="about-doodle" aria-hidden="true">✳</span>
        </div>
        <div className="about-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> A note about us</span>
          <h2>Small paws.<br /><span>Big personalities.</span></h2>
          <p>
            Cat Gallery is a happy little place made for people who can never have
            too many cat photos. We bring together a few of the many colors,
            characters, and quirks that make cats so easy to love.
          </p>
          <p>
            From gentle Persians to fearless kittens, every cat has their own
            way of making an ordinary day feel special. Take your time, find a
            new favorite, and share a little love.
          </p>
          <a className="text-link" href="#gallery">Find your favorite <i className="bi bi-arrow-right" aria-hidden="true" /></a>
          <div className="about-stat-row">
            <div><strong>18</strong><span>lovely cats</span></div>
            <div><strong>5</strong><span>ways to browse</span></div>
            <div><strong>∞</strong><span>reasons to smile</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
