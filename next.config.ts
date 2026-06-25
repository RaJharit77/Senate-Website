import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'senat.mg',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;