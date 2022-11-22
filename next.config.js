/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['https://img.seadn.io/'],
  },
};

module.exports = nextConfig;
