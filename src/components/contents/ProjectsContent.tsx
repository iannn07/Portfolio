import { allProjects } from '@/contents/Projects'
import { Tag, SectionHeader } from './shared'

export default function ProjectsContent() {
  return (
    <div>
      <SectionHeader num="03" title="Projects" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {allProjects.map(p => (
          <div key={p.num} style={{ paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 8 }}>
              <div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
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
                  style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none', flexShrink: 0, marginTop: 4, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
                >
                  ↗ VIEW
                </a>
              )}
              {p.linkType === 'stealth' && (
                <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', flexShrink: 0, marginTop: 4 }}>
                  STEALTH
                </span>
              )}
            </div>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'var(--secondary)', lineHeight: 1.6, margin: '0 0 12px' }}>
              {p.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {p.tags.map(t => <Tag key={t} text={t} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
