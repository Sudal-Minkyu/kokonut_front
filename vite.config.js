import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { default as ACM } from '@aws-sdk/client-acm';
import node from '@sveltejs/adapter-node';

// https://vitejs.dev/config/
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
        host: 'beta.kokonut.me'
        port: 5173,
        https: async () => {
          const certificateArn = 'arn:aws:acm:ap-northeast-2:352166812188:certificate/95fe692e-f69e-42d0-9f48-e7dc29375423';
          const acm = new ACM({});
          const { Certificate, PrivateKey } = await acm.getCertificate({ CertificateArn: certificateArn });
          return {
            key: PrivateKey,
            cert: Certificate,
          };
        },
      },
    },
  },
});
