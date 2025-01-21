import ParallaxText from '@/components/ui/parallax'
import React from 'react'

function HomeSection3() {
  return (
    <div className="mt-10 flex w-full items-center justify-center bg-primary">
      <div className="w-full">
        <ParallaxText baseVelocity={-1}>Start with Why?</ParallaxText>
        <ParallaxText baseVelocity={1}>Negative Space Programming</ParallaxText>
        <ParallaxText baseVelocity={-1}>
          Scalable • Maintainable • Robust • Fast
        </ParallaxText>
      </div>
    </div>
  )
}

export default HomeSection3
