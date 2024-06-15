import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        script: resolve(__dirname, "index.html"),
        serviceWorker: resolve(__dirname, "serviceWorker.ts"),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
  /* Easy imports */
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
});
