function Cart({ isOpen, items, subtotal, onClose, onUpdateQuantity, onRemoveItem, onClearCart, onCheckout }) {
  if (!isOpen) return null

  return (
    <div className="cart-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="cart-header">
          <div><span className="eyebrow">THE GOOD STUFF</span><h2 id="cart-title">Your order<span className="cart-heading-dot">.</span></h2></div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close cart"><i className="bi bi-x-lg" /></button>
        </div>
        {items.length ? (
          <>
            <div className="cart-items">
              {items.map(({ product, quantity }) => (
                <div className="cart-item" key={product.id}>
                  <img src={product.image} alt="" />
                  <div className="cart-item-info">
                    <h3>{product.name}</h3>
                    <span>KES {product.price.toLocaleString('en-KE')}</span>
                    <div className="quantity-control">
                      <button type="button" onClick={() => onUpdateQuantity(product.id, quantity - 1)} aria-label={`Decrease ${product.name} quantity`}><i className="bi bi-dash" /></button>
                      <span>{quantity}</span>
                      <button type="button" onClick={() => onUpdateQuantity(product.id, quantity + 1)} aria-label={`Increase ${product.name} quantity`}><i className="bi bi-plus" /></button>
                    </div>
                  </div>
                  <button className="remove-item" type="button" onClick={() => onRemoveItem(product.id)} aria-label={`Remove ${product.name}`}><i className="bi bi-trash3" /></button>
                </div>
              ))}
            </div>
            <div className="cart-footer">
              <button className="clear-cart" type="button" onClick={onClearCart}>Clear order</button>
              <div className="cart-subtotal"><span>Subtotal</span><strong>KES {subtotal.toLocaleString('en-KE')}</strong></div>
              <p className="cart-delivery-note"><i className="bi bi-info-circle" /> Taxes and delivery calculated at checkout.</p>
              <button className="btn btn-caramel checkout-button" type="button" onClick={onCheckout}>Continue to checkout <i className="bi bi-arrow-right" /></button>
            </div>
          </>
        ) : (
          <div className="cart-empty">
            <div className="empty-bag"><i className="bi bi-bag-heart" /></div>
            <h3>Your bag is taking a little break.</h3>
            <p>Let’s find something lovely to fill it with.</p>
            <button className="btn btn-caramel" type="button" onClick={onClose}>Explore the menu <i className="bi bi-arrow-right" /></button>
          </div>
        )}
      </aside>
    </div>
  )
}

export default Cart
