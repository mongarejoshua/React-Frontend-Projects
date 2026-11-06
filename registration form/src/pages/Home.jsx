import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const features = [
  { icon: 'bi-person-check', title: 'Your space, your way', text: 'Keep your details in one calm, secure place and make them yours.' },
  { icon: 'bi-shield-check', title: 'Privacy comes first', text: 'Your password is never stored as plain text in this demonstration.' },
  { icon: 'bi-phone', title: 'Feels right everywhere', text: 'A thoughtful experience, whether you’re on your phone or at your desk.' },
]

export default function Home() {
  const { currentUser } = useAuth()
  const destination = currentUser?.role === 'admin' ? '/admin' : currentUser ? '/dashboard' : '/register'
  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="eyebrow"><span className="eyebrow-dot" /> A little more human, by design</span>
              <h1>A better place<br />to <span>belong.</span></h1>
              <p className="hero-copy">Meet Nook — a simple, thoughtful home for your account. Get set up in minutes and keep everything that matters close.</p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link to={destination} className="btn btn-primary-nook btn-lg">{currentUser ? 'Go to your dashboard' : 'Create your account'} <i className="bi bi-arrow-up-right ms-2" /></Link>
                {!currentUser && <Link to="/login" className="btn btn-soft btn-lg">I already have an account</Link>}
              </div>
              <div className="hero-proof"><span className="proof-avatars"><i className="bi bi-person-fill" /><i className="bi bi-person-fill" /><i className="bi bi-person-fill" /></span><span>A more welcoming way to manage your account.</span></div>
            </div>
            <div className="col-lg-6">
              <div className="hero-art">
                <div className="art-sun" />
                <div className="art-card art-card-back"><span className="art-dot" /><span className="art-line" /><span className="art-line short" /></div>
                <div className="art-card art-card-front">
                  <div className="art-card-top"><span className="art-brand-mark"><i className="bi bi-flower1" /></span><span className="art-chip">YOUR NOOK</span></div>
                  <div className="art-avatar"><i className="bi bi-person-fill" /></div>
                  <div className="art-name-line" /><div className="art-email-line" />
                  <div className="art-card-bottom"><span>YOUR SPACE, YOUR WAY</span><i className="bi bi-arrow-up-right" /></div>
                </div>
                <div className="art-floating-note"><i className="bi bi-check2-circle" /><span>Made for you</span></div>
                <div className="art-sparkle sparkle-one">✳</div><div className="art-sparkle sparkle-two">✦</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="features-section" id="features">
        <div className="container">
          <div className="section-heading text-center">
            <span className="eyebrow">A little thought goes a long way</span>
            <h2>Everything in its <span>right place.</span></h2>
            <p>The essentials, without the extra noise.</p>
          </div>
          <div className="row g-4 mt-2">
            {features.map((feature, index) => <div className="col-md-4" key={feature.title}>
              <article className="feature-card">
                <div className={`feature-icon feature-icon-${index}`}><i className={`bi ${feature.icon}`} /></div>
                <h3>{feature.title}</h3><p>{feature.text}</p>
                <span className="feature-arrow"><i className="bi bi-arrow-up-right" /></span>
              </article>
            </div>)}
          </div>
        </div>
      </section>
      <section className="cta-section">
        <div className="container">
          <div className="cta-panel">
            <div><span className="eyebrow">Your corner of the internet</span><h2>Come on in.</h2><p>It only takes a moment to make yourself at home.</p></div>
            <Link to={destination} className="btn btn-light btn-lg">{currentUser ? 'Open dashboard' : 'Join Nook'} <i className="bi bi-arrow-up-right ms-2" /></Link>
            <span className="cta-flower">✳</span>
          </div>
        </div>
      </section>
    </main>
  )
}
