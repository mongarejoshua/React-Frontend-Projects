import { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Gallery from './components/Gallery.jsx';
import Albums from './components/Albums.jsx';
import About from './components/About.jsx';
import Footer from './components/Footer.jsx';
import UploadModal from './components/UploadModal.jsx';
import Lightbox from './components/Lightbox.jsx';
import Toast from './components/Toast.jsx';
import { categories, samplePhotos } from './data/samplePhotos.js';
import { deleteStoredPhoto, getStoredPhotos, readLocalStorage, saveStoredPhoto, writeLocalStorage } from './utils/storageUtils.js';

const favoriteKey = 'pixel-gallery-favorites';
const albumKey = 'pixel-gallery-albums';

function formatDimensions(width, height) {
  return width && height ? `${width} × ${height} px` : '';
}

export default function App() {
  const [uploads, setUploads] = useState([]);
  const [favorites, setFavorites] = useState(() => readLocalStorage(favoriteKey, []));
  const [albums, setAlbums] = useState(() => readLocalStorage(albumKey, []));
  const [section, setSection] = useState('home');
  const [activeCategory, setActiveCategory] = useState('All Photos');
  const [query, setQuery] = useState('');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [toast, setToast] = useState('');
  const uploadUrls = useRef(new Set());

  const allPhotos = useMemo(() => [...uploads, ...samplePhotos], [uploads]);

  useEffect(() => {
    let active = true;
    const loadUploads = async () => {
      try {
        const stored = await getStoredPhotos();
        if (!active) return;
        const photos = stored.map((item) => {
          const src = URL.createObjectURL(item.blob);
          uploadUrls.current.add(src);
          return { ...item, src, isUpload: true };
        });
        setUploads(photos);
      } catch (error) {
        console.error('Unable to load saved photos.', error);
        if (active) notify('Saved photos could not be loaded from this browser.');
      }
    };
    loadUploads();
    return () => {
      active = false;
      uploadUrls.current.forEach((url) => URL.revokeObjectURL(url));
      uploadUrls.current.clear();
    };
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        document.querySelector('.search-field input, .nav-search')?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  function notify(message) { setToast(message); }

  const filteredPhotos = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return allPhotos.filter((photo) => {
      const matchesCategory = activeCategory === 'All Photos' || photo.category === activeCategory;
      const matchesQuery = !normalized || `${photo.title} ${photo.category} ${photo.description}`.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [allPhotos, activeCategory, query]);

  const currentGalleryPhotos = section === 'favorites'
    ? filteredPhotos.filter((photo) => favorites.includes(photo.id))
    : section === 'uploads'
      ? filteredPhotos.filter((photo) => photo.isUpload)
      : filteredPhotos;

  const galleryTitle = section === 'favorites' ? 'Saved favourites'
    : section === 'uploads' ? 'My gallery'
      : 'The collection';

  const gallerySubtitle = section === 'favorites' ? 'The photographs you have chosen to keep close.'
    : section === 'uploads' ? 'Your photographs, gathered in one place.'
      : 'A considered collection of moments, details, and places.';

  const toggleFavorite = (id) => {
    const next = favorites.includes(id) ? favorites.filter((favorite) => favorite !== id) : [...favorites, id];
    try {
      writeLocalStorage(favoriteKey, next);
      setFavorites(next);
      notify(next.includes(id) ? 'Added to your favourites.' : 'Removed from your favourites.');
    } catch (error) { notify(error.message); }
  };

  const handleUpload = async (items) => {
    const newPhotos = [];
    for (const item of items) {
      const id = `upload-${crypto.randomUUID()}`;
      const dimensions = await new Promise((resolve) => {
        const image = new Image();
        image.onload = () => resolve(formatDimensions(image.naturalWidth, image.naturalHeight));
        image.onerror = () => resolve('');
        image.src = item.preview;
      });
      const photo = {
        id, title: item.title.trim(), category: item.category, description: item.description.trim(),
        date: new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date()),
        fileName: item.file.name, dimensions, size: item.file.size, blob: item.file,
      };
      await saveStoredPhoto(photo);
      const src = URL.createObjectURL(item.file);
      uploadUrls.current.add(src);
      newPhotos.push({ ...photo, src, isUpload: true });
    }
    setUploads((current) => [...newPhotos, ...current]);
    setSection('uploads');
    setActiveCategory('All Photos');
    setQuery('');
    notify(`${newPhotos.length} ${newPhotos.length === 1 ? 'photo' : 'photos'} added to your gallery.`);
  };

  const handleDeletePhoto = async (photo) => {
    if (!window.confirm(`Delete "${photo.title}" from your gallery? This cannot be undone.`)) return;
    try {
      await deleteStoredPhoto(photo.id);
      setUploads((current) => current.filter((item) => item.id !== photo.id));
      URL.revokeObjectURL(photo.src);
      uploadUrls.current.delete(photo.src);
      const nextFavorites = favorites.filter((id) => id !== photo.id);
      writeLocalStorage(favoriteKey, nextFavorites);
      setFavorites(nextFavorites);
      const nextAlbums = albums.map((album) => ({ ...album, photoIds: album.photoIds.filter((id) => id !== photo.id) }));
      writeLocalStorage(albumKey, nextAlbums);
      setAlbums(nextAlbums);
      if (lightboxPhoto?.id === photo.id) setLightboxPhoto(null);
      notify('Photo deleted.');
    } catch (error) {
      console.error('Unable to delete photo.', error);
      notify(error.message || 'The photo could not be deleted.');
    }
  };

  const createAlbum = (name) => {
    const next = [{ id: `album-${crypto.randomUUID()}`, name, photoIds: [], createdAt: new Date().toISOString() }, ...albums];
    try { writeLocalStorage(albumKey, next); setAlbums(next); notify(`Album “${name}” created.`); }
    catch (error) { notify(error.message); }
  };

  const deleteAlbum = (album) => {
    if (!window.confirm(`Delete the album "${album.name}"? Your photos will not be deleted.`)) return;
    const next = albums.filter((item) => item.id !== album.id);
    try { writeLocalStorage(albumKey, next); setAlbums(next); if (selectedAlbum?.id === album.id) setSelectedAlbum(null); notify('Album deleted.'); }
    catch (error) { notify(error.message); }
  };

  const addToAlbum = (albumId, photoId) => {
    const album = albums.find((item) => item.id === albumId);
    if (!album || album.photoIds.includes(photoId)) { notify('This photo is already in that album.'); return; }
    const next = albums.map((item) => item.id === albumId ? { ...item, photoIds: [...item.photoIds, photoId] } : item);
    try {
      writeLocalStorage(albumKey, next);
      setAlbums(next);
      if (selectedAlbum?.id === albumId) setSelectedAlbum(next.find((item) => item.id === albumId));
      notify(`Added to ${album.name}.`);
    } catch (error) { notify(error.message); }
  };

  const removeFromAlbum = (albumId, photoId) => {
    const next = albums.map((item) => item.id === albumId ? { ...item, photoIds: item.photoIds.filter((id) => id !== photoId) } : item);
    try { writeLocalStorage(albumKey, next); setAlbums(next); setSelectedAlbum(next.find((item) => item.id === albumId)); }
    catch (error) { notify(error.message); }
  };

  const downloadPhoto = async (photo) => {
    try {
      let blob = photo.blob;
      if (!blob) {
        const response = await fetch(photo.src);
        if (!response.ok) throw new Error('The image could not be downloaded.');
        blob = await response.blob();
      }
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = photo.fileName || `${photo.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${blob.type.split('/')[1] || 'jpg'}`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } catch (error) { console.error('Unable to download photo.', error); notify(error.message || 'The image could not be downloaded.'); }
  };

  const navigateTo = (nextSection) => {
    setSection(nextSection === 'home' ? 'home' : nextSection);
    setSelectedAlbum(null);
    if (nextSection === 'gallery' || nextSection === 'home') { setActiveCategory('All Photos'); setQuery(''); }
    if (nextSection === 'about') window.setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPhoto = (photo) => setLightboxPhoto(photo);
  const lightboxPhotos = section === 'albums' && selectedAlbum
    ? allPhotos.filter((photo) => selectedAlbum.photoIds.includes(photo.id))
    : currentGalleryPhotos.some((photo) => photo.id === lightboxPhoto?.id)
      ? currentGalleryPhotos
      : lightboxPhoto
        ? [lightboxPhoto, ...currentGalleryPhotos]
        : currentGalleryPhotos;

  return (
    <>
      <Navbar onNavigate={navigateTo} onUpload={() => setUploadOpen(true)} onSearch={setQuery} />
      {section === 'home' && <Hero onExplore={() => navigateTo('gallery')} onUpload={() => setUploadOpen(true)} />}
      {section === 'albums' ? (
        <Albums albums={albums} photos={allPhotos} onCreate={createAlbum} onDelete={deleteAlbum} onOpen={setSelectedAlbum} selectedAlbum={selectedAlbum} onBack={() => setSelectedAlbum(null)} onOpenPhoto={openPhoto} onFavorite={toggleFavorite} favorites={favorites} onDeletePhoto={removeFromAlbum} />
      ) : section !== 'about' && (
        <Gallery photos={currentGalleryPhotos} categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} query={query} onQueryChange={setQuery} favorites={favorites} onFavorite={toggleFavorite} onOpen={openPhoto} onDelete={handleDeletePhoto} title={galleryTitle} subtitle={gallerySubtitle} />
      )}
      {section === 'home' && <div className="container"><div className="home-favorite-link"><span><i className="bi bi-heart me-2" />KEEP YOUR FAVORITES CLOSE</span><button onClick={() => navigateTo('favorites')}>View favourites <span>({favorites.length})</span><i className="bi bi-arrow-up-right ms-2" /></button></div></div>}
      {(section === 'home' || section === 'about') && <About />}
      <Footer onNavigate={navigateTo} onUpload={() => setUploadOpen(true)} />
      {uploadOpen && <UploadModal onClose={() => setUploadOpen(false)} onUpload={handleUpload} />}
      {lightboxPhoto && <Lightbox photo={lightboxPhoto} photos={lightboxPhotos.length ? lightboxPhotos : [lightboxPhoto]} onClose={() => setLightboxPhoto(null)} onNavigate={setLightboxPhoto} isFavorite={favorites.includes(lightboxPhoto.id)} onFavorite={toggleFavorite} albums={albums} onAddToAlbum={addToAlbum} onDownload={downloadPhoto} />}
      <Toast message={toast} onClose={() => setToast('')} />
    </>
  );
}
