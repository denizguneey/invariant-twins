import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  // Streamlit Components v2 executes the bundle in a browser-only sandbox.
  // React's CommonJS production branches still inspect this expression unless
  // Vite replaces it at build time; there is no Node `process` global there.
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  build: {
    outDir: resolve(import.meta.dirname, "../../src/invariant_twins/identify_frontend"),
    emptyOutDir: true,
    lib: { entry: resolve(import.meta.dirname, "src/main.tsx"), formats: ["es"], fileName: () => "identify-graph.js" },
    rollupOptions: { external: [], output: { assetFileNames: "[name][extname]" } }
  }
});
