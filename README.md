# Pip — Midnight Nursery

**A React storybook about unfinished dreams, soft midnight oddities, and a little ghost that does not need a perfect ending.**

This unified project combines the eight supplied phase archives into one runnable codebase. The Phase 8 snapshot is the canonical application baseline because it is the latest cumulative source and includes the approved front-view Pip image, character consistency notes, and reduced-motion-aware image animation. Historical phase notes are kept at the project root.

## Story and interactions

- **Intro sequence:** a 20-second cinematic intro video (`intro-dark.mp4` / `intro-nursery.mp4`), featuring a wandering cloud, Pip waking and rubbing eyes, and a cheerful wave greeting with subtitle and sound toggle. A robust SVG/CSS fallback ensures full compatibility.
- **A Tiny Accident:** catch/release a runaway dream bubble and reset the interaction.
- **The Unfinished Dream:** release or re-tuck a tiny ghost, and help a tired cloud rest.
- **Pip’s Little Inventions:** explore three interactive dream projects — the Skipped Lullaby, Almost-Brave Lantern, and Window-Waving Route.
- **Keeper of Loose Ends:** the story’s emotional resolution and a local-only guestbook for one unfinished thought.
- **Hidden Easter egg:** activate the header star five times; it is keyboard-operable.
- **Theme and sound:** toggle midnight/morning themes and opt into sound; sound is off by default.

## Tech stack

- React + TypeScript
- Vite
- Custom CSS (illustrations and most scenes are CSS-built)
- `lucide-react` icons
- Web Audio API for short synthesized chimes

## Run locally

Requirements: Node.js LTS and npm. The font import currently uses Google Fonts, so first development may require internet access.

```bash
npm install
npm run dev
```

## Build and preview

```bash
npm run build
npm run preview
```

A successful production build is **not claimed by this archive merge**. Run the build in your target environment before deploying. After install, keep `package-lock.json` in version control if generated so deployments resolve a consistent dependency tree.

## Architecture

See [`ARCHITECTURE.md`](ARCHITECTURE.md) for the component map, state ownership, interaction flows, asset conventions, and integration decisions. See [`DEPLOYMENT.md`](DEPLOYMENT.md) for Vercel/Netlify settings and the manual release checklist.

```text
pip-midnight-nursery-unified/
├── index.html
├── package.json
├── vite.config.ts
├── vercel.json
├── BLUEPRINT.md
├── ARCHITECTURE.md
├── CHARACTER-BIBLE.md
├── DEPLOYMENT.md
├── docs/
│   └── intro-reference/
├── public/
│   ├── robots.txt
│   └── assets/
│       ├── ASSET_CREDITS.md
│       ├── intro/
│       │   ├── intro-dark.mp4
│       │   ├── intro-dark-poster.jpg
│       │   ├── intro-nursery.mp4
│       │   └── intro-nursery-poster.jpg
│       └── pip/
│           ├── pip-front-approved.png
│           ├── pip-reference-poster.png
│           └── pip-reference-sheet.png
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── components/
    │   ├── AudioToggle.tsx
    │   ├── Cloud.tsx
    │   ├── IntroSequence.tsx
    │   └── PipCharacter.tsx
    ├── styles/global.css
    └── utils/audio.ts
```

## Release limitations to keep visible

- The intro features an animated 20-second video with full limb movement and facial expressions; hero illustrations use the approved front-view reference asset.
- The guestbook is held only in React state. It is not transmitted to a server and clears when the page reloads.
- “Halooo, I Pip” is displayed as text; no recorded spoken voice is bundled.
- Open Graph/Twitter image values are relative paths in `index.html`; replace them with absolute public URLs after deployment.

## Phase history

- [`PHASE-1-CHANGELOG.md`](PHASE-1-CHANGELOG.md) — reconstructed baseline note
- [`PHASE-2-CHANGELOG.md`](PHASE-2-CHANGELOG.md) — workshop interaction
- [`PHASE-3-CHANGELOG.md`](PHASE-3-CHANGELOG.md) — unfinished dream and cloud side quest
- [`PHASE-4-CHANGELOG.md`](PHASE-4-CHANGELOG.md) — three dream projects
- [`PHASE-5-CHANGELOG.md`](PHASE-5-CHANGELOG.md) — reconstructed closing section, guestbook, and Easter egg
- [`PHASE-6-CHANGELOG.md`](PHASE-6-CHANGELOG.md) — QA and deployment preparation
- [`PHASE-7-CHANGELOG.md`](PHASE-7-CHANGELOG.md) — interaction semantics and release polish
- [`PHASE-8-CHANGELOG.md`](PHASE-8-CHANGELOG.md) — character identity integration
