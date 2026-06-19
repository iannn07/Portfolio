'use client'

import dynamic from 'next/dynamic'
import { useRef } from 'react'
import type { SolarSceneHandle } from '@/components/three/SolarScene'

const SolarScene = dynamic(() => import('@/components/three/SolarScene'), { ssr: false })

export default function Homepage() {
  const sceneRef = useRef<SolarSceneHandle>(null)
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
      <SolarScene ref={sceneRef} onPlanetEntered={() => {}} onPlanetExited={() => {}} />
    </div>
  )
}
