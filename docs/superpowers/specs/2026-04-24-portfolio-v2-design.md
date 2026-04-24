# Portfolio v2 — Design Spec

**Date:** 2026-04-24  
**Source:** Claude Design handoff — `Portfolio v2.html`  
**Scope:** Complete visual redesign of the portfolio. Replace all 8 existing sections with the new editorial, Mercedes/Petronas F1-themed design.

---

## Design System

### Colors

Replace all tokens in `src/css/style.css` and `tailwind.config.ts`:

| Variable | Value | Meaning |
|---|---|---|
| `--bg` | `#000000` | Mercedes Black (main background) |
| `--bg2` | `#0a0c0c` | Deep off-black (alternate section bg) |
| `--fg` | `#C8CCCE` | Mercedes Silver (primary text) |
| `--fg2` | `#8a9094` | Mid silver (secondary text) |
| `--fg3` | `#565F64` | Dark gray (muted text, labels) |
| `--accent` | `#00A19B` | Petronas Tiffany Green (accent) |
| `--rule` | `#1a2020` | Divider lines |

### Fonts (via `next/font/google`)

Replace Poppins with three families:

- `Playfair_Display` — weights 400, 700, 900; italic variants → CSS var `--serif`
- `DM_Sans` — weights 300, 400, 500, 600 → CSS var `--sans`
- `DM_Mono` — weights 400, 500 → CSS var `--mono`

### Cursor

`body { cursor: none; }` in global CSS. `a` elements also `cursor: none`.

### Noise Texture

`body::before` — fixed, full-screen SVG fractalNoise filter at opacity 0.4. Adds subtle grain to the black background.

---

## Dependencies

**Add:**
- `gsap` — animation engine + ScrollTrigger plugin
- `@gsap/react` — `useGSAP` hook for React integration and automatic cleanup

**Do not use in new components (keep in package.json):**
- `framer-motion`, `motion`, `@motionone/utils` — not removed (could affect shadcn/ui internals), simply not imported in any new section

**Keep:**
- `lenis` — smooth scrolling (integrate with GSAP ticker)
- All shadcn/ui, Radix, Tailwind deps — kept for layout utilities

---

## File Structure Changes

```
src/
  app/
    layout.tsx              ← update fonts, keep Lenis provider
    (pages)/home/
      page.tsx              ← replace 8 sections with 12 new components
      (sections)/           ← DELETE all HomeSection1–8, replace with:
        HeroSection.tsx
        MarqueeStrip.tsx
        AboutSection.tsx
        FeaturedWorkSection.tsx
        ProjectsGridSection.tsx
        ExperienceSection.tsx
        PassionsSection.tsx
        SkillsSection.tsx
        ContactSection.tsx
  components/
    nav/
      NavBar.tsx            ← new fixed nav component
    cursor/
      CustomCursor.tsx      ← custom cursor dot + ring
    footer/
      Footer.tsx            ← new footer component
    lenis/                  ← keep existing Lenis provider
  css/
    style.css               ← replace all CSS variables/tokens
  constants/
    jumpSections.ts         ← update nav links to match new sections
  contents/                 ← UPDATE data to match v2 content:
    Experiences.tsx         ← same structure, content matches design
    Projects.tsx            ← updated with Gunawan Agents + The Weeknd Project
    Stacks.tsx              ← updated to 4 columns: Languages, Frameworks, DevOps, AI & Data
    Descriptions.tsx        ← updated About copy
```

---

## Lenis + GSAP Integration

In `src/app/layout.tsx` (or a dedicated client provider), wire Lenis to GSAP ticker:

```ts
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
gsap.registerPlugin(ScrollTrigger)
```

All GSAP ScrollTrigger usage must be in `useEffect` inside `'use client'` components.

---

## Components

### NavBar (`src/components/nav/NavBar.tsx`)

- `position: fixed; top: 0; z-index: 100`
- Logo: `GUN<accent>A</accent>WAN` in DM Mono, uppercase, letter-spacing
- Links: About · Work · Experience · Passions · Contact
- CTA: "Get in touch" → `mailto:pristian.dharmawan@gmail.com`
- On scroll > 80px: add `.scrolled` class → `padding` shrinks + `backdrop-filter: blur(16px)` + border-bottom
- Mobile: hide links and CTA, keep logo

