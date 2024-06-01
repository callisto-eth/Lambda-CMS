/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  rewrites: async () => [
    {
      source: '/@me',
      destination: '/home',
    },
    {
      source: '/@me/:path*',
      destination: '/home/:path*',
    },
  ],
};

export default nextConfig;
