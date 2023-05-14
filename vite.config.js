import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 5173,
    proxy: {
      '/v*/api/**': {
        target: 'https://beta-api.kokonut.me:8050',
        changeOrigin: true,
      },
    },
  },
});

