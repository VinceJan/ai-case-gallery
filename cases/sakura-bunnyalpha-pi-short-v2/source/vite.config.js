import { defineConfig } from 'vite';

// 樱花小镇 Sakura Town
// Dev server is pinned to port 5373 (strictPort) so we never fight another instance.
export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 5373,
    strictPort: true,
    open: false,
  },
  preview: {
    host: '127.0.0.1',
    port: 5373,
    strictPort: true,
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 1400,
  },
});
