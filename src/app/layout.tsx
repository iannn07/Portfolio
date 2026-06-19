import { Providers } from '@/components/providers/Providers'
import '@/css/style.css'
import '@/css/portfolio-v2.css'
import { Metadata } from 'next'
import { Cormorant_Garamond, IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-display',
})

const ibmPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Pristian Budi Dharmawan — Full Stack Engineer',
  description:
    'Full-stack software engineer specialising in scalable web applications, ELT data pipelines, and AI integration.',
  keywords: ['Software Engineer', 'Agentic AI', 'Full Stack Developer', 'React', 'Next.js', 'TypeScript'],
  openGraph: { title: 'Pristian Budi Dharmawan — Full Stack Engineer', type: 'website' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${ibmPlex.variable} ${jetbrainsMono.variable}`}
    >
      <body suppressHydrationWarning style={{ margin: 0 }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
