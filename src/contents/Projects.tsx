export interface Project {
  num: string
  label: string
  name: string
  description: string
  tags: string[]
  linkType: 'external' | 'stealth' | 'internal'
  link?: string
}

export const allProjects: Project[] = [
  {
    num: '01',
    label: 'Enterprise · Production · KLBF',
    name: 'SCM Digital Twin',
    description:
      'Digital twin of the FG → Intermediate → MRP manufacturing cascade. SSE-streamed, job-queued Supabase RPC operations. AES-256-GCM encrypted URL state, 19 XLSX streaming download routes. 3 SBUs · hundreds of thousands of records → actionable entries.',
    tags: ['Next.js 15', 'Supabase', 'PostgreSQL', 'Keycloak', 'TypeScript', 'Azure K8s'],
    linkType: 'internal',
  },
  {
    num: '02',
    label: 'Thesis · AI Healthcare · Open Source',
    name: 'Axolotl — Your Caregiver',
    description:
      'Full-stack healthcare platform with a Random Forest Classifier trained on 133 symptoms. 96.45% diagnostic accuracy. E2E test coverage, DB data-flow verification, and clinical workflow integration.',
    tags: ['Next.js', 'FastAPI', 'Python', 'Random Forest', 'Supabase', 'Jest'],
    linkType: 'external',
    link: 'https://github.com/iannn07/Axolotl',
  },
  {
    num: '03',
    label: 'Venture · Clinical Research · TypeScript',
    name: 'Optimus',
    description:
      'Multi-tenant SaaS for pharmaceutical clinical trial management. RBAC hierarchy (T0–T3), PHI Guard on every AI entry point, RAG-powered document intelligence. 49-module regulatory spec · 4-tier RBAC.',
    tags: ['Next.js 16', 'Supabase', 'PostgreSQL', 'Tailwind', 'shadcn/ui', 'Keycloak'],
    linkType: 'stealth',
  },
  {
    num: '04',
    label: 'Stealth Venture · Systems · Rust',
    name: '[CALLSIGN: MERIDIAN]',
    description:
      'Self-hosted outcome-based LLM routing gateway. CARROT, BELLA, and xRouter algorithms from arXiv. OpenAI-compatible API surface, Tower middleware, SurrealDB ledger, Redis L2 cache, HNSW semantic cache. Built solo in Rust.',
    tags: ['Rust', 'Axum', 'Tokio', 'SurrealDB', 'Redis', 'Ratatui'],
    linkType: 'stealth',
  },
  {
    num: '05',
    label: 'Enterprise · Regulatory · KLBF',
    name: 'K-RIM',
    description:
      'Kalbe Regulatory Information Management — pharmaceutical regulatory submission management with Keycloak/LDAP auth, OnlyOffice Document Server integration, Synology NAS + Azure Blob, WAF layer, self-hosted Kubernetes.',
    tags: ['Next.js 16', 'Keycloak', 'OnlyOffice', 'Kubernetes', 'Tailwind'],
    linkType: 'internal',
  },
  {
    num: '06',
    label: 'Stealth Venture · Mobile · Consumer',
    name: '[CALLSIGN: WEEKEND]',
    description:
      "Hyper-local social discovery mobile app — TikTok-style feed surfacing what's happening in your area in real time. Technical Lead over 2 engineers. Google Cloud deployment.",
    tags: ['React Native', 'GCP', 'Real-time', 'Location'],
    linkType: 'stealth',
  },
]
