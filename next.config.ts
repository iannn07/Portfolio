import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
        locale: false,
      },
    ]
  },
}

export default nextConfig
