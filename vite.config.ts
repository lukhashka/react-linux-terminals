import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src"],
      tsconfigPath: "./tsconfig.json",
      cleanVueFileName: false,
      // Keep per-file declarations and generate an entry .d.ts
      // so all named exports (including Terminal) are preserved.
      rollupTypes: false,
      insertTypesEntry: true,
    }),
  ],

  build: {
    // ─── Library Mode ────────────────────────────────────────────────────
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        "themes/index": resolve(__dirname, "src/themes/index.ts"),
      },
      formats: ["es", "cjs"],
      // Vite derives file names from the entry keys above:
      //   dist/index.js, dist/index.cjs
      //   dist/themes/index.js, dist/themes/index.cjs
      fileName: (format, entryName) =>
        `${entryName}.${format === "es" ? "js" : "cjs"}`,
    },

    // ─── Rollup Options ──────────────────────────────────────────────────
    rollupOptions: {
      // Never bundle peer deps
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        // Provide globals for UMD builds (not used here, but good practice)
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
        // Keep CSS Modules hashes short and deterministic
        assetFileNames: "style[extname]",
      },
    },

    // ─── Output Options ──────────────────────────────────────────────────
    // Retain class names so CSS Modules `.module.css` keep readable hashes
    minify: false,
    sourcemap: true,
    // Output to dist/
    outDir: "dist",
    emptyOutDir: true,
  },

  // ─── CSS Modules ───────────────────────────────────────────────────────
  css: {
    modules: {
      // Generate scoped class names: ComponentName_className__hash
      generateScopedName: "[name]__[local]__[hash:base64:5]",
      localsConvention: "camelCaseOnly",
    },
  },
});
