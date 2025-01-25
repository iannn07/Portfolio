'use client'

import ParallaxText from '@/components/ui/parallax'
import { motion, useScroll, useTransform } from 'framer-motion'
import HomeSection1 from './(sections)/HomeSection1'
import HomeSection2 from './(sections)/HomeSection2'
import HomeSection3 from './(sections)/HomeSection3'
import HomeSection4 from './(sections)/HomeSection4'
import HomeSection5 from './(sections)/HomeSection5'
import HomeSection6 from './(sections)/HomeSection6'
import HomeSection7 from './(sections)/HomeSection7'

function Homepage() {
  const { scrollYProgress } = useScroll()

  const section1Opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -300])
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <div className="flex h-[100vh] w-full flex-col bg-background">
      <motion.div
        className="sticky top-0 z-0 h-screen"
        style={{ opacity: section1Opacity, y, scale }}
      >
        <HomeSection1 />
      </motion.div>

      <motion.div className="z-0 bg-primary" style={{ opacity }}>
        <HomeSection2 />
        <HomeSection3 />
        <HomeSection4 />

        <ParallaxText baseVelocity={1}>Keep scrolling</ParallaxText>

        <HomeSection5 />
        <HomeSection6 />
        <HomeSection7 />
      </motion.div>
    </div>
  )
}

export default Homepage
