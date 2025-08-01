/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Make sure this is set for image optimization
  images: {
    domains: ['images.unsplash.com'], // Add any other domains you're using for images
  },
}

module.exports = nextConfig
