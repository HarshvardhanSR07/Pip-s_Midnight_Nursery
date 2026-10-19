# Pip: Keeper of Loose Ends
## Updated website blueprint — including the 20-second animated intro

**Project:** Baby's First Website — haX.baby  
**Track:** Official Pip character (Track 1)  
**Format:** One responsive, immersive scrolling portfolio  
**Creative direction:** Soft 3D/chibi artwork, midnight blue, nursery cream, peach, blush pink, lavender, and warm lantern gold  
**Build principle:** A two-part, 20-second cinematic intro; one coherent scroll story; three working portfolio projects; one memorable scroll interaction; one Easter egg; a reliable mute control.

---

## 1. Product direction

Pip is the youngest dreamwright in the Midnight Nursery. The older dreamwrights make perfect, sealed dreams. Pip's creations are crooked and unfinished, but that imperfection is what lets a sleeper contribute, escape, or feel safe.

The experience opens with a 20-second animated introduction before the visitor enters the scroll story. First, a faceless wandering cloud crosses a black screen and settles at center (10 seconds). Pip then pops out of that same cloud, greets the visitor, and leads into the nursery (10 seconds). The cloud’s ending frame and Pip’s opening frame must match exactly. After the intro, the website follows one causal story: Pip accidentally creates a runaway dream-bubble; it leads Pip to a tiny ghost trapped inside a perfect dream; Pip gives the ghost an exit; Pip calms the bubble with a hug; and the bubble becomes a golden blanket for the restless storm cloud. By dawn, Pip becomes **Keeper of Loose Ends**.

### Non-negotiable character canon
- Name: Pip.
- Identity: cute baby with a smooth, round skull face and cozy glowing points of light in the eye sockets.
- Profession: Junior Dream Engineer at the Midnight Nursery.
- Personality: curious, sleepy, a little clumsy, easily delighted; friendly and never scary, creepy, or gory.
- Open to interpretation: Pip's world, origin story, projects, and visual treatment.

Use the official character assets as the consistency reference. The supplied soft 3D pastel images guide the lighting, materials, and warmth, but must not erase Pip's skull-face identity.

## 2. Opening animation — two linked 10-second clips

Treat these as one 20-second opening sequence composed of two scenes. Clip 1 ends on a centered, resting cloud; Clip 2 begins from that exact composition. No jump in position, scale, lighting, or camera framing. Keep a visible **Skip intro** control throughout. Skipping moves directly to the main hero, not to a random middle scene.

### Intro Clip A — The Wandering Cloud (0–10 seconds)

| Time | Action | Animation direction |
|---|---|---|
| 0–2s | Entire screen is black. | No text, cloud, sound, or visible objects. Hold the darkness. |
| 2–3s | A small fluffy cloud enters from the bottom-right corner. | The cloud is pale pastel, soft-lit, and has **no face, eyes, mouth, or smile**. It leaves a fading trail of tiny golden star-dust sparkles. |
| 3–7s | The cloud bumps the top, left, and bottom edges once each. | The route is whimsical and slightly unpredictable, but readable. Each gentle collision uses subtle squash-and-stretch and a brief star-dust burst; never make impacts feel harsh. |
| 7–10s | The cloud floats to the exact screen center and settles. | Motion eases into a barely noticeable bob. Remaining sparkles fade. Hold a stable centered composition for the hand-off. |

**Important continuity rule:** the cloud’s final frame must be reusable as Clip B’s first frame. The cloud is only an object here; do not give it facial features or a smile.

### Intro Clip B — Pip Wakes Up (10–20 seconds)

| Time | Action | Animation direction |
|---|---|---|
| 10–12s | Pip pops out of the centered cloud. | Use the official Pip reference for the skull face, baby proportions, star-patterned nightcap, and soft 3D pastel treatment. Pip appears sleepy, not frightened. |
| 12–15s | Pip looks left, then right. | Small drowsy head turns; the nightcap pom-pom follows with a slight delay; a few remaining stars drift around him. |
| 15–18s | Pip looks toward the visitor and waves. | A warm, direct greeting. Show the exact subtitle: **“Halooo, I Pip”**. If a voice track is provided, speak that exact line. |
| 18–20s | Pip and the cloud drift toward the nursery window. | Golden star-dust leads into the opening hero scene. Use a dissolve or match-motion transition, not a hard cut. |

**Audio behavior:** do not autoplay audible speech or music before user permission. Show the greeting as text regardless of audio state. If the intro audio is muted or unavailable, the scene still makes complete sense. The global mute control must already be visible and operable during the intro.

