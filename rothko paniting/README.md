# Rothko Studio

A responsive, Rothko-inspired color field painting studio built with React, Vite, Bootstrap 5, and CSS. Create and edit layered compositions, explore eight palettes, save work locally, and export high-resolution PNG or JPEG files.

This is an independent creative tool and is not affiliated with or endorsed by Mark Rothko or his estate.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create and preview a production build:

```bash
npm run build
npm run preview
```

## Using the studio

- Select a palette or generate a balanced random composition.
- Select a field on the canvas or in the composition list, then adjust its color, size, position, softness, opacity, and stacking order.
- Add or remove fields, adjust spacing, and toggle fine borders.
- Name and save a painting to the browser's local gallery. Saved paintings remain in that browser's local storage.
- Export a 1600 × 2000 PNG or JPEG, or a 3200 × 4000 PNG. Copy a comma-separated HEX palette with the palette button.
- Switch between light and dark interface themes with the navigation toggle.

All artwork is rendered in the browser; no image service or account is required.
