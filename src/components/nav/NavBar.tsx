'use client'

import { useEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'

const NAV_LINKS = [
  { label: 'About', href: 'about' },
  { label: 'Work', href: 'featured' },
  { label: 'Experience', href: 'experience' },
  { label: 'Passions', href: 'passions' },
  { label: 'Contact', href: 'contact' },
]

export default function NavBar() {
  const navRef = useRef<HTMLElement>(null)
  const lenis = useLenis()

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 80)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
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
      <a href="#hero" className="nav-logo">
        GUN<span>A</span>WAN
      </a>
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
      <a href="mailto:pristian.dharmawan@gmail.com" className="nav-cta">
        Get in touch
      </a>
    </nav>
  )
}
