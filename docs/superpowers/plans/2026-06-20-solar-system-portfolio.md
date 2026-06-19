# Solar System Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the scroll-driven rocket portfolio with a fully immersive Three.js solar system where each section is a planet orbiting Pristian (the sun), featuring camera-zoom interactions, light/dark themes, and a 2D CSS orbital fallback for mobile.

**Architecture:** Full-page Three.js scene (`SolarScene`) replaces all linear sections. State machine in `page.tsx`: orbital → zooming-in → in-planet → zooming-out. `SolarScene` handles raycasting and GSAP camera animations internally, calling back to `page.tsx` when zoom completes. A `PlanetContent` overlay renders the active section's HTML on top of the canvas. Mobile (< 960px) uses a CSS-only 2D orbital + bottom sheet — no WebGL.

**Tech Stack:** Next.js 15 App Router, React 19, Three.js v0.184.0, GSAP v3.15.0, CSS2DRenderer (bundled in three.js), next-themes v0.4.6 (existing ThemeProvider), Tailwind CSS, TypeScript

## Global Constraints

- Guard rail: No personal data, traits, callsigns, or project data changed
- Guard rail: Title "Full Stack Engineer" preserved
- Guard rail: No new npm packages — all dependencies already installed
- `'use client'` only in leaf components (already the project convention)
- Path alias `@/` → `src/`
- Fonts: Cormorant Garamond weight 900 for display; IBM Plex Sans for body; JetBrains Mono for labels/HUD
- Dark default: `--void: #000000`, `--primary: #FFFFFF` | Light: `--void: #F5F5F0`, `--primary: #000000`
- `Providers.tsx` already uses `attribute="data-theme"` — CSS selectors `[data-theme="light"]` work as-is
- `npm run build` must pass with zero TypeScript errors

---

### Task 1: Foundation — Fonts, CSS Tokens, Layout

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/css/style.css`

**Interfaces:**
- Produces: CSS custom properties `--void`, `--surface`, `--elevated`, `--border`, `--muted`, `--secondary`, `--primary`, `--display`, `--sans`, `--mono` available globally in both themes

- [ ] **Step 1: Rewrite `src/app/layout.tsx`**

Replace fonts (Cormorant Garamond + IBM Plex Sans, keep JetBrains Mono), remove `ReactLenis`, `GSAPProvider`, and `ScrollProgress` — none are needed in the orbital design:

```tsx
import { Providers } from '@/components/providers/Providers'
import '@/css/style.css'
import '@/css/portfolio-v2.css'
import { Metadata } from 'next'
import { Cormorant_Garamond, IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-display',
})

const ibmPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Pristian Budi Dharmawan — Full Stack Engineer',
  description:
    'Full-stack software engineer specialising in scalable web applications, ELT data pipelines, and AI integration.',
  keywords: ['Software Engineer', 'Agentic AI', 'Full Stack Developer', 'React', 'Next.js', 'TypeScript'],
  openGraph: { title: 'Pristian Budi Dharmawan — Full Stack Engineer', type: 'website' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${ibmPlex.variable} ${jetbrainsMono.variable}`}
    >
      <body suppressHydrationWarning style={{ margin: 0 }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Rewrite `src/css/style.css`**

Replace old v4 tokens (`--bg`, `--cyan`, `--violet`, `--ember`, component aliases) with solar design tokens. Preserve shadcn token names but update values. Remove `cursor: none` (no custom cursor in the new design):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* ── Solar Design Tokens (Dark — default) ───────────────────────── */
    --void:     #000000;
    --surface:  #080808;
    --elevated: #0F0F0F;

    /* Font variables (set by next/font in layout.tsx) */
    --display: var(--font-display, 'Cormorant Garamond', Georgia, serif);
    --sans:    var(--font-sans, 'IBM Plex Sans', system-ui, sans-serif);
    --mono:    var(--font-mono, 'JetBrains Mono', monospace);

    /* Shadcn/ui compatibility tokens (solar values) */
    --background:             #000000;
    --foreground:             #FFFFFF;
    --card:                   #080808;
    --card-foreground:        #FFFFFF;
    --popover:                #080808;
    --popover-foreground:     #FFFFFF;
    --primary:                #FFFFFF;
    --primary-foreground:     #000000;
    --secondary:              #888888;
    --secondary-foreground:   #FFFFFF;
    --muted:                  #333333;
    --muted-foreground:       #888888;
    --accent:                 #888888;
    --accent-foreground:      #FFFFFF;
    --destructive:            #ef4444;
    --destructive-foreground: #FFFFFF;
    --border:                 #1A1A1A;
    --input:                  #1A1A1A;
    --ring:                   #888888;
    --radius:                 0.5rem;
  }

  [data-theme="light"] {
    /* ── Light Theme Overrides ──────────────────────────────────────── */
    --void:     #F5F5F0;
    --surface:  #EBEBEB;
    --elevated: #E0E0DC;

    --background:             #F5F5F0;
    --foreground:             #000000;
    --card:                   #EBEBEB;
    --card-foreground:        #000000;
    --popover:                #EBEBEB;
    --popover-foreground:     #000000;
    --primary:                #000000;
    --primary-foreground:     #F5F5F0;
    --secondary:              #666666;
    --secondary-foreground:   #F5F5F0;
    --muted:                  #AAAAAA;
    --muted-foreground:       #666666;
    --accent:                 #666666;
    --accent-foreground:      #F5F5F0;
    --border:                 #D8D8D4;
    --input:                  #D8D8D4;
    --ring:                   #666666;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-family: var(--sans);
    font-weight: 400;
    line-height: 1.6;
    overflow: hidden;
  }
  ::selection {
    background: var(--primary);
    color: var(--background);
  }
}
```

- [ ] **Step 3: Verify**

Run: `npm run dev`
Expected: Dev server starts without errors. Visit `http://localhost:3000` — page loads (even if layout is still old, fonts load correctly, no import errors in console).

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/css/style.css
git commit -m "feat: solar tokens, Cormorant + IBM Plex fonts, remove Lenis/GSAP/ScrollProgress providers"
```

---

### Task 2: Solar Constants + Content Cleanup

**Files:**
- Create: `src/constants/solarSystem.ts`
- Modify: `src/contents/Projects.tsx`

**Interfaces:**
- Produces: `PLANETS: Planet[]`, `PlanetId`, `CAMERA_DEFAULT_Z = 14`, `CAMERA_FOV = 58`, `SUN_SIZE = 0.5`
- `speed` unit: radians/second (2π ÷ period_seconds)

- [ ] **Step 1: Create `src/constants/solarSystem.ts`**

```ts
export type PlanetId = '01' | '02' | '03' | '04' | '05'

export interface Planet {
  id: PlanetId
  section: string
  orbitRadius: number
  size: number
  speed: number        // radians/second  = (2π / period_seconds)
  initialAngle: number // radians
}

export const PLANETS: Planet[] = [
  { id: '01', section: 'About',    orbitRadius: 3.5,  size: 0.22, speed: (2 * Math.PI) / 18, initialAngle: 0 },
  { id: '02', section: 'Work',     orbitRadius: 5.5,  size: 0.30, speed: (2 * Math.PI) / 28, initialAngle: Math.PI / 3 },
  { id: '03', section: 'Projects', orbitRadius: 7.0,  size: 0.25, speed: (2 * Math.PI) / 38, initialAngle: (2 * Math.PI) / 3 },
  { id: '04', section: 'Ventures', orbitRadius: 8.5,  size: 0.27, speed: (2 * Math.PI) / 50, initialAngle: Math.PI },
  { id: '05', section: 'Skills',   orbitRadius: 10.0, size: 0.20, speed: (2 * Math.PI) / 65, initialAngle: (4 * Math.PI) / 3 },
]

export const SUN_SIZE        = 0.5
export const CAMERA_DEFAULT_Z = 14
export const CAMERA_FOV       = 58
```

- [ ] **Step 2: Remove 3 deprecated projects from `src/contents/Projects.tsx`**

Remove TanStack Custom FilterFn (num 07), HL7 Deno Parser (num 08), House ROI Forecasting (num 09). Keep nums as-is — these are display labels, not IDs:

```ts
export interface Project {
  num: string
  label: string
  name: string
  description: string
  tags: string[]
  linkType: 'external' | 'stealth' | 'internal'
  link?: string
}

export const allProjects: Project[] = [
  {
    num: '01',
    label: 'Enterprise · Production · KLBF',
    name: 'SCM Digital Twin',
    description:
      'Digital twin of the FG → Intermediate → MRP manufacturing cascade. SSE-streamed, job-queued Supabase RPC operations. AES-256-GCM encrypted URL state, 19 XLSX streaming download routes. 3 SBUs · hundreds of thousands of records → actionable entries.',
    tags: ['Next.js 15', 'Supabase', 'PostgreSQL', 'Keycloak', 'TypeScript', 'Azure K8s'],
    linkType: 'internal',
  },
  {
    num: '02',
    label: 'Thesis · AI Healthcare · Open Source',
    name: 'Axolotl — Your Caregiver',
    description:
      'Full-stack healthcare platform with a Random Forest Classifier trained on 133 symptoms. 96.45% diagnostic accuracy. E2E test coverage, DB data-flow verification, and clinical workflow integration.',
    tags: ['Next.js', 'FastAPI', 'Python', 'Random Forest', 'Supabase', 'Jest'],
    linkType: 'external',
    link: 'https://github.com/iannn07/Axolotl',
  },
  {
    num: '03',
    label: 'Venture · Clinical Research · TypeScript',
    name: 'Optimus',
    description:
      'Multi-tenant SaaS for pharmaceutical clinical trial management. RBAC hierarchy (T0–T3), PHI Guard on every AI entry point, RAG-powered document intelligence. 49-module regulatory spec · 4-tier RBAC.',
    tags: ['Next.js 16', 'Supabase', 'PostgreSQL', 'Tailwind', 'shadcn/ui', 'Keycloak'],
    linkType: 'stealth',
  },
  {
    num: '04',
    label: 'Stealth Venture · Systems · Rust',
    name: '[CALLSIGN: MERIDIAN]',
    description:
      'Self-hosted outcome-based LLM routing gateway. CARROT, BELLA, and xRouter algorithms from arXiv. OpenAI-compatible API surface, Tower middleware, SurrealDB ledger, Redis L2 cache, HNSW semantic cache. Built solo in Rust.',
    tags: ['Rust', 'Axum', 'Tokio', 'SurrealDB', 'Redis', 'Ratatui'],
    linkType: 'stealth',
  },
  {
    num: '05',
    label: 'Enterprise · Regulatory · KLBF',
    name: 'K-RIM',
    description:
      'Kalbe Regulatory Information Management — pharmaceutical regulatory submission management with Keycloak/LDAP auth, OnlyOffice Document Server integration, Synology NAS + Azure Blob, WAF layer, self-hosted Kubernetes.',
    tags: ['Next.js 16', 'Keycloak', 'OnlyOffice', 'Kubernetes', 'Tailwind'],
    linkType: 'internal',
  },
  {
    num: '06',
    label: 'Stealth Venture · Mobile · Consumer',
    name: '[CALLSIGN: WEEKEND]',
    description:
      "Hyper-local social discovery mobile app — TikTok-style feed surfacing what's happening in your area in real time. Technical Lead over 2 engineers. Google Cloud deployment.",
    tags: ['React Native', 'GCP', 'Real-time', 'Location'],
    linkType: 'stealth',
  },
]
```

- [ ] **Step 3: Commit**

```bash
git add src/constants/solarSystem.ts src/contents/Projects.tsx
git commit -m "feat: solar system constants, remove deprecated projects (TanStack, HL7, House ROI)"
```

---

### Task 3: ThemeToggle + SunInfoPanel

**Files:**
- Create: `src/components/solar/ThemeToggle.tsx`
- Create: `src/components/solar/SunInfoPanel.tsx`

**Interfaces:**
- `<ThemeToggle />` — no props, reads/writes next-themes
- `<SunInfoPanel />` — no props, always-visible hero panel

- [ ] **Step 1: Create `src/components/solar/ThemeToggle.tsx`**

```tsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      style={{
        position: 'absolute',
        top: 24,
        right: 24,
        zIndex: 20,
        fontFamily: 'var(--mono)',
        fontSize: '10px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--muted)',
        background: 'none',
        border: '1px solid var(--border)',
        padding: '6px 12px',
        cursor: 'pointer',
        transition: 'color 0.2s, border-color 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = 'var(--primary)'
        e.currentTarget.style.borderColor = 'var(--primary)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'var(--muted)'
        e.currentTarget.style.borderColor = 'var(--border)'
      }}
    >
      {theme === 'dark' ? 'LIGHT' : 'DARK'}
    </button>
  )
}
```

- [ ] **Step 2: Create `src/components/solar/SunInfoPanel.tsx`**

```tsx
'use client'