**Playback behavior:** play once on initial visit, show **Skip intro**, and do not replay merely because the visitor scrolls. Provide an accessible static/shortened path for `prefers-reduced-motion`. On small screens, keep the cloud and Pip inside the viewport and avoid edge paths that cause horizontal overflow.

### Combined intro generation brief

> Create a 20-second, two-part animated opening for a whimsical pastel 3D nighttime fantasy website. First hold a fully black screen for two seconds. A small fluffy faceless pastel cloud enters from the bottom right, leaving fine golden star-dust. It gently bumps the top, left and bottom edges once each, then settles exactly at screen center by second 10. The cloud has no eyes, mouth, smile, or other facial features. Without changing camera framing or cloud position, Pip emerges from the cloud during seconds 10–12, matching the supplied official character reference: cute baby proportions, recognizable skull face, star-patterned nightcap, sleepy and friendly expression, soft 3D pastel shading. Pip glances left and right, looks directly at the viewer, waves, and says exactly “Halooo, I Pip” from seconds 15–18. During seconds 18–20, Pip and the cloud drift toward the nursery window and star-dust guides the transition into the main story. Use fluid easing, restrained sparkles, soft lighting, no hard cut, no extra characters, and stable character design.

**Implementation note:** this brief defines the intended motion; it does not mean a finished video asset exists. Build it with prepared character/cloud artwork plus CSS/Motion animation, or replace it with a rendered video once the approved reference-matched asset is available. Keep skip, subtitles, mute, and reduced-motion behavior functional either way.

## 3. Refined story script

**Narrative copy: 148 words by whitespace count.** Keep the passages attached to their respective scenes; do not render them as one wall of text.

### Scene A — The Midnight Nursery
> Pip tried to stamp a dream for a rumbling storm cloud. Their little hands slipped—starlight, rain-song and a soft yawn spilled into a crooked bubble. “Boing!” It bounced through the nursery window.

**Visual:** Pip at a cluttered-but-cozy workbench; oversized official dream stamp; restless storm cloud; bottles of starlight; bubble spilling toward an open window.  
**Motion:** One wobbling bottle, a small spill, then the bubble bounces away.  
**Interaction:** CTA: **Follow the glowing bubble**. Scroll remains native.

### Scene B — The Rooftop Chase
> Pip raced across rooftops as it bounced past snoozing bats and waved at chimney ghosts.

**Visual:** A miniature sleepy town, lavender mist, tiled roofs, chimney ghosts and curled-up bats. The bubble is the primary focal point, always ahead of Pip.  
**Motion:** Bubble bobbing is linked to the scene's scroll progress; bats stir and ghosts wave only as optional decorative reactions.  
**Interaction:** “Boing. Boing.” bounces once as the bubble passes. The story does not require the visitor to click every prop.

### Scene C — The Last Unlit Window
> At the town’s last dark window, the bubble revealed a tiny ghost trapped in a perfect dream with no door. The rule said: never open a sealed dream. Pip pulled one loose star from the bubble, tied it to the ghost’s wrist, and made a door.

**Visual:** One dark window, a tiny ghost inside a flawless sealed dream globe, and a loose golden star hanging from the bubble.  
**Interaction:** Button: **Give the ghost a way out**. Activating it unthreads the seal and reveals a door. This is a single deterministic interaction, not a branching story.

### Scene D — The Catch
> The bubble fled to a weather vane, trembling. Pip put away the tools and gave it a gentle hug.

**Visual:** High weather vane against a broad midnight sky; bubble flickering; Pip approaching with open hands.  
**Motion:** The bubble's irregular motion gradually calms. Do not use a net, trap, or complicated tool.

### Scene E — Sweet Dreams / The New Role
> It softened into a golden blanket, leaving one star dark. Pip tucked it over the storm cloud, who rumbled, sighed and slept. By dawn, Pip was Keeper of Loose Ends. Some dreams need room for you.

**Visual:** Bubble becomes a slightly irregular golden quilt; one star remains unlit; cloud settles to sleep; ghost has exited safely; the sky transitions to soft dawn.  
**Motion:** Gentle blanket expansion, one quiet rumble-sigh-snore, slow dawn fade. The last frame rests before the page moves on.

## 4. Page / section order

Use this order. The 20-second intro is a one-time cinematic prelude; after it, normal page scrolling begins. Do not interrupt the main chase with project cards.

0. **Animated intro — Wandering Cloud, then Pip Wakes Up (20 seconds total)**
   Black-screen hold → faceless cloud wanders in, bumps three edges, and settles at center → Pip emerges, glances left/right, waves, and says “Halooo, I Pip” → cloud/Pip transition into the nursery. Include Skip intro, captions, mute, and reduced-motion handling.

