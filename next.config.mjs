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
