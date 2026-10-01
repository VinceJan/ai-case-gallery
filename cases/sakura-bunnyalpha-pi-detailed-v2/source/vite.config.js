import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5273,
    strictPort: true,
    host: '127.0.0.1',
  },
  preview: {
    port: 5273,
    strictPort: true,
  },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1600,
  },
});
