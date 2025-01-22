import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Paragraph from '@/components/ui/paragraph'
import { Separator } from '@/components/ui/separator'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

function HomeSection4() {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  })

  const expandSeparator = useTransform(scrollYProgress, [0.1, 0.3], [0, 100])
  const separatorDynamicWidth = useTransform(expandSeparator, (v) => `${v}%`)

  const scale = useTransform(scrollYProgress, [0.2, 0.375], [0.4, 1])
  const slideBox = useTransform(scrollYProgress, [0.2, 0.375], [150, 0])
  const showPatronus = useTransform(scrollYProgress, [0.2, 0.375], [0, 1])

  const titles = ['Start with Why?', 'Negative Space Programming', 'SMRF']

  const contents = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum sodales commodo. In posuere est bibendum libero varius, in varius felis ultrices. Sed eget pretium lectus, viverra feugiat est. Pellentesque nec diam et justo posuere interdum in quis risus. Vestibulum malesuada, libero id gravida efficitur, ante ex efficitur felis, non pulvinar felis ante a sapien',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum sodales commodo. In posuere est bibendum libero varius, in varius felis ultrices. Sed eget pretium lectus, viverra feugiat est. Pellentesque nec diam et justo posuere interdum in quis risus. Vestibulum malesuada, libero id gravida efficitur, ante ex efficitur felis, non pulvinar felis ante a sapien',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum sodales commodo. In posuere est bibendum libero varius, in varius felis ultrices. Sed eget pretium lectus, viverra feugiat est. Pellentesque nec diam et justo posuere interdum in quis risus. Vestibulum malesuada, libero id gravida efficitur, ante ex efficitur felis, non pulvinar felis ante a sapien',
  ]

  const renderCard = (titles: string[], contents: string[]) => {
    return titles.map((title, index) => (
      <Card key={index} className="bg-primary">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{contents[index]}</p>
        </CardContent>
      </Card>
    ))
  }

  return (
    <div
      className="flex min-h-screen w-full flex-col justify-center gap-5 pb-20"
      ref={container}
    >
      <div className="flex w-full flex-col justify-center gap-2">
        <h1 className="text-heading-2 font-bold">Expecto Patronum!</h1>
        <motion.div
          style={{ width: separatorDynamicWidth }}
          className="max-w-full"
        >
          <Separator className="bg-background" />
        </motion.div>
      </div>
      <Paragraph word="In my development journey, I proudly identify as a T-shaped developer with a strong passion for Full Stack. However, I'm also learning about AI to help me build something more scalable, with larger and broader implications for society by looking at some problems or SDGs. Regardless of that, I have two main philosophies as a Developer, the first one is coming from Simon Sinek, and the second one is something that is called “Negative Space Programming”" />
      <motion.div
        className="grid h-full w-full grid-cols-3 gap-5 rounded-3xl bg-background p-5 text-background shadow-md md:gap-10 md:p-10"
        style={{
          scale,
          y: slideBox,
          opacity: showPatronus,
        }}
      >
        {renderCard(titles, contents)}
      </motion.div>
    </div>
  )
}

export default HomeSection4
