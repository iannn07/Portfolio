import Paragraph from '@/components/ui/paragraph'
import PhilosophyCard from '@/components/ui/philosophy-card'
import { Separator } from '@/components/ui/separator'
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

  const expandSeparator = useTransform(scrollYProgress, [0, 0.2], [0, 100])
  const separatorDynamicWidth = useTransform(expandSeparator, (v) => `${v}%`)

  const scale = useTransform(scrollYProgress, [0, 0.45], [0.4, 1])
  const slideBox = useTransform(scrollYProgress, [0, 0.45], [150, 0])
  const showPatronus = useTransform(scrollYProgress, [0, 0.45], [0, 1])

  return (
    <div
      className="flex min-h-screen w-full flex-col justify-center gap-5 pb-20"
      ref={container}
    >
      <div className="flex w-full flex-col justify-center gap-2">
        <h1 className="text-heading-2 font-bold">Expecto Patronum!</h1>
        <motion.div
          style={{ width: separatorDynamicWidth }}
          className="max-w-full"
        >
          <Separator className="bg-background" />
        </motion.div>
      </div>

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
    </div>
  )
}

export default HomeSection4
