import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/inapi-mvp', // Asegúrate que este sea el nombre de tu repo
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
