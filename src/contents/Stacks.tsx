export interface SkillColumn {
  category: string
  skills: string[]
}

export const skillColumns: SkillColumn[] = [
  {
    category: 'Languages',
    skills: ['TypeScript / JavaScript', 'Python', 'Dart (Flutter)', 'SQL', 'Golang'],
  },
  {
    category: 'Frameworks',
    skills: ['Next.js / React', 'Node.js / Deno', 'FastAPI', 'Flutter', 'GSAP / Lenis'],
  },
  {
    category: 'DevOps & Infra',
    skills: [
      'Docker / Kubernetes',
      'GCP Cloud Run',
      'CI/CD Pipelines',
      'Supabase / PostgreSQL',
      'Microservices',
    ],
  },
  {
    category: 'AI & Data',
    skills: [
      'Agentic AI Systems',
      'ELT / ETL Pipelines',
      'Power Automate',
      'k6 / Jest / QA',
      'System Design',
    ],
  },
]

export const certBadges = [
  'Automation Developer Python L1',
  'Gemini API by Google',
  'SQL Intermediate',
  'SQL Basic',
  'Summa Cum Laude — GPA 3.94',
  'Best Paper Award',
]
