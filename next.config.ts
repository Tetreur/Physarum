import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  webpack: (config) => {
    config.module?.rules?.push({
      test: /\.wgsl$/i,
      use: "raw-loader",
    });
          
  },
  experimental: {
    turbo: {
      rules: {
        '*.wgsl': {
          loaders: ['raw-loader'],
          as: '*.js'
        }
      }
    },
  }
};

export default nextConfig;
