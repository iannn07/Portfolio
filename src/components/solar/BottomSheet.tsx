'use client'

import { useEffect, useRef } from 'react'
import PlanetContent from './PlanetContent'

interface Props {
  section: string | null
  onClose: () => void
}

export default function BottomSheet({ section, onClose }: Props) {
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sheetRef.current
    if (!el) return
    if (section) {
      el.style.transition = 'transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1)'
      el.style.transform = 'translateY(0)'
    } else {
      el.style.transition = 'transform 280ms ease-in'
      el.style.transform = 'translateY(100%)'
    }
  }, [section])

  // Touch drag-to-dismiss
  useEffect(() => {
    const el = sheetRef.current
    if (!el) return
    let startY = 0, delta = 0
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY }
    const onMove  = (e: TouchEvent) => {
      delta = e.touches[0].clientY - startY
      if (delta > 0) { el.style.transition = 'none'; el.style.transform = `translateY(${delta}px)` }
    }
    const onEnd = () => {
      if (delta > 120) onClose()
      else { el.style.transition = 'transform 250ms ease-out'; el.style.transform = 'translateY(0)' }
      delta = 0
    }
    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchmove',  onMove,  { passive: true })
    el.addEventListener('touchend',   onEnd)
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove',  onMove)
      el.removeEventListener('touchend',   onEnd)
    }
  }, [onClose])

  return (
    <>
      {section && (
        <div
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }}
        />
      )}
      <div
        ref={sheetRef}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '82vh',
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderRadius: '16px 16px 0 0',
          zIndex: 50,
          transform: 'translateY(100%)',
          overflowY: 'auto',
          padding: '0 20px 48px',
        }}
      >
        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 8px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--border)' }} />
        </div>
        {section && (
          <PlanetContent section={section} onBack={onClose} standalone />
        )}
      </div>
    </>
  )
}
