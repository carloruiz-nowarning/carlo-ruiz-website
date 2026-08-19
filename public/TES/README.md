# TES — Technical Entertainment Services

Proof-of-concept website for **Technical Entertainment Services** (rmtespro.com), a Fort Lauderdale live event production company.

**This is a visual mock, not a functioning website.** Forms are not wired to a backend, all imagery is placeholder, and several specs are marked `[SPECS TO CONFIRM]` pending TES's equipment list.

---

## Viewing it

The site is static HTML/CSS/JS and lives in the `public/` folder of the Carlo Ruiz Website Next.js app, so it is served at:

```
npm run dev          # from the repo root
http://localhost:3000/tesmock/index.html
```

It also opens directly from the filesystem (`open index.html`) — no server required.

---

## File structure

```
tesmock/
├── index.html              Homepage (11 sections)
├── services.html           Services overview
├── rigging.html            Rigging & certifications
├── audio.html              Audio / L-Acoustics
├── led-video-wall.html     LED video wall rental
├── caribbean.html          Caribbean & international
├── studio-954.html         TES Studio 954 streaming
├── about.html              About / credentials
├── contact.html            Contact / quote form
├── css/
│   ├── style.css           Tokens, reset, typography, layout, components
│   ├── glass.css           Glassmorphism variants + liquid wave transitions
│   └── animations.css      AV lighting layers, hero crossfade, scroll entrances
├── js/
│   ├── main.js             Nav, mobile menu, scroll animations, count-up, FAQ, forms
│   └── animations.js       GIF background assignment + hero crossfade controller
└── assets/
    ├── animations/         9 AV lighting GIFs (av-light-01…09.gif)
    ├── logo/               [PLACEHOLDER] tes-logo.png
    └── images/             [PLACEHOLDER] all photography
```

No frameworks. Vanilla CSS and vanilla JS only.

---

## ⚠️ Known performance debt — read before launch

The 9 AV lighting GIFs in `assets/animations/` total **116 MB** (largest single file: 28 MB). They are used as background layers on nearly every section, with 3 crossfading in the hero.

Mitigations already in place:

- Every section GIF is lazy-loaded and only fetched when the section is within 600px of the viewport.
- The hero loads its first GIF immediately and staggers the other two by 4s and 8s so they don't compete for bandwidth.
- The crossfade pauses while the tab is backgrounded.
- Layers fade in only after decode, so there is no broken-image flash.

**None of this makes the page shippable as-is.** Before launch the GIFs must be converted to looping muted `<video>` (MP4/WebM), which typically cuts them by ~95%. That work was deliberately deferred for this proof of concept.

The `assets/animations/` folder is gitignored so the 116 MB does not enter git history — the GIFs must be copied in manually from `~/Downloads/TES Animations/`.

---

## What still needs real content

| Item | Where |
|---|---|
| All photography | Every `.placeholder-img` — labels describe the shot needed |
| Show reel video | Homepage hero (commented `<video>` block), portfolio, Studio 954 |
| TES logo | `assets/logo/tes-logo.png` — currently a text wordmark |
| Client logos | Homepage portfolio strip, Caribbean past-clients (Bahamar + 4) |
| Testimonial names | Homepage testimonials — quotes are approved, attributions are `[Name]` |
| Phone number | Currently `(954) 000-0000` sitewide |
| Email | Currently `info@rmtespro.com` |
| Equipment specs | Marked `[SPECS TO CONFIRM]` on LED, audio, and Studio 954 pages |
| OG share image | `assets/images/og-image.jpg` |
| Blog | Footer link is a `#` placeholder |
| Privacy / Terms | Footer links are `#` placeholders |

---

## Design system

**Color** — `--black #080808` · `--black-soft #111111` · `--red #CC0000` · `--red-vivid #E00000`, with glass surfaces at 4% white and red-tinted variants at 8% red.

**Type** — Barlow Condensed 900 uppercase for display, Barlow for body. Hero scales `clamp(48px, 8vw, 120px)`.

**Glass** — `.glass` and `.glass-red`, both with `backdrop-filter: blur(20px) saturate(180%)` and a red edge glow on hover. A `@supports` fallback swaps in solid backgrounds where `backdrop-filter` is unavailable.

**Liquid transitions** — SVG wave data-URIs on `.section-wave-bottom` / `-top` and their `-alt` variants, alternating direction between sections. Fill color must match the *adjacent* section's background, hence the `.wave-black` / `.wave-red` modifiers.

---

## Implementation notes

**Scroll animations.** `[data-anim]` elements fade up on entry via IntersectionObserver. `[data-anim="reveal"]` uses a clip-path reveal for headlines — and because `clip-path: inset(100%)` collapses an element's intersection rect to zero, those elements are observed through their *parent* rather than themselves. Observing them directly means they never fire. `[data-stagger]` on a container adds a 0.1s delay per child.

**Accessibility.** Semantic HTML5, skip link on every page, visible focus rings, ARIA on the accordion and mobile menu, and a full `prefers-reduced-motion` block that disables the crossfade, sweep, and entrance animations.

**Responsive.** Mobile-first with breakpoints at 640/768/1024/1280. Nav collapses to a hamburger below 1024px. Grids cap their column count at 1024px so wide screens keep the intended 3×2 rhythm instead of spilling to 4+ tracks.
