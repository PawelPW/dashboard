import type { NextConfig } from "next";
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins = config.plugins || [];
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: ["javascript", "typescript"],
        })
      );
    }
    return config;
  },
};

export default nextConfig;