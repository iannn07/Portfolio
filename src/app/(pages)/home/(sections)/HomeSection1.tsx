'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar } from '@/components/ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { IconChevronDown, IconCircleCheckFilled } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const role = [
  'Software Engineer I',
  'Junior Software Engineer',
  'Full Stack Developer',
  'AI Enthusiast',
]

function HomeSection1() {
  const [firstRender, setFirstRender] = useState(true)
  const [changeRole, setChangeRole] = useState(role[1])

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
    <div className="md:h-screen">
      <div className="flex h-[90%] w-full flex-col items-center justify-evenly text-white">
        <div className="flex w-full flex-col items-center justify-center gap-5 md:gap-10">
          <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:gap-16">
            <motion.div
              initial={{ rotateY: 45, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
            >
              <Avatar className="h-48 w-48 overflow-hidden shadow-md">
                <AvatarImage
                  src="/images/avatar/Avatar 1.jpg"
                  alt="Pristian Budi Dharmawan"
                  className="translate-y-[-30px] scale-[3] object-cover"
                  height={400}
                  width={400}
                  fetchPriority="high"
                />
              </Avatar>
            </motion.div>
            <div className="flex w-full max-w-md flex-col items-center gap-3 text-center md:w-auto md:items-start md:text-left">
              <span className="text-3xl">Hi there👋🏻 I&apos;m </span>
              <motion.h1
                initial={{ rotateY: 45, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="text-3xl font-bold md:text-4xl"
              >
                Pristian Budi <br /> Dharmawan
              </motion.h1>
              <motion.h2
                initial={{ rotateY: 45, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl font-medium md:text-2xl"
              >
                or... just call me{' '}
                <span className="font-bold text-secondary">Ian.</span>
              </motion.h2>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ rotateY: 45, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={firstRender ? { delay: 0.75 } : {}}
            className="min-w-[25ch] text-justify"
          >
            <Alert className="w-full">
              <IconCircleCheckFilled />
              <AlertTitle className="md:ml-2">A passionate</AlertTitle>
              <motion.div
                key={changeRole}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AlertDescription className="md:ml-2">
                  {changeRole}
                </AlertDescription>
              </motion.div>
            </Alert>
          </motion.button>
        </div>
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        className="flex w-full flex-col items-center gap-5"
      >
        <h1>let&apos;s accelerate our bike!</h1>
        <IconChevronDown className="animate-bounce" />
      </motion.div>
    </div>
  )
}

export default HomeSection1
