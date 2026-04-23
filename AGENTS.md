# AGENTS.md

## Project Overview

A premium Indian wedding invitation website for **Rahul & Nitisha** (09 May 2026). Built with TanStack Start and deployed on Netlify. Single-route application — all invitation content is on the home page with no navigation between pages.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + custom CSS |
| Language | TypeScript 5.7 (strict mode) |
| Fonts | Google Fonts (Great Vibes, Playfair Display, Cormorant Garamond) |
| Deployment | Netlify |

## Directory Structure

```
src/
├── routes/
│   ├── __root.tsx     # Root shell: Google Fonts links, page title, meta tags
│   └── index.tsx      # Full wedding invitation page (Hero, Countdown, Events, Closing)
└── styles.css         # All CSS: theme tokens, section styles, card styles, animations
```

## Key Components (all in `src/routes/index.tsx`)

| Component | Purpose |
|-----------|---------|
| `WeddingInvitation` | Root page component, calls `useRevealOnScroll()` on mount |
| `MusicPlayer` | Fixed bottom-right audio toggle; loops background instrumental |
| `CountdownSection` | Live countdown via `useCountdown()` (ticks every second) to wedding date |
| `EventCard` | Reusable card for Haldi / Wedding / Reception with Google Maps links |
| `NavDots` | Fixed right-side scrollspy dots (hidden on mobile) |
| `Petals` | Floating animated emoji petals layered in the hero section |

## Design System

CSS custom properties in `styles.css` under `:root`:

- `--gold`, `--gold-light`, `--gold-pale`, `--gold-shine` — gold palette
- `--maroon`, `--maroon-light` — deep red (hero gradient, wedding card)
- `--cream`, `--cream-dark` — off-white section backgrounds
- `--marigold`, `--orange` — warm accents

Font roles:
- `Great Vibes` — cursive script for names and taglines
- `Playfair Display` — headings
- `Cormorant Garamond` — body/subtitle text

## Events Data

Defined as `const EVENTS` in `index.tsx`. Each entry:

```ts
{ id, name, icon, date, time, venue, address, mapUrl, cardClass }
```

`cardClass` must be `"haldi"`, `"wedding"`, or `"reception"` — mapped to CSS gradient, button color, and hover rules in `styles.css`.

## Non-Obvious Decisions

- `WEDDING_DATE` includes `+05:30` IST offset so the countdown is globally accurate.
- `useRevealOnScroll` queries `.reveal` elements once on mount; dynamically rendered elements added after mount won't be observed unless a separate observer is set up.
- Music auto-play is browser-blocked until user gesture — the hint tooltip disappears after the first successful `play()`.
- Static styles live in `styles.css`; inline styles are used only for dynamic/animated values.
- Scroll-reveal uses class toggling (`.reveal` → `.reveal.visible`) rather than JS-driven style mutation, so transitions are CSS-controlled.

## Conventions

- TypeScript strict mode; `@/` alias maps to `src/`
- No comments unless the WHY is non-obvious
- PascalCase components, camelCase hooks/utilities

## Development Commands

```bash
npm run dev      # Start dev server (port 3000, or 8888 via Netlify CLI)
npm run build    # Production build
```