1. **Hero — The Midnight Nursery**  
   Headline: **Pip**  
   Role: *Junior Dream Engineer at the Midnight Nursery*  
   Tagline: “I build the dreams you fall asleep inside.”  
   Supporting line: “Some dreams need a little room left over.”  
   CTA: **Follow the glowing bubble**

2. **Meet Pip — The smallest dreamwright**  
   Briefly show the oversized dream stamp, small hands, crooked dream globe, star-print nightcap, and Nursery rule: “Every dream must be sealed. Loose ends are mistakes.” Keep this as a visual setup rather than an extra long story passage.

3. **The Spill**  
   Use Scene A's narrative copy. The bubble exits the nursery window.

4. **The Rooftop Chase**  
   Use Scene B's copy. The bubble leads the visitor down through the miniature town.

5. **The Last Unlit Window**  
   Use Scene C's copy. A single clear button helps Pip open an exit for the ghost.

6. **The Catch**  
   Use Scene D's copy. The bubble settles when Pip hugs it.

7. **Sweet Dreams / Keeper of Loose Ends**  
   Use Scene E's copy. This is the emotional climax and the story's resting point.

8. **The Workshop — Three portfolio projects**  
   Headline: **Three little things that work a little differently.** These projects are proof of Pip's craft, not a separate unrelated catalogue.

9. **Side quests and footer**  
   Audio toggle, Midnight/Morning toggle, optional dream-wish guestbook, nightcap Easter egg, credits.

## 5. The three required portfolio projects

Each card uses the same outer layout but has its own small interaction. Do not build three separate applications.

### 1 — The Lullaby Lab
**Card copy:** “A lullaby with one note missing. Add the note you'd sing yourself.”  
**Action:** **Play the lullaby**  
**Interaction:** Play/pause a short supplied audio loop. A clearly indicated missing-note button can add a simple note or visual response. Include a global mute control. Audio starts only after visitor input.

### 2 — The Nightlight Collection
**Card copy:** “A lantern that waits for someone brave enough to look into the dark.”  
**Action:** **Wake the lantern**  
**Interaction:** One button switches on the lantern, fading in warm light and revealing hidden illustration details. One star deliberately remains dark. CSS opacity/gradient changes are sufficient; no 3D engine needed.

### 3 — Dream Delivery Routes
**Card copy:** “My map takes the scenic route. Some windows deserve a wave.”  
**Action:** **Explore the route**  
**Interaction:** An illustrated SVG town map with three selectable route stops. Selecting each stop illuminates a route segment and makes a window character wave. This is an illustrated map, not a real geospatial map.

## 6. Utility interactions

### Audio toggle
- Visible and operable throughout the intro and rest of the page.
- Starts muted/off by default; no autoplay. This includes Pip’s spoken greeting and any music or sound effects.
- One source of truth for audio enabled state.
- Every sound-producing component obeys the same mute state.
- Provide a clear label/state, such as **Sound on** / **Sound off**.

### Midnight / Morning theme toggle
- Changes only theme colors and decorative lighting.
- Must not reset scroll position, story state, audio or project interactions.
- Implement with a root `data-theme` attribute and CSS variables.

### Easter egg
- Hint: “Psst… try clicking Pip’s starry nightcap.”
- Clicking/tapping or keyboard-activating the nightcap reveals a small hidden room or drawer.
- Hidden copy: “You don't have to fix every little thing.”
- Provide a close control and respect focus/keyboard access.

### Guestbook (optional after the core is complete)
- Prompt: “What would you leave unfinished, just a little?”
- Accept a short message, validate its length, show a clear success state, and prevent empty submission.
- MVP: store wishes in page state or local storage on that browser only. This is not a shared guestbook.
- Add Supabase only if visitors need to see the same entries across devices; then configure Row Level Security and submission limits.

## 7. Recommended tech stack

| Need | Choice | Why |
|---|---|---|
| UI | React + TypeScript | Component reuse and safer props/state for the scenes and interactive projects. |
| Dev/build | Vite (`react-ts` template) | Lightweight setup, fast feedback, production build for static hosting. |
| Animations | Motion for React (`motion`, imports from `motion/react`) | Use `useScroll` for scroll-linked bubble movement and `whileInView`/`useInView` for scene reveals. |
| Styling | CSS modules or plain CSS + CSS custom properties | Best control over the custom pastel art direction, responsive scene layouts, and media-query behavior. |
| Small decorative motion | CSS keyframes | Floating stars, glow, small bobbing, fades. Avoid JavaScript for effects that CSS handles. |
| Audio | HTML `<audio>` / `Audio` element, managed with a small React hook | Enough for a lullaby and a few optional sound effects. Use Web Audio API only if real-time sound synthesis is essential. |
| Images | Official Pip assets + optimized WebP/AVIF and SVG where appropriate | Consistency and efficient delivery without a real-time 3D renderer. |
| Hosting | Vercel or Netlify | Straightforward deployment for a Vite static site. |
| Optional data | Supabase, only for a shared guestbook | The main story and projects need no server/database. |

