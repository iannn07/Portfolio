'use client'

import { useEffect, useState } from 'react'
import { Progress } from '../ui/progress'

const Loader = () => {
  const [progress, setProgress] = useState(25)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 25
      )
    }, 500)
    return () => clearInterval(interval)
  })

  return (
    <div className='flex h-screen items-center justify-center'>
      <Progress className='w-1/2 bg-transparent text-white' value={progress} />
    </div>
  )
}

export default Loader
