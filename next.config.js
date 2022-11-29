/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    runtime: "experimental-edge",
  },
  baseUrl: ".",
  paths: {
    "@/utils": ["./utils"],
    "@/components": ["./components"],
  },
};

module.exports = nextConfig;
