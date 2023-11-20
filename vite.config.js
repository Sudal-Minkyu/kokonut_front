import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config
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
    },
    resolve: {
        alias: {
            'jQuery': 'jquery'
        },
    },

});
