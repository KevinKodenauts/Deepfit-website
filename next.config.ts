import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
      // Proxy Django APIs, but keep local Next.js payment routes on this server.
      {
        source: "/api/:path*",
        destination: "https://apideepfit.gaamferi.com/api/:path*",
      },
    ];
  },
};
export default nextConfig;
