'use client'

import { AppSidebar } from '@/components/app-sidebar'
import Loader from '@/components/misc/Loader'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { LoaderProvider, useLoader } from '@/context/LoaderContext'
import '@/css/style.css'
import { useIsMobile } from '@/hooks/use-mobile'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isMobile = useIsMobile()

  return (
    <LoaderProvider>
      <Content>
        <div className="flex min-h-screen w-full text-white">
          {isMobile ? (
            <SidebarProvider>
              <AppSidebar />
              <div className="flex w-full flex-col">
                {isMobile && <SidebarTrigger />}
                {children}
              </div>
            </SidebarProvider>
          ) : (
            <div className="flex w-full flex-col">{children}</div>
          )}
        </div>
      </Content>
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
      }, 10250)

      return () => clearTimeout(load)
    }
  }, [hasLoaded, setHasLoaded])

  const slideVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  }

  return loading ? (
    <Loader />
  ) : (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  )
}

export default DefaultLayout
