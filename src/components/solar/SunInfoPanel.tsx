'use client'

const STATS = [
  { value: '2+', label: 'YoE' },
  { value: '3.94', label: 'GPA' },
]

interface Props {
  github?: string
  linkedin?: string
  email?: string
  resume?: string
}

export default function SunInfoPanel({ github, linkedin, email, resume }: Props) {
  const SOCIALS = [
    { label: 'GitHub', href: github || '#' },
    { label: 'LinkedIn', href: linkedin || '#' },
    { label: 'Email', href: email ? `mailto:${email}` : '#' },
    { label: 'Resume', href: resume || '#' },
  ]
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
      <p
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '10px',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: 12,
        }}
      >
        Software Engineer
      </p>
      <h1
        style={{
          fontFamily: 'var(--display)',
          fontWeight: 900,
          fontSize: 'clamp(26px, 3.2vw, 50px)',
          lineHeight: 0.92,
          color: 'var(--primary)',
          marginBottom: 16,
        }}
      >
        PRISTIAN
        <br />
        BUDI
        <br />
        DHARMAWAN
      </h1>
      <p
        style={{
          fontFamily: 'var(--sans)',
          fontSize: '13px',
          color: 'var(--secondary)',
          lineHeight: 1.6,
          marginBottom: 20,
        }}
      >
        &ldquo;An engineer who crafts his spells to conquer the world.&rdquo;
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
          marginBottom: 20,
        }}
      >
        {STATS.map(({ value, label }) => (
          <div
            key={label}
            style={{ border: '1px solid var(--border)', padding: '8px 10px' }}
          >
            <span
              style={{
                fontFamily: 'var(--display)',
                fontWeight: 900,
                fontSize: '22px',
                color: 'var(--primary)',
                display: 'block',
                lineHeight: 1,
              }}
            >
              {value}
            </span>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '9px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                display: 'block',
                marginTop: 4,
              }}
            >
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
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '9px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = 'var(--primary)')
            }
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  )
}
