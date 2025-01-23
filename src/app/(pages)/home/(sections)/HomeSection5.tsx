import SectionContainer from '@/components/ui/section-container'
import Skills from '@/contents/Skills'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

function HomeSection5() {
  const container = useRef(null)
  const imageContainer = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  })

  const { scrollYProgress: imageYProgress } = useScroll({
    target: imageContainer,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(imageYProgress, [0, 0.25], [1, 4])
  const dimBackground = useTransform(imageYProgress, [0.25, 0.4], [100, 25])
  const reduceBrightness = useTransform(
    dimBackground,
    (v) => `brightness(${v}%)`,
  )

  const showContent = useTransform(scrollYProgress, [0.4, 0.5], [0, 1])

  return (
    <SectionContainer
      container={container}
      scrollYProgress={scrollYProgress}
      useHeader={false}
      className="py-20 text-primary md:py-40"
    >
      <motion.div className="relative min-h-[300vh]" ref={imageContainer}>
        <div className="sticky top-0 h-screen">
          <div className="absolute top-0 flex h-full w-full items-center justify-center">
            <motion.div
              className="relative w-[25vw] rounded-b-3xl rounded-t-xl bg-background"
              style={{ scale, filter: reduceBrightness }}
            >
              <Image
                src="/images/ducati/ducati.jpg"
                alt="ducati"
                className="rounded-b-3xl rounded-t-xl object-cover"
                height={99999999999999999999}
                width={99999999999999999999}
              />
            </motion.div>
          </div>

          <motion.div
            className="relative flex h-full items-center justify-center py-20 md:py-40"
            style={{ opacity: showContent }}
          >
            <Skills scrollYProgress={scrollYProgress} />
          </motion.div>
        </div>
      </motion.div>
    </SectionContainer>
  )
}

export default HomeSection5
