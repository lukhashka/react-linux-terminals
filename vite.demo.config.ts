import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// Demo build: outputs to preview/ (not dist/) so dist stays library-only for npm.
// Run: npm run build:demo  then  npm run demo:serve
export default defineConfig({
  plugins: [react()],

  base: "./",

  root: ".",

  build: {
    outDir: "preview",
    emptyOutDir: true,
    rollupOptions: {
      input: "demo.html",
    },
  },

  resolve: {
    alias: {
      // Bundle the library from source so the demo always matches current code
      "react-linux-terminals": resolve(__dirname, "src/index.ts"),
    },
  },
});
