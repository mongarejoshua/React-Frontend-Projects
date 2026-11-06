import { Link } from 'react-router-dom'

export default function NotFound() {
  return <main className="not-found"><span className="not-found-icon"><i className="bi bi-compass" /></span><span className="eyebrow">A LITTLE OFF THE MAP</span><h1>There’s nothing<br />here <span>just yet.</span></h1><p>The page you’re looking for may have moved. Let’s find your way back.</p><Link className="btn btn-primary-nook" to="/">Take me home <i className="bi bi-arrow-up-right ms-2" /></Link></main>
}
