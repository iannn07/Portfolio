'use client'

import { useEffect, useRef } from 'react'
import AboutContent    from '@/components/contents/AboutContent'
import WorkContent     from '@/components/contents/WorkContent'
import ProjectsContent from '@/components/contents/ProjectsContent'
import VenturesContent from '@/components/contents/VenturesContent'
import SkillsContent   from '@/components/contents/SkillsContent'

interface Props {
  section: string
  onBack: () => void
  standalone?: boolean
}

const SECTION_MAP: Record<string, React.ReactNode> = {
  '01': <AboutContent />,
  '02': <WorkContent />,
  '03': <ProjectsContent />,
  '04': <VenturesContent />,
  '05': <SkillsContent />,
}

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
          style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 24, display: 'block', transition: 'color 0.2s' }}
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
        flexDirection: 'column',
        justifyContent: 'center',
        paddingRight: 40,
        paddingLeft: 32,
        background: 'var(--panel-bg)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderLeft: '1px solid var(--border)',
      }}
    >
      <button
        onClick={onBack}
        style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 32, textAlign: 'left', transition: 'color 0.2s' }}
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
