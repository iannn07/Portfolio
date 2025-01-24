import {
  Icon,
  IconBrandAngular,
  IconBrandAws,
  IconBrandAzure,
  IconBrandCss3,
  IconBrandFramerMotion,
  IconBrandHtml5,
  IconBrandMysql,
  IconBrandNextjs,
  IconBrandPython,
  IconBrandReact,
  IconBrandSupabase,
  IconBrandThreejs,
  IconBrandTypescript,
  IconBrandVue,
  IconProps,
} from '@tabler/icons-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

interface StackProps {
  category: string
  items: (ForwardRefExoticComponent<IconProps & RefAttributes<Icon>> | string)[]
}

export const stacks: StackProps[] = [
  {
    category: 'Frontend',
    items: [
      IconBrandHtml5,
      IconBrandCss3,
      IconBrandTypescript,
      IconBrandNextjs,
      IconBrandReact,
    ],
  },
  {
    category: 'Backend & ML',
    items: [
      IconBrandPython,
      '/images/logo/fastapi.svg',
      '/images/logo/sklearn.svg',
      '/images/logo/openai.svg',
      '/images/logo/tensorflow.svg',
    ],
  },
  {
    category: 'Design',
    items: [
      IconBrandFramerMotion,
      '/images/logo/figma.svg',
      '/images/logo/tailwind.svg',
      '/images/logo/mui.svg',
    ],
  },
  {
    category: 'Database',
    items: [IconBrandSupabase, IconBrandMysql],
  },
  {
    category: 'DevOps',
    items: [
      '/images/logo/docker.svg',
      '/images/logo/gcloud.svg',
      '/images/logo/gcloud-run.svg',
      '/images/logo/ubuntu.svg',
    ],
  },
  {
    category: 'Currently Learning',
    items: [
      IconBrandThreejs,
      IconBrandAngular,
      IconBrandVue,
      IconBrandAws,
      IconBrandAzure,
    ],
  },
]
