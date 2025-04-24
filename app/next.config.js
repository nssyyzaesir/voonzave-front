/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'your-production-domain.com'],
  },
  env: {
    // Define aqui seus environment variables
    API_URL: process.env.API_URL || 'http://localhost:5000',
  }
};

module.exports = nextConfig;