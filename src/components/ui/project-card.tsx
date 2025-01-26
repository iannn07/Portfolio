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
    offset: ['start end', 'start start'],
  })

  const opacity = useTransform(scrollYProgress, range, [0, 1])

  return (
    <motion.div
      className="flex w-full flex-col rounded-xl bg-background-secondary p-5 transition-transform duration-300 ease-in-out hover:rotate-[1deg] hover:shadow-xl md:min-h-[40vh] md:flex-row md:gap-10 md:rounded-2xl md:p-0 md:pl-10 md:pt-10"
      style={{ opacity }}
      ref={container}
    >
      <div className="flex w-full flex-col justify-between pb-5">
        <h1 className="text-xl text-muted-foreground md:text-heading-6">
          {issuer}
        </h1>
        <h1 className="h-full text-heading-4 font-medium md:text-heading-3">
          {title}
        </h1>
        <div className="mt-5 flex w-full flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            {roles.map((role, index) => (
              <Badge key={index} variant="secondary" className="w-fit">
                {role}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      {image && (
        <div className="flex w-full justify-center rounded-br-2xl rounded-tl-3xl md:w-3/4 md:items-end md:justify-normal">
          <Image
            src={image}
            alt={title}
            className="h-full w-full rounded-lg object-cover object-left md:rounded-br-2xl md:rounded-tl-3xl"
            width={700}
            height={700}
          />
        </div>
      )}
    </motion.div>
  )
}

export default ProjectCard
