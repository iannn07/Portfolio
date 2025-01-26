import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger } from './accordion'
import { Badge } from './badge'

interface ExperiencesAccordionProps {
  id: string
  title: string
  company: string
  type: string
  duration: string
  content: React.ReactNode
  range: number[]
}

function ExperiencesAccordion({
  id,
  title,
  company,
  type,
  duration,
  content,
  range,
}: ExperiencesAccordionProps) {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'center start'],
  })

  const opacity = useTransform(scrollYProgress, range, [0, 1])

  return (
    <AccordionItem value={id} ref={container}>
      <motion.div style={{ opacity }}>
        <AccordionTrigger>
          <h1 className="text-heading-6 font-medium md:text-heading-5">
            {title} <span className="text-base text-muted-foreground">at</span>{' '}
            {company}
          </h1>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col justify-center gap-2">
            <div className="flex w-fit flex-col gap-2 md:flex-row">
              <div className="w-fit">
                <Badge variant="default">{type}</Badge>
              </div>
              <Badge variant="outline">{duration}</Badge>
            </div>
            <div className="md:text-md">{content}</div>
          </div>
        </AccordionContent>
      </motion.div>
    </AccordionItem>
  )
}

export default ExperiencesAccordion