const STATS = [
  { value: '2+',   label: 'yrs prod' },
  { value: '150+', label: 'automations' },
  { value: '500×', label: 'community' },
  { value: '3.94', label: 'GPA' },
]

const SOCIALS = [
  { label: 'GitHub',   href: 'https://github.com/iannn07' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/pristian-budi-dharmawan' },
  { label: 'Email',    href: 'mailto:cdtintern.swe@kalbecorp.com' },
]

export default function SunInfoPanel() {
  return (
    <div
      style={{
        position: 'absolute',
        left: 32,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        maxWidth: 280,
        userSelect: 'none',
      }}
    >
      <p style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12 }}>
        PT Kalbe Farma Tbk · Full Stack Engineer
      </p>
      <h1 style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: 'clamp(26px, 3.2vw, 50px)', lineHeight: 0.92, color: 'var(--primary)', marginBottom: 16 }}>
        PRISTIAN<br />BUDI<br />DHARMAWAN
      </h1>
      <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'var(--secondary)', lineHeight: 1.6, marginBottom: 20 }}>
        &ldquo;I build systems that run after I&apos;m gone.&rdquo;
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
        {STATS.map(({ value, label }) => (
          <div key={label} style={{ border: '1px solid var(--border)', padding: '8px 10px' }}>
            <span style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: '22px', color: 'var(--primary)', display: 'block', lineHeight: 1 }}>
              {value}
            </span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginTop: 4 }}>
              {label}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 20 }}>
        {SOCIALS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/solar/ThemeToggle.tsx src/components/solar/SunInfoPanel.tsx
git commit -m "feat: ThemeToggle and SunInfoPanel components"
```

---

### Task 4: SolarScene.tsx

**Files:**
- Create: `src/components/three/SolarScene.tsx`

**Interfaces:**
- Consumes: `PLANETS`, `SUN_SIZE`, `CAMERA_DEFAULT_Z`, `CAMERA_FOV` from `@/constants/solarSystem`
- Produces (forwardRef): `SolarSceneHandle { zoomToPlanet(id: string): void; zoomOut(): void }`
- Calls: `onPlanetEntered(id)` after 1.5s zoom-in completes; `onPlanetExited()` after 1.2s zoom-out completes
- Behavior: target planet pauses its orbit during zoom so camera position stays accurate; other planets continue orbiting

- [ ] **Step 1: Create `src/components/three/SolarScene.tsx`**

```tsx
'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import * as THREE from 'three'
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import gsap from 'gsap'
import { CAMERA_DEFAULT_Z, CAMERA_FOV, PLANETS, SUN_SIZE } from '@/constants/solarSystem'

export interface SolarSceneHandle {
  zoomToPlanet: (id: string) => void
  zoomOut: () => void
}

interface Props {
  onPlanetEntered: (id: string) => void
  onPlanetExited: () => void
}

const SolarScene = forwardRef<SolarSceneHandle, Props>(function SolarScene(
  { onPlanetEntered, onPlanetExited },
  ref
) {
  const mountRef = useRef<HTMLDivElement>(null)

  // Callbacks stored in ref to avoid stale closure in GSAP onComplete
  const cbRef = useRef({ onPlanetEntered, onPlanetExited })
  useEffect(() => { cbRef.current = { onPlanetEntered, onPlanetExited } }, [onPlanetEntered, onPlanetExited])

  // Zoom functions are set inside the useEffect (after scene init) and exposed via this ref
  const zoomRef = useRef<{ to: ((id: string) => void) | null; out: (() => void) | null }>({
    to: null,
    out: null,
  })

  useImperativeHandle(ref, () => ({
    zoomToPlanet: (id) => zoomRef.current.to?.(id),
    zoomOut: () => zoomRef.current.out?.(),
  }))

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ── Scene setup ──────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(CAMERA_FOV, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.z = CAMERA_DEFAULT_Z

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 1)
    mount.appendChild(renderer.domElement)

    const labelRenderer = new CSS2DRenderer()
    labelRenderer.setSize(mount.clientWidth, mount.clientHeight)
    labelRenderer.domElement.style.cssText = 'position:absolute;top:0;left:0;pointer-events:none;'
    mount.appendChild(labelRenderer.domElement)

    // ── Lights ───────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.4))
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0)
    dirLight.position.set(5, 5, 5)
    scene.add(dirLight)

    // ── Stars — 3 depth layers with parallax ─────────────────────────────
    const STAR_CFG = [
      { count: 500, spread: 80, size: 0.008 },
      { count: 500, spread: 60, size: 0.012 },
      { count: 400, spread: 40, size: 0.018 },
    ] as const
    const PARALLAX = [0.02, 0.06, 0.12] as const

    const starGroups = STAR_CFG.map(({ count, spread, size }) => {
      const geo = new THREE.BufferGeometry()
      const pos = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * spread
        pos[i * 3 + 1] = (Math.random() - 0.5) * spread
        pos[i * 3 + 2] = -15 - Math.random() * 20
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      const mat = new THREE.PointsMaterial({ color: 0xffffff, size, sizeAttenuation: true })
      const pts = new THREE.Points(geo, mat)
      scene.add(pts)
      return pts
    })

    // ── Sun + halo ───────────────────────────────────────────────────────
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(SUN_SIZE, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 1 })
    )
    scene.add(sun)
    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(SUN_SIZE * 2.5, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.04, side: THREE.BackSide })
    ))

    // ── Orbit rings ──────────────────────────────────────────────────────
    PLANETS.forEach(p => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(p.orbitRadius, 0.006, 8, 128),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06 })
      )
      ring.rotation.x = Math.PI / 2
      scene.add(ring)
    })

    // ── Planets + CSS2D number labels ────────────────────────────────────
    type PE = { mesh: THREE.Mesh; id: string; angle: number; speed: number; r: number; size: number }
    const planets: PE[] = []
    const meshById = new Map<string, THREE.Mesh>()

    PLANETS.forEach(p => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(p.size, 24, 24),
        new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.1, roughness: 0.85 })
      )
      scene.add(mesh)
      meshById.set(p.id, mesh)

      const el = document.createElement('div')
      el.textContent = p.id
      el.style.cssText = 'font-size:9px;color:rgba(255,255,255,0.55);letter-spacing:.14em;pointer-events:none;user-select:none;'
      const lbl = new CSS2DObject(el)
      lbl.position.set(0, p.size + 0.22, 0)
      mesh.add(lbl)

      planets.push({ mesh, id: p.id, angle: p.initialAngle, speed: p.speed, r: p.orbitRadius, size: p.size })
    })

    // ── Zoom functions ───────────────────────────────────────────────────
    let isZooming = false
    let pausedPlanetId: string | null = null
    const lookTarget = { x: 0, y: 0, z: 0 }

    zoomRef.current.to = (id: string) => {
      if (isZooming) return
      const mesh = meshById.get(id)
      const pDef = PLANETS.find(p => p.id === id)
      if (!mesh || !pDef) return
      isZooming = true
      pausedPlanetId = id

      // Capture position at click time (planet pauses here)
      const mPos = mesh.position.clone()
      const back = new THREE.Vector3(-mPos.x, 0, -mPos.z).normalize()
      const offset = pDef.size * 3 + 1.8

      gsap.to(camera.position, {
        x: mPos.x + back.x * offset,
        y: mPos.y + 0.4,
        z: mPos.z + back.z * offset + 1.5,
        duration: 1.5,
        ease: 'power3.inOut',
        onComplete: () => {
          isZooming = false
          cbRef.current.onPlanetEntered(id)
        },
      })
      gsap.to(lookTarget, {
        x: mPos.x, y: mPos.y, z: mPos.z,
        duration: 1.5,
        ease: 'power3.inOut',
        onUpdate: () => camera.lookAt(lookTarget.x, lookTarget.y, lookTarget.z),
      })
    }

    zoomRef.current.out = () => {
      if (isZooming) return
      isZooming = true
      gsap.to(camera.position, {
        x: 0, y: 0, z: CAMERA_DEFAULT_Z,
        duration: 1.2,
        ease: 'power3.inOut',
        onComplete: () => {
          isZooming = false
          pausedPlanetId = null
          cbRef.current.onPlanetExited()
        },
      })
      gsap.to(lookTarget, {
        x: 0, y: 0, z: 0,
        duration: 1.2,
        ease: 'power3.inOut',
        onUpdate: () => camera.lookAt(lookTarget.x, lookTarget.y, lookTarget.z),
      })
    }

    // ── Raycasting ───────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster()
    const m2d = new THREE.Vector2()
    const meshList = planets.map(p => p.mesh)

    const onClick = (e: MouseEvent) => {
      if (isZooming) return
      const rect = mount.getBoundingClientRect()
      m2d.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      m2d.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(m2d, camera)
      const hits = raycaster.intersectObjects(meshList)
      if (hits.length) {
        const hit = planets.find(p => p.mesh === hits[0].object)
        if (hit) zoomRef.current.to?.(hit.id)
      }
    }

    let tx = 0, ty = 0
    const onMouseMove = (e: MouseEvent) => {
      tx = (e.clientX - window.innerWidth  / 2) / window.innerWidth
      ty = (e.clientY - window.innerHeight / 2) / window.innerHeight
      if (!isZooming) {
        const rect = mount.getBoundingClientRect()
        m2d.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        m2d.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
        raycaster.setFromCamera(m2d, camera)
        mount.style.cursor = raycaster.intersectObjects(meshList).length ? 'pointer' : 'default'
      }
    }

    mount.addEventListener('click', onClick)
    window.addEventListener('mousemove', onMouseMove)

    // ── Animation loop ───────────────────────────────────────────────────
    let mx = 0, my = 0
    let animId = 0, lastT = 0

    const animate = (t: number) => {
      const dt = Math.min((t - lastT) / 1000, 0.05)
      lastT = t

      // Smooth mouse parallax (lerp 0.08 per frame)
      mx += (tx - mx) * 0.08
      my += (ty - my) * 0.08

      // Update planet orbital positions — paused planet stays frozen
      planets.forEach(p => {
        if (p.id !== pausedPlanetId) p.angle += p.speed * dt
        p.mesh.position.x = Math.cos(p.angle) * p.r
        p.mesh.position.z = Math.sin(p.angle) * p.r
      })

      // Star parallax — 3 layers at different depths
      starGroups.forEach((g, i) => {
        g.position.x =  mx * PARALLAX[i] * 8
        g.position.y = -my * PARALLAX[i] * 8
      })

      // Sun idle pulse
      sun.scale.setScalar(1 + Math.sin(t * 0.001) * 0.025)

      renderer.render(scene, camera)
      labelRenderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }
    animId = requestAnimationFrame(animate)

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      labelRenderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      mount.removeEventListener('click', onClick)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      if (mount.contains(labelRenderer.domElement)) mount.removeChild(labelRenderer.domElement)
      zoomRef.current.to = null
      zoomRef.current.out = null
    }
  }, [])

  return <div ref={mountRef} style={{ position: 'fixed', inset: 0, width: '100%', height: '100%' }} />
})

