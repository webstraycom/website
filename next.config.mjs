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
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/general/changelog',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
