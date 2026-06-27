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
    qualities: [100, 75],
  },
};

export default nextConfig;