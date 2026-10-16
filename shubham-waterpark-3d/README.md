# Shubham Water Park — real-photo motion website

A Vite + React + TypeScript marketing site built around photographs and the logo from the park’s official website. The active experience uses scroll-linked photo parallax, perspective and rotation, layered photo collages, hero image crossfades and zooms, an animated marquee, and a keyboard-accessible photograph viewer.

## Requirements

Node.js 22.12+ and npm. This photo-led version does not require WebGL.

## Install and run

```powershell
cd shubham-waterpark-3d
npm install
npm run dev
```

Open http://localhost:5173.

## Build and preview

```powershell
npm run build
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

Open http://127.0.0.1:4173. The explicit IPv4 address avoids an unrelated service on this machine’s IPv6 localhost. If this project’s existing preview is still running, it serves the newest dist folder after a rebuild.

## Folder structure

```text
src/
  App.tsx                         Active photo experience entry point
  sections/PhotoExperience.tsx     Photo hero, attraction stories, gallery and viewer
  sections/JourneySections.tsx     Shared safety, visit and footer components
  photo.css                       Photo-led layout, perspective and transitions
  index.css                       Shared styles and fonts
  components/ui/                  Dialogs, preloader, progress and icons
  components/3d/ParkWorld.tsx      Previous procedural concept, preserved but not loaded
  hooks/useJourney.ts             Lenis, GSAP ScrollTrigger and motion preferences
  store/useParkStore.ts            Journey and preference state
  data/attractions.ts              Editable copy, photo mappings, contact placeholders
public/images/                    Local optimized WebP photos and official logo
public/images/sources.json        Original source URL for every downloaded asset
scripts/fetch-photos.py            Reproducible official-site photo download helper
```

## Photography and content

All photographs were downloaded from the image URLs exposed by https://shubhamwaterworld.com/ on 16 October 2026 and optimized to local WebP assets. The original URLs are retained in `public/images/sources.json`; no runtime hotlinking is required. `photoStory` in `src/data/attractions.ts` selects the hero, attraction and gallery photographs and holds descriptive alt text. Gallery captions preserve the actual image labels found on the source site. The attraction storytelling and safety copy from the original brief are retained separately; the park should reconcile ride names and rules with its current offerings before publishing.

Replace a file in `public/images/` or update its entry in `photoStory` to swap imagery. Keep important subjects inside the central crop on mobile. Hero photographs load eagerly; story and gallery photographs lazy-load. The preloader finishes when the first hero photo loads. The motion control pauses scroll-linked photo transformations and the marquee; OS reduced-motion settings also disable smooth scrolling and reveal effects. Hero thumbnails change photographs only when clicked.

## Optional 3D assets

The previous procedural `ParkWorld.tsx` remains available as a source reference and is excluded from the active production bundle. If reintroducing real .glb models, place them in `public/models/`, load them with drei’s `useGLTF('/models/slide.glb')`, and render cloned scenes inside an R3F Canvas. Keep the photo-first experience as the default.

## Commands

`npm run dev`, `npm run build`, `npm run preview`, `npm run format`.

## TODO before launch

Prices/packages, verified phone, WhatsApp, email, full address, map embed, booking URL and social links. Missing booking links display a clear coming-soon dialog. Missing socials stay disabled. Add final photo selection, reconcile ride information, and consider booking integration and Marathi/Hindi language options.

## Photo redesign verification

Verified in the local browser: hero image crossfade, image viewer open/next/close, section navigation, and pause/resume photo motion. Mobile layout inspected at 390 × 844 with no horizontal overflow or broken loaded images. Production build passes without warnings. Production preview has a clean console, eight photo attraction panels, and no WebGL dependency.