export default SolarScene
```

- [ ] **Step 2: Temporarily wire in page.tsx to verify scene**

Replace `src/app/(pages)/home/page.tsx` with a minimal test harness:

```tsx
'use client'

import dynamic from 'next/dynamic'
import { useRef } from 'react'
import type { SolarSceneHandle } from '@/components/three/SolarScene'

const SolarScene = dynamic(() => import('@/components/three/SolarScene'), { ssr: false })

export default function Homepage() {
  const sceneRef = useRef<SolarSceneHandle>(null)
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
      <SolarScene ref={sceneRef} onPlanetEntered={() => {}} onPlanetExited={() => {}} />
    </div>
  )
}
```

- [ ] **Step 3: Verify scene**

Run: `npm run dev`
Expected:
- Full-screen black canvas, 1400 stars scattered in depth
- Central sun: white sphere with faint halo, pulsing scale ~±2.5%
- 5 orbit rings visible as faint white tori (flat, horizontal)
- 5 planets orbiting at different radii and speeds, each with a number label above
- Move mouse: far stars move slowly (0.02×), mid stars faster (0.06×), near stars fastest (0.12×) — visible parallax layers
- Hover a planet: cursor changes to `pointer`
- Click a planet: camera zooms toward it over 1.5s power3.inOut, planet pauses its orbit, camera centers on it. Console: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/three/SolarScene.tsx src/app/(pages)/home/page.tsx
git commit -m "feat: SolarScene — Three.js stars/sun/orbits/planets, GSAP camera zoom, mouse parallax"
```

