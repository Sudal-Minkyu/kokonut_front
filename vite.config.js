// import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig, loadEnv } from 'vite'

// export default defineConfig({
//   plugins: [svelte()]
// });

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [svelte()],
    define: {
      __APP_TITLE__: env.APP_TITLE,
      __API_URL__: env.API_URL
    },
  };
});
