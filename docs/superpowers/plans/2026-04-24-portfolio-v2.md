# Portfolio v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the entire existing portfolio with the v2 editorial Mercedes/Petronas F1 theme design from the Claude Design handoff.

**Architecture:** Full component replacement — all 8 existing HomeSection files are deleted and replaced with 9 new section components + NavBar + CustomCursor + Footer. GSAP + ScrollTrigger replaces Framer Motion for scroll animations. A `GSAPProvider` client component wires Lenis scroll events to ScrollTrigger. All component styles live in a global `portfolio-v2.css` imported in `layout.tsx`.

**Tech Stack:** Next.js 15, GSAP 3 + `@gsap/react`, Lenis 1 (via `lenis/react`), Tailwind CSS (layout utilities only), `next/font/google` (Playfair Display, DM Sans, DM Mono)

**Design source:** `docs/superpowers/specs/2026-04-24-portfolio-v2-design.md`

---

## File Map

**Create:**
- `src/css/portfolio-v2.css` — all v2 component styles
- `src/components/gsap/GSAPProvider.tsx` — GSAP+Lenis sync
- `src/components/cursor/CustomCursor.tsx`
- `src/components/nav/NavBar.tsx`
- `src/components/footer/Footer.tsx`
- `src/app/(pages)/home/(sections)/HeroSection.tsx`
- `src/app/(pages)/home/(sections)/MarqueeStrip.tsx`
- `src/app/(pages)/home/(sections)/AboutSection.tsx`
- `src/app/(pages)/home/(sections)/FeaturedWorkSection.tsx`
- `src/app/(pages)/home/(sections)/ProjectsGridSection.tsx`
- `src/app/(pages)/home/(sections)/ExperienceSection.tsx`
- `src/app/(pages)/home/(sections)/PassionsSection.tsx`
- `src/app/(pages)/home/(sections)/SkillsSection.tsx`
- `src/app/(pages)/home/(sections)/ContactSection.tsx`

**Modify:**
- `src/css/style.css` — replace CSS tokens with v2 palette
- `src/app/layout.tsx` — new fonts, import v2 CSS, remove DefaultLayout
- `src/app/(pages)/home/page.tsx` — wire all new sections
- `src/constants/jumpSections.ts` — update nav links
- `src/contents/Descriptions.tsx` — update About bio
- `src/contents/Projects.tsx` — add Gunawan Agents + Weeknd Project
- `src/contents/Stacks.tsx` — restructure to 4-column v2 layout

**Delete (Task 23):**
- `src/app/(pages)/home/(sections)/HomeSection1.tsx` through `HomeSection8.tsx`

---

## Task 1: Install GSAP

**Files:** `package.json`

- [ ] **Step 1: Install packages**

```bash
npm install gsap @gsap/react
```

- [ ] **Step 2: Verify installation**

```bash
# Should show gsap and @gsap/react in dependencies
cat package.json | grep gsap
```

Expected output: entries for both `gsap` and `@gsap/react`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add gsap and @gsap/react dependencies"
```

---

## Task 2: Update CSS design tokens

**Files:** `src/css/style.css`

Replace the entire file content:

- [ ] **Step 1: Replace `src/css/style.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* ── v2 Design Tokens ───────────────────────────────────── */
    --bg:     #000000;
    --bg2:    #0a0c0c;
    --fg:     #C8CCCE;
    --fg2:    #8a9094;
    --fg3:    #565F64;
    --accent: #00A19B;
    --rule:   #1a2020;

    /* ── Font variables (set by next/font in layout.tsx) ────── */
    --serif:  var(--font-serif, 'Georgia', serif);
    --sans:   var(--font-sans, 'system-ui', sans-serif);
    --mono:   var(--font-mono, 'monospace');

    /* ── Shadcn/ui compatibility tokens ────────────────────── */
    --background: #000000;
    --foreground: #C8CCCE;
    --card: #0a0c0c;
    --card-foreground: #C8CCCE;
    --popover: #0a0c0c;
    --popover-foreground: #C8CCCE;
    --primary: #C8CCCE;
    --primary-foreground: #000000;
    --secondary: #00A19B;
    --secondary-foreground: #000000;
    --muted: #1a2020;
    --muted-foreground: #565F64;
    --accent: #00A19B;
    --accent-foreground: #000000;
    --destructive: #ef4444;
    --destructive-foreground: #C8CCCE;
    --border: #1a2020;
    --input: #1a2020;
    --ring: #00A19B;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-family: var(--sans);
    font-weight: 300;
    line-height: 1.6;
    overflow-x: hidden;
    cursor: none;
  }
  a {
    cursor: none;
  }
  ::selection {
    background: var(--accent);
    color: var(--fg);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/css/style.css
git commit -m "design: replace CSS tokens with v2 Mercedes/Petronas palette"
```

---

## Task 3: Create `portfolio-v2.css`

**Files:** Create `src/css/portfolio-v2.css`

This file contains all component-level styles from the design. Class names match the design HTML exactly.

- [ ] **Step 1: Create `src/css/portfolio-v2.css`**

```css
/* ─── NOISE TEXTURE ─────────────────────────────────────────────────────── */
body::before {
  content: '';
  position: fixed; inset: 0; z-index: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  opacity: 0.4;
}

/* ─── CUSTOM CURSOR ─────────────────────────────────────────────────────── */
#cursor-dot {
  width: 8px; height: 8px;
  background: var(--fg);
  border-radius: 50%;
  position: fixed; top: 0; left: 0; z-index: 9999;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: width 0.25s, height 0.25s, background 0.25s, opacity 0.25s;
}
#cursor-ring {
  width: 36px; height: 36px;
  border: 1px solid rgba(240,236,227,0.35);
  border-radius: 50%;
  position: fixed; top: 0; left: 0; z-index: 9998;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s, border-color 0.3s, opacity 0.3s;
}
body.cursor-hover #cursor-ring { width: 56px; height: 56px; border-color: var(--accent); }
body.cursor-hover #cursor-dot  { background: var(--accent); }

/* ─── NAV ───────────────────────────────────────────────────────────────── */
.v2-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 2rem 3rem;
  transition: padding 0.4s, background 0.4s;
}
.v2-nav.scrolled {
  padding: 1.1rem 3rem;
  background: rgba(6,6,6,0.9);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--rule);
}
.nav-logo {
  font-family: var(--mono);
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--fg);
  text-decoration: none;
}
.nav-logo span { color: var(--accent); }
.nav-links { display: flex; gap: 2.5rem; list-style: none; margin: 0; padding: 0; }
.nav-links a {
  font-size: 0.75rem; font-weight: 500;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--fg2); transition: color 0.2s;
  text-decoration: none;
}
.nav-links a:hover { color: var(--fg); }
.nav-cta {
  font-family: var(--mono); font-size: 0.72rem;
  letter-spacing: 0.14em; text-transform: uppercase;
  padding: 0.6rem 1.4rem;
  border: 1px solid var(--fg3);
  color: var(--fg2);
  transition: border-color 0.2s, color 0.2s, background 0.2s;
  text-decoration: none;
}
.nav-cta:hover { border-color: var(--accent); color: var(--fg); background: rgba(0,161,155,0.06); }

/* ─── HERO ──────────────────────────────────────────────────────────────── */
#hero {
  min-height: 100vh;
  display: grid;
  grid-template-rows: 1fr auto;
  padding: 0 3rem 3rem;
  position: relative; overflow: hidden;
  border-bottom: 1px solid var(--rule);
  background: var(--bg);
}
.hero-grid-lines {
  position: absolute; inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, var(--rule) 1px, transparent 1px),
    linear-gradient(to bottom, var(--rule) 1px, transparent 1px);
  background-size: 120px 120px;
  opacity: 0.6;
}
.hero-content {
  display: flex; flex-direction: column; justify-content: flex-end;
  padding-bottom: 2rem;
  position: relative; z-index: 1;
  padding-top: 7rem;
}
.hero-label {
  font-family: var(--mono); font-size: 0.72rem;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 1.5rem;
  display: flex; align-items: center; gap: 1rem;
}
.hero-label::before {
  content: ''; width: 40px; height: 1px; background: var(--accent);
}
.hero-name {
  font-family: var(--serif);
  font-size: clamp(2.8rem, 9vw, 8.5rem);
  font-weight: 900; line-height: 0.9;
  letter-spacing: -0.03em;
  overflow: hidden;
  color: var(--fg);
}
.hero-alias {
  font-family: var(--mono);
  font-size: 0.78rem; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--fg3);
  margin-top: 1rem;
}
.hero-alias em { font-style: normal; color: var(--accent); }
.hero-name-line { display: block; }
.hero-name em { font-style: italic; color: var(--accent); }
.hero-bottom {
  display: flex; align-items: flex-end; justify-content: space-between;
  position: relative; z-index: 1;
  padding-top: 3rem;
  border-top: 1px solid var(--rule);
}
.hero-tagline {
  font-size: clamp(0.95rem, 2vw, 1.2rem);
  color: var(--fg2); max-width: 420px; line-height: 1.6;
}
.hero-tagline strong { color: var(--fg); font-weight: 500; }
.hero-meta {
  display: flex; gap: 2.5rem; align-items: center;
}
.hero-meta a {
  font-family: var(--mono); font-size: 0.68rem;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--fg3); border-bottom: 1px solid var(--fg3);
  padding-bottom: 2px; transition: color 0.2s, border-color 0.2s;
  text-decoration: none;
}
.hero-meta a:hover { color: var(--accent); border-color: var(--accent); }
.hero-index {
  font-family: var(--mono); font-size: 0.68rem;
  color: var(--fg3); letter-spacing: 0.1em;
}

