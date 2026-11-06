# Pixel Gallery

A responsive photography gallery built with React, Vite, Bootstrap 5, and Bootstrap Icons. Browse a curated sample collection, search and filter photos, save favourites, organize albums, and upload your own images.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Create a production build with `npm run build`, or preview it with `npm run preview`.

## Features

- Twenty sample photographs across eight categories.
- Responsive masonry-style photo grid with category and text filters.
- Full-screen viewer with previous/next navigation, keyboard shortcuts, details, favourites, album assignment, and downloads.
- Multi-image upload with previews, per-photo title/category/description, and JPG, PNG, or WEBP validation (10 MB maximum per image).
- User uploads stored as image blobs in IndexedDB. Favourites and album metadata persist in localStorage.
- Confirmation before deleting uploaded photos or albums.

Uploaded images stay in the current browser profile. Sample photographs are served from Unsplash and require an internet connection.
