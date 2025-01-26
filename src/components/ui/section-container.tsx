import { motion, MotionValue, useTransform } from 'framer-motion'
import { RefObject } from 'react'
import { Separator } from './separator'

interface SectionContainerProps {
  container: RefObject<null>
  scrollYProgress: MotionValue<number>
  id?: string
  header?: string
  shortDesc?: string
  className?: string
  verticalCenter?: boolean
  separatorColor?: string
  customPadding?: string
  useHeader?: boolean
  screen?: boolean
  children: React.ReactNode
}

function SectionContainer({
  container,
  scrollYProgress,
  id,
  header,
  shortDesc,
  className,
  verticalCenter = false,
  separatorColor = 'bg-background',
  customPadding,
  useHeader = true,
  screen = true,
  children,
}: SectionContainerProps) {
  const expandSeparator = useTransform(scrollYProgress, [0, 0.2], [0, 100])
  const separatorDynamicWidth = useTransform(expandSeparator, (v) => `${v}%`)

  return (
    <div
      className={`flex w-full flex-col gap-5 ${className} ${verticalCenter ? 'justify-center' : ''} ${customPadding ? customPadding : 'px-10 md:px-20'} ${screen ? 'min-h-screen' : ''}`}
      ref={container}
      id={id}
    >
      {useHeader && (
        <div className="flex w-full flex-col justify-center gap-2">
          <div className="flex items-end justify-between">
            <h1 className="text-heading-2 font-medium md:text-heading-1">
              {header}
            </h1>
            <p className="hidden max-w-56 md:block">{shortDesc}</p>
          </div>
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