/* ─── MARQUEE ───────────────────────────────────────────────────────────── */
.marquee-strip {
  overflow: hidden;
  border-bottom: 1px solid var(--rule);
  background: var(--bg);
  padding: 1.1rem 0;
}
.marquee-track {
  display: flex; gap: 0; white-space: nowrap;
  animation: marquee-scroll 28s linear infinite;
}
.marquee-item {
  font-family: var(--mono); font-size: 0.72rem;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--fg3); padding: 0 2.5rem;
  display: flex; align-items: center; gap: 2.5rem;
}
.marquee-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--accent); }
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* ─── SECTIONS BASE ─────────────────────────────────────────────────────── */
.v2-section { padding: 7rem 3rem; border-bottom: 1px solid var(--rule); position: relative; }
.v2-section.bg-alt { background: var(--bg2); }
.v2-section.bg-default { background: var(--bg); }
.s-head {
  display: flex; align-items: baseline; gap: 1.5rem;
  margin-bottom: 5rem;
}
.s-num {
  font-family: var(--mono); font-size: 0.68rem;
  letter-spacing: 0.2em; color: var(--accent);
}
.s-title {
  font-family: var(--serif);
  font-size: clamp(2.2rem, 5vw, 4rem);
  font-weight: 700; line-height: 1.05; letter-spacing: -0.02em;
  color: var(--fg);
}
.s-rule { flex: 1; height: 1px; background: var(--rule); margin-bottom: 0.4rem; }

/* ─── ABOUT ─────────────────────────────────────────────────────────────── */
.about-layout {
  display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 6rem; align-items: start;
}
.about-copy p {
  font-size: 1.15rem; line-height: 1.8; color: var(--fg2); margin-bottom: 1.4rem;
}
.about-copy p strong { color: var(--fg); font-weight: 500; }
.about-copy .about-quote {
  font-family: var(--serif); font-style: italic;
  font-size: 1.5rem; color: var(--fg); line-height: 1.4;
  border-left: 2px solid var(--accent); padding-left: 1.5rem;
  margin: 2.5rem 0;
}
.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--rule); }
.stat {
  background: var(--bg); padding: 1.75rem;
  transition: background 0.3s;
}
.stat:hover { background: var(--bg2); }
.stat-n {
  font-family: var(--serif); font-size: 2.8rem; font-weight: 900;
  color: var(--accent); line-height: 1; margin-bottom: 0.5rem;
}
.stat-l {
  font-size: 0.78rem; letter-spacing: 0.06em;
  color: var(--fg3); text-transform: uppercase; font-weight: 500;
}

/* ─── FEATURED PROJECTS ─────────────────────────────────────────────────── */
.featured-projects { display: flex; flex-direction: column; gap: 1px; }
.feat-card {
  display: grid; grid-template-columns: 80px 1fr 280px;
  gap: 3rem; align-items: center;
  padding: 3rem 0;
  border-bottom: 1px solid var(--rule);
  position: relative;
  transition: background 0.3s;
}
.feat-card::before {
  content: ''; position: absolute; left: -3rem; right: -3rem; top: 0; bottom: 0;
  background: transparent; transition: background 0.4s;
  pointer-events: none;
}
.feat-card:hover::before { background: rgba(255,255,255,0.015); }
.feat-card:last-child { border-bottom: none; }
.feat-num {
  font-family: var(--mono); font-size: 0.65rem;
  letter-spacing: 0.12em; color: var(--fg3); text-align: center;
}
.feat-badge {
  font-family: var(--mono); font-size: 0.62rem;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 0.6rem;
}
.feat-title {
  font-family: var(--serif); font-size: clamp(1.6rem, 3.5vw, 2.5rem);
  font-weight: 700; letter-spacing: -0.02em; margin-bottom: 0.75rem;
  line-height: 1.1; color: var(--fg);
}
.feat-desc { font-size: 0.9rem; color: var(--fg2); line-height: 1.65; }
.feat-meta { text-align: right; }
.feat-highlight {
  font-family: var(--serif); font-style: italic;
  font-size: 1.1rem; color: var(--fg); margin-bottom: 1.25rem;
}
.feat-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; justify-content: flex-end; }
.tag {
  font-family: var(--mono); font-size: 0.6rem; letter-spacing: 0.1em;
  text-transform: uppercase; padding: 0.22rem 0.55rem;
  border: 1px solid var(--rule); color: var(--fg3); border-radius: 1px;
}
.feat-link {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-family: var(--mono); font-size: 0.65rem;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--fg3); border-bottom: 1px solid var(--fg3);
  padding-bottom: 2px; margin-top: 1.25rem;
  transition: color 0.2s, border-color 0.2s;
  text-decoration: none;
}
.feat-link:hover { color: var(--accent); border-color: var(--accent); }
.feat-link svg { transition: transform 0.2s; }
.feat-link:hover svg { transform: translate(3px, -3px); }

/* ─── PROJECTS GRID ─────────────────────────────────────────────────────── */
.proj-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 1px; background: var(--rule);
  border: 1px solid var(--rule);
}
.proj-card {
  background: var(--bg); padding: 2rem;
  min-height: 240px; display: flex; flex-direction: column; gap: 0.75rem;
  position: relative; overflow: hidden;
  transition: background 0.3s;
}
.proj-card:hover { background: var(--bg2); }
.proj-card-num { font-family: var(--mono); font-size: 0.62rem; color: var(--fg3); letter-spacing: 0.1em; }
.proj-card-name {
  font-family: var(--serif); font-size: 1.25rem; font-weight: 600;
  letter-spacing: -0.01em; flex: 1; color: var(--fg);
}
.proj-card-desc { font-size: 0.82rem; color: var(--fg2); line-height: 1.6; }
.proj-card-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: auto; }
.proj-card-link {
  position: absolute; top: 1.25rem; right: 1.25rem;
  color: var(--fg3); transition: color 0.2s; text-decoration: none;
}
.proj-card-link:hover { color: var(--accent); }

/* ─── EXPERIENCE ────────────────────────────────────────────────────────── */
.exp-items { display: flex; flex-direction: column; }
.exp-row {
  display: grid; grid-template-columns: 180px 1fr;
  gap: 3rem; padding: 3rem 0;
  border-bottom: 1px solid var(--rule);
}
.exp-row:last-child { border-bottom: none; }
.exp-when { font-family: var(--mono); font-size: 0.7rem; color: var(--fg3); letter-spacing: 0.08em; line-height: 1.7; }
.exp-tag-pill {
  display: inline-block; margin-top: 0.75rem;
  font-family: var(--mono); font-size: 0.6rem; letter-spacing: 0.12em;
  text-transform: uppercase; padding: 0.2rem 0.6rem;
  border: 1px solid var(--rule); color: var(--fg3); border-radius: 1px;
}
.exp-tag-pill.live { color: var(--accent); border-color: var(--accent); background: rgba(0,161,155,0.06); }
.exp-title { font-family: var(--serif); font-size: 1.5rem; font-weight: 600; letter-spacing: -0.01em; margin-bottom: 0.2rem; color: var(--fg); }
.exp-org { font-size: 0.88rem; color: var(--fg2); margin-bottom: 1.25rem; }
.exp-org-note { color: var(--fg3); font-size: 0.8rem; }
.exp-bullets { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; padding: 0; margin: 0; }
.exp-bullets li {
  font-size: 0.88rem; color: var(--fg2); line-height: 1.65;
  padding-left: 1.25rem; position: relative;
}
.exp-bullets li::before { content: '—'; position: absolute; left: 0; color: var(--fg3); }
.exp-bullets strong { color: var(--fg); font-weight: 500; }

