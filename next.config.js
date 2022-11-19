/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")();
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

module.exports = removeImports({
  // ✅  options...
});
