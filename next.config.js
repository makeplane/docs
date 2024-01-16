const withMarkdoc = require('@markdoc/next.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/self-hosting',
        destination: '/self-hosting/docker-compose',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md'],
  experimental: {
    scrollRestoration: true,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = withMarkdoc()(nextConfig)
