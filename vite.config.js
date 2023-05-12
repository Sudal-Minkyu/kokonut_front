import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
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
        proxy: {},
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

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.log('토큰이 없습니다.');
        delete localStorage['access_token'];
        axios.defaults.headers.common['Authorization'] = null;
        instance.defaults.headers.common['Authorization'] = null;
      } else {
        // 토큰이 있을 경우, 헤더에 Authorization을 포함시킴
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.log(error);
    }

    // API 요청 처리
    app.use(async (req, res, next) => {
      if (req.url.startsWith('/api/')) {
        try {
          const response = await instance.request({
            url: req.url,
            method: req.method,
            data: req.body,
          });
          res.statusCode = response.status;
          res.end(JSON.stringify(response.data));
        } catch (error) {
          res.statusCode = error.response.status;
          res.end(JSON.stringify(error.response.data));
        }
      } else {
        next();
      }
    });
  },
});

export { instance };
