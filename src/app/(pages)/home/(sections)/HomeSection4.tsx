import Paragraph from '@/components/ui/paragraph'
import PhilosophyCard from '@/components/ui/philosophy-card'
import SectionContainer from '@/components/ui/section-container'
import { shortDescription } from '@/contents/Descriptions'
import { philosophies } from '@/contents/Philosophies'
import { useScroll } from 'framer-motion'
import { useRef } from 'react'

function HomeSection4() {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  })

  return (
    <SectionContainer
      container={container}
      scrollYProgress={scrollYProgress}
      header="Expecto Patronum!"
      className="py-20 md:pb-40"
    >
      {shortDescription.map((description, index) => (
        <Paragraph
          key={index}
          word={description.text}
          start={description.start}
          end={description.end}
        />
      ))}

      <div className="flex h-screen w-full items-center justify-center md:h-[50vh]">
        <h1 className="text-heading-2 font-medium md:text-heading-1">
          Why do I develop?
        </h1>
      </div>

      <PhilosophyCard scrollYProgress={scrollYProgress} {...philosophies[0]} />

      <div className="flex h-screen w-full items-center justify-center md:h-[50vh]">
        <h1 className="text-heading-2 font-medium md:text-heading-1">
          How do I develop?
        </h1>
      </div>

      <PhilosophyCard scrollYProgress={scrollYProgress} {...philosophies[1]} />
    </SectionContainer>
  )
}

export default HomeSection4
