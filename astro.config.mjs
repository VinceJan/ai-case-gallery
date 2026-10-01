import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://vincejan.github.io',
  base: '/ai-case-gallery',
  output: 'static',
  build: { format: 'directory' },
});
