import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.wgsl': {
          loaders: ['raw-loader'],
          as: '*.js'
        }
      }
    }
  }
};

export default nextConfig;
