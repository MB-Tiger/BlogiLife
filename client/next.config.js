/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    sw: "/client/public/sw.js",
    register: true,
    skipWaiting: true,
    runtimeCaching,
    buildExcludes: ["/client/public/manifest.json"],
  },
});
