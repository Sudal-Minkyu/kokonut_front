import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { default as ACM } from '@aws-sdk/client-acm';

export default defineConfig({
  plugins: [
    svelte(),
    {
      name: 'vite-proxy',
      options: {
        target: 'https://beta.kokonut.me:8050',
        changeOrigin: true,
      },
    },
  ],

  base: '/',
  build: {
    target: 'es2018',
    outDir: 'build',
    assetsDir: 'static',
    minify: true,
    sourcemap: false,
  },

  kit: {
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
      },
    },
  },
});