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
import { useIsMobile } from '@/hooks/use-mobile'

interface PhilosophyCardProps {
  title: string
  content: React.ReactNode
  badges: string[]
  scrollYProgress: MotionValue<number>
  start: number
  end: number
}

function PhilosophyCard({
  title,
  content,
  badges,
  scrollYProgress,
  start,
  end,
}: PhilosophyCardProps) {
  const isMobile = useIsMobile()

  const scaleCard = useTransform(scrollYProgress, [start, end], [0.2, 1])
  const showCard = useTransform(scrollYProgress, [start, end], [0, 1])

  return (
    <motion.div
      className="flex w-full"
      style={isMobile ? { scale: scaleCard, opacity: showCard } : undefined}
    >
      <Card className="flex h-full flex-col justify-between bg-primary">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{content}</CardDescription>
        </CardContent>
        <CardFooter className="flex w-full flex-wrap justify-center gap-2">
          {badges.map((badge, index) => (
            <Badge key={index} variant="outline">
              {badge}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default PhilosophyCard
