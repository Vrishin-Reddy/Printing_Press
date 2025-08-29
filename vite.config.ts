import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// @ts-ignore - types may be missing depending on plugin version
import legacy from "@vitejs/plugin-legacy";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // Ensure proper asset paths on GitHub Pages (serves at /<repo>/)
  base: mode === 'production' && process.env.GITHUB_ACTIONS
    ? `/${(process.env.GITHUB_REPOSITORY || '').split('/')[1] || ''}/`
    : '/',
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    legacy({
      targets: ["defaults", "not IE 11", "iOS >= 14", "Safari >= 14"],
      renderModernChunks: true,
      polyfills: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase limit to 1MB to reduce warnings
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-popover'],
        },
      },
    },
  },
}));
