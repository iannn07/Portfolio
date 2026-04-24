import { ReactLenis } from '@/components/lenis/lenis'
import GSAPProvider from '@/components/gsap/GSAPProvider'
import '@/css/style.css'
import '@/css/portfolio-v2.css'
import { Metadata } from 'next'
import { Playfair_Display, DM_Sans, DM_Mono } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Pristian Budi Dharmawan — Software Engineer · Agentic AI Builder',
  description:
    'Full-stack software engineer specialising in scalable web applications, ELT data pipelines, and AI integration.',
  keywords: [
    'Software Engineer',
    'Agentic AI',
    'Full Stack Developer',
    'React',
    'Next.js',
    'TypeScript',
  ],
  openGraph: {
    title: 'Pristian Budi Dharmawan — Software Engineer · Agentic AI Builder',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body suppressHydrationWarning style={{ margin: 0 }}>
        <ReactLenis root options={{ lerp: 0.08, smoothWheel: true, overscroll: false }}>
          <GSAPProvider />
          {children}
        </ReactLenis>
      </body>
    </html>
  )
}
