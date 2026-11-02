# Color Maker

A responsive color palette studio built with React, Vite, and Bootstrap. Generate and edit harmonious palettes, convert color formats, explore color relationships, check WCAG contrast, and save palettes in your browser.

## Getting started

Requirements: Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run `npm run build`; preview it with `npm run preview`.

## Features

- Generate five coordinated colors while preserving locked swatches.
- Edit colors with native color pickers and copy HEX, RGB, or HSL values.
- Convert HEX, RGB, and HSL input into all three formats.
- Generate complementary, analogous, triadic, split complementary, tetradic, and monochromatic harmonies.
- Filter and load sixteen curated palettes, then save, load, copy, or delete personal palettes.
- Check WCAG AA and AAA contrast for normal and large text.
- Toggle dark mode and use the Space key to generate a palette (except while editing a form field).

Saved palettes and the selected theme are stored in browser localStorage.
