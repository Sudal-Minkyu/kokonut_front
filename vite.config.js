import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import axios from 'axios';
import jwt from 'jsonwebtoken'; // JWT 라이브러리를 가져옴

export default defineConfig({
  plugins: [svelte()]
});

// JWT 시크릿 키 가져오기
export const KOKONUT_JWT_SECRET = process.env.KOKONUT_JWT_SECRET ? JSON.stringify(process.env.KOKONUT_JWT_SECRET) : '';

// JWT 토큰을 생성하는 함수입니다.
function generateToken() {
  // 토큰 생성 로직
  const payload = { 
    // 페이로드는 클라이언트에서 사용할 사용자 정보를 담는다.
    role: 'user'
  };
  const token = jwt.sign(payload, KOKONUT_JWT_SECRET, { expiresIn: '1h' });
  return token;
}

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'https://beta-api.kokonut.me',
  headers: {
    // JWT 토큰을 Authorization 헤더에 포함시킴
    Authorization: `Bearer ${generateToken()}`
  }
})

// 인증 요청 보내기
axiosInstance.get('/api/user')
  .then(response => {
    // 성공적으로 응답을 받았을 때 처리할 로직
    console.log(response.data);
  })
  .catch(error => {
    // 에러 발생시 처리할 로직
    console.error(error);
  })
