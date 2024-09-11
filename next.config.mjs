/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png

      {
        protocol: "https",
        hostname: "developers.elementor.com",
        port: "",
        pathname: "/docs/assets/img/**"
      }
    ]
  }
};

export default nextConfig;
