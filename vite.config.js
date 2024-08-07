import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: '5173',
    proxy:{
      '/api':{
        target:'http://localhost:8888/',
        changeOrigin:true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/randomPic':{
        target: 'https://www.dmoe.cc/random.php?return=json',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/randomPic/, '')
      }
    }
  }
})
