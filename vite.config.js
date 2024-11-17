import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/blog/', // 设置基础路径
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
    host: '0.0.0.0', // 允许外部访问
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
