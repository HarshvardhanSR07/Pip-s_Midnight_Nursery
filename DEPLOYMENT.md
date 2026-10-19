# Deployment and QA guide

## Before publishing

1. Use a current Node.js LTS release.
2. Run `npm install` and `npm run build`; resolve any compiler or bundler errors before deploying.
3. Run `npm run dev` and use the manual QA checklist below on desktop and mobile.
4. Review `public/assets/ASSET_CREDITS.md` and the character constraints in `CHARACTER-BIBLE.md`.
5. Replace the `og:image` and `twitter:image` values in `index.html` with absolute public URLs on the deployed domain.
6. Verify that the social preview image can be fetched without authentication.

## Deploy to Vercel

1. Import the project repository into Vercel.
2. Framework preset: **Vite**.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. No environment variables are needed by the current client-only prototype.
6. After deployment, test the public URL on desktop and mobile.

## Deploy to Netlify

Use `npm run build` as the build command and `dist` as the publish directory.

## Manual QA checklist

- [ ] Rendered intro video (`/assets/intro/intro-dark.mp4`) plays smoothly for ~20 seconds with poster fallback.
- [ ] Intro can be skipped immediately at any time; second visit in the same session skips it.
- [ ] Reduced-motion preference skips the intro and reduces other animation.
- [ ] Sound is off by default; the audio toggle un-mutes the video track cleanly.
- [ ] Subtitle “Halooo, I Pip” displays at 15.5–18.5s and fades to hero at 19.2s.
- [ ] Video playback fallback works if the video file is missing or autoplay is blocked.
- [ ] Pip's approved front-view asset loads from `/assets/pip/pip-front-approved.png`.
- [ ] Story interactions work by mouse, touch, and keyboard.
- [ ] Buttons have visible focus and project controls keep labels and pressed states in sync.
- [ ] The nursery-star Easter egg reveals after five activations and can be dismissed with the keyboard.
- [ ] The guestbook rejects blank input, enforces its limit, and explains that notes are local to the open page.
- [ ] No horizontal overflow at 320px, 375px, 768px, and desktop widths.
- [ ] Verify asset credits, font loading, metadata, and social preview behavior.

## Known limitations

- The intro uses an optimized 20-second H.264 video (`intro-dark.mp4` / `intro-nursery.mp4`); browsers with strict data-saver mode may rely on the built-in SVG/CSS fallback.
- The guestbook is client-side state only and clears after reload.
- Font loading uses Google Fonts, which may require network access.
