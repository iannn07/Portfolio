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
      <div className="flex min-h-screen w-full bg-primary text-white">
        <SidebarProvider>
          <AppSidebar />
          <div className="flex w-full flex-col">
            {isMobile && <SidebarTrigger />}
            {children}
          </div>
        </SidebarProvider>
      </div>
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
