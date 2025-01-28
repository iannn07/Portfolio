'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar } from '@/components/ui/avatar'
import Contacts from '@/components/ui/contacts'
import { useIsMobile } from '@/hooks/use-mobile'
import { AvatarImage } from '@radix-ui/react-avatar'
import {
  IconBrandGithub,
  IconBrandGithubFilled,
  IconBrandLinkedin,
  IconBrandLinkedinFilled,
  IconCircleCheckFilled,
} from '@tabler/icons-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function HomeSection3() {
  const role = [
    'Software Engineer I',
    'Junior Software Engineer',
    'Full Stack Developer',
    'AI Enthusiast',
  ]

  const [firstRender, setFirstRender] = useState(true)
  const [changeRole, setChangeRole] = useState(role[1])

  const isMobile = useIsMobile()

  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 0.8', 'end start'],
  })

  const opacity = useTransform(
    scrollYProgress,
    [!isMobile ? 0.2 : 0.1, !isMobile ? 0.3 : 0.35],
    [0, 1],
  )

  const gap = useTransform(scrollYProgress, [0.15, 0.3], [60, 32])
  const slideAvatar = useTransform(scrollYProgress, [0.15, 0.3], [-100, 0])
  const slideText = useTransform(scrollYProgress, [0.15, 0.3], [100, 0])

  useEffect(() => {
    const interval = setInterval(() => {
      setChangeRole((prev) => {
        let next = role[Math.floor(Math.random() * role.length)]
        while (next === prev) {
          next = role[Math.floor(Math.random() * role.length)]
        }
        return next
      })
    }, 2000)

    if (firstRender)
      setTimeout(() => {
        setFirstRender(false)
      }, 250)

    return () => clearInterval(interval)
  })

  return (
    <motion.div
      ref={container}
      className="flex h-screen w-full flex-col items-center justify-evenly bg-primary text-background"
      style={{ opacity }}
      id="patronus"
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
            <div className="mt-4 flex flex-col items-center justify-center gap-5 md:flex-row">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="min-w-[30ch] text-justify md:mr-5"
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

              <div className="flex items-center justify-center gap-5">
                <Contacts
                  link="https://github.com/iannn07"
                  inactiveIcon={<IconBrandGithub size={50} strokeWidth={1} />}
                  activeIcon={
                    <IconBrandGithubFilled size={50} strokeWidth={1} />
                  }
                />
                <Contacts
                  link="https://www.linkedin.com/in/pristian-budi-dharmawan/"
                  inactiveIcon={<IconBrandLinkedin size={50} strokeWidth={1} />}
                  activeIcon={
                    <IconBrandLinkedinFilled size={50} strokeWidth={1} />
                  }
                />
                <Contacts
                  link="https://storage.googleapis.com/resume-ian/Pristian%20Budi%20Dharmawan%20CV%20(12.01.25).pdf"
                  inactiveIcon={
                    <h1 className="flex items-center justify-center rounded-[0.6rem] border-2 border-black p-[7px]">
                      CV
                    </h1>
                  }
                  activeIcon={
                    <h1 className="flex items-center justify-center rounded-[0.6rem] border-2 border-primary bg-black p-[7px] text-primary">
                      CV
                    </h1>
                  }
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default HomeSection3
