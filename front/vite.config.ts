import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import checker from 'vite-plugin-checker'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: false,
  plugins: [
    vue(),
    checker({
      vueTsc: true,
    }),
  ],
  server: {
    port: 5173,
    host: true,
    hmr: {
      overlay: true // ホットリロード時にエラーメッセージをオーバーレイ表示する
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  }
})
