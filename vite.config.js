import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: {
      target: 'https://beta.kokonut.me:8050',
      changeOrigin: true,
      headers: {
        'Origin': 'https://beta.kokonut.me:5173',
      },
      rewrite: (path) => path.replace(/^\/v+\//, '/'),
      onProxyRes: (proxyRes) => {
        proxyRes.headers['Access-Control-Allow-Origin'] = 'https://beta.kokonut.me:5173';
      }
    }
  }
})
