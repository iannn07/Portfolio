import { VENTURES } from '@/contents/SolarContent'
import { Tag, SectionHeader } from './shared'

export default function VenturesContent() {
  return (
    <div>
      <SectionHeader num="04" title="Ventures" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {VENTURES.map(v => (
          <div key={v.callsign} style={{ paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', margin: '0 0 4px' }}>
              {v.status}
            </p>
            <p style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: '20px', color: 'var(--primary)', margin: '0 0 4px' }}>
              {v.callsign}
            </p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', margin: '0 0 12px' }}>
              {v.role}
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'var(--secondary)', lineHeight: 1.6, margin: '0 0 12px' }}>
              {v.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {v.tags.map(t => <Tag key={t} text={t} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
