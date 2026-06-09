import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    // optimizeCss removed — critters strips CSS on inner pages with static export
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
