import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { default as ACM } from '@aws-sdk/client-acm';
import node from '@sveltejs/adapter-node';
import axios from 'axios';

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
    '': {
        target: 'http://localhost:8050',
        changeOrigin: true,
        },
    },
    },

    middlewares: async (app, { server }) => {   
        app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    const instance = axios.create({
      baseURL: 'http://localhost:8050',
    });

    function saveToken(token) {
      localStorage.setItem('access_token', token);
    }

    function getToken() {
      return localStorage.getItem('access_token');
    }

    instance.interceptors.request.use(
      config => {
        const token = getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          console.log('토큰이 만료되었거나 잘못되었습니다.');
          delete localStorage['access_token'];
        }
        return Promise.reject(error);
      }
    );

    try {
      const token = getToken();
      if (!token) {
        console.log('토큰이 없습니다.');
        delete localStorage['access_token'];
      } else {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.log(error);
    }
  },
},

},
});