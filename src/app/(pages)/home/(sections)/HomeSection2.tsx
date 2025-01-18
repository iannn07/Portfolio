import ParallaxText from '@/components/ui/parallax'
import React from 'react'

function HomeSection2() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full max-w-7xl">
        <ParallaxText baseVelocity={-2}>Start with Why?</ParallaxText>
        <ParallaxText baseVelocity={2}>Negative Space Programming</ParallaxText>
        <ParallaxText baseVelocity={-2}>
          Scalable, Maintainable, Robust, and Fast
        </ParallaxText>
      </div>
    </div>
  )
}

export default HomeSection2
