/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */

// next.config.js (ESM syntax)
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL("https://5jg4mxr6uu.ufs.sh/f/**")],
  },
};

export default nextConfig;
