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
    GOOGLE_CLIENT_ID: `${process.env.GOOGLE_CLIENT_ID}`,
    GOOGLE_CLIENT_SECRET: `${process.env.GOOGLE_CLIENT_SECRET}`,
  }
}

module.exports = nextConfig
