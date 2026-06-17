import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "class-variance-authority",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-slot",
    ],
  },
};

export default nextConfig;
