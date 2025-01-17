import { SidebarTrigger } from "@/components/ui/sidebar"
import DefaultLayout from "@/layout/DefaultLayout"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pristian Budi Dharmawan | Software Engineer I",
  keywords: [
    "Front-End Developer",
    "Software Engineer",
    "Junior Software Engineer",
    "Software Engineer I",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
  ],
  openGraph: {
    title: "Pristian Budi Dharmawan | Software Engineer I",
    type: "website",
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
    <html lang="en">
      <body suppressHydrationWarning className="font-poppins antialiased">
        <DefaultLayout>
          <div className="flex min-h-screen overflow-hidden">
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  <SidebarTrigger className="flex" />
                  {children}
                </div>
              </main>
            </div>
          </div>
        </DefaultLayout>
      </body>
    </html>
  )
}
