'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef, useEffect } from 'react'
import { aboutBio, stats } from '@/contents/Descriptions'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const statRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(
    () => {
      sectionRef.current
        ?.querySelectorAll<HTMLElement>('.s-head, .about-copy, .stats-grid')
        .forEach((el, i) => {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 36,
            duration: 0.85,
            ease: 'power3.out',
            delay: (i % 4) * 0.07,
          })
        })
    },
    { scope: sectionRef }
  )

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    statRefs.current.forEach((el, i) => {
      const def = stats[i]
      if (!el || !def) return

      const numEl = el.querySelector<HTMLElement>('.stat-n')
      if (!numEl) return

      let animated = false

      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !animated) {
            animated = true
            const start = performance.now()
            const dur = 1400

            const tick = (now: number) => {
              const p = Math.min((now - start) / dur, 1)
              const ease = 1 - Math.pow(1 - p, 3)
              const val = def.value * ease
              numEl.textContent =
                (def.decimals ? val.toFixed(def.decimals) : Math.round(val)) +
                def.suffix
              if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          }
        },
        { threshold: 0.5 }
      )

      io.observe(el)
      observers.push(io)
    })

    return () => observers.forEach((io) => io.disconnect())
  }, [])

  return (
    <section id="about" ref={sectionRef} className="v2-section bg-default">
      <div className="s-head">
        <span className="s-num">01</span>
        <h2 className="s-title">About</h2>
        <div className="s-rule" />
      </div>

      <div className="about-layout">
        <div className="about-copy">
          <p dangerouslySetInnerHTML={{ __html: aboutBio.paragraphs[0] }} />
          <blockquote className="about-quote">
            &ldquo;{aboutBio.quote}&rdquo;
          </blockquote>
          <p dangerouslySetInnerHTML={{ __html: aboutBio.paragraphs[1] }} />
          <p dangerouslySetInnerHTML={{ __html: aboutBio.paragraphs[2] }} />
        </div>

        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat"
              ref={(el) => {
                statRefs.current[i] = el
              }}
            >
              <div className="stat-n">
                {stat.value}{stat.suffix}
              </div>
              <div className="stat-l">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