### CustomCursor (`src/components/cursor/CustomCursor.tsx`)

- `cursor: none` on body
- `#cursor-dot`: 8px white circle, follows mouse directly
- `#cursor-ring`: 36px ring (1px border), lags behind mouse (lerp 0.12)
- On hover of interactive elements: ring expands to 56px, both turn accent color
- Hide on mobile/touch devices

### HeroSection

- `min-height: 100vh`; grid-line background (CSS grid pattern via `background-image`)
- Hero label (DM Mono): "Software Engineer · Agentic AI Builder · Jakarta, ID" with accent left-rule
- H1 (Playfair Display, clamp 2.8–8.5rem, weight 900): `PRISTIAN BUDI DHARMAWAN`
- Alias line (DM Mono): `alias <accent>Gunawan</accent>`
- Bottom bar: tagline text + meta links (GitHub, LinkedIn, Email, current role)
- Bottom border: `1px solid var(--rule)`

### MarqueeStrip

- Continuous horizontal scroll animation (CSS `@keyframes marquee-scroll`, 28s linear infinite)
- Items: Full-Stack Engineering · Agentic AI Development · System Architecture · Community Leadership · ELT Data Pipelines · AI Integration · Open Source · Software Engineering · DevOps & Infra
- Each item separated by a 4px teal dot

### AboutSection

- Section header: `01 About` (number in DM Mono accent, title in Playfair Display)
- Two-column grid: 1.2fr left (copy) + 0.8fr right (stats)
- Left copy: bio paragraphs + italic blockquote with left accent border
- Right stats: 2×2 grid — `2+` Years, `150+` Automations, `500×` Community, `3.94` GPA
- Stat counters: `IntersectionObserver` triggers count-up animation on viewport entry (1400ms cubic-ease)
- GSAP scroll reveal: `opacity: 0, y: 36` → `opacity: 1, y: 0` on `top 88%`

### FeaturedWorkSection (bg: `--bg2`)

- Section header: `02 Featured Work`
- Three project rows, each: `grid-template-columns: 80px 1fr 280px`
  1. **Gunawan Agents** — Agentic AI · Active Development | TypeScript, Agents, LLM, Automation
  2. **The Weeknd Project** — Mobile App · Local Discovery | React Native, Mobile, Real-time, Location
  3. **Axolotl** — Thesis · AI Healthcare | Next.js, FastAPI, Python, Random Forest, Supabase
- Each row: number, body (badge + serif title + desc), meta (italic highlight + tags + GitHub link)
- Hover: subtle white bg overlay on row
- GSAP scroll reveal per card

### ProjectsGridSection (bg: `--bg`)

- Section header: `03 More Projects`
- 3-column grid with 1px gaps: TanStack FilterFn, The Weeknd Org, HL7 Deno Parser, MedExpert, House ROI Forecasting, Old Gartic V2
- Each card: project number, serif name, description, tag pills, external link icon (top-right)
- Hover: background shifts to `--bg2`
- GSAP scroll reveal per card with stagger

### ExperienceSection (bg: `--bg2`)

- Section header: `04 Experience`
- Three rows: `grid-template-columns: 180px 1fr`
  1. **Software Engineer** — PT Kalbe Farma Tbk | Jun 2025 – Present (Current pill in accent)
  2. **Software Engineer — Intern** — PT Kalbe Farma Tbk | Feb 2024 – Jun 2025
  3. **Data Management Assistant** — BINUS University | Jul 2021 – Feb 2024
- Date column: DM Mono, muted; pill badge (Internship/University/Current)
- Bullet points: em-dash style, faded text

### PassionsSection

> Note: The design CSS contains a `.passion-strip` 4-column card grid (F1, MotoGP, Le Mans, Sports Cars), but this grid is **not present in the HTML body** of the design file. Only the section header, intro paragraph, and F1 stage are implemented. This spec follows the HTML, not the CSS — the 4-card grid is omitted.



