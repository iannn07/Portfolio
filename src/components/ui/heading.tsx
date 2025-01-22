import { motion, MotionValue, useScroll, useTransform } from 'framer-motion'
import React, { useRef } from 'react'

interface HeadingProps {
  word: string
  className?: string
}

function Heading({ word, className }: HeadingProps) {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 0.9', 'start 0.5'],
  })

  const words = word.split(' ')

  return (
    <motion.p ref={container} className={`flex flex-wrap ${className}`}>
      {words.map((word, index) => {
        const start = index / words.length
        const end = start + 1 / words.length

        return (
          <Word
            key={index}
            range={[start, end]}
            scrollYProgress={scrollYProgress}
          >
            {word}
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
  const scale = useTransform(scrollYProgress, range, [0.9, 1])

  return (
    <span className="relative mr-1 mt-1">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity, scale }} className="relative">
        {children}
      </motion.span>
    </span>
  )
}

// function Characters() {
//   return <div>Characters</div>
// }

export default Heading
