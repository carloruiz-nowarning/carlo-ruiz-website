/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/EOSquiz', destination: '/EOSquiz.html' },
    ];
  },
};

export default nextConfig;
