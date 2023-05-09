import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { default as ACM } from '@aws-sdk/client-acm';
import node from '@sveltejs/adapter-node';
import express from 'express';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://52.79.252.55:8050', 
});

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
        host: 'beta.kokonut.me',
        port: 5173,
        middlewareMode: true,
        https: async () => {
          const certificateArn = 'arn:aws:acm:ap-northeast-2:352166812188:certificate/95fe692e-f69e-42d0-9f48-e7dc29375423';
          const acm = new ACM({});
          const { Certificate, PrivateKey } = await acm.getCertificate({ CertificateArn: certificateArn });
          const credentials = { key: PrivateKey, cert: Certificate };
          return credentials;
        }
      }
    }
  },
  middleware: async (app, { server }) => {
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
    });
  }
});

export { instance }; 
