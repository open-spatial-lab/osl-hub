/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  baseUrl: ".",
  paths: {
    "@/utils": ["./utils"],
    "@/components": ["./components"]
  },
};

module.exports = nextConfig;
