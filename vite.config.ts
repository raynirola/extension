import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";

import manifest from "./src/manifest";

export default defineConfig({
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src", "assets"),
      "@config": path.resolve(__dirname, "src", "config"),
      "@content": path.resolve(__dirname, "src", "content"),
      "@interface": path.resolve(__dirname, "src", "interface"),
      "@popup": path.resolve(__dirname, "src", "popup"),
      "@service": path.resolve(__dirname, "src", "service"),
      "@shared": path.resolve(__dirname, "src", "shared"),
      "@utils": path.resolve(__dirname, "src", "utils"),
    },
  },
  plugins: [react(), crx({ manifest })],
  build: { minify: true },
});
