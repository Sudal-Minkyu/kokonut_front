import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { createProxy } from 'vite-plugin-proxy';

export default defineConfig({
  plugins: [svelte(), createProxy({
    '/v*/api': {
      target: 'http://localhost:8050',
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path.replace(/^\/v*\/api/, '')
    }
  })]
});