---

### Task 5: PlanetContent.tsx

**Files:**
- Create: `src/components/solar/PlanetContent.tsx`

**Interfaces:**
- Props: `section: string` (one of '01'–'05'), `onBack: () => void`, `standalone?: boolean`
- When `standalone=false` (default): renders as absolute right-panel overlay with fade+slide animation
- When `standalone=true`: renders as plain flow content (used inside BottomSheet on mobile)
- ESC key always triggers `onBack`

- [ ] **Step 1: Create `src/components/solar/PlanetContent.tsx`**

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { allProjects } from '@/contents/Projects'

interface Props {
  section: string
  onBack: () => void
  standalone?: boolean
}

function Tag({ text }: { text: string }) {
  return (
    <span style={{
      fontFamily: 'var(--mono)',
      fontSize: '9px',
      letterSpacing: '0.1em',
      textTransform: 'uppercase' as const,
      color: 'var(--muted)',
      border: '1px solid var(--border)',
      padding: '3px 8px',
      display: 'inline-block',
    }}>
      {text}
    </span>
  )
}

function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>
        {num}
      </span>
      <h2 style={{ fontFamily: 'var(--display)', fontWeight: 900, lineHeight: 0.92, color: 'var(--primary)', fontSize: 'clamp(30px, 3.8vw, 52px)', margin: 0 }}>
        {title}
      </h2>
      <div style={{ marginTop: 12, height: 1, background: 'var(--border)' }} />
    </div>
  )
}

