'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Lenis from 'lenis'
import { useEffect } from 'react'
import HomeSection1 from './(sections)/HomeSection1'
import HomeSection2 from './(sections)/HomeSection2'
import HomeSection3 from './(sections)/HomeSection3'
import HomeSection4 from './(sections)/HomeSection4'
import HomeSection5 from './(sections)/HomeSection5'

function Homepage() {
  const { scrollYProgress } = useScroll()

  const section1Opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -300])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0])

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })

  return (
    <div className="flex h-[200vh] w-full flex-col bg-background">
      <motion.div
        className="sticky top-0 z-0 h-screen"
        style={{ opacity: section1Opacity, y, scale }}
      >
        <HomeSection1 />
      </motion.div>

      <motion.div className="z-0 bg-primary" style={{ opacity }}>
        <HomeSection2 />
        <HomeSection3 scrollYProgress={scrollYProgress} />
        <div className="px-20">
          <HomeSection4 />
          <HomeSection5 />
          <div className="h-20">abcdef</div>
          <div className="h-20">abcdef</div>
          <div className="h-20">abcdef</div>
          <div className="h-20">abcdef</div>
          <div className="h-20">abcdef</div>
          <div className="h-20">abcdef</div>
          <div className="h-20">abcdef</div>
        </div>
      </motion.div>
    </div>
  )
}

export default Homepage
