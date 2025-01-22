import { IconArrowRight } from '@tabler/icons-react'
import { motion, MotionValue, useAnimation, useTransform } from 'framer-motion'
import { Separator } from './separator'

interface HomeJobTitleProps {
  title: string
  hoverWidth?: number
  scrollYProgress: MotionValue<number>
  start: number
  end: number
}

function HomeJobTitle({
  title,
  hoverWidth = 290,
  scrollYProgress,
  start,
  end,
}: HomeJobTitleProps) {
  const control = useAnimation()

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1])

  return (
    <motion.div
      className="flex h-20 w-full items-center justify-between gap-2"
      onMouseEnter={() => control.start({ width: hoverWidth })}
      onMouseLeave={() => control.start({ width: 0 })}
      style={{ opacity }}
    >
      <div className="flex w-fit flex-col gap-2">
        <h1 className="text-heading-4">{title}</h1>
        <motion.div
          animate={control}
          initial={{ width: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Separator className="bg-background" />
        </motion.div>
      </div>
      <IconArrowRight size={32} />
    </motion.div>
  )
}

export default HomeJobTitle
