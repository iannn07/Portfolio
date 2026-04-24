'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const EXPERIENCES = [
  {
    period: 'Jun 2025 — Present',
    location: 'Jakarta, ID',
    type: 'Current' as const,
    title: 'Software Engineer',
    org: 'PT Kalbe Farma Tbk',
    orgNote: "IDX: KLBF — Indonesia's largest listed pharma group",
    bullets: [
      'Architected and shipped an internal <strong>AI Chatbot</strong> from scratch as sole IC, serving ~1,000 potential end-users across a single SBU.',
      'Tech-led the <strong>SCM Dashboard</strong> for 3 SBUs — designed system architecture and implemented an ELT pipeline reducing hundreds of thousands of records to thousands of actionable entries.',
      'Delivered <strong>RIS & PACS installations</strong> across ~4 hospitals in Sumatra, Java, and Bali enabling end-to-end digital radiology workflows.',
      'Engineered <strong>150+ internal automation workflows</strong> (Power Automate + Python) eliminating manual processing across divisions.',
    ],
  },
  {
    period: 'Feb 2024 — Jun 2025',
    location: 'Remote',
    type: 'Internship' as const,
    title: 'Software Engineer — Intern',
    org: 'PT Kalbe Farma Tbk',
    orgNote: null,
    bullets: [
      'Owned front-end architecture for 3 major features in Next.js + Supabase; lifted Lighthouse scores from 20–30 to <strong>~70–90</strong> — a 3–4× improvement.',
      'Automated workflows for 2 divisions via Power Automate, reducing cycle time by <strong>10×</strong>.',
      'Introduced <strong>Negative Space Programming</strong> as a team-wide defensive coding standard.',
    ],
  },
  {
    period: 'Jul 2021 — Feb 2024',
    location: 'Malang, ID',
    type: 'University' as const,
    title: 'Data Management Assistant',
    org: 'BINUS University',
    orgNote: '+ Chapter Lead, GDSC BINUS Malang',
    bullets: [
      'Scaled GDSC BINUS Malang from ~20 to <strong>500+ members</strong> (25× growth) as Chapter Lead — led 26-person core team, organised 5 local + 3 international events reaching 1,000+ attendees.',
      'Built CRM dashboards in Excel and Salesforce to drive data-based student acquisition decisions; represented BINUS across <strong>7 cities</strong>.',
    ],
  },
]

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      sectionRef.current
        ?.querySelectorAll<HTMLElement>('.s-head, .exp-row')
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
    <section id="experience" ref={sectionRef} className="v2-section bg-alt">
      <div className="s-head">
        <span className="s-num">04</span>
        <h2 className="s-title">Experience</h2>
        <div className="s-rule" />
      </div>

      <div className="exp-items">
        {EXPERIENCES.map((exp, i) => (
          <div key={i} className="exp-row">
            <div>
              <div className="exp-when">
                {exp.period}
                <br />
                {exp.location}
              </div>
              <div className={`exp-tag-pill${exp.type === 'Current' ? ' live' : ''}`}>
                {exp.type}
              </div>
            </div>
            <div>
              <div className="exp-title">{exp.title}</div>
              <div className="exp-org">
                {exp.org}
                {exp.orgNote && (
                  <>
                    {' · '}
                    <span className="exp-org-note">{exp.orgNote}</span>
                  </>
                )}
              </div>
              <ul className="exp-bullets">
                {exp.bullets.map((bullet, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: bullet }} />
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