// ── 01 About ─────────────────────────────────────────────────────────────────
function AboutContent() {
  return (
    <div>
      <SectionHeader num="01" title="About" />
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 16, marginBottom: 32 }}>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', color: 'var(--secondary)', lineHeight: 1.7, margin: 0 }}>
          I&apos;m a Full Stack Engineer at PT Kalbe Farma Tbk, Indonesia&apos;s largest pharmaceutical company, where I build production-grade systems across enterprise, regulatory, and AI domains. I started as an intern and shipped end-to-end features before the coffee got cold.
        </p>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', color: 'var(--secondary)', lineHeight: 1.7, margin: 0 }}>
          My engineering philosophy: negative space programming — the most powerful line of code is the one you don&apos;t write. I build for the engineer who comes after me, not the sprint demo in front of me.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
        {[
          { label: 'Education', title: 'BINUS University — Computer Science', sub: 'Summa Cum Laude · GPA 3.94' },
          { label: 'Community', title: 'GDSC BINUS Malang — Chapter Lead', sub: 'Grew chapter 20 → 500+ members (25×)' },
          { label: 'Philosophy', title: 'Negative Space Programming · Gunawan Protocol', sub: undefined },
        ].map(({ label, title, sub }) => (
          <div key={label}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--muted)', marginBottom: 4 }}>
              {label}
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', color: 'var(--primary)', margin: 0 }}>{title}</p>
            {sub && <p style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--muted)', margin: '2px 0 0' }}>{sub}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── 02 Work ──────────────────────────────────────────────────────────────────
const WORK = [
  {
    period: 'Jun 2025 — Present',
    role: 'Software Engineer · PT Kalbe Farma Tbk',
    items: [
      'Optimus — CTMS, multi-tenant, AI/RAG (pgvector, Gemini, OpenAI)',
      'SCM Digital Twin — ELT pipeline, FG→Intermediate→MRP, 3 BUs',
      'K-RIM — Regulatory DMS, CSV IQ/OQ/PQ, Keycloak + Supabase',
      'RIS Phase 2 — features + refactor, server-side optimisation',
      'Internal Chatbot — 1,000-user BU, sole engineer, AKS',
      'Calendar of Events — BoD calendar, all Corporate Functions + SBUs',
      '150+ Power Automate flows across 2 divisions',
    ],
  },
  {
    period: 'Feb 2024 — Jun 2025',
    role: 'Software Engineer Intern · PT Kalbe Farma Tbk',
    items: [
      'RIS Phase 1 — Next.js + Supabase, Lighthouse 20–30 → 70–90 (3–4×)',
      'Power Automate automation — 10× cycle time reduction',
      'Introduced Negative Space Programming as team-wide standard',
    ],
  },
]

function WorkContent() {
  return (
    <div>
      <SectionHeader num="02" title="Work" />
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 32 }}>
        {WORK.map(entry => (
          <div key={entry.period}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--muted)', marginBottom: 4 }}>
              {entry.period}
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', fontWeight: 500, color: 'var(--primary)', marginBottom: 12 }}>
              {entry.role}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
              {entry.items.map(item => (
                <li key={item} style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'var(--secondary)', display: 'flex', gap: 8 }}>
                  <span style={{ color: 'var(--muted)', flexShrink: 0 }}>·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── 03 Projects ──────────────────────────────────────────────────────────────
function ProjectsContent() {
  return (
    <div>
      <SectionHeader num="03" title="Projects" />
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 24 }}>
        {allProjects.map(p => (
          <div key={p.num} style={{ paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 8 }}>
              <div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  {p.label}
                </span>
                <p style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: '18px', color: 'var(--primary)', margin: 0 }}>
                  {p.name}
                </p>
              </div>
              {p.linkType === 'external' && p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'var(--muted)', textDecoration: 'none', flexShrink: 0, marginTop: 4, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
                >
                  ↗ VIEW
                </a>
              )}
              {p.linkType === 'stealth' && (
                <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--muted)', flexShrink: 0, marginTop: 4 }}>
                  STEALTH
                </span>
              )}
            </div>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'var(--secondary)', lineHeight: 1.6, marginBottom: 12 }}>
              {p.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6 }}>
              {p.tags.map(t => <Tag key={t} text={t} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── 04 Ventures ──────────────────────────────────────────────────────────────
const VENTURES = [
  {
    callsign: 'GaussRouter / GaussMeridian',
    status: '2026 — Present · Stealth',
    role: 'Researcher + Product Owner',
    description: 'Self-hosted outcome-based LLM routing gateway. CARROT, BELLA, and xRouter algorithms from arXiv. OpenAI-compatible API surface, Tower middleware, SurrealDB ledger, Redis L2 cache, HNSW semantic cache.',
    tags: ['Rust', 'Axum', 'Tokio', 'SurrealDB', 'Redis', 'Ratatui'],
  },
  {
    callsign: '[CALLSIGN: WEEKEND]',
    status: '2026 — Present · Stealth',
    role: 'Technical Lead',
    description: "Hyper-local social discovery mobile app — TikTok-style feed surfacing what's happening in your area in real time. Architecture, frameworks, and infrastructure over a 2-engineer team. Google Cloud deployment.",
    tags: ['React Native', 'GCP', 'Real-time', 'Location'],
  },
]

function VenturesContent() {
  return (
    <div>
      <SectionHeader num="04" title="Ventures" />
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 32 }}>
        {VENTURES.map(v => (
          <div key={v.callsign} style={{ paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--muted)', marginBottom: 4 }}>
              {v.status}
            </p>
            <p style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: '20px', color: 'var(--primary)', marginBottom: 4 }}>
              {v.callsign}
            </p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--muted)', marginBottom: 12 }}>
              {v.role}
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'var(--secondary)', lineHeight: 1.6, marginBottom: 12 }}>
              {v.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6 }}>
              {v.tags.map(t => <Tag key={t} text={t} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── 05 Skills ─────────────────────────────────────────────────────────────────
const SKILL_GROUPS = [
  { label: 'Languages',  items: ['TypeScript', 'Python', 'Rust', 'Go', 'SQL', 'Dart'] },
  { label: 'Frameworks', items: ['Next.js / React', 'Axum / Tokio', 'Node.js / Deno', 'FastAPI', 'Flutter'] },
  { label: 'Cloud',      items: ['AKS', 'OpenShift', 'GCP Cloud Run', 'Docker', 'Kubernetes'] },
  { label: 'Data',       items: ['PostgreSQL', 'Supabase', 'SurrealDB', 'Redis', 'Power Automate'] },
  { label: 'AI / ML',    items: ['Claude', 'Azure OpenAI', 'RAG Architecture', 'pgvector', 'Vector DB'] },
  { label: 'QA',         items: ['CSV (IQ/OQ/PQ)', 'k6', 'Lighthouse', 'Agile / Scrum', 'CI/CD'] },
]

const CERTS = [
  'Summa Cum Laude · GPA 3.94',
  'Automation Developer Python L1',
  'Gemini API Developer',
  'SQL Intermediate',
]

function SkillsContent() {
  return (
    <div>
      <SectionHeader num="05" title="Skills" />
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 20, marginBottom: 32 }}>
        {SKILL_GROUPS.map(({ label, items }) => (
          <div key={label}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--muted)', marginBottom: 8 }}>
              {label}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6 }}>
              {items.map(i => <Tag key={i} text={i} />)}
            </div>
          </div>
        ))}
      </div>
      <div>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--muted)', marginBottom: 12 }}>
          Credentials
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
          {CERTS.map(c => (
            <li key={c} style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'var(--secondary)', display: 'flex', gap: 8 }}>
              <span style={{ color: 'var(--muted)', flexShrink: 0 }}>·</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ── Section registry ──────────────────────────────────────────────────────────
const SECTION_MAP: Record<string, React.ReactNode> = {
  '01': <AboutContent />,
  '02': <WorkContent />,
  '03': <ProjectsContent />,
  '04': <VenturesContent />,
  '05': <SkillsContent />,
}

// ── PlanetContent ─────────────────────────────────────────────────────────────
export default function PlanetContent({ section, onBack, standalone = false }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = panelRef.current
    if (!el || standalone) return
    el.style.opacity = '0'
    el.style.transform = 'translateX(20px)'
    const raf = requestAnimationFrame(() => {
      el.style.transition = 'opacity 400ms ease-out, transform 400ms ease-out'
      el.style.opacity = '1'
      el.style.transform = 'translateX(0)'
    })
    return () => cancelAnimationFrame(raf)
  }, [section, standalone])

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onBack() }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [onBack])

  if (standalone) {
    return (
      <div ref={panelRef}>
        <button
          onClick={onBack}
          style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 24, display: 'block', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
        >
          ← BACK
        </button>
        {SECTION_MAP[section]}
      </div>
    )
  }

  return (
    <div
      ref={panelRef}
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
        height: '100%',
        width: 'min(45%, 520px)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        paddingRight: 40,
        paddingLeft: 24,
      }}
    >
      <button
        onClick={onBack}
        style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 32, textAlign: 'left' as const, transition: 'color 0.2s' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
      >
        ← ESC / BACK
      </button>
      <div style={{ overflowY: 'auto', maxHeight: '80vh' }}>
        {SECTION_MAP[section]}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/solar/PlanetContent.tsx
git commit -m "feat: PlanetContent — 5 section overlays (About/Work/Projects/Ventures/Skills)"
```

---

### Task 6: page.tsx Desktop Wiring

**Files:**
- Modify: `src/app/(pages)/home/page.tsx`

**Interfaces:**
- State: `activeSection: string | null`
- Wires: `SolarScene` + `SunInfoPanel` + `PlanetContent` + `ThemeToggle`

- [ ] **Step 1: Rewrite `src/app/(pages)/home/page.tsx` for desktop**

```tsx
'use client'

