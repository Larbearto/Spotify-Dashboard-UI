/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
}

module.exports = {
  images: {
    domains: ['rb.gy', 'i.scdn.co']
  }
}
