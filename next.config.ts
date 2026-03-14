/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'gayatri-backend-dn3j.onrender.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'gayatri-backend.onrender.com',
        pathname: '/**',
      },
    ],
  },
  // Якщо помилка RangeError не зникне, можна спробувати вимкнути деякі оптимізації
  experimental: {
    // reactCompiler: true, // у тебе є плагін у devDeps, можна увімкнути тут
  }
};

module.exports = nextConfig;