# Solar System Portfolio — Design Spec
**Date:** 2026-06-20  
**Status:** Approved  
**Author:** Pristian Budi Dharmawan

---

## Context

The current portfolio uses a scroll-driven rocket that travels through linear sections. The redesign replaces this with a fully immersive **orbital navigation model** where each section of the portfolio is a planet orbiting the owner (the sun). The goal is a SpaceX-cinematic, Apple-refined, web3-immersive experience that is unmistakably memorable and accurately reflects the breadth of work across KLBF enterprise, stealth ventures, and open source.

**Guard rails (do not change):**
- No personal data, traits, or callsigns modified
- Title "Full Stack Engineer" preserved
- No project data changed — content from CV + Obsidian only

---

## Interaction Model

### Core Mechanic: Orbital Navigation

```
LOAD → orbital view (full-viewport Three.js scene)
     ↓ user hovers planet → subtle glow + label tooltip
     ↓ user clicks planet → camera zoom animation (1.5s)
     ↓ content fades in (planet surface = section content)
     ↓ ← back / ESC → camera pulls back → orbital resumes
     ↓ prev/next arrows → jump to adjacent planet without returning
```

- **Sun = Pristian** (always at center). Info panel always visible: name, role, tagline, 4 stats.
- **5 planets** orbit at increasing radii. Numbers only: 01–05 (Contact folds into sun panel).
- **No scroll navigation** on desktop — pure click/zoom interaction.
- **Keyboard:** ESC to return to orbital, ← → to navigate between planets when zoomed.
- **URL routing:** each planet has a deep-linkable route `/home#01`, `/home#02`, etc.

### State Machine

```
'orbital'   → click planet N  → 'zooming-in'
'zooming-in'→ animation done  → 'planet-N'
'planet-N'  → ESC / back btn  → 'zooming-out'
'zooming-out'→ animation done → 'orbital'
'planet-N'  → next/prev btn   → 'zooming-out' then 'zooming-in' to adjacent
```

---

## Visual Design System

### Style
**SpaceX Ultra-Minimal.** Drama through contrast and void — not glow, not neon.
- Dark mode: true black `#000000` background
- Light mode: off-white `#F5F5F0` background
- Toggle: persistent in top-right corner of orbital view
- No color accents on planets (pure grayscale gradient, each slightly different)

### Color Palette

| Token | Dark | Light | Use |
|---|---|---|---|
| `--void` | `#000000` | `#F5F5F0` | Page background |
| `--surface` | `#080808` | `#EBEBEB` | Cards, panels |
| `--elevated` | `#0F0F0F` | `#E0E0DC` | Elevated surfaces |
| `--border` | `#1A1A1A` | `#D8D8D4` | Dividers, borders |
| `--muted` | `#333333` | `#AAAAAA` | Secondary text |
| `--secondary` | `#888888` | `#666666` | Body text |
| `--primary` | `#FFFFFF` | `#000000` | Primary text, headings |
| `--planet-gradient` | `radial-gradient(circle at 35% 32%, #fff 0%, #999 50%, #444 100%)` | `radial-gradient(circle at 35% 32%, #333 0%, #888 50%, #ccc 100%)` | All planets |
| `--sun-gradient` | `radial-gradient(circle at 38% 35%, #fff 0%, #ddd 40%, #aaa 70%, transparent 100%)` | `radial-gradient(circle at 38% 35%, #111 0%, #555 50%, #888 100%)` | Sun |

### Typography

| Role | Font | Weight | Usage |
|---|---|---|---|
| Display | Cormorant Garamond | 900 | Planet numbers, section titles, hero name |
| Labels / HUD | JetBrains Mono | 400–600 | Tags, nav breadcrumbs, stat labels, monospace data |
| Body | IBM Plex Sans | 400 | Project descriptions, bio paragraphs |

**Contrast targets:** Primary text = 21:1 (dark) / 19:1 (light) — WCAG AAA.  
**Sizes:** Numbers `clamp(48px, 8vw, 96px)` · Titles `clamp(28px, 5vw, 56px)` · Body `16px` min.

### Stars Background + Parallax

- **1200–1500 star particles** distributed across 3 depth layers (far/mid/near)
- **Mouse parallax:** each layer shifts at different speed (far: 0.02×, mid: 0.06×, near: 0.12×) relative to cursor offset from center. Use lerp(current, target, 0.08) per frame for smooth lag.
- **Scroll parallax (mobile):** touch/wheel events shift stars vertically at depth-scaled rate
- **Mobile:** `deviceorientation` API for tilt parallax, graceful fallback to static
- Implementation: Three.js Points geometry with 3 separate `BufferGeometry` groups, positions updated in `requestAnimationFrame` loop
- **Lenis:** disabled on desktop (no scrollable content — pure click interaction). Lenis retained only on mobile for bottom sheet scroll inertia.

