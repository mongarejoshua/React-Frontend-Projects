function MenuCard({ item, onAddToCart }) {
  return (
    <article className="menu-card">
      <div className="menu-card-image-wrap">
        <img className="menu-card-image" src={item.image} alt={item.name} loading="lazy" />
        {item.tag && <span className="item-tag">{item.tag}</span>}
        <span className="item-category">{item.category}</span>
      </div>
      <div className="menu-card-body">
        <div className="menu-card-heading">
          <h3>{item.name}</h3>
          <span className="menu-price">KES {item.price.toLocaleString('en-KE')}</span>
        </div>
        <p>{item.description}</p>
        <button className="add-button" type="button" onClick={() => onAddToCart(item)}>
          <i className="bi bi-plus-lg" /> Add to order
        </button>
      </div>
    </article>
  )
}

export default MenuCard
