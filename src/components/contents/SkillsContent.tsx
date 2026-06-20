import { SKILLS } from '@/contents/SolarContent'
import { Tag, SectionHeader } from './shared'

export default function SkillsContent() {
  return (
    <div>
      <SectionHeader num="05" title="Skills" />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          marginBottom: 32,
        }}
      >
        {SKILLS.groups.map(({ label, items }) => (
          <div key={label}>
            <p
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '9px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                margin: '0 0 8px',
              }}
            >
              {label}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {items.map((i) => (
                <Tag key={i} text={i} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div>
        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            margin: '0 0 12px',
          }}
        >
          Achievements
        </p>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          {SKILLS.achievements.map((c) => (
            <li
              key={c}
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '13px',
                color: 'var(--secondary)',
                display: 'flex',
                gap: 8,
              }}
            >
              <span style={{ color: 'var(--muted)', flexShrink: 0 }}>·</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
