import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // formats: ["image/avif", "image/webp"],
    // deviceSizes: [390, 768, 1024, 1280, 1440],
    // minimumCacheTTL: 86400,
    unoptimized: true,
  },
  // Strip unused locale / i18n overhead
  compress: true,
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizeCss: true,
    // Inline critical fonts to avoid render-blocking
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
