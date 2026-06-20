import { WORK } from '@/contents/SolarContent'
import { SectionHeader } from './shared'

export default function WorkContent() {
  return (
    <div>
      <SectionHeader num="02" title="Work" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {WORK.map(entry => (
          <div key={entry.period}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', margin: '0 0 4px' }}>
              {entry.period}
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', fontWeight: 500, color: 'var(--primary)', margin: '0 0 12px' }}>
              {entry.role}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
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
