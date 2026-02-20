import withPWA from 'next-pwa'

const withPWAFunc = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

export default withPWAFunc(nextConfig)
