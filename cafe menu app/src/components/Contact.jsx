import { useState } from 'react'

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    if (!event.currentTarget.reportValidity()) return
    setSubmitted(true)
    event.currentTarget.reset()
  }

  return (
    <section className="contact-section section-padding" id="contact">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-5 contact-copy">
            <span className="eyebrow">WE’D LOVE TO SEE YOU</span>
            <h2>There’s always<br /><em>a seat for you.</em></h2>
            <p>Pop in for a coffee, bring a friend, or just say hi. Our door (and the kettle) is always open.</p>
            <div className="contact-details">
              <div><span className="contact-icon"><i className="bi bi-geo-alt" /></span><div><strong>Find us</strong><span>14 Riverside Drive, Westlands<br />Nairobi, Kenya</span></div></div>
              <div><span className="contact-icon"><i className="bi bi-telephone" /></span><div><strong>Give us a ring</strong><a href="tel:+254700123456">+254 700 123 456</a></div></div>
              <div><span className="contact-icon"><i className="bi bi-envelope" /></span><div><strong>Drop us a note</strong><a href="mailto:hello@thedailygrind.co.ke">hello@thedailygrind.co.ke</a></div></div>
              <div><span className="contact-icon"><i className="bi bi-clock" /></span><div><strong>Come on in</strong><span>Every day, 7:00 am – 8:00 pm</span></div></div>
            </div>
            <div className="contact-socials">
              <a href="https://www.instagram.com/" aria-label="Instagram"><i className="bi bi-instagram" /></a>
              <a href="https://www.facebook.com/" aria-label="Facebook"><i className="bi bi-facebook" /></a>
              <a href="https://www.tiktok.com/" aria-label="TikTok"><i className="bi bi-tiktok" /></a>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="contact-form-card">
              <span className="eyebrow">SEND A LITTLE NOTE</span>
              <h3>Let's make it a conversation.</h3>
              <p>Questions, kind words, or just want to say hello? We’re listening.</p>
              {submitted && <div className="form-success" role="status"><i className="bi bi-check-circle-fill" /> Thanks for reaching out! We’ll be in touch soon.</div>}
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-sm-6"><label className="form-label" htmlFor="contact-name">Your name</label><input id="contact-name" className="form-control" name="name" type="text" placeholder="How should we call you?" required minLength="2" /></div>
                  <div className="col-sm-6"><label className="form-label" htmlFor="contact-email">Email address</label><input id="contact-email" className="form-control" name="email" type="email" placeholder="you@example.com" required /></div>
                  <div className="col-12"><label className="form-label" htmlFor="contact-message">Your message</label><textarea id="contact-message" className="form-control" name="message" rows="5" placeholder="Tell us what's on your mind..." required minLength="10" /></div>
                  <div className="col-12"><button className="btn btn-caramel contact-submit" type="submit">Send your note <i className="bi bi-arrow-up-right" /></button></div>
                </div>
              </form>
              <span className="form-footnote"><i className="bi bi-heart" /> We’ll only use your email to reply. Promise.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
