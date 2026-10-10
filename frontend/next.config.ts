import type { NextConfig } from "next";
import path from "node:path";

/** App Next.js: `frontend/`. Never the monorepo root (lockfiles + docs would get watched). */
const appRoot = path.resolve(__dirname);

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/inapi-mvp",
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: appRoot,
  },
  outputFileTracingRoot: appRoot,
};

export default nextConfig;
