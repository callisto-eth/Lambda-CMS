/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      source: '/@me',
      destination: '/home',
    },
  ],
};

export default nextConfig;
