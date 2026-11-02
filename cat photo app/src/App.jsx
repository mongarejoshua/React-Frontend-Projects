import { useEffect, useState } from 'react'
import About from './components/About.jsx'
import CatGallery from './components/CatGallery.jsx'
import CatModal from './components/CatModal.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import Navbar from './components/Navbar.jsx'

const FAVORITES_KEY = 'cat-gallery-favorites'

function getSavedFavorites() {
  try {
    const saved = window.localStorage.getItem(FAVORITES_KEY)
    const parsed = saved ? JSON.parse(saved) : []
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : []
  } catch (error) {
    console.error('Unable to read saved Cat Gallery favorites.', error)
    return []
  }
}

export default function App() {
  const [favorites, setFavorites] = useState(getSavedFavorites)
  const [selectedCat, setSelectedCat] = useState(null)

  useEffect(() => {
    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    } catch (error) {
      console.error('Unable to save Cat Gallery favorites.', error)
    }
  }, [favorites])

  const toggleFavorite = (catId) => {
    setFavorites((current) =>
      current.includes(catId)
        ? current.filter((id) => id !== catId)
        : [...current, catId],
    )
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CatGallery favorites={favorites} onFavorite={toggleFavorite} onSelect={setSelectedCat} />
        <About />
        <Contact />
      </main>
      <Footer />
      <CatModal
        cat={selectedCat}
        isFavorite={selectedCat ? favorites.includes(selectedCat.id) : false}
        onFavorite={toggleFavorite}
        onClose={() => setSelectedCat(null)}
      />
    </>
  )
}
