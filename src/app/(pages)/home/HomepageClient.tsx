'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import SunInfoPanel from '@/components/solar/SunInfoPanel'
import PlanetContent from '@/components/solar/PlanetContent'
import ThemeToggle from '@/components/solar/ThemeToggle'
import OrbitalNav from '@/components/solar/OrbitalNav'
import BottomSheet from '@/components/solar/BottomSheet'
import type { SolarSceneHandle } from '@/components/three/SolarScene'

const SolarScene = dynamic(() => import('@/components/three/SolarScene'), { ssr: false })

interface Props {
  github?: string
  linkedin?: string
  email?: string
  resume?: string
}

export default function HomepageClient({ github, linkedin, email, resume }: Props) {
  const sceneRef = useRef<SolarSceneHandle>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 959px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const handlePlanetEntered = useCallback((id: string) => setActiveSection(id), [])
  const handlePlanetExited  = useCallback(() => setActiveSection(null), [])
  const handleBack          = useCallback(() => {
    if (isMobile) setActiveSection(null)
    else sceneRef.current?.zoomOut()
  }, [isMobile])

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: 'var(--void)' }}>
      {isMobile ? (
        <>
          <OrbitalNav onPlanetClick={id => setActiveSection(id)} />
          <BottomSheet section={activeSection} onClose={() => setActiveSection(null)} />
        </>
      ) : (
        <>
          <SolarScene
            ref={sceneRef}
            onPlanetEntered={handlePlanetEntered}
            onPlanetExited={handlePlanetExited}
          />
          <SunInfoPanel github={github} linkedin={linkedin} email={email} resume={resume} />
          {activeSection && (
            <PlanetContent section={activeSection} onBack={handleBack} />
          )}
        </>
      )}
      <ThemeToggle />
    </div>
  )
}
