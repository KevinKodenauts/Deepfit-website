import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "kodecloud-bucket-2025.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/customer/:path*",
        destination: "https://apideepfit.gaamferi.com/api/customer/:path*/",
      },
      {
        source: "/api/exercise/:path*",
        destination: "https://apideepfit.gaamferi.com/api/exercise/:path*/",
      },
      {
        source: "/api/blog/:path*",
        destination: "https://apideepfit.gaamferi.com/api/blog/:path*/",
      },
      {
        source: "/api/:path*",
        destination: "https://apideepfit.gaamferi.com/api/:path*",
      },
    ];
  },
};
export default nextConfig;
