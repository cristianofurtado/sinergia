import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/about", destination: "/sobre", permanent: true },
      { source: "/contact", destination: "/contato", permanent: true },
      { source: "/privacy", destination: "/privacidade", permanent: true },
    ];
  },
};

export default nextConfig;
