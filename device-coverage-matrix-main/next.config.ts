import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/device-coverage-demo",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
