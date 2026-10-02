import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (~20% smaller than WebP), WebP fallback for older browsers
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    // Cache optimized images for 31 days instead of re-encoding them
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
