import { useIsMobile } from '@/hooks/use-mobile'
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion'
import React, { useRef } from 'react'

interface ParagraphProps {
  word: string
  start: number
  end: number
  className?: string
}

function Paragraph({ word, start, end, className }: ParagraphProps) {
  const container = useRef(null)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: container,
    offset: [
      `${isMobile && start === 0.4 ? 0.1 : start} 0.9`,
      `${isMobile && end === 1.1 ? 0.8 : end} 0.7`,
    ],
  })

  const words = word.split(' ')

  return (
    <motion.p
      ref={container}
      className={`flex flex-wrap text-justify text-lg md:text-xl ${className}`}
    >
      {words.map((word, index) => {
        const start = index / words.length
        const end = start + 1 / words.length

        const convertedWord = word.replace(/&quot;/g, '"')

        return (
          <Word
            key={index}
            range={[start, end]}
            scrollYProgress={scrollYProgress}
          >
            {convertedWord}
          </Word>
        )
      })}
    </motion.p>
  )
}

interface WordProps {
  children: React.ReactNode
  range: number[]
  scrollYProgress: MotionValue<number>
}

function Word({ children, range, scrollYProgress }: WordProps) {
  const opacity = useTransform(scrollYProgress, range, [0, 1])
  const scale = useTransform(scrollYProgress, range, [0.8, 1])

  return (
    <span className="relative mr-1 mt-1">
      <span className="absolute opacity-20">{children}</span>
      <motion.span
        style={{ opacity, scale }}
        transition={{ duration: 1 }}
        className="relative"
      >
        {children}
      </motion.span>
    </span>
  )
}

export default Paragraph
