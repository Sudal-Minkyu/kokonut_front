
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { getCertificate, getPrivateKey } from '@aws-sdk/client-acm'
import { fromEnv } from '@aws-sdk/credential-provider-env'
 
 // https://vitejs.dev/config/
export default defineConfig({
   plugins: [svelte()],
   
   server: {
   https: async () => {
      const certificateArn = 'arn:aws:acm:ap-northeast-2:352166812188:certificate/95fe692e-f69e-42d0-9f48-e7dc29375423';     // 인증서 ARN 값
      const { Certificate, PrivateKey } = await getCertificate({ CertificateArn: certificateArn, credentials: await getCredentials() });
      return {
        key: getPrivateKey(PrivateKey),
        cert: Certificate
      };
    }
  }
});
 
const getCredentials = () => {
  return fromEnv({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });
};
