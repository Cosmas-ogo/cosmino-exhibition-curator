# Cosmino Exhibition Curator — Virtual Art Exhibition Builder

Curate your own viewer-driven virtual exhibitions from open museum collections. Search across multiple institutions, pick artworks, and assemble a session-based exhibition that’s fast, accessible, and mobile-first — now with a full-screen Presentation Mode\*\*.

---

## What this project does

- Search artworks across the Art Institute of Chicago (AIC) and Cleveland Museum of Art (CMA) public/open APIs.
- Preview image, title, artist, date, medium, and on-view/context info (when available).
- Curate a personal exhibition that persists for the current session (no sign-in).
- Present your exhibition in a full-screen slideshow with keyboard and click navigation.
- Performant (field-projected search, lazy images, caching) and accessible (keyboard, ARIA, contrast).

## Live Demo

- Live: https://stellular-llama-c0bc2b.netlify.app/

## Tech Stack

- Vite + React (JavaScript)
- React Router v6 (routing)
- TanStack Query (data fetching & caching)
- Tailwind CSS (styling)
- ESLint + Prettier (code quality)
- Vitest + React Testing Library (unit/component tests)

---

## Data Sources & Licensing

- Art Institute of Chicago (AIC) — Public API
  - Search via `/api/v1/artworks/search` (returns `image_id`; the app constructs IIIF URLs).
  - Some filters (e.g., “has image”) are applied client-side by checking `image_id`.

- Cleveland Museum of Art (CMA) — Open Access API
  - Search via `/api/artworks` (supports `has_image`, `cc0`, pagination).

Licensing: The app prefers public-domain/CC0 items where possible, but individual records may vary. Code is MIT-licensed. Images/metadata follow the institutions’ terms — always check each artwork’s museum page before reuse.

---

## Features

- Mobile-first, responsive UI
- Aggregated search across AIC + CMA with a normalized Artwork model
- Session persistence in `sessionStorage`
- Robust UX: skeleton loaders, clear error states, partial results when one source fails
- Accessibility: focus management, `aria-live` announcements, descriptive alt text, high contrast

### New: Presentation Mode

A kiosk-friendly, full-screen slideshow view of your curated exhibition.

- Route: `/present`
- Navigation:
  - → / Space: next
  - ←: previous
  - ESC: exit presentation
  - Click/tap anywhere on the slide: next
- Overlay includes image, title, artist, date, and museum attribution with a subtle progress indicator.

---

## Project Structure

src/
api/
aic.js # AIC API client (search + artwork detail)
cma.js # CMA API client (search + artwork detail)
adapters.js # Normalizes AIC/CMA payloads into a common Artwork shape

components/
Header.jsx # Top nav: brand, search, exhibition badge
Footer.jsx # Credits & licensing notes
Toaster.jsx # App-wide toasts + aria-live status
SearchBar.jsx # Search input/submit
PresetChips.jsx # Quick preset search terms
FilterBar.jsx # Source toggles (AIC/CMA) + sort selector
ResultsGrid.jsx # Grid that shows ArtworkCard or SkeletonCard
ArtworkCard.jsx # Thumbnail, title, artist, add-to-exhibition
SkeletonCard.jsx # Loading placeholder card
ArtworkModal.jsx # Route-driven detail dialog (image + metadata + actions)
HeroImage.jsx # Responsive image for detail view
MetadataList.jsx # Key-value metadata block
ExhibitionTray.jsx # Sticky tray (mobile) with item count + open link
ExhibitionEditor.jsx # The “My Exhibition” page: title/description, reorder/remove, Present button

hooks/
useSearch.js # Aggregated search across sources with caching
useArtwork.js # Fetch detail by composite source:id with placeholder from cache

context/
ExhibitionContext.jsx# Session-scoped exhibition store (React Context + reducer)

pages/
Home.jsx # Search + results + tray
Exhibition.jsx # “My Exhibition” editor page
About.jsx # About/data sources/accessibility page
Present.jsx # Full-screen slideshow (presentation mode)

routes/
AppRouter.jsx # App shell: providers + routes (/, /exhibition, /about, /present)

lib/
storage.js # sessionStorage helpers (get/set JSON)
constants.js # App constants (e.g., preset terms)

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ (or pnpm/yarn)
- No API keys required

### 1) git clone https://github.com/Cosmas-ogo/cosmino-exhibition-curator.git

### 2) Install dependencies

npm install

### 3) Run locally

npm run dev

# open the printed local URL (typically http://localhost:5173)

### Build & preview

## How to Use the App

- Search: Enter a term (e.g., “Impressionism”, “Egypt”) or tap a preset chip.

- Filter & sort: Toggle AIC/CMA sources; sort by Title/Artist.

- Inspect: Click a card for the details modal (bigger image + metadata).

- Curate: Click Add to put the item into My Exhibition.

- Manage: Open My Exhibition to reorder, remove, and add a title/description.

- Present (NEW): Click Present ▶ to launch the full-screen slideshow.

Selections persist for the current browser session.
