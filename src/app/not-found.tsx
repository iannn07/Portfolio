import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        fontFamily: 'var(--mono)',
      }}
    >
      <div style={{ fontSize: 'clamp(6rem, 20vw, 14rem)', fontFamily: 'var(--serif)', fontWeight: 900, color: 'var(--fg3)', lineHeight: 1 }}>
        404
      </div>
      <div style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--fg3)', marginTop: '1rem' }}>
        Page Not Found
      </div>
      <Link
        href="/"
        style={{
          marginTop: '2rem',
          fontFamily: 'var(--mono)',
          fontSize: '0.72rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          borderBottom: '1px solid var(--accent)',
          paddingBottom: '2px',
          textDecoration: 'none',
        }}
      >
        ← Back home
      </Link>
    </div>
  )
}
