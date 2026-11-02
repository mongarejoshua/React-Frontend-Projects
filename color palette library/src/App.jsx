import { useCallback, useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import ColorGenerator from './components/ColorGenerator.jsx'
import ColorConverter from './components/ColorConverter.jsx'
import ColorHarmony from './components/ColorHarmony.jsx'
import SavedPalettes from './components/SavedPalettes.jsx'
import PresetPalettes from './components/PresetPalettes.jsx'
import ContrastChecker from './components/ContrastChecker.jsx'
import About from './components/About.jsx'
import Footer from './components/Footer.jsx'
import Toast from './components/Toast.jsx'
import SavePaletteModal from './components/SavePaletteModal.jsx'
import { createRandomPalette, normalizeHex } from './utils/colorUtils.js'

const STORAGE_KEY = 'color-maker-palettes'
const THEME_KEY = 'color-maker-theme'

function readSavedPalettes() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(saved) ? saved.filter((palette) =>
      palette && typeof palette.id === 'string' && typeof palette.name === 'string' &&
      Array.isArray(palette.colors) && palette.colors.length === 5 &&
      palette.colors.every((color) => normalizeHex(color)),
    ) : []
  } catch (error) {
    console.error('Unable to read saved Color Maker palettes.', error)
    return []
  }
}

function readTheme() {
  try {
    return window.localStorage.getItem(THEME_KEY) === 'dark'
  } catch (error) {
    console.error('Unable to read Color Maker theme preference.', error)
    return false
  }
}

export default function App() {
  const [colors, setColors] = useState(() => createRandomPalette().map((hex) => ({ hex, locked: false })))
  const [palettes, setPalettes] = useState(readSavedPalettes)
  const [darkMode, setDarkMode] = useState(readTheme)
  const [toast, setToast] = useState({ message: '', type: 'success' })
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
    try {
      window.localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light')
    } catch (error) {
      console.error('Unable to save Color Maker theme preference.', error)
    }
  }, [darkMode])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(palettes))
    } catch (error) {
      console.error('Unable to save Color Maker palettes.', error)
      setToast({ message: 'Your palettes could not be saved to this browser.', type: 'error' })
    }
  }, [palettes])

  useEffect(() => {
    if (!toast.message) return undefined
    const timer = window.setTimeout(() => setToast({ message: '', type: 'success' }), 2800)
    return () => window.clearTimeout(timer)
  }, [toast])

  const notify = useCallback((message, type = 'success') => setToast({ message, type }), [])
  const generate = useCallback(() => {
    const fresh = createRandomPalette()
    setColors((current) => current.map((color, index) => color.locked ? color : { ...color, hex: fresh[index] }))
  }, [])

  useEffect(() => {
    function handleShortcut(event) {
      const target = event.target
      const isTyping = target instanceof HTMLElement &&
        (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
      if (event.code === 'Space' && !isTyping) {
        event.preventDefault()
        generate()
      }
    }
    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [generate])

  async function copyText(value) {
    try {
      await navigator.clipboard.writeText(value)
      notify(`${value} copied to clipboard`)
    } catch (error) {
      console.error('Unable to copy color to clipboard.', error)
      notify('Could not access your clipboard. Check browser permissions.', 'error')
    }
  }

  async function copyPalette(values) {
    await copyText(values.join(', '))
  }

  function loadPalette(values) {
    if (!Array.isArray(values) || values.length === 0) return
    const normalized = values.map(normalizeHex).filter(Boolean)
    if (normalized.length !== values.length) {
      notify('That palette contains an invalid color.', 'error')
      return
    }
    const fiveColors = [...normalized, ...normalized].slice(0, 5)
    setColors((current) => current.map((color, index) => ({
      hex: fiveColors[index],
      locked: color.locked,
    })))
    notify('Palette loaded into your color studio')
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function toggleLock(index) {
    setColors((current) => current.map((color, colorIndex) => colorIndex === index ? { ...color, locked: !color.locked } : color))
  }

  function updateColor(index, hex) {
    setColors((current) => current.map((color, colorIndex) => colorIndex === index ? { ...color, hex: normalizeHex(hex) || color.hex } : color))
  }

  function savePalette(name) {
    setPalettes((current) => [{
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      colors: colors.map((color) => color.hex),
    }, ...current])
    setSaveDialogOpen(false)
    notify(`“${name}” saved to your library`)
  }

  function deletePalette(id) {
    setPalettes((current) => current.filter((palette) => palette.id !== id))
    notify('Palette removed from your library')
  }

  return (
    <div className="app-shell">
      <Navbar darkMode={darkMode} onToggleTheme={() => setDarkMode((current) => !current)} />
      <main>
        <Hero onGenerate={generate} />
        <ColorGenerator colors={colors} onGenerate={generate} onChange={updateColor} onToggleLock={toggleLock} onCopy={copyText} />
        <ColorConverter onCopy={copyText} />
        <ColorHarmony onLoadPalette={loadPalette} onCopy={copyText} />
        <SavedPalettes palettes={palettes} onSave={() => setSaveDialogOpen(true)} onLoad={loadPalette} onDelete={deletePalette} onCopy={copyPalette} />
        <PresetPalettes onLoad={loadPalette} onCopy={copyPalette} />
        <ContrastChecker />
        <About />
      </main>
      <Footer />
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />
      <SavePaletteModal open={saveDialogOpen} defaultName={`Palette ${palettes.length + 1}`} onClose={() => setSaveDialogOpen(false)} onSave={savePalette} />
    </div>
  )
}
