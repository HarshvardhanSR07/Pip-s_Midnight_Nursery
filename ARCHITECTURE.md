# Architecture — Pip: Midnight Nursery

## 1. Structural model

The app is a single-page React experience. `src/main.tsx` mounts `App`; `App` owns global story state and renders the intro plus the story sections. Small reusable components are kept separate where they own a clear presentation or browser capability. Story illustrations are primarily CSS-built, so scenes do not depend on extra scene-art downloads.

```text
index.html
  └── src/main.tsx
       └── App.tsx  (global story state + page composition)
            ├── IntroSequence.tsx
            │    ├── Cloud.tsx
            │    ├── PipCharacter.tsx ── public/assets/pip/pip-front-approved.png
            │    ├── AudioToggle.tsx
            │    └── utils/audio.ts ── Web Audio API chimes
            ├── Workshop / dream-bubble scene (CSS illustration)
            ├── Unfinished-dream / ghost + cloud side quest (CSS illustration)
            ├── Three dream project cards (CSS illustration + native controls)
            ├── Keeper of Loose Ends + local guestbook
            └── theme, footer, hidden Easter egg
```

## 2. Logic ownership

| Concern | Owner | State / behavior |
|---|---|---|
| Intro lifecycle | `App.tsx` + `IntroSequence.tsx` | Intro visibility; timed phases; skip action; once-per-session marker; reduced-motion shortcut |
| Sound | `App.tsx`, `AudioToggle.tsx`, `utils/audio.ts` | Opt-in toggle, disabled by default; generated chimes rather than bundled audio |
| Theme | `App.tsx` + global CSS | `midnight` / `morning` state applied via `document.documentElement.dataset.theme` |
| Bubble scene | `App.tsx` | Catch/release state, attempt count, reset action |
| Ghost + cloud side quest | `App.tsx` | Reversible ghost and cloud states; live outcome copy |
| Project cards | `App.tsx` | Active project IDs tracked in React state; action labels and `aria-pressed` follow state |
| Guestbook | `App.tsx` | One trimmed note, max 240 characters, in-memory only |
| Easter egg | `App.tsx` | Five star activations reveal the secret; state can be reset |
| Presentation and motion | `src/styles/global.css` | Layout, theme tokens, interaction states, responsive and reduced-motion behavior |

## 3. Story progression and narrative logic

The narrative has a deliberate emotional sequence: **notice a small accident → permit an unfinished dream → explore gentle inventions → accept loose ends**. Interactions are reversible where reversal is part of the story: a ghost can be tucked back in, the cloud can wake, and project actions can be toggled. This keeps the experience exploratory rather than forcing a single “correct” ending. The unsettling element is atmospheric and nocturnal, not threatening; `CHARACTER-BIBLE.md` is the canonical visual constraint for Pip.

The intro timeline is local to the browser: the cloud wanders first, Pip appears at 10 seconds, the greeting/wave begins around 15 seconds, handoff starts at 18 seconds, and completion happens at 20 seconds. The skip control ends the intro immediately. Session storage failures are handled without breaking the experience.

## 4. Accessibility and interaction contracts

- Use native buttons, links, form controls, and `<details>` for keyboard behavior.
- Interactive state lives in React, not direct DOM text/class mutation.
- Keep action labels and `aria-pressed` values aligned with the current state.
- The guestbook states that notes are not sent to a server; it must not be described as persistent storage.
- Respect `prefers-reduced-motion` in both the intro and scene animation.
- Keep the “Skip to story” link and visible focus styles.
- Re-test at narrow mobile widths and with keyboard-only navigation before public release.

## 5. Asset and style conventions

- `public/assets/pip/pip-front-approved.png` is the current intro character asset referenced by `PipCharacter.tsx`.
- `pip-reference-sheet.png` and `pip-reference-poster.png` are retained source/reference assets and the poster is used for social preview metadata.
- Do not replace Pip art casually; follow `CHARACTER-BIBLE.md` and review `public/assets/ASSET_CREDITS.md`.
- Scene-specific decorative visuals remain in CSS until approved, final artwork exists.
- Sound cues are synthesized in `src/utils/audio.ts`; there are no audio media files required for the current intro.

## 6. Build and deployment architecture

Vite builds the static site into `dist/`. `vercel.json` names Vite as the framework and sets `dist` as the output directory. Netlify can use the same `npm run build` command and `dist` output. There are no server routes, API handlers, or environment variables in the current prototype.

Recommended validation path:

1. `npm install`
2. `npm run build`
3. `npm run dev` and exercise all scenes in a browser
4. Check keyboard access, reduced motion, 320/375/768 px layouts, sound opt-in, guestbook messaging, and console errors
5. Replace relative social preview image URLs with absolute deployment URLs, then verify the social card

## 7. Integration decisions

- **Canonical source:** the supplied Phase 8 snapshot. It is cumulative and contains all meaningful project files from the earlier archives plus the Phase 8 character asset/bible.
- **Conflicting snapshots:** for changed app and stylesheet files, the latest Phase 8 versions were selected rather than concatenating implementations. Concatenating React component or CSS revisions would create duplicate declarations and competing behavior.
- **Documentation:** stale SVG-placeholder wording was replaced in the project README and deployment notes; historical changelogs remain as history.
- **Archive cleanup:** archive-specific top-level folder names were removed, `node_modules/.tmp/tsconfig.app.tsbuildinfo` was excluded as generated cache, and the eight inputs were not nested inside the final ZIP.
- **Historical gaps:** Phase 1 and Phase 5 changelog files were not provided, so their notes are explicitly labeled reconstructed from the supplied snapshots.

## 8. Current known constraints

This is a consolidated source package, not a certified production release. The character remains raster/non-rigged, guestbook data is not persistent, spoken voice is not bundled, social URLs need deployment-time adjustment, and the production build still needs verification in an environment with installed dependencies.
