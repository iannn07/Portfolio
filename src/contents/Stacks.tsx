export interface SkillColumn {
  category: string
  skills: string[]
}

export interface CertBadge {
  label: string
  highlight?: boolean
}

export const skillColumns: SkillColumn[] = [
  {
    category: 'Languages',
    skills: ['TypeScript / JavaScript', 'Python', 'Rust', 'Dart', 'SQL', 'Go'],
  },
  {
    category: 'Frameworks',
    skills: ['Next.js / React', 'Axum / Tokio', 'Node.js / Deno', 'FastAPI', 'Flutter', 'GSAP / Lenis'],
  },
  {
    category: 'DevOps & Infra',
    skills: ['Docker · Kubernetes', 'AKS / OpenShift', 'GCP Cloud Run', 'Supabase · PostgreSQL', 'SurrealDB · Redis', 'Keycloak · CI/CD'],
  },
  {
    category: 'AI & Data',
    skills: ['Agentic AI Systems', 'LLM Routing', 'ELT / ETL Pipelines', 'RAG · pgvector', 'Power Automate', 'k6 / Jest / QA'],
  },
]

export const certBadges: CertBadge[] = [
  { label: 'Automation Developer Python L1' },
  { label: 'Gemini API by Google' },
  { label: 'SQL Intermediate' },
  { label: 'SQL Basic' },
  { label: 'Summa Cum Laude — GPA 3.94', highlight: true },
  { label: 'Best Paper Award', highlight: true },
]
