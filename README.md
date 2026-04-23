# Rahul & Nitisha — Wedding Invitation

A premium Indian wedding invitation website for the wedding of **Rahul & Nitisha**, built with TanStack Start and deployed on Netlify.

## Features

- Full-screen hero with animated floating petals and rotating floral corner ornaments
- Live countdown timer to the wedding ceremony (09 May 2026, 10:35 AM IST)
- Event cards for all three festivities — Haldi, Wedding, and Reception — with Google Maps links
- Scroll-reveal animations triggered by IntersectionObserver
- Navigation dot scrollspy (desktop)
- Background music player with play/pause toggle
- Fully mobile-responsive design

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start (React 19 + TanStack Router) |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + custom CSS variables |
| Fonts | Google Fonts — Great Vibes, Playfair Display, Cormorant Garamond |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Running Locally

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:3000` (or `http://localhost:8888` via Netlify CLI).

## Project Structure

```
src/
├── routes/
│   ├── __root.tsx     # Root layout — Google Fonts links + metadata
│   └── index.tsx      # Wedding invitation page (all sections)
└── styles.css         # Theme tokens, section styles, animations
```
