import { IconChevronDown } from '@tabler/icons-react'
import {
  animate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function rpmToKph(rpm: number) {
  const TIRE_CIRCUMFERENCE = 2.02
  const SINGLE_GEAR_RATIO = 6.06
  const rawKph = (rpm * TIRE_CIRCUMFERENCE * 60) / 1000 / SINGLE_GEAR_RATIO

  return Math.min(160, Math.round(Math.abs(rawKph)))
}

function HomeSection1() {
  const [rpm, setRpm] = useState(1000)
  const [kph, setKph] = useState(0)

  const count = useMotionValue(1000)
  const container = useRef(null)

  const { scrollY } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  })

  const scrollVelocity = useVelocity(scrollY)

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })

  const absVelocity = useTransform(smoothVelocity, (v) => Math.abs(v))

  const scrollBasedRpm = useTransform(absVelocity, [0, 1], [1000, 15000], {
    clamp: true,
  })

  const idleIntervalRef = useRef<NodeJS.Timer | null>(null)

  useEffect(() => {
    const unsubscribe = smoothVelocity.on('change', (currVel) => {
      const speed = Math.abs(currVel)

      if (!idleIntervalRef.current) {
        idleIntervalRef.current = setInterval(() => {
          const randomIdleRpm =
            Math.floor(Math.random() * (1100 - 1050 + 1)) + 1000

          animate(count, randomIdleRpm, {
            duration: 0.8,
            ease: 'easeInOut',
            onUpdate: (val) => {
              const currentRpm = Math.round(Math.abs(val))
              setRpm(currentRpm)
              setKph(0)
            },
          })
        }, 500)
      }

      if (speed > 0.01) {
        if (idleIntervalRef.current) {
          clearInterval(idleIntervalRef.current as unknown as number)
          idleIntervalRef.current = null
        }

        const targetRpm = scrollBasedRpm.get()
        animate(count, targetRpm, {
          duration: 0.8,
          ease: 'easeInOut',
          onUpdate: (val) => {
            const currentRpm = Math.round(Math.abs(val))
            setRpm(currentRpm)
            setKph(rpmToKph(currentRpm))
          },
        })
      }
    })

    return () => {
      unsubscribe()
      if (idleIntervalRef.current)
        clearInterval(idleIntervalRef.current as unknown as number)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={container} className="mx-5 h-screen text-primary">
      <div className="flex h-[75%] flex-col items-center justify-center will-change-transform md:h-[90%]">
        <div className="grid w-full max-w-5xl grid-cols-2 text-5xl font-bold italic md:text-[10rem]">
          <h1 className="text-right">{rpm}</h1>
          <h1>RPM</h1>
        </div>
        <h1 className="mr-10 w-full max-w-6xl text-right text-5xl font-bold italic md:mr-36 md:text-[10rem]">
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
