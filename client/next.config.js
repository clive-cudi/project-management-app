// /** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "source.unsplash.com"
    ]
  },
  env: {
    NEXTAUTH_URL: `${process.env.NEXTAUTH_URL}`,
    BACKEND_API_URL: `${process.env.BACKEND_API_URL}`,
  }
}

module.exports = nextConfig
