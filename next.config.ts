import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Cloudinary (recommended - free 25GB CDN)
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      // Imgur
      {
        protocol: "https",
        hostname: "i.imgur.com",
        pathname: "/**",
      },
      // GitHub raw content (upload to any repo)
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/**",
      },
      // Google Drive (shared public files)
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/**",
      },
      // Any HTTPS image source (broad fallback)
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
