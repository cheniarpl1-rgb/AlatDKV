// next.config.ts - Matikan cacheComponents biar dynamic / connection boleh lagi

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cacheComponents: false,
  },
};

export default nextConfig;
