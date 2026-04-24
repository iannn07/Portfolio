'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 12L12 2M12 2H5M12 2V9" />
  </svg>
)

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const inner = sectionRef.current?.querySelector<HTMLElement>('.contact-inner')
      if (inner) {
        gsap.from(inner, {
          scrollTrigger: {
            trigger: inner,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 36,
          duration: 0.85,
          ease: 'power3.out',
        })
      }
    },
    { scope: sectionRef }
  )

  return (
    <section id="contact" ref={sectionRef}>
      <div className="contact-bg-word" aria-hidden="true">
        Hello
      </div>
      <div className="contact-inner">
        <div className="contact-pre">Let&apos;s build something</div>
        <h2 className="contact-h">
          Got an idea?
          <br />
          <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
            Let&apos;s talk.
          </em>
        </h2>
        <div className="contact-links">
          <a href="mailto:pristian.dharmawan@gmail.com" className="contact-link">
            <span>Email</span> pristian.dharmawan@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/pristian-budi-dharmawan/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <span>LinkedIn</span> pristian-budi-dharmawan
          </a>
          <a
            href="https://github.com/iannn07"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <span>GitHub</span> iannn07
          </a>
        </div>
        <a href="mailto:pristian.dharmawan@gmail.com" className="mag-btn">
          Send a message <ArrowIcon />
        </a>
      </div>
    </section>
  )
}