---

## Scene Architecture (Three.js)

### File: `src/components/three/SolarScene.tsx`
Replaces current `HeroScene.tsx` entirely.

**Scene contents:**
1. **Stars** — 3 depth-layer Points, parallax-updated via mousemove event
2. **Sun** — Procedural sphere, warm-white glow halo, subtle idle pulse animation
3. **Orbit rings** — 5 TorusGeometry rings, very low opacity (0.04–0.08)
4. **Planets** — 5 procedural spheres + CSS2DRenderer number labels above each
5. **Camera** — PerspectiveCamera, FOV 58°, z=14 default. GSAP animates to planet on click.
6. **Engine glow light** — removed (no rocket)
7. **Ambient + directional lights** — cool white ambient, single directional from upper-right

**Planet orbital data (to be defined in constants):**

| Planet | Section | Orbit radius | Size | Speed (revolution) |
|---|---|---|---|---|
| 01 | About | 3.5 | 0.22 | 18s |
| 02 | Work | 5.5 | 0.30 | 28s |
| 03 | Projects | 7.0 | 0.25 | 38s |
| 04 | Ventures | 8.5 | 0.27 | 50s |
| 05 | Skills | 10.0 | 0.20 | 65s |

**Camera zoom animation:**
- Duration: 1.5s
- Easing: `power3.inOut`
- End position: 1.2 units in front of planet surface
- Planet scales up subtly (1.0 → 1.05) during zoom
- Stars blur (postprocessing or opacity fade)
- Content component fades in at zoom completion

---

## Planet → Section Content

### ☀ Sun / Hero (always visible info panel)
```
Name:     PRISTIAN BUDI DHARMAWAN
Role:     Full Stack Engineer
Company:  PT Kalbe Farma Tbk · Software Engineer
Tagline:  "I build systems that run after I'm gone."
Stats:    2+ yrs prod · 150+ automations · 500× community · GPA 3.94
Socials:  GitHub (iannn07) · LinkedIn (pristian-budi-dharmawan) · Email
```

### 01 — About
```
Bio:        2 paragraphs (from src/contents/Descriptions.tsx)
Quote:      "I don't build features. I build legacies..."
Education:  BINUS University · CS · Summa Cum Laude · GPA 3.94
Community:  GDSC BINUS Malang · Chapter Lead · 20→500+ members (25×)
Philosophy: Negative Space Programming · Gunawan Protocol
```

### 02 — Work (Enterprise @ KLBF)
```
Jun 2025–Present: Software Engineer
  · Optimus — CTMS, multi-tenant, AI/RAG pipeline (pgvector, Gemini, OpenAI)
  · SCM Digital Twin — ELT pipeline, FG→Intermediate→MRP, 3 BUs
  · K-RIM — Regulatory DMS, CSV IQ/OQ/PQ, Keycloak + Supabase
  · RIS Phase 2 — features + refactor, server-side optimisation
  · Internal Chatbot — 1,000-user BU, sole engineer, AKS
  · Calendar of Events — BoD calendar, all Corporate Functions + SBUs
  · 150+ Power Automate flows across 2 divisions

Feb 2024–Jun 2025: Software Engineer Intern
  · RIS Phase 1 — Next.js + Supabase, Lighthouse 20–30 → 70–90 (3–4×)
  · Power Automate automation — 10× cycle time reduction
  · Introduced Negative Space Programming as team-wide standard
```

### 03 — Projects
```
Axolotl — Your Caregiver (2024)
  · AI-powered patient diagnostic system (thesis)
  · ML model, end-to-end testing, GCR deployment
  · Stack: Python, ML, Google Cloud Run

[Open for additional standalone projects as they ship]
```

### 04 — Ventures (Stealth)
```
GaussRouter / GaussMeridian (2026–Present)
  · Outcome-based LLM routing gateway
  · Algorithms: CARROT, BELLA, xRouter, OutcomeGate
  · Stack: Rust, Axum, Tokio, SurrealDB, Redis
  · Status: stealth · researcher + product owner

[WEEKND] (2026–Present)
  · B2C consumer mobile app · hyper-local social / media
  · Tech Lead — architecture, frameworks, infrastructure
  · Stack: React Native, GCP, real-time
  · Status: stealth
```

### 05 — Skills
```
Languages:   TypeScript, Python, Rust, Go, SQL, Dart
Frameworks:  Next.js/React, Axum/Tokio, Node.js/Deno, FastAPI, Flutter
Cloud:       AKS, OpenShift, GCP Cloud Run, Docker, Kubernetes
Data:        PostgreSQL, Supabase, SurrealDB, Redis, Power Automate
AI/ML:       Claude, Azure OpenAI, RAG Architecture, pgvector, Vector DB
QA:          CSV (IQ/OQ/PQ), k6, Lighthouse, Agile/Scrum, CI/CD
Certs:       Summa Cum Laude 3.94 · Automation Developer Python L1 · Gemini API · SQL
```