- Section header: `05 Off the Clock`
- Intro paragraph about motorsports obsession
- **F1 Stage** (`id="f1-stage"`): `height: 380px`, `bg: --bg2`
  - Two track lanes (F1 top 30%, MotoGP top 72%)
  - F1 car SVG (inline, Petronas-colored)
  - MotoGP bike SVG (inline, Petronas-colored)
  - Start lights bar (5 circles): sequence on → all off → cars launch
  - GSAP timeline: lights sequence (0.42s each) → `LIGHTS OUT` → cars race across → checkered flags
  - Loop: restarts 3s after completion
  - ScrollTrigger: `once: true` fires when stage enters `80%` viewport

### SkillsSection (bg: `--bg2`)

- Section header: `06 Skills`
- 4-column grid: Languages · Frameworks · DevOps & Infra · AI & Data
- Each column: accent-colored DM Mono header + bullet list
- Certs row below: badge pills — Automation Developer Python L1, Gemini API by Google, SQL Intermediate, SQL Basic, Summa Cum Laude GPA 3.94, Best Paper Award
- GSAP scroll reveal per column

### ContactSection (bg: `--bg`)

- `min-height: 60vh`
- Background word: `"Hello"` — giant serif outline text (text-stroke), bottom-right, decorative
- Section content: DM Mono label + serif heading "Got an idea? *Let's talk.*"
- Contact links: Email, LinkedIn, GitHub (each with label + value)
- Magnetic CTA button: "Send a message →" in accent background
- GSAP scroll reveal on content

### Footer

- Simple flex row: copyright · location · "Built with Next.js · GSAP · Lenis"
- Border-top: `1px solid var(--rule)`

---

## Content Updates

### About bio
> "Full-stack software engineer with 2+ years of production experience at PT Kalbe Farma Tbk (IDX: KLBF), Indonesia's largest listed pharma group — specialising in scalable web applications, ELT data pipelines, and AI integration."

Blockquote: *"I don't build features. I build legacies — systems that refuse to stop running, long after everyone else has moved on."*

### Projects data (`src/contents/Projects.tsx`)

Add two new projects at the top of the featured list:
- **Gunawan Agents**: Personal AI agent framework — TypeScript, Agents, LLM, Automation
- **The Weeknd Project**: TikTok-style hyper-local discovery app — React Native, Mobile, Real-time

### Skills data (`src/contents/Stacks.tsx`)

Restructure to 4 columns matching the design:
1. Languages: TypeScript/JavaScript, Python, Dart (Flutter), SQL, Golang
2. Frameworks: Next.js/React, Node.js/Deno, FastAPI, Flutter, GSAP/Lenis
3. DevOps & Infra: Docker/Kubernetes, GCP Cloud Run, CI/CD Pipelines, Supabase/PostgreSQL, Microservices
4. AI & Data: Agentic AI Systems, ELT/ETL Pipelines, Power Automate, k6/Jest/QA, System Design

---

## Responsive Breakpoints

Match the design's media queries:
- `max-width: 900px`: collapse multi-column grids to 1-column, hide nav links/CTA, reduce padding
- `max-width: 600px`: single-column project/passion grids, stack hero meta

---

## Animation Summary

| Element | Trigger | GSAP spec |
|---|---|---|
| All `.s-head`, section content | `top 88%` | `{opacity:0, y:36}` → default, `duration:0.85, ease:'power3.out'` |
| Stat counters | IntersectionObserver 0.5 threshold | Count up `0 → target` over 1400ms cubic-ease |
| F1 race | ScrollTrigger `top 80%`, `once:true` | Full timeline: lights → launch → flags → loop |
| Marquee | CSS `animation: marquee-scroll 28s linear infinite` | Pure CSS, no GSAP |
| Nav scroll state | `window.scroll > 80` | Add/remove `.scrolled` class |
| Custom cursor | `mousemove` | `dot` = direct; `ring` = lerp 0.12 |

---

## Verification

1. `npm run build` — no TypeScript errors, no lint errors
2. `npm run dev` — visual check each section in browser
3. Verify: custom cursor appears and reacts to hover
4. Verify: F1 race animation fires when Passions section enters viewport
5. Verify: stat counters animate on scroll
6. Verify: nav compacts on scroll past hero
7. Verify: responsive at 900px and 600px breakpoints
8. Verify: marquee scrolls continuously without gap
