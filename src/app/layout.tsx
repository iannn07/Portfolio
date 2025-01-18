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
    <html lang="en" className="h-full bg-primary">
      <body
        suppressHydrationWarning
        className="min-h-screen font-poppins antialiased"
      >
        <DefaultLayout>{children}</DefaultLayout>
      </body>
    </html>
  )
}
