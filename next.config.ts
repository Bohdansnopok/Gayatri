/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains — це застарілий метод, але для localhost можна залишити
    domains: ['localhost'], 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gayatri-backend-dn3j.onrender.com',
        port: '',
        pathname: '/**', // Дозволяє всі шляхи
      },
      {
        protocol: 'https',
        hostname: 'gayatri-backend.onrender.com',
        port: '',
        pathname: '/**', // Дозволяє всі шляхи
      },
    ],
  },
};

module.exports = nextConfig;