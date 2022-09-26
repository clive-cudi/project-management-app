// /** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXTAUTH_URL: "http://localhost:3000",
    BACKEND_API_URL: "http://localhost:4767"
  }
}

module.exports = nextConfig
