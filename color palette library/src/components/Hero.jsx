export default function Hero({ onGenerate }) {
  return (
    <section className="hero-section" id="home">
      <div className="container">
        <div className="hero-content">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> YOUR NEXT FAVORITE COLORS ARE HERE</div>
            <h1>Create beautiful<br /><span>color palettes.</span></h1>
            <p>Good design starts with a great color story. Find yours, make it your own, and take it everywhere.</p>
            <div className="hero-actions">
              <button className="btn btn-primary-custom" onClick={onGenerate}><i className="bi bi-stars me-2" /> Make a palette <i className="bi bi-arrow-up-right ms-3" /></button>
              <a className="text-link" href="#presets">Explore palettes <i className="bi bi-arrow-down-right ms-1" /></a>
            </div>
            <div className="hero-note"><span className="avatar-stack"><i className="bi bi-palette" /><i className="bi bi-droplet-half" /><i className="bi bi-magic" /></span><span>Made for curious creatives</span></div>
          </div>
          <div className="hero-art" aria-label="Color palette illustration">
            <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
            <div className="art-swatch swatch-one" /><div className="art-swatch swatch-two" /><div className="art-swatch swatch-three" />
            <div className="art-swatch swatch-four" /><div className="art-swatch swatch-five" />
            <div className="art-sparkle sparkle-one">✳</div><div className="art-sparkle sparkle-two">✦</div>
            <div className="art-label"><span className="art-label-dot" /><span>YOUR COLOR STORY</span><strong>№ 024</strong></div>
          </div>
        </div>
      </div>
    </section>
  )
}