**Do not add by default:** GSAP, Three.js/React Three Fiber, Redux, React Router, Tailwind, a backend, or an AI chatbot. Add a library only when a concrete requirement cannot be handled cleanly with the current stack. Motion and GSAP overlap; choose one animation system. Tailwind is optional, not a second styling system.

## 8. Lean project structure

```text
pip-midnight-nursery/
├── public/
│   ├── assets/
│   │   ├── pip/                 # official and prepared Pip poses
│   │   ├── scenes/              # nursery, rooftops, window, dawn art
│   │   ├── projects/            # project-card artwork
│   │   └── audio/               # lullaby and optional sound effects
│   └── credits/ASSET_CREDITS.md
├── src/
│   ├── main.tsx
│   ├── App.tsx                  # section order and app-level theme/audio state
│   ├── components/
│   │   ├── IntroSequence.tsx       # coordinates both 10-second intro clips and Skip intro
│   │   ├── WanderingCloudIntro.tsx # 0–10s: black hold, cloud path, three edge bumps
│   │   ├── PipGreetingIntro.tsx    # 10–20s: Pip emergence, glance, wave, subtitle
│   │   ├── SkipIntroButton.tsx
│   │   ├── SceneSection.tsx     # shared scene wrapper and reveal behavior
│   │   ├── DreamBubble.tsx      # primary story motion element
│   │   ├── ProjectCard.tsx      # shared project-card shell
│   │   ├── AudioToggle.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── EasterEgg.tsx
│   │   └── Guestbook.tsx        # optional
│   ├── scenes/
│   │   ├── HeroScene.tsx
│   │   ├── MeetPipScene.tsx
│   │   ├── SpillScene.tsx
│   │   ├── RooftopChaseScene.tsx
│   │   ├── GhostWindowScene.tsx
│   │   ├── CatchScene.tsx
│   │   ├── SweetDreamsScene.tsx
│   │   └── WorkshopScene.tsx
│   ├── projects/
│   │   ├── LullabyLab.tsx
│   │   ├── NightlightCollection.tsx
│   │   └── DreamDeliveryRoutes.tsx
│   ├── hooks/
│   │   ├── useIntroPlayback.ts     # once-per-visit behavior, skip, reduced-motion path
│   │   ├── useAudio.ts
│   │   └── useReducedMotion.ts
│   ├── data/
│   │   ├── story.ts
│   │   └── projects.ts
│   └── styles/
│       ├── tokens.css
│       ├── global.css
│       ├── scenes.css
│       └── animations.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
└── README.md
```

Keep scenes separate because their visual compositions differ. Reuse the wrapper and project-card layout, but don't force the three project interactions into one complex component. Start with state local to each project; lift audio/theme state to `App.tsx` only because multiple sections need to share it. Avoid global state libraries until there is a proven need.

## 9. Intro implementation contract

The intro is an overlay or top-level opening scene above the normal page—not an extra 20-second delay repeated on every scroll. `IntroSequence.tsx` owns the timeline and completion/skip state. Keep the two clips as separate components so their timing and continuity can be tested independently.

- Use a shared cloud asset/element across the clip boundary whenever possible; if it is remounted, match x/y position, scale, opacity, lighting, and transform origin exactly.
- Use Motion animation controls or variants for the ordered sequence. Prefer transforms and opacity; do not animate layout-heavy properties on every frame.
- Keep the 2-second black hold deliberate, and keep the three cloud impacts individually readable within seconds 3–7.
- Use an authored motion path or well-defined keyframes for the cloud. “Random” movement should be designed and repeatable rather than truly random, so timing stays consistent and the final center landing is guaranteed.
- On Skip intro, cancel or ignore pending animation callbacks and reveal the hero once. Prevent double completion and do not leave audio playing after skip.
- Avoid forcing a visitor to wait: the skip control should be keyboard accessible, have a visible focus state, and have a comfortably tappable target.
- For reduced motion, replace the moving intro with a simple still composition and an **Enter the Midnight Nursery** action, or use a brief fade that respects the preference.
- Prefer a small sequence of supplied PNG/WebP layers, SVG, or CSS elements over a large video while prototyping. If the final result is rendered as video, provide a poster frame, captions, a mute state, and a reduced-motion fallback.

