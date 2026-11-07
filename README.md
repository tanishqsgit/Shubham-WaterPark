# Shubham Water Park website

A photo-led React and TypeScript website. The application source is in
[`shubham-waterpark-3d/`](shubham-waterpark-3d/), despite the folder's historical 3D name.

## Experience and implementation

- Responsive photo storytelling, image galleries, and a keyboard-accessible viewer.
- Scroll-linked transitions, photo parallax, and motion preference controls.
- Local optimized WebP imagery with recorded source URLs.
- A photo-led default experience; the earlier procedural 3D concept remains in source.

**Stack:** React · TypeScript · Vite · GSAP · Tailwind CSS

## Run locally

Requires Node.js 22.12 or later and npm.

```sh
cd shubham-waterpark-3d
npm ci
npm run dev
```

Open the URL printed by Vite. Stop with Ctrl+C. Use `npm run build` to create
`dist/`, then `npm run preview` to inspect the build locally.

## Documentation

- [Application guide](shubham-waterpark-3d/README.md): source map, imagery, motion settings, and launch gaps.
- [Content review checklist](docs/content-review.md): copy and accessibility checks before publication.

The existing guide identifies unverified prices, contact details, booking links,
and ride information. Confirm them with the site owner before launch. The project
is not evidence that these business details have been approved.
