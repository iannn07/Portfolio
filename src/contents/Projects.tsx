export interface FeaturedProject {
  num: string
  badge: string
  title: string
  description: string
  highlight: string
  tags: string[]
  link: string
}

export interface GridProject {
  num: string
  category: string
  name: string
  description: string
  tags: string[]
  link: string
}

export const featuredProjects: FeaturedProject[] = [
  {
    num: '01',
    badge: 'Agentic AI · Active Development',
    title: 'Gunawan Agents',
    description:
      'Personal AI agent framework — the foundation of autonomous software development workflows. Building agents that plan, code, test, and deploy with minimal human intervention.',
    highlight: 'Agentic AI · Software Factory',
    tags: ['TypeScript', 'Agents', 'LLM', 'Automation'],
    link: 'https://github.com/iannn07',
  },
  {
    num: '02',
    badge: 'Mobile App · Local Discovery',
    title: 'The Weeknd Project',
    description:
      "A TikTok-style mobile app that surfaces what's hot in your current area — local spaces, events, and moments. Designed for real-time discovery and hyper-local social relevance.",
    highlight: 'Hyper-local social discovery',
    tags: ['React Native', 'Mobile', 'Real-time', 'Location'],
    link: 'https://github.com/iannn07',
  },
  {
    num: '03',
    badge: 'Thesis · AI Healthcare',
    title: 'Axolotl — Your Caregiver',
    description:
      'AI-powered healthcare platform with a Random Forest Classifier trained on 133 symptoms. Full-stack system with E2E test coverage, DB data-flow verification, and clinical workflow integration.',
    highlight: '96.45% diagnostic accuracy',
    tags: ['Next.js', 'FastAPI', 'Python', 'Random Forest', 'Supabase'],
    link: 'https://github.com/iannn07/Axolotl',
  },
]

export const gridProjects: GridProject[] = [
  {
    num: '04',
    category: 'Organisation',
    name: 'The Weeknd Organisation',
    description:
      'Contributing as <strong>Lead Software Engineer</strong> — building and architecting software systems within the organisation.',
    tags: ['Lead SE', 'Architecture'],
    link: 'https://github.com/iannn07',
  },
  {
    num: '05',
    category: 'OSS',
    name: 'TanStack Custom FilterFn',
    description:
      'Open-source contribution — custom filter functions including date range and IncludesSubString for React Table.',
    tags: ['React', 'TypeScript', 'Open Source'],
    link: 'https://github.com/iannn07/TanStack-Custom-FilterFn',
  },
  {
    num: '06',
    category: 'Healthcare',
    name: 'HL7 Deno Parser',
    description:
      'HL7 medical data protocol implementation in Deno — supporting digital radiology workflows.',
    tags: ['Deno', 'TypeScript', 'HL7'],
    link: 'https://github.com/iannn07/hl7-deno',
  },
  {
    num: '07',
    category: 'Mobile',
    name: 'MedExpert',
    description: 'Flutter mobile app for medical expertise. Watch the full demo on YouTube.',
    tags: ['Flutter', 'Dart', '▶ Demo'],
    link: 'https://www.youtube.com/watch?v=ppB0mTmSyhg&t=40s',
  },
  {
    num: '08',
    category: 'Data Science',
    name: 'House ROI Forecasting',
    description:
      'Big data project forecasting Melbourne property ROI using ML on historical pricing and market signals.',
    tags: ['Python', 'ML', 'Jupyter'],
    link: 'https://github.com/iannn07/S5-BDA-Project-House-ROI-Forecasting',
  },
  {
    num: '09',
    category: 'Hackathon',
    name: 'Old Gartic V2',
    description:
      'Codedex Holiday Hackathon entry — collaborative real-time drawing and guessing game.',
    tags: ['Real-time', 'Hackathon'],
    link: 'https://github.com/iannn07/Old-Gartic-V2',
  },
]
