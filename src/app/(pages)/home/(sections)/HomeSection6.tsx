import { Accordion } from '@/components/ui/accordion'
import ExperiencesAccordion from '@/components/ui/experiences-accordion'
import Paragraph from '@/components/ui/paragraph'
import SectionContainer from '@/components/ui/section-container'
import { journeyDescription } from '@/contents/Descriptions'
import { experiences } from '@/contents/Experiences'
import { useScroll } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

function HomeSection6() {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  })

  const collegeImages = [
    '/images/archives/1.jpg',
    '/images/archives/5.jpg',
    '/images/archives/8.jpg',
    '/images/archives/2.jpg',
    '/images/archives/3.jpg',
    '/images/archives/4.jpg',
    '/images/archives/6.jpg',
    '/images/archives/7.jpg',
    '/images/archives/9.jpg',
  ]

  return (
    <SectionContainer
      container={container}
      scrollYProgress={scrollYProgress}
      id="experiences"
      header="My Journey"
      className="py-20 md:py-40"
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
        <h1 className="text-heading-4 font-medium md:text-heading-3">
          Professional Experiences
        </h1>
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

      <div className="flex w-full flex-col gap-5 md:gap-10">
        <h1 className="text-heading-4 font-medium md:text-heading-3">
          Education
        </h1>
        <div>
          <p className="text-lg md:text-xl">
            Currently waiting my Thesis Defence of Bachelor of Computer Science
            at BINUS University which will be held on February 5, 2025.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-heading-6 font-medium md:text-heading-5">
            Skies and My Campus Life
          </h1>
          <div className="flex w-full flex-col gap-5 md:grid md:grid-cols-3 md:gap-10">
            {collegeImages.map((college, index) => (
              <Image
                key={index}
                src={college}
                alt="College"
                width={500}
                height={300}
                className="rounded-xl object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default HomeSection6
