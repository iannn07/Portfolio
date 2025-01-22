'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar } from '@/components/ui/avatar'
import { useIsMobile } from '@/hooks/use-mobile'
import { AvatarImage } from '@radix-ui/react-avatar'
import { IconCircleCheckFilled } from '@tabler/icons-react'
import { motion, MotionValue, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

interface HomeSection3Props {
  scrollYProgress: MotionValue<number>
}

function HomeSection3({ scrollYProgress }: HomeSection3Props) {
  const role = [
    'Software Engineer I',
    'Junior Software Engineer',
    'Full Stack Developer',
    'AI Enthusiast',
  ]

  const [firstRender, setFirstRender] = useState(true)
  const [changeRole, setChangeRole] = useState(role[1])

  const isMobile = useIsMobile()

  const opacity = useTransform(
    scrollYProgress,
    [0.2, !isMobile ? 0.3 : 0.2],
    [0, 1],
  )
  const gap = useTransform(scrollYProgress, [0.15, 0.3], [60, 32])
  const slideAvatar = useTransform(scrollYProgress, [0.15, 0.3], [-100, 0])
  const slideText = useTransform(scrollYProgress, [0.15, 0.3], [100, 0])

  useEffect(() => {
    const interval = setInterval(() => {
      setChangeRole(role[Math.floor(Math.random() * role.length)])
    }, 2000)

    if (firstRender)
      setTimeout(() => {
        setFirstRender(false)
      }, 250)

    return () => clearInterval(interval)
  })

  return (
    <motion.div
      className="flex h-screen w-full flex-col items-center justify-evenly bg-primary text-background"
      style={{ opacity }}
    >
      <div className="flex w-full flex-col items-center justify-center gap-5 md:gap-10">
        <motion.div
          className="flex w-full flex-col items-center justify-center gap-10 md:flex-row"
          style={!isMobile ? { gap } : undefined}
        >
          <motion.div
            style={!isMobile ? { x: slideAvatar } : { opacity, x: 0 }}
          >
            <Avatar className="h-64 w-64 overflow-hidden shadow-md">
              <AvatarImage
                src="/images/avatar/Avatar 1.jpg"
                alt="Pristian Budi Dharmawan"
                className="translate-y-[-30px] scale-[3] object-cover"
                height={750}
                width={750}
                fetchPriority="high"
              />
            </Avatar>
          </motion.div>
          <motion.div
            className="flex w-full flex-col items-center gap-3 text-center md:w-auto md:items-start md:text-left"
            style={!isMobile ? { x: slideText } : { opacity, x: 0 }}
          >
            <span className="text-3xl md:text-4xl">Hi there👋🏻 I&apos;m </span>
            <h1 className="text-4xl font-bold md:text-5xl">
              Pristian Budi Dharmawan
            </h1>
            <h2 className="text-xl font-medium md:text-3xl">
              or... you can call me{' '}
              <span className="font-bold text-secondary">Ian.</span>
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 min-w-[30ch] text-justify"
            >
              <Alert className="w-full text-primary">
                <AlertTitle className="flex items-center gap-2 md:ml-2 md:text-xl">
                  A passionate
                  <IconCircleCheckFilled color="white" size={20} />
                </AlertTitle>
                <motion.div
                  key={changeRole}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <AlertDescription className="md:ml-2 md:text-lg">
                    {changeRole}
                  </AlertDescription>
                </motion.div>
              </Alert>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default HomeSection3
