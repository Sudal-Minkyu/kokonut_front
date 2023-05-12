import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';


export default defineConfig({
  plugins: [svelte()],
    server: {
    proxy: {
      '/v*/api': {
        target: 'http://localhost:8050',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/v+\//, '/')
      }
    }
  }
})

