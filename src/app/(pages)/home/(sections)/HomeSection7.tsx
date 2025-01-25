import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function HomeSection7() {
  const passion = [
    'healthcare',
    'engineering',
    'web3',
    'ai',
    'cloud computing',
    'and more!',
  ]

  const [firstRender, setFirstRender] = useState(true)
  const [changePassion, setChangePassion] = useState(passion[1])

  useEffect(() => {
    const interval = setInterval(() => {
      setChangePassion((prev) => {
        let next = passion[Math.floor(Math.random() * passion.length)]
        while (next === prev) {
          next = passion[Math.floor(Math.random() * passion.length)]
        }
        return next
      })
    }, 2000)

    if (firstRender) {
      setTimeout(() => {
        setFirstRender(false)
      }, 250)
    }

    return () => clearInterval(interval)
  })

  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)

  const inView1 = useInView(ref1, { once: true })
  const inView2 = useInView(ref2, { once: true })
  const inView3 = useInView(ref3, { once: true })

  const getPassionAnimation = (isFirstRender: boolean) => ({
    initial: isFirstRender ? { opacity: 0, y: 50 } : { opacity: 0 },
    animate: isFirstRender
      ? { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.6 } }
      : { opacity: 1, y: 0, transition: { duration: 0.6 } },
  })

  return (
    <div className="flex h-screen w-full items-center px-10 md:px-20">
      <div className="text-heading-2 font-medium md:text-heading-1">
        <motion.h1
          ref={ref1}
          initial={{ opacity: 0, y: 50 }}
          animate={
            inView1
              ? { opacity: 1, y: 0, transition: { duration: 0.6 } }
              : { opacity: 0, y: 50 }
          }
        >
          A developer
        </motion.h1>
        <motion.h1
          ref={ref2}
          initial={{ opacity: 0, y: 50 }}
          animate={
            inView2
              ? { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } }
              : { opacity: 0, y: 50 }
          }
        >
          who fall in love with
        </motion.h1>
        <motion.h1
          key={changePassion}
          ref={ref3}
          {...getPassionAnimation(firstRender)}
          animate={
            inView3
              ? firstRender
                ? {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: 0.6 },
                  }
                : {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6 },
                  }
              : firstRender
                ? { opacity: 0, y: 50 }
                : { opacity: 0, y: 50 }
          }
        >
          {changePassion}
        </motion.h1>
      </div>
    </div>
  )
}

export default HomeSection7
