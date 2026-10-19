# Pip — Character Bible and Visual Consistency Lock

## Canonical identity
Pip is the baby skeleton and Junior Dream Engineer of the Midnight Nursery. Pip must remain immediately recognizable as a small, round-headed, softly sculpted skeleton child with oversized dark eye sockets, warm glowing pupils, a tiny nose mark, a gentle smile, rosy cheeks, and a cream drooping nightcap patterned with muted golden stars. The nightcap has a soft pom-pom and a small pink bow. Pip wears pastel blush-pink pajamas with tiny heart motifs and rounded lilac-pink details.

## Shape language and materials
- **Silhouette:** oversized head, compact seated body, short rounded limbs; no sharp or adult proportions.
- **Face:** large dark oval sockets; tiny warm amber highlights; small nose; simple mouth; rosy blush.
- **Palette:** warm ivory `#FFF1D9`, deep plum `#352C38`, soft blush `#F5DFE0`, lilac `#D8B8D8`, muted star-gold `#E9BD73`.
- **Material:** soft 3D vinyl/clay, diffuse highlights, gentle contact shadows, no hard plastic glare.
- **Mood:** sleepy, curious, kind, a little imperfect; never horror-coded or threatening.

## Motion rules
- Intro: Pip rises from behind the settled cloud, glances gently, then waves.
- Keep motion small and slow. Avoid squash/stretch that distorts the skull identity.
- Respect `prefers-reduced-motion`; all essential story content must remain available without animation.

## Consistency checklist for future art
1. Skull-like baby face and oversized dark sockets remain visible.
2. Cream starry drooping nightcap, pom-pom, and pink bow stay consistent.
3. Pastel heart-print pajamas and rounded proportions remain consistent.
4. Use soft 3D pastel lighting and a midnight-nursery atmosphere.
5. Change one variable at a time (pose, expression, or scene); do not redesign the character between assets.

## Current implementation note
The intro sequence now features the rendered 20-second cinematic video (`public/assets/intro/intro-dark.mp4` / `intro-nursery.mp4`), where Pip is fully and fluidly animated — emerging gently over the cloud, rubbing sleepy eyes, opening wide, and waving with a warm greeting smile. The previous raster crop from `public/assets/pip/pip-front-approved.png` and SVG cloud are retained as a graceful, tested fallback if video playback is unsupported or blocked. All future animations must follow this character lock and motion design.
