import ProjectCard from '@/components/ui/project-card'
import SectionContainer from '@/components/ui/section-container'
import { Projects } from '@/contents/Projects'
import { useScroll } from 'framer-motion'
import { useRef } from 'react'

function HomeSection8() {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  })

  return (
    <SectionContainer
      container={container}
      scrollYProgress={scrollYProgress}
      id="projects"
      header="Featured Work"
      shortDesc="Projects during my journey"
      className="py-20 md:py-40"
    >
      {Projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </SectionContainer>
  )
}

export default HomeSection8
