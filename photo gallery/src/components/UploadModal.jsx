import { useEffect, useRef, useState } from 'react';
import { categories } from '../data/samplePhotos.js';

const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxSize = 10 * 1024 * 1024;

export default function UploadModal({ onClose, onUpload }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const inputRef = useRef(null);
  const previewUrls = useRef(new Set());

  useEffect(() => () => previewUrls.current.forEach((url) => URL.revokeObjectURL(url)), []);

  const addFiles = (files) => {
    setError('');
    const valid = [];
    Array.from(files).forEach((file) => {
      if (!allowedTypes.includes(file.type)) { setError(`${file.name}: choose a JPG, PNG, or WEBP image.`); return; }
      if (file.size > maxSize) { setError(`${file.name}: images must be 10 MB or smaller.`); return; }
      const preview = URL.createObjectURL(file);
      previewUrls.current.add(preview);
      valid.push({ file, preview, title: file.name.replace(/\.[^.]+$/, ''), category: 'Lifestyle', description: '' });
    });
    setItems((current) => [...current, ...valid]);
  };

  const updateItem = (index, key, value) => setItems((current) => current.map((item, i) => i === index ? { ...item, [key]: value } : item));
  const removeItem = (index) => setItems((current) => {
    const removed = current[index];
    if (removed) {
      URL.revokeObjectURL(removed.preview);
      previewUrls.current.delete(removed.preview);
    }
    return current.filter((_, i) => i !== index);
  });

  const submit = async (event) => {
    event.preventDefault();
    if (!items.length) { setError('Choose at least one photo to upload.'); return; }
    if (items.some((item) => !item.title.trim())) { setError('Please add a title to every photo.'); return; }
    setSaving(true);
    try { await onUpload(items); onClose(); }
    catch (uploadError) { setError(uploadError.message || 'Photos could not be saved. Please try again.'); }
    finally { setSaving(false); }
  };

  return (
    <div className="modal-backdrop-custom" role="dialog" aria-modal="true" aria-labelledby="upload-title">
      <form className="upload-modal" onSubmit={submit}>
        <div className="modal-heading"><div><span className="eyebrow"><span /> ADD TO YOUR COLLECTION</span><h2 id="upload-title">Upload photos</h2></div><button type="button" className="icon-button" onClick={onClose} aria-label="Close upload"><i className="bi bi-x-lg" /></button></div>
        <button type="button" className="drop-zone" onClick={() => inputRef.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); addFiles(event.dataTransfer.files); }}>
          <i className="bi bi-cloud-arrow-up" /><strong>Choose photos or drop them here</strong><span>JPG, PNG or WEBP · Up to 10 MB each</span>
        </button>
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" multiple hidden onChange={(event) => { addFiles(event.target.files); event.target.value = ''; }} />
        {items.length > 0 && <div className="upload-items">{items.map((item, index) => (
          <div className="upload-item" key={`${item.file.name}-${index}`}>
            <img src={item.preview} alt="Upload preview" />
            <div className="upload-item-fields">
              <input className="form-control form-control-sm" value={item.title} onChange={(event) => updateItem(index, 'title', event.target.value)} aria-label="Photo title" placeholder="Photo title" />
              <div className="upload-item-bottom"><select className="form-select form-select-sm" value={item.category} onChange={(event) => updateItem(index, 'category', event.target.value)} aria-label="Photo category">{categories.filter((category) => category !== 'All Photos').map((category) => <option key={category}>{category}</option>)}</select><span>{(item.file.size / 1024 / 1024).toFixed(1)} MB</span></div>
              <input className="form-control form-control-sm" value={item.description} onChange={(event) => updateItem(index, 'description', event.target.value)} aria-label="Photo description" placeholder="Add a description (optional)" />
            </div>
            <button type="button" className="remove-upload" aria-label={`Remove ${item.file.name}`} onClick={() => removeItem(index)}><i className="bi bi-x-lg" /></button>
          </div>
        ))}</div>}
        {error && <div className="upload-error" role="alert"><i className="bi bi-exclamation-circle me-2" />{error}</div>}
        <div className="upload-footer"><span>{items.length} {items.length === 1 ? 'photo' : 'photos'} selected</span><button type="submit" className="btn btn-dark" disabled={saving}>{saving ? <><span className="spinner-border spinner-border-sm me-2" />Saving...</> : <>Add to gallery <i className="bi bi-arrow-right ms-2" /></>}</button></div>
      </form>
    </div>
  );
}
