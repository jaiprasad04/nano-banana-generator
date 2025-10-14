/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow remote images from MuAPI's CDN
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.muapi.ai',
        pathname: '/**',
      },
    ],
  },
  
  // Proxy MuAPI calls to avoid CORS and keep URL stable in the app
  async rewrites() {
    return [
      {
        source: '/muapi/:path*',
        destination: 'https://api.muapi.ai/:path*',
      },
    ];
  },
};

export default nextConfig;
