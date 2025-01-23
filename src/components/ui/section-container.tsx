import { motion, MotionValue, useTransform } from 'framer-motion'
import { RefObject } from 'react'
import { Separator } from './separator'

interface SectionContainerProps {
  container: RefObject<null>
  scrollYProgress: MotionValue<number>
  header?: string
  className?: string
  verticalCenter?: boolean
  separatorColor?: string
  customPadding?: string
  useHeader?: boolean
  children: React.ReactNode
}

function SectionContainer({
  container,
  scrollYProgress,
  header,
  className,
  verticalCenter = false,
  separatorColor = 'bg-background',
  customPadding,
  useHeader = true,
  children,
}: SectionContainerProps) {
  const expandSeparator = useTransform(scrollYProgress, [0, 0.2], [0, 100])
  const separatorDynamicWidth = useTransform(expandSeparator, (v) => `${v}%`)

  return (
    <div
      className={`flex min-h-screen w-full flex-col gap-5 ${className} ${verticalCenter ? 'justify-center' : ''} ${customPadding ? customPadding : 'px-10 md:px-20'}`}
      ref={container}
    >
      {useHeader && (
        <div className="flex w-full flex-col justify-center gap-2">
          <h1 className="text-heading-2 font-bold">{header}</h1>
          <motion.div
            style={{ width: separatorDynamicWidth }}
            className="max-w-full"
          >
            <Separator className={separatorColor} />
          </motion.div>
        </div>
      )}

      {children}
    </div>
  )
}

export default SectionContainer
