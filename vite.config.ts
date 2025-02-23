import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import mkcert from 'vite-plugin-mkcert'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    mkcert()
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    open: true,
    https: true
  }
})
