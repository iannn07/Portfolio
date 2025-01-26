import ParallaxText from '@/components/ui/parallax'
import React from 'react'

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-primary">
      <div className="w-screen rotate-[25deg] scale-150">
        <ParallaxText baseVelocity={2}>404</ParallaxText>
      </div>
      <div className="-rotate-[25deg] scale-110">
        <ParallaxText baseVelocity={-2}>Not Found</ParallaxText>
      </div>
    </div>
  )
}

export default NotFound
