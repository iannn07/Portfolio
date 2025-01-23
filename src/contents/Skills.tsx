import TechStacks from '@/components/ui/tech-stacks'
import {
  IconBrandAngular,
  IconBrandAws,
  IconBrandAzure,
  IconBrandDocker,
  IconBrandFigma,
  IconBrandFramerMotion,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandTailwind,
  IconBrandTypescript,
  IconBrandVue,
} from '@tabler/icons-react'
import { MotionValue } from 'framer-motion'

interface TechStacksProps {
  scrollYProgress: MotionValue<number>
}

function Skills({ scrollYProgress }: TechStacksProps) {
  const stacks = [
    {
      category: 'Frontend',
      items: [
        IconBrandNextjs,
        IconBrandReact,
        IconBrandFramerMotion,
        IconBrandTypescript,
      ],
      range: [0.1, 0.3],
    },
    {
      category: 'Design',
      items: [IconBrandFigma, IconBrandTailwind, '/images/logo/mui.png'],
      range: [0.3, 0.5],
    },
    {
      category: 'DevOps',
      items: [IconBrandDocker, '/images/logo/gcloud.png'],
      range: [0.5, 0.6],
    },
    {
      category: 'Currently Learning',
      items: [IconBrandAngular, IconBrandVue, IconBrandAws, IconBrandAzure],
      range: [0.6, 0.7],
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-5">
      {stacks.map((stack, index) => (
        <TechStacks
          scrollYProgress={scrollYProgress}
          category={stack.category}
          items={stack.items}
          range={stack.range}
          key={index}
        />
      ))}
    </div>
  )
}

export default Skills
