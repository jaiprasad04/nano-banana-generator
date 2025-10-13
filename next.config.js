/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.muapi.ai',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
