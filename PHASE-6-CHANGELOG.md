# Phase 6 — QA readiness and deployment prep

- Added a keyboard-visible “Skip to story” link and a main-content focus target where the page structure permits it.
- Improved mobile guestbook form layout and touch interaction behavior.
- Expanded reduced-motion safeguards across transitions and animations.
- Corrected the guestbook textarea font declaration.
- Refactored the Easter egg tap handler to avoid a state update inside a state updater.
- Added Open Graph and Twitter preview metadata.
- Added `vercel.json`, `public/robots.txt`, and `DEPLOYMENT.md` with hosting steps, a manual QA checklist, and transparent known limitations.

## Verification status

Source edits and deployment configuration are included. A successful `npm run build` has **not** been verified in this environment; run it before public deployment. The temporary Pip character art and client-only guestbook remain known limitations.
