import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/inapi-mvp',
  // Desactivamos temporalmente el compilador de React para descartar conflictos
  // reactCompiler: true, 
  images: {
    unoptimized: true,
  },
  // Forzamos a que no intente usar nada experimental que rompa el build
  experimental: {} 
};

export default nextConfig;
