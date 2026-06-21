'use client'

const ORBIT_PLANETS = [
  {
    id: '01', label: 'About', planet: 'Earth',
    r: 80, dur: '18s', delay: '0s',
    size: 26,
    bg: 'radial-gradient(circle at 38% 35%, #7EC8F0 0%, #2E6CB5 42%, #1A4080 100%)',
    glow: 'rgba(46, 108, 181, 0.6)',
    ring: false,
  },
  {
    id: '02', label: 'Work', planet: 'Mars',
    r: 115, dur: '25s', delay: '-5s',
    size: 19,
    bg: 'radial-gradient(circle at 38% 30%, #E87045 0%, #B5411A 52%, #6A2408 100%)',
    glow: 'rgba(181, 65, 26, 0.6)',
    ring: false,
  },
  {
    id: '03', label: 'Ventures', planet: 'Jupiter',
    r: 148, dur: '35s', delay: '-10s',
    size: 38,
    bg: 'linear-gradient(180deg, #C47035 0%, #EAB870 10%, #C47035 20%, #D49060 32%, #B86030 44%, #EECC88 54%, #C47035 64%, #D49060 74%, #B86030 84%, #EAB870 92%, #C47035 100%)',
    glow: 'rgba(200, 149, 108, 0.55)',
    ring: false,
  },
  {
    id: '04', label: 'Skills', planet: 'Saturn',
    r: 178, dur: '46s', delay: '-15s',
    size: 30,
    bg: 'radial-gradient(circle at 38% 30%, #F5EAC8 0%, #E8D09A 45%, #C09050 100%)',
    glow: 'rgba(220, 185, 120, 0.6)',
    ring: true,
  },
]

interface Props {
  onPlanetClick: (id: string) => void
}

export default function OrbitalNav({ onPlanetClick }: Props) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: 'var(--void)',
        overflow: 'hidden',
      }}
    >
      {/* Center anchor — all orbital elements are positioned relative to this */}
      <div style={{ position: 'absolute', left: '50%', top: '50%' }}>
        {/* Sun */}
        <div
          style={{
            position: 'absolute',
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 35%, #FFF8E0 0%, #FFE066 40%, #FFC200 100%)',
            boxShadow: '0 0 28px 8px rgba(255,210,60,0.35), 0 0 60px 20px rgba(255,160,20,0.12)',
            left: -14,
            top: -14,
            zIndex: 5,
          }}
        />

        {/* Name plate below sun */}
        <div
          style={{
            position: 'absolute',
            top: 22,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            zIndex: 5,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--display)',
              fontWeight: 700,
              fontSize: '16px',
              color: 'var(--primary)',
              margin: 0,
            }}
          >
            PRISTIAN
          </p>
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '8px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              margin: '2px 0 0',
            }}
          >
            Software Engineer
          </p>
        </div>

        {/* Static orbit rings */}
        {ORBIT_PLANETS.map((p) => (
          <div
            key={`ring-${p.id}`}
            style={{
              position: 'absolute',
              width: p.r * 2,
              height: p.r * 2,
              left: -p.r,
              top: -p.r,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.07)',
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Orbiting planets */}
        {ORBIT_PLANETS.map((p) => (
          <div
            key={`orbit-${p.id}`}
            style={{
              position: 'absolute',
              width: 0,
              height: 0,
              animation: `sol-orbit ${p.dur} linear infinite`,
              animationDelay: p.delay,
            }}
          >
            {/* Saturn rings — back half behind planet, front half in front, creating 3D wrap illusion */}
            {p.ring && (() => {
              // SVG viewBox: 76×36, centered at planet. Each ellipse = one ring band.
              const ringLeft = p.r - 38
              const ringTop = -18
              const ringBands = (
                <svg width="76" height="36" viewBox="-38 -18 76 36" xmlns="http://www.w3.org/2000/svg">
                  {/* C ring — faint inner band */}
                  <ellipse cx="0" cy="0" rx="21" ry="8.5"  fill="none" stroke="rgba(192,168,96,0.38)"  strokeWidth="3.5" />
                  {/* B ring — brightest, widest */}
                  <ellipse cx="0" cy="0" rx="26" ry="10.5" fill="none" stroke="rgba(240,224,160,0.9)"  strokeWidth="7.5" />
                  {/* Cassini Division — dark gap */}
                  <ellipse cx="0" cy="0" rx="29.5" ry="12" fill="none" stroke="rgba(4,2,1,0.92)"       strokeWidth="2"   />
                  {/* A ring — second band */}
                  <ellipse cx="0" cy="0" rx="34" ry="13.8" fill="none" stroke="rgba(216,192,128,0.72)" strokeWidth="6"   />
                </svg>
              )
              return (
                <>
                  {/* Back half — bottom arcs pass behind planet, rotated for diagonal */}
                  <div style={{ position: 'absolute', left: ringLeft, top: ringTop, width: 76, height: 36, clipPath: 'inset(50% 0 0 0)', pointerEvents: 'none', zIndex: 1, transform: 'rotate(-25deg)' }}>
                    {ringBands}
                  </div>
                  {/* Front half — top arcs pass in front of planet, same diagonal rotation */}
                  <div style={{ position: 'absolute', left: ringLeft, top: ringTop, width: 76, height: 36, clipPath: 'inset(0 0 50% 0)', pointerEvents: 'none', zIndex: 3, transform: 'rotate(-25deg)' }}>
                    {ringBands}
                  </div>
                </>
              )
            })()}

            <button
              onClick={() => onPlanetClick(p.id)}
              aria-label={`${p.planet} — ${p.label}`}
              title={`${p.planet} · ${p.label}`}
              style={{
                position: 'absolute',
                left: p.r - p.size / 2,
                top: -p.size / 2,
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                background: p.bg,
                boxShadow: `0 0 12px 3px ${p.glow}`,
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                zIndex: 2,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
