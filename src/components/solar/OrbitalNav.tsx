'use client'

const ORBIT_PLANETS = [
  { id: '01', label: 'About',    r: 80,  dur: '18s', delay: '0s' },
  { id: '02', label: 'Work',     r: 115, dur: '25s', delay: '-5s' },
  { id: '03', label: 'Projects', r: 148, dur: '35s', delay: '-10s' },
  { id: '04', label: 'Ventures', r: 178, dur: '46s', delay: '-15s' },
  { id: '05', label: 'Skills',   r: 206, dur: '58s', delay: '-20s' },
]

interface Props {
  onPlanetClick: (id: string) => void
}

export default function OrbitalNav({ onPlanetClick }: Props) {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: 'var(--void)', overflow: 'hidden' }}>
      {/* Center anchor — all orbital elements are positioned relative to this */}
      <div style={{ position: 'absolute', left: '50%', top: '50%' }}>
        {/* Sun */}
        <div style={{
          position: 'absolute',
          width: 28, height: 28,
          borderRadius: '50%',
          background: 'white',
          boxShadow: '0 0 24px 6px rgba(255,255,255,0.2)',
          left: -14, top: -14,
          zIndex: 5,
        }} />

        {/* Name plate below sun */}
        <div style={{ position: 'absolute', top: 22, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', whiteSpace: 'nowrap', zIndex: 5 }}>
          <p style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: '16px', color: 'var(--primary)', margin: 0 }}>
            PRISTIAN
          </p>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', margin: '2px 0 0' }}>
            Full Stack Engineer
          </p>
        </div>

        {/* Static orbit rings */}
        {ORBIT_PLANETS.map(p => (
          <div key={`ring-${p.id}`} style={{
            position: 'absolute',
            width: p.r * 2, height: p.r * 2,
            left: -p.r, top: -p.r,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.07)',
            pointerEvents: 'none',
          }} />
        ))}

        {/* Orbiting planets — zero-size rotating container, planet offset along X */}
        {ORBIT_PLANETS.map(p => (
          <div
            key={`orbit-${p.id}`}
            style={{
              position: 'absolute',
              width: 0, height: 0,
              animation: `sol-orbit ${p.dur} linear infinite`,
              animationDelay: p.delay,
            }}
          >
            <button
              onClick={() => onPlanetClick(p.id)}
              aria-label={p.label}
              style={{
                position: 'absolute',
                left: p.r - 14,
                top: -14,
                width: 28, height: 28,
                borderRadius: '50%',
                background: 'rgba(120,120,120,0.75)',
                border: '1px solid rgba(255,255,255,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <span style={{ fontFamily: 'var(--mono)', fontSize: '8px', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.08em' }}>
                {p.id}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
