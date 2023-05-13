import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import axios from 'axios';

export default defineConfig({
  plugins: [svelte()],

  // axios 설정 추가
  server: {
    proxy: {
      '*': {
        target: 'https://beta-api.kokonut.me:8050', // API 서버 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/*/, ''),
      },
    },
  },
});

// axios를 사용하여 API 요청 보내는 함수 작성

export async function request(url, method, data) {
  try {
    const response = await axios({
      method: method,
      url: `*`,
      data: data,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('API 요청 에러');
  }
}
