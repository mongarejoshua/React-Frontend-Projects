import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import PaintingCanvas from './components/PaintingCanvas.jsx';
import ColorControls from './components/ColorControls.jsx';
import ShapeEditor from './components/ShapeEditor.jsx';
import PresetGallery from './components/PresetGallery.jsx';
import RandomGenerator from './components/RandomGenerator.jsx';
import SavedGallery from './components/SavedGallery.jsx';
import ExportControls from './components/ExportControls.jsx';
import About from './components/About.jsx';
import Footer from './components/Footer.jsx';
import { presets } from './data/presets.js';
import { fromPreset, initialPainting, makeRandomPainting } from './utils/paintingUtils.js';

const STORAGE_KEY = 'rothko-studio-saved-paintings';
const initialColors = initialPainting;

function readSavedPaintings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved.filter((painting) => painting && typeof painting.id === 'string' && Array.isArray(painting.shapes)) : [];
  } catch (error) {
    console.error('Unable to read saved paintings.', error);
    return [];
  }
}

export default function App() {
  const [painting, setPainting] = useState(initialPainting);
  const [selectedId, setSelectedId] = useState(initialPainting.shapes[0].id);
  const [savedPaintings, setSavedPaintings] = useState(readSavedPaintings);
  const [title, setTitle] = useState(initialPainting.title);
  const [darkMode, setDarkMode] = useState(false);
  const [activePreset, setActivePreset] = useState('classic');
  const [notice, setNotice] = useState('');
  const selectedShape = painting.shapes.find((shape) => shape.id === selectedId) || painting.shapes[0];
  const savedPresets = useMemo(() => presets, []);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  function updatePainting(updater) {
    setPainting((current) => typeof updater === 'function' ? updater(current) : updater);
    setActivePreset('');
  }

  function updateShape(id, changes) {
    updatePainting((current) => ({ ...current, shapes: current.shapes.map((shape) => shape.id === id ? { ...shape, ...changes } : shape) }));
  }

  function choosePreset(preset) {
    const next = fromPreset(preset);
    setPainting(next);
    setTitle(next.title);
    setSelectedId(next.shapes[0].id);
    setActivePreset(preset.id);
    setNotice(`${preset.name} is ready to make your own.`);
  }

  function generate() {
    const next = makeRandomPainting();
    setPainting(next);
    setTitle(next.title);
    setSelectedId(next.shapes[0].id);
    setActivePreset('');
    setNotice('A new composition is on the canvas.');
  }

  function addShape() {
    const number = painting.shapes.length + 1;
    const layoutOrder = painting.shapes.reduce((max, shape, index) => Math.max(max, shape.layoutOrder ?? index), -1) + 1;
    const newShape = { id: `shape-${Date.now()}`, name: `Field ${number}`, layoutOrder, color: '#d3a15e', baseColor: '#d3a15e', x: 25, y: 38, width: 50, height: 20, opacity: 0.88, radius: 5 };
    updatePainting((current) => ({ ...current, shapes: [...current.shapes, newShape] }));
    setSelectedId(newShape.id);
  }

  function removeShape(id) {
    if (painting.shapes.length <= 1) return;
    const remaining = painting.shapes.filter((shape) => shape.id !== id);
    updatePainting((current) => ({ ...current, shapes: remaining }));
    if (selectedId === id) setSelectedId(remaining[0].id);
  }

  function moveShape(id, direction) {
    updatePainting((current) => {
      const index = current.shapes.findIndex((shape) => shape.id === id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= current.shapes.length) return current;
      const shapes = [...current.shapes];
      [shapes[index], shapes[target]] = [shapes[target], shapes[index]];
      return { ...current, shapes };
    });
  }

  function savePainting() {
    const name = title.trim();
    if (!name) {
      setNotice('Give your painting a name before saving.');
      return;
    }
    const entry = { ...painting, title: name, id: `painting-${Date.now()}`, savedAt: new Date().toISOString() };
    const next = [entry, ...savedPaintings];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSavedPaintings(next);
      setNotice(`“${name}” has been saved to your gallery.`);
    } catch (error) {
      console.error('Unable to save painting.', error);
      setNotice('This painting could not be saved. Check your browser storage settings.');
    }
  }

  function deletePainting(id) {
    const next = savedPaintings.filter((entry) => entry.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSavedPaintings(next);
      setNotice('Painting removed from your gallery.');
    } catch (error) {
      console.error('Unable to update saved paintings.', error);
      setNotice('The gallery could not be updated.');
    }
  }

  function openPainting(entry) {
    setPainting({ ...entry, shapes: entry.shapes.map((shape) => ({ ...shape })) });
    setTitle(entry.title);
    setSelectedId(entry.shapes[0]?.id || '');
    setActivePreset('');
    document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' });
    setNotice(`“${entry.title}” is open in the studio.`);
  }

  function resetPainting() {
    const next = { ...initialPainting, shapes: initialPainting.shapes.map((shape) => ({ ...shape })) };
    setPainting(next);
    setTitle(next.title);
    setSelectedId(next.shapes[0].id);
    setActivePreset('classic');
    setNotice('The original composition is back on the canvas.');
  }

  return (
    <div className="app-shell">
      <Navbar darkMode={darkMode} onToggleTheme={() => setDarkMode((mode) => !mode)} />
      <main>
        <Hero />
        <section className="studio-section" id="studio">
          <div className="section-heading studio-heading">
            <div><p className="eyebrow">Your canvas is waiting</p><h2>Make room for colour.</h2></div>
            <span className="studio-note">A quiet place to make<br />something of your own.</span>
          </div>
          <div className="studio-layout">
            <div className="canvas-column">
              <PaintingCanvas painting={painting} selectedId={selectedId} onSelect={setSelectedId} />
              <RandomGenerator onGenerate={generate} />
            </div>
            <aside className="control-panel">
              <div className="control-panel-top"><span>THE WORKTABLE</span><span><i className="status-dot" /> LIVE</span></div>
              <ColorControls painting={painting} selectedShape={selectedShape} initial={initialColors} onBackgroundChange={(background) => updatePainting((current) => ({ ...current, background }))} onShapeColorChange={updateShape} />
              <ShapeEditor painting={painting} selectedShape={selectedShape} onSelect={setSelectedId} onUpdate={updateShape} onAdd={addShape} onRemove={removeShape} onMove={moveShape} onSpacingChange={(spacing) => updatePainting((current) => ({ ...current, spacing }))} onBorderChange={(border) => updatePainting((current) => ({ ...current, border }))} />
              <ExportControls painting={painting} onReset={resetPainting} onSave={savePainting} title={title} onTitleChange={setTitle} />
              {notice && <p className="notice-message" role="status">{notice}<button type="button" onClick={() => setNotice('')} aria-label="Dismiss message"><i className="bi bi-x" /></button></p>}
            </aside>
          </div>
        </section>
        <PresetGallery presets={savedPresets} activePreset={activePreset} onSelect={choosePreset} />
        <SavedGallery paintings={savedPaintings} onOpen={openPainting} onDelete={deletePainting} />
        <About />
      </main>
      <Footer />
    </div>
  );
}
