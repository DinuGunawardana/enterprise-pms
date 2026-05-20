import type { NextConfig } from "next";
import path from "path/win32";

const nextConfig: NextConfig = {
  /* config options here */

  turbopack: {
    root: path.join(__dirname),
  },

  /**
   * Allow LAN/dev network origins
   * for development HMR + stack traces
   */
  allowedDevOrigins: [
    '192.168.8.159',
  ],
};

export default nextConfig;
