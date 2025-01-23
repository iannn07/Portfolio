import Paragraph from '@/components/ui/paragraph'
import PhilosophyCard from '@/components/ui/philosophy-card'
import SectionContainer from '@/components/ui/section-container'
import { shortDescription } from '@/contents/Descriptions'
import { philosophies } from '@/contents/Philosophies'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

function HomeSection4() {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.45], [0.4, 1])
  const slideBox = useTransform(scrollYProgress, [0, 0.45], [150, 0])
  const showPatronus = useTransform(scrollYProgress, [0, 0.45], [0, 1])

  return (
    <SectionContainer
      container={container}
      scrollYProgress={scrollYProgress}
      header="Expecto Patronum!"
      className="pb-20 md:pb-40"
    >
      {shortDescription.map((description, index) => (
        <Paragraph
          key={index}
          word={description.text}
          start={description.start}
          end={description.end}
        />
      ))}

      <motion.div
        className="flex h-full w-full flex-col gap-5 rounded-3xl bg-background p-5 text-background shadow-md md:grid md:grid-cols-2 md:gap-10 md:p-10"
        style={{
          scale,
          y: slideBox,
          opacity: showPatronus,
        }}
        transition={{ duration: 1 }}
      >
        {philosophies.map((philosphy, index) => (
          <PhilosophyCard
            {...philosphy}
            key={index}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </motion.div>
    </SectionContainer>
  )
}

export default HomeSection4
