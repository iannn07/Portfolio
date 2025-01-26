import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function HomeSection7() {
  const passion = [
    'healthcare',
    'full-stack',
    'web development',
    'web3',
    'ai',
    'cloud computing',
    'and more!',
  ]

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

    return () => clearInterval(interval)
  })

  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)

  const inView1 = useInView(ref1, { once: true })
  const inView2 = useInView(ref2, { once: true })

  const passionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex h-[110vh] w-full items-center px-10 md:px-20">
      <div className="text-heading-2 font-medium md:text-heading-1">
        <motion.h1
          ref={ref1}
          initial={{ opacity: 0, y: 50 }}
          animate={inView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        >
          A developer
        </motion.h1>
        <motion.h1
          ref={ref2}
          initial={{ opacity: 0, y: 50 }}
          animate={inView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        >
          who fall in love with
        </motion.h1>
        <motion.h1
          ref={ref3}
          key={changePassion}
          variants={passionVariants}
          initial="hidden"
          animate="visible"
        >
          {changePassion}
        </motion.h1>
      </div>
    </div>
  )
}

export default HomeSection7
