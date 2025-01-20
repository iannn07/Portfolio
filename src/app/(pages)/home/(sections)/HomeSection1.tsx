import { IconChevronDown } from '@tabler/icons-react'
import {
  animate,
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import { useEffect, useState } from 'react'

interface HomeSection1Props {
  scrollYProgress: MotionValue<number>
}

function HomeSection1({ scrollYProgress }: HomeSection1Props) {
  const [rpm, setRpm] = useState(0)
  const [kph, setKph] = useState(0)

  const count = useMotionValue(0)
  const increaseKph = useTransform(scrollYProgress, [0, 0.5], [40, 150])
  const increaseRpm = useTransform(scrollYProgress, [0, 0.5], [1200, 7500])

  useEffect(() => {
    scrollYProgress.onChange((latest) => {
      if (latest > 0.2) {
        animate(count, 0, {
          duration: 2,
          ease: 'easeInOut',
          onUpdate: () => {
            increaseRpm.onChange((latest) => setRpm(Math.round(latest)))
            increaseKph.onChange((latest) => setKph(Math.round(latest)))
          },
        })
      } else {
        const interval = setInterval(() => {
          const randomValue =
            Math.floor(Math.random() * (1200 - 1000 + 1)) + 1000
          animate(count, randomValue, {
            duration: 2,
            ease: 'easeInOut',
            delay: 2,
            onUpdate: (latest) => {
              setRpm(Math.round(latest))
              setKph(0)
            },
          })
        }, 1000)

        return () => clearInterval(interval)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollYProgress])

  return (
    <div className="mx-5 h-screen text-primary">
      <div className="flex h-[75%] flex-col items-center justify-center will-change-transform md:h-[90%]">
        <div className="grid w-full max-w-xl grid-cols-2 px-4 text-6xl font-bold italic md:max-w-3xl md:text-[10rem]">
          <motion.h1 layout>{rpm}</motion.h1>
          <h1>RPM</h1>
        </div>
        <h1 className="w-full max-w-3xl text-right text-6xl font-bold italic md:text-[10rem]">
          {kph} km/h
        </h1>
      </div>
      <div className="flex w-full flex-col items-center gap-5">
        <h1>scroll to accelerate our bike!</h1>
        <IconChevronDown className="animate-bounce" />
      </div>
    </div>
  )
}

export default HomeSection1
