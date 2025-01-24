import HomeJobTitle from '@/components/ui/home-job-title'
import Paragraph from '@/components/ui/paragraph'
import SectionContainer from '@/components/ui/section-container'
import { journeyDescription } from '@/contents/Descriptions'
import { experiences } from '@/contents/Experiences'
import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

function HomeSection6() {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])

  return (
    <SectionContainer
      container={container}
      scrollYProgress={scrollYProgress}
      header="My Journey"
      className="my-20 md:my-40"
    >
      <Paragraph
        word={journeyDescription.text}
        start={journeyDescription.start}
        end={journeyDescription.end}
      />
      {experiences.map((exp, index) => (
        <HomeJobTitle
          key={index}
          title={exp.title}
          scrollYProgress={scrollYProgress}
          start={exp.range[0]}
          end={exp.range[1]}
          hoverWidth={exp.hoverWidth}
        />
      ))}
    </SectionContainer>
  )
}

export default HomeSection6
