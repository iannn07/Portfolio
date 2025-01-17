'use client'

import { AppSidebar } from '@/components/app-sidebar'
import Loader from '@/components/misc/Loader'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { LoaderProvider, useLoader } from '@/context/LoaderContext'
import '@/css/style.css'
import { useIsMobile } from '@/hooks/use-mobile'
import React, { useEffect, useState } from 'react'

function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isMobile = useIsMobile()

  return (
    <LoaderProvider>
      {/* <Content> */}
      <SidebarProvider>
        <AppSidebar />
        <div className="flex min-h-screen overflow-hidden">
          <div className="relative flex w-screen flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <main>
              <div className="mx-auto min-h-screen w-full max-w-screen-2xl p-4 px-8 transition-all duration-300 ease-in-out md:p-8">
                {isMobile && <SidebarTrigger className="flex" />}
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
      {/* </Content> */}
    </LoaderProvider>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Content({ children }: { children: React.ReactNode }) {
  const { hasLoaded, setHasLoaded } = useLoader()
  const [loading, setLoading] = useState(!hasLoaded)

  useEffect(() => {
    if (!hasLoaded) {
      const load = setTimeout(() => {
        setLoading(false)
        setHasLoaded(true)
      }, 9500)

      return () => clearTimeout(load)
    }
  }, [hasLoaded, setHasLoaded])

  return loading ? <Loader /> : <>{children}</>
}

export default DefaultLayout
