import type { NextConfig } from "next";

// next.config.js
module.exports = {
  allowedDevOrigins: ['10.0.0.6'],
}

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig : NextConfig = {
  cacheComponents: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig

export default nextConfig;
