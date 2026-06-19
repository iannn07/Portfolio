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
      <h2 style={{ fontFamily: 'var(--display)', fontWeight: 700, lineHeight: 0.92, color: 'var(--primary)', fontSize: 'clamp(30px, 3.8vw, 52px)', margin: 0 }}>
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
            <p style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--muted)', marginBottom: 4, margin: '0 0 4px' }}>
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
            <p style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--muted)', margin: '0 0 4px' }}>
              {entry.period}
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', fontWeight: 500, color: 'var(--primary)', margin: '0 0 12px' }}>
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
                <p style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: '18px', color: 'var(--primary)', margin: 0 }}>
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
            <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'var(--secondary)', lineHeight: 1.6, margin: '0 0 12px' }}>
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
            <p style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--muted)', margin: '0 0 4px' }}>
              {v.status}
            </p>
            <p style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: '20px', color: 'var(--primary)', margin: '0 0 4px' }}>
              {v.callsign}
            </p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--muted)', margin: '0 0 12px' }}>
              {v.role}
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'var(--secondary)', lineHeight: 1.6, margin: '0 0 12px' }}>
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
            <p style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--muted)', margin: '0 0 8px' }}>
              {label}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6 }}>
              {items.map(i => <Tag key={i} text={i} />)}
            </div>
          </div>
        ))}
      </div>
      <div>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--muted)', margin: '0 0 12px' }}>
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
