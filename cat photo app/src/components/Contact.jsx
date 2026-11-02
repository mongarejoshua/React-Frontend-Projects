import { useState } from 'react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!event.currentTarget.reportValidity()) return
    setSubmitted(true)
    event.currentTarget.reset()
  }

  return (
    <section className="contact-section section-padding" id="contact">
      <div className="container contact-layout">
        <div className="contact-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> Say hello</span>
          <h2>Have a cat story?<br /><span>We’re all ears.</span></h2>
          <p>Share a favorite photo, tell us about your little troublemaker, or just send a friendly hello.</p>
          <a className="contact-email" href="mailto:hello@catgallery.example">
            <span><i className="bi bi-envelope" aria-hidden="true" /></span>
            hello@catgallery.example
          </a>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Drop us a note</h3>
          <p>We’d love to hear from you.</p>
          <div className="form-field">
            <label htmlFor="contact-name">Full name</label>
            <input id="contact-name" name="name" type="text" placeholder="Your name" autoComplete="name" required minLength={2} />
          </div>
          <div className="form-field">
            <label htmlFor="contact-email">Email address</label>
            <input id="contact-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
          </div>
          <div className="form-field">
            <label htmlFor="contact-message">Your message</label>
            <textarea id="contact-message" name="message" rows="4" placeholder="Tell us what’s on your mind..." required minLength={10} />
          </div>
          <button className="button-primary submit-button" type="submit">
            Send your note <i className="bi bi-arrow-up-right" aria-hidden="true" />
          </button>
          {submitted && (
            <p className="form-feedback" role="status">
              Thanks for your note! This demo validates your message locally and doesn’t send or store it.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
