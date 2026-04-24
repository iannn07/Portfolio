'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { skillColumns, certBadges } from '@/contents/Stacks'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      sectionRef.current
        ?.querySelectorAll<HTMLElement>('.s-head, .skill-col')
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

  return (
    <section id="skills" ref={sectionRef} className="v2-section bg-alt">
      <div className="s-head">
        <span className="s-num">06</span>
        <h2 className="s-title">Skills</h2>
        <div className="s-rule" />
      </div>

      <div className="skills-layout">
        {skillColumns.map((col) => (
          <div key={col.category} className="skill-col">
            <h3>{col.category}</h3>
            <ul>
              {col.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="certs-row">
        {certBadges.map((badge) => (
          <span key={badge} className="cert-badge">
            {badge}
          </span>
        ))}
      </div>
    </section>
  )
}
