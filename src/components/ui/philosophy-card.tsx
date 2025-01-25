import { motion, MotionValue, useTransform } from 'framer-motion'
import { Badge } from './badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card'

interface PhilosophyCardProps {
  scrollYProgress: MotionValue<number>
  title: string
  content: React.ReactNode
  badges: string[]
  start: number
  end: number
}

function PhilosophyCard({
  scrollYProgress,
  title,
  content,
  badges,
  start,
  end,
}: PhilosophyCardProps) {
  const showPatronus = useTransform(scrollYProgress, [start, end], [0, 1])

  return (
    <motion.div
      className="flex h-full w-full flex-col gap-5 rounded-3xl bg-background p-5 text-background shadow-md"
      style={{ opacity: showPatronus }}
    >
      <div className="flex w-full">
        <Card className="flex h-full flex-col bg-primary">
          <CardHeader>
            <CardTitle className="text-heading-5 md:text-heading-4">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <CardDescription>{content}</CardDescription>
          </CardContent>
          <CardFooter className="flex w-full flex-wrap justify-center gap-2">
            {badges?.map((badge, index) => (
              <Badge key={index} variant="outline">
                {badge}
              </Badge>
            ))}
          </CardFooter>
        </Card>
      </div>
    </motion.div>
  )
}

export default PhilosophyCard
