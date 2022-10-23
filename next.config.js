/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['static01.nyt.com'],
  },
};

module.exports = nextConfig;
