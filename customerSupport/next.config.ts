import type { NextConfig } from "next";



const nextConfig: NextConfig = {
  webpack(config) {
    // Enable async WebAssembly support
    config.experiments = { asyncWebAssembly: true, layers: true };
    return config;
  },
};

export default nextConfig;
