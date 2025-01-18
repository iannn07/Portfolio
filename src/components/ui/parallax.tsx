'use client'

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { useRef } from 'react'
import { wrap } from '@motionone/utils'

interface ParallaxTextProps {
  children: string
  baseVelocity?: number
}

export default function ParallaxText({
  children,
  baseVelocity = 100,
}: ParallaxTextProps) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const directionFactor = useRef(1)

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })

  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="flex w-full flex-nowrap overflow-hidden whitespace-nowrap">
      <motion.div
        className="flex flex-nowrap whitespace-nowrap text-heading-5 uppercase"
        style={{ x }}
      >
        {[...Array(16)].map((_, i) => (
          <span key={i} className="mr-10 block">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
