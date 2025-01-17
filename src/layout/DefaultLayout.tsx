"use client"

import { AppSidebar } from "@/components/app-sidebar"
import Loader from "@/components/misc/Loader"
import { SidebarProvider } from "@/components/ui/sidebar"
import { LoaderProvider, useLoader } from "@/context/LoaderContext"
import "@/css/style.css"
import React, { useEffect, useState } from "react"

function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <LoaderProvider>
      <SidebarProvider>
        <AppSidebar />
        {/* <Content> */}
        {children}
        {/* </Content> */}
      </SidebarProvider>
    </LoaderProvider>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  const { hasLoaded, setHasLoaded } = useLoader()
  const [loading, setLoading] = useState(!hasLoaded)

  useEffect(() => {
    if (!hasLoaded) {
      const load = setTimeout(() => {
        setLoading(false)
        setHasLoaded(true)
      }, 5000)

      return () => clearTimeout(load)
    }
  }, [hasLoaded, setHasLoaded])

  return loading ? <Loader /> : <>{children}</>
}

export default DefaultLayout
