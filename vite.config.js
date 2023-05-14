import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://beta-api.kokonut.me:8050',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// JWT 토큰을 요청 헤더에 추가하는 Interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default defineConfig({
  plugins: [svelte()]
});

export { instance };
