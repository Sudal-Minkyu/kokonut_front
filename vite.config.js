import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import fs from 'fs';
import https from 'https';
import { getCertificate, getPrivateKey } from '@aws-sdk/client-acm';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    https: async () => {
      const REGION = 'ap-northeast-2'; // AWS Region
      const CERTIFICATE_ARN = 'arn:aws:acm:ap-northeast-2:352166812188:certificate/95fe692e-f69e-42d0-9f48-e7dc29375423'; // SSL/TLS 인증서 ARN

      const getCredentials = () => {
        // AWS SDK credentials 설정
      };

      const getCertificateAndKey = async () => {
        const acm = new ACMClient({ region: REGION, credentials: await getCredentials() });
        const data = await acm.exportCertificate({ CertificateArn: CERTIFICATE_ARN });
        return {
          certificate: data.Certificate,
          privateKey: data.PrivateKey
        };
      };

      const { certificate, privateKey } = await getCertificateAndKey();
      return {
        key: getPrivateKey(privateKey),
        cert: getCertificate(certificate)
      };
    }
  }
});
