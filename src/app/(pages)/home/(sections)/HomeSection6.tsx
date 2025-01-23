import HomeJobTitle from '@/components/ui/home-job-title'
import SectionContainer from '@/components/ui/section-container'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

function HomeSection6() {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])

  const jobTitles = [
    { title: 'SWE I', start: 0.1, end: 0.2 },
    { title: 'SWE I', start: 0.2, end: 0.3 },
    { title: 'SWE I', start: 0.3, end: 0.4 },
    { title: 'SWE I', start: 0.4, end: 0.5 },
  ]

  return (
    <SectionContainer
      container={container}
      scrollYProgress={scrollYProgress}
      header="Work Experience"
    >
      <motion.div
        className="flex h-full w-full flex-col gap-10 text-background md:gap-20"
        style={{ opacity }}
      >
        {jobTitles.map((jobTitle, index) => (
          <HomeJobTitle
            key={index}
            title={jobTitle.title}
            scrollYProgress={scrollYProgress}
            start={jobTitle.start}
            end={jobTitle.end}
          />
        ))}
      </motion.div>
    </SectionContainer>
  )
}

export default HomeSection6
