// Solar system section content — edit this file to update panels
// Each top-level export maps to one planet section in PlanetContent.tsx

// ── About ────────────────────────────────────────────────────────────────────

export interface AboutHighlight {
  label: string
  title: string
  sub?: string
}

export interface AboutData {
  bio: string[]
  highlights?: AboutHighlight[]
}

export const ABOUT: AboutData = {
  bio: [
    'Building my own spells for some new stuffs in the internet alongside with my Hedwig serving as my scalpel while conducting my surgery, which eventually becoming a Frankenstein.',
  ],
  highlights: [
    {
      label: 'Education',
      title: 'BINUS University — Computer Science',
      sub: 'Summa Cum Laude · GPA 3.94',
    },
    {
      label: 'Community',
      title: 'GDSC BINUS Malang — Chapter Lead',
      sub: 'Grew chapter 20 → 500+ members (25×)',
    },
  ],
}

// ── Work ─────────────────────────────────────────────────────────────────────

export interface WorkEntry {
  period: string
  role: string
  items: string[]
}

export const WORK: WorkEntry[] = [
  {
    period: 'Jun 2025 — Present',
    role: 'Software Engineer · PT Kalbe Farma Tbk',
    items: [
      'Crafted things here and there, from requirements, research, architecture to deployment.',
      'Lead for several projects that should be qualified thru Computer System Validation (CSV/IQ/OQ/PQ)',
      'Lead the full development of Supply Chain Management (MPS → MRP), Clinical Trial Management System (CTMS) integrated with AI/RAG pipeline, and Calendar of Event Management',
      'R&D for the product specifications of the projects to decide the tech stacks, feature, and architecture',
      'Support the second phase of the previous RIS & PACS development',
      'Built and shipped an internal AI assistant platform as an IC for ~1,000 users',
      'Engineered 150+ enterprise automation flows in Power Automate across 2 divisions',
      'Being a DevOps engineer for the internal CI/CD pipeline, including the deployment of the projects in Azure Kubernetes Service (AKS) and OpenShift',
      'Developed Gunawan Protocol, a defensive programming standard for Agentic Development Lifecycle (ADLC) as the standard for the internal AI assistant development',
      'Mentored 7+ wizard interns and several junior wizards across those products',
    ],
  },
  {
    period: 'Feb 2024 — Jun 2025',
    role: 'Software Engineer Intern · PT Kalbe Farma Tbk',
    items: [
      'Crafted Radiology Information System (RIS) Phase 1 development for 3 major product features in Next.js + Supabase, improving Lighthouse performance scores from 20–30 to ~70–90 — a 3–4× improvement.',
      'Founded several new spells to automate cross-division workflows using Power Automate, allowing them to sip coffee while the system does the work for them.',
      'Added my main ingredients for my spells, Negative Space Programming as team-wide defensive coding standard',
    ],
  },
]

// ── Ventures ─────────────────────────────────────────────────────────────────

export interface VentureEntry {
  callsign: string
  status: string
  role: string
  description: string
  tags: string[]
}

export const VENTURES: VentureEntry[] = [
  {
    callsign: '[CALLSIGN: MERIDIAN]',
    status: '2026 — Present · Stealth',
    role: 'Researcher + Product Owner',
    description:
      'Crafting my spells thru reading these academic papers across several journals, which have been implemented for LLM routing. Stopping me for paying decent amount for OpenRouter.',
    tags: [
      'Rust',
      'Axum',
      'Tokio',
      'SurrealDB',
      'Redis',
      'AI Pipelines',
      'LLM Routing',
      'Next.js',
      'React',
      'TypeScript',
    ],
  },
  {
    callsign: '[CALLSIGN: WEEKEND]',
    status: '2026 — Present · Stealth',
    role: 'Technical Lead',
    description:
      'Research and crafted a local social discovery mobile app spell — TikTok-style feed surfacing what are the events/bazaar/workshops in your area alongside with my 2-engineers team.',
    tags: ['React Native', 'Expo', 'Google Cloud', 'Supabase'],
  },
]

// ── Skills ───────────────────────────────────────────────────────────────────

export interface SkillGroup {
  label: string
  items: string[]
}

export interface SkillsData {
  groups: SkillGroup[]
  achievements: string[]
}

export const SKILLS: SkillsData = {
  groups: [
    {
      label: 'Languages',
      items: ['TypeScript/JavaScript', 'Python', 'YAML'],
    },
    {
      label: 'DevOps',
      items: ['AKS', 'OpenShift', 'GCP Cloud Run', 'Docker', 'CI/CD'],
    },
    {
      label: 'Frameworks',
      items: ['Next.js / React', 'Node.js / Deno', 'FastAPI', 'Axum / Tokio'],
    },
    {
      label: 'Data & Automation',
      items: ['PostgreSQL/MySQL', 'Supabase', 'Power Automate'],
    },
    {
      label: 'AI / ML',
      items: [
        'Agentic Development',
        'Claude Code',
        'Cursor',
        'Azure OpenAI',
        'RAG Architecture',
        'pgvector',
      ],
    },
    {
      label: 'QA & Compliance',
      items: ['CSV (IQ/OQ/PQ)', 'k6', 'Lighthouse', 'Vitest'],
    },
    {
      label: 'Foreign Languages',
      items: ['English (Professional)', 'Mandarin - 中文 (Elementary)'],
    },
  ],
  achievements: ['Summa Cum Laude · GPA 3.94', 'Best Paper Award'],
}