---

## Mobile Strategy (< 960px)

**2D CSS Orbital** — no WebGL, same visual metaphor.

- Sun at center (CSS circle)
- 5 orbit rings (CSS border-radius circles, border only)
- 5 planets (CSS circles with grayscale gradient)
- Planets orbit via CSS `@keyframes` animation (rotate + translate)
- Tap planet → content slides up from bottom as a **bottom sheet**
- Bottom sheet: handle bar, drag to dismiss, scrollable content inside
- Theme toggle remains in top-right

---

## Component Architecture

### Dependencies to add
- `three/examples/jsm/renderers/CSS2DRenderer` — already in three.js package, no new install needed
- No new npm packages required

### New Files
| File | Purpose |
|---|---|
| `src/components/three/SolarScene.tsx` | Three.js solar system scene (replaces HeroScene.tsx) |
| `src/components/solar/PlanetContent.tsx` | Content rendered when camera zooms into a planet |
| `src/components/solar/SunInfoPanel.tsx` | Always-visible hero info panel anchored near sun |
| `src/components/solar/OrbitalNav.tsx` | 2D CSS orbital for mobile (< 960px) |
| `src/components/solar/BottomSheet.tsx` | Mobile bottom sheet for planet content |
| `src/components/solar/ThemeToggle.tsx` | Light/dark toggle (replaces existing ThemeToggle) |
| `src/constants/solarSystem.ts` | Planet data: orbit radius, size, speed, section mapping |

### Modified Files
| File | Change |
|---|---|
| `src/app/(pages)/home/page.tsx` | Complete rewrite — solar system layout instead of linear sections |
| `src/app/layout.tsx` | Update font imports (add Cormorant Garamond, IBM Plex Sans) |
| `src/css/style.css` | New CSS variable tokens (--void, --surface, --elevated, --border, --muted, --secondary, --primary) |
| `src/css/portfolio-v2.css` | Rewrite — remove old section styles, add solar/planet styles |
| `src/contents/Projects.tsx` | Remove TanStack FilterFn, House ROI Forecast, HL7 Deno Parser |

### Deleted / Archived
| File | Action |
|---|---|
| `src/app/(pages)/home/(sections)/HeroSection.tsx` | Delete — replaced by SunInfoPanel |
| `src/app/(pages)/home/(sections)/MarqueeStrip.tsx` | Delete |
| `src/app/(pages)/home/(sections)/AboutSection.tsx` | Archived → content moves to PlanetContent for 01 |
| `src/app/(pages)/home/(sections)/ProjectsGridSection.tsx` | Archived → content moves to PlanetContent for 03 |
| `src/app/(pages)/home/(sections)/ExperienceSection.tsx` | Archived → content moves to PlanetContent for 02 |
| `src/app/(pages)/home/(sections)/VenturesSection.tsx` | Archived → content moves to PlanetContent for 04 |
| `src/app/(pages)/home/(sections)/SkillsSection.tsx` | Archived → content moves to PlanetContent for 05 |
| `src/app/(pages)/home/(sections)/ContactSection.tsx` | Archived → contact folds into SunInfoPanel |
| `src/components/three/HeroScene.tsx` | Delete — replaced by SolarScene.tsx |

---

## Animation Spec

| Animation | Duration | Easing | Trigger |
|---|---|---|---|
| Orbit (planets) | 18–65s | linear | continuous |
| Sun idle pulse | 4s | ease-in-out | continuous |
| Star parallax | 60fps | lerp 0.08 | mousemove / scroll |
| Planet hover glow | 200ms | ease-out | hover |
| Camera zoom in | 1.5s | power3.inOut | click planet |
| Camera zoom out | 1.2s | power3.inOut | ESC / back |
| Content fade in | 400ms | ease-out | zoom complete |
| Content fade out | 250ms | ease-in | back pressed |
| Mobile bottom sheet | 350ms | spring (stiffness 300, damping 30) | tap planet |
| Theme toggle | 300ms | ease-in-out | toggle click |

**Reduced motion:** all orbit animations pause, camera transitions snap (0ms), parallax disabled.

---

## Verification

1. **Dev server:** `npm run dev` — orbital view loads, planets orbit, stars parallax on mouse
2. **Planet click:** click each of 5 planets → camera zooms → content appears → ESC returns
3. **Light mode:** toggle → all tokens swap, contrast readable, no gray-on-gray
4. **Mobile (< 960px):** CSS orbital visible, tap planet → bottom sheet slides up
5. **Deep links:** navigate to `/home#03` → loads directly into Projects planet
6. **Reduced motion:** enable in OS → orbits static, zoom snaps, no parallax
7. **Build:** `npm run build` passes with no TypeScript errors
