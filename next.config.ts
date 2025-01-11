import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
      },
      {
        protocol: "https",
        hostname: "atzqzlacgjqtevowswyp.supabase.co",
        port: "",
      },
    ],
  },
};

export default nextConfig;