/* ─── PASSIONS ──────────────────────────────────────────────────────────── */
.passions-intro {
  font-size: 1rem; color: var(--fg2); max-width: 500px;
  line-height: 1.7; margin-bottom: 0;
}

/* ─── F1 LIGHTS ─────────────────────────────────────────────────────────── */
.f1-light {
  width: 18px; height: 18px; border-radius: 50%;
  background: #1a1a1a; border: 1px solid #333;
  transition: background 0.15s, box-shadow 0.15s;
}
.f1-light.on {
  background: var(--accent);
  box-shadow: 0 0 12px var(--accent), 0 0 24px rgba(0,161,155,0.4);
}

/* ─── SKILLS ────────────────────────────────────────────────────────────── */
.skills-layout { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
.skill-col h3 {
  font-family: var(--mono); font-size: 0.68rem;
  letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 1.25rem;
  padding-bottom: 0.75rem; border-bottom: 1px solid var(--rule);
}
.skill-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.55rem; padding: 0; margin: 0; }
.skill-col li {
  font-size: 0.88rem; color: var(--fg2);
  display: flex; align-items: center; gap: 0.7rem; line-height: 1.4;
}
.skill-col li::before { content: ''; width: 4px; height: 4px; border-radius: 50%; background: var(--fg3); flex-shrink: 0; }
.certs-row {
  margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--rule);
  display: flex; flex-wrap: wrap; gap: 0.75rem;
}
.cert-badge {
  font-family: var(--mono); font-size: 0.65rem; letter-spacing: 0.1em;
  text-transform: uppercase; padding: 0.35rem 0.85rem;
  border: 1px solid var(--fg3); color: var(--fg2);
}

/* ─── CONTACT ───────────────────────────────────────────────────────────── */
#contact {
  background: var(--bg);
  min-height: 60vh; display: flex; flex-direction: column; justify-content: center;
  position: relative; overflow: hidden;
  padding: 7rem 3rem;
}
.contact-bg-word {
  position: absolute; right: -0.04em; bottom: -0.1em;
  font-family: var(--serif); font-size: clamp(10rem, 24vw, 22rem);
  font-weight: 900; color: transparent;
  -webkit-text-stroke: 1px var(--rule);
  pointer-events: none; user-select: none;
  line-height: 1; letter-spacing: -0.04em;
}
.contact-inner { position: relative; z-index: 1; }
.contact-pre {
  font-family: var(--mono); font-size: 0.7rem; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--accent); margin-bottom: 1.5rem;
}
.contact-h {
  font-family: var(--serif); font-size: clamp(2.5rem, 7vw, 6rem);
  font-weight: 700; line-height: 1.0; letter-spacing: -0.03em;
  margin-bottom: 3rem; color: var(--fg);
}
.contact-links { display: flex; gap: 2rem; flex-wrap: wrap; }
.contact-link {
  display: flex; align-items: center; gap: 0.75rem;
  font-size: 0.9rem; color: var(--fg2);
  padding-bottom: 4px; border-bottom: 1px solid var(--fg3);
  transition: color 0.2s, border-color 0.2s;
  text-decoration: none;
}
.contact-link span {
  font-family: var(--mono); font-size: 0.62rem;
  letter-spacing: 0.12em; text-transform: uppercase; color: var(--fg3);
}
.contact-link:hover { color: var(--accent); border-color: var(--accent); }
.mag-btn {
  display: inline-flex; align-items: center; gap: 0.75rem;
  margin-top: 2rem;
  padding: 1rem 2.25rem;
  background: var(--accent); color: var(--fg);
  font-family: var(--mono); font-size: 0.75rem;
  letter-spacing: 0.15em; text-transform: uppercase;
  font-weight: 500;
  position: relative; overflow: hidden;
  transition: transform 0.2s;
  text-decoration: none;
}
.mag-btn::after {
  content: ''; position: absolute; inset: 0;
  background: rgba(255,255,255,0.1); opacity: 0;
  transition: opacity 0.2s;
}
.mag-btn:hover::after { opacity: 1; }

/* ─── FOOTER ────────────────────────────────────────────────────────────── */
.v2-footer {
  padding: 2rem 3rem;
  display: flex; align-items: center; justify-content: space-between;
  border-top: 1px solid var(--rule);
  background: var(--bg);
}
.v2-footer p { font-family: var(--mono); font-size: 0.65rem; letter-spacing: 0.1em; color: var(--fg3); }

