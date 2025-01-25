import { Accordion } from '@/components/ui/accordion'
import ExperiencesAccordion from '@/components/ui/experiences-accordion'
import Paragraph from '@/components/ui/paragraph'
import SectionContainer from '@/components/ui/section-container'
import { journeyDescription } from '@/contents/Descriptions'
import { experiences } from '@/contents/Experiences'
import { useScroll } from 'framer-motion'
import { useRef } from 'react'

function HomeSection6() {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  })

  return (
    <SectionContainer
      container={container}
      scrollYProgress={scrollYProgress}
      header="My Journey"
      className="pt-20 md:pt-40"
    >
      <Paragraph
        word={journeyDescription.text}
        start={journeyDescription.start}
        end={journeyDescription.end}
      />
      <Accordion
        className="flex min-h-screen w-full flex-col justify-center gap-5 md:gap-10"
        collapsible
        type="single"
      >
        {experiences.map((exp, index) => (
          <ExperiencesAccordion
            key={index}
            id={exp.id}
            title={exp.title}
            company={exp.company}
            type={exp.type}
            duration={exp.duration}
            content={exp.content}
            range={exp.range}
          />
        ))}
      </Accordion>
    </SectionContainer>
  )
}

export default HomeSection6
