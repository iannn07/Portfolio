# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## What This Is

A personal portfolio website for Pristian Budi Dharmawan, built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, and Framer Motion. No backend, no database, no authentication — fully client-rendered static site deployed on Google Cloud Run.

---

## Gunawan Framework

This project uses the Gunawan agentic development framework. Before any substantive work, load foundation context in this order:

1. This file
2. `.gunawan/foundation/human-intent-os/`
3. `.gunawan/foundation/agent-foundation-os/`
4. `.gunawan/foundation/role-definition-os/[active-role]/`

**Current level: 0 (Born)** — update this line explicitly when promoting an agent.

Run the newborn gate (`.claude/skills/newborn-gate/SKILL.md`) before every workflow.

---

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # Run ESLint
```

No test suite is configured.

---

## Architecture

### Routing

`src/app/page.tsx` redirects to `/home`. The main page is `src/app/(pages)/home/page.tsx` — a client component that composes 8 animated sections in order.

### Sections

Each section (`HomeSection1.tsx` through `HomeSection8.tsx`) lives in `src/app/(pages)/home/(sections)/`. Sections use Framer Motion's `useScroll()` + `useTransform()` for scroll-driven parallax and opacity effects. Lenis provides smooth scrolling throughout.

### Content vs. Components

All portfolio data (experiences, projects, tech stack, philosophies, bio) is defined as typed objects/arrays in `src/contents/`. These export data and interface types, not React components. Components in `src/components/` consume this data.

### Smooth Scroll

Lenis is initialized in `src/app/layout.tsx` via the provider at `src/components/lenis/`. It must wrap the entire app for scroll animations to work.

### Page Load

`src/layout/DefaultLayout.tsx` wraps page content with a fade-in animation and the `Loader` component. Load state is managed via `src/context/LoaderContext.tsx`.

### Styling

- Global CSS variables and design tokens: `src/css/style.css`
- Dark theme: background `#232323`, accent `#ecebf3`
- Custom Tailwind tokens (colors, `heading-1` through `heading-6`, `body-sm`, `body-xs`): `tailwind.config.ts`
- `src/lib/utils.ts` exports `cn()` for merging Tailwind classes (clsx + tailwind-merge)

### UI Components

`src/components/ui/` contains shadcn/ui components (New York style, Tabler icons). Add new components via `npx shadcn@latest add <component>` — do not hand-write them.

### Navigation

Section jump targets are defined in `src/constants/jumpSections.ts`. The sidebar (`src/components/app-sidebar.tsx`) reads from this constant.

---

## Key Constraints

- `'use client'` is pushed to leaf components only
- Mobile breakpoint logic: `src/hooks/use-mobile.tsx`
- Path alias `@/` maps to `src/`
- Branching: direct commits to `main` (solo project)

---

## Protected Files

Never modify without explicit human approval:

- `CLAUDE.md` (this file)
- `.gunawan/**`
- `.env*`
- `.claude/settings.json`
