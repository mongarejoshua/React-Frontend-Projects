function About() {
  return (
    <section className="about-section section-padding" id="about">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <div className="about-image-wrap">
              <img src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=85" alt="The warm, welcoming interior of a neighbourhood cafe" loading="lazy" />
              <div className="about-image-note"><i className="bi bi-heart-fill" /><span>Made for your<br />everyday moments</span></div>
              <span className="about-image-index">EST. WITH LOVE · NAIROBI</span>
            </div>
          </div>
          <div className="col-lg-6 about-copy">
            <span className="eyebrow">A GOOD PLACE TO LAND</span>
            <h2>More than coffee.<br /><em>A feeling.</em></h2>
            <p className="about-lead">The Daily Grind started with a simple thought: the best part of the day might just be the little pause in the middle of it.</p>
            <p>We’re a neighbourhood cafe in the heart of Nairobi, serving carefully sourced Kenyan coffee, honest food, and a warm welcome to absolutely everyone. Come for a quick flat white, stay for the conversation.</p>
            <div className="about-values">
              <div><span className="value-icon"><i className="bi bi-sun" /></span><div><h3>Our mission</h3><p>Make every day a little brighter, one cup at a time.</p></div></div>
              <div><span className="value-icon"><i className="bi bi-stars" /></span><div><h3>Our promise</h3><p>Good ingredients, thoughtful people, and a seat for you.</p></div></div>
            </div>
            <a className="text-button" href="#contact">Come say hello <i className="bi bi-arrow-right" /></a>
          </div>
        </div>
        <div className="why-us-strip">
          <div><i className="bi bi-tree" /><span>Locally sourced,<br /><strong>always.</strong></span></div>
          <div><i className="bi bi-cup-hot" /><span>Specialty coffee,<br /><strong>beautifully brewed.</strong></span></div>
          <div><i className="bi bi-emoji-smile" /><span>Good people,<br /><strong>good energy.</strong></span></div>
          <div><i className="bi bi-heart" /><span>A little extra care<br /><strong>in everything.</strong></span></div>
        </div>
      </div>
    </section>
  )
}

export default About
