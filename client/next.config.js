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
    NEXTAUTH_URL: "http://localhost:3000",
    BACKEND_API_URL: "http://localhost:4767"
  }
}

module.exports = nextConfig
