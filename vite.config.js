import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  server: {
    host: 'beta.kokonut.me',
    https: true,
    proxy: {
      '/v*/api/**' : {
      target: 'https://beta-api.kokonut.me:8050',
      changeOrigin: true,
      headers: {
        'Origin': 'https://beta.kokonut.me:5173',
      },
      rewrite: (path) => path.replace(/^\/v+\//, '/'),
    }
  }
})