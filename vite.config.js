
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { default as ACM } from '@aws-sdk/client-acm';


 // https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
   
  server: {
    https: async () => {
      const certificateArn = 'arn:aws:acm:ap-northeast-2:352166812188:certificate/95fe692e-f69e-42d0-9f48-e7dc29375423'; // 여기에 인증서 ARN 값을 넣으세요.
      const acm = new ACM({});
      const { Certificate, PrivateKey } = await acm.getCertificate({ CertificateArn: certificateArn });
      return {
        key: PrivateKey,
        cert: Certificate
      };
    }
  }
  
  build: {
    outDir: 'dist' // 빌드된 파일의 경로 설정
  }
});
