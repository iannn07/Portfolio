interface ProjectProps {
  issuer: string
  title: string
  image?: string
  roles: string[]
  range: number[]
  demoLink?: string
  postLink?: string
}

export const Projects: ProjectProps[] = [
  {
    issuer: 'Thesis - Final Year Project',
    title: 'Axolotl - Your Caregiver',
    image: '/images/projects/axolotl/1.png',
    roles: ['Fullstack Developer', 'ML Engineer', 'DevOps', 'Designer'],
    range: [0.1, 0.2],
    demoLink:
      'https://axolotl-your-caregiver-257622146567.asia-southeast1.run.app/',
    postLink:
      'https://www.linkedin.com/posts/pristian-budi-dharmawan_computerscience-webapp-web-activity-7277585987701035008-oxLG?utm_source=share&utm_medium=member_desktop',
  },
  {
    issuer: 'Codédex - Holiday Hackathon (Dec 13 - 15, 2024)',
    title: 'Old Gartic.io',
    image: '/images/projects/gartic/1.png',
    roles: ['Fullstack Developer', 'Supabase'],
    range: [0.125, 0.225],
    demoLink: 'https://old-gartic.vercel.app/',
    postLink:
      'https://www.linkedin.com/posts/pristian-budi-dharmawan_on-december-13-15-2024-i-participated-activity-7274800974110584832-WBkH?utm_source=share&utm_medium=member_desktop',
  },
  {
    issuer: 'Utility - TanStack Table Date Filter',
    title: 'Custom Date FilterFn',
    image: '/images/projects/tanstack/1.png',
    roles: ['Open Source Contributor'],
    range: [0.15, 0.25],
    postLink: 'https://github.com/TanStack/table/discussions/5829',
  },
  {
    issuer: 'College - Mobile App',
    title: 'MedExpert - Medical Education App',
    image: '/images/projects/medexpert/1.png',
    roles: ['Flutter Developer', 'ML Engineer', 'Designer'],
    range: [0.175, 0.275],
    postLink: 'https://youtu.be/ppB0mTmSyhg',
  },
  {
    issuer: 'College - Big Data Analytics',
    title:
      'Forecasting the Return on Investment (ROI) for a New House in Melbourne',
    image: '/images/projects/bda/1.png',
    roles: ['Data Scientist', 'Regression', 'Feed Forward Neural Network'],
    range: [0.2, 0.3],
    postLink: 'https://github.com/iannn07/S5-BDA-Project-House-ROI-Forecasting',
  },
  {
    issuer: 'College - Data Visualisation',
    title:
      'Unveiling the Top Performing Sectors Market in The Last Three Years of Indonesia Stock Market',
    image: '/images/projects/davis/1.png',
    roles: ['Data Analysis', 'Tableau'],
    range: [0.225, 0.325],
    postLink:
      'https://public.tableau.com/app/profile/pristian.budi.dharmawan/vizzes',
  },
  {
    issuer: 'College - Augmented Reality',
    title: 'NavLib - Augmented Reality Indoor Navigation System for Library',
    image: '/images/projects/navlib/1.png',
    roles: ['C# Developer', 'Immersal SDK', 'Unity'],
    range: [0.25, 0.35],
    postLink: 'https://youtube.com/shorts/cLfUOyVmDG4',
  },
]
