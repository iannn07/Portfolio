'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { featuredProjects } from '@/contents/Projects'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const ArrowIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M1 11L11 1M11 1H4M11 1V8" />
  </svg>
)

export default function FeaturedWorkSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      sectionRef.current
        ?.querySelectorAll<HTMLElement>('.s-head, .feat-card')
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
    <section id="featured" ref={sectionRef} className="v2-section bg-alt">
      <div className="s-head">
        <span className="s-num">02</span>
        <h2 className="s-title">Featured Work</h2>
        <div className="s-rule" />
      </div>

      <div className="featured-projects">
        {featuredProjects.map((project) => (
          <div key={project.num} className="feat-card">
            <div className="feat-num">{project.num}</div>
            <div className="feat-body">
              <div className="feat-badge">{project.badge}</div>
              <h3 className="feat-title">{project.title}</h3>
              <p className="feat-desc">{project.description}</p>
            </div>
            <div className="feat-meta">
              <div className="feat-highlight">{project.highlight}</div>
              <div className="feat-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="feat-link"
              >
                View on GitHub <ArrowIcon />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
