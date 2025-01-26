import { ReactLenis } from '@/components/lenis/lenis'
import '@/css/style.css'
import DefaultLayout from '@/layout/DefaultLayout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pristian Budi Dharmawan | Software Engineer I',
  keywords: [
    'Front-End Developer',
    'Software Engineer',
    'Junior Software Engineer',
    'Software Engineer I',
    'React',
    'Next.js',
    'TypeScript',
    'Web Development',
  ],
  openGraph: {
    title: 'Pristian Budi Dharmawan | Software Engineer I',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full bg-background">
      <body
        suppressHydrationWarning
        className="min-h-screen overflow-x-hidden font-poppins antialiased"
        style={{ margin: 0, scrollBehavior: 'smooth' }}
      >
        <ReactLenis
          root
          options={{ duration: 4, overscroll: false, wheelMultiplier: 0.25 }}
        >
          <DefaultLayout>{children}</DefaultLayout>
        </ReactLenis>
      </body>
    </html>
  )
}
