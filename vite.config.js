import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

const env = {
  VITE_SERVER_URL: process.env.VITE_SERVER_URL,
};

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
  define: {
    'process.env': {
      VITE_SERVER_URL: JSON.stringify(env.VITE_SERVER_URL),
    },
  },
});

