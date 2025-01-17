"use client"

import { animate, motion, useMotionValue, useTransform } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Progress } from "../ui/progress"

const Loader = () => {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (value) => Math.round(value))
  const [progress, setProgress] = useState(0)
  const [currentGif, setCurrentGif] = useState("/images/gifs/piston.gif")

  const [currentMessage, setCurrentMessage] = useState(
    "Pressing the start button...",
  )

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 5,
      onUpdate: (latest) => {
        setProgress(latest)
        let message
        let gifPath

        switch (true) {
          case latest >= 95:
            message = "Rev it!"
            gifPath = "/images/gifs/motorbike.gif"
            break
          case latest >= 85:
            message = "Heating up..."
            gifPath = "/images/gifs/turbo.gif"
            break
          case latest >= 75:
            message = "Almost there..."
            gifPath = "/images/gifs/settings.gif"
            break
          case latest >= 50:
            message = "Starting the ignition..."
            gifPath = "/images/gifs/crankshaft.gif"
            break
          case latest >= 25:
            message = "Activates the starter..."
            gifPath = "/images/gifs/piston.gif"
            break
          default:
            message = "Pressing the start button..."
            gifPath = "/images/gifs/engine.gif"
        }

        if (currentMessage !== message) setCurrentMessage(message)
        if (currentGif !== gifPath) setCurrentGif(gifPath)
      },
    })

    return () => controls.stop()
  }, [count, currentGif, currentMessage])

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="flex w-full items-center justify-center gap-5">
        <motion.h1
          key={currentMessage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="font-medium md:text-heading-4"
        >
          {currentMessage}
        </motion.h1>
        <motion.div
          key={currentGif}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={currentGif}
            alt="Loader"
            width={200}
            height={200}
            className="h-10 w-10 object-cover md:h-20 md:w-20"
            unoptimized
          />
        </motion.div>
      </div>
      <div className="flex w-full items-center justify-center gap-5">
        <Progress className="w-1/2 md:h-4" value={progress} />
        <span className="hidden items-center text-xl md:flex">
          <motion.div>{rounded}</motion.div>%
        </span>
      </div>
    </div>
  )
}

export default Loader
