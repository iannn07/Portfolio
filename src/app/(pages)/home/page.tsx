'use client'

import { useCallback, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import SunInfoPanel from '@/components/solar/SunInfoPanel'
import PlanetContent from '@/components/solar/PlanetContent'
import ThemeToggle from '@/components/solar/ThemeToggle'
import type { SolarSceneHandle } from '@/components/three/SolarScene'

const SolarScene = dynamic(() => import('@/components/three/SolarScene'), { ssr: false })

export default function Homepage() {
  const sceneRef = useRef<SolarSceneHandle>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const handlePlanetEntered = useCallback((id: string) => setActiveSection(id), [])
  const handlePlanetExited  = useCallback(() => setActiveSection(null), [])
  const handleBack          = useCallback(() => sceneRef.current?.zoomOut(), [])

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: 'var(--void)' }}>
      <SolarScene
        ref={sceneRef}
        onPlanetEntered={handlePlanetEntered}
        onPlanetExited={handlePlanetExited}
      />
      <SunInfoPanel />
      {activeSection && (
        <PlanetContent section={activeSection} onBack={handleBack} />
      )}
      <ThemeToggle />
    </div>
  )
}
