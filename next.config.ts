import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Optimize build performance
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
}
 
export default nextConfig