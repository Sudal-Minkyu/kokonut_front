
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import axios from "axios";

const instance = axios.create({
    baseURL: "https://betaapi.kokonut.me",
    headers: {
        "Content-Type": "application/json"
    }
});

export default defineConfig({
  plugins: [svelte()],
  axios: instance
});
