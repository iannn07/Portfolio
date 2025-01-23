import { Icon, IconProps } from '@tabler/icons-react'
import { motion, MotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

interface TechStacksProps {
  scrollYProgress: MotionValue<number>
  category: string
  items: (
    | string
    | React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>
  )[]
  range: number[]
}

function TechStacks({
  scrollYProgress,
  category,
  items,
  range,
}: TechStacksProps) {
  const opacity = useTransform(scrollYProgress, range, [0, 1])
  const slide = useTransform(scrollYProgress, range, [-50, 0])

  return (
    <motion.div
      className="flex w-full flex-col items-center justify-between gap-5 rounded-xl border border-primary p-5"
      style={{ opacity }}
    >
      <h1 className="text-heading-6">{category}</h1>
      <div className="flex items-center justify-center gap-5">
        {items.map((item, index) => (
          <div key={index}>
            {typeof item === 'string' ? (
              <Image
                src={item}
                alt={item}
                width={item === '/images/logo/mui.png' ? 50 : 50}
                height={item === '/images/logo/mui.png' ? 50 : 50}
              />
            ) : (
              React.createElement(item, { size: 50 })
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default TechStacks
