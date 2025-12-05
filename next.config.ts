import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow VS Code dev tunnels
  allowedDevOrigins: ['https://62nwrbgs-3000.use2.devtunnels.ms'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'modular-images-public.s3.us-east-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'www.modularclosets.com',
        pathname: '/cdn/shop/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
      },
      {
        protocol: 'https',
        hostname: 'sfycdn.speedsize.com',
      },
    ],
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
