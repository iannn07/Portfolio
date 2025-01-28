'use client'

import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import ParallaxText from '@/components/ui/parallax'
import { jumpSections } from '@/constants/jumpSections'
import { useIsMobile } from '@/hooks/use-mobile'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLenis } from 'lenis/react'
import HomeSection1 from './(sections)/HomeSection1'
import HomeSection2 from './(sections)/HomeSection2'
import HomeSection3 from './(sections)/HomeSection3'
import HomeSection4 from './(sections)/HomeSection4'
import HomeSection5 from './(sections)/HomeSection5'
import HomeSection6 from './(sections)/HomeSection6'
import HomeSection7 from './(sections)/HomeSection7'
import HomeSection8 from './(sections)/HomeSection8'

function Homepage() {
  const lenis = useLenis()
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll()

  const section1Opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -300])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0])

  const opacityMobile = useTransform(scrollYProgress, [0, 0.05], [0, 1])
  const opacityDesktop = useTransform(scrollYProgress, [0, 0.075], [0, 1])
  const opacity = isMobile ? opacityMobile : opacityDesktop

  const menuOpacityMobile = useTransform(scrollYProgress, [0.05, 0.06], [0, 1])
  const menuOpacityDesktop = useTransform(
    scrollYProgress,
    [0.065, 0.085],
    [0, 1],
  )

  const menuSlideUpMobile = useTransform(scrollYProgress, [0.05, 0.06], [50, 0])
  const menuSlideUpDesktop = useTransform(
    scrollYProgress,
    [0.065, 0.075],
    [50, 0],
  )

  const menuOpacity = isMobile ? menuOpacityMobile : menuOpacityDesktop
  const menuSlideUp = isMobile ? menuSlideUpMobile : menuSlideUpDesktop

  const handleScroll = (id: string) => {
    const target = document.getElementById(id)

    if (target && lenis) {
      lenis.scrollTo(target, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        offset: 0,
      })
    }
  }

  return (
    <div className="flex h-[100vh] w-full flex-col bg-background">
      <motion.div
        className="sticky top-0 z-0 h-screen"
        style={{ opacity: section1Opacity, y, scale }}
      >
        <HomeSection1 />
      </motion.div>

      <motion.div className="z-0 bg-primary" style={{ opacity }}>
        <motion.div
          className="fixed bottom-5 z-10 flex w-screen justify-center md:bottom-2"
          style={{ y: menuSlideUp, opacity: menuOpacity }}
        >
          <Menubar className="w-fit items-center justify-center">
            {jumpSections.map((section, index) => (
              <MenubarMenu key={index}>
                <MenubarTrigger
                  onClick={(e) => {
                    e.preventDefault()
                    handleScroll(section.href)
                  }}
                >
                  {section.name}
                </MenubarTrigger>
              </MenubarMenu>
            ))}
          </Menubar>
        </motion.div>

        <HomeSection2 />
        <HomeSection3 />
        <HomeSection4 />

        <ParallaxText baseVelocity={1}>Keep scrolling</ParallaxText>

        <HomeSection5 />
        <HomeSection6 />
        <HomeSection7 />
        <HomeSection8 />
      </motion.div>
    </div>
  )
}

export default Homepage
