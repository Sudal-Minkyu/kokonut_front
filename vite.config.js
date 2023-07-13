
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [svelte()],
    build: {
    rollupOptions: {
      external: ['svelte-swiper'],
    },
  },

  server: {
    port: 5173,
    host: '127.0.0.1'
  }

});
