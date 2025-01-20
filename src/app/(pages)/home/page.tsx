'use client'

import { useIsMobile } from '@/hooks/use-mobile'
import { motion, useScroll, useSpring } from 'framer-motion'
import HomeSection2 from './(sections)/HomeSection2'
import HomeSection3 from './(sections)/HomeSection3'

function Homepage() {
  const { scrollYProgress } = useScroll()
  const isMobile = useIsMobile()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className="flex h-full w-full flex-col gap-10 bg-background p-10 md:px-5 md:py-0">
      <HomeSection2 />
      <HomeSection3 />
      <div className="h-20">abcdef</div>
      <div className="h-20">abcdef</div>
      <div className="h-20">abcdef</div>
      <div className="h-20">abcdef</div>
      <div className="h-20">abcdef</div>
      <div className="h-20">abcdef</div>
      <div className="h-20">abcdef</div>
      <motion.div
        id="scroll-indicator"
        className={`${isMobile ? 'bottom-0 left-0 right-[-10px]' : 'bottom-[10px] left-[85px] right-[25px]'} fixed h-2 bg-background`}
        style={{
          scaleX,
          originX: 0,
        }}
      />
    </div>
  )
}

export default Homepage
