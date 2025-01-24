import SectionContainer from '@/components/ui/section-container'
import Skills from '@/contents/Skills'
import { useIsMobile } from '@/hooks/use-mobile'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

function HomeSection5() {
  const container = useRef(null)
  const imageContainer = useRef(null)

  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  })

  const { scrollYProgress: imageYProgress } = useScroll({
    target: imageContainer,
    offset: ['start end', 'end start'],
  })

  const showTitleMobile = useTransform(
    scrollYProgress,
    [0.35, 0.4, 0.45],
    [0, 1, 0],
  )
  const showTitle = useTransform(imageYProgress, [0.25, 0.45, 0.55], [0, 1, 0])

  const scaleMobile = useTransform(scrollYProgress, [0, 0.25], [1, 2])
  const scale = useTransform(scrollYProgress, [0.25, 0.5], [1, 4])

  const dimBackground = useTransform(imageYProgress, [0.25, 0.35], [100, 25])
  const reduceBrightness = useTransform(
    dimBackground,
    (v) => `brightness(${v}%)`,
  )

  const showContentMobile = useTransform(imageYProgress, [0.4, 0.5], [0, 1])
  const showContent = useTransform(imageYProgress, [0.3, 0.5], [0, 1])

  const titleOpacity = isMobile ? showTitleMobile : showTitle
  const scaleValue = isMobile ? scaleMobile : scale
  const contentOpacity = isMobile ? showContentMobile : showContent

  return (
    <SectionContainer
      container={container}
      scrollYProgress={scrollYProgress}
      useHeader={false}
      className="py-20 text-primary md:py-40"
    >
      <motion.div
        className={`${isMobile ? 'h-[600vh]' : 'h-[300vh]'}`}
        ref={imageContainer}
      >
        <div className="sticky top-0 h-screen">
          <div className="absolute top-0 flex h-screen w-full items-center justify-center">
            <motion.div
              className={`relative w-[50vw] bg-background md:w-[25vw] ${isMobile ? 'h-[50vh]' : 'rounded-3xl'}`}
              style={{ scale: scaleValue, filter: reduceBrightness }}
            >
              <Image
                src="/images/ducati/ducati.jpg"
                alt="ducati"
                className={`relative h-full bg-background object-cover md:w-[25vw] ${isMobile ? '' : 'rounded-3xl'}`}
                height={99999999999999999999}
                width={99999999999999999999}
              />
            </motion.div>
          </div>
          <motion.h1
            className="relative flex h-screen items-center justify-center text-heading-2 font-bold"
            style={{ opacity: titleOpacity }}
          >
            Tech Stacks
          </motion.h1>
        </div>

        <motion.div
          className={`relative flex h-screen justify-center py-20 md:py-40 ${isMobile ? 'top-[300vh]' : 'top-[100vh]'}`}
          style={{ opacity: contentOpacity }}
        >
          <Skills />
        </motion.div>
      </motion.div>
    </SectionContainer>
  )
}

export default HomeSection5
