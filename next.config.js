const withMarkdoc = require('@markdoc/next.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'ts', 'tsx'],
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = withMarkdoc()(nextConfig)
