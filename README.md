# Cosmino Exhibition Curator — Virtual Art Exhibition Builder

Curate your own **viewer-driven virtual exhibitions** from open museum collections. Search across multiple institutions, pick artworks, and assemble a session-based exhibition that’s fast, accessible, and mobile-first — now with a **full-screen Presentation Mode**.

---

## What this project does

- **Search** artworks across the **Art Institute of Chicago (AIC)** and **Cleveland Museum of Art (CMA)** public/open APIs.
- **Preview** image, title, artist, date, medium, and on-view/context info (when available).
- **Curate** a personal exhibition that persists for the **current session** (no sign-in).
- **Present (NEW)** your exhibition in a **full-screen slideshow** with keyboard and click navigation.
- **Performant** (field-projected search, lazy images, caching) and **accessible** (keyboard, ARIA, contrast).

---

## Live Demo & Screenshots

_Add your deployed URL(s) and screenshots once you publish._

- **Live**: _TBD_
- **Screenshots**: _TBD_

---

## Tech Stack

- **Vite + React (JavaScript)**
- **React Router v6** (routing)
- **TanStack Query** (data fetching & caching)
- **Tailwind CSS** (styling)
- **ESLint + Prettier** (code quality)
- **Vitest + React Testing Library** (unit/component tests)
- **Playwright** (optional e2e tests)

---

## Data Sources & Licensing

- **Art Institute of Chicago (AIC) — Public API**
  - Search via `/api/v1/artworks/search` (returns `image_id`; the app constructs IIIF URLs).
  - Some filters (e.g., “has image”) are applied **client-side** by checking `image_id`.

- **Cleveland Museum of Art (CMA) — Open Access API**
  - Search via `/api/artworks` (supports `has_image`, `cc0`, pagination).

**Licensing:** The app prefers public-domain/CC0 items where possible, but individual records may vary. **Code** is MIT-licensed. **Images/metadata** follow the institutions’ terms — always check each artwork’s museum page before reuse.

---

## Features

- **Mobile-first**, responsive UI
- **Aggregated search** across AIC + CMA with a normalized Artwork model
- **Session persistence** in `sessionStorage`
- **Robust UX**: skeleton loaders, clear error states, partial results when one source fails
- **Accessibility**: focus management, `aria-live` announcements, descriptive alt text, high contrast

### New: Presentation Mode

A **kiosk-friendly**, **full-screen** slideshow view of your curated exhibition.

- Route: `/present`
- Navigation:
  - **→ / Space**: next
  - **←**: previous
  - **ESC**: exit presentation
  - **Click/tap** anywhere on the slide: next
- Overlay includes image, title, artist, date, and museum attribution with a subtle progress indicator.

---

## Project Structure

_Includes the new Present page._

## Getting Started

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+ (or pnpm/yarn)
- No API keys required

### 1) Install

```bash
npm install
```

### 2) Run locally

```bash
npm run dev
# open the printed local URL (typically http://localhost:5173)
```

### Build & preview

```bash
npm run build
npm run preview
```

## How to Use the App

- Search: Enter a term (e.g., “Impressionism”, “Egypt”) or tap a preset chip.

- Filter & sort: Toggle AIC/CMA sources; sort by Title/Artist.

- Inspect: Click a card for the details modal (bigger image + metadata).

- Curate: Click Add to put the item into My Exhibition.

- Manage: Open My Exhibition to reorder, remove, and add a title/description.

- Present (NEW): Click Present ▶ to launch the full-screen slideshow.

Selections persist for the current browser session.
