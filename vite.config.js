import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

export default defineConfig({
  plugins: [svelte()],
  server: {
    middleware: [
      morgan('combined', { stream: accessLogStream })
    ],
    proxy: {
      '*': {
        target: 'http://beta.kokonut.me:8050',
        changeOrigin: true,
        headers: {
          'Origin': 'https://beta.kokonut.me:5173',
        },
        rewrite: (path) => path.replace(/^\/v+\//, '/')
      }
    }
  }
})
