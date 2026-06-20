import { ABOUT } from '@/contents/SolarContent'
import { SectionHeader } from './shared'

export default function AboutContent() {
  return (
    <div>
      <SectionHeader num="01" title="About" />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          marginBottom: 32,
        }}
      >
        {ABOUT.bio.map((para, i) => (
          <p
            key={i}
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '14px',
              color: 'var(--secondary)',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {para}
          </p>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {ABOUT.highlights?.map(({ label, title, sub }) => (
          <div key={label}>
            <p
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                margin: '0 0 4px',
              }}
            >
              {label}
            </p>
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '14px',
                color: 'var(--primary)',
                margin: 0,
              }}
            >
              {title}
            </p>
            {sub && (
              <p
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '10px',
                  color: 'var(--muted)',
                  margin: '2px 0 0',
                }}
              >
                {sub}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
