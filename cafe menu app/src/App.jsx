import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Cart from './components/Cart'
import About from './components/About'
import SpecialOffers from './components/SpecialOffers'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { menuItems } from './data/menuData'
import './App.css'

const STORAGE_KEY = 'daily-grind-cart'
const productById = new Map(menuItems.map((product) => [product.id, product]))

function loadCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    if (!Array.isArray(savedCart)) throw new TypeError('Saved cart must be an array')
    return savedCart.flatMap((entry) => {
      const product = productById.get(entry.id)
      const quantity = Number(entry.quantity)
      return product && Number.isInteger(quantity) && quantity > 0
        ? [{ product, quantity }]
        : []
    })
  } catch (error) {
    console.error('Unable to read the saved cart from localStorage.', error)
    return []
  }
}

function App() {
  const [cartItems, setCartItems] = useState(loadCart)
  const [cartOpen, setCartOpen] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems.map(({ product, quantity }) => ({ id: product.id, quantity }))))
    } catch (error) {
      console.error('Unable to save the cart to localStorage.', error)
    }
  }, [cartItems])

  useEffect(() => {
    if (!cartOpen) return undefined
    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setCartOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [cartOpen])

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems])
  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [cartItems])

  function addToCart(product) {
    setCartItems((current) => {
      const existing = current.find((item) => item.product.id === product.id)
      if (existing) return current.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      return [...current, { product, quantity: 1 }]
    })
    setNotice(`${product.name} added to your order`)
    window.setTimeout(() => setNotice(''), 2600)
  }

  function updateQuantity(productId, quantity) {
    setCartItems((current) => quantity < 1
      ? current.filter((item) => item.product.id !== productId)
      : current.map((item) => item.product.id === productId ? { ...item, quantity } : item))
  }

  function handleCheckout() {
    setCartOpen(false)
    setNotice('Thanks! Please visit the counter to complete your order.')
    setCartItems([])
    window.setTimeout(() => setNotice(''), 4000)
  }

  return (
    <>
      <Navbar cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <main>
        <Hero onOpenCart={() => setCartOpen(true)} />
        <Menu onAddToCart={addToCart} />
        <About />
        <SpecialOffers />
        <Contact />
      </main>
      <Footer />
      <Cart
        isOpen={cartOpen}
        items={cartItems}
        subtotal={subtotal}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={(productId) => setCartItems((current) => current.filter((item) => item.product.id !== productId))}
        onClearCart={() => setCartItems([])}
        onCheckout={handleCheckout}
      />
      {notice && <div className="toast-message" role="status"><i className="bi bi-check-circle-fill" /> {notice}</div>}
    </>
  )
}

export default App
