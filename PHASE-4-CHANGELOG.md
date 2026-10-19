# Phase 4 changelog — Pip's Little Inventions

Added a three-card project showcase to the existing Phase 1–3 story website:

1. **The Skipped Lullaby** — a deliberately incomplete lullaby with an interaction that animates floating musical notes.
2. **The Almost-Brave Lantern** — a lantern that brightens when activated.
3. **The Window-Waving Route** — a dream-delivery route with a waving floating dream bubble.

Each card includes expandable project details, keyboard-operable native controls, and an explicit action label. The layout collapses from three columns to two and then one column. Motion effects are disabled or simplified for reduced-motion preferences. The visuals are CSS illustrations so no additional external assets are required.

## Run

```bash
npm install
npm run dev
npm run build
```

## Known limitations

- These are front-end concept interactions, not audio playback or backend-connected projects.
- Pip's character art remains the placeholder/reference artwork described in the main README.
- The Echo UI design system has been consulted for tactile interaction/accessibility guidance, but its component package has not been installed into this project; current controls remain native buttons to avoid introducing unverified dependencies into this phase.
