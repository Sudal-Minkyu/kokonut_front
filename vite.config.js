import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: {
      '/v*/api/**': {
        target: 'https://beta.kokonut.me:8050', 
        changeOrigin: true,
        secure: true, // 보안 설정 활성화
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST',
          'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization',
        },
        rewrite: (path) => path.replace(/^\/v+\//, '/')
      }
    }
  }
});
