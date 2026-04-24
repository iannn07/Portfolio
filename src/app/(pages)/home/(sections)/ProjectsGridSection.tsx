'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gridProjects } from '@/contents/Projects'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const LinkIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M1 12L12 1M12 1H5M12 1V8" />
  </svg>
)

export default function ProjectsGridSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      sectionRef.current
        ?.querySelectorAll<HTMLElement>('.s-head, .proj-card')
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
    <section id="projects" ref={sectionRef} className="v2-section bg-default">
      <div className="s-head">
        <span className="s-num">03</span>
        <h2 className="s-title">More Projects</h2>
        <div className="s-rule" />
      </div>

      <div className="proj-grid">
        {gridProjects.map((project) => (
          <div key={project.num} className="proj-card">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-card-link"
            >
              <LinkIcon />
            </a>
            <div className="proj-card-num">
              {project.num} / {project.category}
            </div>
            <div className="proj-card-name">{project.name}</div>
            <div
              className="proj-card-desc"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
            <div className="proj-card-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
