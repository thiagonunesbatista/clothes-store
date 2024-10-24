/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/login/reset-password",
        destination: "/login/resetPassword",
      },
    ];
  },
};

export default nextConfig;
