'use client'

import Loader from '@/components/pages/Loader'
import '@/css/style.css'
import React, { useEffect, useState } from 'react'

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = setTimeout(() => setLoading(false), 2500)

    return () => clearTimeout(load)
  }, [])

  return (
    <html lang='en'>
      <body className='antialiased font-poppins'>
        {loading ? <Loader /> : children}
      </body>
    </html>
  )
}

export default Layout
