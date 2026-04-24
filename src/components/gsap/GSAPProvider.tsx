'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useLenis } from 'lenis/react'
import { useEffect } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function GSAPProvider() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.off('scroll', ScrollTrigger.update)
    }
  }, [lenis])

  return null
}
