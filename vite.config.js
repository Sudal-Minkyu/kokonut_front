import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 5173,
    proxy: {
      '/v*/api/**': {
        target: 'http://172.16.16.173:8050',
        changeOrigin: true,
      },
    },
  },
});

