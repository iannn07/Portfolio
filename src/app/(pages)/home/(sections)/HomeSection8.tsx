import SectionContainer from '@/components/ui/section-container'
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
      header="Projects"
    >
      abcdef
    </SectionContainer>
  )
}

export default HomeSection8
