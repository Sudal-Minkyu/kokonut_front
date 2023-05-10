import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { default as ACM } from '@aws-sdk/client-acm';
import node from '@sveltejs/adapter-node';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://beta.kokonut.me:8050', 
});

export default defineConfig({
  plugins: [svelte()],

  base: '/',
  build: {
    target: 'es2018',
    outDir: 'build',
    assetsDir: 'static',
    minify: true,
    sourcemap: false,
  },

  kit: {
    adapter: node(),
    target: '#svelte',
    vite: {
      server: {
        host: '0.0.0.0',
        port: 5173,
        middlewareMode: true,
        https: async () => {
          const certificateArn = 'arn:aws:acm:ap-northeast-2:352166812188:certificate/95fe692e-f69e-42d0-9f48-e7dc29375423';
          const acm = new ACM({});
          const { Certificate, PrivateKey } = await acm.getCertificate({ CertificateArn: certificateArn });
          const credentials = { key: PrivateKey, cert: Certificate };
          return credentials;
        },
        proxy: {
//      '/^.*api\/.+': {
        '*': {
            target: 'https://beta.kokonut.me:8050',
            changeOrigin: true,
//          logLevel : 'debug',
          },
        },
      },
    },
  },

  middleware: async (app, { server }) => {
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
    });
    
    app.use(async (req, res, next) => {
      try {
        const token = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        if (refreshToken) {
        }
      } catch (error) {
        console.log(error);
      }
      next();
    });
  },
});

export { instance }; 
