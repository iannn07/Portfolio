'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef, useState } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function PassionsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const carRef = useRef<HTMLDivElement>(null)
  const bikeRef = useRef<HTMLDivElement>(null)
  const blurRef = useRef<HTMLDivElement>(null)
  const flag1Ref = useRef<HTMLDivElement>(null)
  const flag2Ref = useRef<HTMLDivElement>(null)
  const light1Ref = useRef<HTMLDivElement>(null)
  const light2Ref = useRef<HTMLDivElement>(null)
  const light3Ref = useRef<HTMLDivElement>(null)
  const light4Ref = useRef<HTMLDivElement>(null)
  const light5Ref = useRef<HTMLDivElement>(null)
  const mountedRef = useRef(true)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const [raceLabel, setRaceLabel] = useState('RACE START')

  const runRace = (stageWidth: number) => {
    if (!mountedRef.current) return

    const lights = [
      light1Ref.current,
      light2Ref.current,
      light3Ref.current,
      light4Ref.current,
      light5Ref.current,
    ].filter(Boolean) as HTMLElement[]

    lights.forEach((l) => l.classList.remove('on'))
    gsap.set(carRef.current, { x: -220, opacity: 1 })
    gsap.set(bikeRef.current, { x: -180, opacity: 1 })
    gsap.set([flag1Ref.current, flag2Ref.current, blurRef.current], { opacity: 0 })
    setRaceLabel('RACE START')

    const tl = gsap.timeline()
    tlRef.current = tl

    lights.forEach((l, i) => tl.call(() => l.classList.add('on'), [], i * 0.42))

    tl.call(
      () => {
        lights.forEach((l) => l.classList.remove('on'))
        setRaceLabel('LIGHTS OUT')
      },
      [],
      2.4
    )

    tl.to(
      carRef.current,
      {
        x: stageWidth + 240,
        duration: 2.4,
        ease: 'power4.in',
        onStart: () => setRaceLabel('GO GO GO'),
      },
      2.75
    )

    tl.to(blurRef.current, { opacity: 1, duration: 0.2 }, 2.75)
    tl.to(blurRef.current, { opacity: 0, duration: 0.4 }, 3.8)

    tl.to(
      bikeRef.current,
      { x: stageWidth + 200, duration: 2.8, ease: 'power3.in' },
      3.0
    )

    tl.to(flag1Ref.current, { opacity: 1, duration: 0.25 }, 4.9)
    tl.to(flag2Ref.current, { opacity: 1, duration: 0.25 }, 5.2)
    tl.call(() => setRaceLabel('RACE COMPLETE ✓'), [], 5.4)

    tl.call(
      () => {
        if (mountedRef.current) setTimeout(() => runRace(stageWidth), 3000)
      },
      [],
      6.5
    )
  }

  useGSAP(
    () => {
      const headEl = sectionRef.current?.querySelector<HTMLElement>('.s-head')
      if (headEl) {
        gsap.from(headEl, {
          scrollTrigger: {
            trigger: headEl,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 36,
          duration: 0.85,
          ease: 'power3.out',
        })
      }

      ScrollTrigger.create({
        trigger: stageRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          const width = stageRef.current?.offsetWidth ?? 1200
          runRace(width)
        },
      })

      return () => {
        mountedRef.current = false
        tlRef.current?.kill()
      }
    },
    { scope: sectionRef }
  )

  const monoStyle = (extra?: React.CSSProperties): React.CSSProperties => ({
    fontFamily: 'var(--mono)',
    fontSize: '0.55rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: 'var(--fg3)',
    ...extra,
  })

  return (
    <>
      <section
        id="passions"
        ref={sectionRef}
        className="v2-section bg-default"
        style={{ paddingBottom: 0, borderBottom: 'none' }}
      >
        <div className="s-head">
          <span className="s-num">05</span>
          <h2 className="s-title">Off the Clock</h2>
          <div className="s-rule" />
        </div>
        <p className="passions-intro" style={{ marginBottom: '3rem' }}>
          When I&apos;m not shipping code, I&apos;m tracking lap times — obsessed
          with Formula 1, Le Mans endurance, sports cars, and sports bikes.
        </p>
      </section>

      <div
        id="f1-stage"
        ref={stageRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '380px',
          background: 'var(--bg2)',
          borderTop: '1px solid var(--rule)',
          borderBottom: '1px solid var(--rule)',
          overflow: 'hidden',
        }}
      >
        {/* Track lanes */}
        <div style={{ position: 'absolute', top: '30%', left: 0, right: 0, height: '52px', transform: 'translateY(-50%)', background: 'rgba(25,23,18,0.8)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }} />
        <div style={{ position: 'absolute', top: '72%', left: 0, right: 0, height: '44px', transform: 'translateY(-50%)', background: 'rgba(25,23,18,0.8)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }} />

        {/* Track labels */}
        <div style={monoStyle({ position: 'absolute', top: 'calc(30% - 2rem)', left: '3rem' })}>Formula 1</div>
        <div style={monoStyle({ position: 'absolute', top: 'calc(72% - 2rem)', left: '3rem' })}>MotoGP</div>

        {/* Start lights */}
        <div style={{ position: 'absolute', top: '1.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
          <div className="f1-light" ref={light1Ref} />
          <div className="f1-light" ref={light2Ref} />
          <div className="f1-light" ref={light3Ref} />
          <div className="f1-light" ref={light4Ref} />
          <div className="f1-light" ref={light5Ref} />
        </div>

        {/* Race label */}
        <div style={monoStyle({ position: 'absolute', top: '1.6rem', left: '3rem', fontSize: '0.6rem', letterSpacing: '0.2em' })}>
          {raceLabel}
        </div>

        {/* F1 Car */}
        <div ref={carRef} style={{ position: 'absolute', top: '30%', left: 0, transform: 'translateY(-50%) translateX(-220px)', width: '180px' }}>
          <svg viewBox="0 0 260 56" xmlns="http://www.w3.org/2000/svg" fill="none">
            <ellipse cx="120" cy="52" rx="90" ry="4" fill="rgba(0,0,0,0.3)"/>
            <path d="M200 40 L230 40 L232 36 L202 36 Z" fill="#0a0a0a"/>
            <path d="M28 38 Q34 18 58 16 L175 16 Q205 18 218 30 L224 38 Z" fill="var(--accent)"/>
            <path d="M58 16 L175 16 L178 22 L56 22 Z" fill="rgba(200,220,220,0.25)"/>
            <path d="M78 28 L162 28 L166 38 L74 38 Z" fill="rgba(0,0,0,0.3)"/>
            <path d="M108 16 Q118 6 138 6 Q148 6 152 16 Z" fill="#0d1a1a"/>
            <path d="M112 16 Q120 9 136 9 Q144 9 148 16" stroke="var(--accent)" strokeWidth="1.5" fill="none"/>
            <path d="M6 35 L28 38 L30 30 L12 30 Z" fill="var(--accent)"/>
            <path d="M2 36 L8 36 L10 33 L4 33 Z" fill="#888"/>
            <rect x="2" y="37" width="32" height="2" fill="rgba(200,220,220,0.6)"/>
            <rect x="8" y="39" width="20" height="1.5" fill="rgba(200,220,220,0.4)"/>
            <rect x="218" y="15" width="5" height="20" fill="var(--accent)"/>
            <rect x="210" y="14" width="22" height="2.5" fill="rgba(200,220,220,0.7)"/>
            <rect x="213" y="17" width="16" height="1.5" fill="rgba(200,220,220,0.4)"/>
            <circle cx="56" cy="41" r="11" fill="#111"/><circle cx="56" cy="41" r="7" fill="#1e1e1e"/><circle cx="56" cy="41" r="3" fill="#2a2a2a"/>
            <circle cx="182" cy="41" r="11" fill="#111"/><circle cx="182" cy="41" r="7" fill="#1e1e1e"/><circle cx="182" cy="41" r="3" fill="#2a2a2a"/>
            <circle cx="56" cy="41" r="4" fill="rgba(255,120,0,0.15)"/>
            <rect x="100" y="20" width="32" height="14" rx="1" fill="rgba(0,0,0,0.5)"/>
            <text x="116" y="31" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="var(--accent)" textAnchor="middle">W01</text>
          </svg>
        </div>

        {/* MotoGP Bike */}
        <div ref={bikeRef} style={{ position: 'absolute', top: '72%', left: 0, transform: 'translateY(-50%) translateX(-180px)', width: '130px' }}>
          <svg viewBox="0 0 200 70" xmlns="http://www.w3.org/2000/svg" fill="none">
            <ellipse cx="95" cy="66" rx="55" ry="4" fill="rgba(0,0,0,0.3)"/>
            <circle cx="148" cy="52" r="16" fill="#111"/><circle cx="148" cy="52" r="10" fill="#1e1e1e"/><circle cx="148" cy="52" r="4" fill="#2a2a2a"/>
            <circle cx="38" cy="52" r="14" fill="#111"/><circle cx="38" cy="52" r="8" fill="#1e1e1e"/><circle cx="38" cy="52" r="3" fill="#2a2a2a"/>
            <path d="M48 48 L90 30 L130 34 L148 38" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"/>
            <path d="M90 30 L80 50 L110 50 L130 34" fill="var(--accent)" opacity="0.9"/>
            <path d="M44 44 Q50 24 72 18 Q90 14 110 18 L132 34 L125 50 L60 52 Z" fill="var(--accent)"/>
            <path d="M72 18 Q90 14 110 18 L115 24 Q90 20 72 24 Z" fill="rgba(200,220,220,0.3)"/>
            <path d="M72 18 Q68 12 72 8 Q82 4 94 6 Q100 8 96 18 Z" fill="rgba(150,200,220,0.25)" stroke="rgba(200,220,220,0.4)" strokeWidth="0.8"/>
            <ellipse cx="98" cy="20" rx="10" ry="8" fill="#0d1a1a"/>
            <path d="M88 24 Q85 34 88 44 L108 42 Q112 32 104 22 Z" fill="#0d1a1a"/>
            <path d="M130 42 L156 38 L158 42 L132 46 Z" fill="#333"/>
            <rect x="58" y="28" width="28" height="14" rx="1" fill="rgba(0,0,0,0.4)"/>
            <text x="72" y="39" fontFamily="monospace" fontSize="9" fontWeight="bold" fill="var(--accent)" textAnchor="middle">93</text>
          </svg>
        </div>

        {/* Speed blur */}
        <div ref={blurRef} style={{ position: 'absolute', top: '30%', transform: 'translateY(-50%)', left: 0, width: '100%', height: '4px', opacity: 0, pointerEvents: 'none' }}>
          <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right,transparent,var(--accent),transparent)', marginBottom: '6px' }} />
          <div style={{ width: '60%', height: '1px', background: 'linear-gradient(to right,transparent,rgba(200,220,220,0.3),transparent)', marginLeft: '20%' }} />
        </div>

        {/* Checkered flags */}
        <div ref={flag1Ref} style={{ position: 'absolute', top: '30%', right: '3rem', transform: 'translateY(-50%)', opacity: 0, fontSize: '2rem' }}>🏁</div>
        <div ref={flag2Ref} style={{ position: 'absolute', top: '72%', right: '3rem', transform: 'translateY(-50%)', opacity: 0, fontSize: '1.8rem' }}>🏁</div>

        {/* Bottom labels */}
        <div style={{ position: 'absolute', bottom: '1.25rem', left: '3rem', display: 'flex', gap: '2.5rem' }}>
          {['Formula 1', 'MotoGP', 'Le Mans 24H', 'Sports Cars', 'Sports Bikes'].map((label) => (
            <span key={label} style={monoStyle({ fontSize: '0.58rem', letterSpacing: '0.16em' })}>
              {label}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
