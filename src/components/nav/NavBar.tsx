'use client'

import { useEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'
import ThemeToggle from '@/components/theme/ThemeToggle'

const NAV_LINKS = [
  { label: 'About', href: 'about' },
  { label: 'Experience', href: 'experience' },
  { label: 'Ventures', href: 'ventures' },
  { label: 'Contact', href: 'contact' },
]

export default function NavBar() {
  const navRef = useRef<HTMLElement>(null)
  const lenis = useLenis()

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    function onScroll() {
      nav!.classList.toggle('scrolled', window.scrollY > 60)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTo(id: string) {
    const target = document.getElementById(id)
    if (target && lenis) {
      lenis.scrollTo(target, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        offset: 0,
      })
    }
  }

  return (
    <nav id="main-nav" ref={navRef} className="v2-nav">
      <a href="#hero" className="nav-logo">PRISTIAN</a>
      <ul className="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={`#${link.href}`}
              onClick={(e) => {
                e.preventDefault()
                scrollTo(link.href)
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="nav-right">
        <ThemeToggle />
        <a href="mailto:pristian.dharmawan@gmail.com" className="nav-cta">
          Get in touch
        </a>
      </div>
    </nav>
  )
}
