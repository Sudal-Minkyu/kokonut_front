import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 5173,
    proxy: {
      '/v*/api/**': {
        target: 'http://52.79.252.55:8050',
        changeOrigin: true,
      },
    },
  },
});

