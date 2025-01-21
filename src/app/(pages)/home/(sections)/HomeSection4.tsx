import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

function HomeSection4() {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  })

  const expandSeparator = useTransform(scrollYProgress, [0, 0.25], [0, 100])
  const separatorDynamicWidth = useTransform(expandSeparator, (v) => `${v}%`)

  const scale = useTransform(scrollYProgress, [0.1, 0.3], [0.4, 1])
  const slideBox = useTransform(scrollYProgress, [0.1, 0.3], [150, 0])
  const showPatronus = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])

  const showPatronusDescription = useTransform(
    scrollYProgress,
    [0.1, 0.3],
    [0, 1],
  )

  const titles = ['Start with Why?', 'Negative Space Programming', 'SMRF']

  const contents = ['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum']

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
    <div ref={container} className="flex min-h-screen w-full flex-col gap-5">
      <div className="flex w-full flex-col justify-center gap-2">
        <h1 className="text-heading-2 font-bold">Expecto Patronum!</h1>
        <motion.div
          style={{ width: separatorDynamicWidth }}
          className="max-w-full"
        >
          <Separator className="bg-background" />
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: showPatronusDescription }}
        className="flex flex-col gap-2"
      >
        <p>
          As a kid who is always eager to learn new things, super attentive to
          the details (IDK whether I have an OCD or not 😅), and delivers great
          ideas, and solutions I am always eager to learn new things and share
          my expertise with others.
        </p>
        <p>
          Currently, I&apos;m in my seventh semester of college and working on
          the Axolotl Project (you can find the details below) and having an
          internship as a Software Engineer at PT Kalbe Farma Tbk (The Largest
          Healthcare Private Company in Indonesia) to build several projects for
          them and enhance their business processes using automation tools.
        </p>
        <p>
          In my development journey, I proudly identify as a T-shaped developer
          with a strong passion for Full Stack. However, I&apos;m also learning
          about AI to help me build something more scalable, with larger and
          broader implications for society by looking at some problems or SDGs.
          Regardless of that, I have two main philosophies as a Developer, the
          first one is coming from Simon Sinek, and the second one is something
          that is called “Negative Space Programming”
        </p>
      </motion.div>

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
