import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: resolve(import.meta.dirname, "../../src/invariant_twins/identify_frontend"),
    emptyOutDir: true,
    lib: { entry: resolve(import.meta.dirname, "src/main.tsx"), formats: ["es"], fileName: () => "identify-graph.js" },
    rollupOptions: { external: [], output: { assetFileNames: "[name][extname]" } }
  }
});
