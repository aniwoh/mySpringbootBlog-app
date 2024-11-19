import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';

export default defineConfig(({ mode }) => {
  // 检查当前环境变量，决定是否启用 /api 代理
  const isProxyEnabled = mode === 'development'; // 开发环境启用 /api 代理，生产环境禁用

  return {
    base: '/', // 基础路径
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: '5173',
      host: '::', // 允许外部访问
      proxy: {
        ...(isProxyEnabled && { // 仅在开发环境启用 /api 代理
          '/api': {
            target: 'http://localhost:8888/',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        }),
        '/randomPic': {
          target: 'https://www.dmoe.cc/random.php?return=json',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/randomPic/, ''),
        },
      },
    },
  };
});
