# Merge report — eight phase archives

## Result

All eight supplied ZIP archives have been consolidated into the single `pip-midnight-nursery-unified` project root. The application is based on the Phase 8 snapshot, which is cumulative; prior phases do not represent independent sub-applications.

## Resolution rules

1. **Latest cumulative files win.** Changed versions of `src/App.tsx`, `src/styles/global.css`, `index.html`, `README.md`, and `src/components/PipCharacter.tsx` are taken from Phase 8.
2. **Unique project materials are retained.** This includes `BLUEPRINT.md`, all supplied phase changelogs, `DEPLOYMENT.md`, `CHARACTER-BIBLE.md`, the approved Pip image, both reference images, asset credits, `vercel.json`, and `public/robots.txt`.
3. **Folder names normalized.** Snapshot-specific wrapper paths such as `pip-midnight-nursery-phase-7/` were removed so the project opens directly at a standard repository root.
4. **Generated cache excluded.** The Phase 1 `node_modules/.tmp/tsconfig.app.tsbuildinfo` file was omitted. No actual dependency tree was included.
5. **Documentation reconciled.** The README and deployment guide reflect Phase 8 image usage. `ARCHITECTURE.md` describes component and state ownership.
6. **Gaps labeled honestly.** The source archives had no Phase 1 or Phase 5 changelog, so corresponding notes are marked reconstructed.

## Archive consistency

The Phase 8 archive provided all meaningful project paths present across Phases 1–7, with only the generated Phase 1 build-cache file omitted. The older snapshots were compared by canonical path and content hashes before choosing the latest versions.

## Validation status

ZIP integrity and core project-path consistency are checked by the merge process. Dependency installation, TypeScript compilation, Vite production build, visual QA, and deployment are not certified by this merge. Follow the checklist in `DEPLOYMENT.md`.
