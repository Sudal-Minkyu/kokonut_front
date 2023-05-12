import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
const proxy = require('vite-plugin-proxy');

export default defineConfig({
  plugins: [proxy.createProxy({
    '/v*/api': {
      target: 'http://localhost:8050',
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path.replace(/^\/v*\/api/, '')
    }
  })]
});
