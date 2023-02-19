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
    AWS_ACCESS_KEY_ID: `${process.env.AWS_ACCESS_KEY_ID}`,
    AWS_SECRET_ACCESS_KEY: `${process.env.AWS_SECRET_ACCESS_KEY}`,
  }
}

module.exports = nextConfig;

// BACKEND_API_URL = http://pmt-backend-env.eba-p64t83w3.us-east-1.elasticbeanstalk.com
