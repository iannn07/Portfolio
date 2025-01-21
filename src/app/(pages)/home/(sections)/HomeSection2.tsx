'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar } from '@/components/ui/avatar'
import { useIsMobile } from '@/hooks/use-mobile'
import { AvatarImage } from '@radix-ui/react-avatar'
import { IconCircleCheckFilled } from '@tabler/icons-react'
import { motion, MotionValue, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

interface HomeSection2Props {
  scrollYProgress: MotionValue<number>
}

function HomeSection2({ scrollYProgress }: HomeSection2Props) {
  const role = [
    'Software Engineer I',
    'Junior Software Engineer',
    'Full Stack Developer',
    'AI Enthusiast',
  ]

  const [firstRender, setFirstRender] = useState(true)
  const [changeRole, setChangeRole] = useState(role[1])

  const isMobile = useIsMobile()

  const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  const gap = useTransform(scrollYProgress, [0.2, 0.5], [60, 24])
  const slideAvatar = useTransform(scrollYProgress, [0.2, 0.5], [-150, 0])
  const slideText = useTransform(scrollYProgress, [0.2, 0.5], [150, 0])

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
      className="flex h-screen max-h-[75%] w-full flex-col items-center justify-evenly bg-primary text-background"
      style={{ opacity }}
    >
      <div className="flex w-full flex-col items-center justify-center gap-5 md:gap-10">
        <motion.div
          className="flex w-full flex-col items-center justify-center gap-10 md:flex-row md:gap-24"
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
            <span className="text-3xl md:text-5xl">Hi there👋🏻 I&apos;m </span>
            <h1 className="text-4xl font-bold md:text-6xl">
              Pristian Budi Dharmawan
            </h1>
            <h2 className="text-xl font-medium md:text-3xl">
              or... just call me{' '}
              <span className="font-bold text-secondary">Ian.</span>
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="min-w-[25ch] text-justify"
            >
              <Alert className="w-full text-primary">
                <IconCircleCheckFilled color="white" />
                <AlertTitle className="md:ml-2">A passionate</AlertTitle>
                <motion.div
                  key={changeRole}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <AlertDescription className="md:ml-2">
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

export default HomeSection2
