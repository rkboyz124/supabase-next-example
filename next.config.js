/** @type {import('next').NextConfig} */
const withRoutes = require('nextjs-routes/config')();
const nextConfig = {
  experimental: {
    appDir: true
  }
};

// module.exports = nextConfig;
module.exports = withRoutes(nextConfig);
