import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { Badge } from './badge'

interface ProjectCardProps {
  issuer: string
  title: string
  image?: string
  roles: string[]
  range: number[]
}

function ProjectCard({ issuer, title, image, roles, range }: ProjectCardProps) {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'center start'],
  })

  const opacity = useTransform(scrollYProgress, range, [0, 1])

  return (
    <motion.div
      className="flex min-h-[40vh] w-full gap-10 rounded-2xl bg-background-secondary pl-5 pt-5 transition-transform duration-300 ease-in-out hover:rotate-[1deg] hover:shadow-xl md:pl-10 md:pt-10"
      style={{ opacity }}
      ref={container}
    >
      <div className="flex w-full flex-col justify-between pb-5">
        <h1 className="text-xl text-muted-foreground md:text-heading-6">
          {issuer}
        </h1>
        <h1 className="h-full text-heading-3 font-medium md:text-heading-2">
          {title}
        </h1>
        <div className="flex w-full flex-col gap-2">
          <div className="flex gap-2">
            {roles.map((role, index) => (
              <Badge key={index} variant="secondary" className="w-fit">
                {role}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      {image && (
        <div className="flex w-3/4 items-end rounded-tl-3xl">
          <Image
            src={image}
            alt={title}
            className="h-full w-full rounded-tl-3xl object-cover object-left"
            width={700}
            height={700}
          />
        </div>
      )}
    </motion.div>
  )
}

export default ProjectCard