## 10. Setup commands

```bash
npm create vite@latest pip-midnight-nursery -- --template react-ts
cd pip-midnight-nursery
npm install
npm install motion
npm run dev
```

Optional icons:

```bash
npm install lucide-react
```

Use hand-drawn SVG or the supplied art for story-specific motifs; generic icons should be limited to utility controls. Add Supabase later only if the shared guestbook is approved.

## 11. Performance and accessibility rules

- Load the hero image eagerly; lazy-load below-the-fold scene/project images.
- Compress illustrations and audio. Use `width`/`height` or `aspect-ratio` to reserve space and reduce layout shifts.
- Prefer `transform` and `opacity` for animation. Avoid React state updates on every scroll frame; use Motion values for continuous movement.
- Keep native vertical scrolling. No scroll hijacking, mandatory horizontal scrolling, or long pinned sequences on mobile.
- Respect `prefers-reduced-motion`; show readable static scene states when movement is reduced.
- Controls must work by keyboard and touch, have clear labels, show focus, and not rely on hover alone.
- Test the full story on a real phone before polishing background details.
- Aim for Core Web Vitals at the 75th percentile where field data is available: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. Use these as quality targets, not hackathon scoring requirements.

## 12. Build order and acceptance checklist

### Phase 1 — Ship the complete skeleton
- [ ] Scaffold Vite + React + TypeScript.
- [ ] Build the two linked intro clips with a stable center-cloud hand-off, Skip intro, caption, mute, and reduced-motion behavior.
- [ ] Add all story sections in order with static images and final copy.
- [ ] Add the three project cards and working basic interactions.
- [ ] Deploy an early version and test on mobile.

### Phase 2 — Make the signature interaction work
- [ ] Animate the dream-bubble through the chase with Motion.
- [ ] Add the ghost-exit interaction.
- [ ] Transform the bubble into the golden blanket at the resolution.
- [ ] Add the nightcap Easter egg.

### Phase 3 — Polish and verify
- [ ] Make audio mute reliable and visible during the intro and page; verify speech, music, and effects never audibly autoplay.
- [ ] Add Midnight/Morning toggle without resetting story state.
- [ ] Add guestbook only if core requirements are complete.
- [ ] Implement reduced-motion and keyboard/touch alternatives.
- [ ] Verify no broken assets, console errors, dead controls or layout overflow.
- [ ] Add credits for all art, audio and libraries.
- [ ] Publish the deployment URL and public repository; write a short project summary.

### Definition of done
The site opens with the specified 20-second two-part intro (or a working skip/reduced-motion path), keeps the cloud centered across the clip hand-off, introduces Pip consistently with the official reference, demonstrates three distinct projects, tells the complete story without becoming a wall of text, has at least one meaningful visitor interaction and one discoverable Easter egg, works on mobile, includes a visible working mute control and captioned greeting, and credits third-party assets.

## 13. Official references

- haX.baby official problem statement: https://hax.baby/baby-problem
- Unstop event listing: https://unstop.com/hackathons/babys-first-website-hackathon-hax-baby-1758510
- Vite guide: https://vite.dev/guide/
- React component guide: https://react.dev/learn/your-first-component
- React state guidance: https://react.dev/learn/choosing-the-state-structure
- Motion for React: https://motion.dev/docs/react
- Motion `useScroll`: https://motion.dev/docs/react-use-scroll
- Motion `useInView`: https://motion.dev/docs/react-use-in-view
- Core Web Vitals: https://web.dev/articles/vitals


## Phase 5 update — narrative ending and visitor interaction

The page now ends with **Keeper of Loose Ends**, a thematic resolution where Pip stops trying to perfect every dream. Visitors may leave one unfinished thought in a client-side guestbook. The note is held only in the active page state; there is no database or server submission. A hidden Easter egg is revealed after five taps on the tiny star in the top-left wordmark. This preserves the original single-page, low-dependency architecture.

### Final continuity checklist
- Intro remains 20 seconds total: Wandering Cloud (10s), then Pip Wakes Up (10s).
- Pip's visual identity must be anchored to the supplied reference artwork; the current animated SVG remains a placeholder.
- The cloud in the first intro segment remains faceless.
- The three inventions remain the Skipped Lullaby, Almost-Brave Lantern, and Window-Waving Route.
- The ghost is allowed to remain unfinished; the ending must not frame imperfection as a problem to eliminate.
- Visitor notes are session-only unless a future, explicitly approved backend is added.
- Mute control, skip intro, reduced-motion support, mobile responsiveness, and Easter egg remain required acceptance checks.
