# The Daily Grind

A responsive cafe menu and ordering experience built with React and Vite. Browse the menu by category, search for a favourite, add items to a persistent shopping cart, and get in touch with the cafe.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Getting started

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Available scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Run Oxlint
```

## Features

- Responsive layouts styled with Bootstrap 5 and custom cafe-inspired CSS.
- 24 local menu records across coffee, tea, cold drinks, snacks and main meals.
- Combined category filtering and text search.
- Cart quantity controls, item removal, subtotal, clear-order action and localStorage persistence.
- Accessible cart drawer with keyboard dismissal.
- Contact form with required fields, email validation and a confirmation message.
- Offers, cafe story, opening hours and Nairobi contact information.

Menu photos are served by Unsplash. Contact details and promotional pricing are sample cafe content and can be updated in `src/components/Contact.jsx` and `src/components/SpecialOffers.jsx`.
