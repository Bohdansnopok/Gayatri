/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'], 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gayatri-backend-dn3j.onrender.com',
      },
      {
        protocol: 'https',
        hostname: 'gayatri-backend.onrender.com',
      },
    ],
  },
};

module.exports = nextConfig;