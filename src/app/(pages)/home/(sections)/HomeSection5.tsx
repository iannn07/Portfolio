import HomeJobTitle from '@/components/ui/home-job-title'
import { Separator } from '@/components/ui/separator'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

function HomeSection5() {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  })

  const expandSeparator = useTransform(scrollYProgress, [0, 0.25], [0, 100])
  const separatorDynamicWidth = useTransform(expandSeparator, (v) => `${v}%`)

  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])

  const jobTitles = [
    { title: 'SWE I', start: 0.1, end: 0.2 },
    { title: 'SWE I', start: 0.2, end: 0.3 },
    { title: 'SWE I', start: 0.3, end: 0.4 },
    { title: 'SWE I', start: 0.4, end: 0.5 },
  ]

  return (
    <div
      ref={container}
      className="flex min-h-screen w-full flex-col gap-10 md:gap-20"
    >
      <div className="flex w-full flex-col justify-center gap-2">
        <h1 className="text-heading-2 font-bold">Work Experience</h1>
        <motion.div
          style={{ width: separatorDynamicWidth }}
          className="max-w-full"
        >
          <Separator className="bg-background" />
        </motion.div>
      </div>

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
    </div>
  )
}

export default HomeSection5
