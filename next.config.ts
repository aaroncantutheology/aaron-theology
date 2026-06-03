import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
};

// next.config.js
module.exports = {
  allowedDevOrigins: ['10.0.0.6'],
}

export default nextConfig;
