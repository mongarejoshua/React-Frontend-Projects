const offers = [
  { number: '01', icon: 'bi-cup-hot', title: 'The morning ritual', description: 'A barista-made coffee and a warm, buttery croissant. Your morning, sorted.', detail: 'EVERY DAY · 7–10 AM', price: 'KES 550', image: 'photo-1555507036-ab1f4038808a' },
  { number: '02', icon: 'bi-sunrise', title: 'Slow Sunday brunch', description: 'A stack of berry pancakes, fresh juice and a coffee worth lingering over.', detail: 'WEEKENDS · 8 AM–NOON', price: 'KES 1,250', image: 'photo-1528207776546-365bb710ee93' },
  { number: '03', icon: 'bi-mortarboard', title: 'Study break, on us', description: 'A little thank-you for hitting the books. Show your student ID at the counter.', detail: 'STUDENTS · ALL DAY', price: '15% OFF', image: 'photo-1461696114087-397271a7aedc' },
]

function SpecialOffers() {
  return (
    <section className="offers-section section-padding" id="offers">
      <div className="container">
        <div className="section-heading offers-heading">
          <div><span className="eyebrow">A LITTLE SOMETHING EXTRA</span><h2>Good things come<br /><em>in little bundles.</em></h2></div>
          <p>Because the best days deserve a little treat. Here are a few of our favourite ways to make yours.</p>
        </div>
        <div className="row g-4">
          {offers.map((offer) => (
            <div className="col-md-6 col-lg-4" key={offer.number}>
              <article className="offer-card">
                <div className="offer-image"><img src={`https://images.unsplash.com/${offer.image}?auto=format&fit=crop&w=900&q=85`} alt="" loading="lazy" /><span className="offer-number">{offer.number}</span></div>
                <div className="offer-copy">
                  <div className="offer-icon"><i className={`bi ${offer.icon}`} /></div>
                  <span className="offer-detail">{offer.detail}</span>
                  <h3>{offer.title}</h3>
                  <p>{offer.description}</p>
                  <div className="offer-bottom"><span>{offer.price}</span><a href="#menu" aria-label={`Explore menu for ${offer.title}`}><i className="bi bi-arrow-up-right" /></a></div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SpecialOffers
