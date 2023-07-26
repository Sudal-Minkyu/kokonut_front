import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
 
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte()],

    server: {
        port: 5173,
        host: '127.0.0.1'
    }

    // server: {
    //     port: 8051,
    //     host: '0.0.0.0'
    // }

})