/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  basePath: '/build_your_own_adventure',
  experimental: {
    appDir: true,
  }
};
 
module.exports = nextConfig;