import { useCallback, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import SunInfoPanel from '@/components/solar/SunInfoPanel'
import PlanetContent from '@/components/solar/PlanetContent'
import ThemeToggle from '@/components/solar/ThemeToggle'
import type { SolarSceneHandle } from '@/components/three/SolarScene'

const SolarScene = dynamic(() => import('@/components/three/SolarScene'), { ssr: false })

export default function Homepage() {
  const sceneRef = useRef<SolarSceneHandle>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const handlePlanetEntered = useCallback((id: string) => setActiveSection(id), [])
  const handlePlanetExited  = useCallback(() => setActiveSection(null), [])
  const handleBack          = useCallback(() => sceneRef.current?.zoomOut(), [])

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: 'var(--void)' }}>
      <SolarScene
        ref={sceneRef}
        onPlanetEntered={handlePlanetEntered}
        onPlanetExited={handlePlanetExited}
      />
      <SunInfoPanel />
      {activeSection && (
        <PlanetContent section={activeSection} onBack={handleBack} />
      )}
      <ThemeToggle />
    </div>
  )
}
```

- [ ] **Step 2: Verify full desktop flow**

Run: `npm run dev`

Check each of the following:
1. Black screen, 5 planets orbiting, SunInfoPanel visible left (name/tagline/stats/socials), ThemeToggle top-right
2. Click planet 01 → camera zooms in 1.5s → "About" content slides in from right → bio, education, community visible
3. Press ESC → camera zooms back out 1.2s → content disappears
4. Click planet 02 → "Work" content: 2 experience blocks with bullet items
5. Click planet 03 → "Projects" content: 6 projects (SCM Digital Twin through WEEKEND)
6. Click planet 04 → "Ventures" content: GaussRouter + WEEKEND entries
7. Click planet 05 → "Skills" content: 6 skill groups + credentials
8. Click "← ESC / BACK" button → returns to orbital (same as ESC)
9. Toggle theme → entire scene switches. In light mode: off-white background, black text, all readable.

- [ ] **Step 3: Commit**

```bash
git add src/app/(pages)/home/page.tsx
git commit -m "feat: page.tsx — orbital state machine, wire SolarScene + SunInfoPanel + PlanetContent"
```

---

### Task 7: Mobile OrbitalNav + BottomSheet

**Files:**
- Modify: `src/css/portfolio-v2.css` (add orbit keyframes)
- Create: `src/components/solar/OrbitalNav.tsx`
- Create: `src/components/solar/BottomSheet.tsx`
- Modify: `src/app/(pages)/home/page.tsx` (add mobile breakpoint)

**Interfaces:**
- `OrbitalNav` props: `onPlanetClick: (id: string) => void`
- `BottomSheet` props: `section: string | null`, `onClose: () => void`
- Breakpoint: `(max-width: 959px)` → mobile path

- [ ] **Step 1: Add orbit keyframes to `src/css/portfolio-v2.css`**

Read the current file first, then prepend these keyframes:

```css
/* ── Solar System — Mobile Orbital ─────────────────────────────────── */
@keyframes sol-orbit {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
```

- [ ] **Step 2: Create `src/components/solar/OrbitalNav.tsx`**

The orbit container for each planet is a zero-size div at center. Rotating it sweeps the planet (offset by `r` pixels along the X axis) in a circle. The planet dot doesn't counter-rotate — it's a small numbered circle and rotating text is acceptable on mobile.

```tsx
'use client'

const ORBIT_PLANETS = [
  { id: '01', label: 'About',    r: 80,  dur: '18s', delay: '0s' },
  { id: '02', label: 'Work',     r: 115, dur: '25s', delay: '-5s' },
  { id: '03', label: 'Projects', r: 148, dur: '35s', delay: '-10s' },
  { id: '04', label: 'Ventures', r: 178, dur: '46s', delay: '-15s' },
  { id: '05', label: 'Skills',   r: 206, dur: '58s', delay: '-20s' },
]

interface Props {
  onPlanetClick: (id: string) => void
}

export default function OrbitalNav({ onPlanetClick }: Props) {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: 'var(--void)', overflow: 'hidden' }}>
      {/* Center anchor — all orbital elements are positioned relative to this */}
      <div style={{ position: 'absolute', left: '50%', top: '50%' }}>
        {/* Sun */}
        <div style={{
          position: 'absolute',
          width: 28, height: 28,
          borderRadius: '50%',
          background: 'white',
          boxShadow: '0 0 24px 6px rgba(255,255,255,0.2)',
          left: -14, top: -14,
          zIndex: 5,
        }} />

        {/* Name plate below sun */}
        <div style={{ position: 'absolute', top: 22, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', whiteSpace: 'nowrap', zIndex: 5 }}>
          <p style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: '16px', color: 'var(--primary)', margin: 0 }}>
            PRISTIAN
          </p>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', margin: '2px 0 0' }}>
            Full Stack Engineer
          </p>
        </div>

        {/* Static orbit rings */}
        {ORBIT_PLANETS.map(p => (
          <div key={`ring-${p.id}`} style={{
            position: 'absolute',
            width: p.r * 2, height: p.r * 2,
            left: -p.r, top: -p.r,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.07)',
            pointerEvents: 'none',
          }} />
        ))}

        {/* Orbiting planets — zero-size rotating container, planet offset along X */}
        {ORBIT_PLANETS.map(p => (
          <div
            key={`orbit-${p.id}`}
            style={{
              position: 'absolute',
              width: 0, height: 0,
              animation: `sol-orbit ${p.dur} linear infinite`,
              animationDelay: p.delay,
            }}
          >
            <button
              onClick={() => onPlanetClick(p.id)}
              aria-label={p.label}
              style={{
                position: 'absolute',
                left: p.r - 14,
                top: -14,
                width: 28, height: 28,
                borderRadius: '50%',
                background: 'rgba(120,120,120,0.75)',
                border: '1px solid rgba(255,255,255,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <span style={{ fontFamily: 'var(--mono)', fontSize: '8px', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.08em' }}>
                {p.id}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create `src/components/solar/BottomSheet.tsx`**

Sheet is always mounted; visibility controlled via transform. Uses `PlanetContent` in `standalone` mode so it renders inline (no absolute panel positioning).

```tsx
'use client'

import { useEffect, useRef } from 'react'
import PlanetContent from './PlanetContent'

interface Props {
  section: string | null
  onClose: () => void
}

export default function BottomSheet({ section, onClose }: Props) {
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sheetRef.current
    if (!el) return
    if (section) {
      el.style.transition = 'transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1)'
      el.style.transform = 'translateY(0)'
    } else {
      el.style.transition = 'transform 280ms ease-in'
      el.style.transform = 'translateY(100%)'
    }
  }, [section])

  // Touch drag-to-dismiss
  useEffect(() => {
    const el = sheetRef.current
    if (!el) return
    let startY = 0, delta = 0
    const onStart  = (e: TouchEvent) => { startY = e.touches[0].clientY }
    const onMove   = (e: TouchEvent) => {
      delta = e.touches[0].clientY - startY
      if (delta > 0) { el.style.transition = 'none'; el.style.transform = `translateY(${delta}px)` }
    }
    const onEnd    = () => {
      if (delta > 120) onClose()
      else { el.style.transition = 'transform 250ms ease-out'; el.style.transform = 'translateY(0)' }
      delta = 0
    }
    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchmove',  onMove,  { passive: true })
    el.addEventListener('touchend',   onEnd)
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove',  onMove)
      el.removeEventListener('touchend',   onEnd)
    }
  }, [onClose])

  return (
    <>
      {section && (
        <div
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }}
        />
      )}
      <div
        ref={sheetRef}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '82vh',
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderRadius: '16px 16px 0 0',
          zIndex: 50,
          transform: 'translateY(100%)',
          overflowY: 'auto',
          padding: '0 20px 48px',
        }}
      >
        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 8px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--border)' }} />
        </div>
        {section && (
          <PlanetContent section={section} onBack={onClose} standalone />
        )}
      </div>
    </>
  )
}
```

- [ ] **Step 4: Update `src/app/(pages)/home/page.tsx` to add mobile branch**

```tsx
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import SunInfoPanel from '@/components/solar/SunInfoPanel'
import PlanetContent from '@/components/solar/PlanetContent'
import ThemeToggle from '@/components/solar/ThemeToggle'
import OrbitalNav from '@/components/solar/OrbitalNav'
import BottomSheet from '@/components/solar/BottomSheet'
import type { SolarSceneHandle } from '@/components/three/SolarScene'

const SolarScene = dynamic(() => import('@/components/three/SolarScene'), { ssr: false })

export default function Homepage() {
  const sceneRef = useRef<SolarSceneHandle>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 959px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const handlePlanetEntered = useCallback((id: string) => setActiveSection(id), [])
  const handlePlanetExited  = useCallback(() => setActiveSection(null), [])
  const handleBack          = useCallback(() => {
    if (isMobile) setActiveSection(null)
    else sceneRef.current?.zoomOut()
  }, [isMobile])

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: 'var(--void)' }}>
      {isMobile ? (
        <>
          <OrbitalNav onPlanetClick={id => setActiveSection(id)} />
          <BottomSheet section={activeSection} onClose={() => setActiveSection(null)} />
        </>
      ) : (
        <>
          <SolarScene
            ref={sceneRef}
            onPlanetEntered={handlePlanetEntered}
            onPlanetExited={handlePlanetExited}
          />
          <SunInfoPanel />
          {activeSection && (
            <PlanetContent section={activeSection} onBack={handleBack} />
          )}
        </>
      )}
      <ThemeToggle />
    </div>
  )
}
```

- [ ] **Step 5: Verify mobile in DevTools**

In Chrome DevTools, set viewport to 375px width (iPhone):
1. 2D orbital rings visible, 5 planet dots orbiting at different speeds
2. Sun in center with name below
3. Tap any planet → bottom sheet slides up from bottom with content
4. Drag sheet down > 120px → sheet closes
5. Tap backdrop → sheet closes
6. Sheet content is scrollable when content overflows
7. Theme toggle still visible in top-right, functional

- [ ] **Step 6: Commit**

```bash
git add src/css/portfolio-v2.css src/components/solar/OrbitalNav.tsx src/components/solar/BottomSheet.tsx src/app/(pages)/home/page.tsx
git commit -m "feat: mobile OrbitalNav (CSS orbital) + BottomSheet with drag-to-dismiss"
```

---

### Task 8: File Cleanup + Build Verification

**Files:**
- Delete: `src/app/(pages)/home/(sections)/HeroSection.tsx`
- Delete: `src/app/(pages)/home/(sections)/MarqueeStrip.tsx`
- Delete: `src/app/(pages)/home/(sections)/AboutSection.tsx`
- Delete: `src/app/(pages)/home/(sections)/ProjectsGridSection.tsx`
- Delete: `src/app/(pages)/home/(sections)/ExperienceSection.tsx`
- Delete: `src/app/(pages)/home/(sections)/VenturesSection.tsx`
- Delete: `src/app/(pages)/home/(sections)/SkillsSection.tsx`
- Delete: `src/app/(pages)/home/(sections)/ContactSection.tsx`
- Delete: `src/components/three/HeroScene.tsx`

**Note:** Do NOT delete `src/components/lenis/`, `src/components/gsap/`, or `src/components/scroll/` — those directories contain implementation files that may be referenced elsewhere. They'll become dead code but deleting them risks breaking imports from other files not in scope.

- [ ] **Step 1: Delete old section files**

```bash
rm "src/app/(pages)/home/(sections)/HeroSection.tsx"
rm "src/app/(pages)/home/(sections)/MarqueeStrip.tsx"
rm "src/app/(pages)/home/(sections)/AboutSection.tsx"
rm "src/app/(pages)/home/(sections)/ProjectsGridSection.tsx"
rm "src/app/(pages)/home/(sections)/ExperienceSection.tsx"
rm "src/app/(pages)/home/(sections)/VenturesSection.tsx"
rm "src/app/(pages)/home/(sections)/SkillsSection.tsx"
rm "src/app/(pages)/home/(sections)/ContactSection.tsx"
rm "src/components/three/HeroScene.tsx"
```

- [ ] **Step 2: Run TypeScript build**

```bash
npm run build
```

Expected: Build completes with 0 TypeScript errors. If any `Module not found` or `Cannot find module` errors appear for the deleted files, check for stale imports in files outside of page.tsx (e.g., NavBar, Footer, any remaining components) and remove them.

If build fails with an error like `'NavBar' is not exported from`, check whether NavBar or Footer import from any deleted sections and update those imports.

- [ ] **Step 3: Final acceptance checklist**

Run `npm run dev` and verify all 7 acceptance criteria from the spec:

| # | Check | Pass |
|---|---|---|
| 1 | Orbital view loads: planets orbit, stars parallax on mouse | |
| 2 | All 5 planets clickable → camera zooms → content → ESC returns | |
| 3 | Light mode toggle → off-white bg, black text, high contrast, readable | |
| 4 | Mobile (< 960px) → CSS orbital, tap planet → bottom sheet | |
| 5 | All 5 sections have complete content (no placeholder text) | |
| 6 | Projects section shows exactly 6 projects (not 9) | |
| 7 | `npm run build` passes with zero errors | |

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: delete old sections + HeroScene, complete solar system portfolio redesign"
```
