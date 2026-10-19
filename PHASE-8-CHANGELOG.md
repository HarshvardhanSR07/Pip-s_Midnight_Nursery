# Phase 8 — Character identity integration

- Replaced the custom SVG stand-in in the intro with a crop of the existing Pip reference sheet.
- Added `CHARACTER-BIBLE.md` to lock Pip's silhouette, palette, materials, motion rules, and future asset checks.
- Updated the wave treatment to a subtle whole-image motion appropriate for a non-rigged raster asset.
- Added a reduced-motion override for the wave.

## Known limitation
The supplied reference sheet has a light background and baked-in lighting. The new crop removes most of the near-white background, but this is not a substitute for a clean, approved transparent render. Pip's wave is not limb-rigged.

## Verification
The source changes are packaged. A production build is not claimed because dependency installation has not completed in this environment.
