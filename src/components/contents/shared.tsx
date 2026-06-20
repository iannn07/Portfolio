// Shared micro-components used by all section content files

export function Tag({ text }: { text: string }) {
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

export function SectionHeader({ num, title }: { num: string; title: string }) {
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
