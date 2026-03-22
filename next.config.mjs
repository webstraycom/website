/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.webstray.com',
        pathname: '/starlight/**',
      },
    ],
  },
};

export default nextConfig;
