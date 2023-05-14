import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()]
});

// JWT 시크릿 키를 설정합니다.
export const KOKONUT_JWT_SECRET = process.env.KOKONUT_JWT_SECRET ? JSON.stringify(process.env.KOKONUT_JWT_SECRET) : '';
