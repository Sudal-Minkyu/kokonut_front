import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: {
      '/v*/api/**': {
        target: 'http://beta.kokonut.me:8050',
        changeOrigin: true,
        secure: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST',
          'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization, Origin',
          'Origin': 'https://beta.kokonut.me:5173',
        },
        rewrite: (path) => path.replace(/^\/v+\//, '/')
      }
    }
  }
})
