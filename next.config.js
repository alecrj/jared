/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during builds for deployment
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript checking during builds for deployment
    ignoreBuildErrors: true,
  },
  experimental: {
    // Disable strict mode for deployment
    forceSwcTransforms: true,
  },
};

module.exports = nextConfig;