/* ─── RESPONSIVE ────────────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .v2-nav { padding: 1.25rem 1.5rem; }
  .v2-nav.scrolled { padding: 0.9rem 1.5rem; }
  .nav-links, .nav-cta { display: none; }
  .v2-section { padding: 5rem 1.5rem; }
  #hero { padding: 0 1.5rem 2.5rem; }
  #contact { padding: 5rem 1.5rem; }
  .about-layout, .feat-card, .exp-row { grid-template-columns: 1fr; gap: 1.5rem; }
  .proj-grid { grid-template-columns: 1fr 1fr; }
  .skills-layout { grid-template-columns: 1fr 1fr; }
  .feat-meta { text-align: left; }
  .feat-tags { justify-content: flex-start; }
  .v2-footer { flex-direction: column; gap: 0.5rem; align-items: flex-start; }
}
@media (max-width: 600px) {
  .proj-grid { grid-template-columns: 1fr; }
  .hero-meta { flex-direction: column; gap: 1rem; align-items: flex-start; }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/css/portfolio-v2.css
git commit -m "design: add portfolio-v2.css with all component styles"
```

---

## Task 4: Create GSAPProvider

**Files:** Create `src/components/gsap/GSAPProvider.tsx`

This client component registers GSAP plugins and syncs Lenis scroll events to ScrollTrigger.

- [ ] **Step 1: Create `src/components/gsap/GSAPProvider.tsx`**

```tsx
'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useLenis } from 'lenis/react'
import { useEffect } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function GSAPProvider() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.off('scroll', ScrollTrigger.update)
    }
  }, [lenis])

  return null
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/gsap/GSAPProvider.tsx
git commit -m "feat: add GSAPProvider to sync Lenis scroll with ScrollTrigger"
```

---

## Task 5: Update `layout.tsx`

**Files:** Modify `src/app/layout.tsx`

Replace with new fonts, remove DefaultLayout, add GSAPProvider, import v2 CSS.

- [ ] **Step 1: Replace `src/app/layout.tsx`**

```tsx
import { ReactLenis } from '@/components/lenis/lenis'
import GSAPProvider from '@/components/gsap/GSAPProvider'
import '@/css/style.css'
import '@/css/portfolio-v2.css'
import { Metadata } from 'next'
import { Playfair_Display, DM_Sans, DM_Mono } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Pristian Budi Dharmawan — Software Engineer · Agentic AI Builder',
  description: 'Full-stack software engineer specialising in scalable web applications, ELT data pipelines, and AI integration.',
  keywords: [
    'Software Engineer',
    'Agentic AI',
    'Full Stack Developer',
    'React',
    'Next.js',
    'TypeScript',
  ],
  openGraph: {
    title: 'Pristian Budi Dharmawan — Software Engineer · Agentic AI Builder',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body suppressHydrationWarning style={{ margin: 0 }}>
        <ReactLenis root options={{ lerp: 0.08, smoothWheel: true, overscroll: false }}>
          <GSAPProvider />
          {children}
        </ReactLenis>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify fonts load**

```bash
npm run dev
```

Open `http://localhost:3000` — the page should load without TypeScript errors. Font CSS variables (`--font-serif`, etc.) should be present in the `<html>` element's class list.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: update layout with v2 fonts, GSAPProvider, v2 CSS"
```

---

## Task 6: Create CustomCursor

**Files:** Create `src/components/cursor/CustomCursor.tsx`

- [ ] **Step 1: Create `src/components/cursor/CustomCursor.tsx`**

```tsx
'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const ringPosRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      const { x: mx, y: my } = mouseRef.current
      const { x: rx, y: ry } = ringPosRef.current

      dot.style.left = `${mx}px`
      dot.style.top = `${my}px`

      const newRx = rx + (mx - rx) * 0.12
      const newRy = ry + (my - ry) * 0.12
      ringPosRef.current = { x: newRx, y: newRy }

      ring.style.left = `${newRx}px`
      ring.style.top = `${newRy}px`

      rafRef.current = requestAnimationFrame(animate)
    }

    const onEnter = () => document.body.classList.add('cursor-hover')
    const onLeave = () => document.body.classList.remove('cursor-hover')

    window.addEventListener('mousemove', onMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    const interactives = document.querySelectorAll(
      'a, button, .proj-card, .feat-card, .stat'
    )
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/cursor/CustomCursor.tsx
git commit -m "feat: add CustomCursor component (dot + lagging ring)"
```

---

## Task 7: Create NavBar

**Files:** Create `src/components/nav/NavBar.tsx`

- [ ] **Step 1: Create `src/components/nav/NavBar.tsx`**

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'

const NAV_LINKS = [
  { label: 'About', href: 'about' },
  { label: 'Work', href: 'featured' },
  { label: 'Experience', href: 'experience' },
  { label: 'Passions', href: 'passions' },
  { label: 'Contact', href: 'contact' },
]

export default function NavBar() {
  const navRef = useRef<HTMLElement>(null)
  const lenis = useLenis()

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 80)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const target = document.getElementById(id)
    if (target && lenis) {
      lenis.scrollTo(target, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        offset: 0,
      })
    }
  }

  return (
    <nav id="main-nav" ref={navRef} className="v2-nav">
      <a href="#hero" className="nav-logo">
        GUN<span>A</span>WAN
      </a>
      <ul className="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={`#${link.href}`}
              onClick={(e) => {
                e.preventDefault()
                scrollTo(link.href)
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <a href="mailto:pristian.dharmawan@gmail.com" className="nav-cta">
        Get in touch
      </a>
    </nav>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/nav/NavBar.tsx
git commit -m "feat: add NavBar with scroll-compact behavior and Lenis smooth scroll"
```

---

## Task 8: Create Footer

**Files:** Create `src/components/footer/Footer.tsx`

- [ ] **Step 1: Create `src/components/footer/Footer.tsx`**

```tsx
export default function Footer() {
  return (
    <footer className="v2-footer">
      <p>© 2026 Pristian &quot;Gunawan&quot; Budi Dharmawan</p>
      <p>Jakarta, Indonesia · Open to opportunities</p>
      <p>Built with Next.js · GSAP · Lenis</p>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/footer/Footer.tsx
git commit -m "feat: add Footer component"
```

---

## Task 9: Update content files

**Files:** `src/contents/Descriptions.tsx`, `src/contents/Projects.tsx`, `src/contents/Stacks.tsx`

- [ ] **Step 1: Replace `src/contents/Descriptions.tsx`**

```tsx
export const aboutBio = {
  paragraphs: [
    'Full-stack software engineer with <strong>2+ years of production experience</strong> at PT Kalbe Farma Tbk (IDX: KLBF), Indonesia\'s largest listed pharma group — specialising in scalable web applications, ELT data pipelines, and AI integration.',
    'I named my agentic AI projects, agents, and systems <strong>Gunawan</strong> — a name built to outlast frameworks and trends. I architect autonomous systems that eliminate manual work — from AI chatbots serving thousands of users, to 150+ Power Automate workflows that run without human intervention.',
    'Every system I ship is built to last — not to impress in a sprint review, but to still be running, still be scaling, three years after I\'ve moved on. That\'s the standard. That\'s the only one that matters.',
  ],
  quote: 'I don\'t build features. I build legacies — systems that refuse to stop running, long after everyone else has moved on.',
}

export const heroTagline =
  'Building the future of <strong>agentic software development</strong> — from healthcare AI to supply chain automation, owning systems end-to-end.'

export const stats = [
  { value: 2, suffix: '+', decimals: 0, label: 'Years in production' },
  { value: 150, suffix: '+', decimals: 0, label: 'Automation workflows' },
  { value: 500, suffix: '×', decimals: 0, label: 'Community growth' },
  { value: 3.94, suffix: '', decimals: 2, label: 'GPA — Summa Cum Laude' },
]
```

- [ ] **Step 2: Replace `src/contents/Projects.tsx`**

```tsx
export interface FeaturedProject {
  num: string
  badge: string
  title: string
  description: string
  highlight: string
  tags: string[]
  link: string
}

export interface GridProject {
  num: string
  category: string
  name: string
  description: string
  tags: string[]
  link: string
}

export const featuredProjects: FeaturedProject[] = [
  {
    num: '01',
    badge: 'Agentic AI · Active Development',
    title: 'Gunawan Agents',
    description:
      'Personal AI agent framework — the foundation of autonomous software development workflows. Building agents that plan, code, test, and deploy with minimal human intervention.',
    highlight: 'Agentic AI · Software Factory',
    tags: ['TypeScript', 'Agents', 'LLM', 'Automation'],
    link: 'https://github.com/iannn07',
  },
  {
    num: '02',
    badge: 'Mobile App · Local Discovery',
    title: 'The Weeknd Project',
    description:
      'A TikTok-style mobile app that surfaces what\'s hot in your current area — local spaces, events, and moments. Designed for real-time discovery and hyper-local social relevance.',
    highlight: 'Hyper-local social discovery',
    tags: ['React Native', 'Mobile', 'Real-time', 'Location'],
    link: 'https://github.com/iannn07',
  },
  {
    num: '03',
    badge: 'Thesis · AI Healthcare',
    title: 'Axolotl — Your Caregiver',
    description:
      'AI-powered healthcare platform with a Random Forest Classifier trained on 133 symptoms. Full-stack system with E2E test coverage, DB data-flow verification, and clinical workflow integration.',
    highlight: '96.45% diagnostic accuracy',
    tags: ['Next.js', 'FastAPI', 'Python', 'Random Forest', 'Supabase'],
    link: 'https://github.com/iannn07/Axolotl',
  },
]

export const gridProjects: GridProject[] = [
  {
    num: '04',
    category: 'Organisation',
    name: 'The Weeknd Organisation',
    description:
      'Contributing as <strong>Lead Software Engineer</strong> — building and architecting software systems within the organisation.',
    tags: ['Lead SE', 'Architecture'],
    link: 'https://github.com/iannn07',
  },
  {
    num: '05',
    category: 'OSS',
    name: 'TanStack Custom FilterFn',
    description:
      'Open-source contribution — custom filter functions including date range and IncludesSubString for React Table.',
    tags: ['React', 'TypeScript', 'Open Source'],
    link: 'https://github.com/iannn07/TanStack-Custom-FilterFn',
  },
  {
    num: '06',
    category: 'Healthcare',
    name: 'HL7 Deno Parser',
    description:
      'HL7 medical data protocol implementation in Deno — supporting digital radiology workflows.',
    tags: ['Deno', 'TypeScript', 'HL7'],
    link: 'https://github.com/iannn07/hl7-deno',
  },
  {
    num: '07',
    category: 'Mobile',
    name: 'MedExpert',
    description: 'Flutter mobile app for medical expertise. Watch the full demo on YouTube.',
    tags: ['Flutter', 'Dart', '▶ Demo'],
    link: 'https://www.youtube.com/watch?v=ppB0mTmSyhg&t=40s',
  },
  {
    num: '08',
    category: 'Data Science',
    name: 'House ROI Forecasting',
    description:
      'Big data project forecasting Melbourne property ROI using ML on historical pricing and market signals.',
    tags: ['Python', 'ML', 'Jupyter'],
    link: 'https://github.com/iannn07/S5-BDA-Project-House-ROI-Forecasting',
  },
  {
    num: '09',
    category: 'Hackathon',
    name: 'Old Gartic V2',
    description:
      'Codedex Holiday Hackathon entry — collaborative real-time drawing and guessing game.',
    tags: ['Real-time', 'Hackathon'],
    link: 'https://github.com/iannn07/Old-Gartic-V2',
  },
]
```

- [ ] **Step 3: Replace `src/contents/Stacks.tsx`**

```tsx
export interface SkillColumn {
  category: string
  skills: string[]
}

export const skillColumns: SkillColumn[] = [
  {
    category: 'Languages',
    skills: ['TypeScript / JavaScript', 'Python', 'Dart (Flutter)', 'SQL', 'Golang'],
  },
  {
    category: 'Frameworks',
    skills: ['Next.js / React', 'Node.js / Deno', 'FastAPI', 'Flutter', 'GSAP / Lenis'],
  },
  {
    category: 'DevOps & Infra',
    skills: [
      'Docker / Kubernetes',
      'GCP Cloud Run',
      'CI/CD Pipelines',
      'Supabase / PostgreSQL',
      'Microservices',
    ],
  },
  {
    category: 'AI & Data',
    skills: [
      'Agentic AI Systems',
      'ELT / ETL Pipelines',
      'Power Automate',
      'k6 / Jest / QA',
      'System Design',
    ],
  },
]

export const certBadges = [
  'Automation Developer Python L1',
  'Gemini API by Google',
  'SQL Intermediate',
  'SQL Basic',
  'Summa Cum Laude — GPA 3.94',
  'Best Paper Award',
]
```

- [ ] **Step 4: Commit**

```bash
git add src/contents/Descriptions.tsx src/contents/Projects.tsx src/contents/Stacks.tsx
git commit -m "content: update all content files for v2 design"
```

---

## Task 10: Update `jumpSections.ts`

**Files:** Modify `src/constants/jumpSections.ts`

- [ ] **Step 1: Replace `src/constants/jumpSections.ts`**

```ts
export const jumpSections = [
  { name: 'About', href: 'about' },
  { name: 'Work', href: 'featured' },
  { name: 'Experience', href: 'experience' },
  { name: 'Passions', href: 'passions' },
  { name: 'Contact', href: 'contact' },
]
```

- [ ] **Step 2: Commit**

```bash
git add src/constants/jumpSections.ts
git commit -m "chore: update jumpSections for v2 nav"
```

---

## Task 11: Create HeroSection

**Files:** Create `src/app/(pages)/home/(sections)/HeroSection.tsx`

- [ ] **Step 1: Create `HeroSection.tsx`**

```tsx
import { heroTagline } from '@/contents/Descriptions'

export default function HeroSection() {
  return (
    <section id="hero">
      <div className="hero-grid-lines" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-label">
          Software Engineer · Agentic AI Builder · Jakarta, ID
        </div>
        <h1 className="hero-name">
          <span className="hero-name-line">PRISTIAN</span>
          <span className="hero-name-line">BUDI</span>
          <span className="hero-name-line">DHARMAWAN</span>
        </h1>
        <div className="hero-alias">
          alias <em>Gunawan</em>
        </div>
      </div>

      <div className="hero-bottom">
        <p
          className="hero-tagline"
          dangerouslySetInnerHTML={{ __html: heroTagline }}
        />
        <div className="hero-meta">
          <a
            href="https://github.com/iannn07"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/pristian-budi-dharmawan/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:pristian.dharmawan@gmail.com">Email</a>
          <span className="hero-index">PT Kalbe Farma — Software Engineer</span>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/(pages)/home/(sections)/HeroSection.tsx"
git commit -m "feat: add HeroSection"
```

---

## Task 12: Create MarqueeStrip

**Files:** Create `src/app/(pages)/home/(sections)/MarqueeStrip.tsx`

- [ ] **Step 1: Create `MarqueeStrip.tsx`**

```tsx
const ITEMS = [
  'Full-Stack Engineering',
  'Agentic AI Development',
  'System Architecture',
  'Community Leadership',
  'ELT Data Pipelines',
  'AI Integration',
  'Open Source',
  'Software Engineering',
  'DevOps & Infra',
]

export default function MarqueeStrip() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/(pages)/home/(sections)/MarqueeStrip.tsx"
git commit -m "feat: add MarqueeStrip with CSS animation"
```

---

## Task 13: Create AboutSection

**Files:** Create `src/app/(pages)/home/(sections)/AboutSection.tsx`

- [ ] **Step 1: Create `AboutSection.tsx`**

```tsx
'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef, useEffect } from 'react'
import { aboutBio, stats } from '@/contents/Descriptions'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const statRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(
    () => {
      const revealEls = sectionRef.current?.querySelectorAll<HTMLElement>(
        '.s-head, .about-copy, .stats-grid'
      )
      revealEls?.forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 36,
          duration: 0.85,
          ease: 'power3.out',
          delay: (i % 4) * 0.07,
        })
      })
    },
    { scope: sectionRef }
  )

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    statRefs.current.forEach((el, i) => {
      const def = stats[i]
      if (!el || !def) return

      let animated = false
      const numEl = el.querySelector<HTMLElement>('.stat-n')
      if (!numEl) return

      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !animated) {
            animated = true
            const start = performance.now()
            const dur = 1400

            const tick = (now: number) => {
              const p = Math.min((now - start) / dur, 1)
              const ease = 1 - Math.pow(1 - p, 3)
              const val = def.value * ease
              numEl.textContent =
                (def.decimals ? val.toFixed(def.decimals) : Math.round(val)) +
                def.suffix
              if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          }
        },
        { threshold: 0.5 }
      )

      io.observe(el)
      observers.push(io)
    })

    return () => observers.forEach((io) => io.disconnect())
  }, [])

  return (
    <section id="about" ref={sectionRef} className="v2-section bg-default">
      <div className="s-head">
        <span className="s-num">01</span>
        <h2 className="s-title">About</h2>
        <div className="s-rule" />
      </div>

      <div className="about-layout">
        <div className="about-copy">
          {aboutBio.paragraphs.map((para, i) =>
            i === 1 ? (
              <blockquote key="quote" className="about-quote">
                &ldquo;{aboutBio.quote}&rdquo;
              </blockquote>
            ) : (
              <p
                key={i}
                dangerouslySetInnerHTML={{ __html: para }}
              />
            )
          )}
          <p
            dangerouslySetInnerHTML={{
              __html: aboutBio.paragraphs[aboutBio.paragraphs.length - 1],
            }}
          />
        </div>

        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat"
              ref={(el) => { statRefs.current[i] = el }}
            >
              <div className="stat-n">
                {stat.value}{stat.suffix}
              </div>
              <div className="stat-l">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

> Note: The `aboutBio.paragraphs` array has 3 items (index 0, 1, 2). The blockquote renders between paragraphs 0 and 2. The current render logic maps index 1 to the blockquote and renders the last paragraph separately. If the content file changes order, adjust accordingly.

- [ ] **Step 2: Commit**

```bash
git add "src/app/(pages)/home/(sections)/AboutSection.tsx"
git commit -m "feat: add AboutSection with GSAP reveals and stat counters"
```

---

## Task 14: Create FeaturedWorkSection

**Files:** Create `src/app/(pages)/home/(sections)/FeaturedWorkSection.tsx`

- [ ] **Step 1: Create `FeaturedWorkSection.tsx`**

```tsx
'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { featuredProjects } from '@/contents/Projects'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const ArrowIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M1 11L11 1M11 1H4M11 1V8" />
  </svg>
)

export default function FeaturedWorkSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      sectionRef.current
        ?.querySelectorAll<HTMLElement>('.s-head, .feat-card')
        .forEach((el, i) => {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 36,
            duration: 0.85,
            ease: 'power3.out',
            delay: (i % 4) * 0.07,
          })
        })
    },
    { scope: sectionRef }
  )

  return (
    <section id="featured" ref={sectionRef} className="v2-section bg-alt">
      <div className="s-head">
        <span className="s-num">02</span>
        <h2 className="s-title">Featured Work</h2>
        <div className="s-rule" />
      </div>

      <div className="featured-projects">
        {featuredProjects.map((project) => (
          <div key={project.num} className="feat-card">
            <div className="feat-num">{project.num}</div>
            <div className="feat-body">
              <div className="feat-badge">{project.badge}</div>
              <h3 className="feat-title">{project.title}</h3>
              <p className="feat-desc">{project.description}</p>
            </div>
            <div className="feat-meta">
              <div className="feat-highlight">{project.highlight}</div>
              <div className="feat-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="feat-link"
              >
                View on GitHub <ArrowIcon />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/(pages)/home/(sections)/FeaturedWorkSection.tsx"
git commit -m "feat: add FeaturedWorkSection with 3 featured projects"
```

---

## Task 15: Create ProjectsGridSection

**Files:** Create `src/app/(pages)/home/(sections)/ProjectsGridSection.tsx`

- [ ] **Step 1: Create `ProjectsGridSection.tsx`**

```tsx
'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gridProjects } from '@/contents/Projects'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const LinkIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M1 12L12 1M12 1H5M12 1V8" />
  </svg>
)

export default function ProjectsGridSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      sectionRef.current
        ?.querySelectorAll<HTMLElement>('.s-head, .proj-card')
        .forEach((el, i) => {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 36,
            duration: 0.85,
            ease: 'power3.out',
            delay: (i % 4) * 0.07,
          })
        })
    },
    { scope: sectionRef }
  )

  return (
    <section id="projects" ref={sectionRef} className="v2-section bg-default">
      <div className="s-head">
        <span className="s-num">03</span>
        <h2 className="s-title">More Projects</h2>
        <div className="s-rule" />
      </div>

      <div className="proj-grid">
        {gridProjects.map((project) => (
          <div key={project.num} className="proj-card">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-card-link"
            >
              <LinkIcon />
            </a>
            <div className="proj-card-num">
              {project.num} / {project.category}
            </div>
            <div className="proj-card-name">{project.name}</div>
            <div
              className="proj-card-desc"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
            <div className="proj-card-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/(pages)/home/(sections)/ProjectsGridSection.tsx"
git commit -m "feat: add ProjectsGridSection (6-card grid)"
```

---

## Task 16: Create ExperienceSection

**Files:** Create `src/app/(pages)/home/(sections)/ExperienceSection.tsx`

- [ ] **Step 1: Create `ExperienceSection.tsx`**

```tsx
'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const EXPERIENCES = [
  {
    period: 'Jun 2025 — Present',
    location: 'Jakarta, ID',
    type: 'Current' as const,
    title: 'Software Engineer',
    org: 'PT Kalbe Farma Tbk',
    orgNote: 'IDX: KLBF — Indonesia\'s largest listed pharma group',
    bullets: [
      'Architected and shipped an internal <strong>AI Chatbot</strong> from scratch as sole IC, serving ~1,000 potential end-users across a single SBU.',
      'Tech-led the <strong>SCM Dashboard</strong> for 3 SBUs — designed system architecture and implemented an ELT pipeline reducing hundreds of thousands of records to thousands of actionable entries.',
      'Delivered <strong>RIS & PACS installations</strong> across ~4 hospitals in Sumatra, Java, and Bali enabling end-to-end digital radiology workflows.',
      'Engineered <strong>150+ internal automation workflows</strong> (Power Automate + Python) eliminating manual processing across divisions.',
    ],
  },
  {
    period: 'Feb 2024 — Jun 2025',
    location: 'Remote',
    type: 'Internship' as const,
    title: 'Software Engineer — Intern',
    org: 'PT Kalbe Farma Tbk',
    orgNote: null,
    bullets: [
      'Owned front-end architecture for 3 major features in Next.js + Supabase; lifted Lighthouse scores from 20–30 to <strong>~70–90</strong> — a 3–4× improvement.',
      'Automated workflows for 2 divisions via Power Automate, reducing cycle time by <strong>10×</strong>.',
      'Introduced <strong>Negative Space Programming</strong> as a team-wide defensive coding standard.',
    ],
  },
  {
    period: 'Jul 2021 — Feb 2024',
    location: 'Malang, ID',
    type: 'University' as const,
    title: 'Data Management Assistant',
    org: 'BINUS University',
    orgNote: '+ Chapter Lead, GDSC BINUS Malang',
    bullets: [
      'Scaled GDSC BINUS Malang from ~20 to <strong>500+ members</strong> (25× growth) as Chapter Lead — led 26-person core team, organised 5 local + 3 international events reaching 1,000+ attendees.',
      'Built CRM dashboards in Excel and Salesforce to drive data-based student acquisition decisions; represented BINUS across <strong>7 cities</strong>.',
    ],
  },
]

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      sectionRef.current
        ?.querySelectorAll<HTMLElement>('.s-head, .exp-row')
        .forEach((el, i) => {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 36,
            duration: 0.85,
            ease: 'power3.out',
            delay: (i % 4) * 0.07,
          })
        })
    },
    { scope: sectionRef }
  )

  return (
    <section id="experience" ref={sectionRef} className="v2-section bg-alt">
      <div className="s-head">
        <span className="s-num">04</span>
        <h2 className="s-title">Experience</h2>
        <div className="s-rule" />
      </div>

      <div className="exp-items">
        {EXPERIENCES.map((exp, i) => (
          <div key={i} className="exp-row">
            <div>
              <div className="exp-when">
                {exp.period}
                <br />
                {exp.location}
              </div>
              <div className={`exp-tag-pill${exp.type === 'Current' ? ' live' : ''}`}>
                {exp.type}
              </div>
            </div>
            <div>
              <div className="exp-title">{exp.title}</div>
              <div className="exp-org">
                {exp.org}
                {exp.orgNote && (
                  <>
                    {' · '}
                    <span className="exp-org-note">{exp.orgNote}</span>
                  </>
                )}
              </div>
              <ul className="exp-bullets">
                {exp.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    dangerouslySetInnerHTML={{ __html: bullet }}
                  />
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/(pages)/home/(sections)/ExperienceSection.tsx"
git commit -m "feat: add ExperienceSection with 3 timeline rows"
```

---

## Task 17: Create PassionsSection (F1 animation)

**Files:** Create `src/app/(pages)/home/(sections)/PassionsSection.tsx`

This is the most complex component. It uses a GSAP timeline for the F1/MotoGP race animation with a restart loop.

- [ ] **Step 1: Create `PassionsSection.tsx`**

```tsx
'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef, useState } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function PassionsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const carRef = useRef<HTMLDivElement>(null)
  const bikeRef = useRef<HTMLDivElement>(null)
  const blurRef = useRef<HTMLDivElement>(null)
  const flag1Ref = useRef<HTMLDivElement>(null)
  const flag2Ref = useRef<HTMLDivElement>(null)
  const light1Ref = useRef<HTMLDivElement>(null)
  const light2Ref = useRef<HTMLDivElement>(null)
  const light3Ref = useRef<HTMLDivElement>(null)
  const light4Ref = useRef<HTMLDivElement>(null)
  const light5Ref = useRef<HTMLDivElement>(null)
  const mountedRef = useRef(true)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const [raceLabel, setRaceLabel] = useState('RACE START')

  const runRace = (stageWidth: number) => {
    if (!mountedRef.current) return

    const lights = [
      light1Ref.current,
      light2Ref.current,
      light3Ref.current,
      light4Ref.current,
      light5Ref.current,
    ].filter(Boolean) as HTMLElement[]

    // Reset
    lights.forEach((l) => l.classList.remove('on'))
    gsap.set(carRef.current, { x: -220, opacity: 1 })
    gsap.set(bikeRef.current, { x: -180, opacity: 1 })
    gsap.set([flag1Ref.current, flag2Ref.current, blurRef.current], { opacity: 0 })
    setRaceLabel('RACE START')

    const tl = gsap.timeline()
    tlRef.current = tl

    // Lights on — one by one
    lights.forEach((l, i) => tl.call(() => l.classList.add('on'), [], i * 0.42))

    // Lights out
    tl.call(
      () => {
        lights.forEach((l) => l.classList.remove('on'))
        setRaceLabel('LIGHTS OUT')
      },
      [],
      2.4
    )

    // F1 car launches
    tl.to(
      carRef.current,
      {
        x: stageWidth + 240,
        duration: 2.4,
        ease: 'power4.in',
        onStart: () => setRaceLabel('GO GO GO'),
      },
      2.75
    )

    // Speed blur
    tl.to(blurRef.current, { opacity: 1, duration: 0.2 }, 2.75)
    tl.to(blurRef.current, { opacity: 0, duration: 0.4 }, 3.8)

    // MotoGP bike
    tl.to(
      bikeRef.current,
      { x: stageWidth + 200, duration: 2.8, ease: 'power3.in' },
      3.0
    )

    // Checkered flags
    tl.to(flag1Ref.current, { opacity: 1, duration: 0.25 }, 4.9)
    tl.to(flag2Ref.current, { opacity: 1, duration: 0.25 }, 5.2)
    tl.call(() => setRaceLabel('RACE COMPLETE ✓'), [], 5.4)

    // Loop
    tl.call(
      () => {
        if (mountedRef.current) {
          setTimeout(() => runRace(stageWidth), 3000)
        }
      },
      [],
      6.5
    )
  }

  useGSAP(
    () => {
      // Section header reveal
      const headEl = sectionRef.current?.querySelector<HTMLElement>('.s-head')
      if (headEl) {
        gsap.from(headEl, {
          scrollTrigger: { trigger: headEl, start: 'top 88%', toggleActions: 'play none none none' },
          opacity: 0,
          y: 36,
          duration: 0.85,
          ease: 'power3.out',
        })
      }

      // Fire race when stage enters viewport
      ScrollTrigger.create({
        trigger: stageRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          const width = stageRef.current?.offsetWidth ?? 1200
          runRace(width)
        },
      })

      return () => {
        mountedRef.current = false
        tlRef.current?.kill()
      }
    },
    { scope: sectionRef }
  )

  return (
    <>
      <section
        id="passions"
        ref={sectionRef}
        className="v2-section bg-default"
        style={{ paddingBottom: 0, borderBottom: 'none' }}
      >
        <div className="s-head">
          <span className="s-num">05</span>
          <h2 className="s-title">Off the Clock</h2>
          <div className="s-rule" />
        </div>
        <p className="passions-intro" style={{ marginBottom: '3rem' }}>
          When I&apos;m not shipping code, I&apos;m tracking lap times — obsessed
          with Formula 1, Le Mans endurance, sports cars, and sports bikes.
        </p>
      </section>

      {/* F1 + MotoGP Race Stage */}
      <div
        id="f1-stage"
        ref={stageRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '380px',
          background: 'var(--bg2)',
          borderTop: '1px solid var(--rule)',
          borderBottom: '1px solid var(--rule)',
          overflow: 'hidden',
        }}
      >
        {/* Track lanes */}
        <div style={{ position: 'absolute', top: '30%', left: 0, right: 0, height: '52px', transform: 'translateY(-50%)', background: 'rgba(25,23,18,0.8)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }} />
        <div style={{ position: 'absolute', top: '72%', left: 0, right: 0, height: '44px', transform: 'translateY(-50%)', background: 'rgba(25,23,18,0.8)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }} />

        {/* Track labels */}
        <div style={{ position: 'absolute', top: 'calc(30% - 2rem)', left: '3rem', fontFamily: 'var(--mono)', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg3)' }}>Formula 1</div>
        <div style={{ position: 'absolute', top: 'calc(72% - 2rem)', left: '3rem', fontFamily: 'var(--mono)', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg3)' }}>MotoGP</div>

        {/* Start lights */}
        <div style={{ position: 'absolute', top: '1.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
          <div className="f1-light" ref={light1Ref} />
          <div className="f1-light" ref={light2Ref} />
          <div className="f1-light" ref={light3Ref} />
          <div className="f1-light" ref={light4Ref} />
          <div className="f1-light" ref={light5Ref} />
        </div>

        {/* Race label */}
        <div style={{ position: 'absolute', top: '1.6rem', left: '3rem', fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--fg3)' }}>
          {raceLabel}
        </div>

        {/* F1 Car */}
        <div ref={carRef} style={{ position: 'absolute', top: '30%', left: 0, transform: 'translateY(-50%) translateX(-220px)', width: '180px' }}>
          <svg viewBox="0 0 260 56" xmlns="http://www.w3.org/2000/svg" fill="none">
            <ellipse cx="120" cy="52" rx="90" ry="4" fill="rgba(0,0,0,0.3)"/>
            <path d="M200 40 L230 40 L232 36 L202 36 Z" fill="#0a0a0a"/>
            <path d="M28 38 Q34 18 58 16 L175 16 Q205 18 218 30 L224 38 Z" fill="var(--accent)"/>
            <path d="M58 16 L175 16 L178 22 L56 22 Z" fill="rgba(200,220,220,0.25)"/>
            <path d="M78 28 L162 28 L166 38 L74 38 Z" fill="rgba(0,0,0,0.3)"/>
            <path d="M108 16 Q118 6 138 6 Q148 6 152 16 Z" fill="#0d1a1a"/>
            <path d="M112 16 Q120 9 136 9 Q144 9 148 16" stroke="var(--accent)" strokeWidth="1.5" fill="none"/>
            <path d="M6 35 L28 38 L30 30 L12 30 Z" fill="var(--accent)"/>
            <path d="M2 36 L8 36 L10 33 L4 33 Z" fill="#888"/>
            <rect x="2" y="37" width="32" height="2" fill="rgba(200,220,220,0.6)"/>
            <rect x="8" y="39" width="20" height="1.5" fill="rgba(200,220,220,0.4)"/>
            <rect x="218" y="15" width="5" height="20" fill="var(--accent)"/>
            <rect x="210" y="14" width="22" height="2.5" fill="rgba(200,220,220,0.7)"/>
            <rect x="213" y="17" width="16" height="1.5" fill="rgba(200,220,220,0.4)"/>
            <circle cx="56" cy="41" r="11" fill="#111"/><circle cx="56" cy="41" r="7" fill="#1e1e1e"/><circle cx="56" cy="41" r="3" fill="#2a2a2a"/>
            <circle cx="182" cy="41" r="11" fill="#111"/><circle cx="182" cy="41" r="7" fill="#1e1e1e"/><circle cx="182" cy="41" r="3" fill="#2a2a2a"/>
            <circle cx="56" cy="41" r="4" fill="rgba(255,120,0,0.15)"/>
            <rect x="100" y="20" width="32" height="14" rx="1" fill="rgba(0,0,0,0.5)"/>
            <text x="116" y="31" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="var(--accent)" textAnchor="middle">W01</text>
          </svg>
        </div>

        {/* MotoGP Bike */}
        <div ref={bikeRef} style={{ position: 'absolute', top: '72%', left: 0, transform: 'translateY(-50%) translateX(-180px)', width: '130px' }}>
          <svg viewBox="0 0 200 70" xmlns="http://www.w3.org/2000/svg" fill="none">
            <ellipse cx="95" cy="66" rx="55" ry="4" fill="rgba(0,0,0,0.3)"/>
            <circle cx="148" cy="52" r="16" fill="#111"/><circle cx="148" cy="52" r="10" fill="#1e1e1e"/><circle cx="148" cy="52" r="4" fill="#2a2a2a"/>
            <circle cx="38" cy="52" r="14" fill="#111"/><circle cx="38" cy="52" r="8" fill="#1e1e1e"/><circle cx="38" cy="52" r="3" fill="#2a2a2a"/>
            <path d="M48 48 L90 30 L130 34 L148 38" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"/>
            <path d="M90 30 L80 50 L110 50 L130 34" fill="var(--accent)" opacity="0.9"/>
            <path d="M44 44 Q50 24 72 18 Q90 14 110 18 L132 34 L125 50 L60 52 Z" fill="var(--accent)"/>
            <path d="M72 18 Q90 14 110 18 L115 24 Q90 20 72 24 Z" fill="rgba(200,220,220,0.3)"/>
            <path d="M72 18 Q68 12 72 8 Q82 4 94 6 Q100 8 96 18 Z" fill="rgba(150,200,220,0.25)" stroke="rgba(200,220,220,0.4)" strokeWidth="0.8"/>
            <ellipse cx="98" cy="20" rx="10" ry="8" fill="#0d1a1a"/>
            <path d="M88 24 Q85 34 88 44 L108 42 Q112 32 104 22 Z" fill="#0d1a1a"/>
            <path d="M130 42 L156 38 L158 42 L132 46 Z" fill="#333"/>
            <rect x="58" y="28" width="28" height="14" rx="1" fill="rgba(0,0,0,0.4)"/>
            <text x="72" y="39" fontFamily="monospace" fontSize="9" fontWeight="bold" fill="var(--accent)" textAnchor="middle">93</text>
          </svg>
        </div>

        {/* Speed blur */}
        <div ref={blurRef} style={{ position: 'absolute', top: '30%', transform: 'translateY(-50%)', left: 0, width: '100%', height: '4px', opacity: 0 }}>
          <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right,transparent,var(--accent),transparent)', marginBottom: '6px' }} />
          <div style={{ width: '60%', height: '1px', background: 'linear-gradient(to right,transparent,rgba(200,220,220,0.3),transparent)', marginLeft: '20%' }} />
        </div>

        {/* Checkered flags */}
        <div ref={flag1Ref} style={{ position: 'absolute', top: '30%', right: '3rem', transform: 'translateY(-50%)', opacity: 0, fontSize: '2rem' }}>🏁</div>
        <div ref={flag2Ref} style={{ position: 'absolute', top: '72%', right: '3rem', transform: 'translateY(-50%)', opacity: 0, fontSize: '1.8rem' }}>🏁</div>

        {/* Bottom labels */}
        <div style={{ position: 'absolute', bottom: '1.25rem', left: '3rem', display: 'flex', gap: '2.5rem' }}>
          {['Formula 1', 'MotoGP', 'Le Mans 24H', 'Sports Cars', 'Sports Bikes'].map((label) => (
            <span key={label} style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg3)' }}>
              {label}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/(pages)/home/(sections)/PassionsSection.tsx"
git commit -m "feat: add PassionsSection with F1+MotoGP GSAP race animation"
```

---

## Task 18: Create SkillsSection

**Files:** Create `src/app/(pages)/home/(sections)/SkillsSection.tsx`

- [ ] **Step 1: Create `SkillsSection.tsx`**

```tsx
'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { skillColumns, certBadges } from '@/contents/Stacks'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      sectionRef.current
        ?.querySelectorAll<HTMLElement>('.s-head, .skill-col')
        .forEach((el, i) => {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 36,
            duration: 0.85,
            ease: 'power3.out',
            delay: (i % 4) * 0.07,
          })
        })
    },
    { scope: sectionRef }
  )

  return (
    <section id="skills" ref={sectionRef} className="v2-section bg-alt">
      <div className="s-head">
        <span className="s-num">06</span>
        <h2 className="s-title">Skills</h2>
        <div className="s-rule" />
      </div>

      <div className="skills-layout">
        {skillColumns.map((col) => (
          <div key={col.category} className="skill-col">
            <h3>{col.category}</h3>
            <ul>
              {col.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="certs-row">
        {certBadges.map((badge) => (
          <span key={badge} className="cert-badge">
            {badge}
          </span>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/(pages)/home/(sections)/SkillsSection.tsx"
git commit -m "feat: add SkillsSection with 4-column grid and certs"
```

---

## Task 19: Create ContactSection

**Files:** Create `src/app/(pages)/home/(sections)/ContactSection.tsx`

- [ ] **Step 1: Create `ContactSection.tsx`**

```tsx
'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 12L12 2M12 2H5M12 2V9" />
  </svg>
)

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const inner = sectionRef.current?.querySelector<HTMLElement>('.contact-inner')
      if (inner) {
        gsap.from(inner, {
          scrollTrigger: {
            trigger: inner,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 36,
          duration: 0.85,
          ease: 'power3.out',
        })
      }
    },
    { scope: sectionRef }
  )

  return (
    <section id="contact" ref={sectionRef}>
      <div className="contact-bg-word" aria-hidden="true">
        Hello
      </div>
      <div className="contact-inner">
        <div className="contact-pre">Let&apos;s build something</div>
        <h2 className="contact-h">
          Got an idea?
          <br />
          <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
            Let&apos;s talk.
          </em>
        </h2>
        <div className="contact-links">
          <a href="mailto:pristian.dharmawan@gmail.com" className="contact-link">
            <span>Email</span> pristian.dharmawan@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/pristian-budi-dharmawan/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <span>LinkedIn</span> pristian-budi-dharmawan
          </a>
          <a
            href="https://github.com/iannn07"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <span>GitHub</span> iannn07
          </a>
        </div>
        <a
          href="mailto:pristian.dharmawan@gmail.com"
          className="mag-btn"
        >
          Send a message <ArrowIcon />
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/(pages)/home/(sections)/ContactSection.tsx"
git commit -m "feat: add ContactSection with Hello background word"
```

---

## Task 20: Update `page.tsx`

**Files:** Replace `src/app/(pages)/home/page.tsx`

- [ ] **Step 1: Replace `src/app/(pages)/home/page.tsx`**

```tsx
import NavBar from '@/components/nav/NavBar'
import CustomCursor from '@/components/cursor/CustomCursor'
import Footer from '@/components/footer/Footer'
import HeroSection from './(sections)/HeroSection'
import MarqueeStrip from './(sections)/MarqueeStrip'
import AboutSection from './(sections)/AboutSection'
import FeaturedWorkSection from './(sections)/FeaturedWorkSection'
import ProjectsGridSection from './(sections)/ProjectsGridSection'
import ExperienceSection from './(sections)/ExperienceSection'
import PassionsSection from './(sections)/PassionsSection'
import SkillsSection from './(sections)/SkillsSection'
import ContactSection from './(sections)/ContactSection'

export default function Homepage() {
  return (
    <>
      <CustomCursor />
      <NavBar />
      <main>
        <HeroSection />
        <MarqueeStrip />
        <AboutSection />
        <FeaturedWorkSection />
        <ProjectsGridSection />
        <ExperienceSection />
        <PassionsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Run lint check**

```bash
npm run lint
```

Expected: no errors. Fix any reported issues before continuing.

- [ ] **Step 3: Run build check**

```bash
npm run build
```

Expected: successful build with no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(pages)/home/page.tsx"
git commit -m "feat: wire all v2 sections into homepage"
```

---

## Task 21: Delete old section files and cleanup

**Files:** Delete `HomeSection1.tsx` through `HomeSection8.tsx` and unused files.

- [ ] **Step 1: Delete old section files**

```bash
cd "D:\1. Iannn\2. Work\0. Portfolio"
rm "src/app/(pages)/home/(sections)/HomeSection1.tsx"
rm "src/app/(pages)/home/(sections)/HomeSection2.tsx"
rm "src/app/(pages)/home/(sections)/HomeSection3.tsx"
rm "src/app/(pages)/home/(sections)/HomeSection4.tsx"
rm "src/app/(pages)/home/(sections)/HomeSection5.tsx"
rm "src/app/(pages)/home/(sections)/HomeSection6.tsx"
rm "src/app/(pages)/home/(sections)/HomeSection7.tsx"
rm "src/app/(pages)/home/(sections)/HomeSection8.tsx"
```

- [ ] **Step 2: Remove DefaultLayout and Loader (now unused)**

```bash
rm src/layout/DefaultLayout.tsx
rm src/components/misc/Loader.tsx
rm src/context/LoaderContext.tsx
```

> **Check first:** Grep for any remaining imports of `DefaultLayout`, `Loader`, or `LoaderContext` before deleting. If found, remove those imports too.

```bash
grep -r "DefaultLayout\|LoaderContext\|Loader" src/ --include="*.tsx" --include="*.ts"
```

- [ ] **Step 3: Run final build**

```bash
npm run build
```

Expected: successful build, no errors.

- [ ] **Step 4: Run dev and visual verify**

```bash
npm run dev
```

Open `http://localhost:3000` and verify:
- Custom cursor dot + ring follow mouse
- NavBar compacts after scrolling past the hero
- Hero section: grid lines visible, serif name, Petronas teal accent
- Marquee strip scrolling continuously
- About stats count up on scroll
- Featured Work cards reveal on scroll
- Project grid cards render correctly
- Experience timeline rows reveal on scroll
- F1/MotoGP race fires when Passions section enters viewport, loops
- Skills 4-column grid renders
- Contact section: "Hello" ghost text visible in bottom-right
- Footer renders

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove all v1 section files and unused layout components"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Design tokens (Task 2)
- ✅ Fonts: Playfair Display + DM Sans + DM Mono (Task 5)
- ✅ Noise texture (Task 3, `portfolio-v2.css`)
- ✅ `cursor: none` on body (Task 2, `style.css`)
- ✅ Custom cursor dot + ring with hover expand (Task 6)
- ✅ NavBar fixed, compact on scroll, Lenis scroll (Task 7)
- ✅ Hero: grid lines, serif name, alias, tagline, meta links (Task 11)
- ✅ Marquee: CSS animation, doubled items (Task 12)
- ✅ About: bio, blockquote, stats counters with IntersectionObserver (Task 13)
- ✅ Featured Work: 3 cards (Gunawan Agents, Weeknd, Axolotl) (Task 14)
- ✅ Projects grid: 6 cards (Task 15)
- ✅ Experience: 3 rows, current pill, bullets (Task 16)
- ✅ Passions: F1+MotoGP race with lights sequence, looping (Task 17)
- ✅ Skills: 4 columns + certs (Task 18)
- ✅ Contact: "Hello" bg word, links, magnetic button (Task 19)
- ✅ Footer (Task 8)
- ✅ GSAP + Lenis sync (Task 4)
- ✅ Responsive breakpoints at 900px and 600px (Task 3, CSS)
- ✅ All old sections deleted (Task 21)

**No placeholders found.** All code blocks are complete and executable.

**Type consistency:** `FeaturedProject`, `GridProject`, `SkillColumn` interfaces defined in Task 9 and consumed in Tasks 14, 15, 18. `stats` array defined in Task 9, consumed in Task 13. All method calls match definitions.
